// Buy Airport Slot Modal

import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { CONFIG } from '../../utils/config';
import type { Airport, Region } from '../../data/airports';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function BuyAirportSlotModal({ isOpen, onClose }: Props) {
    const { engine, state, forceUpdate } = useGame();
    const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

    // Get available airports (not owned, not competitor owned)
    const availableAirports = useMemo(() => {
        return state.airports.filter(airport =>
            !airport.owned && !airport.competitor_owned
        );
    }, [state.airports]);

    // Filter by region
    const filteredAirports = useMemo(() => {
        if (selectedRegion === 'All') return availableAirports;
        return availableAirports.filter(airport => airport.region === selectedRegion);
    }, [availableAirports, selectedRegion]);

    // Get unique regions
    const regions: (Region | 'All')[] = ['All', 'North America', 'Europe', 'Asia', 'Middle East', 'Africa', 'Oceania', 'South America'];

    const handleBuy = () => {
        if (!selectedAirport) return;

        if (engine.buyAirportSlot(selectedAirport)) {
            forceUpdate();
            setSelectedAirport(null);
            onClose();
        } else {
            // Error message already added to news by engine
            forceUpdate();
        }
    };

    const slotPrice = selectedAirport ? selectedAirport.market_size * CONFIG.AIRPORT_PRICE_MULTIPLIER : 0;
    const canAfford = selectedAirport ? state.canAfford(slotPrice) : false;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Buy Airport Slot">
            <div className="airport-slot-purchase">
                {/* Region Filter */}
                <div className="region-filter">
                    <label>Filter by Region:</label>
                    <div className="region-buttons">
                        {regions.map(region => (
                            <button
                                key={region}
                                className={`region-btn ${selectedRegion === region ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedRegion(region);
                                    setSelectedAirport(null);
                                }}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Airport List */}
                <div className="airport-list-section">
                    <h3>Available Airports ({filteredAirports.length})</h3>
                    {filteredAirports.length === 0 ? (
                        <div className="empty-message">
                            {availableAirports.length === 0
                                ? 'No airports available for purchase!'
                                : 'No airports in this region.'}
                        </div>
                    ) : (
                        <div className="airport-grid">
                            {filteredAirports.map(airport => {
                                const price = airport.market_size * CONFIG.AIRPORT_PRICE_MULTIPLIER;
                                const affordable = state.canAfford(price);

                                return (
                                    <div
                                        key={airport.id}
                                        className={`airport-card ${selectedAirport?.id === airport.id ? 'selected' : ''} ${!affordable ? 'unaffordable' : ''}`}
                                        onClick={() => setSelectedAirport(airport)}
                                    >
                                        <div className="airport-card-header">
                                            <span className="airport-code">{airport.id}</span>
                                            <span className="airport-price">${formatMoney(price)}</span>
                                        </div>
                                        <div className="airport-card-name">{airport.name}</div>
                                        <div className="airport-card-stats">
                                            <div className="stat">
                                                <span className="stat-label">Region:</span>
                                                <span>{airport.region}</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-label">Market:</span>
                                                <span>{(airport.market_size / 1000).toFixed(0)}K</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-label">Slots:</span>
                                                <span>{airport.slots_available}</span>
                                            </div>
                                        </div>
                                        {!affordable && (
                                            <div className="insufficient-funds">Insufficient funds</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Selected Airport Details */}
                {selectedAirport && (
                    <div className="airport-details-panel">
                        <h3>Purchase Details</h3>
                        <div className="detail-grid">
                            <div className="detail-row">
                                <span>Airport:</span>
                                <span>{selectedAirport.name} ({selectedAirport.id})</span>
                            </div>
                            <div className="detail-row">
                                <span>Region:</span>
                                <span>{selectedAirport.region}</span>
                            </div>
                            <div className="detail-row">
                                <span>Market Size:</span>
                                <span>{formatMoney(selectedAirport.market_size)} passengers/year</span>
                            </div>
                            <div className="detail-row">
                                <span>Available Slots:</span>
                                <span>{selectedAirport.slots_available}</span>
                            </div>
                            <div className="detail-row highlight">
                                <span>Slot Price:</span>
                                <span className="price-highlight">${formatMoney(slotPrice)}</span>
                            </div>
                            <div className="detail-row">
                                <span>Your Cash:</span>
                                <span className={canAfford ? 'positive' : 'negative'}>
                                    ${formatMoney(state.cash)}
                                </span>
                            </div>
                        </div>

                        <div className="purchase-actions">
                            <button
                                className="btn-primary"
                                onClick={handleBuy}
                                disabled={!canAfford}
                            >
                                {canAfford ? 'Purchase Slot' : 'Insufficient Funds'}
                            </button>
                        </div>

                        {!canAfford && (
                            <div className="warning-text">
                                You need ${formatMoney(slotPrice - state.cash)} more to purchase this slot.
                            </div>
                        )}
                    </div>
                )}

                {/* Help Text */}
                {!selectedAirport && (
                    <div className="help-text">
                        Select an airport to view details and purchase a slot. Airport slots allow you to create routes to and from that location.
                    </div>
                )}
            </div>
        </Modal>
    );
}
