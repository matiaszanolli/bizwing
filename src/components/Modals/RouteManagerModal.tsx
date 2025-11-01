// Route Manager Modal - Full-screen route management interface

import React from 'react';
import { Modal } from './Modal';
import { RouteManagerPanel } from '../Dashboard/RouteManagerPanel';

interface RouteManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RouteManagerModal({ isOpen, onClose }: RouteManagerModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Route Manager" size="fullscreen">
            <div style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                <RouteManagerPanel />
            </div>
        </Modal>
    );
}
