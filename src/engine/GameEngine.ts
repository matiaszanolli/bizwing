// Main game engine

import { GameState } from '../models/GameState';
import { CONFIG } from '../utils/config';
import { calculateDistance, formatMoney, clamp, generateId } from '../utils/helpers';
import { getRandomEvent } from '../data/events';
import { AircraftType, getUpcomingAircraft, getEndingProductionAircraft } from '../data/aircraft';
import { Airport } from '../data/airports';
import { Route, ActiveEvent, HubMetrics, Executive, ExecutiveActionType } from '../models/types';
import { AircraftManager, ExecutiveManager, FinancialManager } from './managers';

interface RouteCreationResult {
    success: boolean;
    error?: string;
}

interface TurnResult {
    gameOver?: boolean;
    reason?: string;
    victory?: boolean;
    score?: number;
    continue?: boolean;
    emergencyLoanRequired?: boolean;
    lowCashWarning?: boolean;
}

export class GameEngine {
    state: GameState;

    // Subsystem managers
    aircraft: AircraftManager;
    executives: ExecutiveManager;
    financial: FinancialManager;

    constructor(state?: GameState) {
        this.state = state || new GameState();

        // Initialize managers
        this.aircraft = new AircraftManager(this.state);
        this.executives = new ExecutiveManager(this.state);
        this.financial = new FinancialManager(this.state);
    }

    // Initialize new game
    initialize(startYear?: number, startingCash?: number, airlineName?: string): void {
        this.state.initialize(startYear, startingCash, airlineName);

        // Update manager state references
        this.aircraft.updateState(this.state);
        this.executives.updateState(this.state);
        this.financial.updateState(this.state);
    }

    // === AIRCRAFT MANAGEMENT ===
    // Delegated to AircraftManager

    getAircraftCondition(age: number): 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'CRITICAL' {
        return this.aircraft.getAircraftCondition(age);
    }

    getMaintenanceMultiplier(age: number): number {
        return this.aircraft.getMaintenanceMultiplier(age);
    }

    getFuelEfficiencyMultiplier(age: number): number {
        return this.aircraft.getFuelEfficiencyMultiplier(age);
    }

    buyAircraft(planeType: AircraftType, owned: boolean = true, customName?: string): { success: boolean; error?: string } {
        return this.aircraft.buyAircraft(planeType, owned, customName);
    }

    leaseAircraft(planeType: AircraftType): boolean {
        return this.aircraft.leaseAircraft(planeType);
    }

    sellAircraft(aircraftId: number): { success: boolean; error?: string; amount?: number } {
        return this.aircraft.sellAircraft(aircraftId);
    }

    returnLeasedAircraft(aircraftId: number): { success: boolean; error?: string } {
        return this.aircraft.returnLeasedAircraft(aircraftId);
    }

    // === AIRPORT MANAGEMENT ===

    beginSlotNegotiation(airport: Airport): { success: boolean; error?: string; cost?: number; quarters?: number } {
        // Check if already owned
        if (airport.owned) {
            return { success: false, error: 'You already own slots at this airport!' };
        }

        // Check if already negotiating for this airport
        const existingNegotiation = this.state.slotNegotiations.find(n => n.airport_id === airport.id);
        if (existingNegotiation) {
            return { success: false, error: 'Already negotiating for slots at this airport!' };
        }

        // Check negotiation capacity
        if (this.state.slotNegotiations.length >= this.state.negotiationCapacity) {
            return {
                success: false,
                error: `Negotiation capacity reached (${this.state.negotiationCapacity} simultaneous negotiations max)!`
            };
        }

        // Calculate negotiation time (larger markets take longer)
        const marketSizeNormalized = airport.market_size / 40000000; // Normalize to 0-1 range
        const quartersRange = CONFIG.SLOT_NEGOTIATION_QUARTERS_MAX - CONFIG.SLOT_NEGOTIATION_QUARTERS_MIN;
        const quarters = Math.ceil(
            CONFIG.SLOT_NEGOTIATION_QUARTERS_MIN + (marketSizeNormalized * quartersRange)
        );

        // Calculate upfront deposit cost (much cheaper than old system)
        const depositCost = Math.floor(airport.market_size * CONFIG.AIRPORT_SLOT_DEPOSIT_MULTIPLIER);

        // Check if can afford deposit
        if (!this.state.canAfford(depositCost)) {
            return { success: false, error: 'Insufficient funds for negotiation deposit!' };
        }

        // Pay deposit and start negotiation
        this.state.cash -= depositCost;
        this.state.slotNegotiations.push({
            airport_id: airport.id,
            quarters_remaining: quarters,
            slot_count: 1, // For now, always 1 slot
            cost: depositCost
        });

        this.state.addNews(`Started slot negotiation at ${airport.name} (${quarters} quarters, deposit: $${(depositCost / 1000000).toFixed(1)}M)`);
        return { success: true, cost: depositCost, quarters };
    }

    cancelSlotNegotiation(airportId: string): { success: boolean; error?: string; refund?: number } {
        const negotiationIndex = this.state.slotNegotiations.findIndex(n => n.airport_id === airportId);

        if (negotiationIndex === -1) {
            return { success: false, error: 'No active negotiation for this airport!' };
        }

        const negotiation = this.state.slotNegotiations[negotiationIndex];

        // Refund 50% of deposit if cancelled
        const refund = Math.floor(negotiation.cost * 0.5);
        this.state.cash += refund;

        this.state.slotNegotiations.splice(negotiationIndex, 1);

        const airport = this.state.findAirport(airportId);
        this.state.addNews(`Cancelled slot negotiation at ${airport?.name || airportId} (refund: $${(refund / 1000000).toFixed(1)}M)`);

        return { success: true, refund };
    }

    processSlotNegotiations(): void {
        const completedNegotiations: string[] = [];

        // Countdown all active negotiations
        for (const negotiation of this.state.slotNegotiations) {
            negotiation.quarters_remaining--;

            // If completed, mark for acquisition
            if (negotiation.quarters_remaining <= 0) {
                completedNegotiations.push(negotiation.airport_id);
            }
        }

        // Process completed negotiations
        for (const airportId of completedNegotiations) {
            const airport = this.state.findAirport(airportId);
            if (airport) {
                airport.owned = true;
                this.state.addNews(`✈️ Slot negotiation completed! Acquired slots at ${airport.name}`);
            }

            // Remove from negotiations list
            const index = this.state.slotNegotiations.findIndex(n => n.airport_id === airportId);
            if (index !== -1) {
                this.state.slotNegotiations.splice(index, 1);
            }
        }
    }

    // Legacy method for backward compatibility (redirects to negotiation)
    buyAirportSlot(airport: Airport): boolean {
        const result = this.beginSlotNegotiation(airport);
        return result.success;
    }

    // === ROUTE MANAGEMENT ===

    createRoute(fromId: string, toId: string, aircraftId: number, flightsPerWeek: number): RouteCreationResult {
        const aircraft = this.state.findAircraft(aircraftId);
        if (!aircraft || aircraft.assigned_route) {
            return { success: false, error: 'Aircraft not available!' };
        }

        const from = this.state.findAirport(fromId);
        const to = this.state.findAirport(toId);

        if (!from || !to) {
            return { success: false, error: 'Invalid airports!' };
        }

        if (fromId === toId) {
            return { success: false, error: 'Cannot create route to same airport!' };
        }

        if (!to.owned) {
            return { success: false, error: 'You must own slots at the destination airport!' };
        }

        // Check range (distance is in km from Haversine formula)
        const distance = Math.floor(calculateDistance(from.lat, from.lon, to.lat, to.lon));
        if (distance > aircraft.type.range) {
            return {
                success: false,
                error: `Aircraft range (${aircraft.type.range}km) insufficient for this route (${distance}km)!`
            };
        }

        // Create route
        const route: Route = {
            from: fromId,
            to: toId,
            aircraft: aircraft,
            flights_per_week: flightsPerWeek,
            distance: distance,
            suspended: false
        };

        aircraft.assigned_route = route;
        this.state.routes.push(route);

        this.state.addNews(`New route opened: ${fromId} → ${toId}`);
        return { success: true };
    }

    deleteRoute(route: Route): boolean {
        // Find the index of the route
        const routeIndex = this.state.routes.findIndex(r =>
            r.from === route.from && r.to === route.to && r.aircraft.id === route.aircraft.id
        );

        if (routeIndex === -1) {
            return false;
        }

        // Unassign aircraft
        const aircraft = route.aircraft;
        aircraft.assigned_route = null;

        // Remove route
        this.state.routes.splice(routeIndex, 1);

        this.state.addNews(`Route closed: ${route.from} → ${route.to}`);
        return true;
    }

    suspendRoute(routeOrId: Route | string): boolean {
        let route: Route | undefined;

        if (typeof routeOrId === 'string') {
            route = this.state.routes.find(r => r.id === routeOrId);
        } else {
            route = routeOrId;
        }

        if (!route) {
            return false;
        }

        route.suspended = true;
        this.state.addNews(`Route suspended: ${route.from} → ${route.to} (aircraft & slots retained)`);
        return true;
    }

    resumeRoute(routeOrId: Route | string): boolean {
        let route: Route | undefined;

        if (typeof routeOrId === 'string') {
            route = this.state.routes.find(r => r.id === routeOrId);
        } else {
            route = routeOrId;
        }

        if (!route) {
            return false;
        }

        route.suspended = false;
        this.state.addNews(`Route resumed: ${route.from} → ${route.to}`);
        return true;
    }

    updateRouteFrequency(routeId: string, newFrequency: number): boolean {
        const route = this.state.routes.find(r => r.id === routeId);

        if (!route || newFrequency < 1 || newFrequency > 14) {
            return false;
        }

        const oldFrequency = route.flights_per_week;
        route.flights_per_week = newFrequency;
        this.state.addNews(`Route ${route.from} → ${route.to}: frequency changed from ${oldFrequency}/wk to ${newFrequency}/wk`);
        return true;
    }

    // === EXECUTIVE MANAGEMENT ===
    // Delegated to ExecutiveManager

    hireExecutive(executive: Executive): { success: boolean; error?: string } {
        return this.executives.hireExecutive(executive);
    }

    fireExecutive(executiveId: number): { success: boolean; error?: string } {
        return this.executives.fireExecutive(executiveId);
    }

    assignExecutiveAction(
        executiveId: number,
        actionType: ExecutiveActionType,
        target?: string,
        parameters?: Record<string, any>
    ): { success: boolean; error?: string } {
        return this.executives.assignExecutiveAction(executiveId, actionType, target, parameters);
    }

    cancelExecutiveAction(actionId: string): { success: boolean; error?: string } {
        return this.executives.cancelExecutiveAction(actionId);
    }

    getExecutiveSalaries(): number {
        return this.executives.getExecutiveSalaries();
    }

    private processExecutiveActions(): void {
        this.executives.processExecutiveActions();
    }

    // === FINANCIAL MANAGEMENT ===
    // Delegated to FinancialManager

    takeLoan(amount: number, quarters: number): boolean {
        return this.financial.takeLoan(amount, quarters);
    }

    setAdvertisingBudget(amount: number): boolean {
        return this.financial.setAdvertisingBudget(amount);
    }

    calculateScore(): number {
        return this.financial.calculateScore();
    }

    calculateQuarterlyRevenue(): number {
        return this.financial.calculateQuarterlyRevenue();
    }

    calculateQuarterlyExpenses(): number {
        return this.financial.calculateQuarterlyExpenses(this.aircraft, this.executives);
    }

    private processLoans(): void {
        this.financial.processLoans();
    }

    // OLD FINANCIAL MANAGEMENT (to be removed after refactoring)
    // === FINANCIAL MANAGEMENT ===

    takeLoan(amount: number, quarters: number): boolean {
        const interestRate = CONFIG.LOAN_INTEREST_RATE;
        const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));
        const principalPayment = amount / quarters;

        const loan = {
            original_amount: amount,
            remaining: amount,
            quarterly_payment: quarterlyPayment,
            principal_payment: principalPayment,
            quarters_remaining: quarters,
            interest_rate: interestRate
        };

        this.state.loans.push(loan);
        this.state.cash += amount;
        this.state.addNews(`Loan approved: $${formatMoney(amount)} over ${quarters} quarters`);
        return true;
    }

    takeEmergencyLoan(amount: number): boolean {
        const interestRate = CONFIG.EMERGENCY_LOAN_INTEREST_RATE;
        const quarters = 12; // Fixed 3-year term for emergency loans
        const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));
        const principalPayment = amount / quarters;

        const loan = {
            original_amount: amount,
            remaining: amount,
            quarterly_payment: quarterlyPayment,
            principal_payment: principalPayment,
            quarters_remaining: quarters,
            interest_rate: interestRate
        };

        this.state.loans.push(loan);
        this.state.cash += amount;
        this.state.consecutiveLosses = 0; // Reset counter after emergency loan
        this.state.addNews(`EMERGENCY LOAN: $${formatMoney(amount)} at ${(interestRate * 100).toFixed(0)}% interest over ${quarters} quarters`);
        return true;
    }

    processLoans(): void {
        this.state.loans = this.state.loans.filter(loan => {
            loan.remaining -= loan.principal_payment;
            loan.quarters_remaining--;

            if (loan.quarters_remaining <= 0 || loan.remaining <= 0) {
                this.state.addNews(`Loan paid off! Principal was $${formatMoney(loan.original_amount)}`);
                return false;
            }
            return true;
        });
    }

    setAdvertisingBudget(budget: number): void {
        this.state.advertisingBudget = budget;
        this.state.addNews(`Advertising budget set to $${formatMoney(budget)}/quarter`);
    }

    // === REVENUE CALCULATION ===

    calculateQuarterlyRevenue(): number {
        let revenue = 0;
        this.state.routes.forEach(route => {
            // Skip suspended routes
            if (!route.suspended) {
                revenue += this.calculateRouteRevenue(route);
            }
        });
        return Math.floor(revenue);
    }

    calculateRouteRevenue(route: Route): number {
        const from = this.state.findAirport(route.from);
        const to = this.state.findAirport(route.to);

        if (!from || !to) return 0;

        // Suspended routes generate no revenue
        if (route.suspended) return 0;

        // Base load factor affected by reputation
        let loadFactor = CONFIG.BASE_LOAD_FACTOR +
                        (this.state.reputation - CONFIG.STARTING_REPUTATION) / 200;
        loadFactor = clamp(loadFactor, 0.4, 0.95);

        // Apply economic conditions
        loadFactor *= this.state.economicCondition;

        // Competition reduces load factor
        const competition = this.calculateRouteCompetition(route);
        const competitionPenalty = 1 - (competition * CONFIG.COMPETITION_PENALTY_PER_COMPETITOR);
        loadFactor *= competitionPenalty;

        const passengersPerFlight = route.aircraft.type.capacity * loadFactor;
        const revenuePerFlight = passengersPerFlight * route.distance * CONFIG.PRICE_PER_KM;
        const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;

        let quarterlyRevenue = revenuePerFlight * flightsPerQuarter;

        // Apply connection bonus if route has connection data
        if (route.connections && route.connections.connection_bonus > 0) {
            quarterlyRevenue *= (1 + route.connections.connection_bonus);
        }

        return quarterlyRevenue;
    }

    // === EXPENSE CALCULATION ===

    calculateQuarterlyExpenses(): number {
        let expenses = 0;

        // Operating costs for routes (affected by fuel prices and aircraft age)
        // Skip suspended routes - they don't incur operating costs
        this.state.routes.forEach(route => {
            if (!route.suspended) {
                const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
                const fuelEfficiencyMultiplier = this.getFuelEfficiencyMultiplier(route.aircraft.age);
                const baseCost = route.aircraft.type.operating_cost * flightsPerQuarter;
                expenses += baseCost * this.state.fuelPrice * fuelEfficiencyMultiplier;
            }
        });

        // Leasing costs
        this.state.fleet.forEach(aircraft => {
            if (!aircraft.owned) {
                expenses += aircraft.type.lease_per_quarter;
            }
        });

        // Fixed costs for owned airports
        const ownedAirports = this.state.getOwnedAirports();
        expenses += ownedAirports.length * CONFIG.AIRPORT_MAINTENANCE_PER_QUARTER;

        // Fleet maintenance (age-based penalties)
        this.state.fleet.forEach(aircraft => {
            const maintenanceMultiplier = this.getMaintenanceMultiplier(aircraft.age);
            expenses += CONFIG.AIRCRAFT_MAINTENANCE_BASE * maintenanceMultiplier;
        });

        // Loan payments
        this.state.loans.forEach(loan => {
            expenses += loan.quarterly_payment;
        });

        // Advertising budget
        expenses += this.state.advertisingBudget;

        // Research costs
        expenses += this.state.researchLevel * 100000;

        // Executive salaries
        expenses += this.getExecutiveSalaries();

        return Math.floor(expenses);
    }

    // === COMPETITION ===

    calculateRouteCompetition(route: Route): number {
        let competitors = 0;
        this.state.competitors.forEach(comp => {
            if (comp.airports.includes(route.from) || comp.airports.includes(route.to)) {
                competitors++;
            }
        });
        return competitors;
    }

    estimateRouteProfitability(route: Route): { revenue: number; expenses: number; profit: number; loadFactor: number } {
        const from = this.state.findAirport(route.from);
        const to = this.state.findAirport(route.to);

        if (!from || !to || route.suspended) {
            return { revenue: 0, expenses: 0, profit: 0, loadFactor: 0 };
        }

        // Calculate load factor (same logic as calculateRouteRevenue)
        let loadFactor = CONFIG.BASE_LOAD_FACTOR +
                        (this.state.reputation - CONFIG.STARTING_REPUTATION) / 200;
        loadFactor = clamp(loadFactor, 0.4, 0.95);
        loadFactor *= this.state.economicCondition;
        const competition = this.calculateRouteCompetition(route);
        const competitionPenalty = 1 - (competition * CONFIG.COMPETITION_PENALTY_PER_COMPETITOR);
        loadFactor *= competitionPenalty;

        // Calculate revenue
        const revenue = this.calculateRouteRevenue(route);

        // Calculate expenses
        const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
        const ageYears = Math.floor(route.aircraft.age / 4);
        const fuelEfficiencyMultiplier = this.getFuelEfficiencyMultiplier(ageYears);
        const operatingCost = route.aircraft.type.operating_cost * flightsPerQuarter * this.state.fuelPrice * fuelEfficiencyMultiplier;
        const leaseCost = route.aircraft.owned ? 0 : route.aircraft.type.lease_per_quarter;
        const routesUsingAircraft = this.state.routes.filter(r => r.aircraft.id === route.aircraft.id && !r.suspended).length;
        const maintenanceCost = routesUsingAircraft > 0
            ? CONFIG.AIRCRAFT_MAINTENANCE_BASE * this.getMaintenanceMultiplier(ageYears) / routesUsingAircraft
            : 0;

        const expenses = operatingCost + leaseCost + maintenanceCost;
        const profit = revenue - expenses;

        return { revenue, expenses, profit, loadFactor };
    }

    // === EVENTS ===

    triggerRandomEvent(): void {
        const event = getRandomEvent();
        const newEvent: ActiveEvent = { ...event, quartersRemaining: event.duration || 1 };

        // Apply event effects
        if (event.fuelMultiplier) {
            this.state.fuelPrice = event.fuelMultiplier;
        }
        if (event.demandMultiplier) {
            this.state.economicCondition = event.demandMultiplier;
        }
        if (event.reputationChange) {
            this.state.reputation = clamp(
                this.state.reputation + event.reputationChange,
                CONFIG.REPUTATION_MIN,
                CONFIG.REPUTATION_MAX
            );
        }
        if (event.cashChange) {
            this.state.cash += event.cashChange;
        }
        if (event.researchBonus) {
            this.state.researchLevel = Math.min(10, this.state.researchLevel + event.researchBonus);
        }

        this.state.events.push(newEvent);
        this.state.addNews(`EVENT: ${event.name} - ${event.description}`);
    }

    processEvents(): void {
        this.state.events = this.state.events.filter(event => {
            event.quartersRemaining--;
            if (event.quartersRemaining <= 0) {
                // Event expired, reset modifiers
                if (event.fuelMultiplier) {
                    this.state.fuelPrice = 1.0;
                    this.state.addNews(`${event.name} ended - fuel prices normalized`);
                }
                if (event.demandMultiplier) {
                    this.state.economicCondition = 1.0;
                    this.state.addNews(`${event.name} ended - demand normalized`);
                }
                return false;
            }
            return true;
        });
    }

    // === AI COMPETITORS ===

    simulateCompetitors(): void {
        this.state.competitors.forEach(comp => {
            // Competitors gain/lose money based on their airports and reputation
            const baseProfit = comp.airports.length * CONFIG.AI_BASE_PROFIT_PER_AIRPORT;
            const reputationFactor = comp.reputation / CONFIG.STARTING_REPUTATION;
            const randomFactor = (Math.random() - 0.3) * 0.5;

            const profit = baseProfit * reputationFactor * (1 + randomFactor) * this.state.economicCondition;
            comp.cash += profit;

            // Aggressive competitors try to expand
            if (comp.aggressive && comp.cash > CONFIG.AI_EXPANSION_CASH_THRESHOLD &&
                Math.random() < CONFIG.AI_EXPANSION_PROBABILITY) {
                const availableAirports = this.state.airports.filter(
                    a => !a.owned && !a.competitor_owned
                );
                if (availableAirports.length > 0) {
                    const airport = availableAirports[Math.floor(Math.random() * availableAirports.length)];
                    const price = airport.market_size * CONFIG.AIRPORT_PRICE_MULTIPLIER;
                    if (comp.cash >= price) {
                        comp.cash -= price;
                        airport.competitor_owned = comp.name;
                        comp.airports.push(airport.id);
                        this.state.addNews(`${comp.name} acquired slots at ${airport.name}`);
                    }
                }
            }

            // Update reputation
            if (profit > 0) {
                comp.reputation = Math.min(CONFIG.REPUTATION_MAX, comp.reputation + CONFIG.REPUTATION_GAIN_ON_PROFIT);
            } else {
                comp.reputation = Math.max(20, comp.reputation - CONFIG.REPUTATION_LOSS_ON_LOSS);
            }
        });
    }

    // === TURN ADVANCEMENT ===

    advanceTurn(): TurnResult {
        // Age aircraft
        this.aircraft.ageAllAircraft();

        // Calculate financials
        const revenue = this.calculateQuarterlyRevenue();
        const expenses = this.calculateQuarterlyExpenses();
        const profit = revenue - expenses;

        this.state.cash += profit;
        this.state.lastQuarterProfit = profit;

        // Track consecutive losses
        if (profit < 0) {
            this.state.consecutiveLosses++;
        } else {
            this.state.consecutiveLosses = 0;
        }

        // Update reputation based on performance
        if (profit > 0 && this.state.routes.length > 0) {
            this.state.reputation = Math.min(
                CONFIG.REPUTATION_MAX,
                this.state.reputation + CONFIG.REPUTATION_GAIN_ON_PROFIT
            );
        } else if (profit < 0) {
            this.state.reputation = Math.max(
                CONFIG.REPUTATION_MIN,
                this.state.reputation - CONFIG.REPUTATION_LOSS_ON_LOSS
            );
        }

        // Advertising improves reputation
        if (this.state.advertisingBudget > 0) {
            const repGain = Math.floor(this.state.advertisingBudget / CONFIG.ADVERTISING_REPUTATION_FACTOR);
            this.state.reputation = Math.min(CONFIG.REPUTATION_MAX, this.state.reputation + repGain);
        }

        // Advance time
        const lastQuarter = this.state.quarter;
        const isNewYear = this.state.advanceQuarter();

        if (isNewYear) {
            this.state.addNews(`--- Year ${this.state.year} begins ---`);
        }

        // Add financial news
        if (profit > 0) {
            this.state.addNews(`Q${lastQuarter}: Profit of $${formatMoney(profit)}`);
        } else {
            this.state.addNews(`Q${lastQuarter}: Loss of $${formatMoney(Math.abs(profit))}`);
        }

        // Process active events
        this.processEvents();

        // Random event chance
        if (Math.random() < CONFIG.EVENT_PROBABILITY_PER_QUARTER) {
            this.triggerRandomEvent();
        }

        // Update loan terms
        this.processLoans();

        // Simulate competitor activity
        this.simulateCompetitors();

        // Update airport economic indicators (quarterly)
        this.updateAirportEconomics();

        // Update connection statistics for hub routes (quarterly)
        this.updateConnectionStatistics();

        // Process slot negotiations (quarterly countdown)
        this.processSlotNegotiations();

        // Process executive actions (quarterly)
        this.processExecutiveActions();

        // Check for aircraft announcements (only on Q1)
        if (this.state.quarter === 1) {
            // Warn about upcoming aircraft
            const upcomingAircraft = getUpcomingAircraft(this.state.year);
            if (upcomingAircraft.length > 0) {
                upcomingAircraft.forEach(aircraft => {
                    this.state.addNews(`INDUSTRY NEWS: ${aircraft.name} will enter production next year!`);
                });
            }

            // Warn about aircraft ending production
            const endingAircraft = getEndingProductionAircraft(this.state.year);
            if (endingAircraft.length > 0) {
                endingAircraft.forEach(aircraft => {
                    this.state.addNews(`INDUSTRY NEWS: ${aircraft.name} production ending next year - last chance to order!`);
                });
            }

            // Check for aging aircraft in fleet
            this.state.fleet.forEach(aircraft => {
                const ageYears = Math.floor(aircraft.age / 4);

                // Critical maintenance warning
                if (ageYears === CONFIG.MAINTENANCE_CRITICAL_AGE) {
                    this.state.addNews(`⚠️ MAINTENANCE ALERT: ${aircraft.name} (${aircraft.type.name}) has reached ${ageYears} years - CRITICAL condition! Costs significantly increased.`);
                }
                // Regular maintenance warning
                else if (ageYears === CONFIG.MAINTENANCE_WARNING_AGE) {
                    this.state.addNews(`⚠️ MAINTENANCE: ${aircraft.name} (${aircraft.type.name}) is ${ageYears} years old. Consider replacement - maintenance costs rising.`);
                }
                // Milestone warnings every 5 years after critical age
                else if (ageYears > CONFIG.MAINTENANCE_CRITICAL_AGE && ageYears % 5 === 0) {
                    this.state.addNews(`⚠️ ${aircraft.name} is ${ageYears} years old - operating costs are severely elevated!`);
                }
            });
        }

        // Check game over
        if (this.state.cash < CONFIG.BANKRUPTCY_THRESHOLD) {
            return { gameOver: true, victory: false, reason: 'bankruptcy' };
        }

        // Check for emergency loan requirement
        if (this.state.consecutiveLosses >= CONFIG.CONSECUTIVE_LOSSES_FOR_EMERGENCY) {
            return { emergencyLoanRequired: true };
        }

        // Check for low cash warning
        if (this.state.cash < CONFIG.LOW_CASH_WARNING_THRESHOLD && profit < 0) {
            return { lowCashWarning: true, continue: true };
        }

        // Check win condition
        if (this.state.year >= CONFIG.VICTORY_YEAR) {
            return { gameOver: true, victory: true, score: this.calculateScore() };
        }

        return { continue: true };
    }

    // === AIRPORT ECONOMICS ===

    /**
     * Update airport tourism and business scores quarterly
     * Simulates economic fluctuations and regional factors
     */
    updateAirportEconomics(): void {
        // Regional economic factors (10% chance of regional event)
        let regionalEvent: { region: string; tourismFactor: number; businessFactor: number; message: string } | null = null;

        if (Math.random() < 0.10) {
            const regions: Array<{ region: string; tourismFactor: number; businessFactor: number; message: string }> = [
                {
                    region: 'North America',
                    tourismFactor: 1 + (Math.random() * 0.1 - 0.05), // -5% to +5%
                    businessFactor: 1 + (Math.random() * 0.1 - 0.05),
                    message: 'North American markets experiencing moderate volatility.'
                },
                {
                    region: 'Europe',
                    tourismFactor: 1 + (Math.random() * 0.15 - 0.075), // -7.5% to +7.5%
                    businessFactor: 1 + (Math.random() * 0.1 - 0.05),
                    message: 'European tourism sector showing strong seasonal trends.'
                },
                {
                    region: 'Asia',
                    tourismFactor: 1 + (Math.random() * 0.12 - 0.06),
                    businessFactor: 1 + (Math.random() * 0.15 - 0.075), // -7.5% to +7.5%
                    message: 'Asian business sector experiencing rapid growth.'
                },
                {
                    region: 'Middle East',
                    tourismFactor: 1 + (Math.random() * 0.08 - 0.04),
                    businessFactor: 1 + (Math.random() * 0.12 - 0.06),
                    message: 'Middle East markets adjusting to oil price fluctuations.'
                },
                {
                    region: 'South America',
                    tourismFactor: 1 + (Math.random() * 0.1 - 0.05),
                    businessFactor: 1 + (Math.random() * 0.12 - 0.06),
                    message: 'South American economies showing emerging market dynamics.'
                },
                {
                    region: 'Africa',
                    tourismFactor: 1 + (Math.random() * 0.15 - 0.075),
                    businessFactor: 1 + (Math.random() * 0.1 - 0.05),
                    message: 'African tourism sector experiencing growth potential.'
                },
                {
                    region: 'Oceania',
                    tourismFactor: 1 + (Math.random() * 0.12 - 0.06),
                    businessFactor: 1 + (Math.random() * 0.08 - 0.04),
                    message: 'Oceania markets maintaining stable conditions.'
                }
            ];

            regionalEvent = regions[Math.floor(Math.random() * regions.length)];
            this.state.addNews(`REGIONAL ECONOMICS: ${regionalEvent.message}`);
        }

        // Small random fluctuations each quarter (-2 to +2)
        const minChange = -2;
        const maxChange = 2;

        this.state.airports.forEach(airport => {
            // Base random fluctuation for tourism
            let tourismChange = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;

            // Base random fluctuation for business
            let businessChange = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;

            // Apply regional factors if event affects this airport's region
            if (regionalEvent && airport.region === regionalEvent.region) {
                // Regional factors affect the magnitude of change
                tourismChange = Math.floor(tourismChange * regionalEvent.tourismFactor);
                businessChange = Math.floor(businessChange * regionalEvent.businessFactor);

                // Also apply a small regional boost/penalty
                const regionalBoost = Math.floor((regionalEvent.tourismFactor - 1) * 10);
                tourismChange += regionalBoost;

                const regionalBusinessBoost = Math.floor((regionalEvent.businessFactor - 1) * 10);
                businessChange += regionalBusinessBoost;
            }

            // Apply changes with bounds
            airport.tourism_score = clamp(airport.tourism_score + tourismChange, 0, 100);
            airport.business_score = clamp(airport.business_score + businessChange, 0, 100);

            // Update difficulty based on new scores
            const avgScore = (airport.tourism_score + airport.business_score) / 2;
            if (avgScore >= 75) {
                airport.difficulty = 'Easy';
            } else if (avgScore >= 55) {
                airport.difficulty = 'Medium';
            } else {
                airport.difficulty = 'Hard';
            }
        });

        // Occasionally report significant individual airport changes (3% chance per quarter)
        if (!regionalEvent && Math.random() < 0.03) {
            const randomAirport = this.state.airports[Math.floor(Math.random() * this.state.airports.length)];
            const events = [
                `Tourism boom in ${randomAirport.name}! Increased visitor numbers reported.`,
                `Business activity surges in ${randomAirport.name} following major investments.`,
                `Economic slowdown affects ${randomAirport.name} market conditions.`,
                `New attractions driving tourism growth in ${randomAirport.name}.`,
                `Corporate relocations boost ${randomAirport.name} business sector.`
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            this.state.addNews(randomEvent);
        }
    }

    // === HUB MANAGEMENT ===

    /**
     * Get all player-owned hubs
     */
    getPlayerHubs(): Airport[] {
        return this.state.airports.filter(a => a.owned && a.is_hub);
    }

    /**
     * Check if player has a hub in the given continent
     */
    hasHubInContinent(continent: string): boolean {
        return this.getPlayerHubs().some(hub => hub.continent === continent);
    }

    /**
     * Get continents where player already has hubs
     */
    getHubContinents(): string[] {
        return this.getPlayerHubs().map(hub => hub.continent);
    }

    /**
     * Check if player can establish a hub at the given airport
     * Returns { canEstablish: boolean, reason?: string }
     */
    canEstablishHub(airportId: string): { canEstablish: boolean; reason?: string } {
        const airport = this.state.airports.find(a => a.id === airportId);

        if (!airport) {
            return { canEstablish: false, reason: 'Airport not found' };
        }

        if (!airport.owned) {
            return { canEstablish: false, reason: 'You must own this airport first' };
        }

        if (airport.is_hub) {
            return { canEstablish: false, reason: 'This airport is already a hub' };
        }

        // Check one hub per continent restriction
        if (this.hasHubInContinent(airport.continent)) {
            const existingHub = this.getPlayerHubs().find(h => h.continent === airport.continent);
            return {
                canEstablish: false,
                reason: `You already have a hub in ${airport.continent} (${existingHub?.name})`
            };
        }

        return { canEstablish: true };
    }

    /**
     * Establish a hub at the given airport
     * This will be used later when hub purchasing is implemented
     */
    establishHub(airportId: string): { success: boolean; error?: string } {
        const check = this.canEstablishHub(airportId);

        if (!check.canEstablish) {
            return { success: false, error: check.reason };
        }

        const airport = this.state.airports.find(a => a.id === airportId);
        if (!airport) {
            return { success: false, error: 'Airport not found' };
        }

        // Calculate hub establishment cost (increases with each hub)
        const hubCount = this.getPlayerHubs().length;
        const baseHubCost = 5000000; // $5M base cost
        const hubCost = baseHubCost * Math.pow(1.5, hubCount); // Exponential increase

        if (!this.state.canAfford(hubCost)) {
            return { success: false, error: `Insufficient funds. Hub cost: $${formatMoney(hubCost)}` };
        }

        // Establish the hub
        airport.is_hub = true;
        this.state.cash -= hubCost;
        this.state.addNews(`✈️ Established new hub at ${airport.name}! Cost: $${formatMoney(hubCost)}`);

        return { success: true };
    }

    // === CONNECTION FLIGHTS ===

    /**
     * Calculate possible connections through hubs
     * Returns a map of hub -> list of connection opportunities
     */
    calculateHubConnections(): Map<string, Array<{ from: string; to: string; distance: number }>> {
        const hubConnections = new Map<string, Array<{ from: string; to: string; distance: number }>>();
        const playerHubs = this.getPlayerHubs();

        // For each hub, find routes that connect through it
        playerHubs.forEach(hub => {
            const connections: Array<{ from: string; to: string; distance: number }> = [];

            // Find all routes TO this hub (feeder routes)
            const inboundRoutes = this.state.routes.filter(r =>
                !r.suspended && r.to === hub.id
            );

            // Find all routes FROM this hub (outbound routes)
            const outboundRoutes = this.state.routes.filter(r =>
                !r.suspended && r.from === hub.id
            );

            // Create connections by pairing inbound with outbound
            inboundRoutes.forEach(inbound => {
                outboundRoutes.forEach(outbound => {
                    // Don't connect a route back to itself
                    if (inbound.from !== outbound.to) {
                        const totalDistance = inbound.distance + outbound.distance;
                        connections.push({
                            from: inbound.from,
                            to: outbound.to,
                            distance: totalDistance
                        });
                    }
                });
            });

            if (connections.length > 0) {
                hubConnections.set(hub.id, connections);
            }
        });

        return hubConnections;
    }

    /**
     * Update connection statistics for all routes
     * Called quarterly during advanceTurn
     */
    updateConnectionStatistics(): void {
        const hubConnections = this.calculateHubConnections();

        // Update hub metrics
        this.state.hubMetrics = [];

        hubConnections.forEach((connections, hubId) => {
            const hub = this.state.findAirport(hubId);
            if (!hub) return;

            // Calculate connections per quarter based on route capacity
            const hubRoutes = this.state.routes.filter(r =>
                !r.suspended && (r.from === hubId || r.to === hubId)
            );

            // Estimate: 20-30% of passengers on hub routes are connections
            const connectionPercentage = 0.25;
            let totalConnectingPassengers = 0;

            hubRoutes.forEach(route => {
                let loadFactor = CONFIG.BASE_LOAD_FACTOR +
                    (this.state.reputation - CONFIG.STARTING_REPUTATION) / 200;
                loadFactor = clamp(loadFactor, 0.4, 0.95);
                loadFactor *= this.state.economicCondition;

                const passengersPerFlight = route.aircraft.type.capacity * loadFactor;
                const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
                const routePassengers = passengersPerFlight * flightsPerQuarter;

                totalConnectingPassengers += routePassengers * connectionPercentage;
            });

            // Calculate hub efficiency based on number of connection opportunities
            // More connections = better hub efficiency (up to a point)
            const optimalConnections = 20; // Sweet spot for hub operations
            const connectionRatio = Math.min(connections.length / optimalConnections, 1.5);
            let efficiency = 50 + (connectionRatio * 30); // Base 50, up to 95

            // Adjust for hub quality factors
            const avgScore = (hub.tourism_score + hub.business_score) / 2;
            efficiency += (avgScore - 50) * 0.2; // Economic strength affects efficiency

            efficiency = clamp(efficiency, 30, 100);

            // Average connection time (estimated based on hub size and efficiency)
            const avgConnectionTime = 90 + (100 - efficiency) * 0.5; // 90-140 minutes

            // Success rate based on efficiency and schedule coordination
            const successRate = clamp(0.85 + (efficiency - 50) * 0.003, 0.75, 0.99);

            this.state.hubMetrics.push({
                airport_id: hubId,
                efficiency_rating: Math.floor(efficiency),
                connections_per_quarter: Math.floor(totalConnectingPassengers),
                avg_connection_time: Math.floor(avgConnectionTime),
                success_rate: successRate
            });

            // Update connection stats for routes involving this hub
            this.updateRouteConnectionStats(hubId, connections, totalConnectingPassengers, efficiency);
        });
    }

    /**
     * Update connection statistics for individual routes
     */
    private updateRouteConnectionStats(
        hubId: string,
        connections: Array<{ from: string; to: string; distance: number }>,
        totalConnections: number,
        hubEfficiency: number
    ): void {
        // Find routes that touch this hub
        const hubRoutes = this.state.routes.filter(r =>
            !r.suspended && (r.from === hubId || r.to === hubId)
        );

        hubRoutes.forEach(route => {
            // Calculate connection bonus based on:
            // 1. Hub efficiency (higher efficiency = higher bonus)
            // 2. Number of connection opportunities
            // 3. Route distance (longer routes get better connection value)

            const efficiencyBonus = (hubEfficiency / 100) * 0.15; // 0-15%
            const connectionDensity = Math.min(connections.length / 15, 1.0);
            const densityBonus = connectionDensity * 0.10; // 0-10%

            // Distance bonus: longer routes benefit more from hub connections
            const distanceBonus = Math.min(route.distance / 5000, 1.0) * 0.05; // 0-5%

            const totalBonus = efficiencyBonus + densityBonus + distanceBonus;

            // Calculate connection quality (0-1)
            const quality = clamp(hubEfficiency / 100, 0.5, 1.0);

            // Estimate passengers on this specific route
            const routeConnections = Math.floor(totalConnections / hubRoutes.length);

            // Build connection patterns (top 5)
            const patterns: string[] = [];
            const relevantConnections = connections.filter(c =>
                c.from === route.from || c.to === route.to || c.from === route.to || c.to === route.from
            ).slice(0, 5);

            relevantConnections.forEach(conn => {
                patterns.push(`${conn.from}->${hubId}->${conn.to}`);
            });

            // Update route connection stats
            route.connections = {
                connecting_passengers: routeConnections,
                connection_patterns: patterns,
                connection_quality: quality,
                connection_bonus: totalBonus
            };
        });
    }

    /**
     * Get hub metrics for a specific airport
     */
    getHubMetrics(airportId: string): HubMetrics | undefined {
        return this.state.hubMetrics.find(m => m.airport_id === airportId);
    }

    // === SCORING ===

    calculateScore(): number {
        const cashScore = this.state.cash / CONFIG.SCORE_CASH_DIVISOR;
        const airportScore = this.state.getOwnedAirports().length * CONFIG.SCORE_AIRPORT_MULTIPLIER;
        const fleetScore = this.state.fleet.length * CONFIG.SCORE_FLEET_MULTIPLIER;
        const reputationScore = this.state.reputation * CONFIG.SCORE_REPUTATION_MULTIPLIER;
        const routeScore = this.state.routes.length * CONFIG.SCORE_ROUTE_MULTIPLIER;

        return Math.floor(cashScore + airportScore + fleetScore + reputationScore + routeScore);
    }
}
