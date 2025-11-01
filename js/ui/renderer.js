// UI Rendering module
import { formatMoney } from '../utils/helpers.js';

export class UIRenderer {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.state = gameEngine.state;
    }

    // Render all UI components
    renderAll() {
        this.renderHeader();
        this.renderWorldMap();
        this.renderFleet();
        this.renderRoutes();
        this.renderAirports();
        this.renderCompetitors();
        this.renderFinancialReport();
        this.renderNews();
    }

    // Header (quarter, reputation, cash)
    renderHeader() {
        const state = this.state;
        document.getElementById('current-quarter').textContent = state.getDateString();
        document.getElementById('player-airline').textContent =
            `${state.playerAirline} | Reputation: ${state.reputation}/100`;

        const debtText = state.loans.length > 0 ?
            ` | Debt: $${formatMoney(state.getTotalDebt())}` : '';
        document.getElementById('cash').textContent =
            `Cash: $${formatMoney(state.cash)}${debtText}`;
    }

    // World map with airports and routes
    renderWorldMap() {
        const citiesGroup = document.getElementById('cities');
        const routesGroup = document.getElementById('routes-display');

        citiesGroup.innerHTML = '';
        routesGroup.innerHTML = '';

        // Draw routes
        this.state.routes.forEach(route => {
            const from = this.state.findAirport(route.from);
            const to = this.state.findAirport(route.to);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
            line.setAttribute('class', 'route-line');
            routesGroup.appendChild(line);
        });

        // Draw cities
        this.state.airports.forEach(airport => {
            const cityGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            cityGroup.setAttribute('class', 'city');

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', airport.x);
            circle.setAttribute('cy', airport.y);
            circle.setAttribute('r', airport.owned ? 8 : (airport.competitor_owned ? 6 : 5));

            if (airport.owned) {
                circle.setAttribute('fill', '#ffff00');
            } else if (airport.competitor_owned) {
                const comp = this.state.competitors.find(c => c.name === airport.competitor_owned);
                circle.setAttribute('fill', comp ? comp.color : '#00ff00');
            }

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', airport.x);
            text.setAttribute('y', airport.y - 12);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = airport.id;

            cityGroup.appendChild(circle);
            cityGroup.appendChild(text);

            // Event will be attached by controller
            cityGroup.dataset.airportId = airport.id;

            citiesGroup.appendChild(cityGroup);
        });
    }

    // Fleet list
    renderFleet() {
        const fleetList = document.getElementById('fleet-list');
        fleetList.innerHTML = '';

        if (this.state.fleet.length === 0) {
            fleetList.innerHTML = '<div>No aircraft owned</div>';
            return;
        }

        this.state.fleet.forEach(aircraft => {
            const div = document.createElement('div');
            const status = aircraft.assigned_route ? 'IN USE' : 'AVAILABLE';
            const ownership = aircraft.owned ? 'Owned' : 'Leased';
            div.innerHTML = `${aircraft.name} - ${aircraft.type.name}<br>` +
                           `${ownership} | Age: ${aircraft.age}Q | ${status}`;
            fleetList.appendChild(div);
        });
    }

    // Active routes
    renderRoutes() {
        const routesList = document.getElementById('routes-list');
        routesList.innerHTML = '';

        if (this.state.routes.length === 0) {
            routesList.innerHTML = '<div>No active routes</div>';
            return;
        }

        this.state.routes.forEach(route => {
            const div = document.createElement('div');
            div.className = 'route-item';
            const competition = this.engine.calculateRouteCompetition(route);
            const profitability = this.engine.estimateRouteProfitability(route);
            div.innerHTML = `${route.from} → ${route.to}<br>` +
                           `${route.aircraft.name} | ${route.flights_per_week}/wk<br>` +
                           `Competition: ${competition} | Est: $${formatMoney(profitability)}/Q`;
            routesList.appendChild(div);
        });
    }

    // Airport list
    renderAirports() {
        const airportsList = document.getElementById('airports-list');
        airportsList.innerHTML = '';

        this.state.airports.forEach(airport => {
            const div = document.createElement('div');
            let className = 'airport-item';
            let ownershipText = 'Available';

            if (airport.owned) {
                className += ' owned';
                ownershipText = 'YOUR HUB';
            } else if (airport.competitor_owned) {
                ownershipText = airport.competitor_owned;
            } else {
                className += ' clickable';
            }

            div.className = className;
            div.innerHTML = `${airport.id} - ${airport.name}<br>` +
                           `Market: ${Math.floor(airport.market_size / 1000)}K | ${airport.region}<br>` +
                           `${ownershipText}`;

            // Event will be attached by controller
            div.dataset.airportId = airport.id;

            airportsList.appendChild(div);
        });
    }

    // Competitors
    renderCompetitors() {
        const competitorsList = document.getElementById('competitors-list');
        competitorsList.innerHTML = '';

        this.state.competitors.forEach(comp => {
            const div = document.createElement('div');
            div.className = 'competitor-item';
            div.innerHTML = `${comp.name}<br>` +
                           `Cash: $${formatMoney(comp.cash)}<br>` +
                           `Rep: ${comp.reputation} | Airports: ${comp.airports.length}`;
            div.style.borderColor = comp.color;
            competitorsList.appendChild(div);
        });
    }

    // Financial report
    renderFinancialReport() {
        const report = document.getElementById('financial-report');

        const totalRevenue = this.engine.calculateQuarterlyRevenue();
        const totalExpenses = this.engine.calculateQuarterlyExpenses();
        const profit = totalRevenue - totalExpenses;

        const fuelStatus = this.state.fuelPrice > 1.1 ? '↑' :
                          (this.state.fuelPrice < 0.9 ? '↓' : '→');
        const economyStatus = this.state.economicCondition > 1.1 ? '↑' :
                             (this.state.economicCondition < 0.9 ? '↓' : '→');

        report.innerHTML = `
            <div>Revenue: $${formatMoney(totalRevenue)}</div>
            <div>Expenses: $${formatMoney(totalExpenses)}</div>
            <div class="${profit >= 0 ? 'profit-positive' : 'profit-negative'}">
                Est. Profit: $${formatMoney(profit)}
            </div>
            <div style="margin-top: 10px; font-size: 10px;">
                Fuel: ${fuelStatus} ${Math.round(this.state.fuelPrice * 100)}%<br>
                Economy: ${economyStatus} ${Math.round(this.state.economicCondition * 100)}%<br>
                Active Loans: ${this.state.loans.length}
            </div>
        `;
    }

    // News feed
    renderNews() {
        const newsFeed = document.getElementById('news-feed');
        newsFeed.innerHTML = '';

        const recentNews = this.state.newsLog.slice(-5).reverse();
        recentNews.forEach(news => {
            const div = document.createElement('div');
            div.className = 'news-item';
            div.textContent = news;
            newsFeed.appendChild(div);
        });
    }
}
