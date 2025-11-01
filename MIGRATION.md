# Migration Guide: Monolithic → Modular

This guide helps understand the transition from `game.js` (monolithic) to the new modular structure.

## File Mapping

| Old (`game.js`)           | New Location                      |
|---------------------------|-----------------------------------|
| `gameState` object        | `models/GameState.js` class       |
| `aircraftTypes` array     | `data/aircraft.js`                |
| `airports` array          | `data/airports.js`                |
| `competitors` array       | `data/competitors.js`             |
| `eventTemplates` array    | `data/events.js`                  |
| All constants             | `utils/config.js`                 |
| `formatMoney()`, helpers  | `utils/helpers.js`                |
| `renderGame()`, etc.      | `ui/renderer.js`                  |
| `showBuyPlaneModal()`, etc| `ui/modals.js`                    |
| Business logic functions  | `engine/GameEngine.js`            |
| Event handlers            | `engine/GameController.js`        |
| `initGame()`, `window.onload` | `main.js`                     |

## Function Mapping

### Initialization
```javascript
// OLD
function initGame() { ... }
window.onload = initGame;

// NEW
const controller = new GameController();
controller.start();
```

### State Access
```javascript
// OLD
gameState.cash
gameState.fleet

// NEW
this.engine.state.cash
this.engine.state.fleet
```

### Rendering
```javascript
// OLD
renderGame();
renderFleet();
renderRoutes();

// NEW
this.renderer.renderAll();
this.renderer.renderFleet();
this.renderer.renderRoutes();
```

### Business Logic
```javascript
// OLD
function buyAircraft(planeType) {
    if (gameState.cash >= planeType.price) {
        gameState.cash -= planeType.price;
        gameState.fleet.push(...);
    }
}

// NEW
class GameEngine {
    buyAircraft(planeType) {
        if (this.state.canAfford(planeType.price)) {
            this.state.cash -= planeType.price;
            this.state.fleet.push(...);
            return true;
        }
        return false;
    }
}
```

### Modal Management
```javascript
// OLD
function showBuyPlaneModal() {
    const modal = document.getElementById(...);
    modal.classList.add('active');
}

// NEW
class ModalManager {
    showBuyPlane() {
        const modal = document.getElementById(...);
        modal.classList.add('active');
    }
}
```

## Key Differences

### 1. No Global State
**Old**: All state in global `gameState` object
```javascript
gameState.cash += 1000;
```

**New**: State encapsulated in class
```javascript
this.state.cash += 1000;
```

### 2. Separated Concerns
**Old**: Everything in one file
```javascript
// game.js (2000 lines)
const gameState = { ... };
function renderGame() { ... }
function advanceTurn() { ... }
```

**New**: Organized by responsibility
```javascript
// models/GameState.js
export class GameState { ... }

// ui/renderer.js
export class UIRenderer {
    renderAll() { ... }
}

// engine/GameEngine.js
export class GameEngine {
    advanceTurn() { ... }
}
```

### 3. Module Imports
**Old**: No imports, everything global
```javascript
// Just use aircraftTypes
```

**New**: Explicit imports
```javascript
import { aircraftTypes } from '../data/aircraft.js';
```

### 4. Class-Based Architecture
**Old**: Function and object literals
```javascript
const gameState = { year: 1992, quarter: 1 };
function advanceQuarter() { ... }
```

**New**: Object-oriented
```javascript
class GameState {
    constructor() {
        this.year = 1992;
        this.quarter = 1;
    }

    advanceQuarter() { ... }
}
```

### 5. Configuration
**Old**: Magic numbers scattered throughout
```javascript
expenses += ownedAirports.length * 500000; // What's 500000?
```

**New**: Centralized constants
```javascript
expenses += ownedAirports.length * CONFIG.AIRPORT_MAINTENANCE_PER_QUARTER;
```

## Benefits of New Structure

### Maintainability
- Clear module boundaries
- Easy to find code
- Self-documenting structure

### Scalability
- Add features without touching core
- Swap implementations easily
- Test modules independently

### Developer Experience
- IntelliSense/autocomplete works better
- Easier debugging
- No naming conflicts

### Performance
- Same runtime performance
- Browser can cache modules
- Dead code elimination possible

## Backward Compatibility

The old `game.js` still exists for reference but is **not loaded** by the new `index.html`.

To revert to old version:
```html
<!-- Change this -->
<script type="module" src="js/main.js"></script>

<!-- To this -->
<script src="game.js"></script>
```

## Testing the Migration

Open browser console and verify:
```javascript
// Should exist
window.game                  // ✓
window.game.engine          // ✓
window.game.state           // ✓
window.game.renderer        // ✓

// Should NOT exist (was old global)
window.gameState            // undefined ✓
window.renderGame           // undefined ✓
```

## Common Issues

### Module Not Found
**Error**: `Failed to load module script`

**Solution**:
- Files must use `.js` extension in imports
- Must serve from web server (not `file://`)
- Use Live Server in VS Code or `python -m http.server`

### CORS Error
**Error**: `Access to script blocked by CORS`

**Solution**: Use a local web server, not `file://` protocol

### Missing Exports
**Error**: `X is not exported from module`

**Solution**: Check export statement in source file:
```javascript
// Correct
export const CONFIG = { ... };
export function formatMoney() { ... }
export class GameState { ... }

// Wrong (missing export)
const CONFIG = { ... };  // ❌
```

### Circular Dependencies
**Error**: Module graph is cyclic

**Solution**:
- Restructure imports
- Extract shared code to separate module
- Use dependency injection

## Migration Checklist

- [x] All data moved to `data/` modules
- [x] State model created in `models/`
- [x] Business logic in `engine/GameEngine`
- [x] UI rendering in `ui/renderer`
- [x] Event handlers in `engine/GameController`
- [x] Constants in `utils/config`
- [x] Helpers in `utils/helpers`
- [x] Entry point in `main.js`
- [x] HTML updated to use module script
- [x] All features working
- [x] No console errors

## Next Steps

1. **Test thoroughly**: Play through multiple quarters
2. **Remove old file**: Delete `game.js` when confident
3. **Add features**: Use new modular structure
4. **Write tests**: Unit test individual modules
5. **Optimize**: Profile and improve performance

## Getting Help

- Check [ARCHITECTURE.md](ARCHITECTURE.md) for detailed docs
- Use `window.game` in console to inspect state
- Read module source code - it's well commented
- Open an issue if something is unclear
