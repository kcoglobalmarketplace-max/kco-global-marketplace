/**
 * assets/js/checkout.js
 * K.C.O. Global Marketplace - Multi-Currency Checkout & Bank Transfer Module
 */

// Global Checkout State Matrix
const CheckoutState = {
    cartItems: [],
    currency: 'USD',
    exchangeRates: { 
        USD: 1.0, EUR: 0.88, GBP: 0.76, JPY: 150.0, 
        CAD: 1.35, AUD: 1.50, SGD: 1.34, MXN: 17.10, IDR: 15700.0 
    },
    shippingCost: 15.00,
    taxRate: 0.075,
    discountMultiplier: 1.0
};

// Global Multi-Currency Bank Ledger Assets
const BankLedger = {
    USD: {
        bankName: "Citibank",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "70589490002447647",
        routing: "031100209",
        swift: "CITIUS33",
        accountType: "CHECKING",
        address: "111 Wall Street New York, NY 10043 USA"
    },
    EUR: {
        bankName: "Citibank",
        beneficiary: "KENNETH CHIDERA ODENYI",
        iban: "IE70CITI99005171297018",
        bic: "CITIIE2X",
        address: "1 North Wall Quay, International Financial Services Centre (IFSC), Dublin 1, Ireland"
    },
    GBP: {
        bankName: "Citibank",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "56468624",
        sortCode: "185008",
        iban: "GB94CITI18500856468624",
        bic: "CITIGB2L",
        address: "Canada Square, Canary Wharf London, E14 5LB United Kingdom"
    },
    JPY: {
        bankName: "MUFG Bank, Ltd.",
        beneficiary: "ペイオニア ジヤパン(カ",
        accountNumber: "4682719",
        branchCode: "869",
        bankCode: "0005",
        accountType: "Savings / Futsu",
        address: "7-1 Marunouchi 2-Chome, Chiyoda-ku Tokyo, Japan"
    },
    CAD: {
        bankName: "Citibank NA Canadian Branch",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "3001440544",
        transitNumber: "20012",
        institutionNumber: "0328",
        accountType: "CHECKING",
        address: "123 Front St. West Toronto, ON M5J 2M3"
    },
    AUD: {
        bankName: "Citibank",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "10674571",
        bsb: "248024",
        address: "2 Park Street, Sydney NSW 2000"
    },
    SGD: {
        bankName: "Citibank N.A., Singapore Branch",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "44990709533",
        bankCode: "7214",
        branchCode: "001",
        swift: "CITISGSG",
        address: "8 Marina View #17-01 Asia Square Tower 1 Singapore 018960"
    },
    MXN: {
        bankName: "Sistema de Transferencias y Pagos",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "646010504200345127",
        bankCode: "646",
        branchCode: "010",
        address: "Av. Insurgentes Sur 1425, Insurgentes Mixcoac, Benito Juárez, 03920 Ciudad de México, CDMX, México"
    },
    IDR: {
        bankName: "Deutsche Bank AG Jakarta Branch",
        beneficiary: "KENNETH CHIDERA ODENYI",
        accountNumber: "974400000904",
        branchCode: "0670304",
        address: "Deutsche Bank Building 5th Floor, Jl. Imam Bonjol 80, Jakarta 10310 Indonesia"
    }
};

// Target DOM Elements Selector Registry
const DOM = {
    itemsContainer: document.getElementById('checkout-items-container'),
    subtotal: document.getElementById('summary-subtotal'),
    shipping: document.getElementById('summary-shipping'),
    tax: document.getElementById('summary-tax'),
    total: document.getElementById('summary-total'),
    currencySelect: document.getElementById('currency-select'),
    btnProceed: document.getElementById('btn-proceed-payment'),
    bankTransferDetails: document.getElementById('bank-transfer-details') // Target injection wrapper
};

const CheckoutManager = {
    init() {
        this.loadCart();
        this.registerEventListeners();
        this.render();
    },

    loadCart() {
        try {
            const rawCart = localStorage.getItem('kco_cart');
            CheckoutState.cartItems = rawCart ? JSON.parse(rawCart) : [];
        } catch (error) {
            CheckoutState.cartItems = [];
        }
    },

    registerEventListeners() {
        if (DOM.currencySelect) {
            DOM.currencySelect.addEventListener('change', (e) => {
                CheckoutState.currency = e.target.value;
                this.render();
            });
        }

        // Handle structural UI updates when payment method radios change
        document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.togglePaymentMethodUI(e.target.value);
            });
        });

        if (DOM.btnProceed) {
            DOM.btnProceed.addEventListener('click', () => this.executePaymentRouting());
        }
    },

    togglePaymentMethodUI(method) {
        if (!DOM.bankTransferDetails) return;

        if (method === 'bank-transfer') {
            const dynamicDetailsHTML = this.generateBankDetailsHTML();
            DOM.bankTransferDetails.innerHTML = dynamicDetailsHTML;
            DOM.bankTransferDetails.style.display = 'block';
        } else {
            DOM.bankTransferDetails.style.display = 'none';
            DOM.bankTransferDetails.innerHTML = '';
        }
    },

    generateBankDetailsHTML() {
        const currentCurrency = CheckoutState.currency;
        const bank = BankLedger[currentCurrency] || BankLedger['USD']; // Fallback to USD parameters safely
        const referenceCode = `KCO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        
        let localFields = '';
        
        // Conditional block fields depending on localized requirements
        if (bank.routing) localFields += `<p><strong>Routing (ABA):</strong> ${bank.routing}</p>`;
        if (bank.sortCode) localFields += `<p><strong>Sort Code:</strong> ${bank.sortCode}</p>`;
        if (bank.bsb) localFields += `<p><strong>Branch Code (BSB):</strong> ${bank.bsb}</p>`;
        if (bank.iban) localFields += `<p><strong>IBAN:</strong> <span class="monospaced">${bank.iban}</span></p>`;
        if (bank.bic) localFields += `<p><strong>BIC / SWIFT:</strong> ${bank.bic}</p>`;
        if (bank.swift && !bank.bic) localFields += `<p><strong>SWIFT Code:</strong> ${bank.swift}</p>`;
        if (bank.bankCode) localFields += `<p><strong>Bank Code:</strong> ${bank.bankCode}</p>`;
        if (bank.branchCode && !bank.bsb) localFields += `<p><strong>Branch Code:</strong> ${bank.branchCode}</p>`;
        if (bank.institutionNumber) localFields += `<p><strong>Institution Number:</strong> ${bank.institutionNumber}</p>`;
        if (bank.transitNumber) localFields += `<p><strong>Transit Number:</strong> ${bank.transitNumber}</p>`;
        if (bank.accountType) localFields += `<p><strong>Account Type:</strong> ${bank.accountType}</p>`;

        return `
            <div class="bank-instructions-box animate-fade-in">
                <h4>🏦 Local ${currentCurrency} Bank Transfer Wire Instructions</h4>
                <p class="notice-text">Please transfer the exact order amount to the localized bank channel designated below:</p>
                <hr />
                <div class="bank-details-grid">
                    <p><strong>Beneficiary Name:</strong> <span class="highlight-text">${bank.beneficiary}</span></p>
                    <p><strong>Bank Name:</strong> ${bank.bankName}</p>
                    ${bank.accountNumber ? `<p><strong>Account Number:</strong> <span class="monospaced">${bank.accountNumber}</span></p>` : ''}
                    ${localFields}
                    <p><strong>Bank Address:</strong> <span class="small-text">${bank.address}</span></p>
                </div>
                <div class="reference-alert-box">
                    <strong>⚠️ CRITICAL TRANSFER REFERENCE REFERENCE:</strong> 
                    <span class="ref-code" id="order-ref-target">${referenceCode}</span>
                    <small>You must enter this code inside your banking app transaction message field to authorize confirmation.</small>
                </div>
            </div>
        `;
    },

    formatCurrency(valueInUSD) {
        const rate = CheckoutState.exchangeRates[CheckoutState.currency] || 1.0;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: CheckoutState.currency
        }).format(valueInUSD * rate);
    },

    calculateTotals() {
        const subtotal = CheckoutState.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const physicalSubtotal = subtotal * CheckoutState.discountMultiplier;
        const shipping = CheckoutState.cartItems.length > 0 ? CheckoutState.shippingCost : 0;
        const tax = physicalSubtotal * CheckoutState.taxRate;
        const total = physicalSubtotal + shipping + tax;
        return { subtotal, shipping, tax, total };
    },

    render() {
        if (!DOM.itemsContainer) return;

        if (CheckoutState.cartItems.length === 0) {
            DOM.itemsContainer.innerHTML = `<p class="empty-notice">Your cart is currently empty.</p>`;
            return;
        }

        // Renders pricing tables
        const metrics = this.calculateTotals();
        if (DOM.subtotal) DOM.subtotal.textContent = this.formatCurrency(metrics.subtotal);
        if (DOM.shipping) DOM.shipping.textContent = this.formatCurrency(metrics.shipping);
        if (DOM.tax) DOM.tax.textContent = this.formatCurrency(metrics.tax);
        if (DOM.total) DOM.total.textContent = this.formatCurrency(metrics.total);

        // Auto-refresh bank node details UI if it's currently selected open
        const activeRadio = document.querySelector('input[name="payment-method"]:checked');
        if (activeRadio && activeRadio.value === 'bank-transfer') {
            this.togglePaymentMethodUI('bank-transfer');
        }
    },

    executePaymentRouting() {
        const paymentRadio = document.querySelector('input[name="payment-method"]:checked');
        const selectedMethod = paymentRadio ? paymentRadio.value : 'bank-transfer';
        const calculation = this.calculateTotals();
        const refElement = document.getElementById('order-ref-target');
        const activeRef = refElement ? refElement.textContent : 'KCO-GENERIC';

        const payload = {
            method: selectedMethod,
            currency: CheckoutState.currency,
            amount: (calculation.total * (CheckoutState.exchangeRates[CheckoutState.currency] || 1.0)).toFixed(2),
            reference: activeRef,
            items: CheckoutState.cartItems
        };

        if (selectedMethod === 'bank-transfer') {
            alert(`Order Saved! Please wire ${payload.amount} ${payload.currency} to the displayed account with reference code: ${payload.reference}`);
            // Forward user execution context to complete verification pipelines
            window.location.href = `order-confirmation.html?ref=${payload.reference}&amt=${payload.amount}&cur=${payload.currency}`;
        } else {
            alert(`Redirecting execution engine context towards standard checkout gateway interface...`);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => CheckoutManager.init());