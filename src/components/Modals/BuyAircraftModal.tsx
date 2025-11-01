// Buy Aircraft Modal

import React, { useState } from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { getAvailableAircraft, getProductionStatus } from '../../data/aircraft';
import { formatMoney } from '../../utils/helpers';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function BuyAircraftModal({ isOpen, onClose }: Props) {
    const { engine, state, forceUpdate } = useGame();
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const availableAircraft = getAvailableAircraft(state.year);
    const selected = selectedType ? availableAircraft.find(a => a.name === selectedType) : null;

    const handleBuy = () => {
        if (selected && engine.buyAircraft(selected)) {
            forceUpdate();
            onClose();
        }
    };

    const handleLease = () => {
        if (selected && engine.leaseAircraft(selected)) {
            forceUpdate();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Buy/Lease Aircraft">
            <div className="aircraft-selection">
                <div className="aircraft-list">
                    {availableAircraft.map(aircraft => {
                        const productionStatus = getProductionStatus(aircraft, state.year);
                        return (
                            <div
                                key={aircraft.name}
                                className={`aircraft-item ${selectedType === aircraft.name ? 'selected' : ''} ${productionStatus === 'ending-soon' ? 'ending-soon' : ''}`}
                                onClick={() => setSelectedType(aircraft.name)}
                            >
                                <div className="aircraft-name">
                                    {aircraft.name}
                                    {productionStatus === 'ending-soon' && (
                                        <span className="production-badge ending">ENDING PRODUCTION</span>
                                    )}
                                </div>
                                <div className="aircraft-category">{aircraft.category}</div>
                                <div className="aircraft-stats">
                                    <span>Capacity: {aircraft.capacity}</span>
                                    <span>Range: {aircraft.range}km</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selected && (() => {
                    const productionStatus = getProductionStatus(selected, state.year);
                    return (
                        <div className="aircraft-details">
                            <h3>
                                {selected.name}
                                {productionStatus === 'ending-soon' && (
                                    <span className="production-badge ending">ENDING PRODUCTION</span>
                                )}
                            </h3>
                            <div className="detail-grid">
                                <div className="detail-row">
                                    <span>Category:</span>
                                    <span>{selected.category}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Capacity:</span>
                                    <span>{selected.capacity} passengers</span>
                                </div>
                                <div className="detail-row">
                                    <span>Range:</span>
                                    <span>{selected.range} km</span>
                                </div>
                                <div className="detail-row">
                                    <span>Operating Cost:</span>
                                    <span>${formatMoney(selected.operating_cost)}/flight</span>
                                </div>
                                {selected.year_discontinued && (
                                    <div className="detail-row warning">
                                        <span>Production Ends:</span>
                                        <span className="warning-value">{selected.year_discontinued}</span>
                                    </div>
                                )}
                                <div className="detail-row">
                                    <span>Purchase Price:</span>
                                    <span className="price-buy">${formatMoney(selected.price)}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Lease Cost:</span>
                                    <span className="price-lease">${formatMoney(selected.lease_per_quarter)}/quarter</span>
                                </div>
                            </div>

                        <div className="aircraft-actions">
                            <button
                                className="btn-primary"
                                onClick={handleBuy}
                                disabled={state.cash < selected.price}
                            >
                                Buy (${formatMoney(selected.price)})
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={handleLease}
                            >
                                Lease (${formatMoney(selected.lease_per_quarter)}/Q)
                            </button>
                        </div>

                            {productionStatus === 'ending-soon' && (
                                <div className="warning-text production-warning">
                                    ⚠️ WARNING: This aircraft will be discontinued next year! This is your last chance to order.
                                </div>
                            )}

                            {state.cash < selected.price && (
                                <div className="warning-text">
                                    Insufficient funds to purchase. Consider leasing instead.
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>
        </Modal>
    );
}
