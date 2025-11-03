# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BizWing** is a browser-based airline management simulation game inspired by KOEI's Aerobiz Supersonic series. Built with React, TypeScript, Vite, and Three.js for 3D globe visualization.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (runs on port 3000, auto-opens browser)
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run preview` - Preview production build locally

### Testing Commands
- `npm test` or `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once (for CI/pipelines)
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report

### Linting
- `npm run lint` - Run ESLint on all TypeScript files

## Architecture Overview

### Core Game Loop Architecture

The game follows a **Model-Engine-Context-View** pattern:

1. **GameState** (`src/models/GameState.ts`) - Pure data model
   - Holds all game state (cash, airports, fleet, routes, competitors, etc.)
   - No business logic - only getters and state manipulation helpers
   - Provides serialization/deserialization for save/load

2. **GameEngine** (`src/engine/GameEngine.ts`) - Business logic orchestrator
   - **Modular Architecture**: Uses specialized manager classes for different game systems
   - **AircraftManager** (`src/engine/managers/AircraftManager.ts`) - Aircraft operations (buy, sell, aging, condition)
   - **ExecutiveManager** (`src/engine/managers/ExecutiveManager.ts`) - Executive hiring, actions, progression
   - **FinancialManager** (`src/engine/managers/FinancialManager.ts`) - Revenue, expenses, loans, scoring
   - **GameEngine delegates** to managers instead of implementing all logic directly
   - Handles routes, airports, events, hub management, and turn processing

3. **GameContext** (`src/contexts/GameContext.tsx`) - React integration
   - Singleton GameEngine instance shared across components
   - Force update mechanism to trigger React re-renders after engine operations
   - Auto-save functionality (debounced on quarter changes)
   - Wraps engine methods for React components

4. **Components** - Pure view layer
   - Dashboard panels display state and dispatch engine actions
   - Modals handle user interactions (buying aircraft, creating routes, etc.)
   - All components consume GameContext via `useGame()` hook

### Key Design Patterns

**State Updates**: Components MUST call `forceUpdate()` after any engine operation that modifies state:
```typescript
const { engine, state, forceUpdate } = useGame();
engine.buyAircraft(aircraft, true);
forceUpdate(); // Required to trigger re-render
```

**Data Flow**: Unidirectional
- User action → Component calls engine method → Engine modifies GameState → forceUpdate() → React re-renders

**Separation of Concerns**:
- `/data` - Static game data (aircraft catalog, airports, events)
- `/engine` - Game mechanics and calculations
- `/models` - Type definitions and data structures
- `/components` - UI/UX only
- `/utils` - Pure helper functions

### Path Aliases

The project uses TypeScript path aliases (configured in [vite.config.ts:8-16](vite.config.ts#L8-L16)):
- `@/` → `src/`
- `@data/` → `src/data/`
- `@engine/` → `src/engine/`
- `@components/` → `src/components/`
- `@hooks/` → `src/hooks/`
- `@utils/` → `src/utils/`

Always use these aliases for imports to maintain consistency.

## Critical Game Systems

### Aircraft Age & Maintenance System

Aircraft have **5 condition tiers** based on age (0-5y: Excellent, 6-10y: Good, 11-15y: Fair, 16-20y: Poor, 20y+: Critical). See [CONFIG](src/utils/config.ts#L26-L48) for exact thresholds and multipliers.

- Maintenance costs scale from 1.0x to 3.5x
- Fuel efficiency degrades from 1.0x to 1.6x
- System defined in `GameEngine` methods: `getAircraftCondition()`, `getMaintenanceMultiplier()`, `getFuelEfficiencyMultiplier()`

### Time-Based Slot Negotiation System

Airport slot acquisition is asynchronous (2-4 quarters depending on airport size):
- Player pays upfront deposit (20% of final cost)
- `SlotNegotiation` objects track in-progress deals
- Negotiation completes automatically during quarterly processing
- Players have limited negotiation capacity (upgradeable mechanic)
- Implementation in `GameEngine.initiateSlotNegotiation()` and `GameEngine.advanceTurn()`

### Hub Metrics System

Each owned airport generates `HubMetrics` that track:
- Total weekly departures
- Passenger throughput
- Revenue generation
- Used for future game features (hub bonuses, efficiency calculations)

### Route Profitability Calculation

Complex formula in `GameEngine.calculateRouteRevenue()`:
- Base: Distance × passengers × price per km × weekly frequency
- Modified by: Load factor, aircraft age penalties, competition, reputation, economic conditions
- Costs: Fuel (affected by age), maintenance (scaled by age), airport fees

### Historical Aircraft System

Aircraft have `year_available` and `year_discontinued` properties:
- Only aircraft available in current year appear in purchase modal
- Q1 announcements for upcoming aircraft (next year)
- Q1 warnings for aircraft ending production (1 year notice)
- Filter logic in `getUpcomingAircraft()` and `getEndingProductionAircraft()` ([aircraft.ts](src/data/aircraft.ts))

### Save/Load System

- **Auto-save**: Triggered on quarter changes (debounced 1s) via GameContext
- **Manual saves**: 5 save slots (0-4, slot 0 is auto-save)
- **Storage**: LocalStorage using `SaveManager` utility
- **Format**: Serialized GameState with metadata

## Testing Guidelines

- Test files co-located with source files (`*.test.ts` or `*.test.tsx`)
- Use Vitest + React Testing Library
- Setup file: [src/test/setup.ts](src/test/setup.ts)
- Mock jsdom environment configured
- Key test files: `GameEngine.test.ts`, `SaveManager.test.ts`, `helpers.test.ts`

## Configuration System

All game balance constants in [src/utils/config.ts](src/utils/config.ts):
- Starting conditions (year, cash, aircraft)
- Economic parameters (load factors, pricing)
- Aircraft age thresholds and multipliers
- Difficulty presets (EASY/NORMAL/HARD)
- Win/loss conditions

**Never hardcode magic numbers** - always use CONFIG constants.

## Component Structure

### Dashboard Panels (`src/components/Dashboard/`)
- **ActionsPanel** - Main game actions (buy aircraft, slots, loans, advance quarter)
- **FinancialPanel** - Cash, debt, quarterly P&L
- **FleetPanel** - Aircraft list with age/condition display
- **RoutesPanel** - Active routes with profitability
- **RouteManagerPanel** - Route creation/editing interface
- **NewsPanel** - Event log and news feed
- **Globe3D** - Three.js globe with route visualization

### Modals (`src/components/Modals/`)
All modals use the base `Modal` component. Key modals:
- **NewGameSetupModal** - Year/difficulty/airline name selection
- **BuyAircraftModal** - Aircraft purchase/lease with filtering
- **BuyAirportSlotModal** - Airport slot negotiations
- **RouteManagerModal** - Route creation workflow
- **SaveLoadModal** - Save/load management
- **PostQuarterResultsModal** - Quarterly financial results

## Data Files (`src/data/`)

- **aircraft.ts** - 70+ historical aircraft (1955-2015) with specs
- **airports.ts** - 74 global airports with coordinates and market data
- **competitors.ts** - AI competitor definitions and behavior
- **events.ts** - Random event definitions (economic, fuel, operational)
- **worldMap.ts** - SVG world map data for 2D visualization

When adding new aircraft/airports, follow existing data structure patterns.

## Known Patterns

### Modal Opening Pattern
```typescript
const [modalOpen, setModalOpen] = useState(false);
// Modal opens
// User performs action
// Modal closes and calls forceUpdate()
```

### Engine Operation Pattern
```typescript
const result = engine.someOperation(params);
if (result.success) {
  forceUpdate();
  // Show success feedback
} else {
  // Show error
}
```

### Quarterly Advancement Pattern
```typescript
const turnResult = engine.advanceTurn();
// Check turnResult for game over, victory, warnings
// Display PostQuarterResultsModal
// Auto-save triggers via useEffect
```

## Related Projects

The worker project lives at `../worker_aithentia` (relative to project root). Backend API deployed at `https://api.test.aithentia.com:8000/`.
