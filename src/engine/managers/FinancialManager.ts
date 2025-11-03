// Financial calculations subsystem

import { BaseManager } from './BaseManager';
import { CONFIG } from '../../utils/config';
import { formatMoney } from '../../utils/helpers';
import { Loan } from '../../models/types';

export class FinancialManager extends BaseManager {
    /**
     * Take out a loan
     */
    takeLoan(amount: number, quarters: number): boolean {
        const interestRate = CONFIG.LOAN_INTEREST_RATE;
        const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));
        const principalPayment = amount / quarters;

        const loan: Loan = {
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

    /**
     * Process loan payments for the quarter
     */
    processLoans(): void {
        this.state.loans = this.state.loans.filter(loan => {
            loan.quarters_remaining--;
            loan.remaining -= loan.principal_payment;

            if (loan.quarters_remaining <= 0) {
                this.state.addNews(`Loan of $${formatMoney(loan.original_amount)} fully repaid!`);
                return false; // Remove loan
            }
            return true; // Keep loan
        });
    }

    /**
     * Calculate total debt
     */
    getTotalDebt(): number {
        return this.state.loans.reduce((sum, loan) => sum + loan.remaining, 0);
    }

    /**
     * Calculate quarterly revenue
     */
    calculateQuarterlyRevenue(): number {
        let revenue = 0;

        // Revenue from all active (non-suspended) routes
        this.state.routes.forEach(route => {
            if (!route.suspended) {
                // Calculate route revenue (simplified for manager)
                const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
                const baseRevenue = route.aircraft.type.capacity * CONFIG.PRICE_PER_KM * route.distance;
                const loadFactor = CONFIG.BASE_LOAD_FACTOR;

                revenue += baseRevenue * flightsPerQuarter * loadFactor * this.state.economicCondition;
            }
        });

        return Math.floor(revenue);
    }

    /**
     * Calculate quarterly expenses
     */
    calculateQuarterlyExpenses(
        aircraftManager: { getFuelEfficiencyMultiplier(age: number): number; getMaintenanceMultiplier(age: number): number },
        executiveManager: { getExecutiveSalaries(): number }
    ): number {
        let expenses = 0;

        // Operating costs for routes (affected by fuel prices and aircraft age)
        this.state.routes.forEach(route => {
            if (!route.suspended) {
                const flightsPerQuarter = route.flights_per_week * CONFIG.WEEKS_PER_QUARTER;
                const fuelEfficiencyMultiplier = aircraftManager.getFuelEfficiencyMultiplier(route.aircraft.age);
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
            const maintenanceMultiplier = aircraftManager.getMaintenanceMultiplier(aircraft.age);
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
        expenses += executiveManager.getExecutiveSalaries();

        return Math.floor(expenses);
    }

    /**
     * Set advertising budget
     */
    setAdvertisingBudget(amount: number): boolean {
        if (amount < 0) return false;
        this.state.advertisingBudget = amount;
        return true;
    }

    /**
     * Calculate score for victory screen
     */
    calculateScore(): number {
        let score = 0;

        // Cash (divided by 1M)
        score += Math.floor(this.state.cash / CONFIG.SCORE_CASH_DIVISOR);

        // Airports owned
        const ownedAirports = this.state.getOwnedAirports();
        score += ownedAirports.length * CONFIG.SCORE_AIRPORT_MULTIPLIER;

        // Fleet size
        score += this.state.fleet.length * CONFIG.SCORE_FLEET_MULTIPLIER;

        // Reputation
        score += this.state.reputation * CONFIG.SCORE_REPUTATION_MULTIPLIER;

        // Active routes
        score += this.state.routes.length * CONFIG.SCORE_ROUTE_MULTIPLIER;

        return score;
    }
}
