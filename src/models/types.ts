// Core game type definitions

import { AircraftType } from '../data/aircraft';
import { Airport } from '../data/airports';
import { Competitor } from '../data/competitors';
import { GameEvent } from '../data/events';

// Fleet aircraft (instance of an aircraft type)
export interface FleetAircraft {
    id: number;
    type: AircraftType;
    name: string;
    assigned_route: Route | null; // Reference to route
    owned: boolean; // true = owned, false = leased
    age: number; // quarters old
}

// Route between two airports
export interface Route {
    from: string; // Airport ID
    to: string; // Airport ID
    aircraft: FleetAircraft;
    flights_per_week: number;
    distance: number; // km
    suspended: boolean; // true = route on hold (no revenue/costs, keeps slots & aircraft)
}

// Loan
export interface Loan {
    original_amount: number;
    remaining: number;
    quarterly_payment: number;
    principal_payment: number;
    quarters_remaining: number;
    interest_rate: number;
}

// Active event (event instance with remaining duration)
export interface ActiveEvent extends GameEvent {
    quartersRemaining: number;
}

// Serializable game state
export interface SerializedGameState {
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
}
