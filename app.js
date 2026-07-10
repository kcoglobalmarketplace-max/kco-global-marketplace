// Database Mocking: Base Prices tracked in USD
const inventoryDB = [
  { id: 1, name: "Luxury Hypercar Concept X", category: "Cars", priceUSD: 2450000, img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Performance Superbike 1199", category: "Motorbikes", priceUSD: 85000, img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Oceanfront Premium Estate", category: "House & Living", priceUSD: 14200000, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Heavy Duty Commercial Hauler", category: "Trucks", priceUSD: 310000, img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=500&q=80" }
];

let cartState = [];
let currentSearchQuery = "";

// Global FX Exchange System State Variables
let exchangeRates = { "USD": 1.0 };
let activeCurrency = "USD";
let activeSymbol = "$";

// Structured Country Object System: USA first, Nigeria second-to-last.
const marketMap = {
  "United States": { cur: "USD", sym: "$" },
  "United Kingdom": { cur: "GBP", sym: "£" },
  "Canada": { cur: "CAD", sym: "$" },
  "Australia": { cur: "AUD", sym: "$" },
  "Germany": { cur: "EUR", sym: "€" },
  "France": { cur: "EUR", sym: "€" },
  "Italy": { cur: "EUR", sym: "€" },
  "Spain": { cur: "EUR", sym: "€" },
  "Netherlands": { cur: "EUR", sym: "€" },
  "Belgium": { cur: "EUR", sym: "€" },
  "Sweden": { cur: "SEK", sym: "kr" },
  "Norway": { cur: "NOK", sym: "kr" },
  "Denmark": { cur: "DKK", sym: "kr" },
  "Finland": { cur: "EUR", sym: "€" },
  "Switzerland": { cur: "CHF", sym: "CHF" },
  "Austria": { cur: "EUR", sym: "€" },
  "Portugal": { cur: "EUR", sym: "€" },
  "Ireland": { cur: "EUR", sym: "€" },
  "Poland": { cur: "PLN", sym: "zł" },
  "Greece": { cur: "EUR", sym: "€" },
  "Turkey": { cur: "TRY", sym: "₺" },
  "Russia": { cur: "RUB", sym: "₽" },
  "Ukraine": { cur: "UAH", sym: "₴" },
  "China": { cur: "CNY", sym: "¥" },
  "Japan": { cur: "JPY", sym: "¥" },
  "South Korea": { cur: "KRW", sym: "₩" },
  "India": { cur: "INR", sym: "₹" },
  "Indonesia": { cur: "IDR", sym: "Rp" },
  "Malaysia": { cur: "MYR", sym: "RM" },
  "Singapore": { cur: "SGD", sym: "$" },
  "Thailand": { cur: "THB", sym: "฿" },
  "Vietnam": { cur: "VND", sym: "₫" },
  "Philippines": { cur: "PHP", sym: "₱" },
  "Mexico": { cur: "MXN", sym: "$" },
  "Brazil": { cur: "BRL", sym: "R$" },
  "Argentina": { cur: "ARS", sym: "$" },
  "Colombia": { cur: "COP", sym: "$" },
  "Chile": { cur: "CLP", sym: "$" },
  "South Africa": { cur: "ZAR", sym: "R" },
  "Egypt": { cur: "EGP", sym: "E£" },
  "Kenya": { cur: "KES", sym: "KSh" },
  "Morocco": { cur: "MAD", sym: "DH" },
  "Saudi Arabia": { cur: "SAR", sym: "SR" },
  "UAE": { cur: "AED", sym: "د.إ" },
  "Nigeria": { cur: "NGN", sym: "₦" }, 
  "Israel": { cur: "ILS", sym: "₪" }
};

const languages = ["English","Spanish","French","German","Italian","Portuguese","Dutch","Russian","Chinese (Mandarin)","Japanese","Korean","Arabic","Hindi","Bengali","Urdu","Turkish","Vietnamese","Thai","Indonesian","Malay","Swahili","Hebrew","Greek","Polish","Ukrainian","Romanian"];

// App Initialization Lifecycle Engine
window.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  setupDropdowns();
  await fetchExchangeRates();
  handleLocationDiscovery();
  updateMarketPrices();
});

function setupDropdowns() {
  const cSel = document.getElementById("country");
  const lSel = document.getElementById("language");
  Object.keys(marketMap).forEach(c => { let o = document.createElement("option"); o.text = c; o.value = c; cSel.add(o); });
  languages.forEach(l => { let o = document.createElement("option"); o.text = l; o.value = l; lSel.add(o); });
}

// 💱 Real-time Global Live Exchange Rate API Core Component Fetcher
async function fetchExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    if(data && data.rates) {
      exchangeRates = data.rates;
    }
  } catch (err) {
    console.error("FX Telemetry API pipeline error, running base array configuration.", err);
  }
}

// Location Discovery Module (Storage tracking & automatic navigation detection)
function handleLocationDiscovery() {
  const savedCountry = localStorage.getItem('kco_country');
  const savedLang = localStorage.getItem('kco_lang');
  const cSel = document.getElementById("country");
  const lSel = document.getElementById("language");

  if (savedCountry && savedLang) {
    cSel.value = savedCountry;
    lSel.value = savedLang;
  } else {
    const browserLocale = navigator.language || navigator.userLanguage;
    let guessedCountry = "United States";
    let guessedLang = "English";

    if(browserLocale.includes("GB")) guessedCountry = "United Kingdom";
    if(browserLocale.includes("DE")) { guessedCountry = "Germany"; guessedLang = "German"; }
    if(browserLocale.includes("FR")) { guessedCountry = "France"; guessedLang = "French"; }
    if(browserLocale.includes("NG")) guessedCountry = "Nigeria";

    cSel.value = guessedCountry;
    lSel.value = guessedLang;
    localStorage.setItem('kco_country', guessedCountry);
    localStorage.setItem('kco_lang', guessedLang);
  }
}

// Central Price Update Broker (Updates calculations across UI nodes)
function updateMarketPrices() {
  const currentCountry = document.getElementById("country").value;
  const marketConfig = marketMap[currentCountry] || { cur: "USD", sym: "$" };
  
  activeCurrency = marketConfig.cur;
  activeSymbol = marketConfig.sym;

  // Check if geo-welcome exists before updating
  const welcome = document.getElementById('geo-welcome');
  if (welcome) {
    welcome.innerText = `Terminal Node Context: ${currentCountry} | Local Tender: ${activeCurrency} (${activeSymbol})`;
  }
  
  handleSearch(currentSearchQuery); 
  updateCartUI();
}

function saveRegionSettings() {
  const cVal = document.getElementById("country").value;
  const lVal = document.getElementById("language").value;
  localStorage.setItem('kco_country', cVal);
  localStorage.setItem('kco_lang', lVal);
  
  updateMarketPrices();
  showToast(`Market converted cleanly to global index currency: ${marketMap[cVal].cur}`);
}

// Price Conversion Logic Function Engine 
function calculateConvertedPrice(priceUSD) {
  const multiplier = exchangeRates[activeCurrency] || 1.0;
  return Math.round(priceUSD * multiplier);
}

// Real Search Engine Core Business Logic
function handleSearch(query) {
  currentSearchQuery = query;
  const filtered = inventoryDB.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filtered);
}

function renderProducts(productsList) {
  const grid = document.getElementById('product-grid');
  if(!grid) return;
  grid.innerHTML = '';
  
  if(productsList.length === 0) {
    grid.innerHTML = `<div class='col-span-full py-12 text-center text-gray-500 text-sm'>No matching assets found.</div>`;
    return;
  }

  productsList.forEach(prod => {
    const structuralPrice = calculateConvertedPrice(prod.priceUSD);
    const card = document.createElement('div');
    card.className = "bg-[#1e293b] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-gray-700 transition flex flex-col";
    // Optimized image rendering via native lazy routing
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}" class="h-44 w-full object-cover" loading="lazy" decoding="async">
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-[10px] uppercase font-bold tracking-widest text-orange-500">${prod.category}</span>
          <h3 class="text-white text-sm font-bold mt-1 tracking-tight">${prod.name}</h3>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-white text-sm font-black">${activeSymbol}${structuralPrice.toLocaleString()} <span class="text-[9px] text-gray-500 font-mono">${activeCurrency}</span></span>
          <button onclick="addToCartEngine(${prod.id})" class="bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs px-3 py-1.5 rounded transition uppercase tracking-wider">Acquire</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function addToCartEngine(productId) {
  const matchedAsset = inventoryDB.find(p => p.id === productId);
  if(matchedAsset) {
    cartState.push(matchedAsset);
    updateCartUI();
    showToast(`Asset locked to active basket securely!`);
  }
}

// Dynamic Scalable Auto Cart Calculations Engine
function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  if(cartCount) cartCount.innerText = cartState.length;
  const container = document.getElementById('cart-items-container');
  const totalLabel = document.getElementById('cart-total');
  if(!container || !totalLabel) return;
  
  if(cartState.length === 0) {
    container.className = "p-6 flex-1 overflow-y-auto space-y-4 text-sm text-gray-400 flex flex-col justify-center items-center";
    container.innerHTML = `<i data-lucide="shopping-bag" class="w-12 h-12 text-gray-600 mb-2"></i><p>Your basket is empty.</p>`;
    totalLabel.innerText = `${activeSymbol}0.00`;
    lucide.createIcons();
    return;
  }

  container.className = "p-4 flex-1 overflow-y-auto space-y-3 text-sm text-gray-400 flex flex-col";
  container.innerHTML = '';
  
  let totalUSDAccumulator = 0;
  cartState.forEach((item, index) => {
    totalUSDAccumulator += item.priceUSD;
    const dynamicallyConvertedUnit = calculateConvertedPrice(item.priceUSD);
    
    const row = document.createElement('div');
    row.className = "w-full p-3 bg-gray-900 border border-gray-800 rounded-lg flex justify-between items-center text-white";
    row.innerHTML = `
      <div>
        <p class='font-semibold text-xs truncate max-w-[180px]'>${item.name}</p>
        <p class='text-[10px] text-gray-500'>Base: $${item.priceUSD.toLocaleString()} USD</p>
      </div>
      <div class="flex items-center gap-2">
        <span class='text-orange-500 font-bold text-xs'>${activeSymbol}${dynamicallyConvertedUnit.toLocaleString()}</span>
        <button onclick="removeFromCartEngine(${index})" class="text-gray-500 hover:text-red-400 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    `;
    container.appendChild(row);
  });

  const absoluteLocalizedTotal = calculateConvertedPrice(totalUSDAccumulator);
  totalLabel.innerText = `${activeSymbol}${absoluteLocalizedTotal.toLocaleString()}.00 ${activeCurrency}`;
  lucide.createIcons();
}

function removeFromCartEngine(index) {
  cartState.splice(index, 1);
  updateCartUI();
  showToast("Asset vector spliced from basket.");
}

// UI Interface Visual Handlers
function toggleNotifications() { 
    const p = document.getElementById('notification-panel');
    if(p) p.classList.toggle('hidden'); 
}
function toggleCart() { 
    const c = document.getElementById('cart-drawer');
    if(c) c.classList.toggle('translate-x-full'); 
}
function openAuthModal() { 
    const m = document.getElementById('auth-modal');
    if(m) m.classList.remove('hidden'); 
}
function closeAuthModal() { 
    const m = document.getElementById('auth-modal');
    if(m) m.classList.add('hidden'); 
}

function switchAuthTab(mode) {
  const tLogin = document.getElementById('tab-login'), tReg = document.getElementById('tab-register');
  const uField = document.getElementById('field-username'), btn = document.getElementById('auth-submit-btn');
  if(!tLogin || !tReg) return;
  if(mode === 'login') {
    tLogin.className = "flex-1 pb-3 text-center text-orange-500 font-bold border-b-2 border-orange-500 uppercase tracking-wider";
    tReg.className = "flex-1 pb-3 text-center text-gray-400 font-medium uppercase tracking-wider";
    if(uField) uField.classList.add('hidden'); if(btn) btn.innerText = "Sign In";
  } else {
    tReg.className = "flex-1 pb-3 text-center text-orange-500 font-bold border-b-2 border-orange-500 uppercase tracking-wider";
    tLogin.className = "flex-1 pb-3 text-center text-gray-400 font-medium uppercase tracking-wider";
    if(uField) uField.classList.remove('hidden'); if(btn) btn.innerText = "Create Account";
  }
}

function handleAuthSubmit(e) { e.preventDefault(); closeAuthModal(); showToast("Identity accepted seamlessly."); }

function showToast(msg) {
  const toast = document.getElementById('toast');
  const tMsg = document.getElementById('toast-message');
  if(!toast || !tMsg) return;
  tMsg.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => { toast.classList.add('translate-y-20', 'opacity-0'); }, 3000);
}