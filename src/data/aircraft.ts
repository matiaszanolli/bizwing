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
    year_discontinued?: number; // Year production ended (undefined = still in production)
}

export const aircraftTypes: AircraftType[] = [
    // Classic Propeller Era (1955-1960s)
    {
        name: 'Douglas DC-6',
        category: 'Narrow-body',
        capacity: 102,
        range: 3800,
        price: 8000000,
        operating_cost: 6500,
        lease_per_quarter: 200000,
        year_available: 1955,
        year_discontinued: 1959
    },
    {
        name: 'Lockheed L-1049 Super Constellation',
        category: 'Narrow-body',
        capacity: 95,
        range: 3900,
        price: 9000000,
        operating_cost: 6800,
        lease_per_quarter: 220000,
        year_available: 1955,
        year_discontinued: 1958
    },
    {
        name: 'Vickers Viscount',
        category: 'Regional',
        capacity: 71,
        range: 1900,
        price: 5000000,
        operating_cost: 4500,
        lease_per_quarter: 150000,
        year_available: 1955,
        year_discontinued: 1964
    },

    // Early Jet Era (1958-1969)
    {
        name: 'Boeing 707-320',
        category: 'Narrow-body',
        capacity: 189,
        range: 6800,
        price: 15000000,
        operating_cost: 9500,
        lease_per_quarter: 400000,
        year_available: 1958,
        year_discontinued: 1979
    },
    {
        name: 'Douglas DC-8-50',
        category: 'Narrow-body',
        capacity: 189,
        range: 6300,
        price: 14000000,
        operating_cost: 9200,
        lease_per_quarter: 380000,
        year_available: 1960,
        year_discontinued: 1972
    },
    {
        name: 'Boeing 727-100',
        category: 'Narrow-body',
        capacity: 131,
        range: 2500,
        price: 11000000,
        operating_cost: 7500,
        lease_per_quarter: 300000,
        year_available: 1963,
        year_discontinued: 1984
    },
    {
        name: 'Boeing 727-200',
        category: 'Narrow-body',
        capacity: 189,
        range: 2900,
        price: 13000000,
        operating_cost: 8200,
        lease_per_quarter: 350000,
        year_available: 1967,
        year_discontinued: 1984
    },
    {
        name: 'Douglas DC-9-30',
        category: 'Narrow-body',
        capacity: 115,
        range: 2200,
        price: 10000000,
        operating_cost: 7000,
        lease_per_quarter: 280000,
        year_available: 1967,
        year_discontinued: 1982
    },
    {
        name: 'BAC One-Eleven',
        category: 'Regional',
        capacity: 89,
        range: 1900,
        price: 8000000,
        operating_cost: 5800,
        lease_per_quarter: 220000,
        year_available: 1965,
        year_discontinued: 1984
    },

    // Wide-body Revolution (1970-1979)
    {
        name: 'Boeing 747-100',
        category: 'Jumbo',
        capacity: 366,
        range: 6100,
        price: 120000000,
        operating_cost: 22000,
        lease_per_quarter: 3000000,
        year_available: 1970,
        year_discontinued: 1986
    },
    {
        name: 'McDonnell Douglas DC-10-10',
        category: 'Wide-body',
        capacity: 270,
        range: 6200,
        price: 95000000,
        operating_cost: 18000,
        lease_per_quarter: 2400000,
        year_available: 1971,
        year_discontinued: 1989
    },
    {
        name: 'Lockheed L-1011-1',
        category: 'Wide-body',
        capacity: 256,
        range: 5600,
        price: 90000000,
        operating_cost: 17500,
        lease_per_quarter: 2300000,
        year_available: 1972,
        year_discontinued: 1984
    },
    {
        name: 'Airbus A300B2',
        category: 'Wide-body',
        capacity: 266,
        range: 2900,
        price: 75000000,
        operating_cost: 14000,
        lease_per_quarter: 1900000,
        year_available: 1974,
        year_discontinued: 1984
    },
    {
        name: 'Boeing 747-200',
        category: 'Jumbo',
        capacity: 366,
        range: 6900,
        price: 140000000,
        operating_cost: 23000,
        lease_per_quarter: 3500000,
        year_available: 1971,
        year_discontinued: 1991
    },

    // 1980s Era
    {
        name: 'Boeing 767-200',
        category: 'Wide-body',
        capacity: 181,
        range: 4800,
        price: 65000000,
        operating_cost: 12000,
        lease_per_quarter: 1600000,
        year_available: 1982
    },
    {
        name: 'Airbus A310-200',
        category: 'Wide-body',
        capacity: 220,
        range: 4300,
        price: 70000000,
        operating_cost: 13000,
        lease_per_quarter: 1750000,
        year_available: 1983
    },
    {
        name: 'Boeing 737-200',
        category: 'Narrow-body',
        capacity: 130,
        range: 2650,
        price: 25000000,
        operating_cost: 7000,
        lease_per_quarter: 650000,
        year_available: 1968,
        year_discontinued: 1988
    },
    {
        name: 'Airbus A320-100',
        category: 'Narrow-body',
        capacity: 150,
        range: 3000,
        price: 35000000,
        operating_cost: 7800,
        lease_per_quarter: 850000,
        year_available: 1988
    },
    {
        name: 'McDonnell Douglas MD-81',
        category: 'Narrow-body',
        capacity: 155,
        range: 2900,
        price: 32000000,
        operating_cost: 7600,
        lease_per_quarter: 800000,
        year_available: 1980,
        year_discontinued: 1999
    },
    {
        name: 'Fokker F28',
        category: 'Regional',
        capacity: 85,
        range: 1700,
        price: 18000000,
        operating_cost: 5000,
        lease_per_quarter: 450000,
        year_available: 1969,
        year_discontinued: 1987
    },
    {
        name: 'BAe 146-200',
        category: 'Regional',
        capacity: 85,
        range: 2100,
        price: 20000000,
        operating_cost: 5200,
        lease_per_quarter: 500000,
        year_available: 1983
    },

    // Regional Jets (10 total)
    {
        name: 'ATR 42',
        category: 'Regional',
        capacity: 48,
        range: 1300,
        price: 12000000,
        operating_cost: 2800,
        lease_per_quarter: 350000,
        year_available: 1985
    },
    {
        name: 'ATR 72',
        category: 'Regional',
        capacity: 70,
        range: 1500,
        price: 16000000,
        operating_cost: 3200,
        lease_per_quarter: 450000,
        year_available: 1989
    },
    {
        name: 'Embraer ERJ-145',
        category: 'Regional',
        capacity: 50,
        range: 2400,
        price: 18000000,
        operating_cost: 3500,
        lease_per_quarter: 500000,
        year_available: 1996
    },
    {
        name: 'Bombardier CRJ-200',
        category: 'Regional',
        capacity: 50,
        range: 2100,
        price: 20000000,
        operating_cost: 3800,
        lease_per_quarter: 550000,
        year_available: 1996
    },
    {
        name: 'Bombardier CRJ-700',
        category: 'Regional',
        capacity: 70,
        range: 2100,
        price: 25000000,
        operating_cost: 4200,
        lease_per_quarter: 650000,
        year_available: 2001
    },
    {
        name: 'Embraer E170',
        category: 'Regional',
        capacity: 76,
        range: 3700,
        price: 28000000,
        operating_cost: 4500,
        lease_per_quarter: 700000,
        year_available: 2004
    },
    {
        name: 'Embraer E190',
        category: 'Regional',
        capacity: 100,
        range: 4200,
        price: 35000000,
        operating_cost: 5500,
        lease_per_quarter: 850000,
        year_available: 2005
    },
    {
        name: 'Bombardier CRJ-900',
        category: 'Regional',
        capacity: 90,
        range: 2400,
        price: 30000000,
        operating_cost: 4800,
        lease_per_quarter: 750000,
        year_available: 2003
    },
    {
        name: 'Fokker 70',
        category: 'Regional',
        capacity: 80,
        range: 2000,
        price: 22000000,
        operating_cost: 4000,
        lease_per_quarter: 600000,
        year_available: 1992,
        year_discontinued: 1997
    },
    {
        name: 'Fokker 100',
        category: 'Regional',
        capacity: 109,
        range: 1900,
        price: 28000000,
        operating_cost: 5000,
        lease_per_quarter: 700000,
        year_available: 1992,
        year_discontinued: 1997
    },

    // Narrow-body (12 total)
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
        name: 'Boeing 737-400',
        category: 'Narrow-body',
        capacity: 168,
        range: 2500,
        price: 38000000,
        operating_cost: 8200,
        lease_per_quarter: 950000,
        year_available: 1992
    },
    {
        name: 'Boeing 737-500',
        category: 'Narrow-body',
        capacity: 132,
        range: 2700,
        price: 33000000,
        operating_cost: 7800,
        lease_per_quarter: 850000,
        year_available: 1992
    },
    {
        name: 'Boeing 737-700',
        category: 'Narrow-body',
        capacity: 149,
        range: 3440,
        price: 45000000,
        operating_cost: 8700,
        lease_per_quarter: 1100000,
        year_available: 1998
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
    {
        name: 'Boeing 737-900ER',
        category: 'Narrow-body',
        capacity: 180,
        range: 3100,
        price: 55000000,
        operating_cost: 9500,
        lease_per_quarter: 1300000,
        year_available: 2007
    },
    {
        name: 'Airbus A319',
        category: 'Narrow-body',
        capacity: 134,
        range: 3800,
        price: 38000000,
        operating_cost: 8100,
        lease_per_quarter: 950000,
        year_available: 1996
    },
    {
        name: 'Airbus A320',
        category: 'Narrow-body',
        capacity: 150,
        range: 3300,
        price: 42000000,
        operating_cost: 8500,
        lease_per_quarter: 1000000,
        year_available: 1992
    },
    {
        name: 'Airbus A321',
        category: 'Narrow-body',
        capacity: 185,
        range: 3200,
        price: 52000000,
        operating_cost: 9300,
        lease_per_quarter: 1250000,
        year_available: 1994
    },
    {
        name: 'Boeing 757-200',
        category: 'Narrow-body',
        capacity: 200,
        range: 3900,
        price: 65000000,
        operating_cost: 11000,
        lease_per_quarter: 1500000,
        year_available: 1992,
        year_discontinued: 2004
    },
    {
        name: 'Boeing 757-300',
        category: 'Narrow-body',
        capacity: 243,
        range: 3400,
        price: 75000000,
        operating_cost: 12500,
        lease_per_quarter: 1750000,
        year_available: 1999,
        year_discontinued: 2004
    },
    {
        name: 'McDonnell Douglas MD-80',
        category: 'Narrow-body',
        capacity: 155,
        range: 2900,
        price: 36000000,
        operating_cost: 8400,
        lease_per_quarter: 900000,
        year_available: 1992,
        year_discontinued: 1999
    },

    // Wide-body (15 total)
    {
        name: 'Boeing 767-200ER',
        category: 'Wide-body',
        capacity: 181,
        range: 6400,
        price: 80000000,
        operating_cost: 14000,
        lease_per_quarter: 2000000,
        year_available: 1992
    },
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
        name: 'Boeing 767-400ER',
        category: 'Wide-body',
        capacity: 245,
        range: 5625,
        price: 105000000,
        operating_cost: 16500,
        lease_per_quarter: 2600000,
        year_available: 2000
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
        name: 'Boeing 777-200ER',
        category: 'Wide-body',
        capacity: 305,
        range: 9700,
        price: 180000000,
        operating_cost: 23500,
        lease_per_quarter: 4200000,
        year_available: 1997
    },
    {
        name: 'Boeing 777-300',
        category: 'Wide-body',
        capacity: 368,
        range: 7200,
        price: 190000000,
        operating_cost: 25000,
        lease_per_quarter: 4500000,
        year_available: 1998
    },
    {
        name: 'Boeing 777-300ER',
        category: 'Wide-body',
        capacity: 368,
        range: 9400,
        price: 210000000,
        operating_cost: 26500,
        lease_per_quarter: 5000000,
        year_available: 2004
    },
    {
        name: 'Airbus A330-200',
        category: 'Wide-body',
        capacity: 247,
        range: 7250,
        price: 125000000,
        operating_cost: 17500,
        lease_per_quarter: 3000000,
        year_available: 1998
    },
    {
        name: 'Airbus A330-300',
        category: 'Wide-body',
        capacity: 277,
        range: 6100,
        price: 135000000,
        operating_cost: 18500,
        lease_per_quarter: 3200000,
        year_available: 1993
    },
    {
        name: 'Airbus A340-200',
        category: 'Wide-body',
        capacity: 261,
        range: 8000,
        price: 145000000,
        operating_cost: 22000,
        lease_per_quarter: 3500000,
        year_available: 1993,
        year_discontinued: 2011
    },
    {
        name: 'Airbus A340-300',
        category: 'Wide-body',
        capacity: 295,
        range: 7400,
        price: 155000000,
        operating_cost: 23000,
        lease_per_quarter: 3700000,
        year_available: 1993,
        year_discontinued: 2011
    },
    {
        name: 'Airbus A340-500',
        category: 'Wide-body',
        capacity: 270,
        range: 9000,
        price: 175000000,
        operating_cost: 24500,
        lease_per_quarter: 4200000,
        year_available: 2002,
        year_discontinued: 2011
    },
    {
        name: 'Airbus A340-600',
        category: 'Wide-body',
        capacity: 380,
        range: 7900,
        price: 185000000,
        operating_cost: 26000,
        lease_per_quarter: 4500000,
        year_available: 2002,
        year_discontinued: 2011
    },
    {
        name: 'Airbus A350-900',
        category: 'Wide-body',
        capacity: 315,
        range: 8100,
        price: 220000000,
        operating_cost: 20000,
        lease_per_quarter: 5200000,
        year_available: 2015
    },
    {
        name: 'Boeing 787-8',
        category: 'Wide-body',
        capacity: 242,
        range: 7355,
        price: 200000000,
        operating_cost: 18000,
        lease_per_quarter: 4800000,
        year_available: 2011
    },

    // Jumbo/Ultra long-haul (3 total - 747-100 and 747-200 in earlier sections)
    {
        name: 'Boeing 747-300',
        category: 'Jumbo',
        capacity: 412,
        range: 6800,
        price: 165000000,
        operating_cost: 24500,
        lease_per_quarter: 4100000,
        year_available: 1983,
        year_discontinued: 1990
    },
    {
        name: 'Boeing 747-400',
        category: 'Jumbo',
        capacity: 416,
        range: 7200,
        price: 185000000,
        operating_cost: 25500,
        lease_per_quarter: 4600000,
        year_available: 1992
    },
    {
        name: 'Boeing 747-8',
        category: 'Jumbo',
        capacity: 467,
        range: 7730,
        price: 250000000,
        operating_cost: 26500,
        lease_per_quarter: 6000000,
        year_available: 2012
    },
    {
        name: 'Airbus A380',
        category: 'Jumbo',
        capacity: 544,
        range: 8200,
        price: 320000000,
        operating_cost: 32000,
        lease_per_quarter: 7500000,
        year_available: 2007
    },

    // Other Wide-body (DC-10 and L-1011 already in 1970s section)
    {
        name: 'McDonnell Douglas MD-11',
        category: 'Wide-body',
        capacity: 298,
        range: 6800,
        price: 120000000,
        operating_cost: 20000,
        lease_per_quarter: 3000000,
        year_available: 1990,
        year_discontinued: 2000
    },

    // Supersonic (1 total)
    {
        name: 'Concorde',
        category: 'Supersonic',
        capacity: 100,
        range: 3900,
        price: 250000000,
        operating_cost: 35000,
        lease_per_quarter: 6000000,
        year_available: 1976,
        year_discontinued: 2003
    },

    // Cargo (6 total)
    {
        name: 'Boeing 747-400F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 112,
        range: 6800,
        price: 175000000,
        operating_cost: 24500,
        lease_per_quarter: 4300000,
        year_available: 1993
    },
    {
        name: 'Boeing 747-8F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 134,
        range: 7730,
        price: 240000000,
        operating_cost: 26000,
        lease_per_quarter: 5800000,
        year_available: 2011
    },
    {
        name: 'Boeing 767-300F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 52,
        range: 5400,
        price: 100000000,
        operating_cost: 16500,
        lease_per_quarter: 2500000,
        year_available: 1995
    },
    {
        name: 'Boeing 777F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 103,
        range: 4900,
        price: 195000000,
        operating_cost: 23000,
        lease_per_quarter: 4700000,
        year_available: 2009
    },
    {
        name: 'McDonnell Douglas MD-11F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 91,
        range: 6800,
        price: 115000000,
        operating_cost: 20500,
        lease_per_quarter: 2900000,
        year_available: 1992
    },
    {
        name: 'Airbus A330-200F',
        category: 'Cargo',
        capacity: 0,
        cargo_capacity: 70,
        range: 4000,
        price: 130000000,
        operating_cost: 18000,
        lease_per_quarter: 3200000,
        year_available: 2010
    }
];

// Get available aircraft for a given year (introduced and still in production)
export function getAvailableAircraft(year: number): AircraftType[] {
    return aircraftTypes.filter(aircraft =>
        aircraft.year_available <= year &&
        (!aircraft.year_discontinued || aircraft.year_discontinued > year)
    );
}

// Get production status of an aircraft for a given year
export function getProductionStatus(aircraft: AircraftType, year: number): 'not-available' | 'coming-soon' | 'in-production' | 'ending-soon' | 'discontinued' {
    // Not yet available
    if (aircraft.year_available > year) {
        // Coming next year
        if (aircraft.year_available === year + 1) {
            return 'coming-soon';
        }
        return 'not-available';
    }

    // Already discontinued
    if (aircraft.year_discontinued && aircraft.year_discontinued <= year) {
        return 'discontinued';
    }

    // Will be discontinued next year
    if (aircraft.year_discontinued && aircraft.year_discontinued === year + 1) {
        return 'ending-soon';
    }

    // Currently in production
    return 'in-production';
}

// Get aircraft that will be introduced next year
export function getUpcomingAircraft(year: number): AircraftType[] {
    return aircraftTypes.filter(aircraft => aircraft.year_available === year + 1);
}

// Get aircraft that will be discontinued next year
export function getEndingProductionAircraft(year: number): AircraftType[] {
    return aircraftTypes.filter(aircraft =>
        aircraft.year_discontinued === year + 1 &&
        aircraft.year_available <= year
    );
}
