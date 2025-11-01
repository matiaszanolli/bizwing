// Aircraft database

export interface AircraftType {
    name: string;
    category: 'Regional' | 'Narrow-body' | 'Wide-body' | 'Jumbo' | 'Supersonic' | 'Cargo';
    capacity: number;
    cargo_capacity?: number;
    range: number;
    price: number;
    operating_cost: number;
    lease_per_quarter: number;
    year_available: number;
}

export const aircraftTypes: AircraftType[] = [
    // Regional Jets
    {
        name: 'Embraer ERJ-145',
        category: 'Regional',
        capacity: 50,
        range: 2400,
        price: 18000000,
        operating_cost: 3500,
        lease_per_quarter: 500000,
        year_available: 1992
    },
    {
        name: 'Bombardier CRJ-200',
        category: 'Regional',
        capacity: 50,
        range: 2100,
        price: 20000000,
        operating_cost: 3800,
        lease_per_quarter: 550000,
        year_available: 1992
    },

    // Narrow-body
    {
        name: 'Boeing 737-300',
        category: 'Narrow-body',
        capacity: 140,
        range: 2800,
        price: 35000000,
        operating_cost: 8000,
        lease_per_quarter: 900000,
        year_available: 1992
    },
    {
        name: 'Airbus A320',
        category: 'Narrow-body',
        capacity: 150,
        range: 3300,
        price: 40000000,
        operating_cost: 8500,
        lease_per_quarter: 1000000,
        year_available: 1992
    },
    {
        name: 'Boeing 737-800',
        category: 'Narrow-body',
        capacity: 162,
        range: 3200,
        price: 50000000,
        operating_cost: 9000,
        lease_per_quarter: 1200000,
        year_available: 1998
    },

    // Wide-body
    {
        name: 'Boeing 767-300ER',
        category: 'Wide-body',
        capacity: 218,
        range: 5600,
        price: 90000000,
        operating_cost: 15000,
        lease_per_quarter: 2200000,
        year_available: 1992
    },
    {
        name: 'Boeing 777-200',
        category: 'Wide-body',
        capacity: 305,
        range: 7700,
        price: 160000000,
        operating_cost: 22000,
        lease_per_quarter: 3800000,
        year_available: 1995
    },
    {
        name: 'Airbus A330-300',
        category: 'Wide-body',
        capacity: 277,
        range: 6100,
        price: 130000000,
        operating_cost: 18000,
        lease_per_quarter: 3200000,
        year_available: 1993
    },

    // Jumbo/Ultra long-haul
    {
        name: 'Boeing 747-400',
        category: 'Jumbo',
        capacity: 416,
        range: 7200,
        price: 180000000,
        operating_cost: 25000,
        lease_per_quarter: 4500000,
        year_available: 1992
    },
    {
        name: 'McDonnell Douglas MD-11',
        category: 'Wide-body',
        capacity: 298,
        range: 6800,
        price: 120000000,
        operating_cost: 20000,
        lease_per_quarter: 3000000,
        year_available: 1992
    },
    {
        name: 'Airbus A340-300',
        category: 'Wide-body',
        capacity: 295,
        range: 7400,
        price: 150000000,
        operating_cost: 23000,
        lease_per_quarter: 3700000,
        year_available: 1993
    },

    // Supersonic
    {
        name: 'Concorde',
        category: 'Supersonic',
        capacity: 100,
        range: 3900,
        price: 250000000,
        operating_cost: 35000,
        lease_per_quarter: 6000000,
        year_available: 1992
    },

    // Cargo
    {
        name: 'Boeing 747F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 112,
        range: 6800,
        price: 170000000,
        operating_cost: 24000,
        lease_per_quarter: 4200000,
        year_available: 1992
    },
    {
        name: 'Boeing 767F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 52,
        range: 5400,
        price: 95000000,
        operating_cost: 16000,
        lease_per_quarter: 2400000,
        year_available: 1995
    }
];

// Get available aircraft for a given year
export function getAvailableAircraft(year: number): AircraftType[] {
    return aircraftTypes.filter(aircraft => aircraft.year_available <= year);
}
