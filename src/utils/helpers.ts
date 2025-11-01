// Utility helper functions

import { Airport } from '../data/airports';

// Format money values
export function formatMoney(amount: number): string {
    return Math.floor(amount).toLocaleString();
}

// Calculate distance between two points
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Deep clone an object
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// Generate unique ID
let idCounter = 0;
export function generateId(): number {
    return ++idCounter;
}

export function resetIdCounter(): void {
    idCounter = 0;
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

// Linear interpolation
export function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

// Random integer between min and max (inclusive)
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random float between min and max
export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Pick random element from array
export function randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

// Shuffle array (Fisher-Yates)
export function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get quarter string (Q1, Q2, Q3, Q4)
export function getQuarterString(quarter: number): string {
    return `Q${quarter}`;
}

// Get full date string
export function getDateString(quarter: number, year: number): string {
    return `${getQuarterString(quarter)} ${year}`;
}

// Convert quarters to years
export function quartersToYears(quarters: number): number {
    return Math.floor(quarters / 4);
}

// Calculate percentage change
export function percentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
}

// Format percentage
export function formatPercentage(value: number): string {
    return `${Math.round(value)}%`;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage helpers
export function saveToStorage(key: string, data: any): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save to storage:', e);
        return false;
    }
}

export function loadFromStorage<T>(key: string): T | null {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load from storage:', e);
        return null;
    }
}

export function removeFromStorage(key: string): boolean {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Failed to remove from storage:', e);
        return false;
    }
}
