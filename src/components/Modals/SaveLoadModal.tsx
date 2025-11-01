// Save/Load Modal

import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useGame } from '../../contexts/GameContext';
import { SaveManager, SaveMetadata } from '../../utils/SaveManager';
import { formatMoney } from '../../utils/helpers';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mode: 'save' | 'load';
}

export function SaveLoadModal({ isOpen, onClose, mode }: Props) {
    const { saveGame, loadGame } = useGame();
    const [slots, setSlots] = useState<(SaveMetadata | null)[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    // Load slot metadata when modal opens
    useEffect(() => {
        if (isOpen) {
            const allSlots = SaveManager.getAllSaveMetadata();
            setSlots(allSlots);
            setSelectedSlot(null);
        }
    }, [isOpen]);

    const handleSave = (slotId: number) => {
        const success = saveGame(slotId);
        if (success) {
            alert(`Game saved to slot ${slotId + 1}!`);
            onClose();
        } else {
            alert('Failed to save game.');
        }
    };

    const handleLoad = (slotId: number) => {
        const success = loadGame(slotId);
        if (success) {
            alert(`Game loaded from slot ${slotId + 1}!`);
            onClose();
        } else {
            alert('Failed to load game.');
        }
    };

    const handleDelete = (slotId: number) => {
        if (confirm(`Delete save in slot ${slotId + 1}?`)) {
            SaveManager.deleteSave(slotId);
            // Refresh slots
            const allSlots = SaveManager.getAllSaveMetadata();
            setSlots(allSlots);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const getQuarterName = (quarter: number) => {
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        return quarters[(quarter - 1) % 4];
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={mode === 'save' ? 'Save Game' : 'Load Game'}>
            <div className="save-load-modal">
                <div className="save-slots">
                    {slots.map((metadata, index) => (
                        <div
                            key={index}
                            className={`save-slot ${metadata ? 'filled' : 'empty'} ${selectedSlot === index ? 'selected' : ''}`}
                            onClick={() => setSelectedSlot(index)}
                        >
                            <div className="slot-header">
                                <span className="slot-number">Slot {index + 1}</span>
                                {index === 0 && <span className="slot-badge">AUTO</span>}
                            </div>

                            {metadata ? (
                                <div className="slot-content">
                                    <div className="slot-main-info">
                                        <div className="airline-name">{metadata.airlineName}</div>
                                        <div className="slot-details">
                                            <span className="slot-date">{getQuarterName(metadata.quarter)} {metadata.year}</span>
                                            <span className="slot-cash">${formatMoney(metadata.cash)}</span>
                                        </div>
                                    </div>
                                    <div className="slot-timestamp">
                                        Saved: {formatDate(metadata.timestamp)}
                                    </div>

                                    <div className="slot-actions">
                                        {mode === 'save' && (
                                            <button
                                                className="btn-small btn-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSave(index);
                                                }}
                                            >
                                                Overwrite
                                            </button>
                                        )}
                                        {mode === 'load' && (
                                            <button
                                                className="btn-small btn-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLoad(index);
                                                }}
                                            >
                                                Load
                                            </button>
                                        )}
                                        {index !== 0 && (
                                            <button
                                                className="btn-small btn-danger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(index);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="slot-content">
                                    <div className="empty-slot-message">
                                        {mode === 'save' ? 'Empty - Click to save here' : 'No save data'}
                                    </div>
                                    {mode === 'save' && (
                                        <div className="slot-actions">
                                            <button
                                                className="btn-small btn-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSave(index);
                                                }}
                                            >
                                                Save Here
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}
