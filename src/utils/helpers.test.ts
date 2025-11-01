// Helper Functions Tests
import { describe, it, expect } from 'vitest';
import { formatMoney, calculateDistance, clamp } from './helpers';

describe('Helper Functions', () => {
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
});
