// Take Loan Modal

import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { ConfirmDialog } from './ConfirmDialog';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { CONFIG } from '../../utils/config';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// Preset loan options
const LOAN_PRESETS = [
    { label: 'Small', amount: 500000 },
    { label: 'Medium', amount: 1000000 },
    { label: 'Large', amount: 2500000 },
    { label: 'Very Large', amount: 5000000 },
];

const QUARTER_OPTIONS = [4, 8, 12, 16, 20];

export function TakeLoanModal({ isOpen, onClose }: Props) {
    const { engine, state, forceUpdate } = useGame();
    const [amount, setAmount] = useState(1000000);
    const [quarters, setQuarters] = useState(8);
    const [showConfirm, setShowConfirm] = useState(false);

    // Calculate loan details
    const loanDetails = useMemo(() => {
        const interestRate = CONFIG.LOAN_INTEREST_RATE;
        const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));
        const totalPayment = quarterlyPayment * quarters;
        const totalInterest = totalPayment - amount;

        return {
            quarterlyPayment,
            totalPayment,
            totalInterest,
            interestRate
        };
    }, [amount, quarters]);

    const handleTakeLoan = () => {
        if (engine.takeLoan(amount, quarters)) {
            forceUpdate();
            onClose();
            // Reset to defaults
            setAmount(1000000);
            setQuarters(8);
            setShowConfirm(false);
        }
    };

    const handlePresetClick = (presetAmount: number) => {
        setAmount(presetAmount);
    };

    const handleAcceptLoanClick = () => {
        setShowConfirm(true);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Take Loan">
            <div className="loan-modal">
                {/* Current Financial Status */}
                <div className="current-status">
                    <h3>Current Financial Status</h3>
                    <div className="status-grid">
                        <div className="status-row">
                            <span>Cash on Hand:</span>
                            <span className="positive">${formatMoney(state.cash)}</span>
                        </div>
                        <div className="status-row">
                            <span>Existing Loans:</span>
                            <span className={state.loans.length > 0 ? 'warning' : ''}>{state.loans.length}</span>
                        </div>
                        {state.loans.length > 0 && (
                            <div className="status-row">
                                <span>Total Loan Payments:</span>
                                <span className="negative">
                                    ${formatMoney(state.loans.reduce((sum, loan) => sum + loan.quarterly_payment, 0))}/quarter
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loan Amount Selection */}
                <div className="loan-section">
                    <h3>Loan Amount</h3>

                    {/* Preset Buttons */}
                    <div className="preset-buttons">
                        {LOAN_PRESETS.map(preset => (
                            <button
                                key={preset.label}
                                className={`preset-btn ${amount === preset.amount ? 'active' : ''}`}
                                onClick={() => handlePresetClick(preset.amount)}
                            >
                                {preset.label}<br />
                                ${formatMoney(preset.amount)}
                            </button>
                        ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="custom-amount">
                        <label>Custom Amount ($):</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(100000, parseInt(e.target.value) || 0))}
                            step={100000}
                            min={100000}
                            max={10000000}
                            className="amount-input"
                        />
                        <div className="amount-slider-container">
                            <input
                                type="range"
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                                min={100000}
                                max={10000000}
                                step={100000}
                                className="amount-slider"
                            />
                            <div className="slider-labels">
                                <span>$100K</span>
                                <span>$10M</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loan Term Selection */}
                <div className="loan-section">
                    <h3>Loan Term (Quarters)</h3>
                    <div className="term-buttons">
                        {QUARTER_OPTIONS.map(q => (
                            <button
                                key={q}
                                className={`term-btn ${quarters === q ? 'active' : ''}`}
                                onClick={() => setQuarters(q)}
                            >
                                {q} quarters<br />
                                ({q / 4} {q === 4 ? 'year' : 'years'})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loan Summary */}
                <div className="loan-summary">
                    <h3>Loan Summary</h3>
                    <div className="summary-detail-grid">
                        <div className="summary-detail-row highlight">
                            <span>Loan Amount:</span>
                            <span className="amount-highlight">${formatMoney(amount)}</span>
                        </div>
                        <div className="summary-detail-row">
                            <span>Interest Rate:</span>
                            <span>{(loanDetails.interestRate * 100).toFixed(1)}% per quarter</span>
                        </div>
                        <div className="summary-detail-row">
                            <span>Loan Term:</span>
                            <span>{quarters} quarters ({quarters / 4} {quarters === 4 ? 'year' : 'years'})</span>
                        </div>
                        <div className="summary-detail-row important">
                            <span>Quarterly Payment:</span>
                            <span className="warning">${formatMoney(loanDetails.quarterlyPayment)}</span>
                        </div>
                        <div className="summary-detail-row">
                            <span>Total Interest:</span>
                            <span className="negative">${formatMoney(loanDetails.totalInterest)}</span>
                        </div>
                        <div className="summary-detail-row">
                            <span>Total Repayment:</span>
                            <span className="negative">${formatMoney(loanDetails.totalPayment)}</span>
                        </div>
                        <div className="summary-detail-row highlight">
                            <span>Cash After Loan:</span>
                            <span className="positive">${formatMoney(state.cash + amount)}</span>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="loan-warning">
                    <strong>⚠ Warning:</strong> Failure to make quarterly payments will result in bankruptcy!
                    Make sure your revenue can cover the quarterly payment of ${formatMoney(loanDetails.quarterlyPayment)}.
                </div>

                {/* Action Buttons */}
                <div className="modal-actions">
                    <button
                        className="btn-primary"
                        onClick={handleAcceptLoanClick}
                    >
                        Accept Loan
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleTakeLoan}
                title="Confirm Loan"
                message={`Are you sure you want to take a loan of $${formatMoney(amount)} with quarterly payments of $${formatMoney(loanDetails.quarterlyPayment)}? Failure to make payments will result in bankruptcy!`}
                confirmText="Yes, Take Loan"
                cancelText="No, Go Back"
                dangerous={true}
            />
        </Modal>
    );
}
