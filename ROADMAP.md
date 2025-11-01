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

### v0.3 - "Polish & Playability" (Target: 2 weeks)

**Priority: High - Make it Feel Complete**

#### Turn Management System
- [ ] Pre-Quarter Review Screen
  - **"Ready to Advance?"** confirmation with summary
  - Quick stats: cash, routes, fleet size
  - Pending actions reminder (executives idle, unprofitable routes, etc.)
  - Option to cancel and keep planning

- [ ] Quarter Planning Checklist
  - Visual checklist of common tasks
  - ☐ Review all route profitability
  - ☐ Assign idle executives
  - ☐ Check for aircraft deals
  - ☐ Review competitor activity
  - ☐ Adjust advertising budget
  - Auto-check completed items

#### Core Features
- [ ] Save/Load System
  - Implement localStorage persistence
  - Auto-save every turn
  - Manual save/load buttons
  - Export/import save files

- [ ] Tutorial/Help System
  - Interactive first-time tutorial
  - In-game help tooltips
  - Strategy guide section
  - Keyboard shortcuts reference

- [ ] Quality of Life
  - Keyboard shortcuts (Space = next turn, etc.)
  - Route deletion/modification
  - Aircraft selling/retirement
  - Quick filters for airports (by region, owned, etc.)
  - Sort options for routes (by profit, distance, etc.)

#### Polish
- [ ] Sound Effects (optional, toggle-able)
  - Cash register for profit
  - Jet engine for new route
  - Alert for events
- [ ] Animations
  - Smooth transitions
  - Route line drawing animation
  - Number count-up effects
- [ ] Visual Improvements
  - Better airport markers
  - Route thickness by frequency
  - Color-code profitable vs unprofitable routes

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

**Last Updated:** October 31, 2025
**Current Version:** v0.2.0
**Next Milestone:** v0.3 (Polish & Playability)

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

