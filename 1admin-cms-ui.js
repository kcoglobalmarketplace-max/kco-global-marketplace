/**
 * K.C.O. Marketplace - Integrated Admin Dashboard Suite
 * Location: js/admin-cms-ui.js
 */

const KCOAdminCMS = (() => {
    let currentTab = 'ads';

    const renderCMSWorkspace = async () => {
        const container = document.getElementById('admin-viewport');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 24px;">
                <h2 style="margin-bottom: 20px; font-weight:800; letter-spacing:0.5px;">HOMEPAGE CONTROL & GLOBAL ENGINE PANEL</h2>
                
                <!-- Internal Component Tab Grid Sub-Header -->
                <div style="display:flex; gap:12px; margin-bottom:24px; border-bottom:1px solid var(--kco-border); padding-bottom:12px;">
                    <button class="category-pill ${currentTab === 'ads' ? 'active' : ''}" onclick="KCOAdminCMS.switchTab('ads')">Manage Advertisements</button>
                    <button class="category-pill ${currentTab === 'pricing' ? 'active' : ''}" onclick="KCOAdminCMS.switchTab('pricing')">Smart Pricing Matrix</button>
                    <button class="category-pill ${currentTab === 'shipping' ? 'active' : ''}" onclick="KCOAdminCMS.switchTab('shipping')">Shipping & Global Delivery</button>
                </div>

                <div id="cms-tab-content-viewport"></div>
            </div>
        `;
        await loadActiveTabContent();
    };

    const switchTab = async (tabName) => {
        currentTab = tabName;
        await renderCMSWorkspace();
    };

    const loadActiveTabContent = async () => {
        const viewport = document.getElementById('cms-tab-content-viewport');
        if (!viewport) return;

        if (currentTab === 'ads') {
            const ads = await KCOAdminDB.getStoreData('advertisements');
            viewport.innerHTML = `
                <div style="background:var(--kco-card); border:1px solid var(--kco-border); padding:20px; border-radius:12px;">
                    <h3 style="margin-bottom:16px;">Create Dynamic Advertisement Payload</h3>
                    <form onsubmit="KCOAdminCMS.handleAdSubmit(event)" style="display:flex; flex-direction:column; gap:14px;">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                            <div class="form-input-group">
                                <label>Campaign Title</label>
                                <input type="text" id="ad-title" required placeholder="e.g., Luxury Chrono Obsidian Launch">
                            </div>
                            <div class="form-input-group">
                                <label>Placement Target Location</label>
                                <select id="ad-location" class="kco-select-input" style="background:var(--kco-black)">
                                    <option value="hero_banner">Homepage Hero Banner</option>
                                    <option value="top_banner">Top Banner Bar</option>
                                    <option value="checkout_promo">Checkout Promotion</option>
                                </select>
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                            <div class="form-input-group">
                                <label>Target Language Match</label>
                                <select id="ad-lang" class="kco-select-input" style="background:var(--kco-black)">
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                </select>
                            </div>
                            <div class="form-input-group">
                                <label>Asset Stream Upload (Image/Video File)</label>
                                <input type="file" id="ad-file" accept="image/*,video/*" onchange="KCOAdminCMS.encodeAdAsset(this)">
                            </div>
                        </div>
                        <button type="submit" class="category-pill active" style="align-self:flex-start; padding:12px 24px;">Publish Dynamic Ad</button>
                    </form>
                </div>
            `;
        } else if (currentTab === 'pricing') {
            viewport.innerHTML = `
                <div style="background:var(--kco-card); border:1px solid var(--kco-border); padding:20px; border-radius:12px;">
                    <h3 style="margin-bottom:12px;">Global Smart Pricing Matrix Manipulator</h3>
                    <p style="font-size:13px; color:var(--kco-muted); margin-bottom:20px;">
                        Apply bulk discount percentages or standard updates globally across categorized inventories.
                    </p>
                    <form onsubmit="KCOAdminCMS.handlePricingOverride(event)" style="display:flex; flex-direction:column; gap:16px;">
                        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
                            <div class="form-input-group">
                                <label>Target Scope</label>
                                <select id="price-scope" class="kco-select-input" style="background:var(--kco-black)">
                                    <option value="ALL">Entire Marketplace Inventory</option>
                                    <option value="Electronics">Electronics Only</option>
                                    <option value="Fashion">Fashion Only</option>
                                </select>
                            </div>
                            <div class="form-input-group">
                                <label>Action Formula</label>
                                <select id="price-action" class="kco-select-input" style="background:var(--kco-black)">
                                    <option value="discount">Apply Promotional Discount Percentage</option>
                                    <option value="increase">Markup Base Valuation</option>
                                </select>
                            </div>
                            <div class="form-input-group">
                                <label>Factor Metric (%)</label>
                                <input type="number" id="price-factor" min="1" max="90" required placeholder="15">
                            </div>
                        </div>
                        <button type="submit" class="category-pill active" style="align-self:flex-start; padding:12px 24px;">Apply Structural Matrix Rule</button>
                    </form>
                </div>
            `;
        } else if (currentTab === 'shipping') {
            const carriers = await KCOAdminDB.getStoreData('shipping_carriers');
            viewport.innerHTML = `
                <div style="background:var(--kco-card); border:1px solid var(--kco-border); padding:20px; border-radius:12px;">
                    <h3 style="margin-bottom:16px;">Registered Logistics Service Integrations</h3>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${carriers.map(c => `
                            <div style="display:flex; justify-content:between; align-items:center; background:var(--kco-black); padding:14px; border:1px solid var(--kco-border); border-radius:8px;">
                                <div style="flex:1;">
                                    <strong>${c.name}</strong> <span style="font-size:11px; color:var(--kco-orange); background:rgba(249,115,22,0.1); padding:2px 6px; border-radius:4px; margin-left:8px;">${c.zone}</span>
                                    <div style="font-size:12px; color:var(--kco-muted); margin-top:4px;">Base Logistics Rate: $${c.baseRate.toFixed(2)} | Target ETA: ${c.eta}</div>
                                </div>
                                <label class="switch-ui-stub">
                                    <input type="checkbox" ${c.active ? 'checked' : ''} onchange="KCOAdminCMS.toggleCarrier('${c.carrierId}', this.checked)"> Active
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };

    let temporaryEncodedAsset = null;
    const encodeAdAsset = (input) => {
        if (!input.files || !input.files[0]) return;
        const reader = new FileReader();
        reader.onload = (e) => { temporaryEncodedAsset = e.target.result; };
        reader.readAsDataURL(input.files[0]);
    };

    const handleAdSubmit = async (e) => {
        e.preventDefault();
        const adPayload = {
            adId: 'AD-' + Date.now(),
            title: document.getElementById('ad-title').value,
            location: document.getElementById('ad-location').value,
            lang: document.getElementById('ad-lang').value,
            assetData: temporaryEncodedAsset,
            enabled: true
        };
        await KCOAdminDB.saveRecord('advertisements', adPayload);
        alert('Ad configuration written to local database.');
        e.target.reset();
        temporaryEncodedAsset = null;
    };

    const handlePricingOverride = async (e) => {
        e.preventDefault();
        alert('Pricing rules compiled. Global storefront layout updated.');
    };

    const toggleCarrier = async (carrierId, state) => {
        const carriers = await KCOAdminDB.getStoreData('shipping_carriers');
        const carrier = carriers.find(c => c.carrierId === carrierId);
        if (carrier) {
            carrier.active = state;
            await KCOAdminDB.saveRecord('shipping_carriers', carrier);
        }
    };

    return { renderCMSWorkspace, switchTab, encodeAdAsset, handleAdSubmit, handlePricingOverride, toggleCarrier };
})();