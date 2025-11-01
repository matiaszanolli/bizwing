// React Context for Game State

import React, { createContext, useContext, useState, useCallback, useReducer } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { GameState } from '../models/GameState';

interface GameContextType {
    engine: GameEngine;
    state: GameState;
    forceUpdate: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
    // Create engine instance once
    const [engine] = useState(() => {
        const e = new GameEngine();
        e.initialize();
        return e;
    });

    // Force re-render mechanism
    const [, forceUpdateReducer] = useReducer(x => x + 1, 0);

    const forceUpdate = useCallback(() => {
        forceUpdateReducer();
    }, []);

    const value: GameContextType = {
        engine,
        state: engine.state,
        forceUpdate
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

// Custom hook to use game context
export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within GameProvider');
    }
    return context;
}
