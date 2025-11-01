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
                        const routeClass = route.suspended ? 'suspended' : isProfitable ? 'profitable' : 'unprofitable';

                        // Calculate profitability percentage for visualization
                        const maxProfit = Math.max(...sortedRoutes.map(r => Math.abs(r.profit)));
                        const profitPercentage = maxProfit > 0 ? (Math.abs(profit) / maxProfit) * 100 : 0;

                        // Determine profit level for color coding
                        let profitLevel = 'neutral';
                        if (!route.suspended) {
                            if (profit > 1000000) profitLevel = 'highly-profitable';
                            else if (profit > 0) profitLevel = 'profitable';
                            else if (profit > -500000) profitLevel = 'marginal';
                            else profitLevel = 'unprofitable';
                        }

                        return (
                            <div key={index} className={`route-card ${routeClass}`}>
                                {/* Route Header with Cities and Status */}
                                <div className="route-card-header">
                                    <div className="route-cities-section">
                                        <span className="route-icon">✈</span>
                                        <span className="route-cities">
                                            <span className="airport-code">{route.from}</span>
                                            <span className="route-arrow">→</span>
                                            <span className="airport-code">{route.to}</span>
                                        </span>
                                        {route.suspended && (
                                            <span className="status-badge suspended">SUSPENDED</span>
                                        )}
                                    </div>
                                    <div className="route-profit-section">
                                        <span className={`route-profit ${profitLevel}`}>
                                            {route.suspended ? '$0/Q' : `${isProfitable ? '+' : ''}${formatMoney(profit)}/Q`}
                                        </span>
                                    </div>
                                </div>

                                {/* Profitability Bar Visualization */}
                                <div className="profit-bar-container">
                                    <div className="profit-bar-background">
                                        <div
                                            className={`profit-bar ${profitLevel}`}
                                            style={{ width: `${route.suspended ? 0 : profitPercentage}%` }}
                                        >
                                            <div className="profit-bar-shine"></div>
                                        </div>
                                    </div>
                                    <div className="profit-bar-labels">
                                        <span className="profit-label-left">
                                            <span className="label-title">REV</span> ${formatMoney(revenue)}
                                        </span>
                                        <span className="profit-label-right">
                                            <span className="label-title">COST</span> ${formatMoney(cost)}
                                        </span>
                                    </div>
                                </div>

                                {/* Route Details Grid */}
                                <div className="route-details-grid">
                                    <div className="route-stat">
                                        <span className="stat-label">Aircraft</span>
                                        <span className="stat-value">{route.aircraft.name}</span>
                                        <span className="stat-subvalue">{route.aircraft.type.name}</span>
                                    </div>
                                    <div className="route-stat">
                                        <span className="stat-label">Distance</span>
                                        <span className="stat-value">{route.distance.toLocaleString()} km</span>
                                    </div>
                                    <div className="route-stat">
                                        <span className="stat-label">Frequency</span>
                                        <span className="stat-value">{route.flights_per_week}/week</span>
                                        <span className="stat-subvalue">{route.flights_per_week * 13}/quarter</span>
                                    </div>
                                </div>

                                {/* Route Actions */}
                                <div className="route-card-actions">
                                    {route.suspended ? (
                                        <button
                                            className="btn-small btn-success"
                                            onClick={() => {
                                                engine.resumeRoute(route);
                                                forceUpdate();
                                            }}
                                        >
                                            ▶ Resume
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-small btn-warning"
                                            onClick={() => {
                                                engine.suspendRoute(route);
                                                forceUpdate();
                                            }}
                                        >
                                            ⏸ Suspend
                                        </button>
                                    )}
                                    <button
                                        className="btn-small btn-danger"
                                        onClick={() => setRouteToDelete(route)}
                                    >
                                        ✕ Delete
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
