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
import { CONFIG } from '../../utils/config';
import { formatMoney } from '../../utils/helpers';

export function ActionsPanel() {
    const { engine, state, forceUpdate } = useGame();
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
                    <button className="btn-secondary" onClick={() => setShowBuyAirport(true)}>
                        Buy Airport Slot
                    </button>
                    <button className="btn-secondary" onClick={() => setShowTakeLoan(true)}>
                        Take Loan
                    </button>
                </div>

                <div className="button-group save-load-group">
                    <button className="btn-secondary" onClick={() => setShowSave(true)}>
                        Save Game
                    </button>
                    <button className="btn-secondary" onClick={() => setShowLoad(true)}>
                        Load Game
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
        </>
    );
}
