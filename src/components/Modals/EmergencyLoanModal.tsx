// Emergency Loan Modal - Triggered after consecutive losses

import React, { useState } from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { CONFIG } from '../../utils/config';
import { formatMoney } from '../../utils/helpers';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function EmergencyLoanModal({ isOpen, onClose }: Props) {
    const { engine, forceUpdate } = useGame();
    const [loanAmount, setLoanAmount] = useState(CONFIG.EMERGENCY_LOAN_MIN_AMOUNT);

    const minLoan = CONFIG.EMERGENCY_LOAN_MIN_AMOUNT;
    const maxLoan = 50000000; // Max $50M
    const interestRate = CONFIG.EMERGENCY_LOAN_INTEREST_RATE;
    const quarters = 12;

    // Calculate quarterly payment
    const calculatePayment = (amount: number) => {
        return (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));
    };

    const handleTakeLoan = () => {
        engine.takeEmergencyLoan(loanAmount);
        forceUpdate();
        onClose();
    };

    const handleBankruptcy = () => {
        // This will trigger game over
        engine.state.cash = CONFIG.BANKRUPTCY_THRESHOLD - 1;
        forceUpdate();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="FINANCIAL CRISIS">
            <div className="emergency-loan-modal">
                <div className="alert alert-danger">
                    <strong>WARNING: {engine.state.consecutiveLosses} CONSECUTIVE QUARTERS OF LOSSES!</strong>
                    <p>Your airline is in serious financial trouble. You must choose:</p>
                </div>

                <div className="loan-section">
                    <h3>Option 1: Emergency Loan (High Interest)</h3>
                    <p>
                        Take an emergency loan to keep operating. This comes with harsh terms:
                        {(interestRate * 100).toFixed(0)}% interest per quarter over {quarters} quarters.
                    </p>

                    <div className="amount-slider-container">
                        <label>
                            Loan Amount: ${formatMoney(loanAmount)}
                        </label>
                        <input
                            type="range"
                            min={minLoan}
                            max={maxLoan}
                            step={1000000}
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                        />
                        <div className="slider-labels">
                            <span>${formatMoney(minLoan)}</span>
                            <span>${formatMoney(maxLoan)}</span>
                        </div>
                    </div>

                    <div className="loan-summary">
                        <div className="summary-detail-grid">
                            <div className="summary-detail-row">
                                <span>Loan Amount:</span>
                                <span className="positive">${formatMoney(loanAmount)}</span>
                            </div>
                            <div className="summary-detail-row">
                                <span>Interest Rate:</span>
                                <span className="warning">{(interestRate * 100).toFixed(0)}% per quarter</span>
                            </div>
                            <div className="summary-detail-row">
                                <span>Term:</span>
                                <span>{quarters} quarters (3 years)</span>
                            </div>
                            <div className="summary-detail-row highlight">
                                <span>Quarterly Payment:</span>
                                <span className="amount-highlight negative">
                                    ${formatMoney(calculatePayment(loanAmount))}
                                </span>
                            </div>
                            <div className="summary-detail-row">
                                <span>Total Repayment:</span>
                                <span className="negative">
                                    ${formatMoney(calculatePayment(loanAmount) * quarters)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={handleTakeLoan}
                        style={{ width: '100%', marginTop: '8px' }}
                    >
                        Take Emergency Loan
                    </button>
                </div>

                <div className="loan-section" style={{ marginTop: '16px' }}>
                    <h3>Option 2: Declare Bankruptcy</h3>
                    <p className="loan-warning">
                        If you cannot recover, you may declare bankruptcy and end the game.
                        Your final score will be calculated based on your current assets.
                    </p>

                    <button
                        className="btn-danger"
                        onClick={handleBankruptcy}
                        style={{ width: '100%' }}
                    >
                        Declare Bankruptcy (Game Over)
                    </button>
                </div>

                <div className="help-text" style={{ marginTop: '12px' }}>
                    <strong>TIP:</strong> Consider selling unprofitable aircraft, closing unprofitable routes,
                    and reducing expenses before deciding. But you MUST choose one option to continue.
                </div>
            </div>
        </Modal>
    );
}
