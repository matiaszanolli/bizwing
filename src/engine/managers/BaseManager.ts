// Base manager class for all game subsystems

import { GameState } from '../../models/GameState';

/**
 * Base class for all game managers
 * Provides access to game state
 */
export abstract class BaseManager {
    protected state: GameState;

    constructor(state: GameState) {
        this.state = state;
    }

    /**
     * Update the state reference (useful when loading a saved game)
     */
    updateState(state: GameState): void {
        this.state = state;
    }
}
