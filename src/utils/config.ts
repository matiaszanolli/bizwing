// Game configuration and constants

export const CONFIG = {
    // Starting conditions
    STARTING_YEAR: 1992,
    STARTING_QUARTER: 1,
    STARTING_CASH: 50000000,
    STARTING_REPUTATION: 75,
    STARTING_AIRCRAFT_COUNT: 2,

    // Economic parameters
    BASE_LOAD_FACTOR: 0.75,
    PRICE_PER_KM: 0.15,
    WEEKS_PER_QUARTER: 13,

    // Interest rates
    LOAN_INTEREST_RATE: 0.02, // 2% per quarter
    EMERGENCY_LOAN_INTEREST_RATE: 0.05, // 5% per quarter (harsh!)

    // Costs
    AIRPORT_MAINTENANCE_PER_QUARTER: 500000,
    AIRCRAFT_MAINTENANCE_BASE: 200000,
    AIRCRAFT_MAINTENANCE_AGE_FACTOR: 40, // Divisor for age penalty (legacy)

    // Aircraft Age & Maintenance System
    AIRCRAFT_AGE_EXCELLENT: 5,      // Years 0-5: Excellent condition
    AIRCRAFT_AGE_GOOD: 10,          // Years 6-10: Good condition
    AIRCRAFT_AGE_FAIR: 15,          // Years 11-15: Fair condition
    AIRCRAFT_AGE_POOR: 20,          // Years 16-20: Poor condition
    // Above 20: Critical condition

    // Maintenance cost multipliers by condition
    MAINTENANCE_MULTIPLIER_EXCELLENT: 1.0,   // Base cost
    MAINTENANCE_MULTIPLIER_GOOD: 1.3,        // +30%
    MAINTENANCE_MULTIPLIER_FAIR: 1.7,        // +70%
    MAINTENANCE_MULTIPLIER_POOR: 2.3,        // +130%
    MAINTENANCE_MULTIPLIER_CRITICAL: 3.5,    // +250%

    // Fuel efficiency degradation by condition
    FUEL_EFFICIENCY_EXCELLENT: 1.0,   // No penalty
    FUEL_EFFICIENCY_GOOD: 1.05,       // +5% fuel consumption
    FUEL_EFFICIENCY_FAIR: 1.15,       // +15% fuel consumption
    FUEL_EFFICIENCY_POOR: 1.30,       // +30% fuel consumption
    FUEL_EFFICIENCY_CRITICAL: 1.60,   // +60% fuel consumption

    // Maintenance warnings
    MAINTENANCE_WARNING_AGE: 15,      // Warn when aircraft reaches this age
    MAINTENANCE_CRITICAL_AGE: 20,     // Critical warning at this age

    // Airport pricing
    AIRPORT_PRICE_MULTIPLIER: 10, // market_size * this

    // Reputation
    REPUTATION_MIN: 0,
    REPUTATION_MAX: 100,
    REPUTATION_GAIN_ON_PROFIT: 1,
    REPUTATION_LOSS_ON_LOSS: 2,
    ADVERTISING_REPUTATION_FACTOR: 1000000, // $1M advertising = 1 rep point

    // Competition
    COMPETITION_PENALTY_PER_COMPETITOR: 0.1, // 10% load factor reduction

    // Events
    EVENT_PROBABILITY_PER_QUARTER: 0.1, // 10% chance

    // AI
    AI_EXPANSION_CASH_THRESHOLD: 15000000,
    AI_EXPANSION_PROBABILITY: 0.15,
    AI_BASE_PROFIT_PER_AIRPORT: 2000000,

    // Win/Loss conditions
    BANKRUPTCY_THRESHOLD: -10000000,
    LOW_CASH_WARNING_THRESHOLD: 5000000, // Warn when cash drops below $5M
    EMERGENCY_LOAN_MIN_AMOUNT: 10000000, // Minimum $10M emergency loan
    CONSECUTIVE_LOSSES_FOR_EMERGENCY: 2, // 2 quarters of losses triggers emergency
    VICTORY_YEAR: 2000,

    // Scoring
    SCORE_CASH_DIVISOR: 1000000,
    SCORE_AIRPORT_MULTIPLIER: 100,
    SCORE_FLEET_MULTIPLIER: 50,
    SCORE_REPUTATION_MULTIPLIER: 10,
    SCORE_ROUTE_MULTIPLIER: 75,

    // UI
    NEWS_DISPLAY_COUNT: 5,
    MAP_WIDTH: 800,
    MAP_HEIGHT: 400
} as const;

// Difficulty settings
export interface DifficultySettings {
    startingCash: number;
    loanInterestRate: number;
    competitorAggression: number;
    eventProbability: number;
}

export type DifficultyLevel = 'EASY' | 'NORMAL' | 'HARD';

export const DIFFICULTY: Record<DifficultyLevel, DifficultySettings> = {
    EASY: {
        startingCash: 75000000,
        loanInterestRate: 0.015,
        competitorAggression: 0.7,
        eventProbability: 0.05
    },
    NORMAL: {
        startingCash: 50000000,
        loanInterestRate: 0.02,
        competitorAggression: 1.0,
        eventProbability: 0.1
    },
    HARD: {
        startingCash: 35000000,
        loanInterestRate: 0.025,
        competitorAggression: 1.3,
        eventProbability: 0.15
    }
};

// Current difficulty (can be changed)
let currentDifficulty: DifficultyLevel = 'NORMAL';

export function setDifficulty(level: DifficultyLevel): boolean {
    if (DIFFICULTY[level]) {
        currentDifficulty = level;
        return true;
    }
    return false;
}

export function getDifficultySettings(): DifficultySettings {
    return DIFFICULTY[currentDifficulty];
}

export function getCurrentDifficulty(): DifficultyLevel {
    return currentDifficulty;
}
