// First-time tutorial walkthrough modal

import React, { useState } from 'react';
import { Modal } from './Modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TUTORIAL_STEPS = [
    {
        title: 'Welcome to BizWing Airlines!',
        content: (
            <div>
                <p>You've just been appointed CEO of a new airline in 1992.</p>
                <p>Your mission: Build a profitable airline empire and reach <strong>$100M net worth</strong> before the year 2002.</p>
                <p className="tutorial-highlight">You'll compete against 3 rival airlines for industry dominance.</p>
            </div>
        )
    },
    {
        title: 'Understanding the Dashboard',
        content: (
            <div>
                <p>Your dashboard shows key information:</p>
                <ul>
                    <li><strong>Top Bar</strong> - Your airline name, current date, cash, and reputation</li>
                    <li><strong>Fleet Panel</strong> - Your aircraft and their assignments</li>
                    <li><strong>Routes Panel</strong> - Active flight routes and their profitability</li>
                    <li><strong>Airports Panel</strong> - Available airports and your owned slots</li>
                    <li><strong>Loans Panel</strong> - Your outstanding debt</li>
                    <li><strong>News Panel</strong> - Important events and updates</li>
                </ul>
            </div>
        )
    },
    {
        title: 'Your First Steps',
        content: (
            <div>
                <p>To start earning revenue, you need to:</p>
                <ol className="tutorial-steps-list">
                    <li>
                        <strong>Buy an Aircraft</strong>
                        <p>Click "Buy Aircraft" and purchase a plane. Start with something affordable like the DC-10 or A300.</p>
                    </li>
                    <li>
                        <strong>Acquire Airport Slots</strong>
                        <p>Click "Buy Airport Slot" to purchase landing rights at 2 different airports you want to connect.</p>
                    </li>
                    <li>
                        <strong>Create a Route</strong>
                        <p>Click "Create Route" to connect your airports with your aircraft. Pick cities with good demand!</p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        title: 'Route Profitability',
        content: (
            <div>
                <p>Route profit depends on several factors:</p>
                <ul>
                    <li><strong>Distance</strong> - Longer routes earn more, but cost more to operate</li>
                    <li><strong>Demand</strong> - Each route has a demand multiplier (shown in route creation)</li>
                    <li><strong>Frequency</strong> - More flights per week = more revenue (and costs)</li>
                    <li><strong>Reputation</strong> - Higher reputation increases passenger demand</li>
                    <li><strong>Airport Ownership</strong> - Owning airports saves 20% on landing fees</li>
                </ul>
                <p className="tutorial-highlight">💡 Tip: Routes between 2500-5000km with 2.0+ demand multipliers are usually most profitable!</p>
            </div>
        )
    },
    {
        title: 'The Quarterly Cycle',
        content: (
            <div>
                <p>BizWing operates on a <strong>quarterly cycle</strong> (every 3 months).</p>
                <p>When you press <kbd>Space</kbd> or click "Advance Quarter":</p>
                <ol>
                    <li><strong>Pre-Quarter Review</strong> - See projected financials and warnings</li>
                    <li><strong>Turn Execution</strong> - Routes operate, revenue collected, expenses paid</li>
                    <li><strong>Post-Quarter Report</strong> - View results and competitor rankings</li>
                </ol>
                <p className="tutorial-highlight">⚠️ Warning: If you post losses for 3 consecutive quarters with negative cash, it's Game Over!</p>
            </div>
        )
    },
    {
        title: 'Managing Your Finances',
        content: (
            <div>
                <p>Keep your airline financially healthy:</p>
                <ul>
                    <li><strong>Revenue</strong> - Earned from routes based on passengers and distance</li>
                    <li><strong>Expenses</strong> - Aircraft operating costs, loan interest, maintenance</li>
                    <li><strong>Profit/Loss</strong> - Revenue minus expenses (shown per quarter)</li>
                    <li><strong>Cash</strong> - Your liquid funds. Don't let this go negative!</li>
                    <li><strong>Loans</strong> - Borrow money at 5% quarterly interest</li>
                </ul>
                <p className="tutorial-highlight">💰 Keep cash above $5M to avoid emergency loan warnings!</p>
            </div>
        )
    },
    {
        title: 'Strategy Tips',
        content: (
            <div>
                <p>Here are some tips to get you started:</p>
                <ul>
                    <li>✅ Start with 1-2 aircraft and high-demand routes</li>
                    <li>✅ Monitor route profitability - suspend losing routes</li>
                    <li>✅ Buy airports you frequently use to reduce costs</li>
                    <li>✅ Maintain a cash buffer for unexpected events</li>
                    <li>❌ Don't buy aircraft without routes planned</li>
                    <li>❌ Avoid excessive loans early in the game</li>
                </ul>
                <p className="tutorial-highlight">📊 Check the Strategy Guide (Help menu) for advanced tips!</p>
            </div>
        )
    },
    {
        title: 'Ready to Start!',
        content: (
            <div>
                <p>You're all set to begin your airline journey!</p>
                <p><strong>Quick Reminder:</strong></p>
                <ul>
                    <li>Press <kbd>Space</kbd> to advance quarters</li>
                    <li>Press <kbd>Esc</kbd> to close modals</li>
                    <li>Click the <strong>?</strong> button anytime for help</li>
                </ul>
                <p className="tutorial-highlight">🎯 Goal: Reach $100M net worth before Year 10!</p>
                <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                    Good luck, CEO! The skies await! ✈️
                </p>
            </div>
        )
    }
];

export function FirstTimeTutorialModal({ isOpen, onClose }: Props) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        // Mark tutorial as completed in localStorage
        localStorage.setItem('bizwing_tutorial_completed', 'true');
        onClose();
    };

    const handleSkip = () => {
        handleComplete();
    };

    const step = TUTORIAL_STEPS[currentStep];
    const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <Modal isOpen={isOpen} onClose={handleSkip} title={step.title}>
            <div className="first-time-tutorial">
                <div className="tutorial-progress">
                    <span>Step {currentStep + 1} of {TUTORIAL_STEPS.length}</span>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="tutorial-step-content">
                    {step.content}
                </div>

                <div className="modal-actions tutorial-actions">
                    {!isFirstStep && (
                        <button className="btn-secondary" onClick={handlePrevious}>
                            Previous
                        </button>
                    )}
                    <button className="btn-secondary" onClick={handleSkip}>
                        Skip Tutorial
                    </button>
                    <button className="btn-primary" onClick={handleNext}>
                        {isLastStep ? "Let's Go!" : 'Next'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
