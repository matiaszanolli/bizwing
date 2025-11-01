// Airport database

export type Region = 'North America' | 'Europe' | 'Asia' | 'Middle East' | 'Africa' | 'Oceania' | 'South America';

export interface Airport {
    id: string;
    name: string;
    x: number;
    y: number;
    region: Region;
    owned: boolean;
    market_size: number;
    slots_available: number;
    competitor_owned?: string; // Name of competitor who owns it
}

export const airports: Airport[] = [
    // North America
    { id: 'JFK', name: 'New York', x: 200, y: 150, region: 'North America', owned: true, market_size: 1000000, slots_available: 20 },
    { id: 'LAX', name: 'Los Angeles', x: 120, y: 170, region: 'North America', owned: false, market_size: 900000, slots_available: 18 },
    { id: 'ORD', name: 'Chicago', x: 180, y: 140, region: 'North America', owned: false, market_size: 850000, slots_available: 20 },
    { id: 'DFW', name: 'Dallas', x: 160, y: 180, region: 'North America', owned: false, market_size: 700000, slots_available: 16 },
    { id: 'YYZ', name: 'Toronto', x: 190, y: 130, region: 'North America', owned: false, market_size: 600000, slots_available: 14 },
    { id: 'MEX', name: 'Mexico City', x: 150, y: 200, region: 'North America', owned: false, market_size: 750000, slots_available: 15 },

    // Europe
    { id: 'LHR', name: 'London', x: 400, y: 120, region: 'Europe', owned: false, market_size: 1100000, slots_available: 15 },
    { id: 'CDG', name: 'Paris', x: 420, y: 130, region: 'Europe', owned: false, market_size: 850000, slots_available: 16 },
    { id: 'FRA', name: 'Frankfurt', x: 430, y: 125, region: 'Europe', owned: false, market_size: 800000, slots_available: 18 },
    { id: 'AMS', name: 'Amsterdam', x: 415, y: 118, region: 'Europe', owned: false, market_size: 700000, slots_available: 14 },
    { id: 'MAD', name: 'Madrid', x: 395, y: 145, region: 'Europe', owned: false, market_size: 650000, slots_available: 12 },
    { id: 'FCO', name: 'Rome', x: 440, y: 145, region: 'Europe', owned: false, market_size: 600000, slots_available: 12 },
    { id: 'SVO', name: 'Moscow', x: 480, y: 105, region: 'Europe', owned: false, market_size: 750000, slots_available: 16 },

    // Asia
    { id: 'NRT', name: 'Tokyo', x: 680, y: 160, region: 'Asia', owned: false, market_size: 1200000, slots_available: 22 },
    { id: 'HKG', name: 'Hong Kong', x: 650, y: 200, region: 'Asia', owned: false, market_size: 950000, slots_available: 14 },
    { id: 'SIN', name: 'Singapore', x: 620, y: 240, region: 'Asia', owned: false, market_size: 880000, slots_available: 16 },
    { id: 'PEK', name: 'Beijing', x: 640, y: 150, region: 'Asia', owned: false, market_size: 1000000, slots_available: 20 },
    { id: 'ICN', name: 'Seoul', x: 670, y: 155, region: 'Asia', owned: false, market_size: 850000, slots_available: 18 },
    { id: 'BKK', name: 'Bangkok', x: 630, y: 220, region: 'Asia', owned: false, market_size: 750000, slots_available: 14 },
    { id: 'DEL', name: 'Delhi', x: 570, y: 190, region: 'Asia', owned: false, market_size: 800000, slots_available: 16 },
    { id: 'BOM', name: 'Mumbai', x: 560, y: 210, region: 'Asia', owned: false, market_size: 750000, slots_available: 14 },

    // Middle East
    { id: 'DXB', name: 'Dubai', x: 510, y: 200, region: 'Middle East', owned: false, market_size: 900000, slots_available: 20 },
    { id: 'DOH', name: 'Doha', x: 505, y: 205, region: 'Middle East', owned: false, market_size: 650000, slots_available: 14 },

    // Africa
    { id: 'JNB', name: 'Johannesburg', x: 460, y: 300, region: 'Africa', owned: false, market_size: 550000, slots_available: 10 },
    { id: 'CAI', name: 'Cairo', x: 470, y: 185, region: 'Africa', owned: false, market_size: 600000, slots_available: 12 },

    // Oceania
    { id: 'SYD', name: 'Sydney', x: 720, y: 280, region: 'Oceania', owned: false, market_size: 700000, slots_available: 12 },
    { id: 'AKL', name: 'Auckland', x: 750, y: 305, region: 'Oceania', owned: false, market_size: 400000, slots_available: 8 },

    // South America
    { id: 'GRU', name: 'Sao Paulo', x: 280, y: 280, region: 'South America', owned: false, market_size: 650000, slots_available: 10 },
    { id: 'EZE', name: 'Buenos Aires', x: 270, y: 305, region: 'South America', owned: false, market_size: 550000, slots_available: 10 },
    { id: 'BOG', name: 'Bogota', x: 240, y: 240, region: 'South America', owned: false, market_size: 500000, slots_available: 9 }
];

// Group airports by region
export function getAirportsByRegion(): Record<Region, Airport[]> {
    const grouped: Record<string, Airport[]> = {};
    airports.forEach(airport => {
        if (!grouped[airport.region]) {
            grouped[airport.region] = [];
        }
        grouped[airport.region].push(airport);
    });
    return grouped as Record<Region, Airport[]>;
}

// Find airport by ID
export function findAirport(id: string): Airport | undefined {
    return airports.find(a => a.id === id);
}
