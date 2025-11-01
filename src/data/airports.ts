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
    // North America (15 airports)
    { id: 'JFK', name: 'New York', x: 200, y: 150, region: 'North America', owned: true, market_size: 35000000, slots_available: 20 },
    { id: 'LAX', name: 'Los Angeles', x: 120, y: 170, region: 'North America', owned: false, market_size: 32000000, slots_available: 18 },
    { id: 'ORD', name: 'Chicago', x: 180, y: 140, region: 'North America', owned: false, market_size: 28000000, slots_available: 20 },
    { id: 'DFW', name: 'Dallas', x: 160, y: 180, region: 'North America', owned: false, market_size: 22000000, slots_available: 16 },
    { id: 'ATL', name: 'Atlanta', x: 190, y: 175, region: 'North America', owned: false, market_size: 30000000, slots_available: 22 },
    { id: 'MIA', name: 'Miami', x: 210, y: 195, region: 'North America', owned: false, market_size: 18000000, slots_available: 14 },
    { id: 'SFO', name: 'San Francisco', x: 110, y: 155, region: 'North America', owned: false, market_size: 25000000, slots_available: 16 },
    { id: 'SEA', name: 'Seattle', x: 105, y: 135, region: 'North America', owned: false, market_size: 15000000, slots_available: 12 },
    { id: 'BOS', name: 'Boston', x: 205, y: 145, region: 'North America', owned: false, market_size: 14000000, slots_available: 12 },
    { id: 'YYZ', name: 'Toronto', x: 190, y: 130, region: 'North America', owned: false, market_size: 16000000, slots_available: 14 },
    { id: 'YVR', name: 'Vancouver', x: 100, y: 130, region: 'North America', owned: false, market_size: 9000000, slots_available: 10 },
    { id: 'MEX', name: 'Mexico City', x: 150, y: 200, region: 'North America', owned: false, market_size: 20000000, slots_available: 15 },
    { id: 'LAS', name: 'Las Vegas', x: 125, y: 165, region: 'North America', owned: false, market_size: 12000000, slots_available: 10 },
    { id: 'DEN', name: 'Denver', x: 140, y: 150, region: 'North America', owned: false, market_size: 13000000, slots_available: 12 },
    { id: 'PHX', name: 'Phoenix', x: 130, y: 175, region: 'North America', owned: false, market_size: 11000000, slots_available: 10 },

    // Europe (15 airports)
    { id: 'LHR', name: 'London', x: 400, y: 120, region: 'Europe', owned: false, market_size: 32000000, slots_available: 20 },
    { id: 'CDG', name: 'Paris', x: 420, y: 130, region: 'Europe', owned: false, market_size: 28000000, slots_available: 18 },
    { id: 'FRA', name: 'Frankfurt', x: 430, y: 125, region: 'Europe', owned: false, market_size: 25000000, slots_available: 18 },
    { id: 'AMS', name: 'Amsterdam', x: 415, y: 118, region: 'Europe', owned: false, market_size: 22000000, slots_available: 16 },
    { id: 'MAD', name: 'Madrid', x: 395, y: 145, region: 'Europe', owned: false, market_size: 20000000, slots_available: 14 },
    { id: 'FCO', name: 'Rome', x: 440, y: 145, region: 'Europe', owned: false, market_size: 18000000, slots_available: 14 },
    { id: 'SVO', name: 'Moscow', x: 480, y: 105, region: 'Europe', owned: false, market_size: 24000000, slots_available: 16 },
    { id: 'IST', name: 'Istanbul', x: 470, y: 150, region: 'Europe', owned: false, market_size: 26000000, slots_available: 16 },
    { id: 'BCN', name: 'Barcelona', x: 410, y: 148, region: 'Europe', owned: false, market_size: 16000000, slots_available: 12 },
    { id: 'MUC', name: 'Munich', x: 435, y: 128, region: 'Europe', owned: false, market_size: 15000000, slots_available: 14 },
    { id: 'ZRH', name: 'Zurich', x: 428, y: 132, region: 'Europe', owned: false, market_size: 12000000, slots_available: 12 },
    { id: 'VIE', name: 'Vienna', x: 445, y: 130, region: 'Europe', owned: false, market_size: 10000000, slots_available: 10 },
    { id: 'LIS', name: 'Lisbon', x: 385, y: 150, region: 'Europe', owned: false, market_size: 11000000, slots_available: 10 },
    { id: 'CPH', name: 'Copenhagen', x: 425, y: 108, region: 'Europe', owned: false, market_size: 12000000, slots_available: 10 },
    { id: 'ARN', name: 'Stockholm', x: 435, y: 100, region: 'Europe', owned: false, market_size: 9000000, slots_available: 10 },

    // Asia (15 airports)
    { id: 'NRT', name: 'Tokyo', x: 680, y: 160, region: 'Asia', owned: false, market_size: 38000000, slots_available: 24 },
    { id: 'HKG', name: 'Hong Kong', x: 650, y: 200, region: 'Asia', owned: false, market_size: 30000000, slots_available: 18 },
    { id: 'SIN', name: 'Singapore', x: 620, y: 240, region: 'Asia', owned: false, market_size: 28000000, slots_available: 18 },
    { id: 'PEK', name: 'Beijing', x: 640, y: 150, region: 'Asia', owned: false, market_size: 35000000, slots_available: 22 },
    { id: 'PVG', name: 'Shanghai', x: 655, y: 170, region: 'Asia', owned: false, market_size: 32000000, slots_available: 20 },
    { id: 'ICN', name: 'Seoul', x: 670, y: 155, region: 'Asia', owned: false, market_size: 26000000, slots_available: 18 },
    { id: 'BKK', name: 'Bangkok', x: 630, y: 220, region: 'Asia', owned: false, market_size: 24000000, slots_available: 16 },
    { id: 'DEL', name: 'Delhi', x: 570, y: 190, region: 'Asia', owned: false, market_size: 25000000, slots_available: 18 },
    { id: 'BOM', name: 'Mumbai', x: 560, y: 210, region: 'Asia', owned: false, market_size: 20000000, slots_available: 16 },
    { id: 'KUL', name: 'Kuala Lumpur', x: 630, y: 235, region: 'Asia', owned: false, market_size: 18000000, slots_available: 14 },
    { id: 'CGK', name: 'Jakarta', x: 640, y: 250, region: 'Asia', owned: false, market_size: 22000000, slots_available: 16 },
    { id: 'MNL', name: 'Manila', x: 660, y: 220, region: 'Asia', owned: false, market_size: 16000000, slots_available: 14 },
    { id: 'TPE', name: 'Taipei', x: 665, y: 195, region: 'Asia', owned: false, market_size: 17000000, slots_available: 14 },
    { id: 'CAN', name: 'Guangzhou', x: 648, y: 195, region: 'Asia', owned: false, market_size: 21000000, slots_available: 16 },
    { id: 'OSA', name: 'Osaka', x: 685, y: 165, region: 'Asia', owned: false, market_size: 14000000, slots_available: 12 },

    // Middle East (6 airports)
    { id: 'DXB', name: 'Dubai', x: 510, y: 200, region: 'Middle East', owned: false, market_size: 34000000, slots_available: 22 },
    { id: 'DOH', name: 'Doha', x: 505, y: 205, region: 'Middle East', owned: false, market_size: 16000000, slots_available: 14 },
    { id: 'AUH', name: 'Abu Dhabi', x: 512, y: 203, region: 'Middle East', owned: false, market_size: 12000000, slots_available: 12 },
    { id: 'RUH', name: 'Riyadh', x: 500, y: 210, region: 'Middle East', owned: false, market_size: 11000000, slots_available: 12 },
    { id: 'TLV', name: 'Tel Aviv', x: 475, y: 175, region: 'Middle East', owned: false, market_size: 9000000, slots_available: 10 },
    { id: 'JED', name: 'Jeddah', x: 495, y: 215, region: 'Middle East', owned: false, market_size: 8000000, slots_available: 10 },

    // Africa (8 airports)
    { id: 'JNB', name: 'Johannesburg', x: 460, y: 300, region: 'Africa', owned: false, market_size: 10000000, slots_available: 12 },
    { id: 'CAI', name: 'Cairo', x: 470, y: 185, region: 'Africa', owned: false, market_size: 12000000, slots_available: 14 },
    { id: 'CPT', name: 'Cape Town', x: 450, y: 315, region: 'Africa', owned: false, market_size: 6000000, slots_available: 10 },
    { id: 'LOS', name: 'Lagos', x: 420, y: 245, region: 'Africa', owned: false, market_size: 8000000, slots_available: 10 },
    { id: 'ADD', name: 'Addis Ababa', x: 480, y: 245, region: 'Africa', owned: false, market_size: 7000000, slots_available: 10 },
    { id: 'NBO', name: 'Nairobi', x: 475, y: 260, region: 'Africa', owned: false, market_size: 6000000, slots_available: 8 },
    { id: 'CMN', name: 'Casablanca', x: 395, y: 175, region: 'Africa', owned: false, market_size: 5000000, slots_available: 8 },
    { id: 'ALG', name: 'Algiers', x: 415, y: 165, region: 'Africa', owned: false, market_size: 4000000, slots_available: 8 },

    // Oceania (5 airports)
    { id: 'SYD', name: 'Sydney', x: 720, y: 280, region: 'Oceania', owned: false, market_size: 18000000, slots_available: 16 },
    { id: 'MEL', name: 'Melbourne', x: 715, y: 290, region: 'Oceania', owned: false, market_size: 15000000, slots_available: 14 },
    { id: 'AKL', name: 'Auckland', x: 750, y: 305, region: 'Oceania', owned: false, market_size: 8000000, slots_available: 10 },
    { id: 'BNE', name: 'Brisbane', x: 725, y: 270, region: 'Oceania', owned: false, market_size: 10000000, slots_available: 12 },
    { id: 'PER', name: 'Perth', x: 690, y: 285, region: 'Oceania', owned: false, market_size: 6000000, slots_available: 8 },

    // South America (10 airports)
    { id: 'GRU', name: 'Sao Paulo', x: 280, y: 280, region: 'South America', owned: false, market_size: 18000000, slots_available: 16 },
    { id: 'GIG', name: 'Rio de Janeiro', x: 290, y: 285, region: 'South America', owned: false, market_size: 14000000, slots_available: 14 },
    { id: 'EZE', name: 'Buenos Aires', x: 270, y: 305, region: 'South America', owned: false, market_size: 15000000, slots_available: 14 },
    { id: 'BOG', name: 'Bogota', x: 240, y: 240, region: 'South America', owned: false, market_size: 12000000, slots_available: 12 },
    { id: 'LIM', name: 'Lima', x: 230, y: 265, region: 'South America', owned: false, market_size: 10000000, slots_available: 12 },
    { id: 'SCL', name: 'Santiago', x: 255, y: 310, region: 'South America', owned: false, market_size: 11000000, slots_available: 12 },
    { id: 'PTY', name: 'Panama City', x: 230, y: 235, region: 'South America', owned: false, market_size: 7000000, slots_available: 10 },
    { id: 'UIO', name: 'Quito', x: 235, y: 250, region: 'South America', owned: false, market_size: 5000000, slots_available: 8 },
    { id: 'MVD', name: 'Montevideo', x: 275, y: 310, region: 'South America', owned: false, market_size: 4000000, slots_available: 8 },
    { id: 'CCS', name: 'Caracas', x: 250, y: 230, region: 'South America', owned: false, market_size: 6000000, slots_available: 8 },
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
