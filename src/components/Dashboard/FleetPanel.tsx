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
                    <p>No aircraft</p>
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
