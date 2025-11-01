# Aerobiz Classic Features - Implementation Guide

## The Quarter Ritual: Turn-Based Strategy Done Right

### Current State (v0.2)
- Click "Advance Quarter"
- Numbers update
- That's it

### Target State (v0.5)
Before advancing each quarter, you should:

1. ✅ Review all route performance (profitability dashboard)
2. ✅ Optimize underperforming routes (pricing, frequency)
3. ✅ Assign executives to tasks (negotiations, campaigns)
4. ✅ Check for special opportunities (deals, contracts)
5. ✅ Review competitor moves (intelligence reports)
6. ✅ Make investment decisions (aircraft, hotels, tech)
7. ✅ Attend board meeting (justify your decisions)
8. ✅ Advance quarter → see results → repeat

## Executive Management System

### The Core Mechanic

**Executives are your most valuable resource.** Each quarter, they can perform ONE action.

### Executive Types

#### 1. Marketing Executive
**Skills**: Advertising, Brand Building, Market Research
**Actions:**
- Launch ad campaign in specific region (+demand)
- Sponsor events (Olympics, sports teams)
- Conduct market research (reveal demand forecasts)
- Negotiate code-share deals
- Launch loyalty program

#### 2. Operations Executive
**Skills**: Efficiency, Safety, Quality Control
**Actions:**
- Improve on-time performance
- Reduce turnaround times
- Negotiate better ground handling contracts
- Implement new catering services
- Upgrade fleet maintenance

#### 3. Finance Executive
**Skills**: Negotiation, Analysis, Risk Management
**Actions:**
- Negotiate better loan terms
- Arrange fuel hedging contracts
- Analyze competitor financials
- Identify acquisition targets
- Arrange aircraft financing deals

#### 4. Strategy Executive
**Skills**: Planning, Intelligence, Forecasting
**Actions:**
- Spy on competitor expansion plans
- Identify profitable route opportunities
- Negotiate airport slot acquisitions
- Scout for government contracts
- Plan hub development

### Executive Stats

Each executive has:
- **Skill Level**: 1-10 (affects success rate)
- **Experience**: Increases with successful actions
- **Morale**: Affects performance, can quit if too low
- **Salary**: Higher skill = higher cost
- **Specialization**: Bonuses for certain action types

### Action Resolution

When you assign an action:
1. **Probability calculated**: Based on skill, market conditions, difficulty
2. **Random element**: Dice roll determines success/failure
3. **Results applied**: If successful, get benefits
4. **Feedback shown**: "Executive Smith successfully negotiated slots at LAX!"
5. **Skill updated**: Success increases experience, failure lowers morale

### Multi-Quarter Actions

Some actions take multiple quarters:
- **Slot Negotiations**: 1-3 quarters depending on airport prestige
- **Hotel Construction**: 4 quarters to build
- **Aircraft Delivery**: 2-8 quarters from order to arrival
- **Training Programs**: 2 quarters to complete

## Business Opportunities System

### How Opportunities Appear

Each quarter, there's a chance for special opportunities:

#### Aircraft Manufacturer Deals
```
OPPORTUNITY: Boeing Winter Sale
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Boeing is offering 15% off 777-200s
for orders placed this quarter.

Regular Price: $160M
Sale Price: $136M (Save $24M!)

Available: 3 aircraft
Delivery: 6 quarters
Expires: End of this quarter

[Accept] [Negotiate] [Decline]
```

#### Airport Incentives
```
OPPORTUNITY: Dubai Hub Expansion
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dubai is offering subsidies for new
international routes.

Subsidy: $2M per quarter for 2 years
Requirements:
- 3+ flights per week
- Wide-body aircraft only

Assign Executive? [Select] [Decline]
```

#### Acquisition Targets
```
OPPORTUNITY: Sky Connect in Trouble
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Competitor Sky Connect is struggling.
Their board may accept a buyout offer.

Their Assets:
- 8 airports (including NRT, SIN)
- 12 aircraft
- $25M debt
- Asking Price: $80M

[Make Offer] [Pass]
```

## The Board Meeting

### Quarterly Performance Review

After each quarter, you meet with the board:

```
╔══════════════════════════════════════════╗
║         BOARD MEETING - Q1 1993          ║
╚══════════════════════════════════════════╝

Board Members Present:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👔 Chairman Chen      (Satisfied)
👔 Director Williams  (Concerned)
👔 Director Tanaka    (Happy)
👔 Director Schmidt   (Neutral)

Quarterly Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Revenue:    $45.2M  ▲12%
Expenses:   $38.1M  ▲8%
Profit:     $7.1M   ▲35%

Board Targets:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Profitability: EXCEEDED
✓ Growth: MET
✗ Market Share: MISSED

Chairman: "Good profit growth, but we're
losing ground to Global Airways. What's
your plan to compete?"

Your Response:
[A] "We're planning aggressive expansion into Asia"
[B] "We'll focus on premium service and margins"
[C] "I need more time to evaluate options"
[D] "The board needs to be more patient"
```

### Board Approval System

Major decisions require board approval:
- Large aircraft orders (>$100M)
- Acquisitions
- New hub development
- Going public (IPO)

If board relationship is poor:
- They may reject your proposals
- They may demand cost cuts
- They may force you out (GAME OVER)

## Negotiation Mini-Game

### Example: Airport Slot Negotiation

```
╔══════════════════════════════════════════╗
║   NEGOTIATION: HEATHROW AIRPORT SLOTS    ║
╚══════════════════════════════════════════╝

Your Executive: Sarah Chen (Finance, Skill: 8)
Their Representative: Airport Authority

Round 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Airport: "Slots at LHR are premium. We're
asking $25M for a 10-year lease."

Your Options:
[A] Accept ($25M)
[B] Counter-offer ($18M) - Moderate risk
[C] Counter-offer ($15M) - High risk
[D] Offer route guarantee instead
[E] Walk away

You choose: [B] Counter $18M

Round 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sarah Chen (Negotiating...): 🎲 Success!

Airport: "We appreciate your business. We
can do $20M if you commit to daily service."

Your Options:
[A] Accept ($20M + daily service)
[B] Push for $18M (Risk: they walk)
[C] Accept $20M without daily commitment
[D] Walk away

Final Result:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deal Accepted: $20M, daily service required
Sarah Chen gains experience: +15 XP
Relationship with LHR: Improved
```

## Subsidiary Businesses

### Hotels at Hubs

Build hotels at your major hubs for additional revenue:

```
╔══════════════════════════════════════════╗
║        BUILD HOTEL AT JFK                ║
╚══════════════════════════════════════════╝

Options:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Budget Hotel]
Cost: $15M | Build Time: 3 quarters
Revenue: $500K/quarter

[Business Hotel]
Cost: $35M | Build Time: 4 quarters
Revenue: $1.2M/quarter

[Luxury Hotel]
Cost: $60M | Build Time: 5 quarters
Revenue: $2.5M/quarter
+Reputation bonus for first-class passengers

Connecting Passengers: 45,000/quarter
Recommended: Business Hotel
Break-even: 7 years
```

### Other Subsidiaries

- **Duty-Free Shops**: Passive income at international hubs
- **Catering Services**: Can serve other airlines too
- **Ground Handling**: Service competitors for fees
- **Maintenance Facilities**: Repair your fleet, sell services
- **Training Centers**: Train pilots, flight attendants

## Labor Relations

### Union Negotiations

Pilots and flight attendants have unions. You must negotiate:

```
╔══════════════════════════════════════════╗
║      PILOT UNION CONTRACT RENEWAL        ║
╚══════════════════════════════════════════╝

Current Contract Expires: Next Quarter
Union Demands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 8% wage increase ($2M/year)
• Better work rules (costs $500K/year)
• Improved benefits ($1M/year)
Total: $3.5M additional cost per year

Union Mood: 😐 Neutral

Your Offer:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wage Increase: [0%-10%]
Work Rules: [Accept] [Reject]
Benefits: [Improve] [Keep Same] [Reduce]

[Make Offer] [Request Mediator] [Tough Stance]

Warning: Strike Risk = 35%
A strike costs $5M per week!
```

## Political & Regulatory

### Landing Rights

International routes require government approval:

```
╔══════════════════════════════════════════╗
║   LANDING RIGHTS: USA → JAPAN ROUTE      ║
╚══════════════════════════════════════════╝

You want: JFK → NRT route
Status: Requires bilateral treaty approval

Actions Available:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Lobby US Government ($500K, 2 quarters)
   Success rate: 65%

2. Negotiate with Japanese carriers (share route)
   Success rate: 45%

3. Wait for Open Skies Agreement
   ETA: Unknown (1-5 years)

4. Partner with existing carrier
   Give up 30% of revenue

Assign: [Strategy Executive] [Decline]
```

## Service Quality Spectrum

### Configuration Trade-offs

**Economy Focus** (More seats)
- Revenue: ↑ 40%
- Reputation: ↓ 20%
- Costs: ↓ 10%
- Load Factor: ↑ 15%

**Balanced** (Standard)
- Revenue: Standard
- Everything: Baseline

**Premium Focus** (Luxury)
- Revenue: ↓ 20%
- Reputation: ↑ 30%
- Costs: ↑ 25%
- Ticket Price: ↑ 50%
- Load Factor: ↓ 10%

### Service Elements

- Seat Pitch: 28"-36"
- Meals: None / Snack / Full Meal / Premium
- Entertainment: None / Basic / Full IFE / Premium
- Lounge Access: None / Partner / Own
- Priority Boarding: No / Yes
- Extra Legroom: No / Available / Free

Each affects reputation, costs, and pricing power.

## Implementation Priority

### v0.4 (Strategic Depth)
1. Executive actions framework
2. Basic negotiation system
3. Route optimization tools
4. Business opportunities

### v0.5 (Aerobiz Experience)
1. Multi-phase turn structure
2. Full executive system
3. Board meetings
4. Labor relations
5. Subsidiary businesses
6. Complete negotiation mini-game

## Success Metrics

The game succeeds when players say:

> "I spent 20 minutes planning my quarter and it was **worth it**"

Not:
> "I clicked through 10 quarters in 2 minutes"

**Engagement over speed. Strategy over clicking.**

---

This is what made Aerobiz legendary. Let's bring it back. ✈️
