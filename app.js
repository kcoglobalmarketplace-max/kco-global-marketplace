/**
 * K.C.O. Global Marketplace - Enterprise Runtime Engine
 * Handles dynamic grid rendering, live search, category filtering, cart management, 
 * localization currency exchange, toast notifications, and Lucide icons.
 */

// Application State
const state = {
  products: KCO_DATABASE.products || [],
  filteredProducts: [],
  cart: JSON.parse(localStorage.getItem("kco_cart")) || [],
  selectedCategory: "all",
  searchQuery: "",
  currentCurrency: localStorage.getItem("kco_currency") || "USD",
  currentCountry: localStorage.getItem("kco_country") || "US",
  currentLanguage: localStorage.getItem("kco_lang") || "en",
  isAuthLogin: true,
  isNotifOpen: false,
  isCartOpen: false,
  isAuthOpen: false
};

// Initialization on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initRegionSelectors();
  initStateListeners();
  filterAndRenderProducts();
  updateCartUI();
  
  // Initial Lucide Icon Activation
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

// --- REGION & LOCALIZATION SETUP ---
function initRegionSelectors() {
  const countrySelect = document.getElementById("country");
  const langSelect = document.getElementById("language");

  if (countrySelect) {
    countrySelect.innerHTML = KCO_DATABASE.countries
      .map(c => `<option value="${c.code}" ${c.code === state.currentCountry ? "selected" : ""}>${c.name} (${c.currency})</option>`)
      .join("");
  }

  if (langSelect) {
    langSelect.innerHTML = KCO_DATABASE.languages
      .map(l => `<option value="${l.code}" ${l.code === state.currentLanguage ? "selected" : ""}>${l.name}</option>`)
      .join("");
  }

  updateGeoWelcome();
}

function saveRegionSettings() {
  const countrySelect = document.getElementById("country");
  const langSelect = document.getElementById("language");

  if (countrySelect) {
    state.currentCountry = countrySelect.value;
    const selectedCountryObj = KCO_DATABASE.countries.find(c => c.code === state.currentCountry);
    if (selectedCountryObj) {
      state.currentCurrency = selectedCountryObj.currency;
    }
    localStorage.setItem("kco_country", state.currentCountry);
    localStorage.setItem("kco_currency", state.currentCurrency);
  }

  if (langSelect) {
    state.currentLanguage = langSelect.value;
    localStorage.setItem("kco_lang", state.currentLanguage);
  }

  updateGeoWelcome();
  filterAndRenderProducts();
  updateCartUI();
  showToast(`Region settings updated to ${state.currentCountry} (${state.currentCurrency})`);
}

function updateGeoWelcome() {
  const welcomeEl = document.getElementById("geo-welcome");
  if (welcomeEl) {
    const curr = KCO_DATABASE.currencies[state.currentCurrency];
    welcomeEl.textContent = `Displaying live inventory in ${state.currentCurrency} (${curr ? curr.symbol : "$"}) with global clearing active.`;
  }
}

// --- PRICE FORMATTING & EXCHANGE ENGINE ---
function formatPrice(usdAmount) {
  const currConfig = KCO_DATABASE.currencies[state.currentCurrency] || KCO_DATABASE.currencies.USD;
  const converted = usdAmount * currConfig.rate;
  return new Intl.NumberFormat(state.currentLanguage === "ja" ? "ja-JP" : "en-US", {
    style: "currency",
    currency: state.currentCurrency,
    maximumFractionDigits: 0
  }).format(converted);
}

// --- EVENT LISTENERS & SEARCH SETUP ---
function initStateListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      filterAndRenderProducts();
    });
  }

  // Bind category anchor clicks in navigation
  document.querySelectorAll("section a").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const labelText = anchor.querySelector("span")?.textContent.toLowerCase() || "";
      
      // Map display names to database category keys
      let targetCat = "all";
      if (labelText.includes("car")) targetCat = "cars";
      else if (labelText.includes("motor")) targetCat = "motorcycles";
      else if (labelText.includes("truck")) targetCat = "trucks";
      else if (labelText.includes("bike")) targetCat = "bicycles";
      else if (labelText.includes("house") || labelText.includes("estate")) targetCat = "real estate";

      state.selectedCategory = targetCat;
      filterAndRenderProducts();
      showToast(`Filtered category: ${anchor.querySelector("span")?.textContent}`);
    });
  });

  // Hero Shop Catalog Button
  document.querySelectorAll("button").forEach(btn => {
    if (btn.textContent.includes("Shop Catalog")) {
      btn.addEventListener("click", () => {
        state.selectedCategory = "all";
        state.searchQuery = "";
        filterAndRenderProducts();
        document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
        showToast("Loaded full global inventory catalog.");
      });
    }
  });
}

// --- FILTER & DYNAMIC GRID RENDERING ENGINE ---
function filterAndRenderProducts() {
  state.filteredProducts = state.products.filter(item => {
    const matchesCat = state.selectedCategory === "all" || item.category === state.selectedCategory;
    const matchesSearch = state.searchQuery === "" || 
      item.title.toLowerCase().includes(state.searchQuery) ||
      item.description.toLowerCase().includes(state.searchQuery) ||
      item.location.toLowerCase().includes(state.searchQuery) ||
      item.category.toLowerCase().includes(state.searchQuery);
    return matchesCat && matchesSearch;
  });

  renderProductGrid();
}

function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  if (state.filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-[#111827] border border-gray-800 rounded-2xl">
        <i data-lucide="search-x" class="w-12 h-12 text-orange-500 mx-auto mb-3"></i>
        <h3 class="text-lg font-bold text-white">No Matching Inventory Found</h3>
        <p class="text-gray-400 text-xs mt-1">Try adjusting your live search keywords or selecting another category.</p>
      </div>
    `;
    if (typeof lucide !== "undefined") lucide.createIcons();
    return;
  }

  grid.innerHTML = state.filteredProducts.map(item => `
    <div class="group bg-[#111827] border border-gray-800 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div class="relative overflow-hidden aspect-[4/3] bg-gray-900">
        <img data-src="${item.image}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3C/svg%3E" alt="${item.title}" class="lazy-load w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
        <span class="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-orange-400 px-2.5 py-1 rounded-md border border-orange-500/30">
          ${item.category}
        </span>
        ${item.verified ? `
          <span class="absolute top-3 right-3 bg-blue-600/90 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            Verified <i data-lucide="check" class="w-3 h-3"></i>
          </span>
        ` : ""}
      </div>
      
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-orange-500"></i> ${item.location}</span>
            <span class="text-[11px] text-gray-500">${item.seller}</span>
          </div>
          <h3 class="text-white font-bold text-base leading-snug group-hover:text-orange-400 transition line-clamp-1">${item.title}</h3>
          <p class="text-gray-400 text-xs mt-1.5 line-clamp-2 font-light">${item.description}</p>
        </div>

        <div class="pt-3 border-t border-gray-800/80 flex items-center justify-between">
          <div>
            <span class="block text-[10px] uppercase font-semibold text-gray-500">Global Value</span>
            <span class="text-lg font-black text-white">${formatPrice(item.price)}</span>
          </div>
          <button onclick="addToCart('${item.id}')" class="bg-orange-500 hover:bg-orange-600 text-black font-bold p-2.5 rounded-xl transition shadow-lg shadow-orange-500/20 flex items-center justify-center" aria-label="Add to Basket">
            <i data-lucide="shopping-basket" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Re-initialize Lucide Icons for dynamic content
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Setup Image Lazy Loading Observer
  initLazyLoading();
}

// --- IMAGE LAZY LOADING ---
function initLazyLoading() {
  const lazyImages = document.querySelectorAll("img.lazy-load");
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy-load");
          observer.unobserve(image);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// --- SHOPPING BASKET MANAGEMENT ---
function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.title}" to your basket.`);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Item removed from basket.");
}

function updateCartQuantity(productId, change) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem("kco_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  const countEl = document.getElementById("cart-count");
  const itemsContainer = document.getElementById("cart-items-container");
  const totalEl = document.getElementById("cart-total");

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) countEl.textContent = totalCount;

  if (itemsContainer) {
    if (state.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="text-center py-12 space-y-3">
          <i data-lucide="shopping-cart" class="w-10 h-10 text-gray-600 mx-auto"></i>
          <p class="text-gray-400 text-xs">Your shopping basket is currently empty.</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = state.cart.map(item => `
        <div class="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl border border-gray-800">
          <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-lg shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="text-white font-bold text-xs truncate">${item.title}</h4>
            <p class="text-orange-400 text-xs font-semibold mt-0.5">${formatPrice(item.price)}</p>
            <div class="flex items-center gap-2 mt-2">
              <button onclick="updateCartQuantity('${item.id}', -1)" class="w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center text-xs">-</button>
              <span class="text-xs text-white font-bold">${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.id}', 1)" class="w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center text-xs">+</button>
            </div>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="text-gray-500 hover:text-red-400 p-1">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `).join("");
    }
  }

  const rawTotalUSD = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (totalEl) {
    totalEl.textContent = formatPrice(rawTotalUSD);
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  state.isCartOpen = !state.isCartOpen;
  if (state.isCartOpen) {
    drawer.classList.remove("translate-x-full");
  } else {
    drawer.classList.add("translate-x-full");
  }
}

// --- NOTIFICATIONS PANEL ---
function toggleNotifications() {
  const panel = document.getElementById("notification-panel");
  if (!panel) return;
  state.isNotifOpen = !state.isNotifOpen;
  if (state.isNotifOpen) {
    panel.classList.remove("hidden");
  } else {
    panel.classList.add("hidden");
  }
}

// --- AUTHENTICATION MODAL ---
function openAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.remove("hidden");
    state.isAuthOpen = true;
  }
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.add("hidden");
    state.isAuthOpen = false;
  }
}

function switchAuthTab(tab) {
  state.isAuthLogin = (tab === "login");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const fieldUsername = document.getElementById("field-username");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (state.isAuthLogin) {
    tabLogin.className = "flex-1 pb-3 text-center text-orange-500 font-bold border-b-2 border-orange-500 uppercase tracking-wider";
    tabRegister.className = "flex-1 pb-3 text-center text-gray-400 font-medium uppercase tracking-wider";
    fieldUsername.classList.add("hidden");
    submitBtn.textContent = "Sign In";
  } else {
    tabRegister.className = "flex-1 pb-3 text-center text-orange-500 font-bold border-b-2 border-orange-500 uppercase tracking-wider";
    tabLogin.className = "flex-1 pb-3 text-center text-gray-400 font-medium uppercase tracking-wider";
    fieldUsername.classList.remove("hidden");
    submitBtn.textContent = "Create Account";
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  closeAuthModal();
  showToast(state.isAuthLogin ? "Successfully authenticated into K.C.O. network." : "Account successfully registered and verified.");
}

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
  const toast = document.getElementById("toast");
  const messageSpan = document.getElementById("toast-message");
  if (!toast || !messageSpan) return;

  messageSpan.textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3500);
}