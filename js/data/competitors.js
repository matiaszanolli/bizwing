// Competitor airline profiles
export const competitorProfiles = [
    {
        name: 'Global Airways',
        cash: 60000000,
        color: '#ff0000',
        reputation: 70,
        routes: [],
        fleet: [],
        airports: [],
        aggressive: true,
        strategy: 'expansion' // expansion, profit, balanced
    },
    {
        name: 'Sky Connect',
        cash: 55000000,
        color: '#00ffff',
        reputation: 75,
        routes: [],
        fleet: [],
        airports: [],
        aggressive: false,
        strategy: 'balanced'
    },
    {
        name: 'Pacific Airlines',
        cash: 45000000,
        color: '#ff00ff',
        reputation: 65,
        routes: [],
        fleet: [],
        airports: [],
        aggressive: true,
        strategy: 'expansion'
    }
];

// Create fresh competitor instances
export function createCompetitors() {
    return JSON.parse(JSON.stringify(competitorProfiles));
}
