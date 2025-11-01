// Game State
const gameState = {
    year: 1992,
    quarter: 1,
    cash: 50000000,
    playerAirline: 'Phoenix Air',
    reputation: 75, // 0-100 scale
    airports: [],
    fleet: [],
    routes: [],
    competitors: [],
    newsLog: [],
    loans: [],
    researchLevel: 0, // 0-10 scale
    advertisingBudget: 0,
    fuelPrice: 1.0, // multiplier
    economicCondition: 1.0, // multiplier for demand
    events: []
};

// Aircraft types
const aircraftTypes = [
    // Regional Jets
    { name: 'Embraer ERJ-145', category: 'Regional', capacity: 50, range: 2400, price: 18000000, operating_cost: 3500, lease_per_quarter: 500000 },
    { name: 'Bombardier CRJ-200', category: 'Regional', capacity: 50, range: 2100, price: 20000000, operating_cost: 3800, lease_per_quarter: 550000 },

    // Narrow-body
    { name: 'Boeing 737-300', category: 'Narrow-body', capacity: 140, range: 2800, price: 35000000, operating_cost: 8000, lease_per_quarter: 900000 },
    { name: 'Airbus A320', category: 'Narrow-body', capacity: 150, range: 3300, price: 40000000, operating_cost: 8500, lease_per_quarter: 1000000 },
    { name: 'Boeing 737-800', category: 'Narrow-body', capacity: 162, range: 3200, price: 50000000, operating_cost: 9000, lease_per_quarter: 1200000 },

    // Wide-body
    { name: 'Boeing 767-300ER', category: 'Wide-body', capacity: 218, range: 5600, price: 90000000, operating_cost: 15000, lease_per_quarter: 2200000 },
    { name: 'Boeing 777-200', category: 'Wide-body', capacity: 305, range: 7700, price: 160000000, operating_cost: 22000, lease_per_quarter: 3800000 },
    { name: 'Airbus A330-300', category: 'Wide-body', capacity: 277, range: 6100, price: 130000000, operating_cost: 18000, lease_per_quarter: 3200000 },

    // Jumbo/Ultra long-haul
    { name: 'Boeing 747-400', category: 'Jumbo', capacity: 416, range: 7200, price: 180000000, operating_cost: 25000, lease_per_quarter: 4500000 },
    { name: 'McDonnell Douglas MD-11', category: 'Wide-body', capacity: 298, range: 6800, price: 120000000, operating_cost: 20000, lease_per_quarter: 3000000 },
    { name: 'Airbus A340-300', category: 'Wide-body', capacity: 295, range: 7400, price: 150000000, operating_cost: 23000, lease_per_quarter: 3700000 },

    // Supersonic
    { name: 'Concorde', category: 'Supersonic', capacity: 100, range: 3900, price: 250000000, operating_cost: 35000, lease_per_quarter: 6000000 },

    // Cargo
    { name: 'Boeing 747F', category: 'Cargo', capacity: 0, cargo_capacity: 112, range: 6800, price: 170000000, operating_cost: 24000, lease_per_quarter: 4200000 },
    { name: 'Boeing 767F', category: 'Cargo', capacity: 0, cargo_capacity: 52, range: 5400, price: 95000000, operating_cost: 16000, lease_per_quarter: 2400000 }
];

// Major airports (x, y coordinates on SVG map)
const airports = [
    // North America
    { id: 'JFK', name: 'New York', x: 200, y: 150, region: 'North America', owned: true, market_size: 1000000, slots_available: 20 },
    { id: 'LAX', name: 'Los Angeles', x: 120, y: 170, region: 'North America', owned: false, market_size: 900000, slots_available: 18 },
    { id: 'ORD', name: 'Chicago', x: 180, y: 140, region: 'North America', owned: false, market_size: 850000, slots_available: 20 },
    { id: 'DFW', name: 'Dallas', x: 160, y: 180, region: 'North America', owned: false, market_size: 700000, slots_available: 16 },
    { id: 'YYZ', name: 'Toronto', x: 190, y: 130, region: 'North America', owned: false, market_size: 600000, slots_available: 14 },
    { id: 'MEX', name: 'Mexico City', x: 150, y: 200, region: 'North America', owned: false, market_size: 750000, slots_available: 15 },

    // Europe
    { id: 'LHR', name: 'London', x: 400, y: 120, region: 'Europe', owned: false, market_size: 1100000, slots_available: 15 },
    { id: 'CDG', name: 'Paris', x: 420, y: 130, region: 'Europe', owned: false, market_size: 850000, slots_available: 16 },
    { id: 'FRA', name: 'Frankfurt', x: 430, y: 125, region: 'Europe', owned: false, market_size: 800000, slots_available: 18 },
    { id: 'AMS', name: 'Amsterdam', x: 415, y: 118, region: 'Europe', owned: false, market_size: 700000, slots_available: 14 },
    { id: 'MAD', name: 'Madrid', x: 395, y: 145, region: 'Europe', owned: false, market_size: 650000, slots_available: 12 },
    { id: 'FCO', name: 'Rome', x: 440, y: 145, region: 'Europe', owned: false, market_size: 600000, slots_available: 12 },
    { id: 'SVO', name: 'Moscow', x: 480, y: 105, region: 'Europe', owned: false, market_size: 750000, slots_available: 16 },

    // Asia
    { id: 'NRT', name: 'Tokyo', x: 680, y: 160, region: 'Asia', owned: false, market_size: 1200000, slots_available: 22 },
    { id: 'HKG', name: 'Hong Kong', x: 650, y: 200, region: 'Asia', owned: false, market_size: 950000, slots_available: 14 },
    { id: 'SIN', name: 'Singapore', x: 620, y: 240, region: 'Asia', owned: false, market_size: 880000, slots_available: 16 },
    { id: 'PEK', name: 'Beijing', x: 640, y: 150, region: 'Asia', owned: false, market_size: 1000000, slots_available: 20 },
    { id: 'ICN', name: 'Seoul', x: 670, y: 155, region: 'Asia', owned: false, market_size: 850000, slots_available: 18 },
    { id: 'BKK', name: 'Bangkok', x: 630, y: 220, region: 'Asia', owned: false, market_size: 750000, slots_available: 14 },
    { id: 'DEL', name: 'Delhi', x: 570, y: 190, region: 'Asia', owned: false, market_size: 800000, slots_available: 16 },
    { id: 'BOM', name: 'Mumbai', x: 560, y: 210, region: 'Asia', owned: false, market_size: 750000, slots_available: 14 },

    // Middle East
    { id: 'DXB', name: 'Dubai', x: 510, y: 200, region: 'Middle East', owned: false, market_size: 900000, slots_available: 20 },
    { id: 'DOH', name: 'Doha', x: 505, y: 205, region: 'Middle East', owned: false, market_size: 650000, slots_available: 14 },

    // Africa
    { id: 'JNB', name: 'Johannesburg', x: 460, y: 300, region: 'Africa', owned: false, market_size: 550000, slots_available: 10 },
    { id: 'CAI', name: 'Cairo', x: 470, y: 185, region: 'Africa', owned: false, market_size: 600000, slots_available: 12 },

    // Oceania
    { id: 'SYD', name: 'Sydney', x: 720, y: 280, region: 'Oceania', owned: false, market_size: 700000, slots_available: 12 },
    { id: 'AKL', name: 'Auckland', x: 750, y: 305, region: 'Oceania', owned: false, market_size: 400000, slots_available: 8 },

    // South America
    { id: 'GRU', name: 'Sao Paulo', x: 280, y: 280, region: 'South America', owned: false, market_size: 650000, slots_available: 10 },
    { id: 'EZE', name: 'Buenos Aires', x: 270, y: 305, region: 'South America', owned: false, market_size: 550000, slots_available: 10 },
    { id: 'BOG', name: 'Bogota', x: 240, y: 240, region: 'South America', owned: false, market_size: 500000, slots_available: 9 }
];

// Competitor airlines
const competitors = [
    { name: 'Global Airways', cash: 60000000, color: '#ff0000', reputation: 70, routes: [], fleet: [], airports: [], aggressive: true },
    { name: 'Sky Connect', cash: 55000000, color: '#00ffff', reputation: 75, routes: [], fleet: [], airports: [], aggressive: false },
    { name: 'Pacific Airlines', cash: 45000000, color: '#ff00ff', reputation: 65, routes: [], fleet: [], airports: [], aggressive: true }
];

// Random events that can occur
const eventTemplates = [
    { type: 'fuel_crisis', name: 'Oil Crisis', description: 'Fuel prices surge by 50%', fuelMultiplier: 1.5, duration: 4 },
    { type: 'fuel_drop', name: 'Oil Glut', description: 'Fuel prices drop by 30%', fuelMultiplier: 0.7, duration: 4 },
    { type: 'economic_boom', name: 'Economic Boom', description: 'Passenger demand increases 40%', demandMultiplier: 1.4, duration: 8 },
    { type: 'recession', name: 'Economic Recession', description: 'Passenger demand drops 35%', demandMultiplier: 0.65, duration: 6 },
    { type: 'airport_strike', name: 'Airport Strike', description: 'Operations disrupted at major hub', reputationChange: -10, cashChange: -2000000 },
    { type: 'tech_breakthrough', name: 'Technology Advance', description: 'New aircraft technology available', researchBonus: 1 },
    { type: 'competitor_bankrupt', name: 'Competitor Bankruptcy', description: 'A rival airline has gone bankrupt', marketShareBonus: 0.1 },
    { type: 'tourism_boom', name: 'Tourism Boom', description: 'International travel surges', demandMultiplier: 1.2, duration: 6 }
];

// Initialize game
function initGame() {
    gameState.airports = JSON.parse(JSON.stringify(airports));
    gameState.competitors = JSON.parse(JSON.stringify(competitors));

    // Start with 2 aircraft
    gameState.fleet.push({
        id: 1,
        type: aircraftTypes[2], // Boeing 737-300
        name: 'Phoenix 1',
        assigned_route: null,
        owned: true,
        age: 0
    });
    gameState.fleet.push({
        id: 2,
        type: aircraftTypes[2],
        name: 'Phoenix 2',
        assigned_route: null,
        owned: true,
        age: 0
    });

    // Initialize competitors with some assets
    gameState.competitors.forEach(comp => {
        // Give each competitor 1-2 airports
        const numAirports = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numAirports; i++) {
            const availableAirports = gameState.airports.filter(a => !a.owned && !a.competitor_owned);
            if (availableAirports.length > 0) {
                const airport = availableAirports[Math.floor(Math.random() * availableAirports.length)];
                airport.competitor_owned = comp.name;
                comp.airports.push(airport.id);
            }
        }
    });

    addNews('Welcome to Aerobiz Supersonic! Build your airline empire.');
    addNews('Manage routes, finances, and compete with rivals to dominate the skies.');

    renderGame();
    setupEventListeners();
}

// Rendering functions
function renderGame() {
    updateHeader();
    renderWorldMap();
    renderFleet();
    renderRoutes();
    renderAirports();
    renderCompetitors();
    renderFinancialReport();
    renderNews();
}

function updateHeader() {
    document.getElementById('current-quarter').textContent = `Q${gameState.quarter} ${gameState.year}`;
    document.getElementById('player-airline').textContent = `${gameState.playerAirline} | Reputation: ${gameState.reputation}/100`;
    document.getElementById('cash').textContent = `Cash: $${formatMoney(gameState.cash)}${gameState.loans.length > 0 ? ' | Debt: $' + formatMoney(getTotalDebt()) : ''}`;
}

function renderWorldMap() {
    const citiesGroup = document.getElementById('cities');
    const routesGroup = document.getElementById('routes-display');

    citiesGroup.innerHTML = '';
    routesGroup.innerHTML = '';

    // Draw routes first (so they appear behind cities)
    gameState.routes.forEach(route => {
        const from = gameState.airports.find(a => a.id === route.from);
        const to = gameState.airports.find(a => a.id === route.to);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('class', 'route-line');
        routesGroup.appendChild(line);
    });

    // Draw cities
    gameState.airports.forEach(airport => {
        const cityGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        cityGroup.setAttribute('class', 'city');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', airport.x);
        circle.setAttribute('cy', airport.y);
        circle.setAttribute('r', airport.owned ? 8 : (airport.competitor_owned ? 6 : 5));

        if (airport.owned) {
            circle.setAttribute('fill', '#ffff00');
        } else if (airport.competitor_owned) {
            const comp = gameState.competitors.find(c => c.name === airport.competitor_owned);
            circle.setAttribute('fill', comp ? comp.color : '#00ff00');
        }

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', airport.x);
        text.setAttribute('y', airport.y - 12);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = airport.id;

        cityGroup.appendChild(circle);
        cityGroup.appendChild(text);
        cityGroup.onclick = () => selectAirport(airport);

        citiesGroup.appendChild(cityGroup);
    });
}

function renderFleet() {
    const fleetList = document.getElementById('fleet-list');
    fleetList.innerHTML = '';

    if (gameState.fleet.length === 0) {
        fleetList.innerHTML = '<div>No aircraft owned</div>';
        return;
    }

    gameState.fleet.forEach(aircraft => {
        const div = document.createElement('div');
        const status = aircraft.assigned_route ? 'IN USE' : 'AVAILABLE';
        const ownership = aircraft.owned ? 'Owned' : 'Leased';
        div.innerHTML = `${aircraft.name} - ${aircraft.type.name}<br>` +
                       `${ownership} | Age: ${aircraft.age}Q | ${status}`;
        fleetList.appendChild(div);
    });
}

function renderRoutes() {
    const routesList = document.getElementById('routes-list');
    routesList.innerHTML = '';

    if (gameState.routes.length === 0) {
        routesList.innerHTML = '<div>No active routes</div>';
        return;
    }

    gameState.routes.forEach(route => {
        const div = document.createElement('div');
        div.className = 'route-item';
        const competition = calculateRouteCompetition(route);
        const profitability = estimateRouteProfitability(route);
        div.innerHTML = `${route.from} → ${route.to}<br>` +
                       `${route.aircraft.name} | ${route.flights_per_week}/wk<br>` +
                       `Competition: ${competition} | Est: $${formatMoney(profitability)}/Q`;
        routesList.appendChild(div);
    });
}

function renderAirports() {
    const airportsList = document.getElementById('airports-list');
    airportsList.innerHTML = '';

    gameState.airports.forEach(airport => {
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

        if (!airport.owned && !airport.competitor_owned) {
            div.onclick = () => buyAirportSlot(airport);
        }

        airportsList.appendChild(div);
    });
}

function renderCompetitors() {
    const competitorsList = document.getElementById('competitors-list');
    competitorsList.innerHTML = '';

    gameState.competitors.forEach(comp => {
        const div = document.createElement('div');
        div.className = 'competitor-item';
        div.innerHTML = `${comp.name}<br>` +
                       `Cash: $${formatMoney(comp.cash)}<br>` +
                       `Rep: ${comp.reputation} | Airports: ${comp.airports.length}`;
        div.style.borderColor = comp.color;
        competitorsList.appendChild(div);
    });
}

function renderFinancialReport() {
    const report = document.getElementById('financial-report');

    const totalRevenue = calculateQuarterlyRevenue();
    const totalExpenses = calculateQuarterlyExpenses();
    const profit = totalRevenue - totalExpenses;

    const fuelStatus = gameState.fuelPrice > 1.1 ? '↑' : (gameState.fuelPrice < 0.9 ? '↓' : '→');
    const economyStatus = gameState.economicCondition > 1.1 ? '↑' : (gameState.economicCondition < 0.9 ? '↓' : '→');

    report.innerHTML = `
        <div>Revenue: $${formatMoney(totalRevenue)}</div>
        <div>Expenses: $${formatMoney(totalExpenses)}</div>
        <div class="${profit >= 0 ? 'profit-positive' : 'profit-negative'}">
            Est. Profit: $${formatMoney(profit)}
        </div>
        <div style="margin-top: 10px; font-size: 10px;">
            Fuel: ${fuelStatus} ${Math.round(gameState.fuelPrice * 100)}%<br>
            Economy: ${economyStatus} ${Math.round(gameState.economicCondition * 100)}%<br>
            Active Loans: ${gameState.loans.length}
        </div>
    `;
}

function renderNews() {
    const newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = '';

    const recentNews = gameState.newsLog.slice(-5).reverse();
    recentNews.forEach(news => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.textContent = news;
        newsFeed.appendChild(div);
    });
}

// Event listeners
function setupEventListeners() {
    document.getElementById('next-turn-btn').onclick = advanceTurn;
    document.getElementById('buy-plane-btn').onclick = showBuyPlaneModal;
    document.getElementById('take-loan-btn').onclick = showLoanModal;
    document.getElementById('advertising-btn').onclick = showAdvertisingModal;

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = closeModals;
    });

    document.getElementById('create-route-btn').onclick = createRoute;
    document.getElementById('confirm-loan-btn').onclick = confirmLoan;
    document.getElementById('confirm-ad-btn').onclick = confirmAdvertising;

    // Update loan info when values change
    document.getElementById('loan-amount').oninput = updateLoanInfo;
    document.getElementById('loan-quarters').oninput = updateLoanInfo;
}

function selectAirport(airport) {
    if (airport.owned && hasAvailableAircraft()) {
        showRouteModal(airport);
    }
}

function showBuyPlaneModal() {
    const modal = document.getElementById('buy-plane-modal');
    const options = document.getElementById('plane-options');
    options.innerHTML = '';

    aircraftTypes.forEach(plane => {
        const div = document.createElement('div');
        div.className = 'plane-option';
        const capacityText = plane.capacity > 0 ?
            `${plane.capacity} pax` :
            `${plane.cargo_capacity}t cargo`;
        div.innerHTML = `
            <strong>${plane.name}</strong> [${plane.category}]<br>
            Capacity: ${capacityText} | Range: ${plane.range}km<br>
            <span style="color: #00ff00">BUY: $${formatMoney(plane.price)}</span> |
            <span style="color: #ffff00">LEASE: $${formatMoney(plane.lease_per_quarter)}/Q</span><br>
            Operating cost: $${formatMoney(plane.operating_cost)}/flight
        `;
        div.onclick = () => showAircraftPurchaseOptions(plane);
        options.appendChild(div);
    });

    modal.classList.add('active');
}

function showRouteModal(fromAirport) {
    const modal = document.getElementById('route-modal');
    const fromSelect = document.getElementById('route-from');
    const toSelect = document.getElementById('route-to');
    const aircraftSelect = document.getElementById('route-aircraft');

    // Populate from airports (owned only)
    fromSelect.innerHTML = '';
    gameState.airports.filter(a => a.owned).forEach(airport => {
        const option = document.createElement('option');
        option.value = airport.id;
        option.textContent = `${airport.id} - ${airport.name}`;
        fromSelect.appendChild(option);
    });
    fromSelect.value = fromAirport.id;

    // Populate to airports (all)
    toSelect.innerHTML = '';
    gameState.airports.forEach(airport => {
        const option = document.createElement('option');
        option.value = airport.id;
        option.textContent = `${airport.id} - ${airport.name}`;
        toSelect.appendChild(option);
    });

    // Populate available aircraft
    aircraftSelect.innerHTML = '';
    const availableAircraft = gameState.fleet.filter(a => !a.assigned_route);
    availableAircraft.forEach(aircraft => {
        const option = document.createElement('option');
        option.value = aircraft.id;
        option.textContent = `${aircraft.name} (${aircraft.type.name})`;
        aircraftSelect.appendChild(option);
    });

    if (availableAircraft.length === 0) {
        aircraftSelect.innerHTML = '<option>No available aircraft</option>';
    }

    modal.classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showLoanModal() {
    const modal = document.getElementById('loan-modal');
    updateLoanInfo();
    modal.classList.add('active');
}

function updateLoanInfo() {
    const amount = parseInt(document.getElementById('loan-amount').value);
    const quarters = parseInt(document.getElementById('loan-quarters').value);
    const interestRate = 0.02;
    const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));

    const info = document.getElementById('loan-info');
    info.innerHTML = `Quarterly payment: $${formatMoney(quarterlyPayment)}<br>` +
                    `Total repayment: $${formatMoney(quarterlyPayment * quarters)}<br>` +
                    `Interest rate: 2% per quarter`;
}

function confirmLoan() {
    const amount = parseInt(document.getElementById('loan-amount').value);
    const quarters = parseInt(document.getElementById('loan-quarters').value);
    takeLoan(amount, quarters);
    closeModals();
    renderGame();
}

function showAdvertisingModal() {
    const modal = document.getElementById('advertising-modal');
    document.getElementById('ad-budget').value = gameState.advertisingBudget;
    document.getElementById('current-ad-budget').textContent = formatMoney(gameState.advertisingBudget);
    modal.classList.add('active');
}

function confirmAdvertising() {
    const budget = parseInt(document.getElementById('ad-budget').value);
    gameState.advertisingBudget = budget;
    addNews(`Advertising budget set to $${formatMoney(budget)}/quarter`);
    closeModals();
    renderGame();
}

function showAircraftPurchaseOptions(planeType) {
    const choice = confirm(`BUY (OK) or LEASE (Cancel)?\n\n${planeType.name}\nBuy: $${formatMoney(planeType.price)}\nLease: $${formatMoney(planeType.lease_per_quarter)}/quarter`);

    if (choice) {
        buyAircraft(planeType);
    } else {
        leaseAircraft(planeType);
    }
}

function buyAircraft(planeType) {
    if (gameState.cash >= planeType.price) {
        gameState.cash -= planeType.price;
        const newId = gameState.fleet.length + 1;
        gameState.fleet.push({
            id: newId,
            type: planeType,
            name: `Phoenix ${newId}`,
            assigned_route: null,
            owned: true,
            age: 0
        });
        addNews(`Purchased ${planeType.name} for $${formatMoney(planeType.price)}`);
        closeModals();
        renderGame();
    } else {
        addNews('Insufficient funds to purchase aircraft!');
        renderNews();
    }
}

function leaseAircraft(planeType) {
    const newId = gameState.fleet.length + 1;
    gameState.fleet.push({
        id: newId,
        type: planeType,
        name: `Phoenix ${newId}`,
        assigned_route: null,
        owned: false,
        age: 0
    });
    addNews(`Leased ${planeType.name} for $${formatMoney(planeType.lease_per_quarter)}/quarter`);
    closeModals();
    renderGame();
}

function buyAirportSlot(airport) {
    const slotPrice = airport.market_size * 10; // Price based on market size

    if (gameState.cash >= slotPrice) {
        if (confirm(`Purchase slot at ${airport.name} for $${formatMoney(slotPrice)}?`)) {
            gameState.cash -= slotPrice;
            airport.owned = true;
            addNews(`Acquired slots at ${airport.name}`);
            renderGame();
        }
    } else {
        addNews('Insufficient funds to purchase airport slot!');
        renderNews();
    }
}

function createRoute() {
    const fromId = document.getElementById('route-from').value;
    const toId = document.getElementById('route-to').value;
    const aircraftId = parseInt(document.getElementById('route-aircraft').value);
    const flightsPerWeek = parseInt(document.getElementById('flights-per-week').value);

    if (fromId === toId) {
        alert('Cannot create route to same airport!');
        return;
    }

    const aircraft = gameState.fleet.find(a => a.id === aircraftId);
    if (!aircraft || aircraft.assigned_route) {
        alert('Aircraft not available!');
        return;
    }

    const from = gameState.airports.find(a => a.id === fromId);
    const to = gameState.airports.find(a => a.id === toId);

    // Check if destination is owned
    if (!to.owned) {
        alert('You must own slots at the destination airport!');
        return;
    }

    // Check range
    const distance = calculateDistance(from, to);
    if (distance > aircraft.type.range) {
        alert(`Aircraft range (${aircraft.type.range}km) insufficient for this route (${distance}km)!`);
        return;
    }

    // Create route
    const route = {
        from: fromId,
        to: toId,
        aircraft: aircraft,
        flights_per_week: flightsPerWeek,
        distance: distance
    };

    aircraft.assigned_route = route;
    gameState.routes.push(route);

    addNews(`New route opened: ${fromId} → ${toId}`);
    closeModals();
    renderGame();
}

function calculateDistance(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.floor(Math.sqrt(dx * dx + dy * dy) * 10); // Simplified distance
}

function calculateQuarterlyRevenue() {
    let revenue = 0;

    gameState.routes.forEach(route => {
        const routeRevenue = calculateRouteRevenue(route);
        revenue += routeRevenue;
    });

    return Math.floor(revenue);
}

function calculateRouteRevenue(route) {
    const from = gameState.airports.find(a => a.id === route.from);
    const to = gameState.airports.find(a => a.id === route.to);

    // Base load factor affected by reputation
    let loadFactor = 0.75 + (gameState.reputation - 75) / 200; // Reputation affects demand
    loadFactor = Math.max(0.4, Math.min(0.95, loadFactor));

    // Apply economic conditions
    loadFactor *= gameState.economicCondition;

    // Competition reduces load factor
    const competition = calculateRouteCompetition(route);
    const competitionPenalty = 1 - (competition * 0.1); // Each competitor reduces by 10%
    loadFactor *= competitionPenalty;

    const pricePerKm = 0.15;
    const passengersPerFlight = route.aircraft.type.capacity * loadFactor;
    const revenuePerFlight = passengersPerFlight * route.distance * pricePerKm;
    const flightsPerQuarter = route.flights_per_week * 13;

    return revenuePerFlight * flightsPerQuarter;
}

function calculateQuarterlyExpenses() {
    let expenses = 0;

    // Operating costs for routes (affected by fuel prices)
    gameState.routes.forEach(route => {
        const flightsPerQuarter = route.flights_per_week * 13;
        const baseCost = route.aircraft.type.operating_cost * flightsPerQuarter;
        expenses += baseCost * gameState.fuelPrice;
    });

    // Leasing costs
    gameState.fleet.forEach(aircraft => {
        if (!aircraft.owned) {
            expenses += aircraft.type.lease_per_quarter;
        }
    });

    // Fixed costs for owned airports
    const ownedAirports = gameState.airports.filter(a => a.owned);
    expenses += ownedAirports.length * 500000;

    // Fleet maintenance
    gameState.fleet.forEach(aircraft => {
        const agePenalty = 1 + (aircraft.age / 40); // Older planes cost more to maintain
        expenses += 200000 * agePenalty;
    });

    // Loan payments
    gameState.loans.forEach(loan => {
        expenses += loan.quarterly_payment;
    });

    // Advertising budget
    expenses += gameState.advertisingBudget;

    // Research costs
    expenses += gameState.researchLevel * 100000;

    return Math.floor(expenses);
}

function advanceTurn() {
    // Age aircraft
    gameState.fleet.forEach(aircraft => {
        aircraft.age++;
    });

    // Calculate financials
    const revenue = calculateQuarterlyRevenue();
    const expenses = calculateQuarterlyExpenses();
    const profit = revenue - expenses;

    gameState.cash += profit;

    // Update reputation based on performance
    if (profit > 0 && gameState.routes.length > 0) {
        gameState.reputation = Math.min(100, gameState.reputation + 1);
    } else if (profit < 0) {
        gameState.reputation = Math.max(0, gameState.reputation - 2);
    }

    // Advertising improves reputation
    if (gameState.advertisingBudget > 0) {
        const repGain = Math.floor(gameState.advertisingBudget / 1000000);
        gameState.reputation = Math.min(100, gameState.reputation + repGain);
    }

    // Advance time
    const lastQuarter = gameState.quarter;
    gameState.quarter++;
    if (gameState.quarter > 4) {
        gameState.quarter = 1;
        gameState.year++;
        addNews(`--- Year ${gameState.year} begins ---`);
    }

    // Add financial news
    if (profit > 0) {
        addNews(`Q${lastQuarter}: Profit of $${formatMoney(profit)}`);
    } else {
        addNews(`Q${lastQuarter}: Loss of $${formatMoney(Math.abs(profit))}`);
    }

    // Process active events
    processEvents();

    // Random event chance (10% each quarter)
    if (Math.random() < 0.1) {
        triggerRandomEvent();
    }

    // Update loan terms
    processLoans();

    // Simulate competitor activity
    simulateCompetitors();

    // Check game over
    if (gameState.cash < -10000000) { // Allow some debt
        alert('BANKRUPTCY! Game Over. You ran out of cash.');
        location.reload();
        return;
    }

    // Check win condition
    if (gameState.year >= 2000) {
        const score = calculateScore();
        alert(`Congratulations! You survived until ${gameState.year}!\nFinal Score: ${score}\nCash: $${formatMoney(gameState.cash)}\nReputation: ${gameState.reputation}`);
    }

    renderGame();
}

function simulateCompetitors() {
    gameState.competitors.forEach(comp => {
        // Competitors gain/lose money based on their airports and reputation
        const baseProfit = comp.airports.length * 2000000;
        const reputationFactor = comp.reputation / 75;
        const randomFactor = (Math.random() - 0.3) * 0.5;

        const profit = baseProfit * reputationFactor * (1 + randomFactor) * gameState.economicCondition;
        comp.cash += profit;

        // Aggressive competitors try to expand
        if (comp.aggressive && comp.cash > 15000000 && Math.random() < 0.15) {
            const availableAirports = gameState.airports.filter(a => !a.owned && !a.competitor_owned);
            if (availableAirports.length > 0) {
                const airport = availableAirports[Math.floor(Math.random() * availableAirports.length)];
                const price = airport.market_size * 10;
                if (comp.cash >= price) {
                    comp.cash -= price;
                    airport.competitor_owned = comp.name;
                    comp.airports.push(airport.id);
                    addNews(`${comp.name} acquired slots at ${airport.name}`);
                }
            }
        }

        // Update reputation
        if (profit > 0) {
            comp.reputation = Math.min(100, comp.reputation + 1);
        } else {
            comp.reputation = Math.max(20, comp.reputation - 2);
        }
    });
}

function hasAvailableAircraft() {
    return gameState.fleet.some(a => !a.assigned_route);
}

function addNews(message) {
    gameState.newsLog.push(message);
}

// New helper functions for enhanced gameplay

function calculateRouteCompetition(route) {
    // Count how many competitors have both airports
    let competitors = 0;
    gameState.competitors.forEach(comp => {
        if (comp.airports.includes(route.from) || comp.airports.includes(route.to)) {
            competitors++;
        }
    });
    return competitors;
}

function estimateRouteProfitability(route) {
    const revenue = calculateRouteRevenue(route);
    const flightsPerQuarter = route.flights_per_week * 13;
    const operatingCost = route.aircraft.type.operating_cost * flightsPerQuarter * gameState.fuelPrice;
    const leaseCost = route.aircraft.owned ? 0 : route.aircraft.type.lease_per_quarter;
    return revenue - operatingCost - leaseCost;
}

function getTotalDebt() {
    return gameState.loans.reduce((sum, loan) => sum + loan.remaining, 0);
}

function triggerRandomEvent() {
    const event = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
    const newEvent = { ...event, quartersRemaining: event.duration || 1 };

    // Apply event effects
    if (event.fuelMultiplier) {
        gameState.fuelPrice = event.fuelMultiplier;
    }
    if (event.demandMultiplier) {
        gameState.economicCondition = event.demandMultiplier;
    }
    if (event.reputationChange) {
        gameState.reputation = Math.max(0, Math.min(100, gameState.reputation + event.reputationChange));
    }
    if (event.cashChange) {
        gameState.cash += event.cashChange;
    }
    if (event.researchBonus) {
        gameState.researchLevel = Math.min(10, gameState.researchLevel + event.researchBonus);
    }

    gameState.events.push(newEvent);
    addNews(`EVENT: ${event.name} - ${event.description}`);
}

function processEvents() {
    gameState.events = gameState.events.filter(event => {
        event.quartersRemaining--;
        if (event.quartersRemaining <= 0) {
            // Event expired, reset modifiers
            if (event.fuelMultiplier) {
                gameState.fuelPrice = 1.0;
                addNews(`${event.name} ended - fuel prices normalized`);
            }
            if (event.demandMultiplier) {
                gameState.economicCondition = 1.0;
                addNews(`${event.name} ended - demand normalized`);
            }
            return false;
        }
        return true;
    });
}

function processLoans() {
    gameState.loans = gameState.loans.filter(loan => {
        loan.remaining -= loan.principal_payment;
        loan.quarters_remaining--;

        if (loan.quarters_remaining <= 0 || loan.remaining <= 0) {
            addNews(`Loan paid off! Principal was $${formatMoney(loan.original_amount)}`);
            return false;
        }
        return true;
    });
}

function takeLoan(amount, quarters) {
    const interestRate = 0.02; // 2% per quarter
    const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));
    const principalPayment = amount / quarters;

    const loan = {
        original_amount: amount,
        remaining: amount,
        quarterly_payment: quarterlyPayment,
        principal_payment: principalPayment,
        quarters_remaining: quarters,
        interest_rate: interestRate
    };

    gameState.loans.push(loan);
    gameState.cash += amount;
    addNews(`Loan approved: $${formatMoney(amount)} over ${quarters} quarters`);
}

function calculateScore() {
    const cashScore = gameState.cash / 1000000;
    const airportScore = gameState.airports.filter(a => a.owned).length * 100;
    const fleetScore = gameState.fleet.length * 50;
    const reputationScore = gameState.reputation * 10;
    const routeScore = gameState.routes.length * 75;

    return Math.floor(cashScore + airportScore + fleetScore + reputationScore + routeScore);
}

function formatMoney(amount) {
    return Math.floor(amount).toLocaleString();
}

// Start the game when page loads
window.onload = initGame;
