// Random event templates
export const eventTemplates = [
    {
        type: 'fuel_crisis',
        name: 'Oil Crisis',
        description: 'Fuel prices surge by 50%',
        fuelMultiplier: 1.5,
        duration: 4
    },
    {
        type: 'fuel_drop',
        name: 'Oil Glut',
        description: 'Fuel prices drop by 30%',
        fuelMultiplier: 0.7,
        duration: 4
    },
    {
        type: 'economic_boom',
        name: 'Economic Boom',
        description: 'Passenger demand increases 40%',
        demandMultiplier: 1.4,
        duration: 8
    },
    {
        type: 'recession',
        name: 'Economic Recession',
        description: 'Passenger demand drops 35%',
        demandMultiplier: 0.65,
        duration: 6
    },
    {
        type: 'airport_strike',
        name: 'Airport Strike',
        description: 'Operations disrupted at major hub',
        reputationChange: -10,
        cashChange: -2000000
    },
    {
        type: 'tech_breakthrough',
        name: 'Technology Advance',
        description: 'New aircraft technology available',
        researchBonus: 1
    },
    {
        type: 'competitor_bankrupt',
        name: 'Competitor Bankruptcy',
        description: 'A rival airline has gone bankrupt',
        marketShareBonus: 0.1
    },
    {
        type: 'tourism_boom',
        name: 'Tourism Boom',
        description: 'International travel surges',
        demandMultiplier: 1.2,
        duration: 6
    },
    {
        type: 'volcanic_ash',
        name: 'Volcanic Eruption',
        description: 'Ash cloud disrupts European flights',
        reputationChange: -5,
        cashChange: -1000000
    },
    {
        type: 'pandemic_scare',
        name: 'Health Scare',
        description: 'Travel warnings reduce demand',
        demandMultiplier: 0.8,
        duration: 3
    }
];

// Get random event
export function getRandomEvent() {
    const index = Math.floor(Math.random() * eventTemplates.length);
    return { ...eventTemplates[index] };
}
