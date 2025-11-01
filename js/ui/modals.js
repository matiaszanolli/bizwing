// Modal management
import { formatMoney } from '../utils/helpers.js';
import { getAvailableAircraft } from '../data/aircraft.js';

export class ModalManager {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.state = gameEngine.state;
    }

    // Close all modals
    closeAll() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Buy/Lease aircraft modal
    showBuyPlane() {
        const modal = document.getElementById('buy-plane-modal');
        const options = document.getElementById('plane-options');
        options.innerHTML = '';

        const availableAircraft = getAvailableAircraft(this.state.year);

        availableAircraft.forEach(plane => {
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
            div.onclick = () => this.showAircraftPurchaseOptions(plane);
            options.appendChild(div);
        });

        modal.classList.add('active');
    }

    // Ask buy or lease
    showAircraftPurchaseOptions(planeType) {
        const choice = confirm(
            `BUY (OK) or LEASE (Cancel)?\n\n${planeType.name}\n` +
            `Buy: $${formatMoney(planeType.price)}\n` +
            `Lease: $${formatMoney(planeType.lease_per_quarter)}/quarter`
        );

        if (choice) {
            this.engine.buyAircraft(planeType);
        } else {
            this.engine.leaseAircraft(planeType);
        }
        this.closeAll();
    }

    // Route creation modal
    showRoute(fromAirportId) {
        const modal = document.getElementById('route-modal');
        const fromSelect = document.getElementById('route-from');
        const toSelect = document.getElementById('route-to');
        const aircraftSelect = document.getElementById('route-aircraft');

        // Populate from airports (owned only)
        fromSelect.innerHTML = '';
        this.state.getOwnedAirports().forEach(airport => {
            const option = document.createElement('option');
            option.value = airport.id;
            option.textContent = `${airport.id} - ${airport.name}`;
            fromSelect.appendChild(option);
        });
        if (fromAirportId) {
            fromSelect.value = fromAirportId;
        }

        // Populate to airports (all)
        toSelect.innerHTML = '';
        this.state.airports.forEach(airport => {
            const option = document.createElement('option');
            option.value = airport.id;
            option.textContent = `${airport.id} - ${airport.name}`;
            toSelect.appendChild(option);
        });

        // Populate available aircraft
        aircraftSelect.innerHTML = '';
        const availableAircraft = this.state.getAvailableAircraft();
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

    // Loan modal
    showLoan() {
        const modal = document.getElementById('loan-modal');
        this.updateLoanInfo();
        modal.classList.add('active');
    }

    updateLoanInfo() {
        const amount = parseInt(document.getElementById('loan-amount').value);
        const quarters = parseInt(document.getElementById('loan-quarters').value);
        const interestRate = 0.02;
        const quarterlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -quarters));

        const info = document.getElementById('loan-info');
        info.innerHTML = `Quarterly payment: $${formatMoney(quarterlyPayment)}<br>` +
                        `Total repayment: $${formatMoney(quarterlyPayment * quarters)}<br>` +
                        `Interest rate: 2% per quarter`;
    }

    // Advertising modal
    showAdvertising() {
        const modal = document.getElementById('advertising-modal');
        document.getElementById('ad-budget').value = this.state.advertisingBudget;
        document.getElementById('current-ad-budget').textContent = formatMoney(this.state.advertisingBudget);
        modal.classList.add('active');
    }
}
