// ============================================
// EVERYHANDLE - SOCIAL MEDIA SHOWROOM
// ============================================

// Country Data (from index.html)
const countryData = [
  // North & South America
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

  // Europe
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
  { name: "Italy", flag: "🇮🇹", code: "IT", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Spain", flag: "🇪🇸", code: "ES", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Belgium", flag: "🇧🇪", code: "BE", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Austria", flag: "🇦🇹", code: "AT", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Ireland", flag: "🇮🇪", code: "IE", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Portugal", flag: "🇵🇹", code: "PT", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Finland", flag: "🇫🇮", code: "FI", currency: "EUR", symbol: "€", rate: 0.92 },

  // Africa
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

  // Asia & Middle East
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

  // Oceania
  { name: "Australia", flag: "🇦🇺", code: "AU", currency: "AUD", symbol: "A$", rate: 1.52 },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", currency: "NZD", symbol: "NZ$", rate: 1.64 },
  { name: "Fiji", flag: "🇫🇯", code: "FJ", currency: "FJD", symbol: "FJ$", rate: 2.25 }
];

// Platform configurations
const platforms = {
  'facebook-pages': { name: 'Facebook Pages', icon: '📘', color: '#1877f2' },
  facebook: { name: 'Facebook', icon: '📘', color: '#1877f2' },
  'facebook-dating': { name: 'Facebook Dating', icon: '💘', color: '#1877f2' },
  tiktok: { name: 'TikTok', icon: '🎵', color: '#ff0050' },
  instagram: { name: 'Instagram', icon: '📷', color: '#e4405f' },
  x: { name: 'X (Twitter)', icon: '𝕏', color: '#ffffff' },
  youtube: { name: 'YouTube', icon: '▶️', color: '#ff0000' },
  nextdoor: { name: 'Nextdoor', icon: '🏘️', color: '#8ed500' },
  pinterest: { name: 'Pinterest', icon: '📌', color: '#e60023' },
  threads: { name: 'Threads', icon: '🧵', color: '#ffffff' },
  linkedin: { name: 'LinkedIn', icon: '💼', color: '#0a66c2' },
  reddit: { name: 'Reddit', icon: '🤖', color: '#ff4500' },
  snapchat: { name: 'Snapchat', icon: '👻', color: '#fffc00' },
  lemon8: { name: 'Lemon8', icon: '🍋', color: '#ffc800' },
  tumblr: { name: 'Tumblr', icon: '📝', color: '#35465c' },
  bluesky: { name: 'Bluesky', icon: '🦋', color: '#0085ff' },
  telegram: { name: 'Telegram', icon: '✈️', color: '#0088cc' },
  whatsapp: { name: 'WhatsApp', icon: '💬', color: '#25d366' },
  discord: { name: 'Discord', icon: '🎮', color: '#5865f2' },
  signal: { name: 'Signal', icon: '🔒', color: '#3a76f0' },
  messenger: { name: 'Messenger', icon: '💭', color: '#00b4d8' },
  wechat: { name: 'WeChat', icon: '💚', color: '#07c160' },
  line: { name: 'LINE', icon: '🟢', color: '#00c300' },
  viber: { name: 'Viber', icon: '🟣', color: '#7360f2' },
  'google-messages': { name: 'Google Messages', icon: '💬', color: '#1a73e8' },
  imessage: { name: 'iMessage', icon: '🍎', color: '#007aff' }
};

// State management
let listings = [];
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
  Object.entries(platforms).forEach(([key, platform]) => {
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
      let newListings = [];
      
      // Load specific data on first page
      if (currentPage === 0) {
        // Load TikTok accounts (400 total: 300 available, 100 sold out)
        const tiktokAccounts = generateTikTokAccounts();
        listings = [...listings, ...tiktokAccounts];
        newListings = [...newListings, ...tiktokAccounts];
        
        // Load Facebook accounts (1000 total: 500 pages + 300 normal + 200 dating)
        const facebookAccounts = generateFacebookAccounts();
        listings = [...listings, ...facebookAccounts];
        newListings = [...newListings, ...facebookAccounts];
        
        // Load WhatsApp numbers (50 numbers, all available)
        const whatsappNumbers = generateWhatsAppNumbers();
        listings = [...listings, ...whatsappNumbers];
        newListings = [...newListings, ...whatsappNumbers];
        
        // Load services
        const services = generateServices();
        listings = [...listings, ...services];
        newListings = [...newListings, ...services];
        
        // Load other platforms
        const otherListings = generateMockListings(20);
        listings = [...listings, ...otherListings];
        newListings = [...newListings, ...otherListings];
      } else {
        // Load more generic listings for infinite scroll
        newListings = generateMockListings(20);
        listings = [...listings, ...newListings];
      }
      
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

// Nigerian Naira pricing tiers (max ₦300,000)
const priceTiers = [
  2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 7500, 8000, 9000, 10000,
  12000, 15000, 18000, 20000, 22000, 25000, 28000, 30000, 35000, 40000, 45000, 50000,
  55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000,
  130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000, 210000, 220000, 230000,
  240000, 250000, 260000, 270000, 280000, 290000, 300000
];

// Follower count options
const followerOptions = [
  '4K', '5K', '6K', '7K', '8K', '9K', '10K', '12K', '15K', '18K', '20K',
  '25K', '30K', '35K', '40K', '45K', '50K', '60K', '70K', '80K', '90K', '100K',
  '120K', '150K', '180K', '200K', '250K', '300K', '350K', '400K', '450K', '500K',
  '550K', '600K', '650K', '700K', '750K', '800K', '850K', '900K', '950K', '1M'
];

// Username prefixes and suffixes for variety
const usernamePrefixes = ['official', 'real', 'the', 'verified', 'premium', 'pro', 'elite', 'top', 'best', 'vip'];
const usernameSuffixes = ['official', 'real', 'hq', 'original', 'authentic', 'genuine', 'true', 'pure'];

// Helper function to get random country with weighted distribution
function getRandomCountry() {
  const weightedCountries = [
    // 40% USA, UK, Europe, Singapore
    { country: countryData.find(c => c.code === 'US'), weight: 20 },
    { country: countryData.find(c => c.code === 'GB'), weight: 15 },
    { country: countryData.find(c => c.code === 'DE'), weight: 10 },
    { country: countryData.find(c => c.code === 'FR'), weight: 8 },
    { country: countryData.find(c => c.code === 'SG'), weight: 8 },
    { country: countryData.find(c => c.code === 'IT'), weight: 5 },
    { country: countryData.find(c => c.code === 'ES'), weight: 5 },
    { country: countryData.find(c => c.code === 'NL'), weight: 5 },
    { country: countryData.find(c => c.code === 'CH'), weight: 4 },
    { country: countryData.find(c => c.code === 'SE'), weight: 3 },
    { country: countryData.find(c => c.code === 'NO'), weight: 3 },
    { country: countryData.find(c => c.code === 'DK'), weight: 3 },
    { country: countryData.find(c => c.code === 'FI'), weight: 2 },
    { country: countryData.find(c => c.code === 'BE'), weight: 2 },
    { country: countryData.find(c => c.code === 'AT'), weight: 2 },
    { country: countryData.find(c => c.code === 'IE'), weight: 2 },
    { country: countryData.find(c => c.code === 'PT'), weight: 2 },
    // 60% rest of world
    { country: countryData.find(c => c.code === 'CA'), weight: 5 },
    { country: countryData.find(c => c.code === 'AU'), weight: 5 },
    { country: countryData.find(c => c.code === 'NZ'), weight: 3 },
    { country: countryData.find(c => c.code === 'JP'), weight: 3 },
    { country: countryData.find(c => c.code === 'IN'), weight: 3 },
    { country: countryData.find(c => c.code === 'BR'), weight: 3 },
    { country: countryData.find(c => c.code === 'MX'), weight: 3 },
    { country: countryData.find(c => c.code === 'NG'), weight: 3 },
    { country: countryData.find(c => c.code === 'ZA'), weight: 2 },
    { country: countryData.find(c => c.code === 'AE'), weight: 2 },
    { country: countryData.find(c => c.code === 'SA'), weight: 2 },
    { country: countryData.find(c => c.code === 'KR'), weight: 2 },
    { country: countryData.find(c => c.code === 'PH'), weight: 2 },
    { country: countryData.find(c => c.code === 'MY'), weight: 2 },
    { country: countryData.find(c => c.code === 'TH'), weight: 2 },
    { country: countryData.find(c => c.code === 'ID'), weight: 2 },
    { country: countryData.find(c => c.code === 'HK'), weight: 2 }
  ];

  const totalWeight = weightedCountries.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of weightedCountries) {
    random -= item.weight;
    if (random <= 0) {
      return item.country;
    }
  }
  
  return countryData.find(c => c.code === 'US');
}

// Generate specific TikTok accounts (400 total: 300 available, 100 sold out)
function generateTikTokAccounts() {
  const accounts = [];
  
  for (let i = 0; i < 400; i++) {
    const followerCount = followerOptions[Math.floor(Math.random() * followerOptions.length)];
    const prefix = usernamePrefixes[Math.floor(Math.random() * usernamePrefixes.length)];
    const suffix = usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)];
    const username = `${prefix}_tiktok_${suffix}_${i + 1}`;
    const country = getRandomCountry();
    
    // Price calculation based on followers (NGN, max ₦300,000)
    let basePrice;
    const followerNum = parseFloat(followerCount);
    if (followerNum <= 20) basePrice = priceTiers[Math.floor(Math.random() * 12)]; // ₦2K-10K
    else if (followerNum <= 100) basePrice = priceTiers[12 + Math.floor(Math.random() * 18)]; // ₦12K-50K
    else if (followerNum <= 500) basePrice = priceTiers[30 + Math.floor(Math.random() * 20)]; // ₦55K-200K
    else basePrice = priceTiers[50 + Math.floor(Math.random() * 20)]; // ₦260K-300K
    
    const price = Math.min(Math.round(basePrice / 1000) * 1000, 300000);
    
    accounts.push({
      id: 100000 + i,
      platform: 'tiktok',
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      username: username,
      type: 'Personal',
      niche: 'Entertainment',
      followers: followerCount,
      price: price,
      verified: Math.random() > 0.5,
      creationYear: 2020,
      status: i < 100 ? 'sold' : 'available', // First 100 are SOLD OUT
      description: `Premium TikTok account with ${followerCount} followers`,
      image: 'assets/images/tiktok-placeholder.webp'
    });
  }
  
  return accounts;
}

// Generate specific Facebook accounts (1000 total: 500 pages + 300 normal + 200 dating)
function generateFacebookAccounts() {
  const accounts = [];
  
  // 500 Facebook Pages (all available)
  for (let i = 0; i < 500; i++) {
    const followerCount = followerOptions[Math.floor(Math.random() * followerOptions.length)];
    const username = `fb_page_${i + 1}`;
    const country = getRandomCountry();
    
    let basePrice;
    const followerNum = parseFloat(followerCount);
    if (followerNum <= 20) basePrice = priceTiers[Math.floor(Math.random() * 12)];
    else if (followerNum <= 100) basePrice = priceTiers[12 + Math.floor(Math.random() * 18)];
    else if (followerNum <= 500) basePrice = priceTiers[30 + Math.floor(Math.random() * 20)];
    else basePrice = priceTiers[50 + Math.floor(Math.random() * 20)];
    
    const price = Math.min(Math.round(basePrice / 1000) * 1000, 300000);
    
    accounts.push({
      id: 200000 + i,
      platform: 'facebook-pages',
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      username: username,
      type: 'Facebook Page',
      niche: 'Business',
      followers: followerCount,
      price: price,
      verified: Math.random() > 0.4,
      creationYear: 2007,
      status: 'available',
      description: `Established Facebook Page with ${followerCount} followers`,
      image: 'assets/images/facebook-placeholder.webp'
    });
  }
  
  // 300 Normal Facebook Accounts (75 sold out, 225 available)
  for (let i = 0; i < 300; i++) {
    const followerCount = followerOptions[Math.floor(Math.random() * followerOptions.length)];
    const prefix = usernamePrefixes[Math.floor(Math.random() * usernamePrefixes.length)];
    const suffix = usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)];
    const username = `${prefix}_fb_${suffix}_${i + 1}`;
    const country = getRandomCountry();
    
    let basePrice;
    const followerNum = parseFloat(followerCount);
    if (followerNum <= 20) basePrice = priceTiers[Math.floor(Math.random() * 12)];
    else if (followerNum <= 100) basePrice = priceTiers[12 + Math.floor(Math.random() * 18)];
    else if (followerNum <= 500) basePrice = priceTiers[30 + Math.floor(Math.random() * 20)];
    else basePrice = priceTiers[50 + Math.floor(Math.random() * 20)];
    
    const price = Math.min(Math.round(basePrice / 1000) * 1000, 300000);
    
    accounts.push({
      id: 300000 + i,
      platform: 'facebook',
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      username: username,
      type: 'Personal Account',
      niche: 'General',
      followers: followerCount,
      price: price,
      verified: Math.random() > 0.6,
      creationYear: 2007,
      status: i < 75 ? 'sold' : 'available', // First 75 are SOLD OUT
      description: `Personal Facebook account with ${followerCount} friends`,
      image: 'assets/images/facebook-placeholder.webp'
    });
  }
  
  // 200 Facebook Dating accounts (50 sold out, 150 available)
  for (let i = 0; i < 200; i++) {
    const followerCount = followerOptions[Math.floor(Math.random() * followerOptions.length)];
    const username = `fb_dating_${i + 1}`;
    const country = getRandomCountry();
    
    let basePrice;
    const followerNum = parseFloat(followerCount);
    if (followerNum <= 20) basePrice = priceTiers[Math.floor(Math.random() * 12)];
    else if (followerNum <= 100) basePrice = priceTiers[12 + Math.floor(Math.random() * 18)];
    else if (followerNum <= 500) basePrice = priceTiers[30 + Math.floor(Math.random() * 20)];
    else basePrice = priceTiers[50 + Math.floor(Math.random() * 20)];
    
    const price = Math.min(Math.round(basePrice / 1000) * 1000, 300000);
    
    accounts.push({
      id: 400000 + i,
      platform: 'facebook-dating',
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      username: username,
      type: 'Facebook Dating',
      niche: 'Dating',
      followers: followerCount,
      price: price,
      verified: false,
      creationYear: 2020,
      status: i < 50 ? 'sold' : 'available', // First 50 are SOLD OUT
      description: `Facebook Dating profile with ${followerCount} matches`,
      image: 'assets/images/facebook-placeholder.webp'
    });
  }
  
  return accounts;
}

// Generate WhatsApp numbers (50 numbers, all available)
function generateWhatsAppNumbers() {
  const numbers = [];
  const countries = [countryData.find(c => c.code === 'US'), countryData.find(c => c.code === 'GB'), 
                     countryData.find(c => c.code === 'CA'), countryData.find(c => c.code === 'DE'),
                     countryData.find(c => c.code === 'NG'), countryData.find(c => c.code === 'AU')];
  
  for (let i = 0; i < 50; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const phoneNumber = `+${country.code === 'US' ? '1' : country.code === 'GB' ? '44' : country.code === 'CA' ? '1' : country.code === 'DE' ? '49' : country.code === 'NG' ? '234' : '61'} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`;
    
    // Fixed price of ₦5,000 for WhatsApp numbers
    const price = 5000;
    
    numbers.push({
      id: 500000 + i,
      platform: 'whatsapp',
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      username: phoneNumber,
      type: 'WhatsApp Number',
      niche: 'Messaging',
      followers: 'N/A',
      price: price,
      verified: false,
      creationYear: 2020,
      status: 'available',
      description: `Active WhatsApp number from ${country.name}`,
      image: 'assets/images/whatsapp-placeholder.webp',
      phoneNumber: phoneNumber
    });
  }
  
  return numbers;
}

// Generate Services
function generateServices() {
  const services = [
    {
      id: 600001,
      platform: 'services',
      country: 'NG',
      countryName: 'Nigeria',
      flag: '🇳🇬',
      username: 'video-call-service',
      type: 'Video Call Update',
      niche: 'Service',
      followers: 'N/A',
      price: 120000,
      verified: false,
      creationYear: 2024,
      status: 'available',
      description: 'Professional video call service - 1 hour session',
      image: 'assets/images/whatsapp-placeholder.webp',
      serviceType: 'Video Call'
    },
    {
      id: 600002,
      platform: 'services',
      country: 'NG',
      countryName: 'Nigeria',
      flag: '🇳🇬',
      username: 'video-laptop',
      type: 'Video Laptop',
      niche: 'Service',
      followers: 'N/A',
      price: 1500000,
      verified: false,
      creationYear: 2024,
      status: 'available',
      description: 'Video laptop service package',
      image: 'assets/images/whatsapp-placeholder.webp',
      serviceType: 'Video Laptop'
    },
    {
      id: 600003,
      platform: 'services',
      country: 'NG',
      countryName: 'Nigeria',
      flag: '🇳🇬',
      username: 'working-updates',
      type: 'Working Updates',
      niche: 'Service',
      followers: 'N/A',
      price: 30000,
      verified: false,
      creationYear: 2024,
      status: 'available',
      description: 'Working updates service - per update',
      image: 'assets/images/whatsapp-placeholder.webp',
      serviceType: 'Working Updates'
    },
    {
      id: 600004,
      platform: 'services',
      country: 'NG',
      countryName: 'Nigeria',
      flag: '🇳🇬',
      username: 'online-banking',
      type: 'Online Banking',
      niche: 'Service',
      followers: 'N/A',
      price: 120000,
      verified: false,
      creationYear: 2024,
      status: 'available',
      description: 'Complete online banking setup and activation',
      image: 'assets/images/whatsapp-placeholder.webp',
      serviceType: 'Online Banking'
    },
    {
      id: 600005,
      platform: 'services',
      country: 'NG',
      countryName: 'Nigeria',
      flag: '🇳🇬',
      username: 'bitcoin-trading-website',
      type: 'Bitcoin Trading Website',
      niche: 'Service',
      followers: 'N/A',
      price: 120000,
      verified: false,
      creationYear: 2024,
      status: 'available',
      description: 'Professional Bitcoin trading website development',
      image: 'assets/images/whatsapp-placeholder.webp',
      serviceType: 'Bitcoin Trading Website'
    }
  ];
  
  return services;
}

// Generate mock listings for other platforms
function generateMockListings(count) {
  const mockListings = [];
  const accountTypes = ['Personal', 'Business', 'Creator', 'Brand', 'Influencer'];
  const niches = ['Gaming', 'Fashion', 'Tech', 'Food', 'Travel', 'Fitness', 'Music', 'Art', 'Sports', 'News'];

  for (let i = 0; i < count; i++) {
    const platformKeys = Object.keys(platforms).filter(p => p !== 'facebook' && p !== 'tiktok' && p !== 'whatsapp' && p !== 'services');
    const platform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
    const country = getRandomCountry();
    
    // Generate realistic follower count
    const followerCount = followerOptions[Math.floor(Math.random() * followerOptions.length)];
    
    // Generate username
    const prefix = usernamePrefixes[Math.floor(Math.random() * usernamePrefixes.length)];
    const suffix = usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)];
    const username = `${prefix}_${platforms[platform].name.toLowerCase().replace(/\s/g, '')}_${suffix}`;
    
    // Determine verification and creation year
    const isVerified = Math.random() > 0.7; // 30% chance of verified
    const creationYear = Math.floor(Math.random() * 14) + 2007; // 2007-2020
    
    // Price calculation based on followers (NGN, max ₦300,000)
    let basePrice;
    const followerNum = parseFloat(followerCount);
    if (followerNum <= 20) basePrice = priceTiers[Math.floor(Math.random() * 12)]; // ₦2K-10K
    else if (followerNum <= 100) basePrice = priceTiers[12 + Math.floor(Math.random() * 18)]; // ₦12K-50K
    else if (followerNum <= 500) basePrice = priceTiers[30 + Math.floor(Math.random() * 20)]; // ₦55K-200K
    else basePrice = priceTiers[50 + Math.floor(Math.random() * 20)]; // ₦260K-300K
    
    // Adjust price for verification
    if (isVerified) basePrice = basePrice * 1.5;
    
    // Ensure price doesn't exceed ₦300,000
    const price = Math.min(Math.round(basePrice / 1000) * 1000, 300000);

    mockListings.push({
      id: Date.now() + i,
      platform,
      country: country.code,
      countryName: country.name,
      flag: country.flag,
      username: username,
      type: accountTypes[Math.floor(Math.random() * accountTypes.length)],
      niche: niches[Math.floor(Math.random() * niches.length)],
      followers: followerCount,
      price: price,
      verified: isVerified,
      creationYear: creationYear,
      status: Math.random() > 0.1 ? 'available' : 'sold',
      description: `Premium ${platforms[platform].name} account with ${followerCount} engaged followers`,
      image: `assets/images/${platform}-placeholder.webp`
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
      listing.type.toLowerCase().includes(searchTerm) ||
      listing.username.toLowerCase().includes(searchTerm);

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
    const listingsContainer = section.querySelector('.listings-row');
    
    if (countElement && platform) {
      const count = grouped[platform] ? grouped[platform].length : 0;
      if (count > 0) {
        if (platform === 'services') {
          countElement.textContent = `${count} services available`;
        } else if (platform === 'whatsapp') {
          countElement.textContent = `${count} numbers available`;
        } else {
          countElement.textContent = `${count} accounts available`;
        }
      } else {
        countElement.textContent = '0 accounts available';
      }
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

  const platformInfo = platforms[listing.platform] || { name: 'Service', icon: '⚡', color: '#ff6b00' };

  card.innerHTML = `
    <div class="card-top">
      <span class="badge-platform">${platformInfo.icon} ${platformInfo.name}</span>
      ${listing.verified ? '<span class="badge-verified">✓ VERIFIED</span>' : ''}
      ${listing.status === 'sold' ? '<span class="badge-sold">SOLD OUT</span>' : ''}
    </div>
    
    <img class="card-image" src="${listing.image}" alt="${platformInfo.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22140%22%3E%3Crect fill=%22%23121826%22 width=%22280%22 height=%22140%22/%3E%3Ctext fill=%22%2394a3b8%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22%3ENo Image%3C/text%3E%3C/svg%3E'">
    
    <div class="card-title">${listing.platform === 'whatsapp' ? '📱' : '@'}${listing.username}</div>
    <div class="card-sub">${listing.followers !== 'N/A' ? listing.followers + ' Followers' : listing.type}${listing.platform !== 'services' && listing.platform !== 'whatsapp' ? ' • ' + listing.flag + ' ' + listing.countryName : ''}</div>
    
    <div class="card-meta">
      <div class="meta-item">
        <span class="meta-label">Platform:</span>
        <span class="meta-value">${platformInfo.name}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Country:</span>
        <span class="meta-value">${listing.flag} ${listing.countryName}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Type:</span>
        <span class="meta-value">${listing.type}</span>
      </div>
      ${listing.platform !== 'services' && listing.platform !== 'whatsapp' ? `
      <div class="meta-item">
        <span class="meta-label">Username:</span>
        <span class="meta-value">@${listing.username}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Created:</span>
        <span class="meta-value">${listing.creationYear}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Followers:</span>
        <span class="meta-value">${listing.followers}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Verified:</span>
        <span class="meta-value">${listing.verified ? '✓ Yes' : 'No'}</span>
      </div>
      ` : `
      <div class="meta-item">
        <span class="meta-label">Description:</span>
        <span class="meta-value">${listing.description}</span>
      </div>
      `}
    </div>
    
    <div class="card-bottom">
      <div class="card-price" data-ngn="${listing.price}">₦${listing.price.toLocaleString()}</div>
      <button class="btn-buy" onclick="openPaymentModal(${listing.id})" ${listing.status === 'sold' ? 'disabled' : ''}>
        ${listing.status === 'sold' ? 'SOLD OUT' : 'BUY'}
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
      if (platform === 'services') {
        countElement.textContent = `${count} services available`;
      } else if (platform === 'whatsapp') {
        countElement.textContent = `${count} numbers available`;
      } else {
        countElement.textContent = `${count} accounts available`;
      }
    }
  });
}

// Checkout and Payment functions
function openPaymentModal(listingId) {
  selectedListing = listings.find(l => l.id === listingId);
  if (!selectedListing) return;

  const platformInfo = platforms[selectedListing.platform] || { name: 'Service' };
  
  // Prepare order data
  const orderData = {
    id: selectedListing.id,
    productName: `${platformInfo.name} ${selectedListing.type}`,
    platform: platformInfo.name,
    price: `₦${selectedListing.price.toLocaleString()}`,
    amount: selectedListing.price,
    currency: 'NGN',
    symbol: '₦',
    country: selectedListing.country,
    items: [{
      name: `${selectedListing.type} - ${selectedListing.followers !== 'N/A' ? selectedListing.followers + ' Followers' : selectedListing.description}`,
      platform: platformInfo.name,
      price: `₦${selectedListing.price.toLocaleString()}`
    }],
    total: `₦${selectedListing.price.toLocaleString()}`,
    timestamp: new Date().toISOString()
  };

  // Save order to localStorage
  localStorage.setItem('currentOrder', JSON.stringify(orderData));

  // Redirect to checkout page
  window.location.href = 'checkout.html';
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('active');
}

function processPayment() {
  // This function is deprecated - payment is now handled through checkout flow
  // Redirect to checkout instead
  window.location.href = 'checkout.html';
}

function showSuccessModal() {
  // This function is deprecated - success page is now handled separately
  // Redirect to success page if there's an order
  const orderData = localStorage.getItem('currentOrder');
  if (orderData) {
    window.location.href = 'order-success.html';
  }
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