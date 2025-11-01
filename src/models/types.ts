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

    // Connection tracking (for hub routes)
    connections?: ConnectionStats;
}

// Connection statistics for hub routes
export interface ConnectionStats {
    // Number of connecting passengers per quarter
    connecting_passengers: number;

    // Most common connection patterns (top 5)
    // e.g., "JFK->ORD->LAX" means passenger connects at ORD hub
    connection_patterns: string[];

    // Average connection quality (0-1)
    // Based on: connection time adequacy, hub efficiency, schedule coordination
    connection_quality: number;

    // Revenue bonus from connections (percentage, e.g., 0.15 = 15% bonus)
    connection_bonus: number;
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

// Hub efficiency metrics
export interface HubMetrics {
    airport_id: string;

    // Efficiency rating (0-100)
    efficiency_rating: number;

    // Number of connections handled per quarter
    connections_per_quarter: number;

    // Average connection time (minutes)
    avg_connection_time: number;

    // Connection success rate (0-1)
    success_rate: number;
}

// Slot negotiation (time-based acquisition)
export interface SlotNegotiation {
    airport_id: string;
    quarters_remaining: number; // How many quarters until slots are acquired
    slot_count: number; // Number of slots being negotiated
    cost: number; // Upfront deposit cost
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
    hubMetrics: HubMetrics[]; // Efficiency tracking for hubs
    slotNegotiations: SlotNegotiation[]; // Active slot negotiations
    negotiationCapacity: number; // Max simultaneous negotiations (can be upgraded)
}
