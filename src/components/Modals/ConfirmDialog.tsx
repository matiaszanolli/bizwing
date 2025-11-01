// Confirmation Dialog Component

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
    dangerous?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    dangerous = false
}: Props) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="confirm-dialog">
                <p className="confirm-message">{message}</p>
                <div className="modal-actions">
                    <button
                        className={dangerous ? 'btn-danger' : 'btn-primary'}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
