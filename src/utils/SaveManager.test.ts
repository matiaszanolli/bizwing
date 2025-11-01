// SaveManager Tests
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SaveManager, SaveMetadata, SaveSlot } from './SaveManager';
import { GameState } from '../models/GameState';

describe('SaveManager', () => {
    let testState: GameState;

    beforeEach(() => {
        // Clear all saves before each test
        localStorage.clear();

        // Create a test game state
        testState = new GameState();
        testState.airlineName = 'Test Airlines';
        testState.quarter = 2;
        testState.year = 1995;
        testState.cash = 5000000;
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('save', () => {
        it('should save game state to default slot (0)', () => {
            const result = SaveManager.save(testState);

            expect(result).toBe(true);
            expect(localStorage.setItem).toHaveBeenCalled();

            const savedData = localStorage.getItem('bizwing_save_0');
            expect(savedData).not.toBeNull();

            const saveSlot: SaveSlot = JSON.parse(savedData!);
            expect(saveSlot.metadata.airlineName).toBe('Test Airlines');
            expect(saveSlot.metadata.quarter).toBe(2);
            expect(saveSlot.metadata.year).toBe(1995);
            expect(saveSlot.metadata.cash).toBe(5000000);
            expect(saveSlot.metadata.slotId).toBe(0);
            expect(saveSlot.metadata.version).toBe('1.0');
        });

        it('should save game state to specific slot', () => {
            const result = SaveManager.save(testState, 3);

            expect(result).toBe(true);

            const savedData = localStorage.getItem('bizwing_save_3');
            expect(savedData).not.toBeNull();

            const saveSlot: SaveSlot = JSON.parse(savedData!);
            expect(saveSlot.metadata.slotId).toBe(3);
        });

        it('should include timestamp in metadata', () => {
            const beforeSave = Date.now();
            SaveManager.save(testState);
            const afterSave = Date.now();

            const savedData = localStorage.getItem('bizwing_save_0');
            const saveSlot: SaveSlot = JSON.parse(savedData!);

            expect(saveSlot.metadata.timestamp).toBeGreaterThanOrEqual(beforeSave);
            expect(saveSlot.metadata.timestamp).toBeLessThanOrEqual(afterSave);
        });

        it('should return false on storage error', () => {
            vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
                throw new Error('Storage quota exceeded');
            });

            const result = SaveManager.save(testState);
            expect(result).toBe(false);
        });

        it('should overwrite existing save in same slot', () => {
            SaveManager.save(testState, 1);

            testState.cash = 10000000;
            SaveManager.save(testState, 1);

            const savedData = localStorage.getItem('bizwing_save_1');
            const saveSlot: SaveSlot = JSON.parse(savedData!);
            expect(saveSlot.metadata.cash).toBe(10000000);
        });
    });

    describe('load', () => {
        beforeEach(() => {
            SaveManager.save(testState, 1);
        });

        it('should load game state from slot', () => {
            const loadedState = SaveManager.load(1);

            expect(loadedState).not.toBeNull();
            expect(loadedState!.airlineName).toBe('Test Airlines');
            expect(loadedState!.quarter).toBe(2);
            expect(loadedState!.year).toBe(1995);
            expect(loadedState!.cash).toBe(5000000);
        });

        it('should return null when slot is empty', () => {
            const loadedState = SaveManager.load(2);
            expect(loadedState).toBeNull();
        });

        it('should return null on parse error', () => {
            localStorage.setItem('bizwing_save_3', 'invalid json');

            const loadedState = SaveManager.load(3);
            expect(loadedState).toBeNull();
        });

        it('should return GameState instance with methods', () => {
            const loadedState = SaveManager.load(1);

            expect(loadedState).toBeInstanceOf(GameState);
            expect(typeof loadedState!.canAfford).toBe('function');
            expect(typeof loadedState!.addNews).toBe('function');
        });

        it('should handle version mismatch gracefully', () => {
            // Create save with different version
            const saveData: SaveSlot = {
                metadata: {
                    slotId: 2,
                    airlineName: 'Old Airlines',
                    quarter: 1,
                    year: 1992,
                    cash: 1000000,
                    timestamp: Date.now(),
                    version: '0.9'
                },
                state: testState
            };
            localStorage.setItem('bizwing_save_2', JSON.stringify(saveData));

            const loadedState = SaveManager.load(2);

            // Should still load but with warning
            expect(loadedState).not.toBeNull();
            expect(loadedState!.airlineName).toBe('Test Airlines');
        });
    });

    describe('autoSave', () => {
        it('should save to slot 0', () => {
            const result = SaveManager.autoSave(testState);

            expect(result).toBe(true);
            expect(localStorage.getItem('bizwing_save_0')).not.toBeNull();
        });

        it('should return false on error', () => {
            vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
                throw new Error('Storage error');
            });

            const result = SaveManager.autoSave(testState);
            expect(result).toBe(false);
        });
    });

    describe('loadAutoSave', () => {
        it('should load from slot 0', () => {
            SaveManager.autoSave(testState);
            const loadedState = SaveManager.loadAutoSave();

            expect(loadedState).not.toBeNull();
            expect(loadedState!.airlineName).toBe('Test Airlines');
        });

        it('should return null when no auto-save exists', () => {
            const loadedState = SaveManager.loadAutoSave();
            expect(loadedState).toBeNull();
        });
    });

    describe('getSlotMetadata', () => {
        beforeEach(() => {
            SaveManager.save(testState, 1);
        });

        it('should return metadata without loading full state', () => {
            const metadata = SaveManager.getSlotMetadata(1);

            expect(metadata).not.toBeNull();
            expect(metadata!.airlineName).toBe('Test Airlines');
            expect(metadata!.quarter).toBe(2);
            expect(metadata!.year).toBe(1995);
            expect(metadata!.cash).toBe(5000000);
            expect(metadata!.slotId).toBe(1);
        });

        it('should return null when slot is empty', () => {
            const metadata = SaveManager.getSlotMetadata(2);
            expect(metadata).toBeNull();
        });

        it('should return null on parse error', () => {
            localStorage.setItem('bizwing_save_3', 'invalid json');

            const metadata = SaveManager.getSlotMetadata(3);
            expect(metadata).toBeNull();
        });
    });

    describe('getAllSaveMetadata', () => {
        it('should return array of 5 slots', () => {
            const allMetadata = SaveManager.getAllSaveMetadata();
            expect(allMetadata).toHaveLength(5);
        });

        it('should return null for empty slots', () => {
            const allMetadata = SaveManager.getAllSaveMetadata();

            allMetadata.forEach(metadata => {
                expect(metadata).toBeNull();
            });
        });

        it('should return metadata for filled slots', () => {
            SaveManager.save(testState, 0);
            SaveManager.save(testState, 2);
            SaveManager.save(testState, 4);

            const allMetadata = SaveManager.getAllSaveMetadata();

            expect(allMetadata[0]).not.toBeNull();
            expect(allMetadata[1]).toBeNull();
            expect(allMetadata[2]).not.toBeNull();
            expect(allMetadata[3]).toBeNull();
            expect(allMetadata[4]).not.toBeNull();
        });

        it('should return metadata with correct slot IDs', () => {
            SaveManager.save(testState, 1);
            SaveManager.save(testState, 3);

            const allMetadata = SaveManager.getAllSaveMetadata();

            expect(allMetadata[1]!.slotId).toBe(1);
            expect(allMetadata[3]!.slotId).toBe(3);
        });
    });

    describe('deleteSave', () => {
        beforeEach(() => {
            SaveManager.save(testState, 1);
        });

        it('should delete save from slot', () => {
            const result = SaveManager.deleteSave(1);

            expect(result).toBe(true);
            expect(localStorage.removeItem).toHaveBeenCalledWith('bizwing_save_1');
            expect(localStorage.getItem('bizwing_save_1')).toBeNull();
        });

        it('should return true even when slot is already empty', () => {
            const result = SaveManager.deleteSave(2);
            expect(result).toBe(true);
        });

        it('should return false on error', () => {
            vi.spyOn(localStorage, 'removeItem').mockImplementationOnce(() => {
                throw new Error('Storage error');
            });

            const result = SaveManager.deleteSave(1);
            expect(result).toBe(false);
        });
    });

    describe('hasSlot', () => {
        it('should return true when slot has save', () => {
            SaveManager.save(testState, 1);
            expect(SaveManager.hasSlot(1)).toBe(true);
        });

        it('should return false when slot is empty', () => {
            expect(SaveManager.hasSlot(2)).toBe(false);
        });
    });

    describe('getMaxSlots', () => {
        it('should return 5', () => {
            expect(SaveManager.getMaxSlots()).toBe(5);
        });
    });

    describe('hasAutoSave', () => {
        it('should return true when auto-save exists', () => {
            SaveManager.autoSave(testState);
            expect(SaveManager.hasAutoSave()).toBe(true);
        });

        it('should return false when auto-save does not exist', () => {
            expect(SaveManager.hasAutoSave()).toBe(false);
        });
    });

    describe('clearAutoSave', () => {
        it('should delete auto-save slot', () => {
            SaveManager.autoSave(testState);
            const result = SaveManager.clearAutoSave();

            expect(result).toBe(true);
            expect(SaveManager.hasAutoSave()).toBe(false);
        });

        it('should return true even when no auto-save exists', () => {
            const result = SaveManager.clearAutoSave();
            expect(result).toBe(true);
        });
    });

    describe('clearAllSaves', () => {
        it('should delete all save slots', () => {
            SaveManager.save(testState, 0);
            SaveManager.save(testState, 1);
            SaveManager.save(testState, 2);
            SaveManager.save(testState, 3);
            SaveManager.save(testState, 4);

            SaveManager.clearAllSaves();

            for (let i = 0; i < 5; i++) {
                expect(SaveManager.hasSlot(i)).toBe(false);
            }
        });

        it('should work when no saves exist', () => {
            expect(() => SaveManager.clearAllSaves()).not.toThrow();
        });
    });

    describe('Integration Tests', () => {
        it('should handle save-load-delete cycle', () => {
            // Save
            const saveResult = SaveManager.save(testState, 2);
            expect(saveResult).toBe(true);

            // Load
            const loadedState = SaveManager.load(2);
            expect(loadedState).not.toBeNull();
            expect(loadedState!.airlineName).toBe('Test Airlines');

            // Delete
            const deleteResult = SaveManager.deleteSave(2);
            expect(deleteResult).toBe(true);

            // Verify deletion
            const loadAfterDelete = SaveManager.load(2);
            expect(loadAfterDelete).toBeNull();
        });

        it('should handle multiple saves in different slots', () => {
            const state1 = new GameState();
            state1.airlineName = 'Airline 1';
            state1.cash = 1000000;

            const state2 = new GameState();
            state2.airlineName = 'Airline 2';
            state2.cash = 2000000;

            const state3 = new GameState();
            state3.airlineName = 'Airline 3';
            state3.cash = 3000000;

            SaveManager.save(state1, 1);
            SaveManager.save(state2, 2);
            SaveManager.save(state3, 3);

            const loaded1 = SaveManager.load(1);
            const loaded2 = SaveManager.load(2);
            const loaded3 = SaveManager.load(3);

            expect(loaded1!.airlineName).toBe('Airline 1');
            expect(loaded2!.airlineName).toBe('Airline 2');
            expect(loaded3!.airlineName).toBe('Airline 3');

            expect(loaded1!.cash).toBe(1000000);
            expect(loaded2!.cash).toBe(2000000);
            expect(loaded3!.cash).toBe(3000000);
        });

        it('should preserve game state properties', () => {
            testState.fleet = [
                { id: 1, type: { name: 'Test Plane' } as any, name: 'Test 1', assigned_route: null, owned: true, age: 0 }
            ];
            testState.routes = [
                { id: 1, from: {} as any, to: {} as any, aircraft: null, distance: 100, flights_per_quarter: 4, price: 1000, cargo_price: 500 }
            ];
            testState.loans = [
                { id: 1, amount: 100000, remaining: 50000, interest: 5, quarters_remaining: 10 }
            ];

            SaveManager.save(testState, 1);
            const loaded = SaveManager.load(1);

            expect(loaded!.fleet).toHaveLength(1);
            expect(loaded!.routes).toHaveLength(1);
            expect(loaded!.loans).toHaveLength(1);
            expect(loaded!.fleet[0].name).toBe('Test 1');
            expect(loaded!.routes[0].distance).toBe(100);
            expect(loaded!.loans[0].amount).toBe(100000);
        });
    });
});
