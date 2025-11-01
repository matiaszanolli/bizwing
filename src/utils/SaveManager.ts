// Save/Load Manager for game persistence

import { GameState } from '../models/GameState';

export interface SaveMetadata {
    slotId: number;
    airlineName: string;
    quarter: number;
    year: number;
    cash: number;
    timestamp: number;
    version: string;
}

export interface SaveSlot {
    metadata: SaveMetadata;
    state: GameState;
}

const SAVE_PREFIX = 'bizwing_save_';
const AUTOSAVE_SLOT = 0;
const MAX_SLOTS = 5;
const SAVE_VERSION = '1.0';

export class SaveManager {
    /**
     * Save game state to a slot
     */
    static save(state: GameState, slotId: number = AUTOSAVE_SLOT): boolean {
        try {
            const saveData: SaveSlot = {
                metadata: {
                    slotId,
                    airlineName: state.airlineName,
                    quarter: state.quarter,
                    year: state.year,
                    cash: state.cash,
                    timestamp: Date.now(),
                    version: SAVE_VERSION
                },
                state: state
            };

            const key = `${SAVE_PREFIX}${slotId}`;
            localStorage.setItem(key, JSON.stringify(saveData));
            console.log(`[SaveManager] Saved to slot ${slotId}`);
            return true;
        } catch (error) {
            console.error('[SaveManager] Failed to save:', error);
            return false;
        }
    }

    /**
     * Load game state from a slot
     */
    static load(slotId: number): GameState | null {
        try {
            const key = `${SAVE_PREFIX}${slotId}`;
            const data = localStorage.getItem(key);

            if (!data) {
                console.log(`[SaveManager] No save found in slot ${slotId}`);
                return null;
            }

            const saveSlot: SaveSlot = JSON.parse(data);

            // Version check (for future migrations)
            if (saveSlot.metadata.version !== SAVE_VERSION) {
                console.warn(`[SaveManager] Save version mismatch: ${saveSlot.metadata.version} vs ${SAVE_VERSION}`);
                // In the future, add migration logic here
            }

            console.log(`[SaveManager] Loaded from slot ${slotId}`);
            return saveSlot.state;
        } catch (error) {
            console.error('[SaveManager] Failed to load:', error);
            return null;
        }
    }

    /**
     * Auto-save to slot 0
     */
    static autoSave(state: GameState): boolean {
        return this.save(state, AUTOSAVE_SLOT);
    }

    /**
     * Load auto-save from slot 0
     */
    static loadAutoSave(): GameState | null {
        return this.load(AUTOSAVE_SLOT);
    }

    /**
     * Get metadata for a save slot without loading the full state
     */
    static getSlotMetadata(slotId: number): SaveMetadata | null {
        try {
            const key = `${SAVE_PREFIX}${slotId}`;
            const data = localStorage.getItem(key);

            if (!data) return null;

            const saveSlot: SaveSlot = JSON.parse(data);
            return saveSlot.metadata;
        } catch (error) {
            console.error('[SaveManager] Failed to get metadata:', error);
            return null;
        }
    }

    /**
     * Get all save slot metadata
     */
    static getAllSaveMetadata(): (SaveMetadata | null)[] {
        const slots: (SaveMetadata | null)[] = [];
        for (let i = 0; i < MAX_SLOTS; i++) {
            slots.push(this.getSlotMetadata(i));
        }
        return slots;
    }

    /**
     * Delete a save slot
     */
    static deleteSave(slotId: number): boolean {
        try {
            const key = `${SAVE_PREFIX}${slotId}`;
            localStorage.removeItem(key);
            console.log(`[SaveManager] Deleted slot ${slotId}`);
            return true;
        } catch (error) {
            console.error('[SaveManager] Failed to delete:', error);
            return false;
        }
    }

    /**
     * Check if a slot has a save
     */
    static hasSlot(slotId: number): boolean {
        return this.getSlotMetadata(slotId) !== null;
    }

    /**
     * Get number of available save slots
     */
    static getMaxSlots(): number {
        return MAX_SLOTS;
    }

    /**
     * Check if auto-save exists
     */
    static hasAutoSave(): boolean {
        return this.hasSlot(AUTOSAVE_SLOT);
    }

    /**
     * Clear all saves (for testing/reset)
     */
    static clearAllSaves(): void {
        for (let i = 0; i < MAX_SLOTS; i++) {
            this.deleteSave(i);
        }
        console.log('[SaveManager] Cleared all saves');
    }
}
