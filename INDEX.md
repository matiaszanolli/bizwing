# Aerobiz Supersonic - Project Index

## 🎮 For Players

- **[README.md](README.md)** - Start here! Game features, how to play, strategy tips
- **[index.html](index.html)** - Open this file to play the game

## 👨‍💻 For Developers

### Getting Started
1. **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to add features and contribute
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and technical details
3. **[docs/architecture-diagram.txt](docs/architecture-diagram.txt)** - Visual architecture overview

### Understanding the Code
- **[MIGRATION.md](MIGRATION.md)** - Old vs new code structure
- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** - Why we refactored

### Planning
- **[ROADMAP.md](ROADMAP.md)** - Future features and release plan

## 📁 Project Structure

```
aerobiz/
├── 📄 Documentation
│   ├── README.md              # Player guide
│   ├── ARCHITECTURE.md        # System design
│   ├── CONTRIBUTING.md        # Developer guide
│   ├── MIGRATION.md           # Code mapping
│   ├── ROADMAP.md            # Future plans
│   ├── REFACTORING_SUMMARY.md # Refactoring notes
│   └── INDEX.md              # This file
│
├── 🎨 Frontend
│   ├── index.html            # Main HTML
│   └── style.css             # Retro terminal styles
│
├── 💾 Legacy
│   └── game.js               # Old monolithic code (deprecated)
│
└── 🎯 Application (js/)
    ├── main.js               # Entry point
    │
    ├── 📊 data/              # Static game content
    │   ├── aircraft.js       # 14 aircraft types
    │   ├── airports.js       # 31 airports
    │   ├── competitors.js    # AI airline profiles
    │   └── events.js         # Random events
    │
    ├── 📦 models/            # Data structures
    │   └── GameState.js      # Central game state
    │
    ├── ⚙️ engine/            # Game logic
    │   ├── GameEngine.js     # Core mechanics
    │   └── GameController.js # Event coordination
    │
    ├── 🖥️ ui/                # User interface
    │   ├── renderer.js       # DOM rendering
    │   └── modals.js         # Popup dialogs
    │
    └── 🔧 utils/             # Utilities
        ├── config.js         # Game constants
        └── helpers.js        # Helper functions
```

## 🚀 Quick Links

### Play the Game
- Open [index.html](index.html) in a browser
- Requires modern browser (Chrome 61+, Firefox 60+, Safari 11+)
- No installation needed!

### Common Tasks

#### Add a New Aircraft
Edit: `js/data/aircraft.js`
```javascript
{ name: 'New Plane', capacity: 200, range: 5000, ... }
```

#### Add a New Airport
Edit: `js/data/airports.js`
```javascript
{ id: 'CODE', name: 'City', x: 400, y: 200, ... }
```

#### Modify Game Balance
Edit: `js/utils/config.js`
```javascript
STARTING_CASH: 75000000  // Make easier
```

#### Add Random Event
Edit: `js/data/events.js`
```javascript
{ type: 'event', name: 'Event', description: '...', ... }
```

## 📚 Documentation Map

| Document | Purpose | Audience |
|----------|---------|----------|
| **README** | How to play, features, tips | Players |
| **ARCHITECTURE** | System design, patterns | Developers |
| **CONTRIBUTING** | How to add features | Contributors |
| **MIGRATION** | Old→New code mapping | Maintainers |
| **ROADMAP** | Future plans, milestones | Everyone |
| **REFACTORING** | Why we restructured | Technical readers |
| **INDEX** | Navigation (this file) | Everyone |

## 🎯 By Role

### I'm a **Player**
1. Read [README.md](README.md) for features and tips
2. Open [index.html](index.html) to play
3. Check [ROADMAP.md](ROADMAP.md) for upcoming features

### I'm a **Developer**
1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for workflow
2. Read [ARCHITECTURE.md](ARCHITECTURE.md) for design
3. Browse code in `js/` folder
4. Check [ROADMAP.md](ROADMAP.md) for what to build

### I'm a **Designer**
1. Edit `js/data/*` files for content
2. Modify `style.css` for appearance
3. No coding required!

### I'm a **Project Manager**
1. Review [ROADMAP.md](ROADMAP.md) for timeline
2. Check [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md) for metrics
3. See [ARCHITECTURE.md](ARCHITECTURE.md) for technical constraints

## 🔍 Finding Specific Information

### Game Features
- Aircraft types: `js/data/aircraft.js`
- Airport list: `js/data/airports.js`
- Events: `js/data/events.js`
- Game rules: `js/utils/config.js`

### Technical Details
- State management: `js/models/GameState.js`
- Calculations: `js/engine/GameEngine.js`
- UI rendering: `js/ui/renderer.js`
- Event handling: `js/engine/GameController.js`

### How-To Guides
- Add features: [CONTRIBUTING.md](CONTRIBUTING.md)
- Understand architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- Map old→new code: [MIGRATION.md](MIGRATION.md)

## 📈 Project Status

**Version:** v0.2.0 - "Modular Foundation"
**Status:** Active development
**Next Release:** v0.3 - "Polish & Playability" (2 weeks)

### Completed ✅
- Core gameplay
- Modular architecture
- Comprehensive documentation
- 31 airports, 14 aircraft
- AI competitors
- Events system
- Loans & leasing

### In Progress 🚧
- Save/load system (scaffolded)
- Tutorial system (planned)
- Quality of life improvements (planned)

### Planned 📋
See [ROADMAP.md](ROADMAP.md) for full timeline

## 🤝 Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Pick a task from [ROADMAP.md](ROADMAP.md)
3. Make changes following the guide
4. Submit pull request

## 📞 Contact & Community

- **Issues:** GitHub Issues (bug reports)
- **Discussions:** GitHub Discussions (ideas)
- **Future:** Discord server (real-time chat)

## 🧭 Navigation Tips

### By File Type
- **Markdown (`.md`)** - Documentation, reading
- **JavaScript (`.js`)** - Code, logic
- **HTML** - Structure, layout
- **CSS** - Styling, appearance

### By Complexity
- **Beginner:** Start with `js/data/*` files
- **Intermediate:** Explore `js/models/*` and `js/ui/*`
- **Advanced:** Dive into `js/engine/*`

### By Interest
- **Game Design:** Focus on `js/data/*` and `config.js`
- **UI/UX:** Focus on `js/ui/*` and `style.css`
- **Business Logic:** Focus on `js/engine/*`
- **Architecture:** Read all `.md` files

## 🏗️ Development Setup

1. **Clone repository**
   ```bash
   git clone <repo-url>
   cd aerobiz
   ```

2. **Start local server**
   ```bash
   # Python 3
   python -m http.server 8000

   # OR Node.js
   npx http-server

   # OR VS Code Live Server extension
   ```

3. **Open browser**
   ```
   http://localhost:8000
   ```

4. **Open DevTools**
   - Access `window.game` to inspect state
   - Check console for errors

## 🎓 Learning Path

### Level 1: Understanding
1. Play the game ([index.html](index.html))
2. Read player guide ([README.md](README.md))
3. Browse airport/aircraft data (`js/data/*`)

### Level 2: Contributing
1. Read contributor guide ([CONTRIBUTING.md](CONTRIBUTING.md))
2. Understand architecture ([ARCHITECTURE.md](ARCHITECTURE.md))
3. Make simple changes (add aircraft/airport)

### Level 3: Mastery
1. Study refactoring notes ([REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md))
2. Review full codebase (`js/*`)
3. Implement complex features (see [ROADMAP.md](ROADMAP.md))

## 📊 Project Metrics

- **Lines of Code:** ~1,650
- **Modules:** 11
- **Documentation:** 6 files
- **Aircraft Types:** 14
- **Airports:** 31
- **Event Types:** 10
- **Test Coverage:** 0% (target: 80%)

## 🎉 Credits

**Original Game:** KOEI - Aerobiz Supersonic (1994)
**This Project:** Open source tribute/remake
**Built With:** Vanilla JavaScript, ES6 Modules, SVG, LocalStorage

---

**Last Updated:** October 31, 2025
**Maintained By:** Community contributors
**License:** See LICENSE file

---

> **TIP:** Bookmark this page as your starting point for navigating the project!
