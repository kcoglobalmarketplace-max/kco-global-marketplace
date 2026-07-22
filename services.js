// ============================================
// EVERYHANDLE - VIDEO & COMMUNICATION SERVICES
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

// Service categories
const serviceCategories = {
  'video-calling': {
    name: 'Video Calling Services',
    icon: '📹',
    services: ['Zoom', 'Google Meet', 'Microsoft Teams', 'Skype', 'FaceTime', 'Webex', 'Discord Video', 'WhatsApp Video']
  },
  'voice-calling': {
    name: 'Voice Calling Services',
    icon: '📞',
    services: ['Skype', 'Google Voice', 'Discord', 'Zoom Phone', 'RingCentral', 'Vonage', 'Grasshopper']
  },
  'voice-cloning': {
    name: 'Voice Cloning Services',
    icon: '🎙️',
    services: ['ElevenLabs', 'Resemble AI', 'Descript', 'Murf AI', 'Play.ht', 'Listnr', 'Speechify']
  },
  'live-streaming': {
    name: 'Live Streaming Services',
    icon: '📺',
    services: ['Twitch', 'YouTube Live', 'Facebook Live', 'Instagram Live', 'TikTok Live', 'DLive', 'StreamYard']
  }
};

// State management
let services = [];
let favorites = new Set();
let currentPage = 0;
let isLoading = false;
let selectedService = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  loadServices();
  setupEventListeners();
});

// Initialize filter dropdowns
function initFilters() {
  const categoryFilter = document.getElementById('categoryFilter');

  // Populate categories
  Object.entries(serviceCategories).forEach(([key, category]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = `${category.icon} ${category.name}`;
    categoryFilter.appendChild(option);
  });
}

// Setup event listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  searchInput.addEventListener('input', debounce(() => {
    currentPage = 0;
    loadServices();
  }, 300));

  categoryFilter.addEventListener('change', () => {
    currentPage = 0;
    loadServices();
  });

  // Infinite scroll
  window.addEventListener('scroll', () => {
    if (isLoading) return;
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 500;

    if (scrollPosition >= threshold) {
      loadServices();
    }
  });
}

// Load services
function loadServices() {
  if (isLoading) return;
  
  isLoading = true;
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.classList.add('active');
  }

  try {
    // Simulate API call
    setTimeout(() => {
      const newServices = generateMockServices(15);
      services = [...services, ...newServices];
      renderServices(newServices);
      updateCategoryCounts();
      
      currentPage++;
      isLoading = false;
      if (loadingIndicator) {
        loadingIndicator.classList.remove('active');
      }
    }, 800);
  } catch (error) {
    console.error('Error loading services:', error);
    isLoading = false;
    if (loadingIndicator) {
      loadingIndicator.classList.remove('active');
    }
  }
}

// Generate mock services
function generateMockServices(count) {
  const mockServices = [];
  const categories = Object.keys(serviceCategories);
  const features = ['Premium', 'Professional', 'Enterprise', 'Basic', 'Advanced'];
  const durations = ['Monthly', 'Yearly', 'Lifetime', 'Pay-as-you-go'];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryInfo = serviceCategories[category];
    const serviceName = categoryInfo.services[Math.floor(Math.random() * categoryInfo.services.length)];
    const country = countryData[Math.floor(Math.random() * countryData.length)];
    
    // Price in NGN (₦) - between ₦2,000 and ₦300,000
    const priceNGN = Math.floor(Math.random() * 298000) + 2000;

    mockServices.push({
      id: Date.now() + i,
      category,
      serviceName,
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      feature: features[Math.floor(Math.random() * features.length)],
      duration: durations[Math.floor(Math.random() * durations.length)],
      price: priceNGN,
      status: 'available',
      description: `Professional ${serviceName} ${categoryInfo.name.toLowerCase()} subscription`,
      image: null
    });
  }

  return mockServices;
}

// Render services
function renderServices(servicesToRender) {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;

  // Filter services
  const filtered = servicesToRender.filter(service => {
    const matchesSearch = !searchTerm || 
      service.serviceName.toLowerCase().includes(searchTerm) ||
      service.countryName.toLowerCase().includes(searchTerm) ||
      service.feature.toLowerCase().includes(searchTerm);

    const matchesCategory = !categoryFilter || service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Group by category
  const grouped = filtered.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  // Update all category sections - clear "Loading..." text even if no services
  document.querySelectorAll('.platform-section').forEach(section => {
    const category = section.dataset.category;
    const countElement = section.querySelector('.platform-count');
    
    if (countElement && category) {
      const count = grouped[category] ? grouped[category].length : 0;
      countElement.textContent = `${count} services available`;
    }
  });

  // Render each category section
  Object.entries(grouped).forEach(([category, categoryServices]) => {
    const container = document.getElementById(`${category}-listings`);
    if (!container) return;

    categoryServices.forEach(service => {
      const card = createServiceCard(service);
      container.appendChild(card);
    });
  });
}

// Create service card
function createServiceCard(service) {
  const card = document.createElement('div');
  card.className = 'account-card';
  card.dataset.id = service.id;

  const categoryInfo = serviceCategories[service.category];
  const isFavorite = favorites.has(service.id);

  card.innerHTML = `
    <div class="card-top">
      <span class="badge-platform">${categoryInfo.icon} ${service.serviceName}</span>
      <span class="badge-available">${service.status.toUpperCase()}</span>
    </div>
    <div class="card-title">${categoryInfo.name}</div>
    <div class="card-sub">${service.feature} • ${service.duration}</div>
    <div class="card-meta">
      <div class="meta-item">
        <span class="meta-label">Service:</span>
        <span class="meta-value">${service.serviceName}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Country:</span>
        <span class="meta-value">${service.flag} ${service.countryName}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Duration:</span>
        <span class="meta-value">${service.duration}</span>
      </div>
    </div>
    <div class="card-bottom">
      <div class="card-price" data-ngn="${service.price}">₦${service.price.toLocaleString()}</div>
      <button class="btn-buy" onclick="openPaymentModal(${service.id})">
        BUY
      </button>
    </div>
  `;

  return card;
}

// Update category counts
function updateCategoryCounts() {
  const counts = {};
  
  services.forEach(service => {
    counts[service.category] = (counts[service.category] || 0) + 1;
  });

  // Update all category sections, including those with 0 services
  document.querySelectorAll('.platform-section').forEach(section => {
    const category = section.dataset.category;
    if (!category) return;
    
    const countElement = section.querySelector('.platform-count');
    if (countElement) {
      const count = counts[category] || 0;
      countElement.textContent = `${count} services available`;
    }
  });
}

// Toggle favorite
function toggleFavorite(serviceId) {
  if (favorites.has(serviceId)) {
    favorites.delete(serviceId);
  } else {
    favorites.add(serviceId);
  }
  
  // Re-render to update UI
  const cards = document.querySelectorAll(`[data-id="${serviceId}"]`);
  cards.forEach(card => {
    const btn = card.querySelector('.btn-favorite');
    if (btn) {
      btn.classList.toggle('active');
      btn.innerHTML = favorites.has(serviceId) ? '❤️' : '🤍';
    }
  });
}

// Payment modal functions
function openPaymentModal(serviceId) {
  selectedService = services.find(s => s.id === serviceId);
  if (!selectedService) return;

  const modal = document.getElementById('paymentModal');
  const summary = document.getElementById('purchaseSummary');

  const categoryInfo = serviceCategories[selectedService.category];

  summary.innerHTML = `
    <div class="summary-item">
      <span>Service:</span>
      <span>${selectedService.serviceName}</span>
    </div>
    <div class="summary-item">
      <span>Category:</span>
      <span>${categoryInfo.icon} ${categoryInfo.name}</span>
    </div>
    <div class="summary-item">
      <span>Plan:</span>
      <span>${selectedService.feature} (${selectedService.duration})</span>
    </div>
    <div class="summary-item">
      <span>Country:</span>
      <span>${selectedService.flag} ${selectedService.countryName}</span>
    </div>
    <div class="summary-item">
      <span>Price:</span>
      <span>₦${selectedService.price.toLocaleString()}</span>
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

  if (selectedService) {
    const categoryInfo = serviceCategories[selectedService.category];
    details.innerHTML = `
      <p><strong>Service:</strong> ${selectedService.serviceName}</p>
      <p><strong>Category:</strong> ${categoryInfo.name}</p>
      <p><strong>Account Email:</strong> service${selectedService.id}@email.com</p>
      <p><strong>Password:</strong> ServicePass123!</p>
      <p><strong>Plan:</strong> ${selectedService.feature} (${selectedService.duration})</p>
      <p><strong>Country:</strong> ${selectedService.flag} ${selectedService.countryName}</p>
      <p style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #1c2536; color: #00d2ff;">
        ✅ Service credentials have been sent to your email address
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