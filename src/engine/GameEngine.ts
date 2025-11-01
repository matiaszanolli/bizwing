// Main game engine

import { GameState } from '../models/GameState';
import { CONFIG } from '../utils/config';
import { calculateDistance, formatMoney, clamp, generateId } from '../utils/helpers';
import { getRandomEvent } from '../data/events';
import { AircraftType } from '../data/aircraft';
import { Airport } from '../data/airports';
import { Route, ActiveEvent } from '../models/types';

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

    constructor() {
        this.state = new GameState();
    }

    // Initialize new game
    initialize(): void {
        this.state.initialize();
    }

    // === AIRCRAFT MANAGEMENT ===

    buyAircraft(planeType: AircraftType): boolean {
        if (this.state.canAfford(planeType.price)) {
            this.state.cash -= planeType.price;
            const newId = generateId();
            this.state.fleet.push({
                id: newId,
                type: planeType,
                name: `Phoenix ${newId}`,
                assigned_route: null,
                owned: true,
                age: 0
            });
            this.state.addNews(`Purchased ${planeType.name} for $${formatMoney(planeType.price)}`);
            return true;
        } else {
            this.state.addNews('Insufficient funds to purchase aircraft!');
            return false;
        }
    }

    leaseAircraft(planeType: AircraftType): boolean {
        const newId = generateId();
        this.state.fleet.push({
            id: newId,
            type: planeType,
            name: `Phoenix ${newId}`,
            assigned_route: null,
            owned: false,
            age: 0
        });
        this.state.addNews(`Leased ${planeType.name} for $${formatMoney(planeType.lease_per_quarter)}/quarter`);
        return true;
    }

    sellAircraft(aircraftId: number): { success: boolean; error?: string; amount?: number } {
        const aircraft = this.state.findAircraft(aircraftId);

        if (!aircraft) {
            return { success: false, error: 'Aircraft not found!' };
        }

        if (!aircraft.owned) {
            return { success: false, error: 'Cannot sell leased aircraft! (You can only return it)' };
        }

        if (aircraft.assigned_route) {
            return { success: false, error: 'Cannot sell aircraft assigned to a route! Remove it from the route first.' };
        }

        // Calculate resale value (depreciation based on age)
        const baseValue = aircraft.type.price;
        const depreciationRate = 0.10; // 10% per quarter
        const depreciationFactor = Math.pow(1 - depreciationRate, aircraft.age);
        const resaleValue = Math.floor(baseValue * depreciationFactor * 0.6); // Resale at 60% of depreciated value

        // Remove aircraft from fleet
        const aircraftIndex = this.state.fleet.findIndex(a => a.id === aircraftId);
        if (aircraftIndex !== -1) {
            this.state.fleet.splice(aircraftIndex, 1);
        }

        // Add cash from sale
        this.state.cash += resaleValue;

        this.state.addNews(`Sold ${aircraft.type.name} for $${formatMoney(resaleValue)}`);
        return { success: true, amount: resaleValue };
    }

    returnLeasedAircraft(aircraftId: number): { success: boolean; error?: string } {
        const aircraft = this.state.findAircraft(aircraftId);

        if (!aircraft) {
            return { success: false, error: 'Aircraft not found!' };
        }

        if (aircraft.owned) {
            return { success: false, error: 'This aircraft is owned, not leased! Use "Sell" instead.' };
        }

        if (aircraft.assigned_route) {
            return { success: false, error: 'Cannot return aircraft assigned to a route! Remove it from the route first.' };
        }

        // Remove aircraft from fleet
        const aircraftIndex = this.state.fleet.findIndex(a => a.id === aircraftId);
        if (aircraftIndex !== -1) {
            this.state.fleet.splice(aircraftIndex, 1);
        }

        this.state.addNews(`Returned leased ${aircraft.type.name}`);
        return { success: true };
    }

    // === AIRPORT MANAGEMENT ===

    buyAirportSlot(airport: Airport): boolean {
        const slotPrice = airport.market_size * CONFIG.AIRPORT_PRICE_MULTIPLIER;

        if (this.state.canAfford(slotPrice)) {
            this.state.cash -= slotPrice;
            airport.owned = true;
            this.state.addNews(`Acquired slots at ${airport.name}`);
            return true;
        } else {
            this.state.addNews('Insufficient funds to purchase airport slot!');
            return false;
        }
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

        // Check range
        const distance = calculateDistance(from, to);
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
            distance: distance
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
            revenue += this.calculateRouteRevenue(route);
        });
        return Math.floor(revenue);
    }

    calculateRouteRevenue(route: Route): number {
        const from = this.state.findAirport(route.from);
        const to = this.state.findAirport(route.to);

        if (!from || !to) return 0;

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

        return revenuePerFlight * flightsPerQuarter;
    }

    // === EXPENSE CALCULATION ===

    calculateQuarterlyExpenses(): number {
        let expenses = 0;

        // Operating costs for routes (affected by fuel prices)
        this.state.routes.forEach(route => {
            const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
            const baseCost = route.aircraft.type.operating_cost * flightsPerQuarter;
            expenses += baseCost * this.state.fuelPrice;
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

        // Fleet maintenance
        this.state.fleet.forEach(aircraft => {
            const agePenalty = 1 + (aircraft.age / CONFIG.AIRCRAFT_MAINTENANCE_AGE_FACTOR);
            expenses += CONFIG.AIRCRAFT_MAINTENANCE_BASE * agePenalty;
        });

        // Loan payments
        this.state.loans.forEach(loan => {
            expenses += loan.quarterly_payment;
        });

        // Advertising budget
        expenses += this.state.advertisingBudget;

        // Research costs
        expenses += this.state.researchLevel * 100000;

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

    estimateRouteProfitability(route: Route): number {
        const revenue = this.calculateRouteRevenue(route);
        const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
        const operatingCost = route.aircraft.type.operating_cost * flightsPerQuarter * this.state.fuelPrice;
        const leaseCost = route.aircraft.owned ? 0 : route.aircraft.type.lease_per_quarter;
        return revenue - operatingCost - leaseCost;
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
        this.state.fleet.forEach(aircraft => {
            aircraft.age++;
        });

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

        // Check game over
        if (this.state.cash < CONFIG.BANKRUPTCY_THRESHOLD) {
            return { gameOver: true, reason: 'bankruptcy' };
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
            return { victory: true, score: this.calculateScore() };
        }

        return { continue: true };
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
