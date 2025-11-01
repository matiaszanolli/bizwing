// Post-Quarter Results Modal - Performance report with competitor rankings

import React from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    quarterRevenue: number;
    quarterExpenses: number;
    quarterProfit: number;
}

interface CompanyRanking {
    name: string;
    isPlayer: boolean;
    netWorth: number;
    rank: number;
}

export function PostQuarterResultsModal({
    isOpen,
    onClose,
    quarterRevenue,
    quarterExpenses,
    quarterProfit
}: Props) {
    const { state } = useGame();

    // Calculate player net worth (cash + asset value - debt)
    const playerAssetValue =
        state.fleet.length * 5000000 + // Simplified: ~$5M per aircraft
        state.getOwnedAirports().length * 10000000; // ~$10M per airport
    const playerNetWorth = state.cash + playerAssetValue - state.getTotalDebt();

    // Calculate competitor net worth (simplified simulation)
    const rankings: CompanyRanking[] = [
        {
            name: state.playerAirline,
            isPlayer: true,
            netWorth: playerNetWorth,
            rank: 0
        },
        ...state.competitors.map(comp => ({
            name: comp.name,
            isPlayer: false,
            netWorth: comp.cash + (comp.airports.length * 15000000), // Competitors have more valuable assets
            rank: 0
        }))
    ];

    // Sort by net worth and assign ranks
    rankings.sort((a, b) => b.netWorth - a.netWorth);
    rankings.forEach((company, idx) => {
        company.rank = idx + 1;
    });

    const playerRanking = rankings.find(r => r.isPlayer)!;
    const isFirst = playerRanking.rank === 1;
    const isLast = playerRanking.rank === rankings.length;

    // Recent news (last 5 items)
    const recentNews = state.newsLog.slice(-5).reverse();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`QUARTERLY REPORT - ${state.getDateString()}`}>
            <div className="post-quarter-results">
                <div className="results-section">
                    <h3>Financial Performance</h3>
                    <div className="status-grid">
                        <div className="status-row">
                            <span>Revenue:</span>
                            <span className="positive">+${formatMoney(quarterRevenue)}</span>
                        </div>
                        <div className="status-row">
                            <span>Expenses:</span>
                            <span className="negative">-${formatMoney(quarterExpenses)}</span>
                        </div>
                        <div className="status-row highlight">
                            <span>Net Profit/Loss:</span>
                            <span className={`amount-highlight ${quarterProfit >= 0 ? 'positive' : 'negative'}`}>
                                {quarterProfit >= 0 ? '+' : ''}${formatMoney(quarterProfit)}
                            </span>
                        </div>
                        <div className="status-row">
                            <span>Cash Balance:</span>
                            <span className={state.cash >= 0 ? 'positive' : 'negative'}>
                                ${formatMoney(state.cash)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="results-section">
                    <h3>Industry Rankings</h3>
                    <div className="rankings-table">
                        <div className="ranking-header">
                            <span className="rank-col">Rank</span>
                            <span className="company-col">Company</span>
                            <span className="value-col">Net Worth</span>
                        </div>
                        {rankings.map((company) => (
                            <div
                                key={company.name}
                                className={`ranking-row ${company.isPlayer ? 'player-row' : ''}`}
                            >
                                <span className="rank-col">
                                    {company.rank === 1 && '🏆 '}
                                    #{company.rank}
                                </span>
                                <span className="company-col">
                                    {company.name}
                                    {company.isPlayer && ' (YOU)'}
                                </span>
                                <span className="value-col">
                                    ${formatMoney(company.netWorth)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="ranking-commentary">
                        {isFirst && <p className="positive">🎉 You are leading the industry!</p>}
                        {!isFirst && !isLast && <p className="neutral">Keep pushing to reach #1!</p>}
                        {isLast && <p className="warning">⚠ Your airline is struggling. Take action!</p>}
                    </div>
                </div>

                <div className="results-section">
                    <h3>Recent Events</h3>
                    <div className="news-summary">
                        {recentNews.length === 0 ? (
                            <div className="empty-news">No recent events</div>
                        ) : (
                            recentNews.map((news, idx) => (
                                <div key={idx} className="news-summary-item">
                                    • {news}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
                        Continue
                    </button>
                </div>
            </div>
        </Modal>
    );
}
