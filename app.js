/**
 * K.C.O Global Marketplace - Standard UI Runtime Engine
 * Manages responsive layout structures, auth modal flow tracking, 
 * search indexes routing, checkout, and manual asset payment confirmation validation.
 */

const ClientEngine = {
    state: {
        activeUser: null,
        shoppingCart: [],
        selectedCategoryFilter: "all",
        searchToken: ""
    },

    init() {
        this.cacheClientDOM();
        this.bindClientEvents();
        this.loadClientState();
    },

    cacheClientDOM() {
        this.dom = {
            navBar: document.getElementById("horizontal-category-navigation-bar"),
            gridContainer: document.getElementById("marketplace-asymmetric-grid-layout"),
            cartCounter: document.getElementById("cart-badge-indicator-element"),
            checkoutWrapper: document.getElementById("checkout-portal-frame-wrapper"),
            mainViewLayout: document.getElementById("marketplace-main-client-view"),
            searchField: document.getElementById("global-search-input-field")
        };
    },

    bindClientEvents() {
        this.dom.searchField?.addEventListener("input", (e) => {
            this.state.searchToken = e.target.value.toLowerCase();
            this.renderProductGrid();
        });

        document.getElementById("user-auth-modal-trigger")?.addEventListener("click", () => this.toggleAuthenticationModalView(true));
        document.getElementById("close-auth-modal-btn")?.addEventListener("click", () => this.toggleAuthenticationModalView(false));
        document.getElementById("execute-login-submit")?.addEventListener("click", () => this.evaluateCustomerSignInAttempt());
        document.getElementById("toggle-checkout-view-btn")?.addEventListener("click", () => this.evaluateCheckoutTransitionAccessRequirement());
        document.getElementById("close-checkout-view-btn")?.addEventListener("click", () => this.toggleCheckoutPortalView(false));
        document.getElementById("submit-payment-proof-trigger")?.addEventListener("click", () => this.compileAndSubmitManualPaymentProofReceipt());
    },

    loadClientState() {
        let data = getStorageData();
        this.renderHorizontalCategorySliders(data.categories);
        this.renderProductGrid();
        this.refreshCartBadge();
    },

    renderHorizontalCategorySliders(categoriesList) {
        if (!this.dom.navBar) return;
        this.dom.navBar.innerHTML = categoriesList.map(cat => `
            <div class="category-slider-node ${this.state.selectedCategoryFilter === cat.id ? 'active-slider-node' : ''}" onclick="ClientEngine.filterMarketplaceViewStream('${cat.id}')">
                <i class="${cat.icon || 'fas fa-tag'}"></i>
                <span>${cat.name}</span>
            </div>
        `).join("");
    },

    filterMarketplaceViewStream(categoryId) {
        this.state.selectedCategoryFilter = categoryId;
        let data = getStorageData();
        this.renderHorizontalCategorySliders(data.categories);
        this.renderProductGrid();
    },

    renderProductGrid() {
        if (!this.dom.gridContainer) return;
        let data = getStorageData();
        
        let stream = data.products;

        // Apply strict transactional category isolation filtering vectors
        if (this.state.selectedCategoryFilter !== "all") {
            stream = stream.filter(p => p.category === this.state.selectedCategoryFilter);
        }

        // Apply real-time unified global cross-searching algorithm layers
        if (this.state.searchToken) {
            stream = stream.filter(p => 
                p.name.toLowerCase().includes(this.state.searchToken) ||
                p.brand.toLowerCase().includes(this.state.searchToken) ||
                p.model.toLowerCase().includes(this.state.searchToken) ||
                p.description.toLowerCase().includes(this.state.searchToken)
            );
        }

        if (stream.length === 0) {
            this.dom.gridContainer.innerHTML = `
                <div class="empty-state-card">
                    <i class="fas fa-search"></i>
                    <p>No account or specific product was found matching these unique parameter details.</p>
                </div>`;
            return;
        }

        this.dom.gridContainer.innerHTML = stream.map(p => {
            const isOutOfStock = p.stock <= 0;
            return `
                <div class="luxury-product-card-frame">
                    <div class="card-image-wrapper-node">
                        <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
                        ${isOutOfStock ? `<span class="stock-pill-badge variant-out">OUT OF STOCK</span>` : `<span class="stock-pill-badge variant-in">IN STOCK</span>`}
                    </div>
                    <div class="card-metadata-payload-block">
                        <span class="card-brand-label">${p.brand.toUpperCase()} (${p.year})</span>
                        <h3 class="card-product-title">${p.name}</h3>
                        <p class="card-short-desc">${p.description.substring(0,68)}...</p>
                        
                        ${p.solar ? `
                            <div class="solar-telemetry-badge">
                                <i class="fas fa-solar-panel"></i> Equipped: ${p.solar.panelCapacity} [${p.solar.batteryType.split(' ')[0]}]
                            </div>
                        ` : ''}

                        <div class="card-price-action-row">
                            <span class="card-price-ticker">$${p.price.toLocaleString()}</span>
                            <button 
                                onclick="ClientEngine.appendProductToCartArray('${p.id}')" 
                                class="action-add-cart-btn-primary"
                                ${isOutOfStock ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
                                <i class="fas fa-shopping-bag"></i> ${isOutOfStock ? 'Sold Out' : 'Buy Asset'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    },

    appendProductToCartArray(productId) {
        let data = getStorageData();
        let matchedItem = data.products.find(p => p.id === productId);
        
        if (matchedItem && matchedItem.stock > 0) {
            this.state.shoppingCart.push(matchedItem);
            this.refreshCartBadge();
            alert(`[SUCCESS] Added 1 unit of "${matchedItem.name}" to your global checkout queue.`);
        } else {
            alert("Operation Aborted: Item inventory allocation values are currently zero.");
        }
    },

    refreshCartBadge() {
        if (this.dom.cartCounter) {
            this.dom.cartCounter.innerText = this.state.shoppingCart.length;
        }
    },

    toggleAuthenticationModalView(isVisible) {
        let modal = document.getElementById("customer-auth-modal-root-overlay");
        if (modal) {
            isVisible ? modal.classList.remove("hidden-node") : modal.classList.add("hidden-node");
        }
    },

    evaluateCustomerSignInAttempt() {
        let userEmailInput = document.getElementById("customer-email-field-input").value;
        let userPassInput = document.getElementById("customer-password-field-input").value;

        // Structured email string pattern checking array evaluation
        let validationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validationRegex.test(userEmailInput)) {
            alert("Validation Error: Please enter a valid email address.");
            return;
        }

        if (userPassInput.length < 8) {
            alert("Validation Error: Your password must be at least 8 characters.");
            return;
        }

        let data = getStorageData();
        let matchedUser = data.users.find(u => u.email === userEmailInput && u.password === userPassInput);

        if (matchedUser) {
            this.state.activeUser = matchedUser;
            this.toggleAuthenticationModalView(false);
            document.getElementById("user-auth-modal-trigger").innerHTML = `<i class="fas fa-user-check"></i> ${matchedUser.name}`;
            alert("Account authentication logic cycle successfully established.");
            
            // Redirect post-authorization execution state hook validation check
            if (this.state.awaitingCheckoutRoutingRedirect) {
                this.state.awaitingCheckoutRoutingRedirect = false;
                this.toggleCheckoutPortalView(true);
            }
        } else {
            alert("Access Exception: No account was found with these details or password incorrect.");
        }
    },

    evaluateCheckoutTransitionAccessRequirement() {
        if (this.state.shoppingCart.length === 0) {
            alert("Your K.C.O active session shopping cart allocation index is currently empty.");
            return;
        }

        if (!this.state.activeUser) {
            alert("Authentication Intercept Lifecycle Triggered: Signing in is required before accessing the checkout parameters portal.");
            this.state.awaitingCheckoutRoutingRedirect = true;
            this.toggleAuthenticationModalView(true);
        } else {
            this.toggleCheckoutPortalView(true);
        }
    },

    toggleCheckoutPortalView(isVisible) {
        if (isVisible) {
            this.dom.mainViewLayout.classList.add("hidden-node");
            this.dom.checkoutWrapper.classList.remove("hidden-node");
            this.compileCheckoutSummaryFields();
        } else {
            this.dom.mainViewLayout.classList.remove("hidden-node");
            this.dom.checkoutWrapper.classList.add("hidden-node");
        }
    },

    compileCheckoutSummaryFields() {
        let data = getStorageData();
        let subtotal = this.state.shoppingCart.reduce((sum, item) => sum + item.price, 0);
        let orderIdToken = `KCO-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        
        document.getElementById("checkout-generated-order-id-label").innerText = orderIdToken;
        
        // Render detailed calculation metrics block rows
        let manifest = document.getElementById("checkout-queue-items-manifest-hook");
        manifest.innerHTML = this.state.shoppingCart.map(item => `
            <div class="summary-line-item">
                <span>${item.name} (x1)</span>
                <strong>$${item.price.toLocaleString()}</strong>
            </div>
        `).join("");

        document.getElementById("checkout-calculated-total-amount").innerText = `$${subtotal.toLocaleString()}`;

        // Populate manual payment boxes directly from real-time dynamic dashboard models
        document.getElementById("display-bank-name").innerText = data.paymentSettings.bank.bankName;
        document.getElementById("display-bank-acc").innerText = data.paymentSettings.bank.accountNumber;
        document.getElementById("display-btc-wallet").innerText = data.paymentSettings.crypto.btc;
        document.getElementById("display-usdt-wallet").innerText = data.paymentSettings.crypto.usdt;
    },

    compileAndSubmitManualPaymentProofReceipt() {
        let fullName = document.getElementById("ship-name").value;
        let street = document.getElementById("ship-street").value;
        let referenceNumber = document.getElementById("payment-tx-reference-input").value;
        let receiptFile = document.getElementById("payment-receipt-file-input").files[0];

        if (!fullName || !street || !referenceNumber || !receiptFile) {
            alert("Transmission Error: You must fill out your shipping address and upload your payment receipt before the order can be submitted.");
            return;
        }

        let data = getStorageData();
        let subtotal = this.state.shoppingCart.reduce((sum, item) => sum + item.price, 0);
        let orderId = document.getElementById("checkout-generated-order-id-label").innerText;

        let newOrderRecord = {
            orderId: orderId,
            userEmail: this.state.activeUser.email,
            shippingAddress: { fullName: fullName, streetAddress: street },
            txReference: referenceNumber,
            totals: { totalAmount: subtotal },
            status: "Payment Under Review"
        };

        data.orders.push(newOrderRecord);
        updateStorageData(data);

        alert(`Transaction Verified Successfully.\nYour confirmation receipt order code is: ${orderId}\nStatus is now tracking live as: Payment Under Review.`);
        
        // Purge memory loops and return system environment state cleanly back to defaults
        this.state.shoppingCart = [];
        this.refreshCartBadge();
        this.toggleCheckoutPortalView(false);
        if (typeof AdminEngine !== 'undefined') AdminEngine.renderAdminControlTables();
    }
};

window.addEventListener("DOMContentLoaded", () => ClientEngine.init());