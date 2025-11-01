// Financial Dashboard Panel

import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';

export function FinancialPanel() {
    const { state, engine } = useGame();

    // Calculate quarterly revenue
    const quarterlyRevenue = (state.routes || []).reduce((sum, route) => {
        return sum + engine.calculateRouteRevenue(route);
    }, 0);

    // Calculate quarterly expenses
    const operatingCosts = (state.routes || []).reduce((sum, route) => {
        return sum + (route.aircraft.type.operating_cost * route.flights_per_week * 13);
    }, 0);

    const leaseCosts = (state.aircraft || [])
        .filter(aircraft => aircraft.leased)
        .reduce((sum, aircraft) => sum + aircraft.type.lease_per_quarter, 0);

    const loanPayments = (state.loans || []).reduce((sum, loan) => sum + loan.quarterly_payment, 0);

    const totalExpenses = operatingCosts + leaseCosts + loanPayments + state.advertisingBudget;

    // Net profit
    const netProfit = quarterlyRevenue - totalExpenses;
    const profitMargin = quarterlyRevenue > 0 ? (netProfit / quarterlyRevenue) * 100 : 0;

    // Financial health
    const cashRunway = netProfit < 0 ? Math.floor(state.cash / Math.abs(netProfit)) : Infinity;
    const loans = state.loans || [];
    const debtToAssets = loans.length > 0
        ? loans.reduce((sum, loan) => sum + loan.remaining, 0) / (state.cash + quarterlyRevenue)
        : 0;

    return (
        <div className="panel financial-panel">
            <h2>Financial Dashboard</h2>

            {/* Current Quarter Projection */}
            <div className="financial-section">
                <h3 className="section-title">Current Quarter Projection</h3>
                <div className="financial-grid">
                    <div className="financial-row revenue-row">
                        <span>Revenue:</span>
                        <span className="positive">${formatMoney(quarterlyRevenue)}</span>
                    </div>
                    <div className="financial-row expense-row">
                        <span>Operating Costs:</span>
                        <span className="negative">-${formatMoney(operatingCosts)}</span>
                    </div>
                    {leaseCosts > 0 && (
                        <div className="financial-row expense-row">
                            <span>Lease Payments:</span>
                            <span className="negative">-${formatMoney(leaseCosts)}</span>
                        </div>
                    )}
                    {loanPayments > 0 && (
                        <div className="financial-row expense-row">
                            <span>Loan Payments:</span>
                            <span className="negative">-${formatMoney(loanPayments)}</span>
                        </div>
                    )}
                    {state.advertisingBudget > 0 && (
                        <div className="financial-row expense-row">
                            <span>Advertising:</span>
                            <span className="negative">-${formatMoney(state.advertisingBudget)}</span>
                        </div>
                    )}
                    <div className="financial-row total-row">
                        <span>Net Profit:</span>
                        <span className={netProfit >= 0 ? 'positive' : 'negative'}>
                            {netProfit >= 0 ? '+' : ''}{formatMoney(netProfit)}
                        </span>
                    </div>
                    <div className="financial-row">
                        <span>Profit Margin:</span>
                        <span className={profitMargin >= 0 ? 'positive' : 'negative'}>
                            {profitMargin.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Active Loans */}
            {loans.length > 0 && (
                <div className="financial-section">
                    <h3 className="section-title">Active Loans ({loans.length})</h3>
                    <div className="loans-list">
                        {loans.map((loan, index) => (
                            <div key={index} className="loan-item">
                                <div className="loan-header">
                                    <span className="loan-amount">${formatMoney(loan.original_amount)}</span>
                                    <span className="loan-remaining">{loan.quarters_remaining}Q left</span>
                                </div>
                                <div className="loan-details">
                                    <div className="loan-detail">
                                        <span>Remaining:</span>
                                        <span>${formatMoney(loan.remaining)}</span>
                                    </div>
                                    <div className="loan-detail">
                                        <span>Payment:</span>
                                        <span className="negative">${formatMoney(loan.quarterly_payment)}/Q</span>
                                    </div>
                                    <div className="loan-detail">
                                        <span>Rate:</span>
                                        <span>{(loan.interest_rate * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                                <div className="loan-progress">
                                    <div
                                        className="loan-progress-bar"
                                        style={{
                                            width: `${((loan.original_amount - loan.remaining) / loan.original_amount) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Financial Health Indicators */}
            <div className="financial-section">
                <h3 className="section-title">Financial Health</h3>
                <div className="health-grid">
                    <div className="health-indicator">
                        <span className="indicator-label">Cash Position:</span>
                        <span className={state.cash > 1000000 ? 'positive' : state.cash > 500000 ? 'warning' : 'negative'}>
                            ${formatMoney(state.cash)}
                        </span>
                    </div>
                    {netProfit < 0 && cashRunway !== Infinity && (
                        <div className="health-indicator">
                            <span className="indicator-label">Cash Runway:</span>
                            <span className={cashRunway > 4 ? 'warning' : 'negative'}>
                                {cashRunway} quarter{cashRunway !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                    {loans.length > 0 && (
                        <div className="health-indicator">
                            <span className="indicator-label">Debt Ratio:</span>
                            <span className={debtToAssets < 0.5 ? 'positive' : debtToAssets < 1 ? 'warning' : 'negative'}>
                                {(debtToAssets * 100).toFixed(0)}%
                            </span>
                        </div>
                    )}
                    <div className="health-indicator">
                        <span className="indicator-label">Reputation:</span>
                        <span className={state.reputation >= 75 ? 'positive' : state.reputation >= 50 ? 'warning' : 'negative'}>
                            {state.reputation}/100
                        </span>
                    </div>
                </div>
            </div>

            {/* Financial Alerts */}
            {(netProfit < 0 || cashRunway < 5 || state.cash < 500000) && (
                <div className="financial-alerts">
                    {netProfit < 0 && (
                        <div className="alert alert-warning">
                            ⚠ Negative cash flow! Review routes and reduce expenses.
                        </div>
                    )}
                    {cashRunway < 5 && cashRunway !== Infinity && (
                        <div className="alert alert-danger">
                            🚨 Low cash runway ({cashRunway}Q)! Take action immediately.
                        </div>
                    )}
                    {state.cash < 500000 && state.cash > 0 && (
                        <div className="alert alert-warning">
                            ⚠ Low cash reserves. Consider taking a loan.
                        </div>
                    )}
                </div>
            )}

            {/* Positive indicators */}
            {netProfit > 0 && loans.length === 0 && state.cash > 2000000 && (
                <div className="financial-alerts">
                    <div className="alert alert-success">
                        ✓ Strong financial position! Consider expansion.
                    </div>
                </div>
            )}
        </div>
    );
}
