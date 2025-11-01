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

    // Costs
    AIRPORT_MAINTENANCE_PER_QUARTER: 500000,
    AIRCRAFT_MAINTENANCE_BASE: 200000,
    AIRCRAFT_MAINTENANCE_AGE_FACTOR: 40, // Divisor for age penalty

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
};

// Difficulty settings
export const DIFFICULTY = {
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
export let currentDifficulty = 'NORMAL';

export function setDifficulty(level) {
    if (DIFFICULTY[level]) {
        currentDifficulty = level;
        return true;
    }
    return false;
}

export function getDifficultySettings() {
    return DIFFICULTY[currentDifficulty];
}
