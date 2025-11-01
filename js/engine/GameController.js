// Main game controller
import { GameEngine } from './GameEngine.js';
import { UIRenderer } from '../ui/renderer.js';
import { ModalManager } from '../ui/modals.js';
import { formatMoney } from '../utils/helpers.js';

export class GameController {
    constructor() {
        this.engine = new GameEngine();
        this.renderer = new UIRenderer(this.engine);
        this.modals = new ModalManager(this.engine);
    }

    // Initialize and start game
    start() {
        this.engine.initialize();
        this.setupEventListeners();
        this.render();
    }

    // Render all UI
    render() {
        this.renderer.renderAll();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Main actions
        document.getElementById('next-turn-btn').onclick = () => this.advanceTurn();
        document.getElementById('buy-plane-btn').onclick = () => this.modals.showBuyPlane();
        document.getElementById('take-loan-btn').onclick = () => this.modals.showLoan();
        document.getElementById('advertising-btn').onclick = () => this.modals.showAdvertising();

        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => this.modals.closeAll();
        });

        // Modal confirm buttons
        document.getElementById('create-route-btn').onclick = () => this.createRoute();
        document.getElementById('confirm-loan-btn').onclick = () => this.confirmLoan();
        document.getElementById('confirm-ad-btn').onclick = () => this.confirmAdvertising();

        // Update loan info when values change
        document.getElementById('loan-amount').oninput = () => this.modals.updateLoanInfo();
        document.getElementById('loan-quarters').oninput = () => this.modals.updateLoanInfo();

        // Map city clicks
        this.setupMapClickHandlers();

        // Airport list clicks
        this.setupAirportClickHandlers();
    }

    setupMapClickHandlers() {
        // Use event delegation on the SVG group
        const citiesGroup = document.getElementById('cities');
        citiesGroup.addEventListener('click', (e) => {
            const cityGroup = e.target.closest('g.city');
            if (cityGroup) {
                const airportId = cityGroup.dataset.airportId;
                const airport = this.engine.state.findAirport(airportId);
                if (airport) {
                    this.selectAirport(airport);
                }
            }
        });
    }

    setupAirportClickHandlers() {
        // Use event delegation on the airport list
        const airportsList = document.getElementById('airports-list');
        airportsList.addEventListener('click', (e) => {
            const airportDiv = e.target.closest('.airport-item');
            if (airportDiv && airportDiv.dataset.airportId) {
                const airport = this.engine.state.findAirport(airportDiv.dataset.airportId);
                if (airport && !airport.owned && !airport.competitor_owned) {
                    this.buyAirportSlot(airport);
                }
            }
        });
    }

    // === ACTION HANDLERS ===

    selectAirport(airport) {
        if (airport.owned && this.engine.state.getAvailableAircraft().length > 0) {
            this.modals.showRoute(airport.id);
        }
    }

    buyAirportSlot(airport) {
        const slotPrice = airport.market_size * 10;
        if (confirm(`Purchase slot at ${airport.name} for $${formatMoney(slotPrice)}?`)) {
            if (this.engine.buyAirportSlot(airport)) {
                this.render();
            } else {
                this.render(); // Update to show news
            }
        }
    }

    createRoute() {
        const fromId = document.getElementById('route-from').value;
        const toId = document.getElementById('route-to').value;
        const aircraftId = parseInt(document.getElementById('route-aircraft').value);
        const flightsPerWeek = parseInt(document.getElementById('flights-per-week').value);

        const result = this.engine.createRoute(fromId, toId, aircraftId, flightsPerWeek);

        if (result.success) {
            this.modals.closeAll();
            this.render();
        } else {
            alert(result.error);
        }
    }

    confirmLoan() {
        const amount = parseInt(document.getElementById('loan-amount').value);
        const quarters = parseInt(document.getElementById('loan-quarters').value);
        this.engine.takeLoan(amount, quarters);
        this.modals.closeAll();
        this.render();
    }

    confirmAdvertising() {
        const budget = parseInt(document.getElementById('ad-budget').value);
        this.engine.setAdvertisingBudget(budget);
        this.modals.closeAll();
        this.render();
    }

    advanceTurn() {
        const result = this.engine.advanceTurn();

        if (result.gameOver) {
            alert('BANKRUPTCY! Game Over. You ran out of cash.');
            location.reload();
            return;
        }

        if (result.victory) {
            alert(
                `Congratulations! You survived until ${this.engine.state.year}!\n` +
                `Final Score: ${result.score}\n` +
                `Cash: $${formatMoney(this.engine.state.cash)}\n` +
                `Reputation: ${this.engine.state.reputation}`
            );
        }

        this.render();
    }

    // === SAVE/LOAD (Future feature) ===

    saveGame() {
        const saveData = this.engine.state.serialize();
        localStorage.setItem('aerobiz_save', JSON.stringify(saveData));
        this.engine.state.addNews('Game saved successfully');
        this.render();
    }

    loadGame() {
        const saveData = localStorage.getItem('aerobiz_save');
        if (saveData) {
            this.engine.state.deserialize(JSON.parse(saveData));
            this.engine.state.addNews('Game loaded successfully');
            this.render();
            return true;
        }
        return false;
    }
}
