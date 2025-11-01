# React + Three.js Migration Plan

## Overview

Migrating from vanilla JS to React + Three.js while **preserving all game logic**.

## Migration Phases

### ✅ Phase 0: Setup (Complete)
- [x] Create `package.json`
- [x] Configure Vite
- [x] Configure TypeScript
- [x] Add `.gitignore`

### 📋 Phase 1: Install Dependencies (Next Step)

```bash
cd /mnt/data/src/aerobiz
npm install
```

This will install:
- React & React DOM
- Three.js
- @react-three/fiber & drei
- Vite
- TypeScript
- All dev dependencies

### 📋 Phase 2: Port Game Engine to TypeScript

**Goal**: Convert existing game logic with minimal changes.

#### Step 1: Create src/ directory structure
```bash
mkdir -p src/{components,engine,data,models,hooks,contexts,utils,styles}
```

#### Step 2: Port files to TypeScript

**Easy ports** (mostly renaming):
- `js/data/aircraft.js` → `src/data/aircraft.ts`
- `js/data/airports.js` → `src/data/airports.ts`
- `js/data/events.js` → `src/data/events.ts`
- `js/data/competitors.js` → `src/data/competitors.ts`
- `js/utils/config.js` → `src/utils/config.ts`
- `js/utils/helpers.js` → `src/utils/helpers.ts`

**Medium complexity** (add types):
- `js/models/GameState.js` → `src/models/GameState.ts`
- `js/engine/GameEngine.js` → `src/engine/GameEngine.ts`

**Complex** (refactor for React):
- `js/engine/GameController.js` → Will become React hooks
- `js/ui/renderer.js` → Will become React components
- `js/ui/modals.js` → Will become React components

### 📋 Phase 3: Create React Context for Game Engine

```tsx
// src/contexts/GameContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameEngine } from '../engine/GameEngine';

interface GameContextType {
  engine: GameEngine;
  state: GameState;
  dispatch: (action: GameAction) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [engine] = useState(() => {
    const e = new GameEngine();
    e.initialize();
    return e;
  });

  // Force re-render when game state changes
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const dispatch = useCallback((action: GameAction) => {
    // Handle actions...
    forceUpdate();
  }, []);

  return (
    <GameContext.Provider value={{ engine, state: engine.state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
```

### 📋 Phase 4: Create Core React Components

#### Priority 1: Layout & Header
```tsx
// src/components/Layout/Header.tsx
import { useGame } from '@/hooks/useGame';
import { formatMoney } from '@/utils/helpers';

export function Header() {
  const { state } = useGame();

  return (
    <header className="game-header">
      <h1>AEROBIZ SUPERSONIC</h1>
      <div className="game-info">
        <span>Q{state.quarter} {state.year}</span>
        <span>{state.playerAirline} | Rep: {state.reputation}/100</span>
        <span>Cash: ${formatMoney(state.cash)}</span>
      </div>
    </header>
  );
}
```

#### Priority 2: Main Dashboard
```tsx
// src/components/Dashboard/Dashboard.tsx
import { Header } from './Header';
import { FleetPanel } from './FleetPanel';
import { RoutePanel } from './RoutePanel';
import { Globe } from './Globe';

export function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-main">
        <aside className="left-panel">
          <FleetPanel />
          <RoutePanel />
        </aside>
        <section className="center-panel">
          <Globe />
        </section>
        <aside className="right-panel">
          {/* Competitors, News, etc. */}
        </aside>
      </main>
    </div>
  );
}
```

#### Priority 3: Globe Component
```tsx
// src/components/Globe/Globe.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Earth } from './Earth';
import { Airports } from './Airports';
import { Routes } from './Routes';

export function Globe() {
  return (
    <div className="globe-container">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <Earth />
        <Airports />
        <Routes />
        <OrbitControls enablePan={false} minDistance={8} maxDistance={25} />
      </Canvas>
    </div>
  );
}
```

### 📋 Phase 5: Implement Three.js Globe

```tsx
// src/components/Globe/Earth.tsx
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load textures (you'll need to download these)
  const earthTexture = useLoader(TextureLoader, '/textures/earth_day.jpg');
  const earthNormal = useLoader(TextureLoader, '/textures/earth_normal.jpg');
  const earthSpecular = useLoader(TextureLoader, '/textures/earth_specular.jpg');

  // Slow rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshPhongMaterial
        map={earthTexture}
        normalMap={earthNormal}
        specularMap={earthSpecular}
        shininess={10}
      />
    </mesh>
  );
}
```

### 📋 Phase 6: Airport Markers

```tsx
// src/components/Globe/Airports.tsx
import { useGame } from '@/hooks/useGame';
import { AirportMarker } from './AirportMarker';

export function Airports() {
  const { state } = useGame();

  return (
    <group>
      {state.airports.map(airport => (
        <AirportMarker
          key={airport.id}
          airport={airport}
        />
      ))}
    </group>
  );
}

// src/components/Globe/AirportMarker.tsx
import { Html } from '@react-three/drei';
import { latLonToVector3 } from '@/utils/geoHelpers';

interface Props {
  airport: Airport;
}

export function AirportMarker({ airport }: Props) {
  // Convert 2D map coordinates to 3D sphere coordinates
  const position = latLonToVector3(airport.lat, airport.lon, 5.1);

  const color = airport.owned ? '#ffff00' :
                airport.competitor_owned ? '#ff0000' :
                '#00ff00';

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="airport-label">{airport.id}</div>
      </Html>
    </group>
  );
}
```

### 📋 Phase 7: Route Arcs

```tsx
// src/components/Globe/RouteArc.tsx
import { useRef } from 'react';
import { Line } from '@react-three/drei';
import { latLonToVector3 } from '@/utils/geoHelpers';

interface Props {
  route: Route;
}

export function RouteArc({ route }: Props) {
  const from = findAirport(route.from);
  const to = findAirport(route.to);

  // Generate arc points
  const points = generateArcPoints(
    latLonToVector3(from.lat, from.lon, 5.1),
    latLonToVector3(to.lat, to.lon, 5.1),
    20 // number of segments
  );

  return (
    <Line
      points={points}
      color="#ff00ff"
      lineWidth={2}
      dashed
      dashScale={50}
      dashSize={2}
      gapSize={1}
    />
  );
}

function generateArcPoints(start: Vector3, end: Vector3, segments: number) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Interpolate along great circle
    const point = start.clone().lerp(end, t);
    // Push out slightly for arc effect
    point.normalize().multiplyScalar(5.1 + Math.sin(t * Math.PI) * 0.3);
    points.push(point);
  }
  return points;
}
```

### 📋 Phase 8: Update Entry Point

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameProvider } from './contexts/GameContext';
import { Dashboard } from './components/Dashboard/Dashboard';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <Dashboard />
    </GameProvider>
  </React.StrictMode>
);
```

```html
<!-- index.html (new React version) -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aerobiz Supersonic</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 📋 Phase 9: Style Migration

```css
/* src/styles/globals.css */
/* Copy existing style.css and adapt for React */

:root {
  --color-bg: #000080;
  --color-bg-panel: #000040;
  --color-primary: #00ff00;
  --color-accent: #ffff00;
  --color-text: #00ff00;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Courier New', monospace;
  background: var(--color-bg);
  color: var(--color-text);
  overflow: hidden;
}

/* ... rest of styles ... */
```

## File Mapping

| Old (Vanilla) | New (React) | Status |
|---------------|-------------|--------|
| `index.html` | `index.html` + `src/main.tsx` | To Do |
| `game.js` | *Deprecated* | Keep for reference |
| `js/main.js` | `src/main.tsx` | To Do |
| `js/data/*.js` | `src/data/*.ts` | To Do |
| `js/models/GameState.js` | `src/models/GameState.ts` | To Do |
| `js/engine/GameEngine.js` | `src/engine/GameEngine.ts` | To Do |
| `js/engine/GameController.js` | `src/hooks/*.ts` | To Do |
| `js/ui/renderer.js` | `src/components/**/*.tsx` | To Do |
| `js/ui/modals.js` | `src/components/**/*.tsx` | To Do |
| `js/utils/*.js` | `src/utils/*.ts` | To Do |
| `style.css` | `src/styles/globals.css` | To Do |

## Testing Strategy

1. **Keep old version running**
   - Don't delete vanilla JS files
   - Test React version alongside

2. **Component-by-component testing**
   - Port one component
   - Test it works
   - Move to next

3. **Feature parity checklist**
   - [ ] Can advance quarters
   - [ ] Can buy/lease aircraft
   - [ ] Can create routes
   - [ ] Can take loans
   - [ ] Can set advertising
   - [ ] Events trigger correctly
   - [ ] Save/load works

## Timeline

- **Week 1**: Setup, install, port data files
- **Week 2**: Port game engine, create context
- **Week 3**: Build React UI components
- **Week 4**: Implement Three.js globe
- **Week 5**: Polish, test, debug

## Success Criteria

✅ All features from v0.2 work
✅ No bugs introduced
✅ Performance is good (60fps on globe)
✅ Bundle size < 1MB gzipped
✅ Dev experience improved (HMR, TypeScript)

## Rollback Plan

If migration fails:
1. Keep old `index.html` and `game.js`
2. Can revert anytime
3. No pressure!

---

**Ready to start?** Run `npm install` in the aerobiz directory!
