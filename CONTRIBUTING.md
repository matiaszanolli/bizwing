# Contributing to Aerobiz Supersonic

Thanks for your interest in contributing! This guide will help you get started.

## Quick Start

1. **Clone/Download** the repository
2. **Start a local server**:
   ```bash
   # Python 3
   python -m http.server 8000

   # OR use VS Code Live Server extension
   # OR use Node.js http-server
   npx http-server
   ```
3. **Open browser** to `http://localhost:8000`
4. **Open DevTools** and access `window.game` to inspect state

## Project Structure Overview

```
js/
├── main.js           # Start here - entry point
├── data/             # Static game data (easy to modify)
├── models/           # Data structures
├── engine/           # Game logic (most complex)
├── ui/               # Rendering (DOM manipulation)
└── utils/            # Helpers and config
```

## Common Contributions

### Adding a New Aircraft

**File**: `js/data/aircraft.js`

```javascript
{
    name: 'Boeing 787-8',
    category: 'Wide-body',
    capacity: 242,
    range: 7355,
    price: 200000000,
    operating_cost: 18000,
    lease_per_quarter: 5000000,
    year_available: 2011  // When it becomes available
}
```

### Adding a New Airport

**File**: `js/data/airports.js`

```javascript
{
    id: 'IST',
    name: 'Istanbul',
    x: 460,  // SVG coordinate
    y: 150,  // SVG coordinate
    region: 'Europe',
    owned: false,
    market_size: 900000,
    slots_available: 18
}
```

**Finding SVG Coordinates**:
1. Open `index.html` in browser
2. Right-click on map, Inspect Element
3. Note the viewBox: `0 0 800 400`
4. Click where you want the city
5. Use coordinates from DevTools

### Adding a Random Event

**File**: `js/data/events.js`

```javascript
{
    type: 'new_airport_opens',
    name: 'Airport Expansion',
    description: 'New slots available at major hubs',
    // Optional effects:
    fuelMultiplier: 1.0,      // Fuel price change
    demandMultiplier: 1.1,    // Demand change
    reputationChange: 5,      // Rep bonus/penalty
    cashChange: 1000000,      // Cash bonus/penalty
    researchBonus: 1,         // Research level increase
    duration: 4               // Quarters (omit for instant)
}
```

### Modifying Game Balance

**File**: `js/utils/config.js`

All game constants are here:

```javascript
export const CONFIG = {
    STARTING_CASH: 50000000,           // Make game easier
    LOAN_INTEREST_RATE: 0.02,          // Make loans cheaper
    EVENT_PROBABILITY_PER_QUARTER: 0.1,// More/fewer events
    COMPETITION_PENALTY: 0.1,          // Competition impact
    // ... many more
};
```

### Adding UI Elements

1. **Add HTML** to `index.html`:
```html
<div class="panel">
    <h2>NEW FEATURE</h2>
    <div id="new-feature-content"></div>
</div>
```

2. **Add rendering** to `js/ui/renderer.js`:
```javascript
class UIRenderer {
    // ...
    renderNewFeature() {
        const content = document.getElementById('new-feature-content');
        content.innerHTML = `<div>${this.state.someData}</div>`;
    }

    renderAll() {
        // ... existing renders
        this.renderNewFeature();
    }
}
```

3. **Add styles** to `style.css` if needed

### Adding Game Mechanics

1. **Add method** to `js/engine/GameEngine.js`:
```javascript
class GameEngine {
    // ...
    newMechanic() {
        // Implement logic
        this.state.someValue = calculation();
        this.state.addNews('Something happened!');
        return true;
    }
}
```

2. **Wire up UI** in `js/engine/GameController.js`:
```javascript
class GameController {
    setupEventListeners() {
        // ...
        document.getElementById('new-button').onclick = () => {
            this.engine.newMechanic();
            this.render();
        };
    }
}
```

## Code Style Guidelines

### Naming Conventions
- **Classes**: PascalCase (`GameEngine`, `UIRenderer`)
- **Functions**: camelCase (`calculateRevenue`, `renderFleet`)
- **Constants**: UPPER_SNAKE_CASE (`CONFIG`, `STARTING_YEAR`)
- **Files**: camelCase.js (`aircraft.js`, `GameState.js`)

### Module Structure
```javascript
// 1. Imports
import { Something } from './somewhere.js';

// 2. Exports
export class MyClass {
    // 3. Constructor
    constructor() { }

    // 4. Public methods
    publicMethod() { }

    // 5. Private methods (by convention, prefix _)
    _privateMethod() { }
}

// 6. Helper functions
function helperFunction() { }
```

### Comments
```javascript
// Good: Explain WHY
// Use reputation to boost load factor since happy customers fly more
loadFactor *= (this.state.reputation / 100);

// Bad: Explain WHAT (code is self-documenting)
// Multiply load factor by reputation divided by 100
loadFactor *= (this.state.reputation / 100);
```

### Error Handling
```javascript
// Return success/failure objects
createRoute() {
    if (invalid) {
        return { success: false, error: 'Reason' };
    }
    // ... do work
    return { success: true };
}

// Or throw for exceptional cases
findAirport(id) {
    const airport = this.state.airports.find(a => a.id === id);
    if (!airport) {
        throw new Error(`Airport ${id} not found`);
    }
    return airport;
}
```

## Testing Your Changes

### Manual Testing Checklist
- [ ] Game loads without errors
- [ ] Can advance turns
- [ ] Can buy aircraft
- [ ] Can create routes
- [ ] Can take loans
- [ ] Events trigger
- [ ] UI updates correctly
- [ ] No console errors

### Testing in Console
```javascript
// Give yourself money
game.state.cash += 100000000

// Trigger an event
game.engine.triggerRandomEvent()

// Add aircraft instantly
game.engine.buyAircraft(aircraftTypes[5])

// Check state
game.state.fleet.length
game.state.routes

// Test calculation
game.engine.calculateQuarterlyRevenue()
```

## Debugging Tips

### Inspect Game State
```javascript
// Current state
game.state

// Specific values
game.state.cash
game.state.reputation
game.state.routes

// Owned airports
game.state.getOwnedAirports()

// Available aircraft
game.state.getAvailableAircraft()
```

### Trace Execution
```javascript
// Add temporary logging
console.log('Revenue:', revenue);
console.log('Load factor:', loadFactor);

// Breakpoints
debugger;  // Execution will pause here
```

### Common Issues

**Module not loading**
- Check file path in import
- Ensure file has `.js` extension
- Verify export statement exists

**State not updating**
- Check if `render()` is called after change
- Verify state mutation actually happens
- Look for early returns

**UI not changing**
- Check element ID matches
- Verify DOM element exists
- Look for JavaScript errors in console

## Performance Guidelines

### Do's ✓
- Use `Array.filter()`, `Array.map()` for transformations
- Cache DOM lookups if used multiple times
- Update only changed elements when possible
- Use event delegation for dynamic elements

### Don'ts ✗
- Don't use `innerHTML` in loops (build string first)
- Don't query DOM repeatedly
- Don't create functions in loops
- Don't mutate arrays while iterating

## Git Workflow

1. **Create branch**: `feature/new-aircraft` or `fix/route-bug`
2. **Make changes**: Small, focused commits
3. **Test thoroughly**: All features still work
4. **Commit**: Clear message describing what/why
5. **Push branch**: `git push origin feature/new-aircraft`
6. **Create PR**: Describe changes and reasoning

### Commit Message Format
```
Add Boeing 787 to aircraft database

- Added 787-8 and 787-9 variants
- Set year_available to 2011
- Balanced pricing relative to 777/A330
```

## Review Process

PRs should include:
- Clear description of changes
- Why the change is needed
- Any breaking changes
- Testing performed

Reviewers check:
- Code quality and style
- No bugs introduced
- Documentation updated if needed
- Changes make sense

## Questions?

- Check existing issues/discussions
- Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Read [MIGRATION.md](MIGRATION.md) for code examples
- Open an issue for clarification

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Happy coding! ✈️
