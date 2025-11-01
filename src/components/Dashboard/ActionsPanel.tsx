// Actions panel with game controls

import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useKeyboard } from '../../hooks/useKeyboard';
import { BuyAircraftModal } from '../Modals/BuyAircraftModal';
import { CreateRouteModal } from '../Modals/CreateRouteModal';
import { BuyAirportSlotModal } from '../Modals/BuyAirportSlotModal';
import { TakeLoanModal } from '../Modals/TakeLoanModal';

export function ActionsPanel() {
    const { engine, forceUpdate } = useGame();
    const [showBuyAircraft, setShowBuyAircraft] = useState(false);
    const [showCreateRoute, setShowCreateRoute] = useState(false);
    const [showBuyAirport, setShowBuyAirport] = useState(false);
    const [showTakeLoan, setShowTakeLoan] = useState(false);

    const handleAdvanceTurn = () => {
        const result = engine.advanceTurn();
        forceUpdate();

        if (result.gameOver) {
            alert(`Game Over! Reason: ${result.reason}`);
        } else if (result.victory) {
            alert(`Victory! Your score: ${result.score}`);
        }
    };

    const closeAllModals = () => {
        setShowBuyAircraft(false);
        setShowCreateRoute(false);
        setShowBuyAirport(false);
        setShowTakeLoan(false);
    };

    // Keyboard shortcuts
    useKeyboard({
        ' ': handleAdvanceTurn,  // Space bar to advance turn
        'escape': closeAllModals  // ESC to close all modals
    });

    return (
        <>
            <div className="panel actions-panel">
                <h2>Actions</h2>
                <div className="button-group">
                    <button onClick={handleAdvanceTurn} className="btn-primary">
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
        </>
    );
}
