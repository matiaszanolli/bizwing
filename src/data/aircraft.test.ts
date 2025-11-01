// Aircraft Data Tests
import { describe, it, expect } from 'vitest';
import {
    aircraftTypes,
    getAvailableAircraft,
    getProductionStatus,
    getUpcomingAircraft,
    getEndingProductionAircraft
} from './aircraft';

describe('Aircraft Data', () => {
    describe('Aircraft Types', () => {
        it('should have at least 70 aircraft', () => {
            expect(aircraftTypes.length).toBeGreaterThanOrEqual(70);
        });

        it('should have all required fields', () => {
            aircraftTypes.forEach(aircraft => {
                expect(aircraft.name).toBeDefined();
                expect(aircraft.category).toBeDefined();
                // Cargo aircraft have capacity 0, but must have cargo_capacity
                if (aircraft.category === 'Cargo') {
                    expect(aircraft.capacity).toBe(0);
                    expect(aircraft.cargo_capacity).toBeGreaterThan(0);
                } else {
                    expect(aircraft.capacity).toBeGreaterThan(0);
                }
                expect(aircraft.range).toBeGreaterThan(0);
                expect(aircraft.price).toBeGreaterThan(0);
                expect(aircraft.operating_cost).toBeGreaterThan(0);
                expect(aircraft.lease_per_quarter).toBeGreaterThan(0);
                expect(aircraft.year_available).toBeGreaterThan(1950);
            });
        });

        it('should have realistic capacity ranges', () => {
            aircraftTypes.forEach(aircraft => {
                // Cargo aircraft have capacity 0
                if (aircraft.category !== 'Cargo') {
                    expect(aircraft.capacity).toBeGreaterThan(0);
                    expect(aircraft.capacity).toBeLessThan(1000);
                }
                // Cargo aircraft should have cargo_capacity
                if (aircraft.category === 'Cargo') {
                    expect(aircraft.cargo_capacity).toBeGreaterThan(0);
                    expect(aircraft.cargo_capacity).toBeLessThan(200);
                }
            });
        });

        it('should have realistic range values (in km)', () => {
            aircraftTypes.forEach(aircraft => {
                expect(aircraft.range).toBeGreaterThan(500);
                expect(aircraft.range).toBeLessThan(20000);
            });
        });

        it('should have lease price less than purchase price', () => {
            aircraftTypes.forEach(aircraft => {
                expect(aircraft.lease_per_quarter).toBeLessThan(aircraft.price);
            });
        });
    });

    describe('getAvailableAircraft', () => {
        it('should return aircraft available in 1955', () => {
            const available = getAvailableAircraft(1955);
            expect(available.length).toBeGreaterThan(0);

            available.forEach(aircraft => {
                expect(aircraft.year_available).toBeLessThanOrEqual(1955);
                if (aircraft.year_discontinued) {
                    expect(aircraft.year_discontinued).toBeGreaterThan(1955);
                }
            });
        });

        it('should return more aircraft in 1992 than 1955', () => {
            const available1955 = getAvailableAircraft(1955);
            const available1992 = getAvailableAircraft(1992);

            expect(available1992.length).toBeGreaterThan(available1955.length);
        });

        it('should not return aircraft from the future', () => {
            const available = getAvailableAircraft(1970);

            available.forEach(aircraft => {
                expect(aircraft.year_available).toBeLessThanOrEqual(1970);
            });
        });

        it('should not return discontinued aircraft', () => {
            const available = getAvailableAircraft(2010);

            available.forEach(aircraft => {
                if (aircraft.year_discontinued) {
                    expect(aircraft.year_discontinued).toBeGreaterThan(2010);
                }
            });
        });
    });

    describe('getProductionStatus', () => {
        it('should return "not-available" for future aircraft', () => {
            const boeing787 = aircraftTypes.find(a => a.name.includes('787'));
            if (boeing787) {
                const status = getProductionStatus(boeing787, 1990);
                expect(status).toBe('not-available');
            }
        });

        it('should return "coming-soon" for next year aircraft', () => {
            const aircraft = aircraftTypes.find(a => a.year_available === 1970);
            if (aircraft) {
                const status = getProductionStatus(aircraft, 1969);
                expect(status).toBe('coming-soon');
            }
        });

        it('should return "in-production" for current aircraft', () => {
            const aircraft = aircraftTypes.find(a =>
                a.year_available === 1970 &&
                (!a.year_discontinued || a.year_discontinued > 1975)
            );
            if (aircraft) {
                const status = getProductionStatus(aircraft, 1975);
                expect(status).toBe('in-production');
            }
        });

        it('should return "ending-soon" for aircraft ending next year', () => {
            const aircraft = aircraftTypes.find(a => a.year_discontinued === 1980);
            if (aircraft) {
                const status = getProductionStatus(aircraft, 1979);
                expect(status).toBe('ending-soon');
            }
        });

        it('should return "discontinued" for past aircraft', () => {
            const dc6 = aircraftTypes.find(a => a.name.includes('DC-6'));
            if (dc6 && dc6.year_discontinued) {
                const status = getProductionStatus(dc6, dc6.year_discontinued + 1);
                expect(status).toBe('discontinued');
            }
        });
    });

    describe('getUpcomingAircraft', () => {
        it('should return aircraft launching next year', () => {
            const upcoming = getUpcomingAircraft(1969);

            upcoming.forEach(aircraft => {
                expect(aircraft.year_available).toBe(1970);
            });
        });

        it('should return empty array if no aircraft launching next year', () => {
            const upcoming = getUpcomingAircraft(2100);
            expect(upcoming).toEqual([]);
        });

        it('should include all 1970 aircraft when querying 1969', () => {
            const upcoming = getUpcomingAircraft(1969);
            const aircraft1970 = aircraftTypes.filter(a => a.year_available === 1970);

            expect(upcoming.length).toBe(aircraft1970.length);
        });
    });

    describe('getEndingProductionAircraft', () => {
        it('should return aircraft ending production next year', () => {
            const ending = getEndingProductionAircraft(1979);

            ending.forEach(aircraft => {
                expect(aircraft.year_discontinued).toBe(1980);
                expect(aircraft.year_available).toBeLessThanOrEqual(1979);
            });
        });

        it('should return empty array if no aircraft ending next year', () => {
            const ending = getEndingProductionAircraft(2100);
            expect(ending).toEqual([]);
        });

        it('should only include aircraft currently in production', () => {
            const ending = getEndingProductionAircraft(1980);

            ending.forEach(aircraft => {
                expect(aircraft.year_available).toBeLessThanOrEqual(1980);
                expect(aircraft.year_discontinued).toBe(1981);
            });
        });
    });

    describe('Historical Accuracy', () => {
        it('should have Boeing 707 available in 1958', () => {
            const boeing707 = aircraftTypes.find(a => a.name.includes('707'));
            expect(boeing707).toBeDefined();
            if (boeing707) {
                expect(boeing707.year_available).toBe(1958);
            }
        });

        it('should have Boeing 747 available in 1970', () => {
            const boeing747 = aircraftTypes.find(a => a.name === 'Boeing 747-100');
            expect(boeing747).toBeDefined();
            if (boeing747) {
                expect(boeing747.year_available).toBe(1970);
            }
        });

        it('should have Concorde available in 1976', () => {
            const concorde = aircraftTypes.find(a => a.name.includes('Concorde'));
            expect(concorde).toBeDefined();
            if (concorde) {
                expect(concorde.year_available).toBe(1976);
                expect(concorde.category).toBe('Supersonic');
            }
        });

        it('should have A380 available in 2007', () => {
            const a380 = aircraftTypes.find(a => a.name.includes('A380'));
            expect(a380).toBeDefined();
            if (a380) {
                expect(a380.year_available).toBe(2007);
            }
        });

        it('should have Concorde discontinued in 2003', () => {
            const concorde = aircraftTypes.find(a => a.name.includes('Concorde'));
            expect(concorde).toBeDefined();
            if (concorde) {
                expect(concorde.year_discontinued).toBe(2003);
            }
        });
    });

    describe('Aircraft Categories', () => {
        it('should have regional aircraft', () => {
            const regional = aircraftTypes.filter(a => a.category === 'Regional');
            expect(regional.length).toBeGreaterThan(0);
        });

        it('should have narrow-body aircraft', () => {
            const narrowbody = aircraftTypes.filter(a => a.category === 'Narrow-body');
            expect(narrowbody.length).toBeGreaterThan(0);
        });

        it('should have wide-body aircraft', () => {
            const widebody = aircraftTypes.filter(a => a.category === 'Wide-body');
            expect(widebody.length).toBeGreaterThan(0);
        });

        it('should have jumbo aircraft', () => {
            const jumbo = aircraftTypes.filter(a => a.category === 'Jumbo');
            expect(jumbo.length).toBeGreaterThan(0);
        });

        it('should have cargo aircraft', () => {
            const cargo = aircraftTypes.filter(a => a.category === 'Cargo');
            expect(cargo.length).toBeGreaterThan(0);
        });

        it('should have supersonic aircraft', () => {
            const supersonic = aircraftTypes.filter(a => a.category === 'Supersonic');
            expect(supersonic.length).toBeGreaterThan(0);
        });

        it('should have cargo capacity for cargo aircraft', () => {
            const cargoAircraft = aircraftTypes.filter(a => a.category === 'Cargo');
            cargoAircraft.forEach(aircraft => {
                expect(aircraft.cargo_capacity).toBeDefined();
                expect(aircraft.cargo_capacity).toBeGreaterThan(0);
            });
        });
    });
});
