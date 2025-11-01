// Actions panel with game controls

import React from 'react';
import { useGame } from '../../contexts/GameContext';

export function ActionsPanel() {
    const { engine, forceUpdate } = useGame();

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
        <div className="panel actions-panel">
            <h2>Actions</h2>
            <div className="button-group">
                <button onClick={handleAdvanceTurn} className="btn-primary">
                    Advance Quarter
                </button>
                <button className="btn-secondary" disabled>
                    Buy Aircraft
                </button>
                <button className="btn-secondary" disabled>
                    Create Route
                </button>
                <button className="btn-secondary" disabled>
                    Take Loan
                </button>
            </div>
            <p className="help-text">
                Full UI coming soon! Click "Advance Quarter" to test the game engine.
            </p>
        </div>
    );
}
