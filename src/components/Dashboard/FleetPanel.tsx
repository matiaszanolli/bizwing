// Fleet display panel

import React from 'react';
import { useGame } from '../../contexts/GameContext';

export function FleetPanel() {
    const { state } = useGame();

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
                    state.fleet.map(aircraft => (
                        <div key={aircraft.id} className="fleet-item">
                            <strong>{aircraft.name}</strong>
                            <div>{aircraft.type.name}</div>
                            <div className="fleet-details">
                                {aircraft.owned ? 'Owned' : 'Leased'} •
                                Age: {aircraft.age}Q •
                                {aircraft.assigned_route ? ' In use' : ' Available'}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
