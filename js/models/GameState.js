// Game state model
import { CONFIG } from '../utils/config.js';
import { deepClone } from '../utils/helpers.js';
import { airports } from '../data/airports.js';
import { createCompetitors } from '../data/competitors.js';
import { aircraftTypes } from '../data/aircraft.js';

export class GameState {
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
    initialize() {
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
        this.addNews('Welcome to Aerobiz Supersonic! Build your airline empire.');
        this.addNews('Manage routes, finances, and compete with rivals to dominate the skies.');
    }

    // Add news item
    addNews(message) {
        this.newsLog.push(message);
        // Keep only last 50 messages to prevent memory issues
        if (this.newsLog.length > 50) {
            this.newsLog = this.newsLog.slice(-50);
        }
    }

    // Get total debt
    getTotalDebt() {
        return this.loans.reduce((sum, loan) => sum + loan.remaining, 0);
    }

    // Get owned airports
    getOwnedAirports() {
        return this.airports.filter(a => a.owned);
    }

    // Get available aircraft
    getAvailableAircraft() {
        return this.fleet.filter(a => !a.assigned_route);
    }

    // Find airport by ID
    findAirport(id) {
        return this.airports.find(a => a.id === id);
    }

    // Find aircraft by ID
    findAircraft(id) {
        return this.fleet.find(a => a.id === id);
    }

    // Check if can afford
    canAfford(amount) {
        return this.cash >= amount;
    }

    // Advance to next quarter
    advanceQuarter() {
        this.quarter++;
        if (this.quarter > 4) {
            this.quarter = 1;
            this.year++;
            return true; // New year
        }
        return false; // Same year
    }

    // Get current date string
    getDateString() {
        return `Q${this.quarter} ${this.year}`;
    }

    // Serialize state for saving
    serialize() {
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
    deserialize(data) {
        Object.assign(this, data);
    }
}
