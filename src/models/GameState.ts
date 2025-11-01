// Game state model

import { CONFIG } from '../utils/config';
import { deepClone } from '../utils/helpers';
import { airports, Airport } from '../data/airports';
import { createCompetitors, Competitor } from '../data/competitors';
import { aircraftTypes } from '../data/aircraft';
import {
    FleetAircraft,
    Route,
    Loan,
    ActiveEvent,
    SerializedGameState
} from './types';

export class GameState {
    year: number;
    quarter: number;
    cash: number;
    playerAirline: string;
    reputation: number;

    airports: Airport[];
    fleet: FleetAircraft[];
    routes: Route[];
    competitors: Competitor[];
    newsLog: string[];
    loans: Loan[];
    events: ActiveEvent[];

    researchLevel: number;
    advertisingBudget: number;
    fuelPrice: number;
    economicCondition: number;

    constructor() {
        this.year = CONFIG.STARTING_YEAR;
        this.quarter = CONFIG.STARTING_QUARTER;
        this.cash = CONFIG.STARTING_CASH;
        this.playerAirline = 'Phoenix Air';
        this.reputation = CONFIG.STARTING_REPUTATION;

        this.airports = [];
        this.fleet = [];
        this.routes = [];
        this.competitors = [];
        this.newsLog = [];
        this.loans = [];
        this.events = [];

        this.researchLevel = 0;
        this.advertisingBudget = 0;
        this.fuelPrice = 1.0;
        this.economicCondition = 1.0;
    }

    // Initialize new game
    initialize(): void {
        // Clone airport data
        this.airports = deepClone(airports);

        // Initialize competitors
        this.competitors = createCompetitors();

        // Give competitors starting airports
        this.competitors.forEach(comp => {
            const numAirports = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < numAirports; i++) {
                const availableAirports = this.airports.filter(
                    a => !a.owned && !a.competitor_owned
                );
                if (availableAirports.length > 0) {
                    const airport = availableAirports[
                        Math.floor(Math.random() * availableAirports.length)
                    ];
                    airport.competitor_owned = comp.name;
                    comp.airports.push(airport.id);
                }
            }
        });

        // Add starting aircraft
        for (let i = 0; i < CONFIG.STARTING_AIRCRAFT_COUNT; i++) {
            this.fleet.push({
                id: i + 1,
                type: aircraftTypes[2], // Boeing 737-300
                name: `Phoenix ${i + 1}`,
                assigned_route: null,
                owned: true,
                age: 0
            });
        }

        // Add welcome messages
        this.addNews('Welcome to BizWing! Build your airline empire.');
        this.addNews('Manage routes, finances, and compete with rivals to dominate the skies.');
    }

    // Add news item
    addNews(message: string): void {
        this.newsLog.push(message);
        // Keep only last 50 messages to prevent memory issues
        if (this.newsLog.length > 50) {
            this.newsLog = this.newsLog.slice(-50);
        }
    }

    // Get total debt
    getTotalDebt(): number {
        return this.loans.reduce((sum, loan) => sum + loan.remaining, 0);
    }

    // Get owned airports
    getOwnedAirports(): Airport[] {
        return this.airports.filter(a => a.owned);
    }

    // Get available aircraft
    getAvailableAircraft(): FleetAircraft[] {
        return this.fleet.filter(a => !a.assigned_route);
    }

    // Find airport by ID
    findAirport(id: string): Airport | undefined {
        return this.airports.find(a => a.id === id);
    }

    // Find aircraft by ID
    findAircraft(id: number): FleetAircraft | undefined {
        return this.fleet.find(a => a.id === id);
    }

    // Check if can afford
    canAfford(amount: number): boolean {
        return this.cash >= amount;
    }

    // Advance to next quarter
    advanceQuarter(): boolean {
        this.quarter++;
        if (this.quarter > 4) {
            this.quarter = 1;
            this.year++;
            return true; // New year
        }
        return false; // Same year
    }

    // Get current date string
    getDateString(): string {
        return `Q${this.quarter} ${this.year}`;
    }

    // Serialize state for saving
    serialize(): SerializedGameState {
        return {
            year: this.year,
            quarter: this.quarter,
            cash: this.cash,
            playerAirline: this.playerAirline,
            reputation: this.reputation,
            airports: this.airports,
            fleet: this.fleet,
            routes: this.routes,
            competitors: this.competitors,
            newsLog: this.newsLog,
            loans: this.loans,
            events: this.events,
            researchLevel: this.researchLevel,
            advertisingBudget: this.advertisingBudget,
            fuelPrice: this.fuelPrice,
            economicCondition: this.economicCondition
        };
    }

    // Deserialize state from save
    deserialize(data: SerializedGameState): void {
        Object.assign(this, data);
    }
}
