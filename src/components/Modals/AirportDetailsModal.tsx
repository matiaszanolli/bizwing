// AirportDetailsModal Component - Shows detailed information about an airport
import React from 'react';
import { Airport, airports } from '../../data/airports';
import { GameState } from '../../models/GameState';
import { formatMoney } from '../../utils/helpers';

interface AirportDetailsModalProps {
    airport: Airport;
    gameState: GameState;
    onClose: () => void;
}

export const AirportDetailsModal: React.FC<AirportDetailsModalProps> = ({
    airport,
    gameState,
    onClose
}) => {
    // Find routes connected to this airport
    const connectedRoutes = gameState.routes.filter(
        route => route.from === airport.id || route.to === airport.id
    );

    // Calculate total slots used at this airport
    const slotsUsed = connectedRoutes.length;
    const slotsAvailable = airport.slots_available - slotsUsed;

    // Find aircraft stationed at this airport
    const stationedAircraft = gameState.fleet.filter(
        aircraft => aircraft.assigned_route && (
            aircraft.assigned_route.from === airport.id ||
            aircraft.assigned_route.to === airport.id
        )
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{airport.name} ({airport.id})</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {/* Basic Information */}
                    <section className="airport-section">
                        <h3>Basic Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Location:</span>
                                <span className="value">{airport.country || airport.region}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Region:</span>
                                <span className="value">{airport.region}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Coordinates:</span>
                                <span className="value">{airport.lat.toFixed(2)}°, {airport.lon.toFixed(2)}°</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Ownership:</span>
                                <span className="value">
                                    {airport.owned ? (
                                        <span className="owned">✓ Owned by You</span>
                                    ) : airport.competitor_owned ? (
                                        <span className="competitor">Owned by {airport.competitor_owned}</span>
                                    ) : (
                                        <span className="available">Available</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Market Information */}
                    <section className="airport-section">
                        <h3>Market Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Market Size:</span>
                                <span className="value">{formatMoney(airport.market_size)} passengers/year</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Slots Available:</span>
                                <span className="value">
                                    {slotsAvailable} / {airport.slots_available}
                                    {slotsAvailable === 0 && <span className="warning"> (Full!)</span>}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="label">Slots Used:</span>
                                <span className="value">{slotsUsed}</span>
                            </div>
                        </div>
                    </section>

                    {/* Connected Routes */}
                    {connectedRoutes.length > 0 && (
                        <section className="airport-section">
                            <h3>Connected Routes ({connectedRoutes.length})</h3>
                            <div className="routes-list">
                                {connectedRoutes.map((route, index) => {
                                    const isOrigin = route.from === airport.id;
                                    const otherAirportId = isOrigin ? route.to : route.from;
                                    const otherAirport = airports.find(a => a.id === otherAirportId);

                                    if (!otherAirport) return null;

                                    return (
                                        <div key={index} className="route-item">
                                            <div className="route-info">
                                                <span className="route-direction">
                                                    {isOrigin ? '→' : '←'}
                                                </span>
                                                <span className="route-destination">
                                                    {otherAirport.name} ({otherAirport.id})
                                                </span>
                                                <span className="route-distance">
                                                    {route.distance}km
                                                </span>
                                            </div>
                                            {route.aircraft && (
                                                <div className="route-aircraft">
                                                    {route.aircraft.type.name} - {route.aircraft.name}
                                                </div>
                                            )}
                                            <div className="route-stats">
                                                <span>{route.flights_per_week} flights/week</span>
                                                {route.suspended && <span className="warning">(SUSPENDED)</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Stationed Aircraft */}
                    {stationedAircraft.length > 0 && (
                        <section className="airport-section">
                            <h3>Stationed Aircraft ({stationedAircraft.length})</h3>
                            <div className="aircraft-list">
                                {stationedAircraft.map(aircraft => (
                                    <div key={aircraft.id} className="aircraft-item">
                                        <span className="aircraft-name">{aircraft.name}</span>
                                        <span className="aircraft-type">{aircraft.type.name}</span>
                                        <span className="aircraft-age">Age: {aircraft.age} qtrs</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* No Activity Message */}
                    {connectedRoutes.length === 0 && stationedAircraft.length === 0 && airport.owned && (
                        <section className="airport-section">
                            <div className="no-activity">
                                <p>No routes or aircraft at this airport yet.</p>
                                <p>Create a route to start operations here!</p>
                            </div>
                        </section>
                    )}

                    {/* Purchase Option */}
                    {!airport.owned && !airport.competitor_owned && (
                        <section className="airport-section">
                            <div className="purchase-info">
                                <p className="info-message">
                                    This airport is available for purchase. Owning an airport reduces landing fees and increases slot availability.
                                </p>
                            </div>
                        </section>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
