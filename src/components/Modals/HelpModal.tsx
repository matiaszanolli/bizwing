// Help & Tutorial Modal with tabs for different content

import React, { useState } from 'react';
import { Modal } from './Modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'tutorial' | 'shortcuts' | 'strategy';
}

export function HelpModal({ isOpen, onClose, defaultTab = 'tutorial' }: Props) {
    const [activeTab, setActiveTab] = useState<'tutorial' | 'shortcuts' | 'strategy'>(defaultTab);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="HELP & TUTORIAL">
            <div className="help-modal">
                <div className="help-tabs">
                    <button
                        className={`help-tab ${activeTab === 'tutorial' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tutorial')}
                    >
                        Tutorial
                    </button>
                    <button
                        className={`help-tab ${activeTab === 'shortcuts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shortcuts')}
                    >
                        Shortcuts
                    </button>
                    <button
                        className={`help-tab ${activeTab === 'strategy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('strategy')}
                    >
                        Strategy Guide
                    </button>
                </div>

                <div className="help-content">
                    {activeTab === 'tutorial' && <TutorialContent />}
                    {activeTab === 'shortcuts' && <ShortcutsContent />}
                    {activeTab === 'strategy' && <StrategyContent />}
                </div>

                <div className="modal-actions">
                    <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
                        Got It!
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function TutorialContent() {
    return (
        <div className="tutorial-content">
            <h3>Welcome to BizWing Airlines!</h3>
            <p>Build and manage your airline empire in this retro business simulation game.</p>

            <div className="tutorial-section">
                <h4>Getting Started</h4>
                <ol>
                    <li><strong>Buy Your First Aircraft</strong> - Click "Buy Aircraft" and purchase a plane that fits your budget</li>
                    <li><strong>Acquire Airport Slots</strong> - Buy landing rights at airports you want to connect</li>
                    <li><strong>Create Routes</strong> - Connect cities with your aircraft to start earning revenue</li>
                    <li><strong>Advance Quarters</strong> - Press [Space] to advance time and see your profits</li>
                </ol>
            </div>

            <div className="tutorial-section">
                <h4>Core Gameplay Loop</h4>
                <ul>
                    <li>📊 <strong>Plan</strong> - Review your finances, routes, and fleet</li>
                    <li>🛫 <strong>Expand</strong> - Buy aircraft, create routes, acquire airports</li>
                    <li>⏭ <strong>Execute</strong> - Advance quarter to simulate operations</li>
                    <li>📈 <strong>Analyze</strong> - Review results and competitor rankings</li>
                    <li>🔄 <strong>Optimize</strong> - Suspend unprofitable routes, manage debt</li>
                </ul>
            </div>

            <div className="tutorial-section">
                <h4>Key Concepts</h4>
                <ul>
                    <li><strong>Routes</strong> - Connections between cities generating revenue based on distance, demand, and frequency</li>
                    <li><strong>Fleet</strong> - Your aircraft. Each must be assigned to a route or it's idle</li>
                    <li><strong>Airport Slots</strong> - Landing rights. You need slots at both ends of a route</li>
                    <li><strong>Quarterly Cycle</strong> - Revenue and expenses calculated every quarter (3 months)</li>
                    <li><strong>Reputation</strong> - Affects passenger demand. Increases with profitable quarters</li>
                    <li><strong>Loans</strong> - Borrow money with 5% quarterly interest. Repay to reduce costs</li>
                </ul>
            </div>

            <div className="tutorial-section">
                <h4>Win Conditions</h4>
                <ul>
                    <li>🏆 Reach $100M net worth before Year 10</li>
                    <li>💀 Avoid bankruptcy (negative cash for 3 consecutive quarters)</li>
                    <li>📊 Compete against 3 AI airlines for industry dominance</li>
                </ul>
            </div>
        </div>
    );
}

function ShortcutsContent() {
    return (
        <div className="shortcuts-content">
            <h3>Keyboard Shortcuts</h3>

            <div className="shortcuts-section">
                <h4>Navigation</h4>
                <div className="shortcut-list">
                    <div className="shortcut-item">
                        <kbd>Space</kbd>
                        <span>Advance Quarter (turn)</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Esc</kbd>
                        <span>Close All Modals</span>
                    </div>
                </div>
            </div>

            <div className="shortcuts-section">
                <h4>Actions (Coming Soon)</h4>
                <div className="shortcut-list">
                    <div className="shortcut-item disabled">
                        <kbd>B</kbd>
                        <span>Buy Aircraft</span>
                    </div>
                    <div className="shortcut-item disabled">
                        <kbd>R</kbd>
                        <span>Create Route</span>
                    </div>
                    <div className="shortcut-item disabled">
                        <kbd>A</kbd>
                        <span>Buy Airport Slot</span>
                    </div>
                    <div className="shortcut-item disabled">
                        <kbd>L</kbd>
                        <span>Take Loan</span>
                    </div>
                    <div className="shortcut-item disabled">
                        <kbd>S</kbd>
                        <span>Save Game</span>
                    </div>
                    <div className="shortcut-item disabled">
                        <kbd>O</kbd>
                        <span>Load Game</span>
                    </div>
                    <div className="shortcut-item disabled">
                        <kbd>H</kbd>
                        <span>Show Help</span>
                    </div>
                </div>
            </div>

            <div className="help-note">
                Note: Additional keyboard shortcuts will be added in future updates
            </div>
        </div>
    );
}

function StrategyContent() {
    return (
        <div className="strategy-content">
            <h3>Strategy Guide</h3>

            <div className="strategy-section">
                <h4>Early Game (Year 1-2)</h4>
                <ul>
                    <li>💰 <strong>Start Conservative</strong> - Buy 1-2 affordable aircraft (DC-10, A300)</li>
                    <li>🎯 <strong>High-Demand Routes</strong> - Focus on routes with high demand multipliers</li>
                    <li>📏 <strong>Medium Distance</strong> - 2000-4000km routes offer good revenue/cost ratio</li>
                    <li>🚫 <strong>Avoid Early Loans</strong> - Only borrow if you have a clear growth plan</li>
                    <li>✅ <strong>Build Reputation</strong> - Profitable quarters increase reputation and demand</li>
                </ul>
            </div>

            <div className="strategy-section">
                <h4>Mid Game (Year 3-6)</h4>
                <ul>
                    <li>🌍 <strong>Expand Network</strong> - Add more routes and aircraft as cash allows</li>
                    <li>🏢 <strong>Buy Airports</strong> - Owning airports eliminates slot fees (20% savings)</li>
                    <li>📊 <strong>Monitor Profitability</strong> - Suspend or delete unprofitable routes</li>
                    <li>💸 <strong>Strategic Loans</strong> - Borrow for high-ROI investments (popular routes)</li>
                    <li>⚖️ <strong>Balance Fleet</strong> - Avoid idle aircraft; they cost money without earning</li>
                </ul>
            </div>

            <div className="strategy-section">
                <h4>Late Game (Year 7-10)</h4>
                <ul>
                    <li>🎯 <strong>Push for Victory</strong> - Focus on net worth growth to reach $100M</li>
                    <li>💎 <strong>Premium Routes</strong> - Invest in long-haul, high-demand routes</li>
                    <li>🏆 <strong>Dominate Competitors</strong> - Monitor rankings and outgrow rivals</li>
                    <li>💰 <strong>Pay Off Debt</strong> - Reduce loan interest to maximize profit</li>
                    <li>📈 <strong>Optimize Everything</strong> - Fine-tune route frequency and fleet allocation</li>
                </ul>
            </div>

            <div className="strategy-section">
                <h4>Route Profitability Tips</h4>
                <ul>
                    <li>✈️ <strong>Distance Sweet Spot</strong> - 2500-5000km routes are most profitable</li>
                    <li>🎲 <strong>Demand Multiplier</strong> - Higher multipliers (2.0+) mean better revenue</li>
                    <li>🔄 <strong>Flight Frequency</strong> - More flights = more revenue, but also more costs</li>
                    <li>🏢 <strong>Airport Ownership</strong> - Owning both endpoints saves 20% on costs</li>
                    <li>⚖️ <strong>Aircraft Efficiency</strong> - Match aircraft capacity to route demand</li>
                </ul>
            </div>

            <div className="strategy-section">
                <h4>Common Mistakes to Avoid</h4>
                <ul>
                    <li>❌ Buying too many aircraft without profitable routes</li>
                    <li>❌ Creating short-distance routes (low revenue)</li>
                    <li>❌ Ignoring unprofitable routes (they drain cash)</li>
                    <li>❌ Taking loans without a repayment plan</li>
                    <li>❌ Letting aircraft sit idle (they still cost maintenance)</li>
                    <li>❌ Ignoring competitor rankings (they show your progress)</li>
                </ul>
            </div>

            <div className="strategy-section">
                <h4>Financial Health Indicators</h4>
                <ul>
                    <li>🟢 <strong>Healthy</strong> - Profitable quarters, growing cash, low debt</li>
                    <li>🟡 <strong>Warning</strong> - Break-even quarters, idle aircraft, high debt</li>
                    <li>🔴 <strong>Danger</strong> - Consecutive losses, cash below $5M, unable to repay loans</li>
                </ul>
            </div>
        </div>
    );
}
