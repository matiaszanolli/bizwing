// New Game Setup Modal

import React, { useState } from 'react';
import { Modal } from './Modal';
import { DifficultyLevel, DIFFICULTY } from '../../utils/config';
import { formatMoney } from '../../utils/helpers';

interface Props {
    isOpen: boolean;
    onConfirm: (startYear: number, difficulty: DifficultyLevel, airlineName: string) => void;
    onCancel: () => void;
}

interface StartYearOption {
    year: number;
    era: string;
    description: string;
    aircraftCount: number;
}

const START_YEAR_OPTIONS: StartYearOption[] = [
    {
        year: 1955,
        era: 'Propeller Era',
        description: 'Start with propeller aircraft like the DC-6 and Constellation',
        aircraftCount: 3
    },
    {
        year: 1960,
        era: 'Early Jet Age',
        description: 'Experience the dawn of the jet age with the 707 and DC-8',
        aircraftCount: 9
    },
    {
        year: 1970,
        era: 'Wide-Body Revolution',
        description: 'The 747 jumbo jet changes aviation forever',
        aircraftCount: 14
    },
    {
        year: 1980,
        era: 'Modern Classics',
        description: 'Classic aircraft like the 767, A300, and MD-80 series',
        aircraftCount: 21
    },
    {
        year: 1992,
        era: 'Contemporary Era',
        description: 'Modern aircraft era with a wide variety of choices',
        aircraftCount: 49
    }
];

export function NewGameSetupModal({ isOpen, onConfirm, onCancel }: Props) {
    const [startYear, setStartYear] = useState(1992);
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('NORMAL');
    const [airlineName, setAirlineName] = useState('Phoenix Air');

    const handleConfirm = () => {
        if (airlineName.trim().length === 0) {
            alert('Please enter an airline name!');
            return;
        }
        onConfirm(startYear, difficulty, airlineName.trim());
    };

    const selectedYearOption = START_YEAR_OPTIONS.find(opt => opt.year === startYear)!;
    const difficultySettings = DIFFICULTY[difficulty];

    return (
        <Modal isOpen={isOpen} onClose={onCancel} title="NEW GAME SETUP">
            <div className="new-game-setup">
                {/* Airline Name */}
                <div className="setup-section">
                    <h3>Airline Name</h3>
                    <input
                        type="text"
                        className="airline-name-input"
                        value={airlineName}
                        onChange={(e) => setAirlineName(e.target.value)}
                        maxLength={30}
                        placeholder="Enter your airline name"
                    />
                </div>

                {/* Start Year Selection */}
                <div className="setup-section">
                    <h3>Starting Era</h3>
                    <div className="year-options">
                        {START_YEAR_OPTIONS.map(option => (
                            <div
                                key={option.year}
                                className={`year-option ${startYear === option.year ? 'selected' : ''}`}
                                onClick={() => setStartYear(option.year)}
                            >
                                <div className="year-option-header">
                                    <span className="year">{option.year}</span>
                                    <span className="era-badge">{option.era}</span>
                                </div>
                                <div className="year-option-description">
                                    {option.description}
                                </div>
                                <div className="year-option-stats">
                                    <span className="stat-item">
                                        ✈️ {option.aircraftCount} aircraft types available
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="year-info">
                        <p>
                            <strong>Selected:</strong> {selectedYearOption.year} - {selectedYearOption.era}
                        </p>
                        <p className="info-text">
                            New aircraft will become available as years progress.
                            Your goal is to reach $100M net worth by year {startYear + 10}.
                        </p>
                    </div>
                </div>

                {/* Difficulty Selection */}
                <div className="setup-section">
                    <h3>Difficulty</h3>
                    <div className="difficulty-buttons">
                        <button
                            className={`difficulty-btn ${difficulty === 'EASY' ? 'active easy' : ''}`}
                            onClick={() => setDifficulty('EASY')}
                        >
                            Easy
                        </button>
                        <button
                            className={`difficulty-btn ${difficulty === 'NORMAL' ? 'active normal' : ''}`}
                            onClick={() => setDifficulty('NORMAL')}
                        >
                            Normal
                        </button>
                        <button
                            className={`difficulty-btn ${difficulty === 'HARD' ? 'active hard' : ''}`}
                            onClick={() => setDifficulty('HARD')}
                        >
                            Hard
                        </button>
                    </div>

                    <div className="difficulty-details">
                        <div className="difficulty-row">
                            <span>Starting Cash:</span>
                            <span className="value">${formatMoney(difficultySettings.startingCash)}</span>
                        </div>
                        <div className="difficulty-row">
                            <span>Loan Interest Rate:</span>
                            <span className="value">{(difficultySettings.loanInterestRate * 100).toFixed(1)}% per quarter</span>
                        </div>
                        <div className="difficulty-row">
                            <span>Competitor Aggression:</span>
                            <span className="value">{(difficultySettings.competitorAggression * 100).toFixed(0)}%</span>
                        </div>
                        <div className="difficulty-row">
                            <span>Event Frequency:</span>
                            <span className="value">{(difficultySettings.eventProbability * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn-primary" onClick={handleConfirm}>
                        Start Game
                    </button>
                </div>
            </div>
        </Modal>
    );
}
