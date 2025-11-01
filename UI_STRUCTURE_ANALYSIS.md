# BizWing UI Structure Analysis

## Overview
BizWing is a browser-based airline management simulation game built with React, Three.js, and TypeScript. The UI implements a **DOS/Terminal aesthetic** with green-on-black CRT monitor styling throughout.

---

## 1. MAIN DASHBOARD/LAYOUT COMPONENTS

### Architecture
- **Layout**: 3-column grid dashboard with header
  - **Header** (top): Game info, quarter, year, cash, reputation
  - **Left Panel** (280px): Fleet, Routes, Actions panels
  - **Center Panel** (flexible): 3D Globe visualization
  - **Right Panel** (280px): Financial Dashboard, News

### Structure
```
Dashboard
├── Header
│   └── Logo, Quarter/Year, Airline Name, Cash, Reputation
└── Main Grid (3 columns)
    ├── Left Panel (sidebar)
    │   ├── FleetPanel
    │   ├── RoutesPanel
    │   └── ActionsPanel
    ├── Center Panel
    │   └── Globe3D (Three.js component)
    └── Right Panel (sidebar)
        ├── FinancialPanel
        └── NewsPanel
```

---

## 2. ALL UI PANELS/VIEWS

### Dashboard Panels (Main)

#### **FleetPanel** (`FleetPanel.tsx`)
- **Purpose**: Display aircraft fleet and inventory
- **Features**:
  - Aircraft list with name, type, age, condition
  - Condition indicators (Excellent/Good/Fair/Poor/Critical) with colors
  - Maintenance/fuel efficiency multipliers based on age
  - Actions: Sell aircraft, Return leased aircraft
  - Empty state message with emoji
- **Status**: Plain, text-based list items
- **Issues**: 
  - Very minimal styling
  - No visual aircraft representations
  - Could use aircraft type icons/silhouettes

#### **RoutesPanel** (`RoutesPanel.tsx`)
- **Purpose**: Display active routes and profitability
- **Features**:
  - Route list showing: city pairs, profit/loss, frequency
  - Sort options: By profit, revenue, distance, or default
  - Profit status color coding (profitable/unprofitable/suspended)
  - Actions: Suspend/resume routes, delete routes
  - Empty state with emoji
- **Status**: Styled list with basic sorting dropdown
- **Issues**:
  - Limited visual hierarchy
  - No route profitability charts/graphs
  - Text-heavy display

#### **FinancialPanel** (`FinancialPanel.tsx`)
- **Purpose**: Financial overview and health metrics
- **Sections**:
  - Current Quarter Projection (revenue, costs, net profit)
  - Active Loans section with progress bars
  - Financial Health Indicators (cash position, runway, debt ratio, reputation)
  - Financial Alerts (warnings/danger states)
- **Features**:
  - Color-coded values (positive/negative/warning)
  - Progress bars for loan repayment
  - Automatic alerts for financial issues
- **Status**: Well-structured with good visual feedback
- **Issues**:
  - Could benefit from charts/visualizations
  - Dense text display
  - No sparklines or trend indicators

#### **NewsPanel** (`NewsPanel.tsx`)
- **Purpose**: Game event log and news feed
- **Features**:
  - Scrollable list of recent news items
  - Auto-reversed chronological order
  - Empty state message
- **Status**: Simple, minimal styling
- **Issues**:
  - Very plain text display
  - No categorization or color coding by news type
  - No timestamps visible

#### **ActionsPanel** (`ActionsPanel.tsx`)
- **Purpose**: Main game controls and action buttons
- **Buttons**:
  - Primary: "Advance Quarter [Space]"
  - Secondary: Buy Aircraft, Create Route, Route Manager, Buy Airport Slot, Take Loan
  - Save/Load: New Game, Save Game, Load Game
  - Help: "?" button for tutorials/help
- **Status**: Clean button layout
- **Issues**:
  - All buttons look the same (except primary)
  - No visual grouping beyond CSS
  - Could use icons for better recognition

#### **RouteManagerPanel** (`RouteManagerPanel.tsx`)
- **Purpose**: Advanced route management with analytics
- **Features**:
  - Summary dashboard with 4 stats (count, profitable, unprofitable, suspended)
  - Route table with sorting and filtering
  - Filter modes: All, Profitable, Unprofitable, Suspended
  - Bulk actions support
  - Sortable columns with visual indicators
- **Status**: Most sophisticated panel - table-based layout
- **Issues**:
  - Table can be hard to scan on small screens
  - Sort direction not always clear
  - Could use row highlighting for better readability

#### **Globe3D** (`Globe3D.tsx`)
- **Purpose**: Interactive 3D world map visualization
- **Features**:
  - Rotating 3D globe using Three.js
  - Airport markers (color-coded: owned/competitor/available)
  - Route arcs connecting airports
  - Orbit controls for manual rotation
  - Tooltip on hover showing airport details
  - Legend showing symbol meanings
- **Status**: **MOST POLISHED COMPONENT** - high quality 3D rendering
- **Issues**:
  - Uses canvas-based world map rendering
  - Could benefit from better terrain details
  - Tooltip styling is basic

---

## 3. CURRENT STYLING APPROACH

### CSS Architecture
- **Main File**: `/src/styles/globals.css` (2,625 lines)
- **Approach**: Single monolithic CSS file with comprehensive coverage
- **Framework**: No UI component library - all custom CSS
- **Preprocessor**: None - vanilla CSS with CSS variables

### Design Theme
```css
:root {
    --color-bg: #000000;           /* Pure black background */
    --color-text: #00aa00;         /* Medium green text */
    --color-text-bright: #00ff00;  /* Bright green (primary) */
    --color-dim: #006600;          /* Dark green (secondary) */
    --color-warning: #ffaa00;      /* Orange/yellow warnings */
    --color-error: #ff0000;        /* Red errors */
    --color-info: #00aaff;         /* Cyan info */
    --color-border: #00aa00;       /* Green borders */
}
```

### Typography
- **Font**: VT323 (vintage terminal font) from Google Fonts
- **Fallback**: 'Courier New', monospace
- **Sizes**: 12px-20px range (compact for dense UI)
- **Effects**: Text-shadow glow effects (#00ff00, #ff0000, etc.)

### Visual Effects
- **CRT Monitor Effect**: 
  - Animated scanlines via `::before` pseudo-element
  - Vignette glow via `::after` pseudo-element
  - Creates authentic retro computer feel
- **Glows & Shadows**: Text shadows, box shadows for neon effect
- **Borders**: 1px-3px solid borders with color coding

### Layout
- **Grid System**: CSS Grid for main 3-column layout
- **Gaps**: 4px spacing throughout (very compact)
- **Overflow**: Custom scrollbar styling with green color
- **Flexbox**: Used for component internal layouts

### Color Scheme Analysis

| Purpose | Color | Hex |
|---------|-------|-----|
| Text (normal) | Medium Green | #00aa00 |
| Text (bright/primary) | Neon Green | #00ff00 |
| Text (dim/secondary) | Dark Green | #006600 |
| Warnings | Orange | #ffaa00 |
| Errors/Danger | Red | #ff0000 |
| Info/Special | Cyan | #00aaff |
| Background | Black | #000000 |
| Borders | Green | #00aa00 |

### Sections of Styles
1. **Core** (lines 1-173): Basic layout, header, panels, scrollbars
2. **Typography** (lines 224-275): Color classes, empty states
3. **Lists** (lines 276-400): Fleet, routes, news items
4. **Buttons** (lines 401-472): Primary, secondary, danger buttons
5. **Forms** (lines 484-536): Dropdowns, inputs, range sliders
6. **Financial Panel** (lines 537-685): Financial displays, alerts, loans
7. **Modals** (lines 709-1009): Modal dialogs and overlay styles
8. **Advanced Features** (lines 1010+): Tutorials, help, airport filters
9. **3D Globe** (lines 2300-2440): Globe and map styling
10. **Airport Details** (lines 2441-2626): Airport modal styling

---

## 4. UI COMPONENT LIBRARY USAGE

### Current State
- **NO** external UI component library (Material UI, Chakra, etc.)
- **ALL** components are custom-built
- **Architecture**: Simple functional components with inline styling + CSS classes

### Component Pattern
```tsx
// Pattern: Functional component with className linking to CSS
export function FleetPanel() {
    return (
        <div className="panel fleet-panel">
            <h2>Fleet ({state.fleet.length})</h2>
            <div className="fleet-list">
                {/* items */}
            </div>
        </div>
    );
}
```

### Reusable Components Created
1. **Modal.tsx** - Base modal with overlay
2. **ConfirmModal.tsx** - Confirmation dialog
3. **ConfirmDialog.tsx** - Alert dialog
4. Various specialized modals (BuyAircraftModal, CreateRouteModal, etc.)

### No UI Library Dependencies
- React only (18.3.1)
- React-DOM (18.3.1)
- Three.js (0.160.1) for 3D
- @react-three/fiber (8.18.0) - Three.js React wrapper
- @react-three/drei (9.122.0) - Three.js utilities

---

## 5. CURRENT UI STATE & ISSUES

### What Looks Good
1. **Globe3D Component**: Professional 3D visualization with good texturing
2. **Color Scheme**: Consistent DOS aesthetic is thematic and readable
3. **Information Density**: Compact layout fits lots of data efficiently
4. **Keyboard Shortcuts**: Good UX (Space to advance, ESC to close)
5. **Responsive Modals**: Well-structured dialog system
6. **CRT Effects**: Authentic scanlines and vignette

### Visual Issues & Areas for Improvement

#### 1. **Inconsistent Styling Across Panels**
- Fleet panel: Simple list with no icons
- Routes panel: Basic list with minimal visual hierarchy
- Financial panel: Better structured but text-heavy
- News panel: Plain text log, hard to scan

#### 2. **Lack of Visual Hierarchy**
- All panels use similar styling
- No clear distinction between data types
- Buttons not clearly grouped (mixing primary/secondary)
- Headers could be more prominent

#### 3. **Poor Data Visualization**
- No charts or graphs for financial data
- No sparklines showing trends
- Profit/loss shown as raw text, not visual indicators
- No visual indicators for route profitability (just text color)

#### 4. **Empty States**
- While they have emoji icons, they're very basic
- Could be more visually interesting
- Inconsistent styling between panels

#### 5. **Modal Interfaces**
- Most modals have plain list layouts (aircraft, airports)
- Selection feedback is minimal (just border change)
- No visual preview or icons for items

#### 6. **Typography Issues**
- VT323 font is thematic but hard to read at small sizes
- Line height is tight (1.1) making dense text harder to read
- No font size variation for hierarchy

#### 7. **List Items**
- Aircraft, routes, news all use similar plain styling
- No icons or visual indicators beyond text color
- Hover states are subtle (just color change)
- No selection states for multi-select scenarios

#### 8. **Table (Route Manager)**
- Good structure but very text-heavy
- Hard to scan columns with current font
- Sort indicators not clearly visible
- Status colors work but could be more prominent

#### 9. **Action Buttons**
- Many buttons with unclear purpose
- No icons to aid recognition
- Button grouping could be clearer
- No loading/disabled state styling

#### 10. **Responsive Issues**
- Layout breaks on small screens
- Panels become unreadable
- No mobile consideration visible

---

## 6. COMPONENTS NEEDING MOST ATTENTION

### High Priority (Visual Impact)
1. **FleetPanel** - Needs aircraft icons/silhouettes, better spacing
2. **RoutesPanel** - Needs route visualization, profitability indicators
3. **NewsPanel** - Needs categorization, timestamps, better styling
4. **ActionsPanel** - Needs icon buttons, better grouping

### Medium Priority (Functionality)
1. **FinancialPanel** - Add simple charts (profit trend, expense breakdown)
2. **Modal Dialogs** - Improve aircraft/airport selection (add thumbnails/specs)
3. **RouteManagerPanel** - Better table rendering, sorting visualization

### Low Priority (Already Good)
1. **Globe3D** - Excellent, just needs minor polish
2. **Header** - Functional, could use minor styling tweaks

---

## 7. MODALS & DIALOGS

### Modal System
- Base `Modal.tsx` component with overlay
- Size options: normal, large, fullscreen
- Escape key and click-outside to close
- Standard header with title and close button

### Modal Types
1. **Game Setup**: NewGameSetupModal, FirstTimeTutorialModal
2. **Aircraft**: BuyAircraftModal, 
3. **Routes**: CreateRouteModal, RouteManagerModal
4. **Airports**: BuyAirportSlotModal, AirportDetailsModal
5. **Financial**: TakeLoanModal, EmergencyLoanModal, SaveLoadModal
6. **Game Flow**: PreQuarterReviewModal, PostQuarterResultsModal
7. **Help**: HelpModal, ConfirmDialog, ConfirmModal

### Modal Issues
- All use text-based selection (lists)
- No visual previews or icons
- Dense content without spacing
- Limited visual feedback on selection

---

## 8. ASSETS & STYLING FILES

### Assets Used
- `/src/assets/logo.png` - Game logo (hidden in compact layout)
- `/src/assets/icon.png` - Favicon

### CSS Files
- `/src/styles/globals.css` - Single monolithic stylesheet (2,625 lines)
- `/style.css` - Old vanilla HTML version (deprecated)

### No Design System
- No component library
- No design tokens beyond CSS variables
- No icon set
- No typography scale defined

---

## RECOMMENDATIONS FOR UI IMPROVEMENT

### Quick Wins
1. Add icons to buttons and list items
2. Improve modal selection displays with better visual feedback
3. Add chart/graph to financial panel (profit trend)
4. Better empty state graphics
5. Improve hover/active states with more visual feedback

### Medium Effort
1. Create unified card component for consistent styling
2. Add aircraft silhouette icons to fleet panel
3. Create route profitability visualizer (mini sparklines)
4. Improve modal content with better layout patterns
5. Add badges/tags for route status

### Larger Refactoring
1. Implement proper design system with components
2. Consider component library (Headless UI, Radix, etc.)
3. Add data visualization library (Chart.js, Recharts)
4. Create icon set or use icon font
5. Improve typography and spacing system

---

## Summary

BizWing has a **consistent DOS/retro aesthetic** that's thematic but **underutilizes visual design** to communicate information effectively. The Globe3D component demonstrates the game can handle sophisticated visuals, but most panels are text-heavy and lack visual hierarchy, data visualization, and intuitive visual feedback. The main opportunities for improvement are:

1. **Add visual indicators** beyond text color
2. **Implement data visualization** for financial/route metrics
3. **Improve information hierarchy** with better spacing and sizing
4. **Add icons** for better affordance
5. **Create consistent patterns** for common UI elements
6. **Better modal/form design** with visual previews
