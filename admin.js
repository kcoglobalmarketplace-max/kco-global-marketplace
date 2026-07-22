// ============================================
// EVERYHANDLE - ADMIN DASHBOARD
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

// Admin credentials (in production, use secure backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// State management
let listings = [];
let isLoggedIn = false;
let editingId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCountryDropdown();
  loadListingsFromStorage();
  checkAuth();
});

// Initialize country dropdown
function initCountryDropdown() {
  const countrySelect = document.getElementById('listingCountry');
  
  countryData.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = `${country.flag} ${country.name}`;
    countrySelect.appendChild(option);
  });
}

// Check authentication
function checkAuth() {
  const auth = localStorage.getItem('adminAuth');
  if (auth === 'true') {
    isLoggedIn = true;
    showDashboard();
  }
}

// Handle login
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    isLoggedIn = true;
    localStorage.setItem('adminAuth', 'true');
    showDashboard();
  } else {
    alert('Invalid credentials. Please try again.');
  }
}

// Show dashboard
function showDashboard() {
  document.getElementById('adminLogin').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  updateStats();
  renderListingsTable();
}

// Add new listing
function addListing(event) {
  event.preventDefault();

  const listing = {
    id: editingId || Date.now(),
    platform: document.getElementById('listingPlatform').value,
    country: document.getElementById('listingCountry').value,
    type: document.getElementById('listingType').value,
    followers: document.getElementById('listingFollowers').value,
    price: parseFloat(document.getElementById('listingPrice').value),
    status: document.getElementById('listingStatus').value,
    description: document.getElementById('listingDescription').value,
    image: document.getElementById('listingImage').value,
    createdAt: new Date().toISOString()
  };

  if (editingId) {
    // Update existing listing
    const index = listings.findIndex(l => l.id === editingId);
    if (index !== -1) {
      listings[index] = listing;
    }
    editingId = null;
  } else {
    // Add new listing
    listings.push(listing);
  }

  // Save to localStorage
  saveListingsToStorage();
  
  // Reset form
  event.target.reset();
  
  // Update UI
  updateStats();
  renderListingsTable();
}

// Edit listing
function editListing(id) {
  const listing = listings.find(l => l.id === id);
  if (!listing) return;

  editingId = id;
  
  // Populate form
  document.getElementById('listingPlatform').value = listing.platform;
  document.getElementById('listingCountry').value = listing.country;
  document.getElementById('listingType').value = listing.type;
  document.getElementById('listingFollowers').value = listing.followers;
  document.getElementById('listingPrice').value = listing.price;
  document.getElementById('listingStatus').value = listing.status;
  document.getElementById('listingDescription').value = listing.description;
  document.getElementById('listingImage').value = listing.image || '';

  // Scroll to form
  document.querySelector('.listing-form').scrollIntoView({ behavior: 'smooth' });
}

// Delete listing
function deleteListing(id) {
  if (!confirm('Are you sure you want to delete this listing?')) return;

  listings = listings.filter(l => l.id !== id);
  saveListingsToStorage();
  updateStats();
  renderListingsTable();
}

// Save listings to localStorage
function saveListingsToStorage() {
  localStorage.setItem('everyHandleListings', JSON.stringify(listings));
}

// Load listings from localStorage
function loadListingsFromStorage() {
  const stored = localStorage.getItem('everyHandleListings');
  if (stored) {
    listings = JSON.parse(stored);
  }
}

// Update statistics
function updateStats() {
  const total = listings.length;
  const available = listings.filter(l => l.status === 'available').length;
  const sold = listings.filter(l => l.status === 'sold').length;
  const revenue = listings
    .filter(l => l.status === 'sold')
    .reduce((sum, l) => sum + l.price, 0);

  document.getElementById('totalListings').textContent = total;
  document.getElementById('availableListings').textContent = available;
  document.getElementById('soldListings').textContent = sold;
  document.getElementById('totalRevenue').textContent = `$${revenue.toFixed(2)}`;
}

// Render listings table
function renderListingsTable() {
  const tbody = document.getElementById('listingsTableBody');

  if (listings.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="no-data">No listings yet. Add your first listing above.</td></tr>';
    return;
  }

  tbody.innerHTML = listings.map(listing => {
    const country = countryData.find(c => c.code === listing.country);
    const countryName = country ? `${country.flag} ${country.name}` : listing.country;

    return `
      <tr>
        <td>${listing.platform}</td>
        <td>${countryName}</td>
        <td>${listing.type}</td>
        <td>${listing.followers || 'N/A'}</td>
        <td>$${listing.price.toFixed(2)}</td>
        <td><span class="badge-${listing.status}">${listing.status.toUpperCase()}</span></td>
        <td>
          <button class="btn-edit" onclick="editListing(${listing.id})">Edit</button>
          <button class="btn-delete" onclick="deleteListing(${listing.id})">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Logout
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    isLoggedIn = false;
    localStorage.removeItem('adminAuth');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
  }
}

// Export data
function exportData() {
  const dataStr = JSON.stringify(listings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `everyhandle-listings-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
}

// Import data
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        listings = [...listings, ...imported];
        saveListingsToStorage();
        updateStats();
        renderListingsTable();
        alert(`Successfully imported ${imported.length} listings!`);
      }
    } catch (error) {
      alert('Error importing data. Please check the file format.');
    }
  };
  reader.readAsText(file);
}