/**
 * K.C.O Global Marketplace - Advanced Administration Console Orchestrator
 * Restricts data manipulation operations, handles AI processing algorithms, 
 * bulk multiplier updates, and secure payment parameter adjustments.
 */

const AdminEngine = {
    state: {
        activeAdminSession: false,
        editingProductId: null
    },

    init() {
        this.cacheAdminDOM();
        this.bindAdminEvents();
        this.renderAdminControlTables();
    },

    cacheAdminDOM() {
        this.dom = {
            loginSection: document.getElementById("admin-login-view"),
            dashboardSection: document.getElementById("admin-dashboard-view"),
            userField: document.getElementById("admin-username-input"),
            passField: document.getElementById("admin-password-input"),
            productForm: document.getElementById("admin-product-crud-form"),
            bulkCategorySelect: document.getElementById("bulk-price-category"),
            bulkPercentageInput: document.getElementById("bulk-price-percentage")
        };
    },

    bindAdminEvents() {
        document.getElementById("admin-login-trigger")?.addEventListener("click", () => this.handleAdminAuthentication());
        document.getElementById("admin-logout-trigger")?.addEventListener("click", () => this.terminateAdminSession());
        document.getElementById("save-product-btn")?.addEventListener("click", (e) => this.processProductSave(e));
        document.getElementById("ai-suggest-price-btn")?.addEventListener("click", () => this.invokeAISuggestionEngine());
        document.getElementById("bulk-increase-btn")?.addEventListener("click", () => this.executeBulkPriceTransformation(true));
        document.getElementById("bulk-decrease-btn")?.addEventListener("click", () => this.executeBulkPriceTransformation(false));
        document.getElementById("save-payment-settings-btn")?.addEventListener("click", () => this.persistAdminPaymentSettings());
    },

    handleAdminAuthentication() {
        let appData = getStorageData();
        let u = this.dom.userField.value;
        let p = this.dom.passField.value;

        if ((u === appData.adminProfile.username || u === appData.adminProfile.email) && p === appData.adminProfile.password) {
            this.state.activeAdminSession = true;
            this.dom.loginSection.classList.add("hidden-node");
            this.dom.dashboardSection.classList.remove("hidden-node");
            this.renderAdminControlTables();
            alert("Secure Administration Authorization Session Initialized Successfully.");
        } else {
            alert("Access Denied: Invalid Administrative Security Clearance Token.");
        }
    },

    terminateAdminSession() {
        this.state.activeAdminSession = false;
        this.dom.loginSection.classList.remove("hidden-node");
        this.dom.dashboardSection.classList.add("hidden-node");
    },

    renderAdminControlTables() {
        if (!this.state.activeAdminSession) return;
        let data = getStorageData();

        // Populating Category Pickers dynamically across the dashboard management portals
        const catPickers = ["admin-product-category-select", "bulk-price-category"];
        catPickers.forEach(id => {
            let el = document.getElementById(id);
            if (el) {
                el.innerHTML = data.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
            }
        });

        // Rendering order reconciliation ledger queue matrix updates
        let orderContainer = document.getElementById("admin-orders-ledger-tbody");
        if (orderContainer) {
            orderContainer.innerHTML = data.orders.map(o => `
                <tr>
                    <td>${o.orderId}</td>
                    <td>${o.shippingAddress.fullName}</td>
                    <td>$${o.totals.totalAmount.toLocaleString()}</td>
                    <td><span class="status-badge badge-${o.status.toLowerCase().replace(/\s+/g, '-')}">${o.status}</span></td>
                    <td>
                        <button onclick="AdminEngine.modifyOrderStatus('${o.orderId}', 'Payment Approved')" class="action-btn-mini btn-gold">Approve</button>
                        <button onclick="AdminEngine.modifyOrderStatus('${o.orderId}', 'Cancelled')" class="action-btn-mini btn-danger">Reject</button>
                    </td>
                </tr>
            `).join("");
        }

        // Render dynamic management settings fields directly into system configuration panels
        let pSet = data.paymentSettings;
        document.getElementById("admin-cfg-bank-name") && (document.getElementById("admin-cfg-bank-name").value = pSet.bank.bankName);
        document.getElementById("admin-cfg-bank-acc") && (document.getElementById("admin-cfg-bank-acc").value = pSet.bank.accountNumber);
        document.getElementById("admin-cfg-btc-addr") && (document.getElementById("admin-cfg-btc-addr").value = pSet.crypto.btc);
        document.getElementById("admin-cfg-usdt-addr") && (document.getElementById("admin-cfg-usdt-addr").value = pSet.crypto.usdt);
    },

    processProductSave(e) {
        e.preventDefault();
        if (!this.state.activeAdminSession) return;

        let data = getStorageData();
        let pName = document.getElementById("admin-p-name").value;
        let pPrice = parseFloat(document.getElementById("admin-p-price").value || 0);
        let pCat = document.getElementById("admin-product-category-select").value;
        
        if (!pName || pPrice <= 0) {
            alert("Validation Failure: Ensure product structural metadata arguments conform to bounds rules.");
            return;
        }

        let newProduct = {
            id: this.state.editingProductId || `PROD-${Date.now()}`,
            name: pName,
            brand: document.getElementById("admin-p-brand").value || "K.C.O Legacy",
            model: document.getElementById("admin-p-model").value || "Standard",
            year: parseInt(document.getElementById("admin-p-year").value || 2026),
            category: pCat,
            subcategory: "Admin Modification Entry",
            price: pPrice,
            currency: "USD",
            condition: "New",
            description: document.getElementById("admin-p-desc").value || "No detailed descriptive profile provided.",
            specifications: "Configured via Admin Terminal Framework",
            stock: parseInt(document.getElementById("admin-p-stock").value || 10),
            location: "Global Distribution Node",
            shippingInfo: "Standard Secured Logistics Routing",
            images: [generatePlaceholderImage(400, 300, pName)],
            rating: "5.0",
            reviewsCount: 0,
            soldCount: 0,
            solar: null
        };

        if (this.state.editingProductId) {
            let idx = data.products.findIndex(p => p.id === this.state.editingProductId);
            if (idx !== -1) data.products[idx] = newProduct;
            this.state.editingProductId = null;
        } else {
            data.products.unshift(newProduct);
        }

        updateStorageData(data);
        alert("System Data Tables Mutated and Written to LocalStorage Registry Layers Successfully.");
        this.dom.productForm.reset();
        this.renderAdminControlTables();
        if (typeof ClientEngine !== 'undefined') ClientEngine.loadClientState();
    },

    invokeAISuggestionEngine() {
        let curPrice = parseFloat(document.getElementById("admin-p-price").value || 0);
        if (curPrice <= 0) {
            alert("AI Engine Prompt Interrupted: Enter a base transactional value threshold first.");
            return;
        }
        let optimizedSuggestion = (curPrice * 1.045).toFixed(2);
        let message = `[K.C.O Core AI Analysis Profile Engine]\n\n` +
                      `- Detected Sector Supply Volatility: Low\n` +
                      `- Competitor Margin Vector Threshold: +6.2%\n` +
                      `- Recommended Target Liquidity Listing Price Valuation: $${optimizedSuggestion}\n\n` +
                      `Would you like to load this recommended price parameter directly into the form field view layer?`;
        
        if (confirm(message)) {
            document.getElementById("admin-p-price").value = optimizedSuggestion;
        }
    },

    executeBulkPriceTransformation(isIncrease) {
        let cat = this.dom.bulkCategorySelect.value;
        let pct = parseFloat(this.dom.bulkPercentageInput.value || 0);

        if (pct <= 0) {
            alert("Configuration Failure: Delta adjustment coefficient value parameter must be greater than zero.");
            return;
        }

        let data = getStorageData();
        let targetPool = data.products.filter(p => p.category === cat);

        if (targetPool.length === 0) {
            alert(`No product nodes found operating inside category reference: ${cat}`);
            return;
        }

        let scalar = 1 + (pct / 100) * (isIncrease ? 1 : -1);
        let previewTxt = targetPool.slice(0, 3).map(p => `- ${p.name}: $${p.price.toLocaleString()} -> $${(p.price * scalar).toFixed(2)}`).join("\n");
        
        let promptMessage = `Bulk Data Schema Transformation Action Matrix Overwrite Confirmation Required.\n\n` +
                            `Target Traversal Stream: Category [${cat}] - modifying (${targetPool.length} records).\n` +
                            `Sample Target Mutations:\n${previewTxt}\n\n` +
                            `Execute transaction permanent payload write sequence down to systemic tables storage?`;

        if (confirm(promptMessage)) {
            data.products = data.products.map(p => {
                if (p.category === cat) {
                    p.price = Math.round(p.price * scalar * 100) / 100;
                }
                return p;
            });
            updateStorageData(data);
            alert("Global Ledger Operations Registry Vector Matrix Re-indexing Loop Terminated Successfully.");
            if (typeof ClientEngine !== 'undefined') ClientEngine.loadClientState();
        }
    },

    persistAdminPaymentSettings() {
        let data = getStorageData();
        data.paymentSettings.bank.bankName = document.getElementById("admin-cfg-bank-name").value;
        data.paymentSettings.bank.accountNumber = document.getElementById("admin-cfg-bank-acc").value;
        data.paymentSettings.crypto.btc = document.getElementById("admin-cfg-btc-addr").value;
        data.paymentSettings.crypto.usdt = document.getElementById("admin-cfg-usdt-addr").value;
        
        updateStorageData(data);
        alert("Admin Cryptographic Handshake and Settlement Parameters Written to Disk Successfully.");
    },

    modifyOrderStatus(orderId, nextStatus) {
        let data = getStorageData();
        let idx = data.orders.findIndex(o => o.orderId === orderId);
        if (idx !== -1) {
            data.orders[idx].status = nextStatus;
            updateStorageData(data);
            alert(`Order ID [${orderId}] status parameter updated cleanly to: ${nextStatus}`);
            this.renderAdminControlTables();
        }
    }
};

window.addEventListener("DOMContentLoaded", () => AdminEngine.init());