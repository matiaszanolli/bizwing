// Airport database

export type Region = 'North America' | 'Europe' | 'Asia' | 'Middle East' | 'Africa' | 'Oceania' | 'South America';
export type Continent = 'North America' | 'South America' | 'Europe' | 'Africa' | 'Asia' | 'Oceania';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Airport {
    id: string;
    name: string;
    lat: number;  // Latitude in decimal degrees
    lon: number;  // Longitude in decimal degrees
    region: Region;
    continent: Continent;  // For hub restrictions (Middle East maps to Asia)
    owned: boolean;
    market_size: number;
    slots_available: number;
    tourism_score: number;  // 0-100, affects leisure passenger demand
    business_score: number;  // 0-100, affects business class demand
    difficulty: Difficulty;  // Easy/Medium/Hard based on tourism + business scores
    is_hub?: boolean;  // Player-owned hub status
    competitor_owned?: string; // Name of competitor who owns it
    country?: string;  // Country name for display
}

export const airports: Airport[] = [
    // North America (15 airports)
    { id: 'JFK', name: 'New York', lat: 40.6418, lon: -73.7810, region: 'North America', continent: 'North America', owned: true, market_size: 35000000, slots_available: 20, tourism_score: 85, business_score: 95, difficulty: 'Easy', country: 'USA' },
    { id: 'LAX', name: 'Los Angeles', lat: 33.9428, lon: -118.4100, region: 'North America', continent: 'North America', owned: false, market_size: 32000000, slots_available: 18, tourism_score: 90, business_score: 85, difficulty: 'Easy', country: 'USA' },
    { id: 'ORD', name: 'Chicago', lat: 41.9786, lon: -87.9047, region: 'North America', continent: 'North America', owned: false, market_size: 28000000, slots_available: 20, tourism_score: 70, business_score: 90, difficulty: 'Easy', country: 'USA' },
    { id: 'DFW', name: 'Dallas', lat: 32.8972, lon: -97.0377, region: 'North America', continent: 'North America', owned: false, market_size: 22000000, slots_available: 16, tourism_score: 60, business_score: 85, difficulty: 'Medium', country: 'USA' },
    { id: 'ATL', name: 'Atlanta', lat: 33.6404, lon: -84.4199, region: 'North America', continent: 'North America', owned: false, market_size: 30000000, slots_available: 22, tourism_score: 65, business_score: 88, difficulty: 'Easy', country: 'USA' },
    { id: 'MIA', name: 'Miami', lat: 25.7952, lon: -80.2796, region: 'North America', continent: 'North America', owned: false, market_size: 18000000, slots_available: 14, tourism_score: 92, business_score: 75, difficulty: 'Easy', country: 'USA' },
    { id: 'SFO', name: 'San Francisco', lat: 37.6152, lon: -122.3900, region: 'North America', continent: 'North America', owned: false, market_size: 25000000, slots_available: 16, tourism_score: 88, business_score: 92, difficulty: 'Easy', country: 'USA' },
    { id: 'SEA', name: 'Seattle', lat: 47.4435, lon: -122.3017, region: 'North America', continent: 'North America', owned: false, market_size: 15000000, slots_available: 12, tourism_score: 75, business_score: 80, difficulty: 'Easy', country: 'USA' },
    { id: 'BOS', name: 'Boston', lat: 42.3656, lon: -71.0100, region: 'North America', continent: 'North America', owned: false, market_size: 14000000, slots_available: 12, tourism_score: 78, business_score: 85, difficulty: 'Easy', country: 'USA' },
    { id: 'YYZ', name: 'Toronto', lat: 43.6772, lon: -79.6306, region: 'North America', continent: 'North America', owned: false, market_size: 16000000, slots_available: 14, tourism_score: 72, business_score: 82, difficulty: 'Easy', country: 'Canada' },
    { id: 'YVR', name: 'Vancouver', lat: 49.1933, lon: -123.1758, region: 'North America', continent: 'North America', owned: false, market_size: 9000000, slots_available: 10, tourism_score: 80, business_score: 68, difficulty: 'Medium', country: 'Canada' },
    { id: 'MEX', name: 'Mexico City', lat: 19.4361, lon: -99.0719, region: 'North America', continent: 'North America', owned: false, market_size: 20000000, slots_available: 15, tourism_score: 75, business_score: 70, difficulty: 'Medium', country: 'Mexico' },
    { id: 'LAS', name: 'Las Vegas', lat: 36.0860, lon: -115.1540, region: 'North America', continent: 'North America', owned: false, market_size: 12000000, slots_available: 10, tourism_score: 95, business_score: 70, difficulty: 'Easy', country: 'USA' },
    { id: 'DEN', name: 'Denver', lat: 39.8493, lon: -104.6738, region: 'North America', continent: 'North America', owned: false, market_size: 13000000, slots_available: 12, tourism_score: 70, business_score: 75, difficulty: 'Medium', country: 'USA' },
    { id: 'PHX', name: 'Phoenix', lat: 33.4352, lon: -112.0102, region: 'North America', continent: 'North America', owned: false, market_size: 11000000, slots_available: 10, tourism_score: 78, business_score: 65, difficulty: 'Medium', country: 'USA' },

    // Europe (15 airports)
    { id: 'LHR', name: 'London', lat: 51.4700, lon: -0.4543, region: 'Europe', continent: 'Europe', owned: false, market_size: 32000000, slots_available: 20, tourism_score: 90, business_score: 95, difficulty: 'Easy', country: 'UK' },
    { id: 'CDG', name: 'Paris', lat: 49.0128, lon: 2.5500, region: 'Europe', continent: 'Europe', owned: false, market_size: 28000000, slots_available: 18, tourism_score: 95, business_score: 88, difficulty: 'Easy', country: 'France' },
    { id: 'FRA', name: 'Frankfurt', lat: 50.0333, lon: 8.5706, region: 'Europe', continent: 'Europe', owned: false, market_size: 25000000, slots_available: 18, tourism_score: 68, business_score: 92, difficulty: 'Easy', country: 'Germany' },
    { id: 'AMS', name: 'Amsterdam', lat: 52.3081, lon: 4.7642, region: 'Europe', continent: 'Europe', owned: false, market_size: 22000000, slots_available: 16, tourism_score: 88, business_score: 85, difficulty: 'Easy', country: 'Netherlands' },
    { id: 'MAD', name: 'Madrid', lat: 40.4936, lon: -3.5668, region: 'Europe', continent: 'Europe', owned: false, market_size: 20000000, slots_available: 14, tourism_score: 85, business_score: 78, difficulty: 'Easy', country: 'Spain' },
    { id: 'FCO', name: 'Rome', lat: 41.8045, lon: 12.2508, region: 'Europe', continent: 'Europe', owned: false, market_size: 18000000, slots_available: 14, tourism_score: 92, business_score: 72, difficulty: 'Easy', country: 'Italy' },
    { id: 'SVO', name: 'Moscow', lat: 55.9703, lon: 37.4088, region: 'Europe', continent: 'Europe', owned: false, market_size: 24000000, slots_available: 16, tourism_score: 70, business_score: 75, difficulty: 'Medium', country: 'Russia' },
    { id: 'IST', name: 'Istanbul', lat: 41.2769, lon: 28.7293, region: 'Europe', continent: 'Europe', owned: false, market_size: 26000000, slots_available: 16, tourism_score: 82, business_score: 80, difficulty: 'Easy', country: 'Turkey' },
    { id: 'BCN', name: 'Barcelona', lat: 41.2971, lon: 2.0833, region: 'Europe', continent: 'Europe', owned: false, market_size: 16000000, slots_available: 12, tourism_score: 90, business_score: 70, difficulty: 'Easy', country: 'Spain' },
    { id: 'MUC', name: 'Munich', lat: 48.3537, lon: 11.7750, region: 'Europe', continent: 'Europe', owned: false, market_size: 15000000, slots_available: 14, tourism_score: 78, business_score: 82, difficulty: 'Easy', country: 'Germany' },
    { id: 'ZRH', name: 'Zurich', lat: 47.4515, lon: 8.5646, region: 'Europe', continent: 'Europe', owned: false, market_size: 12000000, slots_available: 12, tourism_score: 75, business_score: 90, difficulty: 'Easy', country: 'Switzerland' },
    { id: 'VIE', name: 'Vienna', lat: 48.1158, lon: 16.5666, region: 'Europe', continent: 'Europe', owned: false, market_size: 10000000, slots_available: 10, tourism_score: 82, business_score: 72, difficulty: 'Easy', country: 'Austria' },
    { id: 'LIS', name: 'Lisbon', lat: 38.7742, lon: -9.1342, region: 'Europe', continent: 'Europe', owned: false, market_size: 11000000, slots_available: 10, tourism_score: 85, business_score: 65, difficulty: 'Medium', country: 'Portugal' },
    { id: 'CPH', name: 'Copenhagen', lat: 55.6180, lon: 12.6559, region: 'Europe', continent: 'Europe', owned: false, market_size: 12000000, slots_available: 10, tourism_score: 80, business_score: 78, difficulty: 'Easy', country: 'Denmark' },
    { id: 'ARN', name: 'Stockholm', lat: 59.6519, lon: 17.9186, region: 'Europe', continent: 'Europe', owned: false, market_size: 9000000, slots_available: 10, tourism_score: 78, business_score: 75, difficulty: 'Easy', country: 'Sweden' },

    // Asia (15 airports)
    { id: 'NRT', name: 'Tokyo', lat: 35.7720, lon: 140.3875, region: 'Asia', continent: 'Asia', owned: false, market_size: 38000000, slots_available: 24, tourism_score: 85, business_score: 92, difficulty: 'Easy', country: 'Japan' },
    { id: 'HKG', name: 'Hong Kong', lat: 22.3089, lon: 113.9150, region: 'Asia', continent: 'Asia', owned: false, market_size: 30000000, slots_available: 18, tourism_score: 80, business_score: 95, difficulty: 'Easy', country: 'Hong Kong' },
    { id: 'SIN', name: 'Singapore', lat: 1.3502, lon: 103.9940, region: 'Asia', continent: 'Asia', owned: false, market_size: 28000000, slots_available: 18, tourism_score: 82, business_score: 93, difficulty: 'Easy', country: 'Singapore' },
    { id: 'PEK', name: 'Beijing', lat: 40.0799, lon: 116.6031, region: 'Asia', continent: 'Asia', owned: false, market_size: 35000000, slots_available: 22, tourism_score: 78, business_score: 88, difficulty: 'Easy', country: 'China' },
    { id: 'PVG', name: 'Shanghai', lat: 31.1434, lon: 121.8050, region: 'Asia', continent: 'Asia', owned: false, market_size: 32000000, slots_available: 20, tourism_score: 75, business_score: 90, difficulty: 'Easy', country: 'China' },
    { id: 'ICN', name: 'Seoul', lat: 37.4691, lon: 126.4510, region: 'Asia', continent: 'Asia', owned: false, market_size: 26000000, slots_available: 18, tourism_score: 72, business_score: 85, difficulty: 'Easy', country: 'South Korea' },
    { id: 'BKK', name: 'Bangkok', lat: 13.6900, lon: 100.7501, region: 'Asia', continent: 'Asia', owned: false, market_size: 24000000, slots_available: 16, tourism_score: 88, business_score: 75, difficulty: 'Easy', country: 'Thailand' },
    { id: 'DEL', name: 'Delhi', lat: 28.5562, lon: 77.1003, region: 'Asia', continent: 'Asia', owned: false, market_size: 25000000, slots_available: 18, tourism_score: 70, business_score: 78, difficulty: 'Medium', country: 'India' },
    { id: 'BOM', name: 'Mumbai', lat: 19.0974, lon: 72.8742, region: 'Asia', continent: 'Asia', owned: false, market_size: 20000000, slots_available: 16, tourism_score: 68, business_score: 80, difficulty: 'Medium', country: 'India' },
    { id: 'KUL', name: 'Kuala Lumpur', lat: 2.7456, lon: 101.7100, region: 'Asia', continent: 'Asia', owned: false, market_size: 18000000, slots_available: 14, tourism_score: 75, business_score: 72, difficulty: 'Medium', country: 'Malaysia' },
    { id: 'CGK', name: 'Jakarta', lat: -6.1256, lon: 106.6558, region: 'Asia', continent: 'Asia', owned: false, market_size: 22000000, slots_available: 16, tourism_score: 65, business_score: 70, difficulty: 'Medium', country: 'Indonesia' },
    { id: 'MNL', name: 'Manila', lat: 14.5086, lon: 121.0194, region: 'Asia', continent: 'Asia', owned: false, market_size: 16000000, slots_available: 14, tourism_score: 68, business_score: 65, difficulty: 'Medium', country: 'Philippines' },
    { id: 'TPE', name: 'Taipei', lat: 25.0783, lon: 121.2364, region: 'Asia', continent: 'Asia', owned: false, market_size: 17000000, slots_available: 14, tourism_score: 72, business_score: 78, difficulty: 'Medium', country: 'Taiwan' },
    { id: 'CAN', name: 'Guangzhou', lat: 23.3925, lon: 113.2953, region: 'Asia', continent: 'Asia', owned: false, market_size: 21000000, slots_available: 16, tourism_score: 65, business_score: 75, difficulty: 'Medium', country: 'China' },
    { id: 'OSA', name: 'Osaka', lat: 34.4347, lon: 135.2440, region: 'Asia', continent: 'Asia', owned: false, market_size: 14000000, slots_available: 12, tourism_score: 80, business_score: 75, difficulty: 'Easy', country: 'Japan' },

    // Middle East (6 airports) - Maps to Asia continent for hub restrictions
    { id: 'DXB', name: 'Dubai', lat: 25.2528, lon: 55.3644, region: 'Middle East', continent: 'Asia', owned: false, market_size: 34000000, slots_available: 22, tourism_score: 88, business_score: 92, difficulty: 'Easy', country: 'UAE' },
    { id: 'DOH', name: 'Doha', lat: 25.2731, lon: 51.6081, region: 'Middle East', continent: 'Asia', owned: false, market_size: 16000000, slots_available: 14, tourism_score: 75, business_score: 85, difficulty: 'Easy', country: 'Qatar' },
    { id: 'AUH', name: 'Abu Dhabi', lat: 24.4329, lon: 54.6445, region: 'Middle East', continent: 'Asia', owned: false, market_size: 12000000, slots_available: 12, tourism_score: 78, business_score: 80, difficulty: 'Easy', country: 'UAE' },
    { id: 'RUH', name: 'Riyadh', lat: 24.9582, lon: 46.7008, region: 'Middle East', continent: 'Asia', owned: false, market_size: 11000000, slots_available: 12, tourism_score: 65, business_score: 75, difficulty: 'Medium', country: 'Saudi Arabia' },
    { id: 'TLV', name: 'Tel Aviv', lat: 32.0114, lon: 34.8867, region: 'Middle East', continent: 'Asia', owned: false, market_size: 9000000, slots_available: 10, tourism_score: 72, business_score: 78, difficulty: 'Medium', country: 'Israel' },
    { id: 'JED', name: 'Jeddah', lat: 21.6796, lon: 39.1565, region: 'Middle East', continent: 'Asia', owned: false, market_size: 8000000, slots_available: 10, tourism_score: 70, business_score: 68, difficulty: 'Medium', country: 'Saudi Arabia' },

    // Africa (8 airports)
    { id: 'JNB', name: 'Johannesburg', lat: -26.1348, lon: 28.2405, region: 'Africa', continent: 'Africa', owned: false, market_size: 10000000, slots_available: 12, tourism_score: 65, business_score: 70, difficulty: 'Medium', country: 'South Africa' },
    { id: 'CAI', name: 'Cairo', lat: 30.1219, lon: 31.4056, region: 'Africa', continent: 'Africa', owned: false, market_size: 12000000, slots_available: 14, tourism_score: 75, business_score: 68, difficulty: 'Medium', country: 'Egypt' },
    { id: 'CPT', name: 'Cape Town', lat: -33.9715, lon: 18.6021, region: 'Africa', continent: 'Africa', owned: false, market_size: 6000000, slots_available: 10, tourism_score: 82, business_score: 58, difficulty: 'Medium', country: 'South Africa' },
    { id: 'LOS', name: 'Lagos', lat: 6.5774, lon: 3.3212, region: 'Africa', continent: 'Africa', owned: false, market_size: 8000000, slots_available: 10, tourism_score: 50, business_score: 62, difficulty: 'Hard', country: 'Nigeria' },
    { id: 'ADD', name: 'Addis Ababa', lat: 8.9779, lon: 38.7993, region: 'Africa', continent: 'Africa', owned: false, market_size: 7000000, slots_available: 10, tourism_score: 55, business_score: 58, difficulty: 'Hard', country: 'Ethiopia' },
    { id: 'NBO', name: 'Nairobi', lat: -1.3337, lon: 36.9271, region: 'Africa', continent: 'Africa', owned: false, market_size: 6000000, slots_available: 8, tourism_score: 68, business_score: 55, difficulty: 'Hard', country: 'Kenya' },
    { id: 'CMN', name: 'Casablanca', lat: 33.3675, lon: -7.5872, region: 'Africa', continent: 'Africa', owned: false, market_size: 5000000, slots_available: 8, tourism_score: 62, business_score: 58, difficulty: 'Hard', country: 'Morocco' },
    { id: 'ALG', name: 'Algiers', lat: 36.6879, lon: 3.2092, region: 'Africa', continent: 'Africa', owned: false, market_size: 4000000, slots_available: 8, tourism_score: 58, business_score: 52, difficulty: 'Hard', country: 'Algeria' },

    // Oceania (5 airports)
    { id: 'SYD', name: 'Sydney', lat: -33.9473, lon: 151.1794, region: 'Oceania', continent: 'Oceania', owned: false, market_size: 18000000, slots_available: 16, tourism_score: 88, business_score: 80, difficulty: 'Easy', country: 'Australia' },
    { id: 'MEL', name: 'Melbourne', lat: -37.6637, lon: 144.8448, region: 'Oceania', continent: 'Oceania', owned: false, market_size: 15000000, slots_available: 14, tourism_score: 82, business_score: 78, difficulty: 'Easy', country: 'Australia' },
    { id: 'AKL', name: 'Auckland', lat: -37.0081, lon: 174.7920, region: 'Oceania', continent: 'Oceania', owned: false, market_size: 8000000, slots_available: 10, tourism_score: 85, business_score: 68, difficulty: 'Easy', country: 'New Zealand' },
    { id: 'BNE', name: 'Brisbane', lat: -27.3833, lon: 153.1183, region: 'Oceania', continent: 'Oceania', owned: false, market_size: 10000000, slots_available: 12, tourism_score: 80, business_score: 70, difficulty: 'Medium', country: 'Australia' },
    { id: 'PER', name: 'Perth', lat: -31.9410, lon: 115.9742, region: 'Oceania', continent: 'Oceania', owned: false, market_size: 6000000, slots_available: 8, tourism_score: 75, business_score: 65, difficulty: 'Medium', country: 'Australia' },

    // South America (10 airports)
    { id: 'GRU', name: 'Sao Paulo', lat: -23.4346, lon: -46.4781, region: 'South America', continent: 'South America', owned: false, market_size: 18000000, slots_available: 16, tourism_score: 72, business_score: 75, difficulty: 'Medium', country: 'Brazil' },
    { id: 'GIG', name: 'Rio de Janeiro', lat: -22.8089, lon: -43.2438, region: 'South America', continent: 'South America', owned: false, market_size: 14000000, slots_available: 14, tourism_score: 90, business_score: 65, difficulty: 'Easy', country: 'Brazil' },
    { id: 'EZE', name: 'Buenos Aires', lat: -34.8220, lon: -58.5358, region: 'South America', continent: 'South America', owned: false, market_size: 15000000, slots_available: 14, tourism_score: 78, business_score: 72, difficulty: 'Medium', country: 'Argentina' },
    { id: 'BOG', name: 'Bogota', lat: 4.7016, lon: -74.1469, region: 'South America', continent: 'South America', owned: false, market_size: 12000000, slots_available: 12, tourism_score: 65, business_score: 68, difficulty: 'Medium', country: 'Colombia' },
    { id: 'LIM', name: 'Lima', lat: -12.0219, lon: -77.1143, region: 'South America', continent: 'South America', owned: false, market_size: 10000000, slots_available: 12, tourism_score: 75, business_score: 62, difficulty: 'Medium', country: 'Peru' },
    { id: 'SCL', name: 'Santiago', lat: -33.3930, lon: -70.7858, region: 'South America', continent: 'South America', owned: false, market_size: 11000000, slots_available: 12, tourism_score: 70, business_score: 70, difficulty: 'Medium', country: 'Chile' },
    { id: 'PTY', name: 'Panama City', lat: 9.0695, lon: -79.3835, region: 'South America', continent: 'South America', owned: false, market_size: 7000000, slots_available: 10, tourism_score: 68, business_score: 65, difficulty: 'Medium', country: 'Panama' },
    { id: 'UIO', name: 'Quito', lat: -0.1133, lon: -78.3586, region: 'South America', continent: 'South America', owned: false, market_size: 5000000, slots_available: 8, tourism_score: 72, business_score: 52, difficulty: 'Hard', country: 'Ecuador' },
    { id: 'MVD', name: 'Montevideo', lat: -34.8384, lon: -56.0308, region: 'South America', continent: 'South America', owned: false, market_size: 4000000, slots_available: 8, tourism_score: 65, business_score: 55, difficulty: 'Hard', country: 'Uruguay' },
    { id: 'CCS', name: 'Caracas', lat: 10.6012, lon: -66.9912, region: 'South America', continent: 'South America', owned: false, market_size: 6000000, slots_available: 8, tourism_score: 55, business_score: 48, difficulty: 'Hard', country: 'Venezuela' },
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

// Group airports by continent (for hub restrictions)
export function getAirportsByContinent(): Record<Continent, Airport[]> {
    const grouped: Record<string, Airport[]> = {};
    airports.forEach(airport => {
        if (!grouped[airport.continent]) {
            grouped[airport.continent] = [];
        }
        grouped[airport.continent].push(airport);
    });
    return grouped as Record<Continent, Airport[]>;
}

// Find airport by ID
export function findAirport(id: string): Airport | undefined {
    return airports.find(a => a.id === id);
}
