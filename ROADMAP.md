# Aerobiz Supersonic - Product Roadmap

## Vision

Build the ultimate browser-based airline management simulation that honors the classic KOEI Aerobiz series while leveraging modern web technologies.

## Design Philosophy: The Aerobiz Way

### What Made Aerobiz Special

The original Aerobiz wasn't just about clicking "Next Turn." Each quarter was a **strategic ritual**:

1. **Review & Analyze** - Study reports, identify problems and opportunities
2. **Plan & Optimize** - Adjust routes, pricing, fleet assignments
3. **Negotiate & Invest** - Send executives on missions, make deals
4. **Execute & Commit** - Finalize decisions, advance the quarter
5. **React & Adapt** - See results, handle events, plan next quarter

**Key Principles:**
- ⏰ **Time Matters**: You can't do everything in one quarter
- 🎯 **Choices Matter**: Every decision has trade-offs
- 📊 **Information Matters**: Better intelligence = better decisions
- 🤝 **Relationships Matter**: Executives, board, competitors, governments
- 🎲 **Luck Matters**: Events can help or hurt, adapt or die
- 💰 **Money Matters**: Cash flow is king, bankruptcy is real

This roadmap prioritizes features that enhance this **deliberate, strategic gameplay** over flashy but shallow additions.

## Current Status: v0.2 - "Modular Foundation"

✅ **Completed:**
- Core game mechanics (routes, aircraft, finances)
- 31 airports across 6 continents
- 14 aircraft types (regional to jumbo)
- AI competitors with strategic behavior
- Random events system
- Leasing and loan mechanics
- Reputation system
- Modular architecture with clean separation
- Comprehensive documentation

## Release Milestones

### v0.3 - "Polish & Playability" ✅ COMPLETED (November 2025)

**Priority: High - Make it Feel Complete**

#### Historical Accuracy & Aircraft Management
- ✅ **Historical Aircraft Catalog**: 70+ aircraft from 1955-2015
- ✅ **Aircraft Production Lifecycle**: Introduction and discontinuation dates
- ✅ **Production Warnings**: Q1 announcements for new/ending aircraft
- ✅ **Aircraft Age & Maintenance System**: 5 condition tiers with penalties
- ✅ **Fuel Efficiency Degradation**: Age-based fuel consumption increase
- ✅ **Fleet Condition Display**: Visual indicators in Fleet panel
- ✅ **Maintenance Warnings**: Q1 alerts for aging aircraft

#### Start Year & Era Selection
- ✅ **Multiple Starting Years**: 1955, 1960, 1970, 1980, 1992+
- ✅ **Dynamic Aircraft Filtering**: Only show era-appropriate aircraft
- ✅ **Era-Specific Starting Aircraft**: Historically accurate starting fleet
- ✅ **Historical Progression**: Aircraft availability changes over time

#### Expanded World
- ✅ **74 Airports**: Across 7 regions globally
- ✅ **Airport Filtering**: By ownership, market size, region
- ✅ **Market Size Tiers**: Small, Medium, Large, Mega categories

#### Core Features
- ✅ **Save/Load System**
  - LocalStorage persistence
  - Auto-save every quarter
  - Multiple save slots (5 total)
  - Save metadata display

- ✅ **Tutorial/Help System**
  - Interactive tutorial
  - Welcome screen
  - Skip option

- ✅ **Difficulty Levels**
  - Easy, Normal, Hard modes
  - Adjustable parameters

#### Turn Management System (Deferred to v0.4)
- [ ] Pre-Quarter Review Screen
- [ ] Quarter Planning Checklist

#### Quality of Life (Partial - ongoing)
- ✅ Route deletion/modification
- ✅ Aircraft selling/retirement
- ✅ Quick filters for airports
- [ ] Keyboard shortcuts
- [ ] Sort options for routes

#### Polish (Deferred to later versions)
- [ ] Sound Effects
- [ ] Advanced Animations
- [ ] Route thickness by frequency

---

### v0.4 - "Strategic Depth" (Target: 1 month)

**Priority: High - Capture the Aerobiz Experience**

> *"Before advancing the quarter, you want to squeeze every opportunity"*

#### Executive Management System
- [ ] Executive Team
  - Hire/fire executives (Marketing, Operations, Finance, Strategy)
  - Each executive has skills/stats
  - Salary affects cash flow but improves performance
  - Experience levels (Junior → Senior → Expert)

- [ ] Executive Actions (Per Quarter)
  - **Slot Negotiations**: Send exec to negotiate airport slots (success rate based on skill)
  - **Ad Campaigns**: Launch targeted marketing in specific regions
  - **Route Analysis**: Get detailed profitability reports
  - **Competitor Intelligence**: Spy on rival airlines' plans
  - **Labor Relations**: Negotiate with unions, prevent strikes
  - **Government Relations**: Lobby for favorable regulations
  - **Aircraft Negotiations**: Get better purchase/lease deals
  - **Hub Development**: Oversee infrastructure improvements

- [ ] Meetings & Reports
  - **Board Meeting Screen**: Review quarterly performance before advancing
  - **Route Performance Dashboard**: See all routes at a glance with profit trends
  - **Market Analysis Report**: Demand forecasts by region
  - **Competitor Report**: What rivals did this quarter
  - **Financial Breakdown**: Detailed income statement
  - **Fleet Utilization Report**: Which aircraft are underutilized

#### Route Optimization
- [ ] Route Management Interface
  - Bulk edit routes (change frequency, pricing)
  - "Optimize All Routes" suggestion system
  - Seasonal scheduling (more flights in summer)
  - Route groups/categories for easy management
  - Performance alerts (unprofitable routes highlighted)

- [ ] Pricing Strategy
  - Adjust prices per route
  - Dynamic pricing based on demand
  - Competitive pricing vs competitors
  - Yield management (overbooking)

#### Hub System
- [ ] Connection Flights
  - Passengers transfer at hubs
  - Revenue bonus for connections
  - Hub efficiency rating
  - Minimum connection time requirements

- [ ] Hub Development
  - Upgrade terminals (capacity, service quality)
  - Build lounges (reputation boost)
  - Add cargo facilities
  - Improve ground operations (turnaround time)
  - Hub specialization (cargo, international, regional)

#### Business Opportunities (Aerobiz-Style)
- [ ] Special Deals
  - **Aircraft Deals**: Manufacturer offers on new planes (limited time)
  - **Airport Incentives**: Cities offering subsidies for new routes
  - **Fuel Contracts**: Lock in fuel prices for multiple quarters
  - **Code-Share Offers**: Competitors propose partnerships
  - **Acquisition Targets**: Buy struggling competitors
  - **Government Contracts**: Compete for mail/cargo contracts

- [ ] Investment Opportunities
  - **Hotels at Hubs**: Build hotels for connecting passengers
  - **Ground Services**: Invest in catering, maintenance facilities
  - **Training Centers**: Build pilot/crew training facilities
  - **Real Estate**: Purchase airport-adjacent property
  - **Technology**: Invest in booking systems, IT infrastructure

- [ ] Negotiations Mini-Game
  - Choose negotiator (executives have different skills)
  - Multiple rounds of offers/counteroffers
  - Success based on negotiator skill, market conditions, luck
  - Can walk away or accept deal

#### Advanced Economics
- [ ] Fare Classes & Configuration
  - Economy, Business, First class split
  - Configure aircraft (more seats = less comfort)
  - Premium services affect reputation
  - VIP charters for high-value routes

- [ ] Cargo Operations
  - Dedicated cargo routes
  - Belly cargo on passenger flights
  - Contract cargo vs spot market
  - Express delivery premium pricing
  - Cargo aircraft have different economics

- [ ] Seasonal & Regional Factors
  - Holiday travel spikes
  - Business travel patterns (weekdays)
  - Regional events (Olympics, expos)
  - Weather affects demand
  - Cultural preferences by region

#### Fleet Management
- [ ] Aircraft Lifecycle
  - Purchase decisions (new vs used)
  - Depreciation affects resale value
  - Midlife refurbishment options
  - Retirement timing for tax benefits
  - Historic aircraft can become attractions

- [ ] Maintenance & Operations
  - Scheduled maintenance windows
  - Aircraft reliability by age/type
  - Spare aircraft for coverage
  - Maintenance facility investments
  - Heavy checks (C-check, D-check costs)

- [ ] Strategic Fleet Planning
  - Fleet standardization bonuses (training, parts)
  - Mixed fleet flexibility vs complexity
  - Order lead times (planes take time to deliver)
  - Delivery slots are valuable assets
  - Wet leasing for temporary capacity

#### Competition & Diplomacy
- [ ] Competitive Intelligence
  - Spy on competitor routes
  - Track competitor financial health
  - Predict expansion plans
  - Counter-strategies
  - Headhunting their executives

- [ ] Strategic Moves
  - **Hostile Takeovers**: Buy out competitors
  - **Mergers**: Combine with willing partners
  - **Route Swaps**: Trade routes with competitors
  - **Slot Trades**: Exchange valuable airport slots
  - **Price Wars**: Aggressive pricing to drive out competition
  - **Capacity Dumping**: Flood routes to hurt rivals

- [ ] Alliances & Partnerships
  - Form alliances (Star Alliance style)
  - Code-sharing agreements
  - Shared lounges and services
  - Joint purchasing power
  - Coordinated schedules
  - But... alliance partners can betray you!

---

### v0.5 - "The Aerobiz Experience" (Target: 2 months)

**Priority: Very High - True to the Original**

> *"This is where it becomes REAL Aerobiz"*

#### Turn Structure Overhaul
- [ ] Multi-Phase Quarter System
  - **Phase 1: Planning** - Review reports, assign executives
  - **Phase 2: Actions** - Execute your decisions
  - **Phase 3: Events** - Random events, competitor moves
  - **Phase 4: Resolution** - Calculate results, financial summary
  - **Phase 5: Board Meeting** - Review performance, get approval

- [ ] Executive Action System (Complete)
  - Each executive can take ONE action per quarter
  - Actions take time (some span multiple quarters)
  - Success/failure affects executive morale and skill
  - Failed negotiations can damage relationships
  - Successful actions give bonuses

- [ ] Comprehensive Dashboard
  - **Main Screen**: All key info visible at once
  - **Route Manager**: Spreadsheet-style route editing
  - **Fleet Manager**: Aircraft assignment and planning
  - **Finance Dashboard**: Detailed P&L, balance sheet
  - **Market Intelligence**: Competitor analysis
  - **Opportunities Board**: All available deals/negotiations

#### Classic Aerobiz Features
- [ ] Subsidiary Businesses
  - Hotel chains at major hubs
  - Duty-free shops
  - Airport restaurants
  - Car rental partnerships
  - Tour packages

- [ ] Labor Management
  - Pilot unions (can strike!)
  - Flight attendant contracts
  - Ground crew hiring
  - Training programs affect service quality
  - Wage negotiations

- [ ] Political & Regulatory
  - Landing rights negotiations
  - International treaties affect routes
  - Deregulation events
  - Environmental regulations
  - Government subsidies for certain routes

- [ ] Service Quality System
  - In-flight meals (economy to premium)
  - Entertainment systems
  - Seat pitch and comfort
  - On-time performance tracking
  - Lost baggage rates
  - Customer service ratings

#### Board of Directors
- [ ] Board Relationships
  - Board has expectations (profit targets, growth)
  - Must keep them happy or risk dismissal
  - Board approves major investments
  - Quarterly performance reviews
  - Can request emergency funding if in good standing

- [ ] Shareholder Management (if public)
  - Stock price based on performance
  - Dividend policy
  - Buyback options
  - Hostile takeover defense
  - Quarterly earnings calls

#### Time Pressure Elements
- [ ] Limited Actions Per Quarter
  - Can't do everything at once
  - Must prioritize (realistic time management)
  - Some opportunities expire
  - Competitors act while you plan

- [ ] Turn Timer (Optional)
  - Chess clock style: limited time to plan quarter
  - Hardcore mode for experienced players
  - Forces quick strategic thinking

---

### v0.6 - "World Building" (Target: 3 months)

**Priority: Medium - Expand the Game World**

#### More Airports
- [ ] 50+ total airports
  - Secondary cities
  - Regional airports
  - Emerging markets
- [ ] Airport Characteristics
  - Slot restrictions (time-limited gates)
  - Weather conditions affecting operations
  - Political stability affecting demand

#### Historical Accuracy
- [ ] Timeline Events
  - Gulf War (1991) - fuel spike
  - 9/11 (2001) - demand crash
  - Financial crisis (2008)
  - COVID-19 (optional, 2020)
- [ ] Aircraft Availability by Year
  - 737 MAX (2017)
  - A380 (2007)
  - Retire old models (DC-10, etc.)
- [ ] Regulatory Changes
  - Deregulation effects
  - Open skies agreements
  - Environmental regulations

#### Scenarios
- [ ] Challenge Scenarios
  - Start with debt
  - Specific route requirements
  - Time-limited objectives
- [ ] Historical Scenarios
  - Start in 1978 (deregulation)
  - Start in 2001 (post-9/11)
  - Regional focus (Asia-only, etc.)

---

### v0.7 - "Local Multiplayer & Replayability" (Target: 4 months)

**Priority: Low - After Core Experience is Perfect**

> *Note: Online multiplayer is NOT a priority. Focus is on deep single-player.*

#### Hotseat Multiplayer
- [ ] Local Pass-and-Play
  - 2-4 players on same device
  - Take turns on same browser
  - No server needed!
  - Perfect for friends/family
  - Save/resume multiplayer games

#### Challenge Modes
- [ ] Scenario Editor
  - Create custom starting conditions
  - Set objectives (profit targets, route goals)
  - Time limits
  - Share scenarios via JSON export

- [ ] Daily Challenges (Offline)
  - Pre-generated scenarios
  - Same seed for everyone
  - Compare scores locally
  - No online requirement

#### Personal Progression
- [ ] Personal Best Tracking
  - Your top scores by scenario
  - Progress over time
  - Achievements unlocked
- [ ] Export/Share Achievements
  - Screenshot generator
  - Share on social media
  - No online leaderboard needed

---

### v0.8 - "Advanced Features" (Target: 5 months)

**Priority: Low - Nice-to-Have**

#### Analytics Dashboard
- [ ] Historical Charts
  - Cash over time
  - Revenue/expense breakdown
  - Fleet growth timeline
- [ ] Route Analytics
  - Profit trend per route
  - Load factor history
  - Competitor activity
- [ ] Predictive Insights
  - Suggested profitable routes
  - Warning: unprofitable routes
  - Optimal expansion timing

#### Advanced AI
- [ ] Smarter Competitors
  - Machine learning for decisions
  - Learn from player strategies
  - Adaptive difficulty
- [ ] Market Simulation
  - Supply/demand modeling
  - Price elasticity
  - Seasonal patterns

#### Modding Support
- [ ] Custom Content
  - JSON-based aircraft definitions
  - Custom airport databases
  - Event modding
- [ ] Mod Marketplace
  - Community-created content
  - Historical accuracy mods
  - Fantasy scenarios

---

### v1.0 - "Full Release" (Target: 6 months)

**Priority: High - Production Ready**

#### Final Polish
- [ ] Performance Optimization
  - Lazy loading for large saves
  - Virtual scrolling for lists
  - Web worker for calculations
- [ ] Browser Testing
  - Chrome, Firefox, Safari, Edge
  - Mobile browser support
  - Accessibility audit
- [ ] Documentation
  - Full user manual
  - Video tutorials
  - API documentation for modders

#### Marketing
- [ ] Landing Page
  - Features showcase
  - Screenshots/GIFs
  - Download/play link
- [ ] Community
  - Discord server
  - Reddit community
  - GitHub discussions
- [ ] Press Kit
  - Logo assets
  - Screenshots
  - Press release

---

## Long-Term Vision (v2.0+)

### Mobile App
- Native iOS/Android apps
- Touch-optimized interface
- Cloud save sync

### 3D Mode
- WebGL-based 3D world
- Animated aircraft
- Camera controls

### Advanced Simulation
- Real-time operations
- Live flight tracking
- Weather systems
- Fuel management

### Business Expansion
- Hotels at hubs
- Ground transportation
- In-flight services
- Corporate branding

---

## Technical Debt & Maintenance

### Ongoing
- [ ] Unit test coverage >80%
- [ ] Integration tests
- [ ] Performance benchmarks
- [ ] Security audit
- [ ] Dependency updates

### Code Quality
- [ ] TypeScript migration
- [ ] ESLint configuration
- [ ] Prettier formatting
- [ ] CI/CD pipeline

### Infrastructure
- [ ] CDN hosting
- [ ] Error tracking (Sentry)
- [ ] Analytics (privacy-friendly)
- [ ] Automated backups

---

## Community Requests

Track popular feature requests:

| Feature | Votes | Priority | Status |
|---------|-------|----------|--------|
| Save/Load | 🔥🔥🔥 | P0 | v0.3 |
| More airports | 🔥🔥 | P1 | v0.5 |
| Cargo routes | 🔥🔥 | P1 | v0.4 |
| Multiplayer | 🔥 | P2 | v0.6 |
| Mobile app | 🔥 | P3 | v2.0 |

---

## Success Metrics

### v0.3 Goals
- 100 active players
- Average session: 30 minutes
- 70% return within week

### v0.6 Goals
- 1,000 active players
- 50 concurrent multiplayer games
- 4.5+ star rating

### v1.0 Goals
- 10,000 active players
- Featured on HN/Reddit
- Community contributions

---

## Decision Framework

When prioritizing features, consider:

1. **User Value**: Does it make the game more fun?
2. **Technical Debt**: Does it improve code quality?
3. **Effort**: Can we ship it quickly?
4. **Risk**: What could go wrong?
5. **Community**: Is it requested?

**Formula:** Priority = (Value × Community) / (Effort × Risk)

---

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to pick a task
- Development workflow
- Code standards
- PR process

---

## Questions & Feedback

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Design questions and ideas
- **Discord** (future): Real-time chat
- **Email** (future): Direct contact

---

## Changelog

### v0.3.0 - November 2025
- ✨ **Historical Aircraft Availability**: 70+ aircraft spanning 1955-2015
  - Propeller era (DC-6, Super Constellation, Viscount)
  - Early jets (707, DC-8, 727, DC-9)
  - Wide-body revolution (747, DC-10, L-1011, A300)
  - Modern era (737NG, A320 family, 777, 787, A380)
  - Cargo fleet (747F, 767F, 777F, MD-11F)
  - Supersonic (Concorde)
- ✨ **Aircraft Production Lifecycle**: Aircraft enter and exit production with historical accuracy
  - Year introduced and year discontinued tracking
  - Q1 announcements for upcoming aircraft
  - Production ending warnings (1 year advance notice)
  - Visual badges for aircraft ending production
- ✨ **Aircraft Age & Maintenance Penalties**: Comprehensive aging system
  - 5 condition tiers (Excellent, Good, Fair, Poor, Critical)
  - Age-based maintenance cost multipliers (1.0x → 3.5x)
  - Fuel efficiency degradation (0% → +60% consumption)
  - Fleet panel shows aircraft condition with visual indicators
  - Q1 maintenance warnings for aging aircraft (15 years, 20 years, milestones)
- ✨ **Start Year Selection**: Choose your starting era
  - 1955, 1960, 1970, 1980, 1992+ starting years
  - Aircraft catalog dynamically filtered by year
  - Era-appropriate starting aircraft
  - Historical progression gameplay
- ✨ **Expanded Airport Network**: 74 airports across 7 regions
  - North America (15), Europe (15), Asia (15)
  - Middle East (6), Africa (8), Oceania (5), South America (10)
  - Advanced filtering (ownership, market size, region)
  - Market size tiers (Small, Medium, Large, Mega)
- ✨ **Difficulty Levels**: Easy, Normal, Hard
  - Adjustable starting cash, interest rates, competitor aggression
  - Event probability varies by difficulty
- ✨ **Save/Load System**: Full game persistence
  - LocalStorage-based save system
  - Auto-save every quarter
  - Multiple save slots (5 slots)
  - Save metadata with airline name, date, financials
- ✨ **Tutorial System**: Interactive onboarding
  - Step-by-step guidance for new players
  - Contextual hints and tooltips
  - Welcome screen with game setup
  - Skip tutorial option for experienced players

### v0.2.0 - October 2025
- ✨ Modular architecture
- ✨ 31 airports worldwide
- ✨ 14 aircraft types
- ✨ Leasing and loans
- ✨ Random events
- ✨ AI competitors
- 📚 Comprehensive documentation

### v0.1.0 - October 2025
- 🎉 Initial prototype
- Basic gameplay loop
- 10 airports
- 6 aircraft types
- Simple economics

---

**Last Updated:** November 1, 2025
**Current Version:** v0.3.0
**Next Milestone:** v0.4 (Strategic Depth)

---

### v0.8 - "Aircraft Lifecycle Management" (Target: 3-4 months)

**Priority: Medium - Adds Strategic Depth**

> **New Feature Category**: Manage your fleet beyond just buying and assigning aircraft. Aircraft age, break down, can be bought used, restored, or upgraded.

#### Aircraft Maintenance System
- [ ] **Scheduled Maintenance**
  - Aircraft require maintenance every X quarters
  - Miss maintenance = increased breakdown risk
  - Maintenance costs scale with aircraft age
  - Choose maintenance quality (cheap = risky, premium = extends life)
  
- [ ] **Breakdown Events**
  - Random breakdowns based on age + maintenance history
  - Aircraft grounded for 1-3 quarters
  - Emergency repairs cost 2-3x normal maintenance
  - Route disruption = lost revenue + reputation hit
  
- [ ] **Aging Mechanics**
  - Operating costs increase 5% per year of age
  - Passenger confidence decreases (older planes = lower load factor)
  - After 15+ years: "vintage" status (novelty appeal OR reliability concerns)

#### Airport Ground Services
- [ ] **Service Crew Management**
  - Hire ground crew at owned airports
  - Crew quality affects:
    - Turnaround time (more flights per aircraft)
    - Maintenance quality (fewer breakdowns)
    - Passenger satisfaction (reputation boost)
  
- [ ] **Ground Service Contracts**
  - Choose between in-house crew vs outsourcing
  - In-house = higher upfront cost, better quality, more control
  - Outsourced = cheaper, flexible, but variable quality
  
- [ ] **Facility Upgrades**
  - Upgrade hangars for better maintenance
  - Build dedicated terminals for premium service
  - Invest in fuel efficiency equipment

#### Secondary Aircraft Market
- [ ] **Used Aircraft Store**
  - Buy aircraft at 30-70% discount based on age/condition
  - Competitors sell their old fleet
  - Inspect before buying (hidden defects possible!)
  - "As-is" purchases = gamble on maintenance needs
  
- [ ] **Aircraft Condition Ratings**
  - Excellent (90-100%): Like new, minimal maintenance
  - Good (70-89%): Well maintained, reliable
  - Fair (50-69%): Shows age, regular maintenance needed
  - Poor (30-49%): High risk, cheap but expensive to maintain
  - Critical (<30%): Should be retired or restored
  
- [ ] **Selling Your Fleet**
  - Retire old aircraft and sell them
  - Sale price based on condition rating
  - Option to "trade in" when buying new aircraft

#### Long-term Aircraft Projects
- [ ] **Aircraft Restoration**
  - Restore poor-condition aircraft over 2-4 quarters
  - Gradual improvement: Critical → Poor → Fair → Good
  - Cheaper than buying new, but requires time investment
  - Restoration quality depends on:
    - Money invested per quarter
    - Maintenance crew skill level
    - Luck (sometimes you find unexpected damage)
  
- [ ] **Aircraft Refurbishment/Modernization**
  - Upgrade old aircraft with modern tech
  - Add WiFi, entertainment systems (+passenger appeal)
  - Engine upgrades (better fuel efficiency)
  - Cabin reconfiguration (change capacity)
  - Takes 1-2 quarters, aircraft unavailable during work
  
- [ ] **Custom Aircraft Modifications**
  - Convert passenger aircraft to cargo (or vice versa)
  - VIP/Executive configuration (low capacity, high prestige)
  - Budget configuration (high capacity, low comfort)
  - Each configuration affects operating costs and appeal

#### Strategic Gameplay Impact

**Resource Management Trade-offs:**
- Buy new = expensive, reliable, no surprises
- Buy used = cheap, risky, requires expertise
- Restore = patient strategy, pays off long-term
- Refurbish = modernize aging fleet without full replacement

**New Strategic Decisions:**
- When to retire vs restore aging aircraft?
- Build maintenance expertise or outsource?
- Buy premium maintenance to extend aircraft life?
- Gamble on cheap used aircraft or pay for reliability?

**Economic Depth:**
- Aircraft depreciation becomes real consideration
- Maintenance budgets = ongoing operational cost
- Ground crew salaries = fixed costs per airport
- Secondary market creates liquidity (can sell to raise cash)

---

**Success Criteria for v0.8:**
- ✓ Players have meaningful decisions about fleet lifecycle
- ✓ Aircraft age is not just a number, it affects gameplay
- ✓ Used market creates opportunities for skilled players
- ✓ Maintenance system adds realism without micromanagement
- ✓ Ground services differentiate premium vs budget airlines
- ✓ Long-term projects reward patient strategic planning

**Balancing Notes:**
- Don't make maintenance so punishing it's un-fun
- Used aircraft should be risky but rewarding
- Restoration should take real time but be worthwhile
- Ground crew should matter but not overwhelm other decisions


#### Realistic Aircraft Economics

**Core Principle**: Aircraft are expensive capital assets. Scrapping should be a LAST resort.

##### Restoration vs Disposal Decision Tree

```
Aircraft Condition Critical (<30%)
│
├─ Option 1: Sell "As-Is"
│  └─ Value: 10-20% of original price
│     (Mostly scrap value + some usable parts)
│
├─ Option 2: Part Out (Disassemble)
│  └─ Value: 20-30% of original price
│     Takes 2 quarters, airport hangar space needed
│     Sell engines, avionics, landing gear separately
│
└─ Option 3: Restore ⭐ (Often Best Choice)
   └─ Cost: 40-60% of original price over 3-4 quarters
      Final Value: 70-80% of original (Good condition)
      ROI: Positive! Worth more than selling as-is
```

##### Economic Realism Features

- [ ] **Restoration ROI Calculator**
  - Show projected value after restoration vs sell now
  - Factor in: current condition, age, model demand
  - "This aircraft is worth $8M restored vs $2M as-is - restore!"
  
- [ ] **Parts Market**
  - Disassemble aircraft → get parts inventory
  - Use parts to reduce maintenance costs on similar aircraft
  - Sell parts to other airlines (small passive income)
  - Example: "Engine from retired 737 can maintain your 737 fleet cheaper"

- [ ] **Condition-Based Decisions**
  - **Excellent→Good** (90-70%): Just maintain normally
  - **Good→Fair** (70-50%): Minor overhaul (1 quarter, modest cost)
  - **Fair→Poor** (50-30%): Major overhaul (2 quarters, significant cost)
  - **Poor→Critical** (<30%): DECISION POINT
    - Young aircraft (<10 years): Almost always restore
    - Mid-age (10-20 years): Calculate ROI
    - Old aircraft (>20 years): Consider retirement

- [ ] **Aircraft Salvage Value Logic**
  ```
  Base Scrap Value = 10% of original price
  + Parts Value = 15% if disassembled
  + Collector Value = +20% if historic/rare model
  - Age Penalty = -5% per decade
  ```

- [ ] **Restoration Success Rates**
  - Not all restorations succeed!
  - Success depends on:
    - Initial condition (Poor = 90% success, Critical = 60%)
    - Investment level (cheap restoration = risky)
    - Maintenance crew skill
  - Failed restoration = wasted money, aircraft unsalvageable
  - Adds risk/reward decision-making

##### Real-World Scenarios

**Scenario 1: Young Aircraft Breakdown**
- Boeing 777, 5 years old, Critical condition (accident damage)
- Original: $160M | As-is: $15M | Restored: $120M
- **Decision**: RESTORE (cost $80M, gain $105M value)

**Scenario 2: Aging Workhorse**
- Boeing 737, 18 years old, Poor condition
- Original: $35M | As-is: $4M | Restored: $18M
- **Decision**: Calculate if restoration ($20M) worth it
  - Keep flying 5+ more years? → Restore
  - Replacing with modern fleet? → Sell/Part out

**Scenario 3: Ancient Relic**
- MD-11, 25 years old, Critical condition
- Original: $120M | As-is: $3M | Parts: $8M | Collector: $15M
- **Decision**: Part out OR sell to collector/museum

**Scenario 4: Parts Supply Chain**
- Own 5x Boeing 767s, all aging
- One suffers catastrophic failure
- **Smart Move**: Part it out, use parts for other 4 aircraft
  - Reduces their maintenance costs 30% for 3 years
  - Extends fleet life without buying new

##### Gameplay Impact

**Strategic Considerations:**
- Building a "restoration expertise" becomes valuable skill
- Buying cheap critical aircraft to restore = profit opportunity
- Parts inventory from retired aircraft = competitive advantage
- Mixed fleet (same models) = better parts synergy

**Economic Realism:**
- Aircraft value doesn't disappear overnight
- Maintenance history affects resale value
- Specialist knowledge (restoration) is rewarded
- Long-term fleet planning matters

**Player Decisions:**
- "Should I restore this cheap 777 or buy a new one?"
- "Keep parts from retirement for my fleet or sell them?"
- "Invest in restoration skills or just buy new aircraft?"
- "Build relationships with parts suppliers/brokers?"

---

**Balancing Goal**: Make restoration a viable, realistic strategy without making it overpowered. Players should feel rewarded for smart fleet management decisions.


---

### v0.9 - "Dynamic World Events" (Target: 4-5 months)

**Priority: High - Adds Unpredictability & Replayability**

> **Core Concept**: The world doesn't stay static. Economic booms, natural disasters, political conflicts, and business opportunities create a living, breathing simulation that requires constant adaptation.

#### Event System Architecture

**Current State (v0.2):**
- ✅ Basic random events (10 types)
- ✅ Fuel price fluctuations
- ✅ Economic condition multipliers
- ❌ Events are generic and forgettable
- ❌ No geographic specificity
- ❌ No player agency in responding

**Enhanced Event System:**

##### Event Categories & Examples

**1. Economic Events** 💰
- [ ] **Regional Economic Boom**
  - Affects: Specific continent/region
  - Effect: +40% passenger demand in region
  - Duration: 4-8 quarters
  - Example: "Asian Tiger Economies boom! Demand surge in Hong Kong, Singapore, Tokyo"
  
- [ ] **Recession/Depression**
  - Affects: Global or regional
  - Effect: -35% demand, reduced ticket prices
  - Duration: 6-12 quarters
  - Example: "Dot-com bubble bursts! Tech sector collapse affects business travel"
  
- [ ] **Currency Crisis**
  - Affects: Specific country/region
  - Effect: Routes to/from affected areas become 50% less profitable
  - Duration: 4 quarters
  - Player Response: Reduce service or wait it out?

**2. Natural Disasters** 🌪️
- [ ] **Hurricanes/Typhoons**
  - Affects: Specific airports (Caribbean, Pacific)
  - Effect: Airport closed 1-2 quarters, routes disrupted
  - Warning: 1 quarter advance notice
  - Player Response: Reroute aircraft, temporary suspend service
  
- [ ] **Earthquakes**
  - Affects: Seismic zones (Japan, California, Chile)
  - Effect: Airport damaged, capacity reduced 50%
  - Duration: 2-4 quarters for repairs
  - Example: "Major earthquake hits Tokyo! Narita Airport operating at half capacity"
  
- [ ] **Volcanic Eruptions**
  - Affects: Nearby airports + air traffic
  - Effect: Ash cloud grounds flights in region
  - Duration: 1-2 quarters
  - Example: "Icelandic volcano erupts! European airspace chaos"
  
- [ ] **Pandemics/Health Crises**
  - Affects: Global or regional
  - Effect: -60% international travel, quarantine requirements
  - Duration: 4-12 quarters (serious impact!)
  - Player Response: Focus on cargo? Domestic routes? Survive until it passes?

**3. Political/Conflict Events** ⚔️
- [ ] **Regional Conflicts/Wars**
  - Affects: Conflict zones + surrounding regions
  - Effect: Airspace closed, demand destroyed
  - Duration: Variable (2-20 quarters)
  - Example: "Middle East conflict escalates - avoid airspace or risk it?"
  
- [ ] **Trade Wars/Sanctions**
  - Affects: Specific country pairs
  - Effect: Reduced business travel, tariffs on fuel
  - Duration: 4-16 quarters
  - Example: "US-China trade tensions! Corporate travel budget cuts"
  
- [ ] **Border Closures**
  - Affects: Specific countries
  - Effect: Routes banned temporarily
  - Duration: 2-6 quarters
  - Example: "Immigration crisis! Country X closes borders to foreign carriers"
  
- [ ] **Diplomatic Breakthroughs**
  - Affects: Previously hostile regions
  - Effect: New routes open, demand surge
  - Duration: Permanent (new opportunity!)
  - Example: "Cold War ends! Eastern Europe opens to Western airlines!"

**4. Industry Events** ✈️
- [ ] **Fuel Crisis (Oil Shock)**
  - Affects: Global
  - Effect: +50-100% fuel costs
  - Duration: 4-8 quarters
  - Player Response: Fuel-efficient aircraft become critical
  
- [ ] **Technology Breakthroughs**
  - Affects: Aircraft manufacturers
  - Effect: New aircraft available early, or existing aircraft upgraded
  - Example: "Boeing unveils revolutionary engine! 30% better fuel economy"
  
- [ ] **Safety Incidents**
  - Affects: Specific aircraft model or airline
  - Effect: Grounding, passenger confidence loss
  - Duration: 2-4 quarters investigation + fixes
  - Example: "737 MAX grounded worldwide pending investigation"
  
- [ ] **Airline Bankruptcies**
  - Affects: Competitor airlines
  - Effect: Routes/slots/aircraft become available for purchase
  - Opportunity: Buy assets at discount!
  - Example: "Pan Am declares bankruptcy! Assets liquidation sale"
  
- [ ] **Labor Strikes**
  - Affects: Your airline or competitors
  - Effect: Operations disrupted, costs increase
  - Duration: 1-2 quarters
  - Player Choice: Meet demands (expensive) or tough it out (reputation hit)?

**5. Business Opportunities** 📈
- [ ] **Major Events (Olympics, World Cup)**
  - Affects: Host city/country
  - Effect: +200% demand for 1-2 quarters
  - Advance Notice: 4-8 quarters
  - Player Decision: Build capacity early or miss opportunity?
  
- [ ] **Corporate Relocations**
  - Affects: Specific city pairs
  - Effect: New permanent business travel demand
  - Example: "Tech giant opens Singapore office! SFO-SIN route potential"
  
- [ ] **Tourism Campaigns**
  - Affects: Specific destinations
  - Effect: +30% leisure travel
  - Duration: 4-8 quarters
  - Example: "Visit Thailand campaign succeeds! Bangkok tourism boom"
  
- [ ] **Government Contracts**
  - Affects: Your airline (if you bid)
  - Effect: Guaranteed revenue for X quarters
  - Requirement: Meet specific criteria (aircraft count, routes, reputation)
  - Example: "Military transport contract available - 10 cargo aircraft needed"

**6. Random Serendipitous Events** 🎲
- [ ] **VIP Travel**
  - Effect: Single huge payment, reputation boost
  - Example: "Royal family books charter flight! $5M revenue + prestige"
  
- [ ] **Movie/Celebrity Endorsement**
  - Effect: Reputation +10, demand boost for 4 quarters
  - Example: "Hollywood film features your airline! Brand awareness soars"
  
- [ ] **Acquisition Offers**
  - Effect: Another airline wants to buy you out
  - Player Choice: Sell and "win" early? Or refuse and keep playing?
  
- [ ] **Hostile Takeover Attempts**
  - Effect: Rival tries to buy your airline
  - Defense: Spend cash to buy shares, or risk losing control

#### Event System Mechanics

##### Geographic Specificity
- [ ] **Region-Based Events**
  - Events target specific continents/countries/cities
  - "European debt crisis" affects only European routes
  - "Pacific typhoon season" only affects Pacific airports
  
- [ ] **Cascading Effects**
  - Hub disruption affects all routes through that hub
  - Regional recession spreads to trading partners
  - Disaster in one city affects nearby cities

##### Player Agency
- [ ] **Event Responses**
  - Not just "event happens, you suffer"
  - Give players choices:
    - Reroute around conflict zones
    - Stockpile fuel before crisis
    - Bid on government contracts
    - Insurance policies (pay premium, get disaster protection)
  
- [ ] **Event Warnings**
  - Some events give advance notice
  - "Hurricane forming - 1 quarter warning"
  - "Trade tensions escalating - prepare for sanctions"
  - Reward players who pay attention and plan ahead

##### Event Probability & Balance
- [ ] **Weighted Probabilities**
  - Common: Economic fluctuations (30% chance per quarter)
  - Uncommon: Natural disasters (10% chance)
  - Rare: Major conflicts, breakthroughs (5% chance)
  - Very Rare: Acquisition offers, celebrity events (1% chance)
  
- [ ] **Historical Events (Optional Mode)**
  - Play through real historical timeline
  - 1990s: Gulf War, Asian Financial Crisis, 9/11
  - 2000s: SARS, Great Recession, Arab Spring
  - Adds educational value + predictability for planning

##### Storytelling & Immersion
- [ ] **News Headlines**
  - Events announced with dramatic headlines
  - "BREAKING: Earthquake Strikes Tokyo! Narita Airport Damaged"
  - Photos/icons for major events
  
- [ ] **Event Chains**
  - Events can trigger other events
  - "Oil price spike → Airline bankruptcies → Acquisition opportunities"
  - Creates narrative arcs across multiple quarters
  
- [ ] **Competitor Reactions**
  - AI competitors also respond to events
  - "Global Airways cancels all Middle East routes due to conflict"
  - "Sky Connect buys bankrupt airline's assets"

#### Gameplay Impact

**Strategic Depth:**
- Route diversification becomes crucial (don't rely on one region)
- Insurance/hedging strategies emerge
- Timing decisions matter (expand before boom, contract before recession)

**Risk Management:**
- Events create unavoidable losses sometimes
- Players must build cash reserves for bad times
- "Boring but stable" strategies have value

**Replayability:**
- Every playthrough has different event sequences
- Historical mode offers structured challenge
- Event combinations create unique scenarios

**Emotional Investment:**
- Overcoming disasters feels rewarding
- Capitalizing on opportunities feels clever
- Unpredictability keeps players engaged

---

**Success Criteria for v0.9:**
- ✓ Events feel consequential, not just flavor text
- ✓ Players can respond strategically to events
- ✓ Geographic specificity makes world feel real
- ✓ Event chains create emergent narratives
- ✓ Balance: Events create challenge without being unfair

**Design Principles:**
- Events should create DECISIONS, not just randomness
- Give advance warning when possible (fair play)
- Make events geographically/historically plausible
- Ensure some events create opportunities, not just penalties

---

### v0.10 - "Historical Eras" (Target: TBD)

**Priority: High - Capture Aerobiz Supersonic's Core Magic**

> *"The world in 1960 is fundamentally different from 1990. Your airline must adapt to the times."*

#### Era-Based Gameplay System

One of Aerobiz Supersonic's most compelling features was playing through different historical periods, each with unique challenges, opportunities, and geopolitical constraints. This isn't just cosmetic - it fundamentally changes how you play the game.

##### Three Game Modes

**Mode 1: Classic Campaign (20-Year Span)**
- [ ] **The Aerobiz Way**
  - Choose starting year from 1955 onwards (1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, etc.)
  - Play exactly 20 years (80 quarters) from that point
  - **Victory Condition**: Highest net worth at end of 20 years
  - **Example**: Start 1975 → Play until 1995
    - Begin with 747s, oil crisis, and Cold War restrictions
    - End with 777s, Asian growth, and post-Cold War opportunities
  - Aircraft availability and geopolitical constraints match the era
  - Historical events occur as appropriate for the time period
  - **Scoring**: Cash + Asset Value + Route Network Value + Reputation Bonus
  - Time limit creates urgency and strategic planning
  - Difficulty levels: Easy (Extra cash), Normal, Hard (Less cash, tougher competitors), Brutal

**Mode 2: Domination (Unlimited Time)**
- [ ] **Global Conquest**
  - No time limit - play as long as it takes
  - **Victory Condition**: #1 market share in ALL 7 continents
    - North America, South America, Europe, Africa, Asia, Middle East, Oceania
  - Must maintain dominance for 4 consecutive quarters to win
  - Choose starting era (1960+) but time progresses realistically
  - Aircraft technology advances as years pass
  - Competitors never give up - continuous challenge
  - Can take 50+ game years if you start small
  - **Challenge**: Balancing expansion across all continents simultaneously
  - Late-game competitors will be massive (they grew too!)
  - **Special mechanic**: Continental dominance meter for each region
  - Can choose starting location (affects which continent is easiest to dominate first)

**Mode 3: Scenarios (Historical Challenges)**
- [ ] **Specific Survival/Achievement Challenges**

  **Starting from Scratch:**
  - "Third World Startup" - Start airline in underdeveloped nation with minimal funds
    - Small African or Central American nation, 1970s
    - $500K starting cash (vs normal $5M)
    - Only DC-9s and 737-200s available initially
    - Goal: Achieve profitability and expand to 3+ continents
  - "Eastern Bloc 1970" - Soviet airline with terrible aircraft, survive until capitalism
    - Start with Tupolev Tu-154s (inefficient but reliable)
    - Can only fly Warsaw Pact routes initially
    - Goal: Survive until 1991, then successfully transition to Western aircraft
  - "Island Nation Challenge" - Start in Caribbean/Pacific with tiny market
    - Limited domestic demand, must expand internationally
    - High slot costs at major airports
    - Goal: Build global network from remote starting point
  - "Bankruptcy Recovery" - Inherit airline with massive debt
    - -$2M cash flow per quarter
    - 8 quarters to achieve profitability or game over
    - All routes unprofitable, aging fleet
    - Must cut ruthlessly and rebuild

  **Save the Giants:**
  - "Save Pan Am (1985)" - Historic airline in decline, prevent 1991 bankruptcy
    - Start with aging 747 fleet, unprofitable transatlantic routes
    - Deregulation chaos, fierce competition from upstarts
    - Union contracts limiting flexibility
    - Must achieve sustained profitability within 12 quarters
    - **⭐⭐⭐⭐⭐**: Not just survive but return to profitability AND maintain Pan Am's prestige reputation (90+)
  - "Save Varig (2000)" - Brazilian giant facing crisis
    - Massive debt ($500M+), inefficient mixed fleet
    - Brazilian Real crisis affecting revenue
    - Government protection eroding
    - Achieve positive cash flow within 16 quarters
    - **⭐⭐⭐⭐⭐**: Clear all debt AND establish profitable routes to 4+ continents
  - "Save Swissair (1998)" - "The Flying Bank" before the fall
    - Over-expanded with bad acquisitions
    - Debt from buying stakes in failing carriers
    - Must divest unprofitable assets without destroying core business
    - Avoid 2001 bankruptcy (survive until 2002)

  **Historical Gauntlet:**
  - "9/11 Survivor (2001)" - Your airline on September 10, 2001
    - Running profitably with 20+ aircraft, coast-to-coast routes
    - **September 11 event triggers**: Immediate 40% demand drop
    - Security costs increase 300%
    - Insurance costs skyrocket
    - Must survive 12 quarters without bankruptcy
    - Competitors going bankrupt = acquisition opportunities
    - **⭐⭐⭐⭐⭐**: Not just survive but acquire failed competitor and emerge stronger
  - "2020 Pandemic (ULTIMATE CHALLENGE)" - COVID-19 hits your thriving airline
    - Start March 2020 with large fleet, international routes
    - **Q2 2020**: 90% passenger demand collapse overnight
    - Cargo becomes only significant revenue
    - Government bailouts available (restrictions: no layoffs, no bonuses, routes maintained)
    - Must survive 8 quarters until recovery begins
    - Choice: Take bailout with strings OR refuse and cut drastically
    - **This is the hardest scenario possible**
    - **⭐⭐⭐⭐⭐**: Survive without bailout AND maintain 80%+ pre-pandemic fleet

  **Strategic Puzzles:**
  - "Oil Crisis 1973" - You have aging Boeing 707 fleet when fuel triples
    - October 1973: Oil embargo starts, fuel costs triple
    - Fleet of 10 707s suddenly hemorrhaging money
    - Can you modernize fast enough? Or park aircraft and wait it out?
    - 8 quarters to achieve profitability with new economic reality
  - "Deregulation Day 1978" - Navigate US airline chaos
    - October 24, 1978: Airline Deregulation Act passes
    - Established carrier with fixed routes suddenly facing competition
    - Low-cost carriers undercutting fares 40%
    - Must adapt or die: Hub strategy? Match prices? Premium service?
  - "Gulf War 1990" - Your Middle East routes suddenly closed
    - August 1990: Iraq invades Kuwait
    - 40% of your revenue from routes through Gulf region
    - All Middle East routes suspended or severely limited
    - Must pivot network within 4 quarters

- [ ] **Scenario Victory Conditions**
  - Each scenario has specific goals (survive X quarters, achieve profitability, reach market share target)
  - **Star Rating System**: 1-5 stars based on how well you succeed
    - ⭐ = Barely survived (met minimum objective)
    - ⭐⭐ = Survived comfortably
    - ⭐⭐⭐ = Met all objectives
    - ⭐⭐⭐⭐ = Exceeded expectations
    - ⭐⭐⭐⭐⭐ = Legendary performance (thriving airline, maintained prestige, captured opportunities)
  - Leaderboards for each scenario (based on final net worth or time to completion)
  - Unlockable scenarios (beat Pan Am ⭐⭐⭐ to unlock Varig, beat 9/11 ⭐⭐⭐ to unlock 2020 Pandemic)
  - **Scenario Progress Tracking**: See which scenarios you've beaten and at what star level

##### Core Era Mechanics (Shared Across All Modes)

##### Aircraft Availability by Era

The **aircraft catalog changes dramatically** based on era. This was a KEY feature of Aerobiz Supersonic.

**1960s: Jet Age Dawn**
```
Available Aircraft:
- Boeing 707 (long-range workhorse)
- Douglas DC-8 (competitor to 707)
- Boeing 727 (tri-jet, medium range)
- Caravelle (European short-range)
- Comet 4 (British pioneer, unreliable)
- Convair 880/990 (niche)

Missing: All wide-bodies, modern jets, regional jets
Fuel: Cheap but aircraft inefficient
Range: Limited (no ETOPS, routes must hop continents)
```

**1970s: Wide-Body Revolution & Oil Crisis**
```
New Aircraft:
- Boeing 747 (game-changer, huge capacity)
- DC-10 (tri-jet wide-body)
- Lockheed L-1011 (advanced but troubled)
- Airbus A300 (European challenger emerges)
- Boeing 737-200 (early narrow-body workhorse)

Era Challenge: 1973 & 1979 oil shocks
- Fuel costs TRIPLE mid-decade
- Inefficient jets (707, DC-8) become unprofitable
- Forces fleet modernization
```

**1980s: Deregulation & Competition**
```
New Aircraft:
- Boeing 757/767 (efficient twins)
- Airbus A310/A320 (fly-by-wire revolution)
- MD-80 series (DC-9 evolution)
- Boeing 747-400 (ultra-long range)
- Fokker 100, BAe 146 (regional jets emerge)

Era Challenge: US Deregulation (1978)
- Brutal competition, fare wars
- Hub-and-spoke model dominates
- LCCs (Low-Cost Carriers) emerge
- Many airlines go bankrupt
```

**1990s: Globalization & Consolidation**
```
New Aircraft:
- Boeing 777 (ETOPS revolution, twins cross oceans)
- Airbus A330/A340 (long-range family)
- Boeing 737NG (Next Generation)
- MD-11 (last McDonnell Douglas, flawed)
- CRJ/ERJ (regional jet boom)

Era Challenge: Asian Financial Crisis (1997-98)
- Pacific routes collapse
- Opportunities for expansion (cheap slots/aircraft)
- 9/11 at era end (2001) - industry transformation
```

**2000s: Modern Efficiency**
```
New Aircraft:
- Airbus A380 (super-jumbo)
- Boeing 787 (Dreamliner, composite revolution)
- Airbus A350 (787 competitor)
- Boeing 737 MAX (efficiency, later grounded)
- Bombardier CSeries → Airbus A220

Era Challenge: Great Recession (2008-2009)
- Massive demand collapse
- Fuel price volatility
- Airline consolidation wave
```

##### Geopolitical Constraints by Era

This is CRUCIAL - where you start your airline determines which manufacturers you can buy from!

**Cold War Era (1960s-1980s):**

```
Western Airlines (USA, Western Europe, Japan):
✓ Can buy: Boeing, McDonnell Douglas, Airbus, British aircraft
✗ Cannot buy: Tupolev, Ilyushin (Soviet aircraft)
✗ Cannot fly to: USSR, Warsaw Pact nations, China
✓ Can fly to: Western Europe, Americas, Japan, Middle East

Eastern Airlines (USSR, Eastern Europe):
✓ Can buy: Tupolev, Ilyushin, Antonov
✗ Cannot buy: Boeing, McDonnell Douglas, Airbus
✗ Cannot fly to: Western nations (limited)
✓ Can fly to: Warsaw Pact, China, Cuba, sympathetic nations

Non-Aligned Airlines (India, Egypt, Yugoslavia):
✓ Can buy: Both Eastern and Western aircraft (but at premium)
✓ Can fly to: Both blocs (huge advantage!)
⚠ Risk: Dependency on volatile alliances
```

**Post-Cold War (1990s+):**
- Eastern bloc opens up
- Soviet aircraft become obsolete
- Eastern European airlines must re-fleet entirely (opportunity!)
- New routes to former USSR = gold rush
- But infrastructure poor, demand uncertain

**Modern Era (2000s+):**
- China emerges as massive market
- Middle Eastern carriers dominate (Emirates, Qatar, Etihad)
- LCCs proliferate globally
- Open Skies agreements change route economics
- Chinese aircraft (COMAC) enter market (2010s+)

##### Political Events Affecting Routes

**Era-Specific Route Restrictions:**

**1960s-1970s:**
- Vietnam War: Southeast Asia routes dangerous/closed
- Arab-Israeli conflicts: Middle East overflight restricted
- African decolonization: New nations = new airports opening
- India-Pakistan conflicts: Subcontinent routing difficult

**1980s:**
- Cold War peak: No overflying USSR (must route around)
  - Europe-Japan flights = 12+ hours instead of 9
  - Creates demand for refueling stops (Anchorage!)
- Iran-Iraq War: Persian Gulf routes dangerous
- Falklands War: South Atlantic disrupted

**1990s:**
- Gulf War (1990-91): Middle East routes suspended temporarily
- Yugoslav Wars: Balkan routes closed
- **Cold War ends (1991): MASSIVE opportunity!**
  - Direct routes to Moscow, Eastern Europe
  - Ex-Soviet airports hungry for service
  - Cheap aircraft from failed Eastern carriers

**2000s:**
- 9/11 (2001): Industry transformation
  - Security costs soar
  - US airspace closed temporarily
  - Many carriers bankrupted
  - But survivors gain market share
- Iraq War (2003): Middle East volatility
- SARS (2003): Asia routes collapse temporarily

##### Starting Location Impact

Where you base your airline dramatically affects strategy:

**USA Start (1960s):**
- ✓ Access to best aircraft (Boeing, McDonnell Douglas)
- ✓ Huge domestic market
- ✓ Strong economy
- ✗ Cannot reach Eastern bloc
- ✗ High labor costs
- Strategy: Dominate Atlantic & Pacific routes

**European Start (1960s):**
- ✓ Central location, hub potential
- ✓ Access to Airbus (1970s+)
- ✗ Fragmented market (many countries)
- ✗ Strong flag carriers (competition)
- Strategy: Build hub, connect East-West

**Asian Start (Japan, 1960s):**
- ✓ Growing economy
- ✓ Pacific routes to USA
- ✗ Limited domestic market (small island)
- ✗ Expensive slots
- Strategy: Premium service, focus on profitable routes

**Middle East Start (1980s+):**
- ✓ Geographic advantage (Europe-Asia midpoint)
- ✓ Low taxes, cheap fuel
- ✓ 24/7 operations (no curfew)
- ✗ Small local market (transit focus)
- Strategy: Become global super-connector

**Eastern Bloc Start (1960s-1980s):**
- ✓ Captive market (no competition)
- ✓ Government subsidies
- ✗ Terrible aircraft (unreliable, inefficient)
- ✗ Cannot access Western markets
- Strategy: Survive until 1990s, then modernize!

##### Era-Specific Economic Challenges

**1960s: Infrastructure Limits**
- Few airports have jet-capable runways
- Limited navigation technology (must follow established routes)
- Passenger capacity growing faster than airports
- Slot availability not yet an issue

**1970s: Oil Crisis Management**
- Fuel costs become major expense
- Older aircraft (707, DC-8) hemorrhage money
- **Strategic choice:** Keep cheap old aircraft or buy expensive but efficient new ones?
- Some players will go bankrupt if not careful

**1980s: Deregulation Chaos**
- Fare wars drive prices to historic lows
- LCCs undercut legacy carriers
- Hub dominance becomes critical
- Yield management systems give competitive edge

**1990s: Globalization Complexity**
- Code-share agreements become important
- Alliance networks (Star, OneWorld, SkyTeam) form
- Asian growth offers huge opportunities
- But Asian Financial Crisis (1997) can destroy Asia-focused airlines

**2000s: Efficiency Wars**
- Fuel efficiency paramount
- LCCs dominate short-haul
- Legacy carriers must compete on service
- Consolidation: Merge or die

##### Gameplay Implementation

**UI Changes:**
- [ ] Era selector at game start
- [ ] "Current Era: 1973" always visible in header
- [ ] Aircraft catalog filtered by era (with "coming soon" preview)
- [ ] Route restrictions shown on map (grayed-out regions)
- [ ] Historical news ticker ("1973: Oil Crisis Begins!")
- [ ] Era transition cutscene/announcement

**Balance Considerations:**
- Earlier eras = simpler gameplay (fewer aircraft, fewer routes)
- Good for beginners: Start in 1960s
- Expert players: Start in 1990s with full complexity
- **Challenge Mode:** Start Eastern Bloc 1960, survive to 2000

**Aircraft Data Requirements:**
- Need introduction/retirement years for each aircraft
- Era-appropriate pricing (inflation-adjusted)
- Era-appropriate fuel efficiency
- Manufacturer availability by era and player location

**Route Data Requirements:**
- Political bloc membership by nation/era
- Overflight permissions by era
- Airport opening/closure dates
- Slot availability evolution over time

##### Success Criteria

✓ Starting in different eras feels distinctly different
✓ Geopolitical constraints create meaningful strategy choices
✓ Aircraft progression feels authentic and impactful
✓ Cold War restrictions create tension and opportunity
✓ Era transitions feel momentous (e.g., "Berlin Wall Falls! Eastern Europe Opens!")
✓ Players want to replay in different eras to experience different challenges

**Design Principles:**
- Historical accuracy balanced with fun gameplay
- Era constraints should create interesting decisions, not just frustration
- Each era should have a "signature challenge" (oil crisis, deregulation, etc.)
- Non-historians should still understand the basics without Wikipedia
- Optional "historical mode" vs "inspired by history" mode

##### Example Playthrough: Eastern Bloc 1970s

**Starting Situation:**
- Based in Moscow, Aeroflot monopoly broken
- Can only buy Tupolev Tu-154, Ilyushin Il-62
- Can only fly within Warsaw Pact + Cuba, Vietnam, Syria
- Fuel is subsidized (cheap)
- Demand is guaranteed (planned economy)

**Mid-Era (1975):**
- Expansion to Havana, Hanoi routes
- Tu-154 reliable but fuel-hungry
- Cannot compete with Western carriers on efficiency
- But no Western competition in your markets!

**Late-Era (1979):**
- Afghanistan War starts - Kabul route suddenly strategic
- Hints of coming change (Gorbachev era approaching)
- Must decide: Stick with Soviet aircraft or prepare for future?

**Era Transition (1990):**
- **Berlin Wall Falls!**
- Suddenly can access Western markets
- But aircraft are obsolete
- Must buy Western aircraft (expensive!) or perish
- Historic opportunity: Buy cheap slots in former East Germany!

**Strategic Choice:**
- Take massive loan to buy Boeing 737s?
- Or try to compete with aging Tu-154s (will fail)?
- Or merge with Western carrier?

This creates a **unique narrative** impossible in other eras!

---

**Success Criteria for v0.10:**

**Mode 1 (Classic Campaign):**
- ✓ Can choose any 5-year increment start date from 1955 onwards
- ✓ 20-year (80 quarter) time limit creates focused strategic gameplay
- ✓ Net worth scoring system rewards both growth and efficiency
- ✓ Different eras (1955, 1975, 1995, etc.) play distinctly different
- ✓ Historical events appropriate to the era occur naturally
- ✓ Victory feels earned and celebratory

**Mode 2 (Domination):**
- ✓ Continental dominance tracking works smoothly (7 continents)
- ✓ Must maintain #1 position for 4 quarters in ALL continents to win
- ✓ Takes 30-50+ years of gameplay (epic scope)
- ✓ Competitors scale appropriately over time
- ✓ Late-game remains challenging (competitors don't give up)
- ✓ Victory feels like a massive accomplishment

**Mode 3 (Scenarios):**
- ✓ At least 10 scenarios at launch (starting, save giants, gauntlet, puzzles)
- ✓ Each scenario has clear objectives and star rating system
- ✓ 5-star victories are genuinely difficult (< 10% of players)
- ✓ Historical scenarios feel authentic (Pan Am, Varig, 9/11, COVID)
- ✓ Scenario progression/unlocking works smoothly
- ✓ Leaderboards motivate competition
- ✓ 2020 Pandemic scenario is brutally difficult but fair

**All Modes:**
- ✓ Aircraft catalog accurately reflects each era
- ✓ Geopolitical constraints feel authentic (Cold War, etc.)
- ✓ Starting location (US vs Europe vs Asia vs Middle East vs Eastern Bloc) creates distinct strategies
- ✓ Players understand historical context without needing to be historians
- ✓ Cold War mechanics create meaningful strategic choices
- ✓ Era transitions (where applicable) are dramatic and consequential
- ✓ Massive replayability: Each mode offers 20+ hours, scenarios add 50+ hours total

