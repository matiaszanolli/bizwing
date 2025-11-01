# BizWing UI Component Breakdown & Visual Guide

## File Structure

```
/src/components/
├── Dashboard/
│   ├── Dashboard.tsx          ← Main container (3-column layout)
│   ├── Globe3D.tsx            ← 3D world visualization (Three.js)
│   ├── Header.tsx             ← Top header bar
│   ├── FleetPanel.tsx         ← Aircraft inventory
│   ├── RoutesPanel.tsx        ← Active routes list
│   ├── FinancialPanel.tsx     ← Financial metrics & alerts
│   ├── NewsPanel.tsx          ← Game news feed
│   ├── ActionsPanel.tsx       ← Main game controls
│   └── RouteManagerPanel.tsx  ← Advanced route management table
├── Layout/
│   └── Header.tsx             ← Header component
└── Modals/
    ├── Modal.tsx              ← Base modal wrapper
    ├── ConfirmModal.tsx       ← Simple confirmation
    ├── ConfirmDialog.tsx      ← Alert dialog
    ├── NewGameSetupModal.tsx  ← Game setup (year, difficulty)
    ├── FirstTimeTutorialModal.tsx
    ├── HelpModal.tsx
    ├── BuyAircraftModal.tsx   ← Aircraft selection
    ├── BuyAirportSlotModal.tsx
    ├── CreateRouteModal.tsx   ← Route creation wizard
    ├── RouteManagerModal.tsx  ← Modal version of route manager
    ├── AirportDetailsModal.tsx
    ├── TakeLoanModal.tsx
    ├── EmergencyLoanModal.tsx
    ├── PreQuarterReviewModal.tsx
    ├── PostQuarterResultsModal.tsx
    ├── SaveLoadModal.tsx
    └── RouteManagerModal.tsx

/src/styles/
└── globals.css               ← Single CSS file (2,625 lines)
```

## Component Visual Reference

### 1. Dashboard Layout (Container)
```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo │ Q1 2025 │ MyAirline | Rep: 75/100 │ Cash: $5,000,000    │
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────┬──────────────┐
│              │                              │              │
│   LEFT       │        CENTER (3D GLOBE)     │   RIGHT      │
│   PANEL      │                              │   PANEL      │
│ (280px)      │                              │ (280px)      │
│              │                              │              │
│ ┌──────────┐ │   [3D World Map]             │ ┌──────────┐ │
│ │  Fleet   │ │   [Airport Markers]          │ │Financial │ │
│ │ (x5)     │ │   [Route Arcs]               │ │  Panel   │ │
│ └──────────┘ │                              │ └──────────┘ │
│              │                              │              │
│ ┌──────────┐ │                              │ ┌──────────┐ │
│ │ Routes   │ │   [Legend]                   │ │   News   │ │
│ │ (x3)     │ │                              │ │          │ │
│ └──────────┘ │                              │ └──────────┘ │
│              │                              │              │
│ ┌──────────┐ │                              │              │
│ │ Actions  │ │                              │              │
│ │ [Buttons]│ │                              │              │
│ └──────────┘ │                              │              │
└──────────────┴──────────────────────────────┴──────────────┘
```

### 2. FleetPanel Component
```
┌─────────────────────────────────┐
│ Fleet (3)                       │  ← Title (h2, bright green)
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ B747 Jumbo                  │ │  ← Aircraft name (bright)
│ │ Boeing 747-400              │ │  ← Type (medium green)
│ │ Owned • Age: 8y (32Q) • ...  │ │  ← Details (dim green)
│ │ ● Good • Maint: +15% •...    │ │  ← Condition (color-coded)
│ │ [Sell ($480,000)]            │ │  ← Action (if available)
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ A380 Super Jumbo            │ │
│ │ Airbus A380                 │ │
│ │ Leased • Age: 2y (8Q) •...   │ │
│ │ ● Excellent                 │ │
│ │ [Return Lease]              │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘

Empty State:
┌─────────────────────────────────┐
│ Fleet (0)                       │
├─────────────────────────────────┤
│                                 │
│          ✈️                     │  ← Emoji icon
│    No Aircraft in Fleet         │  ← Title (bright)
│  Click "Buy Aircraft" below     │  ← Hint (dim)
│                                 │
└─────────────────────────────────┘
```

### 3. RoutesPanel Component
```
┌────────────────────────────────────┐
│ Routes (3)    [Sort Dropdown ▼]    │  ← Title + controls
├────────────────────────────────────┤
│                                    │
│ ┌──────────────────────────────┐  │
│ ┌────────────────────────────┐   │
│ │ JFK → LAX                   │   │  ← Route cities (bright)
│ │                  +$50,000/Q │   │  ← Profit (green if +)
│ │ Aircraft: B747 • Dist: 3944 │   │
│ │ Freq: 7/week                │   │
│ │ Revenue: $120,000 • Cost... │   │
│ │ [Suspend] [Delete]          │   │  ← Actions
│ └────────────────────────────┘   │
│                                    │
│ ┌────────────────────────────┐    │
│ │ LAX → HND                   │    │  ◄ Route status indicator
│ │                  -$10,000/Q │    │    (orange border = warning)
│ │ [SUSPENDED]                 │    │  ◄ Suspended badge
│ │ [Resume] [Delete]           │    │
│ └────────────────────────────┘    │
│                                    │
└────────────────────────────────────┘
```

### 4. FinancialPanel Component
```
┌──────────────────────────────────┐
│ Financial Dashboard              │  ← h2 title
├──────────────────────────────────┤
│                                  │
│ Current Quarter Projection       │  ← h3 section title
│ ├─ Revenue:       $450,000       │  ← positive (bright green)
│ ├─ Operating:     -$200,000      │  ← negative (red)
│ ├─ Lease Payment: -$50,000       │  ← negative (red)
│ ├─ Loan Payment:  -$75,000       │  ← negative (red)
│ └─ Net Profit:    +$125,000      │  ← positive highlight
│                                  │
│ Active Loans (2)                 │  ← h3 section
│ ├─ $500,000 | 8Q left            │
│ │  Remaining: $250,000           │
│ │  Payment: $62,500/Q @ 5.5%     │
│ │  [████████░░░░░░░░░░]  50%     │  ← Progress bar (bright)
│ │                                │
│ └─ $250,000 | 4Q left            │
│    Remaining: $125,000           │
│    Payment: $31,250/Q @ 5.5%     │
│    [████████████████░░] 75%      │
│                                  │
│ Financial Health                 │  ← h3 section
│ ├─ Cash Position: $2,500,000     │  ← positive
│ ├─ Debt Ratio: 15%               │  ← positive
│ └─ Reputation: 85/100            │  ← positive
│                                  │
│ ✓ Strong financial position!     │  ← Alert (green)
│                                  │
└──────────────────────────────────┘
```

### 5. ActionsPanel Component
```
┌────────────────────────────────┐
│ Actions                        │
├────────────────────────────────┤
│                                │
│ [█ Advance Quarter [Space] █]  │  ← Primary button (bright green)
│                                │
│ [━ Buy Aircraft ━]             │  ← Secondary buttons
│ [━ Create Route ━]             │    (medium green)
│ [━ Route Manager ━]            │
│ [━ Buy Airport Slot ━]         │
│ [━ Take Loan ━]                │
│                                │
│ [━ New Game ━]                 │  ← Save/Load group
│ [━ Save Game ━]                │
│ [━ Load Game ━]  [?]           │  ← Help button
│                                │
│ Create routes to start         │  ← Help text
│ earning revenue!               │
│                                │
└────────────────────────────────┘
```

### 6. NewsPanel Component
```
┌────────────────────────────────┐
│ News                           │
├────────────────────────────────┤
│                                │
│ ◆ Q4 2025: Revenue report      │  ← News item (left border)
│   filed for review             │    (info blue border)
│                                │
│ ◆ United expand route...       │
│                                │
│ ◆ Your fleet maintenance...    │
│                                │
│ ◆ New aircraft model...        │
│                                │
│ ◆ Fuel price increase...       │
│                                │
│ (Auto-scrolls, newest at top)  │
│                                │
└────────────────────────────────┘

Empty State:
┌────────────────────────────────┐
│ News                           │
├────────────────────────────────┤
│          📰                    │
│     No News Yet                │
│  Start playing to receive      │
│ updates about your airline     │
└────────────────────────────────┘
```

### 7. Globe3D Component
```
┌─────────────────────────────────────────┐
│                                         │
│  ╔═══════════════════════════════════╗  │
│  ║  [3D ROTATING GLOBE]              ║  │  ← Three.js Canvas
│  ║  • Green dots = Your airports      ║  │
│  ║  • Orange dots = Competitors       ║  │
│  ║  • Gray dots = Available           ║  │
│  ║  • Green lines = Your routes       ║  │
│  ║  • Red lines = Unprofitable        ║  │
│  ║  [Orbit controls enabled]          ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │ Legend          [Hover: Tooltip]  │   │ ← Legend box (bottom-left)
│  │ ● Owned    ● Competitor          │   │
│  │ ● Available                       │   │
│  │ ─ Profitable  ─ Unprofitable     │   │
│  └──────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 8. Modal Examples

#### BuyAircraftModal
```
╔════════════════════════════════════════╗
║ Buy/Lease Aircraft            [X]      ║  ← Modal header + close
╠════════════════════════════════════════╣
║                                        ║
║ AIRCRAFT SELECTION:                   ║
║ ┌────────────────────────────────┐   ║
║ │ B787 Dreamliner               │   ║  ← Selectable items
║ │ Boeing 787-9 | Capacity: 242  │   ║
║ │ Range: 14,685km               │   ║
║ │ Price: $250M | Lease: $8M/Q   │   ║
║ └────────────────────────────────┘   ║
║                                        ║
║ ┌────────────────────────────────┐   ║
║ │ A350-900  [selected]           │   ║
║ │ Airbus A350-900                │   ║
║ │ Capacity: 315 | Range: 15,000  │   ║
║ └────────────────────────────────┘   ║
║                                        ║
║ DETAILS:                              ║
║ Category: Wide-body Twin-engine      ║
║ Capacity: 315 passengers             ║
║ Range: 15,000 km                     ║
║ Operating Cost: $45,000/flight       ║
║ Purchase Price: $300,000,000         ║
║ Lease Cost: $9,500,000/quarter       ║
║                                        ║
║ [━ BUY ($300M) ━] [━ LEASE ━] [X]   ║  ← Actions
║                                        ║
╚════════════════════════════════════════╝
```

#### SaveLoadModal
```
╔════════════════════════════════════════╗
║ Save Game                     [X]      ║
╠════════════════════════════════════════╣
║                                        ║
║ ┌────────────────────────────────┐   ║
║ │ Slot 1          [AUTOSAVE]     │   ║  ← Save slot (header)
║ │ MyAirline • Q2 2025            │   ║
║ │ Cash: $2,500,000               │   ║
║ │ Last saved: 2024-11-01 14:30   │   ║
║ └────────────────────────────────┘   ║
║                                        ║
║ ┌────────────────────────────────┐   ║
║ │ Slot 2  [selected]             │   ║  ← Selected slot
║ │ BigAirline Expansion • Q3 2025 │   ║
║ │ Cash: $5,000,000               │   ║
║ │ Last saved: 2024-10-31 10:15   │   ║
║ └────────────────────────────────┘   ║
║                                        ║
║ ┌────────────────────────────────┐   ║
║ │ Slot 3 (empty) • ────────────  │   ║  ← Empty slot (dashed)
║ └────────────────────────────────┘   ║
║                                        ║
║ [━ SAVE ━] [━ CANCEL ━]               ║
║                                        ║
╚════════════════════════════════════════╝
```

### 9. RouteManagerPanel (Advanced Table)
```
┌────────────────────────────────────────────────────────────┐
│ Route Manager                                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ Summary Dashboard:                                         │
│ ┌──────────┬──────────┬─────────────┬──────────┐         │
│ │ 12 Total │ 9 Profit │ 2 Loss      │ 1 Susp.  │         │
│ └──────────┴──────────┴─────────────┴──────────┘         │
│                                                            │
│ Filter: [All] [Profitable] [Unprofitable] [Suspended]    │
│ Sort: By Profit ▼  Selected: 2 routes  [Bulk Actions]    │
│                                                            │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ Status │ Route      │ Aircraft │ Distance │ Profit   │  │
│ ├─────────────────────────────────────────────────────┤  │
│ │   ●    │ JFK → LAX  │ B747     │ 3944 km  │ $50K    │  │  Highly Profitable
│ │   ●    │ LAX → HND  │ A350     │ 8800 km  │ $35K    │  │  (green indicator)
│ │   ▲    │ ORD → LHR  │ B777     │ 6360 km  │ $5K     │  │  Marginal
│ │   ◆    │ CDG → DXB  │ A380     │ 5200 km  │ -$15K   │  │  Unprofitable
│ │   ■    │ NRT → SFO  │ B787     │ 8280 km  │ $0      │  │  Suspended
│ │        │            │          │          │         │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Color Palette Reference

### Terminal Colors
```
Primary Green:        #00ff00 (bright, primary text/borders)
Secondary Green:      #00aa00 (normal text/borders)
Tertiary Green:       #006600 (dim text, secondary)
Black Background:     #000000 (main bg)

Warning/Caution:      #ffaa00 (orange, warnings)
Error/Danger:         #ff0000 (red, alerts/errors)
Info/Special:         #00aaff (cyan, info)

Used for:
Text highlight    → #00ff00
Links/Interactive → #00aa00  
Positive numbers  → #00ff00 or #7fff00
Negative numbers  → #ff0000 or #ff5500
Borders           → #00aa00
```

## Styling Classes Used

### Layout
- `.dashboard` - Main container
- `.dashboard-main` - 3-column grid
- `.left-panel`, `.center-panel`, `.right-panel` - Column containers
- `.panel` - Standard panel wrapper

### Typography
- `.panel h2` - Panel headers (bright green with glow)
- `.panel h3` - Section titles
- `.section-title` - Subsection headers
- `.positive`, `.negative`, `.warning` - Color classes

### Lists
- `.fleet-list`, `.routes-list`, `.news-list` - List containers
- `.fleet-item`, `.route-item`, `.news-item` - List items
- `.empty-state` - Empty state container
- `.empty-icon`, `.empty-title`, `.empty-hint` - Empty state parts

### Buttons
- `.btn-primary` - Main action (bright green)
- `.btn-secondary` - Secondary actions (medium green)
- `.btn-danger` - Destructive actions (red)
- `.btn-small` - Small action button
- `.btn-help` - Help button ("?")

### Modals
- `.modal-overlay` - Dark overlay
- `.modal-content` - Modal container
- `.modal-header` - Header with title + close
- `.modal-body` - Content area
- `.modal-large`, `.modal-fullscreen` - Size variants

### Financial
- `.financial-section` - Section container
- `.financial-grid`, `.financial-row` - Layout
- `.loan-item` - Loan display
- `.health-indicator` - Health metric
- `.alert`, `.alert-warning`, `.alert-danger`, `.alert-success` - Alerts

---

## Key Measurements

```
Spacing: 4px base unit (very compact)
Panel padding: 6px 8px (tight)
Item margin/padding: 4-6px
Font size: 13px-20px (compact)
Line height: 1.1-1.5 (tight to moderate)

Layout:
- Header height: ~40px
- Left panel width: 280px
- Right panel width: 280px
- Center panel: remaining width
- Total gaps: 4px between all elements
```

## Performance Notes

- Single monolithic CSS file (2,625 lines)
- Custom components (no third-party UI library)
- Minimal JavaScript for styling (all CSS)
- CRT effects use CSS animations and pseudo-elements
- Three.js handles 3D rendering independently

---

## Accessibility Observations

- Color-only coding without icons (potential issue)
- High contrast green-on-black (good readability)
- No visible focus states on interactive elements
- Text shadows can reduce readability at small sizes
- No semantic HTML structure analysis needed for basic nav

---

## Summary for Designers

The UI successfully achieves a **retro DOS aesthetic** with:
- Consistent green/black terminal color scheme
- CRT monitor effects (scanlines, vignette)
- Dense information layout
- Custom-built components with vanilla CSS

Main improvement opportunities:
1. **Visual indicators beyond text color** (icons, shapes, bars)
2. **Better information hierarchy** (improved spacing, sizing)
3. **Data visualization** (charts, graphs, sparklines)
4. **Modal/form improvements** (better item presentation)
5. **Responsive design** (works on mobile)
