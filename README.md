# Aerobiz Supersonic - Prototype

A browser-based airline management simulation game inspired by the classic KOEI game Aerobiz Supersonic.

## How to Play

### Current Version (v0.2 - Vanilla JS)
Simply open `index.html` in any modern web browser. No build process required!

### Future Versions (v0.3+ - React + Three.js)
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
See [TECH_STACK.md](TECH_STACK.md) for migration details.

## Game Features

### Core Mechanics
- **Fleet Management**: Buy or lease 14 different aircraft types from regional jets to jumbo jets
  - Regional: Embraer ERJ-145, Bombardier CRJ-200
  - Narrow-body: Boeing 737-300/800, Airbus A320
  - Wide-body: Boeing 767/777, Airbus A330/A340, MD-11
  - Jumbo: Boeing 747-400
  - Cargo: Boeing 747F, 767F
  - Supersonic: Concorde

- **Global Network**: 31 airports across 6 continents
  - North America: JFK, LAX, ORD, DFW, YYZ, MEX
  - Europe: LHR, CDG, FRA, AMS, MAD, FCO, SVO
  - Asia: NRT, HKG, SIN, PEK, ICN, BKK, DEL, BOM
  - Middle East: DXB, DOH
  - Africa: JNB, CAI
  - Oceania: SYD, AKL
  - South America: GRU, EZE, BOG

- **Route Management**: Create profitable routes between your hub airports
  - Competition affects profitability
  - Distance vs aircraft range constraints
  - Flexible flight frequencies (1-14 flights/week)

### Financial System
- **Leasing vs Buying**: Choose to purchase aircraft outright or lease quarterly
- **Loans**: Take loans with 2% quarterly interest to fund expansion
- **Dynamic Economics**: Fuel prices and passenger demand fluctuate
- **Quarterly Reports**: Track revenue, expenses, and profitability

### Competition
- **3 AI Competitors**: Each with different strategies
  - Aggressive competitors actively expand their networks
  - Competitors compete for the same airports
  - Market share affects your route profitability

### Reputation System
- Reputation (0-100) affects passenger demand
- Improved by:
  - Profitable operations
  - Advertising campaigns
- Damaged by:
  - Losses and poor performance
  - Random negative events

### Random Events
Events occur randomly each quarter (10% chance):
- **Economic Events**: Booms, recessions, tourism surges
- **Fuel Events**: Oil crises or price drops
- **Operational Events**: Strikes, technology breakthroughs
- **Competitor Events**: Bankruptcy opportunities

Events have duration and can significantly impact gameplay

### Advanced Features
- **Aircraft Aging**: Planes get more expensive to maintain over time
- **Market Competition**: Route profitability affected by competitor presence
- **Economic Multipliers**: External factors affect demand and costs
- **Advertising Budget**: Invest in marketing to boost reputation

## Game Controls

### Main Actions
- **Buy Aircraft**: Purchase or lease new planes for your fleet
- **Airport Slots**: Click on available airports to acquire slots
- **Create Routes**: Click your hub airports on the map to create routes
- **Take Loan**: Borrow money for expansion
- **Set Advertising**: Allocate quarterly advertising budget
- **Advance Quarter**: Progress time and execute financial calculations

### Map Legend
- **Yellow circles**: Your hub airports
- **Colored circles**: Competitor hubs (color-coded)
- **Green circles**: Available airports
- **Magenta lines**: Your active routes

## Winning & Losing

### Victory
- Survive until year 2000
- Score based on:
  - Cash reserves
  - Airports owned
  - Fleet size
  - Reputation
  - Active routes

### Defeat
- Bankruptcy (cash below -$10M)

## Strategy Tips

1. **Start Conservative**: Don't overextend with too many aircraft initially
2. **Watch Competition**: Avoid heavily contested routes
3. **Balance Portfolio**: Mix owned and leased aircraft based on cash flow
4. **Economic Timing**: Expand during booms, consolidate during recessions
5. **Reputation Matters**: Higher reputation = better load factors
6. **Debt Management**: Loans are useful but watch the quarterly payments
7. **Hub Strategy**: Focus on key hubs rather than spreading too thin
8. **Aircraft Selection**: Match aircraft capacity to route demand

## Technical Details

- **Modern ES6 Modules**: Clean, modular architecture
- **No Build Step**: Runs directly in browser
- **No Framework Dependencies**: Pure JavaScript/HTML/CSS
- **Retro Aesthetic**: Terminal-style UI inspired by 1990s business sims
- **SVG Graphics**: Scalable world map for route visualization
- **LocalStorage Ready**: Save/load functionality scaffolded

## Project Structure

```
aerobiz/
├── index.html              # Main HTML file
├── style.css               # Retro terminal styles
└── js/                     # Modular JavaScript
    ├── main.js             # Entry point
    ├── data/               # Game data (aircraft, airports, events, competitors)
    ├── models/             # GameState class
    ├── engine/             # Game logic (GameEngine, GameController)
    ├── ui/                 # Rendering (UIRenderer, ModalManager)
    └── utils/              # Helpers and configuration
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

## Development

The game uses a **modular architecture** for maintainability and scalability:
- **Separation of concerns**: Data, logic, and UI are separate
- **Easy to extend**: Add new aircraft, airports, or events easily
- **Testable**: Each module can be unit tested
- **Debuggable**: Access game state via `window.game` in console

### Future Enhancements (Not Implemented)
- Connection flights and hub bonuses
- International regulations and permissions
- Seasonal demand variations
- More detailed aircraft specifications
- Staff management
- Marketing campaigns by route
- Save/load functionality
- Statistics and historical charts

## Credits

Inspired by **Aerobiz Supersonic** by KOEI (1994)
