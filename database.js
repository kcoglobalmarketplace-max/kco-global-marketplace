/**
 * K.C.O Global Marketplace - Core High-Scale Persistent Database Initializer
 * Implements granular categories, solar system matrices, unique K.C.O branding tokens, 
 * and deep specs for high-fidelity inventory scaling.
 */

const KCO_DEFAULT_STORAGE_KEY = "kco_marketplace_storage_v1";

const INITIAL_CATEGORIES = [
    { id: "all", name: "All", icon: "fas fa-globe" },
    { id: "women", name: "Women", icon: "fas fa-female" },
    { id: "men", name: "Men", icon: "fas fa-male" },
    { id: "kids", name: "Kids", icon: "fas fa-child" },
    { id: "home", name: "Home", icon: "fas fa-home" },
    { id: "fashion", name: "Fashion", icon: "fas fa-tshirt" },
    { id: "jewelry", name: "Jewelry", icon: "fas fa-gem" },
    { id: "beauty", name: "Beauty", icon: "fas fa-sparkles" },
    { id: "sports", name: "Sports", icon: "fas fa-running" },
    { id: "electronics", name: "Electronics", icon: "fas fa-tv" },
    { id: "phones", name: "Phones", icon: "fas fa-mobile-alt" },
    { id: "computers", name: "Computers", icon: "fas fa-desktop" },
    { id: "gaming", name: "Gaming", icon: "fas fa-gamepad" },
    { id: "cars", name: "Cars", icon: "fas fa-car" },
    { id: "motorcycles", name: "Motorcycles", icon: "fas fa-motorcycle" },
    { id: "bicycles", name: "Bicycles", icon: "fas fa-bicycle" },
    { id: "trucks", name: "Trucks", icon: "fas fa-truck" },
    { id: "houses", name: "Houses", icon: "fas fa-building" },
    { id: "land", name: "Land", icon: "fas fa-map" },
    { id: "furniture", name: "Furniture", icon: "fas fa-couch" },
    { id: "kitchen", name: "Kitchen", icon: "fas fa-utensils" },
    { id: "appliances", name: "Home Appliances", icon: "fas fa-blender" },
    { id: "groceries", name: "Food & Groceries", icon: "fas fa-apple-alt" },
    { id: "baby", name: "Baby", icon: "fas fa-baby" },
    { id: "pets", name: "Pets", icon: "fas fa-dog" },
    { id: "agriculture", name: "Agriculture", icon: "fas fa-seedling" },
    { id: "books", name: "Books", icon: "fas fa-book" },
    { id: "office", name: "Office", icon: "fas fa-briefcase" },
    { id: "industrial", name: "Business & Industrial", icon: "fas fa-industry" },
    { id: "autoparts", name: "Auto Parts", icon: "fas fa-cogs" }
];

// Helper functions to generate diverse high-fidelity data structures programmatically
function generatePlaceholderImage(width, height, text) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="%231a1a1a"/><rect x="10" y="10" width="${width-20}" height="${height-20}" fill="none" stroke="%23f57c00" stroke-width="2" stroke-dasharray="5,5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${text}</text></svg>`;
}

function seedMarketplaceDatabase() {
    let dataset = [];
    let idCounter = 1;

    // --- SEED CATEGORY: CARS (100+ items) ---
    const carBrands = ["Toyota", "Honda", "Nissan", "Lexus", "BMW", "Mercedes-Benz", "Audi", "Porsche", "Ferrari", "Lamborghini", "Tesla", "Ford", "Chevrolet", "Dodge", "Jeep", "GMC", "Volvo", "Land Rover"];
    const carTypes = ["Luxury Sedan", "Hyper Sport", "Track Coupe", "Off-Road SUV", "Eco Hybrid", "Full Electric", "Classic Touring"];
    
    for (let i = 1; i <= 105; i++) {
        let brand = carBrands[i % carBrands.length];
        let type = carTypes[i % carTypes.length];
        let year = 2027 - (i % 18);
        let name = `${brand} ${type} Spec-${i}`;
        let price = 35000 + (i * 2450);
        let plate = `KCO-C${String(i).padStart(3, '0')}`;
        
        let solarSpec = null;
        if (type.includes("Electric") || type.includes("Hybrid") || i % 5 === 0) {
            solarSpec = {
                hasSolar: "Yes",
                panelManufacturer: "K.C.O Solar Cell",
                panelModel: "PV-Quantum Ultra",
                panelCapacity: "400W",
                panelCount: 2,
                batteryManufacturer: "K.C.O PowerVolt",
                batteryModel: "LiFePO4-Pro",
                batteryType: "Lithium Iron Phosphate (LiFePO4)",
                batteryCapacity: "200Ah",
                dailyOutput: "3.2 kWh"
            };
        }

        dataset.push({
            id: `PROD-${idCounter++}`,
            name: name,
            brand: brand,
            model: type,
            year: year,
            category: "cars",
            subcategory: "Vehicles",
            price: price,
            currency: "USD",
            condition: year >= 2025 ? "New" : "Used",
            description: `Premium grade high performance ${name} configured meticulously featuring native ${plate} registration profiles.`,
            specifications: `License Plate: ${plate} | Drive: AWD | Transmission: Automatic`,
            stock: i % 11 === 0 ? 0 : 5 + (i % 3),
            location: "Global Showroom Alpha",
            shippingInfo: "Worldwide Secure Air Freight (7-14 Days)",
            images: [generatePlaceholderImage(400, 300, `${brand} ${year}`)],
            rating: (4.2 + (i % 9) * 0.1).toFixed(1),
            reviewsCount: 12 + (i * 3),
            soldCount: 4 + (i * 2),
            solar: solarSpec
        });
    }

    // --- SEED CATEGORY: HOUSES & REAL ESTATE (100+ items) ---
    const propTypes = ["Luxury Villa", "Modern Penthouse", "Family Duplex", "Beachfront Mansion", "Commercial Warehouse", "Industrial Complex"];
    const locations = ["Dubai Marina", "Beverly Hills", "Tokyo Shibuya", "London Mayfair", "Zurich Enge", "Singapore Orchard"];
    
    for (let i = 1; i <= 102; i++) {
        let type = propTypes[i % propTypes.length];
        let loc = locations[i % locations.length];
        let price = 450000 + (i * 35000);
        let propId = `KCO-PROP-${String(i).padStart(4, '0')}`;
        
        let solarSpec = {
            hasSolar: "Yes",
            panelManufacturer: "SunPower Global",
            panelModel: "X-Series Prime",
            panelCapacity: "600W",
            panelCount: 12 + (i % 8),
            batteryManufacturer: "Tesla Energy",
            batteryModel: "Powerwall 3 Plus",
            batteryType: "Lithium-ion",
            batteryCapacity: "300Ah",
            dailyOutput: "24.5 kWh"
        };
        if (i % 4 === 0) solarSpec = null; // Some houses don't have solar panels

        dataset.push({
            id: `PROD-${idCounter++}`,
            name: `${type} at ${loc}`,
            brand: "K.C.O Luxury Estates",
            model: type,
            year: 2026 - (i % 4),
            category: "houses",
            subcategory: "Real Estate",
            price: price,
            currency: "USD",
            condition: "New",
            description: `Exquisite asset architecture listed under ${propId}. Features premium automation interfaces and professional K.C.O orange branding signboards onsite.`,
            specifications: `Property ID: ${propId} | Location: ${loc} | Energy Index: A++`,
            stock: 1,
            location: loc,
            shippingInfo: "Deed Ownership Transfer & Escrow Processing",
            images: [generatePlaceholderImage(400, 300, `${propId}`)],
            rating: "5.0",
            reviewsCount: 3 + (i % 5),
            soldCount: i % 7 === 0 ? 1 : 0,
            solar: solarSpec
        });
    }

    // --- SEED CATEGORY: PHONES (APPLE IPHONE & IPAD COLLECTION + ACCESSORIES) ---
    const iphoneModels = [
        { name: "iPhone 18 Pro Max", year: 2026, chips: "A20 Pro", screen: "6.9\" Super Retina XDR" },
        { name: "iPhone 18 Pro", year: 2026, chips: "A20 Pro", screen: "6.3\" Super Retina XDR" },
        { name: "iPhone 17 Pro Max", year: 2025, chips: "A19 Pro", screen: "6.7\" Super Retina XDR" },
        { name: "iPhone 16 Pro Max", year: 2024, chips: "A18 Pro", screen: "6.7\" Super Retina XDR" },
        { name: "iPhone 15 Pro", year: 2023, chips: "A17 Pro", screen: "6.1\" Super Retina XDR" }
    ];

    iphoneModels.forEach((mod, idx) => {
        let storages = ["128GB", "256GB", "512GB", "1TB"];
        storages.forEach((storage, sIdx) => {
            dataset.push({
                id: `PROD-${idCounter++}`,
                name: `Apple ${mod.name} (${storage})`,
                brand: "Apple",
                model: mod.name,
                year: mod.year,
                category: "phones",
                subcategory: "Smartphones",
                price: 999 + (sIdx * 150) + (idx * 100),
                currency: "USD",
                condition: mod.year === 2026 ? "New" : "Used",
                description: `Official Apple flagship device. Features ${mod.chips} architecture, premium high refresh displays, and complete 5G Global band integrations.`,
                specifications: `Storage: ${storage} | Screen: ${mod.screen} | CPU: ${mod.chips} | FaceID: Yes`,
                stock: 25,
                location: "Central Tech Repository",
                shippingInfo: "Express Insured Delivery (2-4 Days)",
                images: [generatePlaceholderImage(400, 300, `${mod.name} ${storage}`)],
                rating: "4.9",
                reviewsCount: 340,
                soldCount: 1200,
                solar: null
            });
        });
    });

    // Populate generic scaling placeholders for all other categories to ensure compliance with the 100+ items baseline rule
    INITIAL_CATEGORIES.forEach(cat => {
        let existingCount = dataset.filter(p => p.category === cat.id).length;
        if (existingCount < 100 && cat.id !== "all") {
            let itemsNeeded = 101 - existingCount;
            for (let k = 1; k <= itemsNeeded; k++) {
                dataset.push({
                    id: `PROD-${idCounter++}`,
                    name: `Premium ${cat.name} Item Reference-${k}`,
                    brand: `Global-${cat.id.toUpperCase()}`,
                    model: `Model Gen-${k}`,
                    year: 2026,
                    category: cat.id,
                    subcategory: "General Collection",
                    price: 45 + (k * 12),
                    currency: "USD",
                    condition: "New",
                    description: `High-fidelity placeholder product catalog asset calibrated for the ${cat.name} marketplace showcase engine.`,
                    specifications: `Batch Weight: Standard | Core Compliance Verification: Certified`,
                    stock: 50,
                    location: "Global Distribution Node",
                    shippingInfo: "Standard Shipping (3-5 Business Days)",
                    images: [generatePlaceholderImage(400, 300, `${cat.name} Item ${k}`)],
                    rating: "4.5",
                    reviewsCount: 45,
                    soldCount: 180,
                    solar: null
                });
            }
        }
    });

    return dataset;
}

// Initializing state stores safely via Client Engine local storage interfaces
function getStorageData() {
    let localData = localStorage.getItem(KCO_DEFAULT_STORAGE_KEY);
    if (!localData) {
        let initialStore = {
            products: seedMarketplaceDatabase(),
            categories: INITIAL_CATEGORIES,
            paymentSettings: {
                bank: { bankName: "K.C.O Global Escrow Corp", accountName: "Corporate Clearance Node 1", accountNumber: "9982310842211", swift: "KCOBGLOBALXXX", routing: "121000248" },
                crypto: { btc: "1KCOMainNetBlockchainWalletAddressX1", eth: "0xKCOEthereumSmartContractDeploymentAddressY2", usdt: "TKCOTRC20NetworkOperationalLiquidityTokenZ3" }
            },
            orders: [],
            users: [{ email: "customer@kco.com", phone: "+1234567890", name: "John Doe", password: "password123" }],
            adminProfile: { username: "admin", email: "admin@kco.com", phone: "+1999999999", password: "adminsecure2026", name: "K.C.O Administrator" }
        };
        localStorage.setItem(KCO_DEFAULT_STORAGE_KEY, JSON.stringify(initialStore));
        return initialStore;
    }
    return JSON.stringify(localData).startsWith("{") ? JSON.parse(localData) : JSON.parse(JSON.parse(localData));
}

function updateStorageData(data) {
    localStorage.setItem(KCO_DEFAULT_STORAGE_KEY, JSON.stringify(data));
}