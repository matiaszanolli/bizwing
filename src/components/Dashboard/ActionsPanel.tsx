// Actions panel with game controls

import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useKeyboard } from '../../hooks/useKeyboard';
import { BuyAircraftModal } from '../Modals/BuyAircraftModal';
import { CreateRouteModal } from '../Modals/CreateRouteModal';
import { BuyAirportSlotModal } from '../Modals/BuyAirportSlotModal';
import { TakeLoanModal } from '../Modals/TakeLoanModal';
import { SaveLoadModal } from '../Modals/SaveLoadModal';
import { EmergencyLoanModal } from '../Modals/EmergencyLoanModal';
import { PreQuarterReviewModal } from '../Modals/PreQuarterReviewModal';
import { PostQuarterResultsModal } from '../Modals/PostQuarterResultsModal';
import { HelpModal } from '../Modals/HelpModal';
import { FirstTimeTutorialModal } from '../Modals/FirstTimeTutorialModal';
import { NewGameSetupModal } from '../Modals/NewGameSetupModal';
import { HubSelectionModal } from '../Modals/HubSelectionModal';
import { RouteManagerModal } from '../Modals/RouteManagerModal';
import { CONFIG, DifficultyLevel, DIFFICULTY } from '../../utils/config';
import { formatMoney } from '../../utils/helpers';
import { Airport } from '../../data/airports';

export function ActionsPanel() {
    const { engine, state, forceUpdate, startNewGame } = useGame();
    const [showBuyAircraft, setShowBuyAircraft] = useState(false);
    const [showCreateRoute, setShowCreateRoute] = useState(false);
    const [showBuyAirport, setShowBuyAirport] = useState(false);
    const [showTakeLoan, setShowTakeLoan] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const [showLoad, setShowLoad] = useState(false);
    const [showEmergencyLoan, setShowEmergencyLoan] = useState(false);
    const [showPreQuarterReview, setShowPreQuarterReview] = useState(false);
    const [showPostQuarterResults, setShowPostQuarterResults] = useState(false);
    const [quarterResults, setQuarterResults] = useState({ revenue: 0, expenses: 0, profit: 0 });
    const [showHelp, setShowHelp] = useState(false);
    const [showFirstTimeTutorial, setShowFirstTimeTutorial] = useState(false);
    const [showNewGameSetup, setShowNewGameSetup] = useState(false);
    const [showHubSelection, setShowHubSelection] = useState(false);
    const [showRouteManager, setShowRouteManager] = useState(false);
    const [newGameSettings, setNewGameSettings] = useState<{ startYear: number; difficulty: DifficultyLevel; airlineName: string } | null>(null);

    // Check if this is the first time playing
    React.useEffect(() => {
        const tutorialCompleted = localStorage.getItem('bizwing_tutorial_completed');
        if (!tutorialCompleted && state.quarter === 1 && state.year === CONFIG.STARTING_YEAR) {
            // Show tutorial on first load
            const timer = setTimeout(() => {
                setShowFirstTimeTutorial(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNewGame = (startYear: number, difficulty: DifficultyLevel, airlineName: string) => {
        if (confirm('Start a new game? Your current progress will be lost.')) {
            // Store settings and move to hub selection
            setNewGameSettings({ startYear, difficulty, airlineName });
            setShowNewGameSetup(false);
            setShowHubSelection(true);
        }
    };

    const handleHubSelection = (selectedHub: Airport) => {
        if (!newGameSettings) return;

        const { startYear, difficulty, airlineName } = newGameSettings;
        const difficultySettings = DIFFICULTY[difficulty];

        // Determine starting capital based on hub difficulty
        let startingCash = difficultySettings.startingCash;
        if (selectedHub.difficulty === 'Easy') {
            startingCash = 15000000; // $15M
        } else if (selectedHub.difficulty === 'Medium') {
            startingCash = 10000000; // $10M
        } else {
            startingCash = 6000000; // $6M
        }

        // Start the game
        startNewGame(startYear, startingCash, airlineName);

        // Mark the selected airport as hub and owned
        const airport = engine.getState().airports.find(a => a.id === selectedHub.id);
        if (airport) {
            airport.owned = true;
            airport.is_hub = true;
        }

        forceUpdate();
        setShowHubSelection(false);
        setNewGameSettings(null);

        // Clear tutorial flag to show it again
        localStorage.removeItem('bizwing_tutorial_completed');

        // Show tutorial after a short delay
        setTimeout(() => {
            setShowFirstTimeTutorial(true);
        }, 500);
    };

    const handleAdvanceTurnClick = () => {
        // Show pre-quarter review first
        setShowPreQuarterReview(true);
    };

    const handleConfirmAdvance = () => {
        setShowPreQuarterReview(false);

        // Calculate current quarter financials before advancing
        const revenue = engine.calculateQuarterlyRevenue();
        const expenses = engine.calculateQuarterlyExpenses();
        const profit = revenue - expenses;
        setQuarterResults({ revenue, expenses, profit });

        // Advance the turn
        const result = engine.advanceTurn();
        forceUpdate();

        // Handle special conditions first
        if (result.gameOver) {
            alert(`Game Over! Reason: ${result.reason}`);
            return;
        } else if (result.victory) {
            alert(`Victory! Your score: ${result.score}`);
            return;
        } else if (result.emergencyLoanRequired) {
            setShowEmergencyLoan(true);
            return;
        } else if (result.lowCashWarning) {
            alert(`WARNING: Cash reserves low ($${formatMoney(state.cash)})! You posted a loss this quarter. Take action to avoid bankruptcy!`);
        }

        // Show post-quarter results
        setShowPostQuarterResults(true);
    };

    const closeAllModals = () => {
        setShowBuyAircraft(false);
        setShowCreateRoute(false);
        setShowBuyAirport(false);
        setShowTakeLoan(false);
        setShowSave(false);
        setShowLoad(false);
        // Don't close emergency loan - player must make a choice
    };

    // Keyboard shortcuts
    useKeyboard({
        ' ': handleAdvanceTurnClick,  // Space bar to advance turn
        'escape': closeAllModals  // ESC to close all modals
    });

    return (
        <>
            <div className="panel actions-panel">
                <h2>Actions</h2>
                <div className="button-group">
                    <button onClick={handleAdvanceTurnClick} className="btn-primary">
                        Advance Quarter [Space]
                    </button>
                    <button className="btn-secondary" onClick={() => setShowBuyAircraft(true)}>
                        Buy Aircraft
                    </button>
                    <button className="btn-secondary" onClick={() => setShowCreateRoute(true)}>
                        Create Route
                    </button>
                    <button className="btn-secondary" onClick={() => setShowRouteManager(true)}>
                        Route Manager
                    </button>
                    <button className="btn-secondary" onClick={() => setShowBuyAirport(true)}>
                        Buy Airport Slot
                    </button>
                    <button className="btn-secondary" onClick={() => setShowTakeLoan(true)}>
                        Take Loan
                    </button>
                </div>

                <div className="button-group save-load-group">
                    <button className="btn-secondary" onClick={() => setShowNewGameSetup(true)}>
                        New Game
                    </button>
                    <button className="btn-secondary" onClick={() => setShowSave(true)}>
                        Save Game
                    </button>
                    <button className="btn-secondary" onClick={() => setShowLoad(true)}>
                        Load Game
                    </button>
                    <button className="btn-help" onClick={() => setShowHelp(true)} title="Help & Tutorial">
                        ?
                    </button>
                </div>

                <p className="help-text">
                    Create routes to start earning revenue! Press [Space] to advance turn, [ESC] to close dialogs.
                </p>
            </div>

            <BuyAircraftModal
                isOpen={showBuyAircraft}
                onClose={() => setShowBuyAircraft(false)}
            />
            <CreateRouteModal
                isOpen={showCreateRoute}
                onClose={() => setShowCreateRoute(false)}
            />
            <BuyAirportSlotModal
                isOpen={showBuyAirport}
                onClose={() => setShowBuyAirport(false)}
            />
            <TakeLoanModal
                isOpen={showTakeLoan}
                onClose={() => setShowTakeLoan(false)}
            />
            <SaveLoadModal
                isOpen={showSave}
                onClose={() => setShowSave(false)}
                mode="save"
            />
            <SaveLoadModal
                isOpen={showLoad}
                onClose={() => setShowLoad(false)}
                mode="load"
            />
            <EmergencyLoanModal
                isOpen={showEmergencyLoan}
                onClose={() => setShowEmergencyLoan(false)}
            />
            <PreQuarterReviewModal
                isOpen={showPreQuarterReview}
                onClose={() => setShowPreQuarterReview(false)}
                onConfirm={handleConfirmAdvance}
            />
            <PostQuarterResultsModal
                isOpen={showPostQuarterResults}
                onClose={() => setShowPostQuarterResults(false)}
                quarterRevenue={quarterResults.revenue}
                quarterExpenses={quarterResults.expenses}
                quarterProfit={quarterResults.profit}
            />
            <HelpModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
            />
            <FirstTimeTutorialModal
                isOpen={showFirstTimeTutorial}
                onClose={() => setShowFirstTimeTutorial(false)}
            />
            <NewGameSetupModal
                isOpen={showNewGameSetup}
                onConfirm={handleNewGame}
                onCancel={() => setShowNewGameSetup(false)}
            />
            <HubSelectionModal
                isOpen={showHubSelection}
                onConfirm={handleHubSelection}
                onCancel={() => {
                    setShowHubSelection(false);
                    setNewGameSettings(null);
                    setShowNewGameSetup(true); // Go back to game setup
                }}
            />
            <RouteManagerModal
                isOpen={showRouteManager}
                onClose={() => setShowRouteManager(false)}
            />
        </>
    );
}
