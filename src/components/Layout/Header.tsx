// Game header component

import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';

export function Header() {
    const { state } = useGame();

    return (
        <header className="game-header">
            <h1>AEROBIZ SUPERSONIC</h1>
            <div className="game-info">
                <span className="quarter">Q{state.quarter} {state.year}</span>
                <span className="airline">{state.playerAirline} | Rep: {state.reputation}/100</span>
                <span className="cash">Cash: ${formatMoney(state.cash)}</span>
            </div>
        </header>
    );
}
