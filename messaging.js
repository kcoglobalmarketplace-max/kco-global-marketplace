// ============================================
// EVERYHANDLE - MESSAGING SERVICES SHOWROOM
// ============================================

// Country Data
const countryData = [
  { name: "United States", flag: "🇺🇸", code: "US", currency: "USD", symbol: "$", rate: 1.00 },
  { name: "Canada", flag: "🇨🇦", code: "CA", currency: "CAD", symbol: "CA$", rate: 1.36 },
  { name: "Mexico", flag: "🇲🇽", code: "MX", currency: "MXN", symbol: "MEX$", rate: 16.70 },
  { name: "Brazil", flag: "🇧🇷", code: "BR", currency: "BRL", symbol: "R$", rate: 5.15 },
  { name: "Argentina", flag: "🇦🇷", code: "AR", currency: "ARS", symbol: "$", rate: 900.00 },
  { name: "Chile", flag: "🇨🇱", code: "CL", currency: "CLP", symbol: "CLP$", rate: 930.00 },
  { name: "Colombia", flag: "🇨🇴", code: "CO", currency: "COP", symbol: "COL$", rate: 3850.00 },
  { name: "Peru", flag: "🇵🇪", code: "PE", currency: "PEN", symbol: "S/", rate: 3.72 },
  { name: "Jamaica", flag: "🇯🇲", code: "JM", currency: "JMD", symbol: "J$", rate: 155.00 },
  { name: "Costa Rica", flag: "🇨🇷", code: "CR", currency: "CRC", symbol: "₡", rate: 510.00 },
  { name: "Germany", flag: "🇩🇪", code: "DE", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB", currency: "GBP", symbol: "£", rate: 0.78 },
  { name: "Switzerland", flag: "🇨🇭", code: "CH", currency: "CHF", symbol: "CHF", rate: 0.91 },
  { name: "Poland", flag: "🇵🇱", code: "PL", currency: "PLN", symbol: "zł", rate: 3.95 },
  { name: "Sweden", flag: "🇸🇪", code: "SE", currency: "SEK", symbol: "kr", rate: 10.80 },
  { name: "Norway", flag: "🇳🇴", code: "NO", currency: "NOK", symbol: "kr", rate: 10.60 },
  { name: "Denmark", flag: "🇩🇰", code: "DK", currency: "DKK", symbol: "kr.", rate: 6.88 },
  { name: "Hungary", flag: "🇭🇺", code: "HU", currency: "HUF", symbol: "Ft", rate: 360.00 },
  { name: "Czechia", flag: "🇨🇿", code: "CZ", currency: "CZK", symbol: "Kč", rate: 23.10 },
  { name: "Romania", flag: "🇷🇴", code: "RO", currency: "RON", symbol: "lei", rate: 4.58 },
  { name: "Turkey", flag: "🇹🇷", code: "TR", currency: "TRY", symbol: "₺", rate: 32.20 },
  { name: "Iceland", flag: "🇮🇸", code: "IS", currency: "ISK", symbol: "kr", rate: 139.00 },
  { name: "Nigeria", flag: "🇳🇬", code: "NG", currency: "NGN", symbol: "₦", rate: 1500.00 },
  { name: "Kenya", flag: "🇰🇪", code: "KE", currency: "KES", symbol: "KSh", rate: 130.00 },
  { name: "South Africa", flag: "🇿🇦", code: "ZA", currency: "ZAR", symbol: "R", rate: 18.50 },
  { name: "Ghana", flag: "🇬🇭", code: "GH", currency: "GHS", symbol: "GH₵", rate: 14.50 },
  { name: "Egypt", flag: "🇪🇬", code: "EG", currency: "EGP", symbol: "E£", rate: 47.50 },
  { name: "Morocco", flag: "🇲🇦", code: "MA", currency: "MAD", symbol: "MAD", rate: 10.05 },
  { name: "Ethiopia", flag: "🇪🇹", code: "ET", currency: "ETB", symbol: "Br", rate: 57.20 },
  { name: "Tanzania", flag: "🇹🇿", code: "TZ", currency: "TZS", symbol: "TSh", rate: 2600.00 },
  { name: "Uganda", flag: "🇺🇬", code: "UG", currency: "UGX", symbol: "USh", rate: 3780.00 },
  { name: "Zambia", flag: "🇿🇲", code: "ZM", currency: "ZMW", symbol: "ZK", rate: 25.50 },
  { name: "India", flag: "🇮🇳", code: "IN", currency: "INR", symbol: "₹", rate: 83.30 },
  { name: "Japan", flag: "🇯🇵", code: "JP", currency: "JPY", symbol: "¥", rate: 155.00 },
  { name: "China", flag: "🇨🇳", code: "CN", currency: "CNY", symbol: "¥", rate: 7.23 },
  { name: "South Korea", flag: "🇰🇷", code: "KR", currency: "KRW", symbol: "₩", rate: 1360.00 },
  { name: "Singapore", flag: "🇸🇬", code: "SG", currency: "SGD", symbol: "S$", rate: 1.35 },
  { name: "United Arab Emirates", flag: "🇦🇪", code: "AE", currency: "AED", symbol: "AED", rate: 3.67 },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", currency: "SAR", symbol: "SR", rate: 3.75 },
  { name: "Pakistan", flag: "🇵🇰", code: "PK", currency: "PKR", symbol: "RS", rate: 278.00 },
  { name: "Philippines", flag: "🇵🇭", code: "PH", currency: "PHP", symbol: "₱", rate: 57.50 },
  { name: "Indonesia", flag: "🇮🇩", code: "ID", currency: "IDR", symbol: "Rp", rate: 16000.00 },
  { name: "Vietnam", flag: "🇻🇳", code: "VN", currency: "VND", symbol: "₫", rate: 25400.00 },
  { name: "Thailand", flag: "🇹🇭", code: "TH", currency: "THB", symbol: "฿", rate: 36.70 },
  { name: "Malaysia", flag: "🇲🇾", code: "MY", currency: "MYR", symbol: "RM", rate: 4.71 },
  { name: "Israel", flag: "🇮🇱", code: "IL", currency: "ILS", symbol: "₪", rate: 3.68 },
  { name: "Qatar", flag: "🇶🇦", code: "QA", currency: "QAR", symbol: "QR", rate: 3.64 },
  { name: "Australia", flag: "🇦🇺", code: "AU", currency: "AUD", symbol: "A$", rate: 1.52 },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", currency: "NZD", symbol: "NZ$", rate: 1.64 },
  { name: "Fiji", flag: "🇫🇯", code: "FJ", currency: "FJD", symbol: "FJ$", rate: 2.25 }
];

// Messaging platform configurations
const messagingPlatforms = {
  whatsapp: { name: 'WhatsApp', icon: '💬', color: '#25D366' },
  telegram: { name: 'Telegram', icon: '✈️', color: '#0088cc' },
  messenger: { name: 'Messenger', icon: '💭', color: '#00B2FF' },
  discord: { name: 'Discord', icon: '🎮', color: '#5865F2' },
  signal: { name: 'Signal', icon: '🔒', color: '#3A76F0' },
  wechat: { name: 'WeChat', icon: '💚', color: '#07C160' },
  viber: { name: 'Viber', icon: '📞', color: '#7360F2' },
  line: { name: 'LINE', icon: '💚', color: '#00B900' },
  'google-messages': { name: 'Google Messages', icon: '💬', color: '#1A73E8' },
  imessage: { name: 'iMessage', icon: '🍎', color: '#007AFF' }
};

// State management
let listings = [];
let favorites = new Set();
let currentPage = 0;
let isLoading = false;
let selectedListing = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  loadListings();
  setupEventListeners();
});

// Initialize filter dropdowns
function initFilters() {
  const countryFilter = document.getElementById('countryFilter');
  const platformFilter = document.getElementById('platformFilter');

  // Populate countries
  countryData.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = `${country.flag} ${country.name}`;
    countryFilter.appendChild(option);
  });

  // Populate platforms
  Object.entries(messagingPlatforms).forEach(([key, platform]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = `${platform.icon} ${platform.name}`;
    platformFilter.appendChild(option);
  });
}

// Setup event listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const countryFilter = document.getElementById('countryFilter');
  const platformFilter = document.getElementById('platformFilter');

  searchInput.addEventListener('input', debounce(() => {
    currentPage = 0;
    loadListings();
  }, 300));

  countryFilter.addEventListener('change', () => {
    currentPage = 0;
    loadListings();
  });

  platformFilter.addEventListener('change', () => {
    currentPage = 0;
    loadListings();
  });

  // Infinite scroll
  window.addEventListener('scroll', () => {
    if (isLoading) return;
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 500;

    if (scrollPosition >= threshold) {
      loadListings();
    }
  });
}

// Load listings
function loadListings() {
  if (isLoading) return;
  
  isLoading = true;
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.classList.add('active');
  }

  try {
    // Simulate API call
    setTimeout(() => {
      const newListings = generateMockListings(20);
      listings = [...listings, ...newListings];
      renderListings(newListings);
      updatePlatformCounts();
      
      currentPage++;
      isLoading = false;
      if (loadingIndicator) {
        loadingIndicator.classList.remove('active');
      }
    }, 800);
  } catch (error) {
    console.error('Error loading listings:', error);
    isLoading = false;
    if (loadingIndicator) {
      loadingIndicator.classList.remove('active');
    }
  }
}

// Generate mock listings
function generateMockListings(count) {
  const mockListings = [];
  const numberTypes = ['Personal', 'Business', 'Verified', 'Premium', 'Trial'];
  const features = ['Active', 'With History', 'Clean', 'Old Account', 'High Engagement'];

  for (let i = 0; i < count; i++) {
    const platformKeys = Object.keys(messagingPlatforms);
    const platform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
    const country = countryData[Math.floor(Math.random() * countryData.length)];
    const price = (Math.random() * 200 + 5).toFixed(2);

    mockListings.push({
      id: Date.now() + i,
      platform,
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      type: numberTypes[Math.floor(Math.random() * numberTypes.length)],
      feature: features[Math.floor(Math.random() * features.length)],
      phoneNumber: `+${country.code} ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      price: parseFloat(price),
      status: Math.random() > 0.1 ? 'available' : 'sold',
      description: `Verified ${messagingPlatforms[platform].name} number with active status`,
      image: null
    });
  }

  return mockListings;
}

// Render listings
function renderListings(listingsToRender) {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const countryFilter = document.getElementById('countryFilter').value;
  const platformFilter = document.getElementById('platformFilter').value;

  // Filter listings
  const filtered = listingsToRender.filter(listing => {
    const matchesSearch = !searchTerm || 
      listing.platform.toLowerCase().includes(searchTerm) ||
      listing.countryName.toLowerCase().includes(searchTerm) ||
      listing.type.toLowerCase().includes(searchTerm);

    const matchesCountry = !countryFilter || listing.country === countryFilter;
    const matchesPlatform = !platformFilter || listing.platform === platformFilter;

    return matchesSearch && matchesCountry && matchesPlatform;
  });

  // Group by platform
  const grouped = filtered.reduce((acc, listing) => {
    if (!acc[listing.platform]) {
      acc[listing.platform] = [];
    }
    acc[listing.platform].push(listing);
    return acc;
  }, {});

  // Update all platform sections - clear "Loading..." text even if no listings
  document.querySelectorAll('.platform-section').forEach(section => {
    const platform = section.dataset.platform;
    const countElement = section.querySelector('.platform-count');
    
    if (countElement && platform) {
      const count = grouped[platform] ? grouped[platform].length : 0;
      countElement.textContent = `${count} numbers available`;
    }
  });

  // Render each platform section
  Object.entries(grouped).forEach(([platform, platformListings]) => {
    const container = document.getElementById(`${platform}-listings`);
    if (!container) return;

    platformListings.forEach(listing => {
      const card = createListingCard(listing);
      container.appendChild(card);
    });
  });
}

// Create listing card
function createListingCard(listing) {
  const card = document.createElement('div');
  card.className = 'account-card';
  card.dataset.id = listing.id;

  const platformInfo = messagingPlatforms[listing.platform];
  const isFavorite = favorites.has(listing.id);

  card.innerHTML = `
    <div class="card-top">
      <span class="badge-platform">${platformInfo.name}</span>
      <span class="badge-${listing.status}">${listing.status.toUpperCase()}</span>
    </div>
    <div class="card-title">${listing.phoneNumber}</div>
    <div class="card-sub">${listing.feature} • ${listing.type}</div>
    <div class="card-meta">
      <div class="meta-item">
        <span class="meta-label">Country:</span>
        <span class="meta-value">${listing.flag} ${listing.countryName}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Type:</span>
        <span class="meta-value">${listing.type}</span>
      </div>
    </div>
    <div class="card-bottom">
      <div class="card-price" data-usd="${listing.price}">$${listing.price.toFixed(2)}</div>
      <button class="btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${listing.id})">
        ${isFavorite ? '❤️' : '🤍'}
      </button>
      <button class="btn-buy" onclick="openPaymentModal(${listing.id})" ${listing.status === 'sold' ? 'disabled' : ''}>
        ${listing.status === 'sold' ? 'SOLD' : 'BUY'}
      </button>
    </div>
  `;

  return card;
}

// Update platform counts
function updatePlatformCounts() {
  const counts = {};
  
  listings.forEach(listing => {
    counts[listing.platform] = (counts[listing.platform] || 0) + 1;
  });

  // Update all platform sections, including those with 0 listings
  document.querySelectorAll('.platform-section').forEach(section => {
    const platform = section.dataset.platform;
    if (!platform) return;
    
    const countElement = section.querySelector('.platform-count');
    if (countElement) {
      const count = counts[platform] || 0;
      countElement.textContent = `${count} numbers available`;
    }
  });
}

// Toggle favorite
function toggleFavorite(listingId) {
  if (favorites.has(listingId)) {
    favorites.delete(listingId);
  } else {
    favorites.add(listingId);
  }
  
  // Re-render to update UI
  const cards = document.querySelectorAll(`[data-id="${listingId}"]`);
  cards.forEach(card => {
    const btn = card.querySelector('.btn-favorite');
    if (btn) {
      btn.classList.toggle('active');
      btn.innerHTML = favorites.has(listingId) ? '❤️' : '🤍';
    }
  });
}

// Payment modal functions
function openPaymentModal(listingId) {
  selectedListing = listings.find(l => l.id === listingId);
  if (!selectedListing) return;

  const modal = document.getElementById('paymentModal');
  const summary = document.getElementById('purchaseSummary');

  const platformInfo = messagingPlatforms[selectedListing.platform];

  summary.innerHTML = `
    <div class="summary-item">
      <span>Platform:</span>
      <span>${platformInfo.icon} ${platformInfo.name}</span>
    </div>
    <div class="summary-item">
      <span>Phone Number:</span>
      <span>${selectedListing.phoneNumber}</span>
    </div>
    <div class="summary-item">
      <span>Type:</span>
      <span>${selectedListing.type}</span>
    </div>
    <div class="summary-item">
      <span>Country:</span>
      <span>${selectedListing.flag} ${selectedListing.countryName}</span>
    </div>
    <div class="summary-item">
      <span>Price:</span>
      <span>$${selectedListing.price.toFixed(2)}</span>
    </div>
  `;

  modal.classList.add('active');
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('active');
}

function processPayment() {
  // Simulate payment processing
  setTimeout(() => {
    closePaymentModal();
    showSuccessModal();
  }, 1500);
}

function showSuccessModal() {
  const modal = document.getElementById('successModal');
  const details = document.getElementById('accountDetails');

  if (selectedListing) {
    const platformInfo = messagingPlatforms[selectedListing.platform];
    details.innerHTML = `
      <p><strong>Platform:</strong> ${platformInfo.name}</p>
      <p><strong>Phone Number:</strong> ${selectedListing.phoneNumber}</p>
      <p><strong>Verification Code:</strong> ${Math.floor(Math.random() * 900000 + 100000)}</p>
      <p><strong>Country:</strong> ${selectedListing.flag} ${selectedListing.countryName}</p>
      <p><strong>Type:</strong> ${selectedListing.type}</p>
      <p style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #1c2536; color: #00d2ff;">
        ✅ Account details have been sent to your email address
      </p>
    `;
  }

  modal.classList.add('active');
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.remove('active');
}

// Utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePaymentModal();
    closeSuccessModal();
  }
});

// Close modals on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closePaymentModal();
    closeSuccessModal();
  }
});