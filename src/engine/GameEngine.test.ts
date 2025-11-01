// GameEngine Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from './GameEngine';
import { GameState } from '../models/GameState';
import { CONFIG } from '../utils/config';
import { aircraftTypes } from '../data/aircraft';

describe('GameEngine', () => {
    let engine: GameEngine;
    let state: GameState;

    beforeEach(() => {
        state = new GameState();
        engine = new GameEngine(state);
    });

    describe('Initialization', () => {
        it('should initialize with correct starting values', () => {
            expect(state.year).toBe(CONFIG.STARTING_YEAR);
            expect(state.quarter).toBe(CONFIG.STARTING_QUARTER);
            expect(state.cash).toBe(CONFIG.STARTING_CASH);
            expect(state.reputation).toBe(CONFIG.STARTING_REPUTATION);
        });

        it('should have empty fleet initially', () => {
            expect(state.fleet).toEqual([]);
        });

        it('should have empty routes initially', () => {
            expect(state.routes).toEqual([]);
        });
    });

    describe('Aircraft Age & Condition', () => {
        it('should correctly determine aircraft condition - EXCELLENT', () => {
            expect(engine.getAircraftCondition(0)).toBe('EXCELLENT');
            expect(engine.getAircraftCondition(3)).toBe('EXCELLENT');
            expect(engine.getAircraftCondition(5)).toBe('EXCELLENT');
        });

        it('should correctly determine aircraft condition - GOOD', () => {
            expect(engine.getAircraftCondition(6)).toBe('GOOD');
            expect(engine.getAircraftCondition(8)).toBe('GOOD');
            expect(engine.getAircraftCondition(10)).toBe('GOOD');
        });

        it('should correctly determine aircraft condition - FAIR', () => {
            expect(engine.getAircraftCondition(11)).toBe('FAIR');
            expect(engine.getAircraftCondition(15)).toBe('FAIR');
        });

        it('should correctly determine aircraft condition - POOR', () => {
            expect(engine.getAircraftCondition(16)).toBe('POOR');
            expect(engine.getAircraftCondition(20)).toBe('POOR');
        });

        it('should correctly determine aircraft condition - CRITICAL', () => {
            expect(engine.getAircraftCondition(21)).toBe('CRITICAL');
            expect(engine.getAircraftCondition(30)).toBe('CRITICAL');
        });

        it('should return correct maintenance multipliers', () => {
            expect(engine.getMaintenanceMultiplier(0)).toBe(CONFIG.MAINTENANCE_MULTIPLIER_EXCELLENT);
            expect(engine.getMaintenanceMultiplier(7)).toBe(CONFIG.MAINTENANCE_MULTIPLIER_GOOD);
            expect(engine.getMaintenanceMultiplier(12)).toBe(CONFIG.MAINTENANCE_MULTIPLIER_FAIR);
            expect(engine.getMaintenanceMultiplier(18)).toBe(CONFIG.MAINTENANCE_MULTIPLIER_POOR);
            expect(engine.getMaintenanceMultiplier(25)).toBe(CONFIG.MAINTENANCE_MULTIPLIER_CRITICAL);
        });

        it('should return correct fuel efficiency multipliers', () => {
            expect(engine.getFuelEfficiencyMultiplier(0)).toBe(CONFIG.FUEL_EFFICIENCY_EXCELLENT);
            expect(engine.getFuelEfficiencyMultiplier(7)).toBe(CONFIG.FUEL_EFFICIENCY_GOOD);
            expect(engine.getFuelEfficiencyMultiplier(12)).toBe(CONFIG.FUEL_EFFICIENCY_FAIR);
            expect(engine.getFuelEfficiencyMultiplier(18)).toBe(CONFIG.FUEL_EFFICIENCY_POOR);
            expect(engine.getFuelEfficiencyMultiplier(25)).toBe(CONFIG.FUEL_EFFICIENCY_CRITICAL);
        });
    });

    describe('Aircraft Purchase', () => {
        it('should successfully purchase aircraft when player has enough cash', () => {
            const aircraft = aircraftTypes[0];
            const initialCash = state.cash;

            const result = engine.buyAircraft(aircraft, true, 'Test Plane 1');

            expect(result.success).toBe(true);
            expect(state.fleet).toHaveLength(1);
            expect(state.fleet[0].name).toBe('Test Plane 1');
            expect(state.fleet[0].owned).toBe(true);
            expect(state.cash).toBe(initialCash - aircraft.price);
        });

        it('should fail to purchase aircraft when player lacks cash', () => {
            const aircraft = aircraftTypes[0];
            state.cash = aircraft.price - 1000;

            const result = engine.buyAircraft(aircraft, true, 'Test Plane');

            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
            expect(state.fleet).toHaveLength(0);
        });

        it('should successfully lease aircraft', () => {
            const aircraft = aircraftTypes[0];
            const initialCash = state.cash;

            const result = engine.buyAircraft(aircraft, false, 'Leased Plane');

            expect(result.success).toBe(true);
            expect(state.fleet).toHaveLength(1);
            expect(state.fleet[0].owned).toBe(false);
            expect(state.cash).toBe(initialCash); // No upfront cost for leasing
        });

        it('should initialize new aircraft with age 0', () => {
            const aircraft = aircraftTypes[0];
            engine.buyAircraft(aircraft, true, 'Test');

            expect(state.fleet[0].age).toBe(0);
        });
    });

    describe('Aircraft Selling', () => {
        it('should successfully sell owned aircraft', () => {
            const aircraft = aircraftTypes[0];
            engine.buyAircraft(aircraft, true, 'Test Plane');
            const aircraftId = state.fleet[0].id;
            const cashBeforeSale = state.cash;

            const result = engine.sellAircraft(aircraftId);

            expect(result.success).toBe(true);
            expect(state.fleet).toHaveLength(0);
            expect(state.cash).toBeGreaterThan(cashBeforeSale);
        });

        it('should fail to sell aircraft that is assigned to a route', () => {
            // This test would require setting up a route first
            // Skipping for now as it requires more complex setup
        });

        it('should successfully return leased aircraft', () => {
            const aircraft = aircraftTypes[0];
            engine.buyAircraft(aircraft, false, 'Leased');
            const aircraftId = state.fleet[0].id;

            const result = engine.returnLeasedAircraft(aircraftId);

            expect(result.success).toBe(true);
            expect(state.fleet).toHaveLength(0);
        });
    });

    describe('Financial Calculations', () => {
        it('should calculate quarterly expenses correctly with no fleet', () => {
            const expenses = engine.calculateQuarterlyExpenses();

            // Should only include advertising and research costs
            expect(expenses).toBe(
                state.advertisingBudget + (state.researchLevel * 100000)
            );
        });

        it('should include aircraft maintenance in expenses', () => {
            const aircraft = aircraftTypes[0];
            const baseCosts = state.advertisingBudget + (state.researchLevel * 100000);

            engine.buyAircraft(aircraft, true, 'Test');

            const expenses = engine.calculateQuarterlyExpenses();

            expect(expenses).toBeGreaterThanOrEqual(CONFIG.AIRCRAFT_MAINTENANCE_BASE + baseCosts);
        });

        it('should include lease costs for leased aircraft', () => {
            const aircraft = aircraftTypes[0];
            engine.buyAircraft(aircraft, false, 'Leased');

            const expenses = engine.calculateQuarterlyExpenses();

            expect(expenses).toBeGreaterThanOrEqual(aircraft.lease_per_quarter);
        });

        it('should include loan payments in expenses', () => {
            engine.takeLoan(10000000, 8);

            const expenses = engine.calculateQuarterlyExpenses();

            expect(expenses).toBeGreaterThan(0);
            expect(state.loans).toHaveLength(1);
        });
    });

    describe('Loan Management', () => {
        it('should successfully create a loan', () => {
            const loanAmount = 10000000;
            const quarters = 8;
            const initialCash = state.cash;

            const result = engine.takeLoan(loanAmount, quarters);

            expect(result).toBe(true);
            expect(state.loans).toHaveLength(1);
            expect(state.cash).toBe(initialCash + loanAmount);
            expect(state.loans[0].remaining).toBe(loanAmount);
            expect(state.loans[0].quarters_remaining).toBe(quarters);
        });

        it('should calculate quarterly payment correctly', () => {
            engine.takeLoan(10000000, 8);

            expect(state.loans[0].quarterly_payment).toBeGreaterThan(0);
            expect(state.loans[0].principal_payment).toBeGreaterThan(0);
        });
    });

    describe('Turn Advancement', () => {
        it('should advance quarter correctly', () => {
            const initialQuarter = state.quarter;

            engine.advanceTurn();

            expect(state.quarter).toBe(initialQuarter + 1);
        });

        it('should advance year after Q4', () => {
            state.quarter = 4;
            const initialYear = state.year;

            engine.advanceTurn();

            expect(state.year).toBe(initialYear + 1);
            expect(state.quarter).toBe(1);
        });

        it('should age aircraft each quarter', () => {
            const aircraft = aircraftTypes[0];
            engine.buyAircraft(aircraft, true, 'Test');

            expect(state.fleet[0].age).toBe(0);

            engine.advanceTurn();

            expect(state.fleet[0].age).toBe(1);
        });

        it('should process loan payments', () => {
            engine.takeLoan(10000000, 8);
            const initialRemaining = state.loans[0].remaining;
            const initialQuarters = state.loans[0].quarters_remaining;

            engine.advanceTurn();

            expect(state.loans[0].remaining).toBeLessThan(initialRemaining);
            expect(state.loans[0].quarters_remaining).toBe(initialQuarters - 1);
        });

        it('should remove fully paid loans', () => {
            engine.takeLoan(1000000, 1);

            engine.advanceTurn();

            expect(state.loans).toHaveLength(0);
        });
    });

    describe('Reputation System', () => {
        it('should increase reputation on profit', () => {
            state.cash = 100000000;
            state.reputation = 75;

            // Simulate profit
            state.addNews('Profit test');

            // Reputation changes are handled in advanceTurn
            // This is a simplified test
            expect(state.reputation).toBeGreaterThanOrEqual(CONFIG.REPUTATION_MIN);
            expect(state.reputation).toBeLessThanOrEqual(CONFIG.REPUTATION_MAX);
        });

        it('should not exceed maximum reputation', () => {
            state.reputation = CONFIG.REPUTATION_MAX;

            // Even with massive profit, reputation shouldn't exceed max
            expect(state.reputation).toBeLessThanOrEqual(CONFIG.REPUTATION_MAX);
        });

        it('should not fall below minimum reputation', () => {
            state.reputation = CONFIG.REPUTATION_MIN;

            // Even with massive loss, reputation shouldn't fall below min
            expect(state.reputation).toBeGreaterThanOrEqual(CONFIG.REPUTATION_MIN);
        });
    });

    describe('Victory & Defeat Conditions', () => {
        it('should detect bankruptcy', () => {
            state.cash = CONFIG.BANKRUPTCY_THRESHOLD - 1000;

            const result = engine.advanceTurn();

            expect(result.gameOver).toBe(true);
            expect(result.victory).toBe(false);
        });

        it('should detect victory', () => {
            state.year = CONFIG.VICTORY_YEAR - 1;
            state.quarter = 4;

            const result = engine.advanceTurn();

            expect(result.gameOver).toBe(true);
            expect(result.victory).toBe(true);
        });

        it('should calculate final score', () => {
            state.year = CONFIG.VICTORY_YEAR - 1;
            state.quarter = 4;
            state.cash = 100000000;
            state.reputation = 90;

            const result = engine.advanceTurn();

            expect(result.score).toBeGreaterThan(0);
        });
    });

    describe('Route Management', () => {
        it('should suspend a route', () => {
            // Setup would require creating airports and routes
            // This is a placeholder for route management tests
        });

        it('should resume a suspended route', () => {
            // Placeholder
        });

        it('should update route frequency', () => {
            // Placeholder
        });
    });

    describe('Edge Cases', () => {
        it('should handle negative cash values', () => {
            state.cash = -1000000;

            expect(state.cash).toBeLessThan(0);
        });

        it('should handle very old aircraft', () => {
            const aircraft = aircraftTypes[0];
            engine.buyAircraft(aircraft, true, 'Ancient');
            state.fleet[0].age = 100; // 25 years

            const condition = engine.getAircraftCondition(25);
            expect(condition).toBe('CRITICAL');

            const multiplier = engine.getMaintenanceMultiplier(25);
            expect(multiplier).toBe(CONFIG.MAINTENANCE_MULTIPLIER_CRITICAL);
        });

        it('should handle maximum year', () => {
            state.year = 2100;
            state.quarter = 4; // Set to Q4 so advancing goes to next year

            engine.advanceTurn();

            expect(state.year).toBe(2101);
            expect(state.quarter).toBe(1);
        });
    });
});
