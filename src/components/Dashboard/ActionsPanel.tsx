// Actions panel with game controls

import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { BuyAircraftModal } from '../Modals/BuyAircraftModal';
import { CreateRouteModal } from '../Modals/CreateRouteModal';

export function ActionsPanel() {
    const { engine, forceUpdate } = useGame();
    const [showBuyAircraft, setShowBuyAircraft] = useState(false);
    const [showCreateRoute, setShowCreateRoute] = useState(false);

    const handleAdvanceTurn = () => {
        const result = engine.advanceTurn();
        forceUpdate();

        if (result.gameOver) {
            alert(`Game Over! Reason: ${result.reason}`);
        } else if (result.victory) {
            alert(`Victory! Your score: ${result.score}`);
        }
    };

    return (
        <>
            <div className="panel actions-panel">
                <h2>Actions</h2>
                <div className="button-group">
                    <button onClick={handleAdvanceTurn} className="btn-primary">
                        Advance Quarter
                    </button>
                    <button className="btn-secondary" onClick={() => setShowBuyAircraft(true)}>
                        Buy Aircraft
                    </button>
                    <button className="btn-secondary" onClick={() => setShowCreateRoute(true)}>
                        Create Route
                    </button>
                    <button className="btn-secondary" disabled>
                        Take Loan
                    </button>
                </div>
                <p className="help-text">
                    Create routes to start earning revenue!
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
        </>
    );
}
