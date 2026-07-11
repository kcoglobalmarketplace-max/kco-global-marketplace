// ============================================================================
// K.C.O. Global Marketplace - Final Interaction & Infrastructure Layer
// ============================================================================

// 1. Toast Notification Engine
function showSystemToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    if (!toast || !msg) return;

    msg.innerText = message;  
    toast.classList.remove('translate-y-20', 'opacity-0');  
    toast.classList.add('translate-y-0', 'opacity-100');  
    
    setTimeout(() => {  
        toast.classList.remove('translate-y-0', 'opacity-100');  
        toast.classList.add('translate-y-20', 'opacity-0');  
    }, 3000);
}

// 2. Wishlist & Cart Interaction Handlers
function toggleWishlist(id) {
    const idx = KCO_STATE.wishlist.indexOf(id);
    if (idx === -1) {
        KCO_STATE.wishlist.push(id);
        showSystemToast("Asset added to registry.");
    } else {
        KCO_STATE.wishlist.splice(idx, 1);
        showSystemToast("Asset unlinked from registry.");
    }
    localStorage.setItem('kco_wishlist', JSON.stringify(KCO_STATE.wishlist));
    renderCatalog(); // Refresh to update heart icon state
}

function updateCartCounter() {
    const counter = document.getElementById('cart-count');
    if (counter) counter.innerText = KCO_STATE.cart.length;
}

function renderEmptyState(reason) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = `
        <div class="col-span-full py-20 text-center text-gray-500 font-mono text-xs uppercase">
            ${reason}
        </div>
    `;
}

// 3. Infrastructure: Search/Filter Debouncing (Performance)
let debounceTimer;
function handleSearchInput(value) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        KCO_STATE.filters.query = value;
        applyFiltersAndSort();
    }, 300);
}

// 4. JSON-LD Enterprise SEO Injector
function injectSEOStructuredData(product) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "sku": product.sku,
        "offers": { "@type": "Offer", "price": product.priceUSD, "priceCurrency": "USD" }
    });
    document.head.appendChild(script);
}
