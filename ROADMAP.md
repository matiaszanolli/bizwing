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
