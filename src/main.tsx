// BizWing - Main entry point for React application

import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameProvider } from './contexts/GameContext';
import { Dashboard } from './components/Dashboard/Dashboard';
import './styles/globals.css';
import './styles/design-system.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GameProvider>
            <Dashboard />
        </GameProvider>
    </React.StrictMode>
);
