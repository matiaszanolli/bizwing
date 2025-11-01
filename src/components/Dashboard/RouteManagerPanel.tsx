// Route Management Panel with performance dashboard

import React, { useState, useMemo } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Route } from '../../models/types';
import { formatMoney } from '../../utils/helpers';
import { ConfirmModal } from '../Modals/ConfirmModal';

type SortField = 'profit' | 'revenue' | 'expenses' | 'distance' | 'loadFactor' | 'aircraftAge';
type SortDirection = 'asc' | 'desc';
type FilterMode = 'all' | 'profitable' | 'unprofitable' | 'suspended';

interface RouteMetrics {
    route: Route;
    revenue: number;
    expenses: number;
    profit: number;
    loadFactor: number;
    profitMargin: number;
}

export function RouteManagerPanel() {
    const { state, engine, forceUpdate } = useGame();
    const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
    const [sortField, setSortField] = useState<SortField>('profit');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [filterMode, setFilterMode] = useState<FilterMode>('all');
    const [bulkAction, setBulkAction] = useState<'suspend' | 'resume' | 'frequency' | null>(null);
    const [bulkFrequency, setBulkFrequency] = useState<number>(7);

    // Calculate metrics for all routes
    const routeMetrics = useMemo(() => {
        return state.routes.map(route => {
            const estimate = engine.estimateRouteProfitability(route);
            return {
                route,
                revenue: estimate.revenue,
                expenses: estimate.expenses,
                profit: estimate.profit,
                loadFactor: estimate.loadFactor,
                profitMargin: estimate.revenue > 0 ? (estimate.profit / estimate.revenue) * 100 : 0
            };
        });
    }, [state.routes, state.year, state.fuelPrice, state.reputation]);

    // Filter routes
    const filteredMetrics = useMemo(() => {
        return routeMetrics.filter(metric => {
            if (filterMode === 'profitable') return metric.profit > 0 && !metric.route.suspended;
            if (filterMode === 'unprofitable') return metric.profit <= 0 && !metric.route.suspended;
            if (filterMode === 'suspended') return metric.route.suspended;
            return true; // 'all'
        });
    }, [routeMetrics, filterMode]);

    // Sort routes
    const sortedMetrics = useMemo(() => {
        const sorted = [...filteredMetrics];
        sorted.sort((a, b) => {
            let aValue: number;
            let bValue: number;

            switch (sortField) {
                case 'profit':
                    aValue = a.profit;
                    bValue = b.profit;
                    break;
                case 'revenue':
                    aValue = a.revenue;
                    bValue = b.revenue;
                    break;
                case 'expenses':
                    aValue = a.expenses;
                    bValue = b.expenses;
                    break;
                case 'distance':
                    aValue = a.route.distance;
                    bValue = b.route.distance;
                    break;
                case 'loadFactor':
                    aValue = a.loadFactor;
                    bValue = b.loadFactor;
                    break;
                case 'aircraftAge':
                    aValue = a.route.aircraft.age;
                    bValue = b.route.aircraft.age;
                    break;
            }

            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });
        return sorted;
    }, [filteredMetrics, sortField, sortDirection]);

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        const activeRoutes = routeMetrics.filter(m => !m.route.suspended);
        const totalRevenue = activeRoutes.reduce((sum, m) => sum + m.revenue, 0);
        const totalExpenses = activeRoutes.reduce((sum, m) => sum + m.expenses, 0);
        const totalProfit = totalRevenue - totalExpenses;
        const profitableCount = activeRoutes.filter(m => m.profit > 0).length;
        const unprofitableCount = activeRoutes.filter(m => m.profit <= 0).length;

        return {
            totalRoutes: state.routes.length,
            activeRoutes: activeRoutes.length,
            suspendedRoutes: state.routes.length - activeRoutes.length,
            profitableCount,
            unprofitableCount,
            totalRevenue,
            totalExpenses,
            totalProfit,
            avgLoadFactor: activeRoutes.length > 0
                ? activeRoutes.reduce((sum, m) => sum + m.loadFactor, 0) / activeRoutes.length
                : 0
        };
    }, [routeMetrics, state.routes.length]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const handleSelectRoute = (routeId: string) => {
        const newSelected = new Set(selectedRoutes);
        if (newSelected.has(routeId)) {
            newSelected.delete(routeId);
        } else {
            newSelected.add(routeId);
        }
        setSelectedRoutes(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedRoutes.size === sortedMetrics.length) {
            setSelectedRoutes(new Set());
        } else {
            setSelectedRoutes(new Set(sortedMetrics.map(m => m.route.id)));
        }
    };

    const handleBulkAction = () => {
        if (selectedRoutes.size === 0 || !bulkAction) return;

        const routeIds = Array.from(selectedRoutes);

        if (bulkAction === 'suspend') {
            routeIds.forEach(id => {
                const route = state.routes.find(r => r.id === id);
                if (route && !route.suspended) {
                    engine.suspendRoute(id);
                }
            });
        } else if (bulkAction === 'resume') {
            routeIds.forEach(id => {
                const route = state.routes.find(r => r.id === id);
                if (route && route.suspended) {
                    engine.resumeRoute(id);
                }
            });
        } else if (bulkAction === 'frequency') {
            routeIds.forEach(id => {
                engine.updateRouteFrequency(id, bulkFrequency);
            });
        }

        forceUpdate();
        setSelectedRoutes(new Set());
        setBulkAction(null);
    };

    const getProfitabilityClass = (profit: number, suspended: boolean): string => {
        if (suspended) return 'suspended';
        if (profit > 1000000) return 'highly-profitable';
        if (profit > 0) return 'profitable';
        if (profit > -500000) return 'marginal';
        return 'unprofitable';
    };

    const getProfitabilityIndicator = (profit: number, suspended: boolean): string => {
        if (suspended) return '⏸';
        if (profit > 1000000) return '●●●';
        if (profit > 0) return '●●';
        if (profit > -500000) return '●';
        return '✗';
    };

    const getSortIndicator = (field: SortField): string => {
        if (sortField !== field) return '';
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <div className="panel route-manager-panel">
            <h2>Route Manager ({state.routes.length} routes)</h2>

            {/* Summary Dashboard */}
            <div className="route-summary-dashboard">
                <div className="summary-row">
                    <div className="summary-stat">
                        <div className="stat-label">Active Routes</div>
                        <div className="stat-value">{summaryStats.activeRoutes} / {summaryStats.totalRoutes}</div>
                    </div>
                    <div className="summary-stat">
                        <div className="stat-label">Profitable</div>
                        <div className="stat-value profitable">{summaryStats.profitableCount}</div>
                    </div>
                    <div className="summary-stat">
                        <div className="stat-label">Unprofitable</div>
                        <div className="stat-value unprofitable">{summaryStats.unprofitableCount}</div>
                    </div>
                    <div className="summary-stat">
                        <div className="stat-label">Suspended</div>
                        <div className="stat-value suspended">{summaryStats.suspendedRoutes}</div>
                    </div>
                </div>
                <div className="summary-row">
                    <div className="summary-stat">
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-value">${formatMoney(summaryStats.totalRevenue)}</div>
                    </div>
                    <div className="summary-stat">
                        <div className="stat-label">Total Expenses</div>
                        <div className="stat-value">${formatMoney(summaryStats.totalExpenses)}</div>
                    </div>
                    <div className="summary-stat">
                        <div className="stat-label">Net Profit</div>
                        <div className={`stat-value ${summaryStats.totalProfit > 0 ? 'profitable' : 'unprofitable'}`}>
                            ${formatMoney(summaryStats.totalProfit)}
                        </div>
                    </div>
                    <div className="summary-stat">
                        <div className="stat-label">Avg Load Factor</div>
                        <div className="stat-value">{(summaryStats.avgLoadFactor * 100).toFixed(0)}%</div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="route-controls">
                <div className="filter-controls">
                    <label>Filter:</label>
                    <select value={filterMode} onChange={e => setFilterMode(e.target.value as FilterMode)}>
                        <option value="all">All Routes</option>
                        <option value="profitable">Profitable Only</option>
                        <option value="unprofitable">Unprofitable Only</option>
                        <option value="suspended">Suspended Only</option>
                    </select>
                </div>

                {selectedRoutes.size > 0 && (
                    <div className="bulk-actions">
                        <span className="selection-count">{selectedRoutes.size} selected</span>
                        <button
                            className="btn-small"
                            onClick={() => setBulkAction('suspend')}
                        >
                            Suspend Selected
                        </button>
                        <button
                            className="btn-small"
                            onClick={() => setBulkAction('resume')}
                        >
                            Resume Selected
                        </button>
                        <button
                            className="btn-small"
                            onClick={() => setBulkAction('frequency')}
                        >
                            Change Frequency
                        </button>
                    </div>
                )}
            </div>

            {/* Route Table */}
            <div className="route-table-container">
                <table className="route-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedRoutes.size === sortedMetrics.length && sortedMetrics.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>●</th>
                            <th>Route</th>
                            <th>Aircraft</th>
                            <th>Freq</th>
                            <th className="sortable" onClick={() => handleSort('distance')}>
                                Dist{getSortIndicator('distance')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('loadFactor')}>
                                Load{getSortIndicator('loadFactor')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('revenue')}>
                                Revenue{getSortIndicator('revenue')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('expenses')}>
                                Expenses{getSortIndicator('expenses')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('profit')}>
                                Profit{getSortIndicator('profit')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('aircraftAge')}>
                                Age{getSortIndicator('aircraftAge')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMetrics.length === 0 ? (
                            <tr>
                                <td colSpan={11} className="empty-routes">
                                    {state.routes.length === 0
                                        ? 'No routes yet. Create routes to start generating revenue!'
                                        : 'No routes match the current filter.'}
                                </td>
                            </tr>
                        ) : (
                            sortedMetrics.map(metric => {
                                const { route, revenue, expenses, profit, loadFactor, profitMargin } = metric;
                                const profitClass = getProfitabilityClass(profit, route.suspended);
                                const indicator = getProfitabilityIndicator(profit, route.suspended);
                                const ageYears = Math.floor(route.aircraft.age / 4);

                                return (
                                    <tr key={route.id} className={`route-row ${profitClass}`}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRoutes.has(route.id)}
                                                onChange={() => handleSelectRoute(route.id)}
                                            />
                                        </td>
                                        <td className="indicator">{indicator}</td>
                                        <td className="route-name">
                                            {route.origin.code} → {route.destination.code}
                                        </td>
                                        <td className="aircraft-name">{route.aircraft.type.name}</td>
                                        <td>{route.suspended ? '-' : `${route.flights_per_week}/wk`}</td>
                                        <td>{route.distance.toLocaleString()}km</td>
                                        <td>{route.suspended ? '-' : `${(loadFactor * 100).toFixed(0)}%`}</td>
                                        <td className="money">${formatMoney(revenue)}</td>
                                        <td className="money">${formatMoney(expenses)}</td>
                                        <td className={`money ${profit > 0 ? 'positive' : 'negative'}`}>
                                            ${formatMoney(profit)}
                                        </td>
                                        <td className={ageYears > 15 ? 'warning' : ''}>
                                            {ageYears}y
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bulk Action Modals */}
            <ConfirmModal
                isOpen={bulkAction === 'suspend'}
                onClose={() => setBulkAction(null)}
                onConfirm={handleBulkAction}
                title="Suspend Selected Routes?"
                message={`Are you sure you want to suspend ${selectedRoutes.size} route(s)? Aircraft will become available for reassignment.`}
                confirmText="Suspend Routes"
                isDestructive={false}
            />

            <ConfirmModal
                isOpen={bulkAction === 'resume'}
                onClose={() => setBulkAction(null)}
                onConfirm={handleBulkAction}
                title="Resume Selected Routes?"
                message={`Are you sure you want to resume ${selectedRoutes.size} route(s)?`}
                confirmText="Resume Routes"
                isDestructive={false}
            />

            {bulkAction === 'frequency' && (
                <ConfirmModal
                    isOpen={true}
                    onClose={() => setBulkAction(null)}
                    onConfirm={handleBulkAction}
                    title="Change Frequency for Selected Routes"
                    message={
                        <div>
                            <p>Set new frequency for {selectedRoutes.size} route(s):</p>
                            <div style={{ marginTop: '12px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>
                                    Flights per week:
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="14"
                                    value={bulkFrequency}
                                    onChange={e => setBulkFrequency(parseInt(e.target.value) || 1)}
                                    style={{ width: '100%', padding: '8px' }}
                                />
                            </div>
                        </div>
                    }
                    confirmText="Update Frequency"
                    isDestructive={false}
                />
            )}
        </div>
    );
}
