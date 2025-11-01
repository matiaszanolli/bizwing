// Create Route Modal

import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { formatMoney, calculateDistance } from '../../utils/helpers';
import { Airport } from '../../data/airports';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateRouteModal({ isOpen, onClose }: Props) {
    const { engine, state, forceUpdate } = useGame();
    const [fromAirport, setFromAirport] = useState<string>('');
    const [toAirport, setToAirport] = useState<string>('');
    const [selectedAircraft, setSelectedAircraft] = useState<number | null>(null);
    const [flightsPerWeek, setFlightsPerWeek] = useState(7);

    const availableAircraft = state.getAvailableAircraft();
    const ownedAirports = state.getOwnedAirports();

    // Calculate route details
    const routeDetails = useMemo(() => {
        if (!fromAirport || !toAirport || !selectedAircraft) return null;

        const from = state.findAirport(fromAirport);
        const to = state.findAirport(toAirport);
        const aircraft = state.findAircraft(selectedAircraft);

        if (!from || !to || !aircraft) return null;

        const distance = calculateDistance(from, to);
        const canReach = distance <= aircraft.type.range;

        return {
            from,
            to,
            aircraft,
            distance,
            canReach
        };
    }, [fromAirport, toAirport, selectedAircraft, state]);

    const handleCreate = () => {
        if (!fromAirport || !toAirport || !selectedAircraft) return;

        const result = engine.createRoute(fromAirport, toAirport, selectedAircraft, flightsPerWeek);

        if (result.success) {
            forceUpdate();
            // Reset form
            setFromAirport('');
            setToAirport('');
            setSelectedAircraft(null);
            setFlightsPerWeek(7);
            onClose();
        } else {
            alert(result.error);
        }
    };

    const canCreate = fromAirport && toAirport && selectedAircraft && routeDetails?.canReach;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Route">
            <div className="route-creation">
                {/* Step 1: Select Airports */}
                <div className="route-section">
                    <h3>1. Select Airports</h3>
                    <div className="airport-selectors">
                        <div className="selector-group">
                            <label>From:</label>
                            <select
                                value={fromAirport}
                                onChange={(e) => setFromAirport(e.target.value)}
                                className="airport-select"
                            >
                                <option value="">-- Select Origin --</option>
                                {state.airports.map(airport => (
                                    <option key={airport.id} value={airport.id}>
                                        {airport.id} - {airport.name} {airport.owned ? '(Owned)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="selector-group">
                            <label>To:</label>
                            <select
                                value={toAirport}
                                onChange={(e) => setToAirport(e.target.value)}
                                className="airport-select"
                            >
                                <option value="">-- Select Destination --</option>
                                {ownedAirports.map(airport => (
                                    <option key={airport.id} value={airport.id}>
                                        {airport.id} - {airport.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {ownedAirports.length === 1 && (
                        <div className="warning-text">
                            You only own 1 airport! Buy slots at other airports to create routes.
                        </div>
                    )}
                </div>

                {/* Step 2: Select Aircraft */}
                {fromAirport && toAirport && (
                    <div className="route-section">
                        <h3>2. Assign Aircraft</h3>
                        {availableAircraft.length === 0 ? (
                            <div className="warning-text">
                                No available aircraft! All aircraft are assigned to routes.
                            </div>
                        ) : (
                            <div className="aircraft-grid">
                                {availableAircraft.map(aircraft => {
                                    const distance = routeDetails?.distance || 0;
                                    const canReach = distance <= aircraft.type.range;

                                    return (
                                        <div
                                            key={aircraft.id}
                                            className={`aircraft-card ${selectedAircraft === aircraft.id ? 'selected' : ''} ${!canReach ? 'disabled' : ''}`}
                                            onClick={() => canReach && setSelectedAircraft(aircraft.id)}
                                        >
                                            <div className="aircraft-card-name">{aircraft.name}</div>
                                            <div className="aircraft-card-type">{aircraft.type.name}</div>
                                            <div className="aircraft-card-stats">
                                                <div>Capacity: {aircraft.type.capacity}</div>
                                                <div>Range: {aircraft.type.range}km</div>
                                                {!canReach && distance > 0 && (
                                                    <div className="error-text">Cannot reach ({distance}km)</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Set Frequency */}
                {selectedAircraft && routeDetails?.canReach && (
                    <div className="route-section">
                        <h3>3. Flight Frequency</h3>
                        <div className="frequency-control">
                            <label>Flights per week: {flightsPerWeek}</label>
                            <input
                                type="range"
                                min="1"
                                max="14"
                                value={flightsPerWeek}
                                onChange={(e) => setFlightsPerWeek(parseInt(e.target.value))}
                                className="frequency-slider"
                            />
                            <div className="frequency-labels">
                                <span>1 (Low)</span>
                                <span>7 (Daily)</span>
                                <span>14 (2x Daily)</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Route Summary */}
                {routeDetails && (
                    <div className="route-summary">
                        <h3>Route Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-row">
                                <span>Route:</span>
                                <span>{routeDetails.from.name} → {routeDetails.to.name}</span>
                            </div>
                            <div className="summary-row">
                                <span>Distance:</span>
                                <span>{routeDetails.distance} km</span>
                            </div>
                            <div className="summary-row">
                                <span>Aircraft:</span>
                                <span>{routeDetails.aircraft.name} ({routeDetails.aircraft.type.name})</span>
                            </div>
                            <div className="summary-row">
                                <span>Frequency:</span>
                                <span>{flightsPerWeek} flights/week</span>
                            </div>
                            <div className="summary-row">
                                <span>Operating Cost:</span>
                                <span>${formatMoney(routeDetails.aircraft.type.operating_cost * flightsPerWeek * 13)}/quarter</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="modal-actions">
                    <button
                        className="btn-primary"
                        onClick={handleCreate}
                        disabled={!canCreate}
                    >
                        Create Route
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}
