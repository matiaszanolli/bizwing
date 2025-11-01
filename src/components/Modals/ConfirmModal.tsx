// Reusable Confirmation Modal

import React from 'react';
import { Modal } from './Modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDestructive = false
}: Props) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="confirm-dialog">
                <div className="confirm-message">
                    {message}
                </div>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button
                        className={isDestructive ? 'btn-danger' : 'btn-primary'}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
