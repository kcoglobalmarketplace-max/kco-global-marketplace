/**
 * K.C.O. Global Marketplace - Core Database Engine (IndexedDB)
 * Location: database/mock-db-core.js
 * Handles real asynchronous scaling and initializes high-fidelity sample datasets for all major categories.
 */

const KCODatabase = (() => {
    const DB_NAME = 'KCO_Global_Marketplace_DB';
    const DB_VERSION = 1;
    let dbInstance = null;

    const init = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                
                if (!db.objectStoreNames.contains('galleries')) {
                    db.createObjectStore('galleries', { keyPath: 'id' });
                }
                
                if (!db.objectStoreNames.contains('products')) {
                    const productStore = db.createObjectStore('products', { keyPath: 'id' });
                    productStore.createIndex('galleryId', 'galleryId', { unique: false });
                    productStore.createIndex('category', 'category', { unique: false });
                }

                if (!db.objectStoreNames.contains('cart')) db.createObjectStore('cart', { keyPath: 'id' });
                if (!db.objectStoreNames.contains('wishlist')) db.createObjectStore('wishlist', { keyPath: 'id' });
            };

            request.onsuccess = async (e) => {
                dbInstance = e.target.result;
                await seedDatabaseIfNeeded();
                resolve(dbInstance);
            };

            request.onerror = (e) => reject(e.target.error);
        });
    };

    const seedDatabaseIfNeeded = async () => {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction(['galleries', 'products'], 'readwrite');
            const galleryStore = tx.objectStore('galleries');
            const productStore = tx.objectStore('products');

            const countRequest = galleryStore.count();
            countRequest.onsuccess = () => {
                if (countRequest.result > 0) {
                    resolve(); 
                    return;
                }

                // 1. DENSE INFRASTRUCTURE GALLERIES SEEDING
                const mockGalleries = [
                    // North Luxury Wing (Transportation & High Tech)
                    { id: "G-000001", name: "Grand Entrance Luxury Core", wing: "North Luxury Wing", purpose: "Premium Automobiles & Supercars", category: "cars", capacity: 250 },
                    { id: "G-000002", name: "Superbike & High-Velocity Pavilions", wing: "North Luxury Wing", purpose: "Racing Motorcycles & Touring Bikes", category: "motorcycles", capacity: 180 },
                    { id: "G-000003", name: "Logistics Transporter Terminals", wing: "North Luxury Wing", purpose: "Commercial Freight & Heavy Transport Trucks", category: "trucks", capacity: 300 },
                    { id: "G-000004", name: "Silicon Architecture Terraces", wing: "North Luxury Wing", purpose: "Next-Gen Mobile Hardware & Smartphones", category: "phones", capacity: 500 },
                    { id: "G-000005", name: "Quantum Computing Hubs", wing: "North Luxury Wing", purpose: "Enterprise Servers & Personal Workstations", category: "computers", capacity: 420 },

                    // East Pavilion (Industrial & Engineering Volumetrics)
                    { id: "G-250001", name: "Titan Industrial Mezzanine", wing: "East Pavilion", purpose: "Heavy-Duty Machinery & Propulsion Units", category: "industrial", capacity: 800 },
                    { id: "G-250002", name: "Agrarian Automation Complexes", wing: "East Pavilion", purpose: "High-Yield Tractors & Farm Harvesters", category: "agriculture", capacity: 600 },
                    { id: "G-250003", name: "Deepwater Maritime Vaults", wing: "East Pavilion", purpose: "Luxury Yachts, Speedboats, and Cargo Vessels", category: "boats", capacity: 150 },
                    { id: "G-250004", name: "Clinical Infrastructure Labs", wing: "East Pavilion", purpose: "High-Precision Medical & Diagnostic Equipment", category: "medical", capacity: 340 },

                    // South Exhibition Complex (Real Estate & Structural Habitats)
                    { id: "G-500001", name: "Metropolitan Horizon Estates", wing: "South Exhibition Complex", purpose: "Smart Architectural High-Rises & Modular Houses", category: "houses", capacity: 1200 },
                    { id: "G-500002", name: "Premium Residential Quadrants", wing: "South Exhibition Complex", purpose: "Luxury Penthouse Condominiums & Apartments", category: "apartments", capacity: 950 },
                    { id: "G-500003", name: "Territorial Expansion Frameworks", wing: "South Exhibition Complex", purpose: "Commercial Development & Agricultural Land Lots", category: "land", capacity: 2000 },
                    { id: "G-500004", name: "Haute Couture Galleries", wing: "South Exhibition Complex", purpose: "Designer Attire, Luxury Watches & High Jewelry", category: "fashion", capacity: 1500 },

                    // West Marketplace (Global Commodities, Office, Lifestyle Assets)
                    { id: "G-750001", name: "Atrium Living Modules", wing: "West Marketplace", purpose: "Minimalist & Smart Automated Office/Home Furniture", category: "furniture", capacity: 1100 },
                    { id: "G-750002", name: "Global Nutrition & Supply Pods", wing: "West Marketplace", purpose: "Fine Groceries & Organic Culinary Provisions", category: "groceries", capacity: 5000 },
                    { id: "G-750003", name: "Academic & Archive Atriums", wing: "West Marketplace", purpose: "Technical Publications, Textbooks & Rare Books", category: "books", capacity: 8500 },
                    { id: "G-750004", name: "Derma-Synthetics & Aesthetics Plazas", wing: "West Marketplace", purpose: "Advanced Skincare & Global Beauty Products", category: "beauty", capacity: 3200 }
                ];

                // 2. REAL HIGH-FIDELITY PRODUCT CROSS-SECTION
                const mockProducts = [
                    {
                        id: "P-000001", galleryId: "G-000001", category: "cars",
                        name: "Mercedes-Benz AMG GT 63 S", price: 189500, rating: 5,
                        images: ["uploads/products/cars/amg_main.jpg", "uploads/products/cars/amg_side.jpg", "uploads/products/cars/amg_interior.jpg"],
                        specs: { brand: "Mercedes-Benz", model: "AMG GT 63 S", year: 2026, engine: "4.0L V8 Biturbo", horsepower: "630 hp", weight: "2,120 kg", fuelType: "Premium Gasoline", sku: "KCO-CAR-AMG63" },
                        description: "High-performance luxury four-door coupe combining extreme track capabilities with premium executive interior finishes, built for international performance enthusiasts.",
                        stock: 4, seller: "Stuttgart Premium Matrix Ltd", reviews: [], qna: []
                    },
                    {
                        id: "P-000002", galleryId: "G-250001", category: "industrial",
                        name: "Heavy Duty V12 Marine Diesel Engine", price: 84300, rating: 5,
                        images: ["uploads/products/industrial/v12_main.jpg", "uploads/products/industrial/v12_schematic.jpg"],
                        specs: { brand: "Caterpillar", model: "CAT-C32-V12", year: 2025, displacement: "32.1 Liters", horsepower: "1450 hp", weight: "4,850 kg", fuelType: "Marine Diesel", sku: "KCO-ENG-V12M" },
                        description: "High-torque maritime propulsion power core tailored for custom oceanic yachts, regional commercial cargo vessels, and deep-sea exploration support rigs.",
                        stock: 12, seller: "Global Marine Engineering Corp", reviews: [], qna: []
                    },
                    {
                        id: "P-000003", galleryId: "G-000004", category: "phones",
                        name: "Titanium Pro Quantum Ultra Phone", price: 1499, rating: 5,
                        images: ["uploads/products/phones/q_ultra_front.jpg", "uploads/products/phones/q_ultra_back.jpg"],
                        specs: { brand: "KCO Tech", model: "Quantum Ultra 1", year: 2026, storage: "1TB UFS 5.0", ram: "24GB Quantum RAM", camera: "200MP Triple-Lens Matrix", connectivity: "6G / Satellite Direct", sku: "KCO-PHN-QULTRA" },
                        description: "Next-generation cellular terminal crafted from aerospace-grade titanium, featuring a built-in cryptographic hardware vault and continuous global satellite data links.",
                        stock: 150, seller: "Silicon Valley Hardware Syndicate", reviews: [], qna: []
                    },
                    {
                        id: "P-000004", galleryId: "G-500001", category: "houses",
                        name: "Hyperion Smart Modular Villa", price: 625000, rating: 5,
                        images: ["uploads/products/houses/v_modular_exterior.jpg", "uploads/products/houses/v_modular_plan.jpg"],
                        specs: { brand: "Elysium Structures", model: "Hyperion-V4", year: 2026, area: "350 sqm", structuralMaterial: "Graphene-Reinforced Composite", energy: "Self-Sustaining Solar Glass", rooms: "4 Bed, 4.5 Bath", sku: "KCO-RE-HYP4" },
                        description: "Fully automated luxury modular residential estate. Delivered globally via heavy shipping containers and assembled on-site inside 72 hours. Features off-grid life-support loops.",
                        stock: 3, seller: "Elysium Modular Habitats Global", reviews: [], qna: []
                    },
                    {
                        id: "P-000005", galleryId: "G-250002", category: "agriculture",
                        name: "Autonomous Row-Crop Harvester", price: 340000, rating: 5,
                        images: ["uploads/products/agriculture/harvester_main.jpg"],
                        specs: { brand: "Deere-Matrix", model: "X9-AM-800", year: 2025, propulsion: "Hybrid Electric-Diesel", automation: "Level 5 Full Autonomous GPS-Guided", capacity: "45 Metric Tons/Hr", width: "12 Meter Cutter Bar", sku: "KCO-AGR-X9AM" },
                        description: "Industrial self-driving harvester equipped with multispectral LiDAR terrain tracking algorithms, maximizing operational yield with zero pilot oversight.",
                        stock: 8, seller: "Continental Agritech Hubs", reviews: [], qna: []
                    },
                    {
                        id: "P-000006", galleryId: "G-500004", category: "fashion",
                        name: "Chronograph Perpetual Calendar Gold Watch", price: 42000, rating: 5,
                        images: ["uploads/products/fashion/watch_gold_main.jpg"],
                        specs: { brand: "Geneva Mechanicals", model: "Perpetual-18K", year: 2026, movement: "Automatic Self-Winding Tourbillon", casing: "18-Karat Rose Gold", waterResistance: "50 Meters", powerReserve: "72 Hours", sku: "KCO-WAT-GEN18K" },
                        description: "Masterwork luxury mechanical timepiece displaying date, day, month, and moon phase positions flawlessly across leap years without manual reconfiguration adjustments.",
                        stock: 5, seller: "Imperial Luxury Assets Group", reviews: [], qna: []
                    }
                ];

                mockGalleries.forEach(g => galleryStore.put(g));
                mockProducts.forEach(p => productStore.put(p));
                
                tx.oncomplete = () => resolve();
            };
        });
    };

    return { init, getStore };
})();

document.addEventListener('DOMContentLoaded', () => {
    KCODatabase.init().catch(err => console.error("Database initialization failed:", err));
});