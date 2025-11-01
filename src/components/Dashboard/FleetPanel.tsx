// Fleet display panel

import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { ConfirmModal } from '../Modals/ConfirmModal';
import { Aircraft } from '../../models/types';

export function FleetPanel() {
    const { state, engine, forceUpdate } = useGame();
    const [aircraftToRemove, setAircraftToRemove] = useState<{ aircraft: Aircraft; type: 'sell' | 'return' } | null>(null);

    const getConditionInfo = (age: number): { condition: string; color: string; icon: string } => {
        const condition = engine.getAircraftCondition(age);
        switch (condition) {
            case 'EXCELLENT':
                return { condition: 'Excellent', color: '#00ff00', icon: '●' };
            case 'GOOD':
                return { condition: 'Good', color: '#7fff00', icon: '●' };
            case 'FAIR':
                return { condition: 'Fair', color: '#ffaa00', icon: '●' };
            case 'POOR':
                return { condition: 'Poor', color: '#ff5500', icon: '⚠' };
            case 'CRITICAL':
                return { condition: 'Critical', color: '#ff0000', icon: '⚠' };
        }
    };

    const handleRemoveAircraft = () => {
        if (aircraftToRemove) {
            const { aircraft, type } = aircraftToRemove;
            let result;

            if (type === 'sell') {
                result = engine.sellAircraft(aircraft.id);
            } else {
                result = engine.returnLeasedAircraft(aircraft.id);
            }

            if (result.success) {
                forceUpdate();
            } else if (result.error) {
                alert(result.error);
            }

            setAircraftToRemove(null);
        }
    };

    const calculateResaleValue = (aircraft: Aircraft): number => {
        if (!aircraft.owned) return 0;
        const baseValue = aircraft.type.price;
        const depreciationRate = 0.10;
        const depreciationFactor = Math.pow(1 - depreciationRate, aircraft.age);
        return Math.floor(baseValue * depreciationFactor * 0.6);
    };

    return (
        <div className="panel fleet-panel">
            <h2>Fleet ({state.fleet.length})</h2>
            <div className="fleet-list">
                {state.fleet.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-icon">✈️</p>
                        <p className="empty-title">No Aircraft in Fleet</p>
                        <p className="empty-hint">Click "Buy Aircraft" below to purchase or lease your first plane and start building your airline empire!</p>
                    </div>
                ) : (
                    state.fleet.map(aircraft => {
                        const resaleValue = calculateResaleValue(aircraft);
                        const isAvailable = !aircraft.assigned_route;
                        const ageYears = Math.floor(aircraft.age / 4);
                        const conditionInfo = getConditionInfo(ageYears);
                        const maintenanceMultiplier = engine.getMaintenanceMultiplier(ageYears);
                        const fuelEfficiency = engine.getFuelEfficiencyMultiplier(ageYears);

                        // Calculate condition percentage for progress bar
                        const maxAge = 100; // Maximum practical age in years
                        const conditionPercentage = Math.max(0, Math.min(100, ((maxAge - ageYears) / maxAge) * 100));

                        // Get aircraft type icon
                        const getAircraftIcon = (typeName: string): string => {
                            if (typeName.includes('Regional')) return '🛩';
                            if (typeName.includes('Narrow')) return '✈';
                            if (typeName.includes('Wide')) return '🛫';
                            if (typeName.includes('Super')) return '🛬';
                            return '✈';
                        };

                        return (
                            <div key={aircraft.id} className={`aircraft-card ${!isAvailable ? 'in-use' : ''} ${aircraft.owned ? 'owned' : 'leased'}`}>
                                {/* Aircraft Header */}
                                <div className="aircraft-card-header">
                                    <div className="aircraft-icon-section">
                                        <span className="aircraft-icon">{getAircraftIcon(aircraft.type.name)}</span>
                                        <div className="aircraft-title-section">
                                            <div className="aircraft-name">{aircraft.name}</div>
                                            <div className="aircraft-type">{aircraft.type.name}</div>
                                        </div>
                                    </div>
                                    <div className="aircraft-status-badges">
                                        {aircraft.owned ? (
                                            <span className="ownership-badge owned">OWNED</span>
                                        ) : (
                                            <span className="ownership-badge leased">LEASED</span>
                                        )}
                                        {!isAvailable && (
                                            <span className="status-badge active">ACTIVE</span>
                                        )}
                                    </div>
                                </div>

                                {/* Condition Bar */}
                                <div className="condition-bar-container">
                                    <div className="condition-bar-header">
                                        <span className="condition-label">CONDITION</span>
                                        <span className="condition-value" style={{ color: conditionInfo.color }}>
                                            {conditionInfo.icon} {conditionInfo.condition}
                                        </span>
                                    </div>
                                    <div className="condition-bar-background">
                                        <div
                                            className={`condition-bar ${conditionInfo.condition.toLowerCase()}`}
                                            style={{ width: `${conditionPercentage}%` }}
                                        >
                                            <div className="condition-bar-shine"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Aircraft Stats Grid */}
                                <div className="aircraft-stats-grid">
                                    <div className="aircraft-stat">
                                        <span className="stat-label">Age</span>
                                        <span className="stat-value">{ageYears} years</span>
                                        <span className="stat-subvalue">{aircraft.age} quarters</span>
                                    </div>
                                    {aircraft.assigned_route && (
                                        <div className="aircraft-stat">
                                            <span className="stat-label">Route</span>
                                            <span className="stat-value">
                                                {aircraft.assigned_route.from} → {aircraft.assigned_route.to}
                                            </span>
                                        </div>
                                    )}
                                    {ageYears > 0 && (
                                        <>
                                            <div className="aircraft-stat">
                                                <span className="stat-label">Maintenance</span>
                                                <span className="stat-value degraded">
                                                    +{((maintenanceMultiplier - 1) * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                            <div className="aircraft-stat">
                                                <span className="stat-label">Fuel Cost</span>
                                                <span className="stat-value degraded">
                                                    +{((fuelEfficiency - 1) * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Aircraft Actions */}
                                {isAvailable && (
                                    <div className="aircraft-card-actions">
                                        {aircraft.owned ? (
                                            <button
                                                className="btn-small btn-warning"
                                                onClick={() => setAircraftToRemove({ aircraft, type: 'sell' })}
                                            >
                                                💰 Sell ${formatMoney(resaleValue)}
                                            </button>
                                        ) : (
                                            <button
                                                className="btn-small btn-secondary"
                                                onClick={() => setAircraftToRemove({ aircraft, type: 'return' })}
                                            >
                                                ↩ Return Lease
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            <ConfirmModal
                isOpen={aircraftToRemove !== null}
                onClose={() => setAircraftToRemove(null)}
                onConfirm={handleRemoveAircraft}
                title={aircraftToRemove?.type === 'sell' ? 'Sell Aircraft?' : 'Return Leased Aircraft?'}
                message={
                    aircraftToRemove
                        ? aircraftToRemove.type === 'sell'
                            ? `Are you sure you want to sell ${aircraftToRemove.aircraft.name} (${aircraftToRemove.aircraft.type.name})? You will receive $${formatMoney(calculateResaleValue(aircraftToRemove.aircraft))}.`
                            : `Are you sure you want to return ${aircraftToRemove.aircraft.name} (${aircraftToRemove.aircraft.type.name})? This will end your lease agreement.`
                        : ''
                }
                confirmText={aircraftToRemove?.type === 'sell' ? 'Sell Aircraft' : 'Return Lease'}
                isDestructive={false}
            />
        </div>
    );
}
