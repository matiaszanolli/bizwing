// Helper Functions Tests
import { describe, it, expect, vi } from 'vitest';
import {
    formatMoney,
    calculateDistance,
    clamp,
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    shuffle,
    randomChoice,
    quartersToYears,
    getQuarterString,
    getDateString,
    percentageChange,
    formatPercentage,
    lerp,
    randomInt,
    randomFloat,
    debounce,
    deepClone,
    generateId,
    resetIdCounter
} from './helpers';

describe('Helper Functions', () => {
    describe('deepClone', () => {
        it('should create deep copy of object', () => {
            const original = { a: 1, b: { c: 2 } };
            const cloned = deepClone(original);

            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
            expect(cloned.b).not.toBe(original.b);
        });

        it('should handle arrays', () => {
            const original = [1, 2, [3, 4]];
            const cloned = deepClone(original);

            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
            expect(cloned[2]).not.toBe(original[2]);
        });

        it('should handle modifications independently', () => {
            const original = { a: 1, b: { c: 2 } };
            const cloned = deepClone(original);

            cloned.b.c = 999;

            expect(original.b.c).toBe(2);
            expect(cloned.b.c).toBe(999);
        });
    });

    describe('generateId and resetIdCounter', () => {
        it('should generate incrementing IDs', () => {
            resetIdCounter();

            const id1 = generateId();
            const id2 = generateId();
            const id3 = generateId();

            expect(id2).toBe(id1 + 1);
            expect(id3).toBe(id2 + 1);
        });

        it('should reset counter to 0', () => {
            generateId();
            generateId();
            resetIdCounter();

            const id = generateId();
            expect(id).toBe(1);
        });
    });

    describe('formatMoney', () => {
        it('should format small numbers correctly', () => {
            expect(formatMoney(1000)).toBe('1,000');
            expect(formatMoney(5000)).toBe('5,000');
        });

        it('should format millions correctly', () => {
            expect(formatMoney(1000000)).toBe('1,000,000');
            expect(formatMoney(50000000)).toBe('50,000,000');
        });

        it('should handle zero', () => {
            expect(formatMoney(0)).toBe('0');
        });

        it('should handle negative numbers', () => {
            expect(formatMoney(-1000)).toBe('-1,000');
            expect(formatMoney(-1000000)).toBe('-1,000,000');
        });

        it('should handle decimal values', () => {
            const result = formatMoney(1234.56);
            expect(result).toContain('1,234');
        });

        it('should handle very large numbers', () => {
            const result = formatMoney(1000000000);
            expect(result).toBe('1,000,000,000');
        });
    });

    describe('calculateDistance', () => {
        it('should calculate distance correctly for nearby points', () => {
            const distance = calculateDistance(0, 0, 3, 4);
            expect(distance).toBe(5); // Pythagorean theorem: 3² + 4² = 5²
        });

        it('should calculate distance correctly for same point', () => {
            const distance = calculateDistance(10, 10, 10, 10);
            expect(distance).toBe(0);
        });

        it('should handle negative coordinates', () => {
            const distance = calculateDistance(-3, -4, 0, 0);
            expect(distance).toBe(5);
        });

        it('should handle diagonal distances', () => {
            const distance = calculateDistance(0, 0, 10, 10);
            expect(distance).toBeCloseTo(14.14, 1);
        });

        it('should return positive values', () => {
            const distance1 = calculateDistance(0, 0, -5, -5);
            const distance2 = calculateDistance(-5, -5, 0, 0);
            expect(distance1).toBeGreaterThan(0);
            expect(distance2).toBeGreaterThan(0);
            expect(distance1).toBe(distance2);
        });
    });

    describe('clamp', () => {
        it('should clamp value above maximum', () => {
            expect(clamp(150, 0, 100)).toBe(100);
            expect(clamp(200, 50, 100)).toBe(100);
        });

        it('should clamp value below minimum', () => {
            expect(clamp(-50, 0, 100)).toBe(0);
            expect(clamp(10, 50, 100)).toBe(50);
        });

        it('should not modify value within range', () => {
            expect(clamp(50, 0, 100)).toBe(50);
            expect(clamp(75, 0, 100)).toBe(75);
            expect(clamp(0, 0, 100)).toBe(0);
            expect(clamp(100, 0, 100)).toBe(100);
        });

        it('should handle negative ranges', () => {
            expect(clamp(-50, -100, -10)).toBe(-50);
            expect(clamp(-150, -100, -10)).toBe(-100);
            expect(clamp(-5, -100, -10)).toBe(-10);
        });

        it('should handle floating point values', () => {
            expect(clamp(0.5, 0, 1)).toBe(0.5);
            expect(clamp(1.5, 0, 1)).toBe(1);
            expect(clamp(-0.5, 0, 1)).toBe(0);
        });

        it('should handle edge case where min equals max', () => {
            expect(clamp(50, 100, 100)).toBe(100);
            expect(clamp(150, 100, 100)).toBe(100);
        });
    });

    describe('Storage Helpers', () => {
        describe('saveToStorage', () => {
            it('should save data to localStorage', () => {
                const data = { test: 'value', number: 42 };
                const result = saveToStorage('testKey', data);

                expect(result).toBe(true);
                expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(data));
            });

            it('should return false on error', () => {
                vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
                    throw new Error('Storage error');
                });

                const result = saveToStorage('testKey', { test: 'data' });
                expect(result).toBe(false);
            });
        });

        describe('loadFromStorage', () => {
            it('should load and parse data from localStorage', () => {
                const data = { test: 'value', number: 42 };
                vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(data));

                const result = loadFromStorage('testKey');
                expect(result).toEqual(data);
            });

            it('should return null when key does not exist', () => {
                vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(null);

                const result = loadFromStorage('testKey');
                expect(result).toBeNull();
            });

            it('should return null on parse error', () => {
                vi.spyOn(localStorage, 'getItem').mockReturnValueOnce('invalid json');

                const result = loadFromStorage('testKey');
                expect(result).toBeNull();
            });
        });

        describe('removeFromStorage', () => {
            it('should remove item from localStorage', () => {
                const result = removeFromStorage('testKey');

                expect(result).toBe(true);
                expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
            });

            it('should return false on error', () => {
                vi.spyOn(localStorage, 'removeItem').mockImplementationOnce(() => {
                    throw new Error('Storage error');
                });

                const result = removeFromStorage('testKey');
                expect(result).toBe(false);
            });
        });
    });

    describe('Array Helpers', () => {
        describe('shuffle', () => {
            it('should return array of same length', () => {
                const arr = [1, 2, 3, 4, 5];
                const shuffled = shuffle(arr);

                expect(shuffled).toHaveLength(arr.length);
            });

            it('should contain all original elements', () => {
                const arr = [1, 2, 3, 4, 5];
                const shuffled = shuffle(arr);

                arr.forEach(item => {
                    expect(shuffled).toContain(item);
                });
            });

            it('should not modify original array', () => {
                const arr = [1, 2, 3, 4, 5];
                const original = [...arr];
                shuffle(arr);

                expect(arr).toEqual(original);
            });
        });

        describe('randomChoice', () => {
            it('should return an element from the array', () => {
                const arr = [1, 2, 3, 4, 5];
                const choice = randomChoice(arr);

                expect(arr).toContain(choice);
            });

            it('should work with single element array', () => {
                const arr = [42];
                const choice = randomChoice(arr);

                expect(choice).toBe(42);
            });
        });
    });

    describe('Math Helpers', () => {
        describe('lerp', () => {
            it('should interpolate between two numbers', () => {
                expect(lerp(0, 10, 0.5)).toBe(5);
                expect(lerp(0, 100, 0.25)).toBe(25);
            });

            it('should return start value at factor 0', () => {
                expect(lerp(10, 50, 0)).toBe(10);
            });

            it('should return end value at factor 1', () => {
                expect(lerp(10, 50, 1)).toBe(50);
            });

            it('should handle negative numbers', () => {
                expect(lerp(-10, 10, 0.5)).toBe(0);
                expect(lerp(-100, -50, 0.5)).toBe(-75);
            });

            it('should handle factors outside 0-1 range', () => {
                expect(lerp(0, 10, 1.5)).toBe(15); // Extrapolation
                expect(lerp(0, 10, -0.5)).toBe(-5);
            });
        });

        describe('randomInt', () => {
            it('should return integer within range', () => {
                for (let i = 0; i < 100; i++) {
                    const result = randomInt(1, 10);
                    expect(result).toBeGreaterThanOrEqual(1);
                    expect(result).toBeLessThanOrEqual(10);
                    expect(Number.isInteger(result)).toBe(true);
                }
            });

            it('should return same value when min equals max', () => {
                expect(randomInt(5, 5)).toBe(5);
            });

            it('should handle negative ranges', () => {
                for (let i = 0; i < 100; i++) {
                    const result = randomInt(-10, -5);
                    expect(result).toBeGreaterThanOrEqual(-10);
                    expect(result).toBeLessThanOrEqual(-5);
                }
            });
        });

        describe('randomFloat', () => {
            it('should return float within range', () => {
                for (let i = 0; i < 100; i++) {
                    const result = randomFloat(1.5, 10.5);
                    expect(result).toBeGreaterThanOrEqual(1.5);
                    expect(result).toBeLessThan(10.5);
                }
            });

            it('should return min when min equals max', () => {
                expect(randomFloat(5.5, 5.5)).toBe(5.5);
            });

            it('should handle negative ranges', () => {
                for (let i = 0; i < 100; i++) {
                    const result = randomFloat(-10.5, -5.5);
                    expect(result).toBeGreaterThanOrEqual(-10.5);
                    expect(result).toBeLessThan(-5.5);
                }
            });
        });
    });

    describe('Utility Functions', () => {
        describe('debounce', () => {
            it('should delay function execution', async () => {
                const mockFn = vi.fn();
                const debouncedFn = debounce(mockFn, 100);

                debouncedFn();
                expect(mockFn).not.toHaveBeenCalled();

                await new Promise(resolve => setTimeout(resolve, 150));
                expect(mockFn).toHaveBeenCalledTimes(1);
            });

            it('should cancel previous calls', async () => {
                const mockFn = vi.fn();
                const debouncedFn = debounce(mockFn, 100);

                debouncedFn();
                debouncedFn();
                debouncedFn();

                await new Promise(resolve => setTimeout(resolve, 150));
                expect(mockFn).toHaveBeenCalledTimes(1); // Only called once
            });

            it('should pass arguments correctly', async () => {
                const mockFn = vi.fn();
                const debouncedFn = debounce(mockFn, 100);

                debouncedFn('arg1', 'arg2', 42);

                await new Promise(resolve => setTimeout(resolve, 150));
                expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 42);
            });

            it('should use latest arguments when called multiple times', async () => {
                const mockFn = vi.fn();
                const debouncedFn = debounce(mockFn, 100);

                debouncedFn('first');
                debouncedFn('second');
                debouncedFn('third');

                await new Promise(resolve => setTimeout(resolve, 150));
                expect(mockFn).toHaveBeenCalledWith('third');
                expect(mockFn).toHaveBeenCalledTimes(1);
            });
        });

        describe('quartersToYears', () => {
            it('should convert quarters to years correctly', () => {
                expect(quartersToYears(4)).toBe(1);
                expect(quartersToYears(8)).toBe(2);
                expect(quartersToYears(0)).toBe(0);
                expect(quartersToYears(7)).toBe(1); // Floor division
            });
        });

        describe('getQuarterString', () => {
            it('should format quarter correctly', () => {
                expect(getQuarterString(1)).toBe('Q1');
                expect(getQuarterString(2)).toBe('Q2');
                expect(getQuarterString(3)).toBe('Q3');
                expect(getQuarterString(4)).toBe('Q4');
            });
        });

        describe('getDateString', () => {
            it('should format date correctly', () => {
                expect(getDateString(1, 1992)).toBe('Q1 1992');
                expect(getDateString(4, 2000)).toBe('Q4 2000');
            });
        });

        describe('percentageChange', () => {
            it('should calculate percentage increase', () => {
                expect(percentageChange(100, 150)).toBe(50);
                expect(percentageChange(50, 100)).toBe(100);
            });

            it('should calculate percentage decrease', () => {
                expect(percentageChange(100, 50)).toBe(-50);
                expect(percentageChange(200, 100)).toBe(-50);
            });

            it('should handle zero old value', () => {
                expect(percentageChange(0, 100)).toBe(100);
                expect(percentageChange(0, 0)).toBe(0);
            });
        });

        describe('formatPercentage', () => {
            it('should format percentage correctly', () => {
                expect(formatPercentage(50.5)).toBe('51%');
                expect(formatPercentage(25.2)).toBe('25%');
                expect(formatPercentage(-10.8)).toBe('-11%');
            });
        });
    });
});
