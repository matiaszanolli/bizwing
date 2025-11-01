// Hub Selection Modal - Choose your starting hub

import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { Airport, Continent, getAirportsByContinent } from '../../data/airports';
import { formatMoney } from '../../utils/helpers';

interface Props {
    isOpen: boolean;
    onConfirm: (selectedAirport: Airport) => void;
    onCancel: () => void;
}

// Continent ordering for display
const CONTINENT_ORDER: Continent[] = [
    'North America',
    'South America',
    'Europe',
    'Africa',
    'Asia',
    'Oceania'
];

// Get starting capital based on difficulty
function getStartingCapital(difficulty: 'Easy' | 'Medium' | 'Hard'): number {
    switch (difficulty) {
        case 'Easy': return 15000000;   // $15M
        case 'Medium': return 10000000;  // $10M
        case 'Hard': return 6000000;     // $6M
    }
}

// Get difficulty color
function getDifficultyColor(difficulty: 'Easy' | 'Medium' | 'Hard'): string {
    switch (difficulty) {
        case 'Easy': return '#00ff00';
        case 'Medium': return '#ffaa00';
        case 'Hard': return '#ff5500';
    }
}

export function HubSelectionModal({ isOpen, onConfirm, onCancel }: Props) {
    const [selectedContinent, setSelectedContinent] = useState<Continent>('North America');
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
    const [hoveredAirport, setHoveredAirport] = useState<Airport | null>(null);

    const airportsByContinent = useMemo(() => getAirportsByContinent(), []);

    const handleConfirm = () => {
        if (!selectedAirport) {
            alert('Please select a starting hub!');
            return;
        }
        onConfirm(selectedAirport);
    };

    const currentAirports = airportsByContinent[selectedContinent] || [];
    const displayAirport = hoveredAirport || selectedAirport;

    return (
        <Modal isOpen={isOpen} onClose={onCancel} title="CHOOSE YOUR STARTING HUB" size="large">
            <div className="hub-selection-modal">
                {/* Info Banner */}
                <div className="hub-info-banner">
                    <p>
                        <strong>Strategic Decision:</strong> Your starting hub determines your initial market position.
                        Choose wisely - established markets offer stability, while emerging markets promise growth potential.
                    </p>
                    <p className="info-hint">
                        Tourism affects leisure passenger demand | Business affects business class demand
                    </p>
                </div>

                {/* Main Layout */}
                <div className="hub-selection-content">
                    {/* Left: Continent Selector */}
                    <div className="continent-selector">
                        <h3>Continents</h3>
                        <div className="continent-list">
                            {CONTINENT_ORDER.map(continent => {
                                const airports = airportsByContinent[continent] || [];
                                const easyCount = airports.filter(a => a.difficulty === 'Easy').length;
                                const mediumCount = airports.filter(a => a.difficulty === 'Medium').length;
                                const hardCount = airports.filter(a => a.difficulty === 'Hard').length;

                                return (
                                    <div
                                        key={continent}
                                        className={`continent-item ${selectedContinent === continent ? 'selected' : ''}`}
                                        onClick={() => setSelectedContinent(continent)}
                                    >
                                        <div className="continent-name">{continent}</div>
                                        <div className="continent-stats">
                                            <span className="airport-count">{airports.length} airports</span>
                                            <div className="difficulty-breakdown">
                                                {easyCount > 0 && <span className="diff-dot easy" title={`${easyCount} Easy`}>{easyCount}</span>}
                                                {mediumCount > 0 && <span className="diff-dot medium" title={`${mediumCount} Medium`}>{mediumCount}</span>}
                                                {hardCount > 0 && <span className="diff-dot hard" title={`${hardCount} Hard`}>{hardCount}</span>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Middle: Airport List */}
                    <div className="airport-selector">
                        <h3>{selectedContinent} Hubs</h3>
                        <div className="airport-list">
                            {currentAirports.map(airport => {
                                const isSelected = selectedAirport?.id === airport.id;
                                const difficultyColor = getDifficultyColor(airport.difficulty);

                                return (
                                    <div
                                        key={airport.id}
                                        className={`airport-item ${isSelected ? 'selected' : ''} difficulty-${airport.difficulty.toLowerCase()}`}
                                        onClick={() => setSelectedAirport(airport)}
                                        onMouseEnter={() => setHoveredAirport(airport)}
                                        onMouseLeave={() => setHoveredAirport(null)}
                                    >
                                        <div className="airport-item-header">
                                            <div className="airport-name-section">
                                                <span className="airport-code">{airport.id}</span>
                                                <span className="airport-name">{airport.name}</span>
                                            </div>
                                            <span
                                                className="difficulty-badge"
                                                style={{ backgroundColor: difficultyColor }}
                                            >
                                                {airport.difficulty}
                                            </span>
                                        </div>
                                        <div className="airport-item-scores">
                                            <div className="score-item">
                                                <span className="score-icon">🏖️</span>
                                                <span className="score-value">{airport.tourism_score}</span>
                                            </div>
                                            <div className="score-item">
                                                <span className="score-icon">💼</span>
                                                <span className="score-value">{airport.business_score}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Airport Details */}
                    <div className="airport-details-panel">
                        {displayAirport ? (
                            <>
                                <div className="details-header">
                                    <h3>{displayAirport.name}</h3>
                                    <span className="airport-code-large">{displayAirport.id}</span>
                                </div>

                                <div className="details-section">
                                    <h4>Market Overview</h4>
                                    <div className="detail-row">
                                        <span>Country:</span>
                                        <span className="value">{displayAirport.country}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Market Size:</span>
                                        <span className="value">{(displayAirport.market_size / 1000000).toFixed(1)}M passengers/year</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Available Slots:</span>
                                        <span className="value">{displayAirport.slots_available} slots</span>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4>Economic Indicators</h4>

                                    <div className="indicator-bar-container">
                                        <div className="indicator-label">
                                            <span>🏖️ Tourism Score</span>
                                            <span className="indicator-value">{displayAirport.tourism_score}/100</span>
                                        </div>
                                        <div className="indicator-bar-background">
                                            <div
                                                className="indicator-bar tourism"
                                                style={{ width: `${displayAirport.tourism_score}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="indicator-bar-container">
                                        <div className="indicator-label">
                                            <span>💼 Business Score</span>
                                            <span className="indicator-value">{displayAirport.business_score}/100</span>
                                        </div>
                                        <div className="indicator-bar-background">
                                            <div
                                                className="indicator-bar business"
                                                style={{ width: `${displayAirport.business_score}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4>Starting Conditions</h4>
                                    <div
                                        className="difficulty-details"
                                        style={{ borderLeftColor: getDifficultyColor(displayAirport.difficulty) }}
                                    >
                                        <div className="difficulty-header">
                                            <span
                                                className="difficulty-badge-large"
                                                style={{ backgroundColor: getDifficultyColor(displayAirport.difficulty) }}
                                            >
                                                {displayAirport.difficulty}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Starting Capital:</span>
                                            <span className="value capital">${formatMoney(getStartingCapital(displayAirport.difficulty))}</span>
                                        </div>
                                        <div className="difficulty-description">
                                            {displayAirport.difficulty === 'Easy' &&
                                                'High demand markets with strong tourism and business fundamentals. Ideal for new players.'}
                                            {displayAirport.difficulty === 'Medium' &&
                                                'Balanced markets with moderate demand. Good opportunity for growth with moderate risk.'}
                                            {displayAirport.difficulty === 'Hard' &&
                                                'Emerging markets with growth potential. Lower starting capital but room for market development.'}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="no-selection">
                                <p className="no-selection-icon">🗺️</p>
                                <p className="no-selection-text">Select an airport to view details</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleConfirm}
                        disabled={!selectedAirport}
                    >
                        {selectedAirport ? `Start at ${selectedAirport.name}` : 'Select a Hub'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
