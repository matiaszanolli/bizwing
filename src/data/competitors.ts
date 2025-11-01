// Competitor airline profiles

export type CompetitorStrategy = 'expansion' | 'profit' | 'balanced';

export interface Competitor {
    name: string;
    cash: number;
    color: string;
    reputation: number;
    routes: any[]; // Will be properly typed when we port the route interface
    fleet: any[]; // Will be properly typed when we port the fleet interface
    airports: string[]; // Airport IDs
    aggressive: boolean;
    strategy: CompetitorStrategy;
}

export const competitorProfiles: Competitor[] = [
    {
        name: 'Global Airways',
        cash: 60000000,
        color: '#ff0000',
        reputation: 70,
        routes: [],
        fleet: [],
        airports: [],
        aggressive: true,
        strategy: 'expansion'
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
export function createCompetitors(): Competitor[] {
    return JSON.parse(JSON.stringify(competitorProfiles));
}
