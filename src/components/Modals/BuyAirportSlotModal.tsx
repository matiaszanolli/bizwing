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

type OwnershipFilter = 'available' | 'owned' | 'competitor' | 'all';
type MarketSizeFilter = 'all' | 'small' | 'medium' | 'large' | 'mega';

export function BuyAirportSlotModal({ isOpen, onClose }: Props) {
    const { engine, state, forceUpdate } = useGame();
    const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
    const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('available');
    const [marketSizeFilter, setMarketSizeFilter] = useState<MarketSizeFilter>('all');
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

    // Get airports based on ownership filter
    const baseFilteredAirports = useMemo(() => {
        switch (ownershipFilter) {
            case 'available':
                return state.airports.filter(airport => !airport.owned && !airport.competitor_owned);
            case 'owned':
                return state.airports.filter(airport => airport.owned);
            case 'competitor':
                return state.airports.filter(airport => airport.competitor_owned);
            case 'all':
                return state.airports;
        }
    }, [state.airports, ownershipFilter]);

    // Apply all filters
    const filteredAirports = useMemo(() => {
        let filtered = baseFilteredAirports;

        // Region filter
        if (selectedRegion !== 'All') {
            filtered = filtered.filter(airport => airport.region === selectedRegion);
        }

        // Market size filter
        if (marketSizeFilter !== 'all') {
            filtered = filtered.filter(airport => {
                const size = airport.market_size;
                switch (marketSizeFilter) {
                    case 'small': return size < 5000000;
                    case 'medium': return size >= 5000000 && size < 15000000;
                    case 'large': return size >= 15000000 && size < 30000000;
                    case 'mega': return size >= 30000000;
                    default: return true;
                }
            });
        }

        return filtered;
    }, [baseFilteredAirports, selectedRegion, marketSizeFilter]);

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
    const isSelectedAvailable = selectedAirport ? (!selectedAirport.owned && !selectedAirport.competitor_owned) : false;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Buy Airport Slot">
            <div className="airport-slot-purchase">
                {/* Filter Controls */}
                <div className="filter-controls">
                    {/* Ownership Filter */}
                    <div className="filter-group">
                        <label>Ownership:</label>
                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${ownershipFilter === 'available' ? 'active' : ''}`}
                                onClick={() => {
                                    setOwnershipFilter('available');
                                    setSelectedAirport(null);
                                }}
                            >
                                Available
                            </button>
                            <button
                                className={`filter-btn ${ownershipFilter === 'owned' ? 'active' : ''}`}
                                onClick={() => {
                                    setOwnershipFilter('owned');
                                    setSelectedAirport(null);
                                }}
                            >
                                Owned
                            </button>
                            <button
                                className={`filter-btn ${ownershipFilter === 'competitor' ? 'active' : ''}`}
                                onClick={() => {
                                    setOwnershipFilter('competitor');
                                    setSelectedAirport(null);
                                }}
                            >
                                Competitor
                            </button>
                            <button
                                className={`filter-btn ${ownershipFilter === 'all' ? 'active' : ''}`}
                                onClick={() => {
                                    setOwnershipFilter('all');
                                    setSelectedAirport(null);
                                }}
                            >
                                All
                            </button>
                        </div>
                    </div>

                    {/* Market Size Filter */}
                    <div className="filter-group">
                        <label>Market Size:</label>
                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${marketSizeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => {
                                    setMarketSizeFilter('all');
                                    setSelectedAirport(null);
                                }}
                            >
                                All
                            </button>
                            <button
                                className={`filter-btn ${marketSizeFilter === 'small' ? 'active' : ''}`}
                                onClick={() => {
                                    setMarketSizeFilter('small');
                                    setSelectedAirport(null);
                                }}
                                title="< 5M passengers/year"
                            >
                                Small
                            </button>
                            <button
                                className={`filter-btn ${marketSizeFilter === 'medium' ? 'active' : ''}`}
                                onClick={() => {
                                    setMarketSizeFilter('medium');
                                    setSelectedAirport(null);
                                }}
                                title="5M - 15M passengers/year"
                            >
                                Medium
                            </button>
                            <button
                                className={`filter-btn ${marketSizeFilter === 'large' ? 'active' : ''}`}
                                onClick={() => {
                                    setMarketSizeFilter('large');
                                    setSelectedAirport(null);
                                }}
                                title="15M - 30M passengers/year"
                            >
                                Large
                            </button>
                            <button
                                className={`filter-btn ${marketSizeFilter === 'mega' ? 'active' : ''}`}
                                onClick={() => {
                                    setMarketSizeFilter('mega');
                                    setSelectedAirport(null);
                                }}
                                title="> 30M passengers/year"
                            >
                                Mega
                            </button>
                        </div>
                    </div>

                    {/* Region Filter */}
                    <div className="filter-group">
                        <label>Region:</label>
                        <div className="filter-buttons region-buttons">
                            {regions.map(region => (
                                <button
                                    key={region}
                                    className={`filter-btn region-btn ${selectedRegion === region ? 'active' : ''}`}
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
                </div>

                {/* Airport List */}
                <div className="airport-list-section">
                    <h3>
                        {ownershipFilter === 'owned' && 'Your Airports'}
                        {ownershipFilter === 'competitor' && 'Competitor Airports'}
                        {ownershipFilter === 'available' && 'Available Airports'}
                        {ownershipFilter === 'all' && 'All Airports'}
                        {' '}({filteredAirports.length})
                    </h3>
                    {filteredAirports.length === 0 ? (
                        <div className="empty-message">
                            No airports match the selected filters.
                        </div>
                    ) : (
                        <div className="airport-grid">
                            {filteredAirports.map(airport => {
                                const price = airport.market_size * CONFIG.AIRPORT_PRICE_MULTIPLIER;
                                const affordable = state.canAfford(price);
                                const isAvailable = !airport.owned && !airport.competitor_owned;

                                return (
                                    <div
                                        key={airport.id}
                                        className={`airport-card ${selectedAirport?.id === airport.id ? 'selected' : ''} ${!affordable ? 'unaffordable' : ''} ${airport.owned ? 'owned' : ''} ${airport.competitor_owned ? 'competitor-owned' : ''}`}
                                        onClick={() => setSelectedAirport(airport)}
                                    >
                                        <div className="airport-card-header">
                                            <span className="airport-code">{airport.id}</span>
                                            {isAvailable ? (
                                                <span className="airport-price">${formatMoney(price)}</span>
                                            ) : (
                                                <span className="airport-status">
                                                    {airport.owned && '✓ OWNED'}
                                                    {airport.competitor_owned && '🔒 COMPETITOR'}
                                                </span>
                                            )}
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
                                        {isAvailable && !affordable && (
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

                        {isSelectedAvailable ? (
                            <>
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
                            </>
                        ) : (
                            <div className="info-text">
                                {selectedAirport?.owned && 'You already own this airport.'}
                                {selectedAirport?.competitor_owned && 'This airport is owned by a competitor.'}
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
