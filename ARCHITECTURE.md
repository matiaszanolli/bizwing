# Aerobiz Supersonic - Architecture Documentation

## Project Structure

```
aerobiz/
├── index.html              # Main HTML file
├── style.css               # Styles (unchanged)
├── game.js                 # Legacy monolithic file (deprecated)
├── README.md               # User documentation
├── ARCHITECTURE.md         # This file
└── js/                     # New modular JavaScript structure
    ├── main.js             # Entry point
    ├── data/               # Game data and constants
    │   ├── aircraft.js     # Aircraft types database
    │   ├── airports.js     # Airport locations and data
    │   ├── competitors.js  # AI competitor profiles
    │   └── events.js       # Random event templates
    ├── models/             # Data models
    │   └── GameState.js    # Main game state model
    ├── engine/             # Game logic and controllers
    │   ├── GameEngine.js   # Core game mechanics
    │   └── GameController.js # Main controller (glue code)
    ├── ui/                 # User interface
    │   ├── renderer.js     # UI rendering
    │   └── modals.js       # Modal management
    └── utils/              # Utility functions
        ├── config.js       # Configuration constants
        └── helpers.js      # Helper functions
```

## Module Descriptions

### Entry Point

#### `main.js`
- Bootstraps the application
- Initializes GameController
- Sets up global game instance for debugging

### Data Layer (`data/`)

#### `aircraft.js`
- **Exports**: `aircraftTypes`, `getAvailableAircraft(year)`
- Contains all aircraft definitions with specs
- Includes year_available for progressive unlocking
- Categories: Regional, Narrow-body, Wide-body, Jumbo, Supersonic, Cargo

#### `airports.js`
- **Exports**: `airports`, `getAirportsByRegion()`, `findAirport(id)`
- 31 airports across 6 continents
- SVG map coordinates (x, y)
- Market size and slot availability

#### `competitors.js`
- **Exports**: `competitorProfiles`, `createCompetitors()`
- AI airline definitions
- Strategy types: expansion, profit, balanced
- Aggression levels

#### `events.js`
- **Exports**: `eventTemplates`, `getRandomEvent()`
- Random event definitions
- Economic, fuel, operational events
- Duration and effect multipliers

### Models (`models/`)

#### `GameState.js`
- **Class**: `GameState`
- Central state management
- Methods:
  - `initialize()` - Set up new game
  - `addNews(message)` - Add news item
  - `getTotalDebt()` - Calculate total loan debt
  - `getOwnedAirports()` - Filter owned airports
  - `getAvailableAircraft()` - Filter unassigned aircraft
  - `findAirport(id)` - Lookup airport
  - `findAircraft(id)` - Lookup aircraft
  - `canAfford(amount)` - Check cash availability
  - `advanceQuarter()` - Progress time
  - `serialize()` / `deserialize()` - Save/load support

### Engine (`engine/`)

#### `GameEngine.js`
- **Class**: `GameEngine`
- Core game mechanics and calculations
- **Methods**:
  - Aircraft: `buyAircraft()`, `leaseAircraft()`
  - Airports: `buyAirportSlot()`
  - Routes: `createRoute()`, `calculateRouteRevenue()`, `calculateRouteCompetition()`
  - Finance: `takeLoan()`, `processLoans()`, `setAdvertisingBudget()`
  - Calculation: `calculateQuarterlyRevenue()`, `calculateQuarterlyExpenses()`
  - Events: `triggerRandomEvent()`, `processEvents()`
  - AI: `simulateCompetitors()`
  - Turn: `advanceTurn()`
  - Scoring: `calculateScore()`

#### `GameController.js`
- **Class**: `GameController`
- Main application controller
- Coordinates Engine, Renderer, and Modals
- **Methods**:
  - `start()` - Initialize game
  - `render()` - Update UI
  - `setupEventListeners()` - Attach DOM events
  - Action handlers: `selectAirport()`, `buyAirportSlot()`, `createRoute()`, etc.
  - `saveGame()` / `loadGame()` - Persistence

### UI (`ui/`)

#### `renderer.js`
- **Class**: `UIRenderer`
- Handles all DOM rendering
- **Methods**:
  - `renderAll()` - Update entire UI
  - `renderHeader()` - Top bar (date, cash, reputation)
  - `renderWorldMap()` - SVG map with routes
  - `renderFleet()` - Aircraft list
  - `renderRoutes()` - Active routes with profitability
  - `renderAirports()` - Airport list with ownership
  - `renderCompetitors()` - AI airline status
  - `renderFinancialReport()` - Revenue/expense summary
  - `renderNews()` - Recent news feed

#### `modals.js`
- **Class**: `ModalManager`
- Manages popup dialogs
- **Methods**:
  - `closeAll()` - Close all modals
  - `showBuyPlane()` - Aircraft purchase/lease
  - `showRoute()` - Route creation
  - `showLoan()` - Loan application
  - `showAdvertising()` - Advertising budget
  - `updateLoanInfo()` - Real-time loan calculator

### Utilities (`utils/`)

#### `config.js`
- **Exports**: `CONFIG`, `DIFFICULTY`, `getDifficultySettings()`
- All game constants and parameters
- Starting conditions, economic parameters, costs
- Difficulty levels (Easy, Normal, Hard)
- UI configuration

#### `helpers.js`
- **Exports**: Utility functions
- `formatMoney()` - Currency formatting
- `calculateDistance()` - Map distance calculation
- `deepClone()` - Object cloning
- `generateId()` - Unique ID generation
- `clamp()`, `lerp()` - Math helpers
- `randomInt()`, `randomFloat()`, `randomChoice()` - Random utilities
- `saveToStorage()`, `loadFromStorage()` - LocalStorage wrapper

## Data Flow

```
User Action (DOM Event)
    ↓
GameController (event handler)
    ↓
GameEngine (business logic)
    ↓
GameState (state mutation)
    ↓
GameController.render()
    ↓
UIRenderer (DOM updates)
    ↓
User sees update
```

## Key Design Patterns

### 1. Model-View-Controller (MVC)
- **Model**: `GameState` + data files
- **View**: `UIRenderer` + `ModalManager`
- **Controller**: `GameController` + `GameEngine`

### 2. Separation of Concerns
- Data in `data/` - Static definitions
- Logic in `engine/` - Game mechanics
- UI in `ui/` - Rendering only
- Utils in `utils/` - Reusable helpers

### 3. Dependency Injection
- `GameController` receives `GameEngine`
- `UIRenderer` and `ModalManager` receive `GameEngine`
- Easy to test and swap implementations

### 4. ES6 Modules
- Clean imports/exports
- No global pollution
- Tree-shakable
- Browser-native (no build step required)

## Configuration Management

All game constants are centralized in `utils/config.js`:

```javascript
CONFIG.STARTING_CASH          // Starting money
CONFIG.BASE_LOAD_FACTOR       // Default passenger load
CONFIG.LOAN_INTEREST_RATE     // Loan APR
CONFIG.EVENT_PROBABILITY      // Random event chance
// ... and many more
```

Difficulty settings override base config:
```javascript
DIFFICULTY.EASY.startingCash  // 75M
DIFFICULTY.NORMAL.startingCash // 50M
DIFFICULTY.HARD.startingCash   // 35M
```

## Extending the Game

### Adding a New Aircraft
1. Add entry to `data/aircraft.js`
2. That's it! Will automatically appear in game

### Adding a New Airport
1. Add entry to `data/airports.js`
2. Determine SVG coordinates (x, y)
3. Will appear on map automatically

### Adding a New Event
1. Add template to `data/events.js`
2. Define type, effects, duration
3. Will be randomly triggered

### Adding a New UI Panel
1. Add HTML structure to `index.html`
2. Create render method in `UIRenderer`
3. Call from `renderAll()`

### Adding a New Game Mechanic
1. Add method to `GameEngine`
2. Update `GameState` if needed
3. Add UI in `UIRenderer`
4. Wire up in `GameController`

## Testing Strategy

The modular structure enables easy testing:

```javascript
// Unit test example
import { GameEngine } from './engine/GameEngine.js';

const engine = new GameEngine();
engine.initialize();
engine.buyAircraft(aircraftTypes[0]);
assert(engine.state.fleet.length === 3); // Started with 2, bought 1
```

Each module can be tested in isolation:
- Data modules: Test data integrity
- Engine: Test calculations and logic
- State: Test state mutations
- UI: Test rendering (with mocks)

## Performance Considerations

- **No unnecessary re-renders**: Only call `render()` after state changes
- **Event delegation**: Map clicks use single listener
- **Bounded arrays**: News log capped at 50 items
- **Efficient filtering**: State accessors use Array methods
- **No polling**: Event-driven architecture

## Browser Compatibility

- **ES6 Modules**: Chrome 61+, Firefox 60+, Safari 11+
- **ES6 Classes**: All modern browsers
- **SVG**: Universal support
- **LocalStorage**: Universal support

For older browsers, use a bundler (Webpack/Rollup) with Babel.

## Future Enhancements

### Save System
- Already scaffolded in `GameController`
- `saveGame()` and `loadGame()` methods ready
- Uses `GameState.serialize()`

### Multiplayer
- Extract state to server
- WebSocket for real-time updates
- Minimal refactoring needed

### Mobile Support
- Touch events already supported (click handlers)
- Add responsive CSS
- Consider gesture controls

### Advanced Analytics
- Add `GameStats` class
- Track historical data
- Charts and graphs

## Migration from Legacy Code

The old `game.js` is now deprecated. Key changes:

1. **Global state** → `GameState` class
2. **Global functions** → `GameEngine` methods
3. **Inline rendering** → `UIRenderer` class
4. **Mixed concerns** → Separated modules

To migrate:
1. Keep old `game.js` as reference
2. Test new modular version thoroughly
3. Remove `game.js` when confident
4. Update any external references

## Development Workflow

1. **Make changes** to relevant module
2. **Refresh browser** (no build step!)
3. **Test** in browser console: `window.game.engine.state`
4. **Debug** with browser dev tools
5. **Commit** changes

## Debugging Tips

```javascript
// Access game state
window.game.state

// Test calculation
window.game.engine.calculateQuarterlyRevenue()

// Trigger event
window.game.engine.triggerRandomEvent()

// Give money
window.game.state.cash += 100000000

// Add aircraft
window.game.engine.buyAircraft(aircraftTypes[5])
```

## Conclusion

The new architecture provides:
- **Maintainability**: Clear module boundaries
- **Scalability**: Easy to add features
- **Testability**: Isolated units
- **Performance**: Efficient rendering
- **Developer Experience**: No build step, hot reload
