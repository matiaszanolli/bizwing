// Aircraft management subsystem

import { BaseManager } from './BaseManager';
import { AircraftType } from '../../data/aircraft';
import { CONFIG } from '../../utils/config';
import { generateId, formatMoney } from '../../utils/helpers';

export class AircraftManager extends BaseManager {
    /**
     * Get aircraft condition based on age
     */
    getAircraftCondition(age: number): 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'CRITICAL' {
        if (age <= CONFIG.AIRCRAFT_AGE_EXCELLENT) return 'EXCELLENT';
        if (age <= CONFIG.AIRCRAFT_AGE_GOOD) return 'GOOD';
        if (age <= CONFIG.AIRCRAFT_AGE_FAIR) return 'FAIR';
        if (age <= CONFIG.AIRCRAFT_AGE_POOR) return 'POOR';
        return 'CRITICAL';
    }

    /**
     * Get maintenance cost multiplier based on aircraft age
     */
    getMaintenanceMultiplier(age: number): number {
        const condition = this.getAircraftCondition(age);
        switch (condition) {
            case 'EXCELLENT': return CONFIG.MAINTENANCE_MULTIPLIER_EXCELLENT;
            case 'GOOD': return CONFIG.MAINTENANCE_MULTIPLIER_GOOD;
            case 'FAIR': return CONFIG.MAINTENANCE_MULTIPLIER_FAIR;
            case 'POOR': return CONFIG.MAINTENANCE_MULTIPLIER_POOR;
            case 'CRITICAL': return CONFIG.MAINTENANCE_MULTIPLIER_CRITICAL;
        }
    }

    /**
     * Get fuel efficiency multiplier based on aircraft age
     */
    getFuelEfficiencyMultiplier(age: number): number {
        const condition = this.getAircraftCondition(age);
        switch (condition) {
            case 'EXCELLENT': return CONFIG.FUEL_EFFICIENCY_EXCELLENT;
            case 'GOOD': return CONFIG.FUEL_EFFICIENCY_GOOD;
            case 'FAIR': return CONFIG.FUEL_EFFICIENCY_FAIR;
            case 'POOR': return CONFIG.FUEL_EFFICIENCY_POOR;
            case 'CRITICAL': return CONFIG.FUEL_EFFICIENCY_CRITICAL;
        }
    }

    /**
     * Buy or lease a new aircraft
     */
    buyAircraft(planeType: AircraftType, owned: boolean = true, customName?: string): { success: boolean; error?: string } {
        // If buying (owned), check if player can afford it
        if (owned && !this.state.canAfford(planeType.price)) {
            this.state.addNews('Insufficient funds to purchase aircraft!');
            return { success: false, error: 'Insufficient funds' };
        }

        // Deduct cost for owned aircraft
        if (owned) {
            this.state.cash -= planeType.price;
        }

        const newId = generateId();
        const aircraftName = customName || `Phoenix ${newId}`;

        this.state.fleet.push({
            id: newId,
            type: planeType,
            name: aircraftName,
            assigned_route: null,
            owned: owned,
            age: 0
        });

        if (owned) {
            this.state.addNews(`Purchased ${planeType.name} for $${formatMoney(planeType.price)}`);
        } else {
            this.state.addNews(`Leased ${planeType.name} for $${formatMoney(planeType.lease_per_quarter)}/quarter`);
        }

        return { success: true };
    }

    /**
     * Lease an aircraft (alias for buyAircraft with owned=false)
     */
    leaseAircraft(planeType: AircraftType): boolean {
        const result = this.buyAircraft(planeType, false);
        return result.success;
    }

    /**
     * Sell an owned aircraft
     */
    sellAircraft(aircraftId: number): { success: boolean; error?: string; amount?: number } {
        const aircraft = this.state.findAircraft(aircraftId);

        if (!aircraft) {
            return { success: false, error: 'Aircraft not found!' };
        }

        if (!aircraft.owned) {
            return { success: false, error: 'Cannot sell leased aircraft! (You can only return it)' };
        }

        if (aircraft.assigned_route) {
            return { success: false, error: 'Cannot sell aircraft assigned to a route! Remove it from the route first.' };
        }

        // Calculate resale value (depreciation based on age)
        const baseValue = aircraft.type.price;
        const depreciationRate = 0.10; // 10% per quarter
        const depreciationFactor = Math.pow(1 - depreciationRate, aircraft.age);
        const resaleValue = Math.floor(baseValue * depreciationFactor * 0.6); // Resale at 60% of depreciated value

        // Remove aircraft from fleet
        const aircraftIndex = this.state.fleet.findIndex(a => a.id === aircraftId);
        if (aircraftIndex !== -1) {
            this.state.fleet.splice(aircraftIndex, 1);
        }

        // Add cash from sale
        this.state.cash += resaleValue;

        this.state.addNews(`Sold ${aircraft.type.name} for $${formatMoney(resaleValue)}`);
        return { success: true, amount: resaleValue };
    }

    /**
     * Return a leased aircraft
     */
    returnLeasedAircraft(aircraftId: number): { success: boolean; error?: string } {
        const aircraft = this.state.findAircraft(aircraftId);

        if (!aircraft) {
            return { success: false, error: 'Aircraft not found!' };
        }

        if (aircraft.owned) {
            return { success: false, error: 'This aircraft is owned, not leased! Use "Sell" instead.' };
        }

        if (aircraft.assigned_route) {
            return { success: false, error: 'Cannot return aircraft assigned to a route! Remove it from the route first.' };
        }

        // Remove aircraft from fleet
        const aircraftIndex = this.state.fleet.findIndex(a => a.id === aircraftId);
        if (aircraftIndex !== -1) {
            this.state.fleet.splice(aircraftIndex, 1);
        }

        this.state.addNews(`Returned leased ${aircraft.type.name}`);
        return { success: true };
    }

    /**
     * Age all aircraft by one quarter
     */
    ageAllAircraft(): void {
        this.state.fleet.forEach(aircraft => {
            aircraft.age++;
        });
    }
}
