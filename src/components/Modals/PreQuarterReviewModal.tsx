// Pre-Quarter Review Modal - "Ready to Advance?" confirmation

import React from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { CONFIG } from '../../utils/config';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function PreQuarterReviewModal({ isOpen, onClose, onConfirm }: Props) {
    const { engine, state } = useGame();

    // Calculate projected financials
    const projectedRevenue = engine.calculateQuarterlyRevenue();
    const projectedExpenses = engine.calculateQuarterlyExpenses();
    const projectedProfit = projectedRevenue - projectedExpenses;

    // Fleet analysis
    const availableAircraft = state.getAvailableAircraft();
    const totalAircraft = state.fleet.length;
    const utilization = totalAircraft > 0 ? ((totalAircraft - availableAircraft.length) / totalAircraft) * 100 : 0;

    // Route analysis
    const activeRoutes = state.routes.filter(r => !r.suspended);
    const suspendedRoutes = state.routes.filter(r => r.suspended);
    const unprofitableRoutes = activeRoutes.filter(route => {
        const revenue = engine.calculateRouteRevenue(route);
        const cost = route.aircraft.type.operating_cost * route.flights_per_week * 13;
        return revenue < cost;
    });

    // Warnings
    const warnings: string[] = [];
    if (state.cash < CONFIG.LOW_CASH_WARNING_THRESHOLD) {
        warnings.push(`Low cash reserves ($${formatMoney(state.cash)})`);
    }
    if (state.consecutiveLosses > 0) {
        warnings.push(`${state.consecutiveLosses} consecutive quarter${state.consecutiveLosses > 1 ? 's' : ''} of losses`);
    }
    if (availableAircraft.length > 0) {
        warnings.push(`${availableAircraft.length} idle aircraft (no routes assigned)`);
    }
    if (unprofitableRoutes.length > 0) {
        warnings.push(`${unprofitableRoutes.length} unprofitable route${unprofitableRoutes.length > 1 ? 's' : ''}`);
    }
    if (suspendedRoutes.length > 0) {
        warnings.push(`${suspendedRoutes.length} suspended route${suspendedRoutes.length > 1 ? 's' : ''}`);
    }

    const hasWarnings = warnings.length > 0;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="READY TO ADVANCE QUARTER?">
            <div className="pre-quarter-review">
                <div className="review-section">
                    <h3>Financial Outlook</h3>
                    <div className="status-grid">
                        <div className="status-row">
                            <span>Current Cash:</span>
                            <span className={state.cash < CONFIG.LOW_CASH_WARNING_THRESHOLD ? 'warning' : 'positive'}>
                                ${formatMoney(state.cash)}
                            </span>
                        </div>
                        <div className="status-row">
                            <span>Projected Revenue:</span>
                            <span className="positive">+${formatMoney(projectedRevenue)}</span>
                        </div>
                        <div className="status-row">
                            <span>Projected Expenses:</span>
                            <span className="negative">-${formatMoney(projectedExpenses)}</span>
                        </div>
                        <div className="status-row highlight">
                            <span>Projected Profit:</span>
                            <span className={projectedProfit >= 0 ? 'positive' : 'negative'}>
                                {projectedProfit >= 0 ? '+' : ''}${formatMoney(projectedProfit)}
                            </span>
                        </div>
                        <div className="status-row">
                            <span>Total Debt:</span>
                            <span className={state.getTotalDebt() > 0 ? 'warning' : 'neutral'}>
                                ${formatMoney(state.getTotalDebt())}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="review-section">
                    <h3>Operations Summary</h3>
                    <div className="status-grid">
                        <div className="status-row">
                            <span>Active Routes:</span>
                            <span>{activeRoutes.length}</span>
                        </div>
                        <div className="status-row">
                            <span>Fleet Size:</span>
                            <span>{totalAircraft} aircraft</span>
                        </div>
                        <div className="status-row">
                            <span>Fleet Utilization:</span>
                            <span className={utilization < 80 ? 'warning' : 'positive'}>
                                {utilization.toFixed(0)}%
                            </span>
                        </div>
                        <div className="status-row">
                            <span>Owned Airports:</span>
                            <span>{state.getOwnedAirports().length}</span>
                        </div>
                        <div className="status-row">
                            <span>Reputation:</span>
                            <span className={state.reputation >= CONFIG.STARTING_REPUTATION ? 'positive' : 'warning'}>
                                {state.reputation}
                            </span>
                        </div>
                    </div>
                </div>

                {hasWarnings && (
                    <div className="review-section">
                        <h3>Warnings & Alerts</h3>
                        <div className="financial-alerts">
                            {warnings.map((warning, idx) => (
                                <div key={idx} className="alert alert-warning">
                                    ⚠ {warning}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="help-text" style={{ marginTop: '12px', textAlign: 'center' }}>
                    Review your airline's status carefully before advancing the quarter.
                    {hasWarnings && ' Address warnings to improve performance.'}
                </div>

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Cancel - Keep Planning
                    </button>
                    <button className="btn-primary" onClick={onConfirm}>
                        Advance Quarter
                    </button>
                </div>
            </div>
        </Modal>
    );
}
