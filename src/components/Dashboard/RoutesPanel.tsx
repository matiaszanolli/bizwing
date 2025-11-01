// Routes display panel

import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { formatMoney } from '../../utils/helpers';

export function RoutesPanel() {
    const { state, engine } = useGame();

    return (
        <div className="panel routes-panel">
            <h2>Routes ({state.routes.length})</h2>
            <div className="routes-list">
                {state.routes.length === 0 ? (
                    <p className="empty-message">No routes yet. Create a route to start earning revenue!</p>
                ) : (
                    state.routes.map((route, index) => {
                        const revenue = engine.calculateRouteRevenue(route);
                        const cost = route.aircraft.type.operating_cost * route.flights_per_week * 13;
                        const profit = revenue - cost;
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
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
