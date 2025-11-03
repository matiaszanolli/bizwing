// Executive candidates available for hire

import { Executive, ExecutiveRole, ExecutiveLevel } from '../models/types';

// Name generation for executives
const FIRST_NAMES = [
    'James', 'Mary', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda',
    'David', 'Elizabeth', 'Richard', 'Barbara', 'Joseph', 'Susan', 'Thomas', 'Jessica',
    'Charles', 'Sarah', 'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa',
    'Anthony', 'Betty', 'Mark', 'Margaret', 'Donald', 'Sandra', 'Steven', 'Ashley',
    'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle'
];

const LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green'
];

// Generate random executive name
export function generateExecutiveName(): string {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    return `${firstName} ${lastName}`;
}

// Calculate salary based on level and role
export function calculateExecutiveSalary(level: ExecutiveLevel, role: ExecutiveRole): number {
    const baseSalaries: Record<ExecutiveLevel, number> = {
        JUNIOR: 50000,   // $50k per quarter
        SENIOR: 100000,  // $100k per quarter
        EXPERT: 200000   // $200k per quarter
    };

    const roleMultipliers: Record<ExecutiveRole, number> = {
        FINANCE: 1.1,     // Highest paid
        STRATEGY: 1.05,
        MARKETING: 1.0,
        OPERATIONS: 0.95
    };

    return Math.floor(baseSalaries[level] * roleMultipliers[role]);
}

// Generate random skill value based on level
function generateSkill(level: ExecutiveLevel, isPrimarySkill: boolean): number {
    const baseRanges: Record<ExecutiveLevel, [number, number]> = {
        JUNIOR: [40, 60],
        SENIOR: [60, 80],
        EXPERT: [80, 95]
    };

    const [min, max] = baseRanges[level];
    const boost = isPrimarySkill ? 10 : 0;

    return Math.floor(Math.random() * (max - min + 1)) + min + boost;
}

// Primary skill for each role
const PRIMARY_SKILLS: Record<ExecutiveRole, keyof Pick<Executive, 'negotiation' | 'marketing' | 'analysis' | 'operations'>> = {
    FINANCE: 'negotiation',
    MARKETING: 'marketing',
    STRATEGY: 'analysis',
    OPERATIONS: 'operations'
};

// Generate a random executive candidate
export function generateExecutive(id: number, role: ExecutiveRole, level: ExecutiveLevel): Executive {
    const primarySkill = PRIMARY_SKILLS[role];

    return {
        id,
        name: generateExecutiveName(),
        role,
        level,
        negotiation: generateSkill(level, primarySkill === 'negotiation'),
        marketing: generateSkill(level, primarySkill === 'marketing'),
        analysis: generateSkill(level, primarySkill === 'analysis'),
        operations: generateSkill(level, primarySkill === 'operations'),
        salary: calculateExecutiveSalary(level, role),
        experience_points: 0,
        current_action: null,
        morale: 75 // Start at 75/100
    };
}

// Generate initial pool of executive candidates
export function generateExecutivePool(count: number = 12): Executive[] {
    const roles: ExecutiveRole[] = ['MARKETING', 'OPERATIONS', 'FINANCE', 'STRATEGY'];
    const levels: ExecutiveLevel[] = ['JUNIOR', 'SENIOR', 'EXPERT'];

    const pool: Executive[] = [];
    let id = 1;

    // Generate a balanced pool
    for (const level of levels) {
        for (const role of roles) {
            pool.push(generateExecutive(id++, role, level));
        }
    }

    // Shuffle and return requested count
    return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

// Executive action costs and durations
export const EXECUTIVE_ACTION_COSTS: Record<string, { cost: number; duration: number }> = {
    SLOT_NEGOTIATION: { cost: 100000, duration: 1 },     // $100k, 1 quarter
    AD_CAMPAIGN: { cost: 500000, duration: 2 },          // $500k, 2 quarters (setup + run)
    ROUTE_ANALYSIS: { cost: 50000, duration: 1 },        // $50k, immediate
    COMPETITOR_INTEL: { cost: 150000, duration: 1 },     // $150k, 1 quarter
    LABOR_RELATIONS: { cost: 200000, duration: 2 },      // $200k, 2 quarters (negotiation)
    GOVT_RELATIONS: { cost: 300000, duration: 3 },       // $300k, 3 quarters (lobbying)
    AIRCRAFT_DEAL: { cost: 100000, duration: 1 },        // $100k, 1 quarter
    HUB_DEVELOPMENT: { cost: 500000, duration: 4 }       // $500k, 4 quarters (construction)
};

// Action success rate calculation
export function calculateActionSuccessRate(
    executive: Executive,
    actionType: string
): number {
    // Base success rate
    let baseRate = 50;

    // Level bonuses
    const levelBonus = {
        JUNIOR: 0,
        SENIOR: 15,
        EXPERT: 30
    }[executive.level];

    // Skill bonuses (different actions use different skills)
    let skillBonus = 0;
    switch (actionType) {
        case 'SLOT_NEGOTIATION':
        case 'AIRCRAFT_DEAL':
            skillBonus = executive.negotiation * 0.3;
            break;
        case 'AD_CAMPAIGN':
            skillBonus = executive.marketing * 0.3;
            break;
        case 'ROUTE_ANALYSIS':
        case 'COMPETITOR_INTEL':
            skillBonus = executive.analysis * 0.3;
            break;
        case 'LABOR_RELATIONS':
        case 'GOVT_RELATIONS':
        case 'HUB_DEVELOPMENT':
            skillBonus = executive.operations * 0.3;
            break;
    }

    // Morale affects success rate
    const moraleBonus = (executive.morale - 50) * 0.2; // -10 to +10

    // Total success rate (capped at 95%)
    return Math.min(95, Math.floor(baseRate + levelBonus + skillBonus + moraleBonus));
}

// Experience gain from successful actions
export const EXECUTIVE_XP_GAIN: Record<ExecutiveLevel, number> = {
    JUNIOR: 100,   // Levels up faster
    SENIOR: 50,    // Moderate progression
    EXPERT: 25     // Slow progression (already elite)
};

// XP required to level up
export const EXECUTIVE_LEVEL_UP_XP: Record<ExecutiveLevel, number> = {
    JUNIOR: 500,   // Junior -> Senior
    SENIOR: 1000,  // Senior -> Expert
    EXPERT: 99999  // Can't level up from Expert
};

// Morale changes
export const MORALE_CHANGES = {
    ACTION_SUCCESS: 5,
    ACTION_FAILURE: -10,
    QUARTERLY_DECAY: -2,  // Morale slowly decays if not doing actions
    SALARY_BONUS: 10,     // Give bonus to boost morale
    FIRED_COLLEAGUE: -5   // When another executive is fired
};
