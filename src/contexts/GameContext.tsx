// React Context for Game State

import React, { createContext, useContext, useState, useCallback, useReducer, useEffect } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { GameState } from '../models/GameState';
import { SaveManager } from '../utils/SaveManager';

interface GameContextType {
    engine: GameEngine;
    state: GameState;
    forceUpdate: () => void;
    saveGame: (slotId?: number) => boolean;
    loadGame: (slotId: number) => boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
    // Create engine instance once
    const [engine] = useState(() => {
        const e = new GameEngine();

        // Try to load auto-save first
        const autoSave = SaveManager.loadAutoSave();
        if (autoSave) {
            console.log('[GameProvider] Auto-save found, loading...');
            e.state = autoSave;
        } else {
            console.log('[GameProvider] No auto-save, initializing new game...');
            e.initialize();
        }

        return e;
    });

    // Force re-render mechanism
    const [, forceUpdateReducer] = useReducer(x => x + 1, 0);

    const forceUpdate = useCallback(() => {
        forceUpdateReducer();
    }, []);

    // Save game to slot
    const saveGame = useCallback((slotId: number = 0) => {
        const success = SaveManager.save(engine.state, slotId);
        if (success) {
            console.log(`[GameProvider] Game saved to slot ${slotId}`);
        }
        return success;
    }, [engine]);

    // Load game from slot
    const loadGame = useCallback((slotId: number) => {
        const loadedState = SaveManager.load(slotId);
        if (loadedState) {
            engine.state = loadedState;
            forceUpdate();
            console.log(`[GameProvider] Game loaded from slot ${slotId}`);
            return true;
        }
        return false;
    }, [engine, forceUpdate]);

    // Auto-save on state changes (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            SaveManager.autoSave(engine.state);
        }, 1000);
        return () => clearTimeout(timer);
    }, [engine.state.quarter]); // Only auto-save when quarter changes

    const value: GameContextType = {
        engine,
        state: engine.state,
        forceUpdate,
        saveGame,
        loadGame
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
