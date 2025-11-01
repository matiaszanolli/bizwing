// Routes display panel

import React, { useState, useMemo } from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';
import { ConfirmModal } from '../Modals/ConfirmModal';
import { Route } from '../../models/types';

type SortOption = 'profit' | 'revenue' | 'distance' | 'none';

export function RoutesPanel() {
    const { state, engine, forceUpdate } = useGame();
    const [sortBy, setSortBy] = useState<SortOption>('none');
    const [routeToDelete, setRouteToDelete] = useState<Route | null>(null);

    // Calculate route metrics and sort
    const sortedRoutes = useMemo(() => {
        const routesWithMetrics = state.routes.map(route => {
            const revenue = engine.calculateRouteRevenue(route);
            const cost = route.aircraft.type.operating_cost * route.flights_per_week * 13;
            const profit = revenue - cost;
            return { route, revenue, cost, profit };
        });

        if (sortBy === 'none') return routesWithMetrics;

        return [...routesWithMetrics].sort((a, b) => {
            switch (sortBy) {
                case 'profit':
                    return b.profit - a.profit;
                case 'revenue':
                    return b.revenue - a.revenue;
                case 'distance':
                    return b.route.distance - a.route.distance;
                default:
                    return 0;
            }
        });
    }, [state.routes, sortBy, engine]);

    const handleDeleteRoute = () => {
        if (routeToDelete) {
            engine.deleteRoute(routeToDelete);
            forceUpdate();
            setRouteToDelete(null);
        }
    };

    return (
        <div className="panel routes-panel">
            <div className="panel-header-with-controls">
                <h2>Routes ({state.routes.length})</h2>
                {state.routes.length > 1 && (
                    <select
                        className="sort-dropdown"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                    >
                        <option value="none">Default Order</option>
                        <option value="profit">By Profit</option>
                        <option value="revenue">By Revenue</option>
                        <option value="distance">By Distance</option>
                    </select>
                )}
            </div>
            <div className="routes-list">
                {sortedRoutes.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-icon">🌍</p>
                        <p className="empty-title">No Routes Established</p>
                        <p className="empty-hint">Create your first route to connect cities and start generating revenue. You'll need an aircraft and airport slots first!</p>
                    </div>
                ) : (
                    sortedRoutes.map(({ route, revenue, cost, profit }, index) => {
                        const isProfitable = profit > 0;

                        return (
                            <div key={index} className={`route-item ${isProfitable ? 'profitable' : 'unprofitable'}`}>
                                <div className="route-header">
                                    <span className="route-cities">{route.from} → {route.to}</span>
                                    <span className={`route-profit ${isProfitable ? 'positive' : 'negative'}`}>
                                        {isProfitable ? '+' : ''}{formatMoney(profit)}/Q
                                    </span>
                                </div>
                                <div className="route-details">
                                    <div className="route-detail-row">
                                        <span>Aircraft:</span>
                                        <span>{route.aircraft.name}</span>
                                    </div>
                                    <div className="route-detail-row">
                                        <span>Distance:</span>
                                        <span>{route.distance}km</span>
                                    </div>
                                    <div className="route-detail-row">
                                        <span>Frequency:</span>
                                        <span>{route.flights_per_week}/week</span>
                                    </div>
                                    <div className="route-detail-row">
                                        <span>Revenue:</span>
                                        <span className="positive">${formatMoney(revenue)}</span>
                                    </div>
                                    <div className="route-detail-row">
                                        <span>Cost:</span>
                                        <span className="negative">${formatMoney(cost)}</span>
                                    </div>
                                </div>
                                <div className="route-actions">
                                    <button
                                        className="btn-small btn-danger"
                                        onClick={() => setRouteToDelete(route)}
                                    >
                                        Delete Route
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <ConfirmModal
                isOpen={routeToDelete !== null}
                onClose={() => setRouteToDelete(null)}
                onConfirm={handleDeleteRoute}
                title="Delete Route?"
                message={routeToDelete ? `Are you sure you want to delete the route from ${routeToDelete.from} to ${routeToDelete.to}? The aircraft ${routeToDelete.aircraft.name} will become available for assignment.` : ''}
                confirmText="Delete Route"
                isDestructive={true}
            />
        </div>
    );
}
