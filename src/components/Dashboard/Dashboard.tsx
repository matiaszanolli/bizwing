// Main dashboard component

import React from 'react';
import { Header } from '../Layout/Header';
import { FleetPanel } from './FleetPanel';
import { RoutesPanel } from './RoutesPanel';
import { FinancialPanel } from './FinancialPanel';
import { NewsPanel } from './NewsPanel';
import { ActionsPanel } from './ActionsPanel';
import { Globe3D } from './Globe3D';

export function Dashboard() {
    return (
        <div className="dashboard">
            <Header />
            <main className="dashboard-main">
                <aside className="left-panel">
                    <FleetPanel />
                    <RoutesPanel />
                    <ActionsPanel />
                </aside>
                <section className="center-panel">
                    <Globe3D />
                </section>
                <aside className="right-panel">
                    <FinancialPanel />
                    <NewsPanel />
                </aside>
            </main>
        </div>
    );
}
