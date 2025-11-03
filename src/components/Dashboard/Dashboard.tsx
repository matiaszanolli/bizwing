// Main dashboard component

import { useState } from 'react';
import { Header } from '../Layout/Header';
import { FleetPanel } from './FleetPanel';
import { RoutesPanel } from './RoutesPanel';
import { FinancialPanel } from './FinancialPanel';
import { NewsPanel } from './NewsPanel';
import { ActionsPanel } from './ActionsPanel';
import { ExecutivePanel } from './ExecutivePanel';
import { Globe3D } from './Globe3D';
import { HireExecutiveModal } from '../Modals/HireExecutiveModal';
import { ExecutiveActionsModal } from '../Modals/ExecutiveActionsModal';
import { Executive } from '../../models/types';

export function Dashboard() {
    const [hireModalOpen, setHireModalOpen] = useState(false);
    const [actionsModalOpen, setActionsModalOpen] = useState(false);
    const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null);

    const handleAssignAction = (executive: Executive) => {
        setSelectedExecutive(executive);
        setActionsModalOpen(true);
    };

    return (
        <div className="dashboard">
            <Header />
            <main className="dashboard-main">
                <aside className="left-panel">
                    <FleetPanel />
                    <RoutesPanel />
                    <ExecutivePanel
                        onHireExecutive={() => setHireModalOpen(true)}
                        onAssignAction={handleAssignAction}
                    />
                </aside>
                <section className="center-panel">
                    <Globe3D />
                </section>
                <aside className="right-panel">
                    <FinancialPanel />
                    <NewsPanel />
                    <ActionsPanel />
                </aside>
            </main>

            {/* Modals */}
            <HireExecutiveModal
                isOpen={hireModalOpen}
                onClose={() => setHireModalOpen(false)}
            />
            <ExecutiveActionsModal
                isOpen={actionsModalOpen}
                onClose={() => setActionsModalOpen(false)}
                executive={selectedExecutive}
            />
        </div>
    );
}
