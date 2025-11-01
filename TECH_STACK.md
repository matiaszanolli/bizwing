# Technology Stack Decision

## Chosen Stack: React + Three.js

### Core Technologies

- **React 18** - UI framework
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Vite** - Build tool (fast, modern)
- **TypeScript** (optional but recommended)

### Why This Stack?

#### React Benefits
- ✅ Component-based architecture (perfect for complex UI)
- ✅ State management with hooks
- ✅ Huge ecosystem (charts, forms, tables)
- ✅ Easier to manage complex dashboards
- ✅ Better developer experience for larger codebase
- ✅ Hot module replacement (instant updates)

#### Three.js Benefits
- ✅ Beautiful 3D globe visualization
- ✅ Animated flight paths
- ✅ Day/night cycles
- ✅ Weather visualization
- ✅ Modern, impressive presentation
- ✅ Great for marketing/screenshots

#### @react-three/fiber Benefits
- ✅ Declarative Three.js (fits React model)
- ✅ Automatic cleanup
- ✅ Built-in animation loops
- ✅ Easy state synchronization

### Architecture

```
aerobiz/
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Root component
│   │
│   ├── components/              # React UI components
│   │   ├── Dashboard/
│   │   ├── RouteManager/
│   │   ├── FleetManager/
│   │   ├── BoardMeeting/
│   │   └── Globe/              # Three.js wrapper
│   │
│   ├── engine/                  # Game logic (keep current!)
│   │   ├── GameEngine.ts
│   │   ├── GameController.ts
│   │   └── GameState.ts
│   │
│   ├── data/                    # Game data (keep current!)
│   │   ├── aircraft.ts
│   │   ├── airports.ts
│   │   └── events.ts
│   │
│   ├── hooks/                   # React hooks
│   │   ├── useGame.ts          # Game state hook
│   │   ├── useRoutes.ts
│   │   └── useFleet.ts
│   │
│   ├── contexts/                # React context
│   │   └── GameContext.tsx     # Wrap GameEngine
│   │
│   └── styles/                  # CSS/styling
│       └── globals.css
│
├── public/                      # Static assets
│   ├── textures/               # Earth textures
│   └── models/                 # 3D aircraft models
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Migration Strategy

#### Phase 1: Setup (Week 1)
```bash
# Initialize npm project
npm init -y

# Install dependencies
npm install react react-dom
npm install three @react-three/fiber @react-three/drei
npm install vite @vitejs/plugin-react

# Dev dependencies
npm install -D typescript @types/react @types/react-dom @types/three
```

#### Phase 2: Keep Game Logic (Week 1)
- ✅ **Don't rewrite GameEngine** - just port to TypeScript
- ✅ Wrap in React Context
- ✅ Game logic stays pure, testable

```typescript
// src/contexts/GameContext.tsx
import { createContext, useContext, useState } from 'react';
import { GameEngine } from '../engine/GameEngine';

const GameContext = createContext<GameEngine | null>(null);

export function GameProvider({ children }) {
  const [engine] = useState(() => new GameEngine());

  return (
    <GameContext.Provider value={engine}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const engine = useContext(GameContext);
  if (!engine) throw new Error('useGame must be used within GameProvider');
  return engine;
}
```

#### Phase 3: Migrate UI Gradually (Week 2-3)
- Start with simple components (Header)
- Move to complex ones (Route Manager)
- Leave old vanilla code until React version works

#### Phase 4: Add 3D Globe (Week 4)
- Basic globe with texture
- Airport markers
- Route arcs
- Animations

### File Structure Details

#### Game Engine (Minimal Changes)
```typescript
// src/engine/GameEngine.ts
// Almost identical to current code, just TypeScript
export class GameEngine {
  state: GameState;

  constructor() {
    this.state = new GameState();
  }

  // All current methods stay the same
  buyAircraft(aircraft: AircraftType): boolean { ... }
  createRoute(...): Result { ... }
  advanceTurn(): TurnResult { ... }
}
```

#### React Components
```tsx
// src/components/Dashboard/Dashboard.tsx
import { useGame } from '../../hooks/useGame';
import { RouteList } from './RouteList';
import { FleetPanel } from './FleetPanel';

export function Dashboard() {
  const { state } = useGame();

  return (
    <div className="dashboard">
      <Header
        cash={state.cash}
        reputation={state.reputation}
        quarter={state.quarter}
        year={state.year}
      />
      <div className="panels">
        <RouteList routes={state.routes} />
        <FleetPanel fleet={state.fleet} />
      </div>
    </div>
  );
}
```

#### 3D Globe Component
```tsx
// src/components/Globe/Globe.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGame } from '../../hooks/useGame';

export function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const { state } = useGame();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
        />
      </mesh>

      {state.airports.map(airport => (
        <AirportMarker
          key={airport.id}
          airport={airport}
        />
      ))}

      {state.routes.map(route => (
        <RouteArc
          key={route.id}
          route={route}
        />
      ))}
    </group>
  );
}
```

### Configuration Files

#### package.json
```json
{
  "name": "aerobiz-supersonic",
  "version": "0.3.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Development Workflow

```bash
# Development (hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

### Benefits We Get

1. **TypeScript** - Catch bugs at compile time
2. **Hot Module Replacement** - Instant updates
3. **Tree Shaking** - Smaller bundle size
4. **Component Dev Tools** - React DevTools
5. **Testing** - Vitest for unit tests
6. **Linting** - ESLint for code quality

### Performance Considerations

- Lazy load 3D globe (code splitting)
- Memoize expensive calculations
- Use React.memo for static components
- Optimize Three.js renders

### Bundle Size Target

- Initial load: < 300KB gzipped
- 3D assets: Lazy loaded
- Total: < 1MB for full experience

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

(WebGL 2.0 required for Three.js)

### Next Steps

1. Create `package.json` and install dependencies
2. Port `GameEngine` to TypeScript (minimal changes)
3. Create basic React app structure
4. Wrap GameEngine in React Context
5. Migrate one component at a time
6. Add 3D globe when UI is stable

---

**Decision Date**: October 31, 2025
**Status**: Approved - Moving to React + Three.js
**Migration**: Gradual, keeping game logic intact
