// Utility helper functions

// Format money values
export function formatMoney(amount) {
    return Math.floor(amount).toLocaleString();
}

// Calculate distance between two points (airports)
export function calculateDistance(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.floor(Math.sqrt(dx * dx + dy * dy) * 10);
}

// Deep clone an object
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Generate unique ID
let idCounter = 0;
export function generateId() {
    return ++idCounter;
}

export function resetIdCounter() {
    idCounter = 0;
}

// Clamp value between min and max
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Linear interpolation
export function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Random integer between min and max (inclusive)
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random float between min and max
export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Pick random element from array
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Shuffle array (Fisher-Yates)
export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get quarter string (Q1, Q2, Q3, Q4)
export function getQuarterString(quarter) {
    return `Q${quarter}`;
}

// Get full date string
export function getDateString(quarter, year) {
    return `${getQuarterString(quarter)} ${year}`;
}

// Convert quarters to years
export function quartersToYears(quarters) {
    return Math.floor(quarters / 4);
}

// Calculate percentage change
export function percentageChange(oldValue, newValue) {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
}

// Format percentage
export function formatPercentage(value) {
    return `${Math.round(value)}%`;
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage helpers
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save to storage:', e);
        return false;
    }
}

export function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load from storage:', e);
        return null;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Failed to remove from storage:', e);
        return false;
    }
}
