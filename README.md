# BizWing - Airline Management Simulation

A browser-based airline management simulation game inspired by the classic KOEI Aerobiz Supersonic series.

## How to Play

### Current Version (v0.3 - React + TypeScript)
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Game Features

### Historical Aircraft Catalog (70+ Aircraft)
- **Propeller Era (1955-1960s)**: DC-6, Super Constellation, Viscount
- **Early Jet Era (1958-1969)**: Boeing 707, DC-8, 727, DC-9, BAC One-Eleven
- **Wide-Body Revolution (1970-1979)**: Boeing 747, DC-10, L-1011, Airbus A300
- **1980s Era**: Boeing 757/767, Airbus A310/A320, MD-80 series
- **Regional Jets (1985+)**: ATR 42/72, CRJ family, ERJ family, Fokker 70/100
- **Modern Narrow-body (1992+)**: Boeing 737NG, Airbus A320 family, 757
- **Modern Wide-body (1992+)**: Boeing 767/777/787, Airbus A330/A340/A350
- **Jumbo/Ultra Long-haul**: Boeing 747 family, Airbus A380
- **Cargo Fleet**: Boeing 747F/767F/777F, MD-11F, Airbus A330F
- **Supersonic**: Concorde (1976-2003)

### Aircraft Production Lifecycle
- **Historical Accuracy**: Aircraft enter and exit production based on real history
- **Advance Warnings**: Q1 announcements for aircraft launching next year
- **Production Ending Alerts**: 1-year warning before aircraft discontinued
- **Visual Indicators**: "ENDING PRODUCTION" badges with pulsing effects

### Aircraft Age & Maintenance System
- **5 Condition Tiers**: Excellent (0-5y) → Good (6-10y) → Fair (11-15y) → Poor (16-20y) → Critical (20y+)
- **Maintenance Cost Multipliers**: Scale from 1.0x to 3.5x based on aircraft age
- **Fuel Efficiency Degradation**: Older aircraft consume up to 60% more fuel
- **Fleet Condition Display**: Color-coded indicators showing aircraft health
- **Maintenance Warnings**: Q1 alerts when aircraft reach critical ages (15, 20, 25+ years)
- **Strategic Impact**: Forces fleet renewal decisions and long-term planning

### Start Year Selection
- **Multiple Eras**: Choose from 1955, 1960, 1970, 1980, 1992+
- **Era-Appropriate Aircraft**: Only aircraft available in your chosen era appear
- **Historical Progression**: New aircraft become available as years advance
- **Era-Specific Challenges**: Different starting conditions and aircraft economics

### Expanded Global Network (74 Airports)
- **North America (15)**: JFK, LAX, ORD, DFW, ATL, MIA, SFO, SEA, YYZ, MEX, etc.
- **Europe (15)**: LHR, CDG, FRA, AMS, MAD, FCO, SVO, IST, BCN, MUC, etc.
- **Asia (15)**: NRT, HKG, SIN, PEK, PVG, ICN, BKK, DEL, BOM, KUL, etc.
- **Middle East (6)**: DXB, DOH, AUH, RUH, TLV, JED
- **Africa (8)**: JNB, CAI, CPT, LOS, ADD, NBO, CMN, ALG
- **Oceania (5)**: SYD, MEL, AKL, BNE, PER
- **South America (10)**: GRU, GIG, EZE, BOG, LIM, SCL, PTY, etc.

### Advanced Airport Filtering
- **Ownership Filter**: Available, Owned, Competitor, All
- **Market Size Tiers**: Small (<5M), Medium (5-15M), Large (15-30M), Mega (30M+)
- **Region Filter**: 7 continental regions plus "All"

### Route Management
- **Dynamic Profitability**: Competition and aircraft age affect route performance
- **Distance Constraints**: Aircraft range vs route distance
- **Flexible Frequencies**: 1-14 flights/week
- **Suspension System**: Suspend unprofitable routes without deleting them

### Financial System
- **Leasing vs Buying**: Purchase aircraft outright or lease quarterly
- **Loans**: Take loans with configurable interest rates (varies by difficulty)
- **Dynamic Economics**: Fuel prices and passenger demand fluctuate
- **Quarterly Reports**: Track revenue, expenses, and profitability
- **Age-Based Costs**: Aircraft maintenance and fuel costs increase with age

### Competition
- **3 AI Competitors**: Each with different strategies
- **Aggressive Expansion**: Competitors actively expand their networks
- **Market Competition**: Shared airports reduce route profitability
- **Strategic Decisions**: Monitor and respond to competitor moves

### Reputation System
- **Reputation (0-100)**: Affects passenger demand and load factors
- **Improved by**: Profitable operations, advertising campaigns
- **Damaged by**: Losses, poor performance, negative events

### Random Events
Events occur randomly each quarter (probability varies by difficulty):
- **Economic Events**: Booms, recessions, tourism surges
- **Fuel Events**: Oil crises or price drops
- **Operational Events**: Strikes, technology breakthroughs
- **Competitor Events**: Bankruptcy opportunities

### Difficulty Levels
- **Easy**: $75M starting cash, 1.5% loan interest, 0.7x competitor aggression, 5% event chance
- **Normal**: $50M starting cash, 2.0% loan interest, 1.0x competitor aggression, 10% event chance
- **Hard**: $35M starting cash, 2.5% loan interest, 1.3x competitor aggression, 15% event chance

### Save/Load System
- **Auto-Save**: Automatic save every quarter
- **Multiple Slots**: 5 save slots with metadata
- **Save Metadata**: Shows airline name, date, cash, and timestamp
- **New Game**: Clear auto-save to start fresh

### Tutorial System
- **Interactive Tutorial**: Step-by-step guidance for new players
- **Welcome Screen**: Choose airline name, starting year, difficulty
- **Skip Option**: Experienced players can skip the tutorial

## Game Controls

### Main Actions
- **Buy Aircraft**: Purchase or lease new planes for your fleet
- **Buy Airport Slots**: Acquire slots at airports worldwide
- **Create Routes**: Assign aircraft to routes between owned airports
- **Manage Routes**: Adjust frequency, suspend, or delete routes
- **Take Loan**: Borrow money for expansion
- **Set Advertising**: Allocate quarterly advertising budget
- **Advance Quarter**: Progress time and execute financial calculations

### Fleet Management
- **Sell Aircraft**: Sell owned aircraft (depreciation applies)
- **Return Leased Aircraft**: End lease agreements
- **Aircraft Aging**: Monitor aircraft condition and plan replacements

## Winning & Losing

### Victory
- Survive until year 2000 (or 20 years from start)
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
8. **Aircraft Selection**: Match aircraft capacity and range to route demand
9. **Fleet Age Management**: Plan aircraft replacement before maintenance costs spiral
10. **Era Awareness**: Buy aircraft before they're discontinued
11. **Market Size**: Target larger airports for better route profitability
12. **Fuel Efficiency**: Older aircraft become expensive as they age

## Technical Details

- **React + TypeScript**: Modern, type-safe architecture
- **Vite**: Fast build tool and dev server
- **Modular Design**: Clean separation of concerns
- **Retro Aesthetic**: Terminal-style UI inspired by 1990s business sims
- **SVG Graphics**: Scalable world map for route visualization
- **LocalStorage Persistence**: Save/load functionality

## Project Structure

```
aerobiz/
├── src/
│   ├── components/
│   │   ├── Dashboard/          # Main game panels
│   │   ├── Modals/             # Modal dialogs
│   │   └── Tutorial/           # Tutorial system
│   ├── contexts/               # React contexts
│   ├── data/                   # Game data (aircraft, airports, events)
│   ├── engine/                 # Game logic
│   ├── models/                 # TypeScript models
│   ├── utils/                  # Helpers and configuration
│   └── styles/                 # CSS styles
├── public/                     # Static assets
└── index.html                  # Entry point
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

## Development

The game uses a **modular architecture** for maintainability and scalability:
- **Separation of concerns**: Data, logic, and UI are separate
- **Easy to extend**: Add new aircraft, airports, or events easily
- **Type-safe**: TypeScript provides compile-time safety
- **Testable**: Each module can be unit tested

## Credits

Inspired by **Aerobiz Supersonic** by KOEI (1994)

## Version History

See [ROADMAP.md](ROADMAP.md) for detailed version history and future plans.

**Current Version**: v0.3.0 (November 2025)
- 70+ historical aircraft (1955-2015)
- Aircraft production lifecycle with warnings
- Aircraft age & maintenance penalty system
- 74 airports across 7 regions
- Start year selection (1955-1992+)
- Difficulty levels (Easy, Normal, Hard)
- Save/load system with multiple slots
- Interactive tutorial system
