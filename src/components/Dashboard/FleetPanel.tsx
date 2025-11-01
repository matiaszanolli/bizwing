// Fleet display panel

import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { ConfirmModal } from '../Modals/ConfirmModal';
import { Aircraft } from '../../models/types';

export function FleetPanel() {
    const { state, engine, forceUpdate } = useGame();
    const [aircraftToRemove, setAircraftToRemove] = useState<{ aircraft: Aircraft; type: 'sell' | 'return' } | null>(null);

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

                        return (
                            <div key={aircraft.id} className="fleet-item">
                                <strong>{aircraft.name}</strong>
                                <div>{aircraft.type.name}</div>
                                <div className="fleet-details">
                                    {aircraft.owned ? 'Owned' : 'Leased'} •
                                    Age: {aircraft.age}Q •
                                    {aircraft.assigned_route ? ' In use' : ' Available'}
                                </div>
                                {isAvailable && (
                                    <div className="fleet-actions">
                                        {aircraft.owned ? (
                                            <button
                                                className="btn-small btn-secondary"
                                                onClick={() => setAircraftToRemove({ aircraft, type: 'sell' })}
                                            >
                                                Sell (${formatMoney(resaleValue)})
                                            </button>
                                        ) : (
                                            <button
                                                className="btn-small btn-secondary"
                                                onClick={() => setAircraftToRemove({ aircraft, type: 'return' })}
                                            >
                                                Return Lease
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
