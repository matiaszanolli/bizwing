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

// Executive specializations
export type ExecutiveRole = 'MARKETING' | 'OPERATIONS' | 'FINANCE' | 'STRATEGY';

// Executive experience levels
export type ExecutiveLevel = 'JUNIOR' | 'SENIOR' | 'EXPERT';

// Executive action types
export type ExecutiveActionType =
    | 'SLOT_NEGOTIATION'      // Negotiate airport slots (better success rate)
    | 'AD_CAMPAIGN'           // Launch regional advertising
    | 'ROUTE_ANALYSIS'        // Detailed route profitability report
    | 'COMPETITOR_INTEL'      // Spy on competitor plans
    | 'LABOR_RELATIONS'       // Negotiate with unions, prevent strikes
    | 'GOVT_RELATIONS'        // Lobby for favorable regulations
    | 'AIRCRAFT_DEAL'         // Negotiate better aircraft prices
    | 'HUB_DEVELOPMENT';      // Improve hub efficiency

// Executive action (instance of an action being performed)
export interface ExecutiveAction {
    id: string;
    executive_id: number;
    action_type: ExecutiveActionType;
    quarters_remaining: number; // Some actions take multiple quarters
    target?: string; // Airport ID, route ID, competitor name, etc.
    parameters?: Record<string, any>; // Action-specific data
}

// Executive (employee in your company)
export interface Executive {
    id: number;
    name: string;
    role: ExecutiveRole;
    level: ExecutiveLevel;

    // Skills (0-100)
    negotiation: number;  // Affects slot deals, aircraft prices
    marketing: number;    // Affects advertising effectiveness
    analysis: number;     // Affects report quality, intel gathering
    operations: number;   // Affects hub efficiency, labor relations

    // Salary (per quarter)
    salary: number;

    // Experience tracking
    experience_points: number; // Gain XP from successful actions

    // Current assignment
    current_action: ExecutiveAction | null;

    // Morale (0-100, affects success rates)
    morale: number;
}

// Result of an executive action
export interface ExecutiveActionResult {
    success: boolean;
    message: string;
    effects?: {
        cash_change?: number;
        reputation_change?: number;
        slot_discount?: number;
        aircraft_discount?: number;
        intel_report?: string;
        route_recommendations?: string[];
    };
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
    executives: Executive[]; // Hired executives
    executiveActions: ExecutiveAction[]; // Active executive actions
}
