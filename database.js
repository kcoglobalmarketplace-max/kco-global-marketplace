Here is the corrected and fully cleaned version of your JavaScript database object.

### Fixes Applied:

1. **Hidden Character Removal:** Removed invisible/non-breaking space characters (common copy-paste artifacts from code editors) that could cause hidden syntax or parsing errors.
2. **URL / Typo Fixes:** Corrected a trailing typo in an Unsplash URL parameter (`&q=807` changed to `&q=80`) for `truck-003`.
3. **String Singularization Bug Fix in Loop:** In the `expandDatabase()` generator function, `cat.slice(1, -1)` fails or cuts off letters incorrectly if a category name has fewer than 2 characters or is pluralized weirdly (e.g., "jobs" becomes "jo"). Replaced it with a robust helper or safe fallback mapping so titles format cleanly like `Elite Car Edition 2024` instead of breaking.

```javascript
/**
 * K.C.O. Global Marketplace - Enterprise Database Engine
 * Contains comprehensive sample products organized by multi-industry categories.
 */

const KCO_DATABASE = {
  currencies: {
    USD: { symbol: "$", rate: 1.0, name: "USD ($)" },
    EUR: { symbol: "€", rate: 0.92, name: "EUR (€)" },
    GBP: { symbol: "£", rate: 0.79, name: "GBP (£)" },
    JPY: { symbol: "¥", rate: 155.0, name: "JPY (¥)" },
    NGN: { symbol: "₦", rate: 1450.0, name: "NGN (₦)" }
  },
  countries: [
    { code: "US", name: "United States", currency: "USD" },
    { code: "GB", name: "United Kingdom", currency: "GBP" },
    { code: "EU", name: "European Union", currency: "EUR" },
    { code: "JP", name: "Japan", currency: "JPY" },
    { code: "NG", name: "Nigeria", currency: "NGN" }
  ],
  languages: [
    { code: "en", name: "English (US)" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" }
  ],
  categories: [
    "cars", "trucks", "motorcycles", "bicycles", "real estate", 
    "electronics", "fashion", "furniture", "jobs", "rentals"
  ],
  products: [
    // --- CARS ---
    {
      id: "car-001",
      title: "2026 Bugatti Tourbillon V16 Hybrid",
      category: "cars",
      price: 4100000,
      location: "Molsheim, France",
      seller: "Bugatti Atelier Global",
      verified: true,
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
      description: "Naturally aspirated 8.3-liter V16 paired with three electric motors producing 1,775 hp."
    },
    {
      id: "car-002",
      title: "2025 Koenigsegg Jesko Absolut",
      category: "cars",
      price: 3400000,
      location: "Ängelholm, Sweden",
      seller: "Hypercar Direct",
      verified: true,
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
      description: "Ultimate high-speed low-drag configuration built for breaking absolute velocity boundaries."
    },
    {
      id: "car-003",
      title: "2026 Ferrari F80 Concept Supercar",
      category: "cars",
      price: 3900000,
      location: "Maranello, Italy",
      seller: "Scuderia Heritage",
      verified: true,
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80",
      description: "Formula 1 derived hybrid powertrain technology with active aero control systems."
    },
    {
      id: "car-004",
      title: "2025 Porsche 911 GT3 RS Weissach",
      category: "cars",
      price: 285000,
      location: "Stuttgart, Germany",
      seller: "Porsche Zentrum",
      verified: true,
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
      description: "Track-focused masterpiece featuring DRS aerodynamics and center-lock forged wheels."
    },
    {
      id: "car-005",
      title: "2024 Lamborghini Revuelto V12 Plug-in",
      category: "cars",
      price: 608000,
      location: "Sant'Agata Bolognese, Italy",
      seller: "Lamborghini Milan",
      verified: true,
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
      description: "First V12 high performance electrified vehicle combining raw combustion with triple electric motors."
    },
    {
      id: "car-006",
      title: "2025 Aston Martin Valour Manual V12",
      category: "cars",
      price: 1500000,
      location: "Gaydon, United Kingdom",
      seller: "Aston Martin London",
      verified: true,
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
      description: "Limited to 110 units globally featuring a twin-turbo V12 mated to a bespoke manual gearbox."
    },
    {
      id: "car-007",
      title: "2024 McLaren 750S Spider",
      category: "cars",
      price: 345000,
      location: "Woking, United Kingdom",
      seller: "McLaren Special Operations",
      verified: true,
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80",
      description: "Lighter, faster, and more visceral open-top supercar with carbon fiber monocoque chassis."
    },
    {
      id: "car-008",
      title: "2025 Mercedes-AMG One Formula Edition",
      category: "cars",
      price: 2750000,
      location: "Affalterbach, Germany",
      seller: "AMG Performance Center",
      verified: true,
      image: "https://images.unsplash.com/photo-1618843479313-7d5faf4b1a6d?auto=format&fit=crop&w=800&q=80",
      description: "Direct F1 powertrain adapted for road homologation with 1.6-liter turbocharged V6 hybrid system."
    },

    // --- TRUCKS ---
    {
      id: "truck-001",
      title: "2026 Tesla Cybertruck Cyberbeast Tri-Motor",
      category: "trucks",
      price: 119990,
      location: "Austin, Texas, USA",
      seller: "Tesla Motors Direct",
      verified: true,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      description: "Exoskeleton stainless steel design with steer-by-wire and 845 horsepower capability."
    },
    {
      id: "truck-002",
      title: "2025 Ford F-150 Raptor R SuperCrew",
      category: "trucks",
      price: 111550,
      location: "Dearborn, Michigan, USA",
      seller: "Ford Performance Fleet",
      verified: true,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      description: "Supercharged 5.2L V8 engine with Fox Live Valve shocks built for extreme desert running."
    },
    {
      id: "truck-003",
      title: "2025 Ram 1500 TRX Final Edition",
      category: "trucks",
      price: 119625,
      location: "Auburn Hills, Michigan, USA",
      seller: "Ram Truck Operations",
      verified: true,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      description: "Last of the supercharged 702 hp apex predators with bespoke interior trim and badges."
    },
    {
      id: "truck-004",
      title: "2025 Rivian R1T Max Pack Adventure",
      category: "trucks",
      price: 95000,
      location: "Normal, Illinois, USA",
      seller: "Rivian Automotive",
      verified: true,
      image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
      description: "Quad-motor electric adventure truck with air suspension and 400+ mile range battery pack."
    },
    {
      id: "truck-005",
      title: "2025 GMC Hummer EV Edition 1",
      category: "trucks",
      price: 104650,
      location: "Detroit, Michigan, USA",
      seller: "General Motors Global",
      verified: true,
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
      description: "CrabWalk diagonal steering capability with extreme off-road package and 1,000 horsepower."
    },
    {
      id: "truck-006",
      title: "2026 Freightliner eCascadia Long-Haul Semi",
      category: "trucks",
      price: 350000,
      location: "Portland, Oregon, USA",
      seller: "Daimler Truck North America",
      verified: true,
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
      description: "Zero-emission heavy-duty commercial freight hauler designed for fleet logistics operations."
    },

    // --- MOTORCYCLES ---
    {
      id: "moto-001",
      title: "2025 Ducati Panigale V4 R Superbike",
      category: "motorcycles",
      price: 45000,
      location: "Bologna, Italy",
      seller: "Ducati Corse Official",
      verified: true,
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      description: "WSBK homologation special delivering dry clutch acoustics and 240.5 hp with racing kit."
    },
    {
      id: "moto-002",
      title: "2025 BMW M 1000 RR Carbon Edition",
      category: "motorcycles",
      price: 38330,
      location: "Munich, Germany",
      seller: "BMW Motorrad Global",
      verified: true,
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
      description: "Full carbon fiber bodywork and winglets designed for maximum downforce on track days."
    },
    {
      id: "moto-003",
      title: "2025 Kawasaki Ninja H2R Track Hyperbike",
      category: "motorcycles",
      price: 58100,
      location: "Akashi, Japan",
      seller: "Kawasaki Heavy Industries",
      verified: true,
      image: "https://images.unsplash.com/photo-1599819811883-8a1649b04297?auto=format&fit=crop&w=800&q=80",
      description: "Supercharged 998cc engine producing 310 horsepower strictly reserved for closed-circuit racing."
    },
    {
      id: "moto-004",
      title: "2025 MV Agusta Rush 1000 Brutale",
      category: "motorcycles",
      price: 48900,
      location: "Varese, Italy",
      seller: "MV Agusta Factory",
      verified: true,
      image: "https://images.unsplash.com/photo-1525160138650-e4437119ff31?auto=format&fit=crop&w=800&q=80",
      description: "Exquisite streetfighter art piece featuring CNC machined components and titanium exhaust."
    },
    {
      id: "moto-005",
      title: "2025 Harley-Davidson CVO Road Glide",
      category: "motorcycles",
      price: 44399,
      location: "Milwaukee, Wisconsin, USA",
      seller: "Harley-Davidson Motor Co.",
      verified: true,
      image: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=800&q=80",
      description: "Milwaukee-Eight VVT 121 engine with custom paint and advanced Rockford Fosgate audio stage."
    },

    // --- BICYCLES ---
    {
      id: "bike-001",
      title: "2025 Specialized S-Works Epic World Cup",
      category: "bicycles",
      price: 14500,
      location: "Morgan Hill, California, USA",
      seller: "Specialized Concept Store",
      verified: true,
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
      description: "Custom integrated suspension and FACT 12m carbon frame built for elite cross-country racing."
    },
    {
      id: "bike-002",
      title: "2025 Trek Madone SLR 9 Gen 8",
      category: "bicycles",
      price: 13500,
      location: "Waterloo, Wisconsin, USA",
      seller: "Trek Bicycle Global",
      verified: true,
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
      description: "Lightweight aero road machine with IsoFlow technology and SRAM RED AXS wireless drivetrain."
    },
    {
      id: "bike-003",
      title: "2025 Pinarello Dogma F Dura-Ace Di2",
      category: "bicycles",
      price: 14800,
      location: "Treviso, Italy",
      seller: "Pinarello Flagship",
      verified: true,
      image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80",
      description: "Tour de France winning pedigree featuring asymmetric carbon layup and Princeton carbon wheels."
    },
    {
      id: "bike-004",
      title: "2025 Santa Cruz V10 CC XX1 Downhill",
      category: "bicycles",
      price: 10999,
      location: "Santa Cruz, California, USA",
      seller: "Santa Cruz Syndicate",
      verified: true,
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80",
      description: "World Championship winning downhill rig with Fox Factory suspension and carbon wheels."
    },

    // --- REAL ESTATE ---
    {
      id: "estate-001",
      title: "The Glass Pavilion Ultra-Luxury Villa",
      category: "real estate",
      price: 28500000,
      location: "Monaco, Monte Carlo",
      seller: "Riviera Prime Estates",
      verified: true,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      description: "Architectural masterpiece overlooking the Mediterranean Sea with infinity pool and helipad."
    },
    {
      id: "estate-002",
      title: "Penthouse Suite at One Hyde Park",
      category: "real estate",
      price: 45000000,
      location: "London, United Kingdom",
      seller: "Knight Frank Luxury",
      verified: true,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      description: "Exclusive Knightsbridge residence with 24-hour Mandarin Oriental concierge and private spa."
    },
    {
      id: "estate-003",
      title: "Beverly Hills Modern Architectural Estate",
      category: "real estate",
      price: 32000000,
      location: "Los Angeles, California, USA",
      seller: "Sotheby's International Realty",
      verified: true,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "Gated compound featuring 12,000 sq ft of living space, wine cellar, and panoramic canyon views."
    },
    {
      id: "estate-004",
      title: "Alpine Sanctuary Luxury Chalet",
      category: "real estate",
      price: 19500000,
      location: "Zermatt, Switzerland",
      seller: "Alpine Property Group",
      verified: true,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      description: "Ski-in, ski-out luxury chalet with direct views of the Matterhorn and indoor wellness center."
    },

    // --- ELECTRONICS ---
    {
      id: "elec-001",
      title: "Apple Vision Pro Max Ultra 1TB",
      category: "electronics",
      price: 3899,
      location: "Cupertino, California, USA",
      seller: "Apple Flagship Store",
      verified: true,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
      description: "Spatial computing headset with micro-OLED displays and advanced dual-chip M3 architecture."
    },
    {
      id: "elec-002",
      title: "Sony Master Series 98\" 8K HDR OLED TV",
      category: "electronics",
      price: 19999,
      location: "Tokyo, Japan",
      seller: "Sony Direct",
      verified: true,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
      description: "Cinematic home theater display with cognitive processor XR and acoustic multi-audio."
    },
    {
      id: "elec-003",
      title: "Leica M11 Monochrom Rangefinder Camera",
      category: "electronics",
      price: 9195,
      location: "Wetzlar, Germany",
      seller: "Leica Camera AG",
      verified: true,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      description: "Bespoke 60-megapixel black-and-white sensor camera crafted with solid magnesium and aluminum."
    },
    {
      id: "elec-004",
      title: "Bang & Olufsen Beolab 90 Studio Monitors",
      category: "electronics",
      price: 115000,
      location: "Struer, Denmark",
      seller: "B&O Acoustic Labs",
      verified: true,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      description: "State-of-the-art flagship loudspeakers with active room compensation and 8,200W output per speaker."
    },

    // --- FASHION ---
    {
      id: "fash-001",
      title: "Rolex Cosmograph Daytona Platinum",
      category: "fashion",
      price: 78500,
      location: "Geneva, Switzerland",
      seller: "Rolex Official Retailer",
      verified: true,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      description: "Ice blue dial with chestnut brown Cerachrom bezel and diamond hour markers in 950 platinum."
    },
    {
      id: "fash-002",
      title: "Patek Philippe Grand Complications Perpetual",
      category: "fashion",
      price: 145000,
      location: "Geneva, Switzerland",
      seller: "Geneva Timepieces",
      verified: true,
      image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80",
      description: "18k rose gold chronograph featuring retrograde date display and moon phase complication."
    },
    {
      id: "fash-003",
      title: "Hermès Birkin 30 Matte Himalaya Niloticus",
      category: "fashion",
      price: 210000,
      location: "Paris, France",
      seller: "Haute Couture Vault",
      verified: true,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      description: "The crown jewel of handbag collecting featuring white gold hardware encrusted with diamonds."
    },

    // --- FURNITURE ---
    {
      id: "furn-001",
      title: "Herman Miller Eames Lounge Chair & Ottoman",
      category: "furniture",
      price: 7995,
      location: "Zeeland, Michigan, USA",
      seller: "Design Within Reach",
      verified: true,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
      description: "Classic mid-century modern icon in Santos Palisander veneer and black MCL leather."
    },
    {
      id: "furn-002",
      title: "Minotti Connery Modular Sectional Sofa",
      category: "furniture",
      price: 24500,
      location: "Milan, Italy",
      seller: "Minotti Flagship",
      verified: true,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      description: "Sophisticated Italian luxury seating system upholstered in premium nubuck leather."
    },
    {
      id: "furn-003",
      title: "B&B Italia Camaleonda Lounge System",
      category: "furniture",
      price: 16800,
      location: "Novedrate, Italy",
      seller: "Mario Bellini Archive",
      verified: true,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      description: "Reinvented 1970s modular sofa masterpiece offering infinite configuration possibilities."
    },

    // --- JOBS ---
    {
      id: "job-001",
      title: "Chief Technology Officer - Autonomous AI",
      category: "jobs",
      price: 450000,
      location: "San Francisco, California, USA",
      seller: "K.C.O. Executive Search",
      verified: true,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      description: "Lead R&D teams building next-generation machine learning algorithms and edge processors."
    },
    {
      id: "job-002",
      title: "Global Head of Luxury Brand Strategy",
      category: "jobs",
      price: 320000,
      location: "Paris, France",
      seller: "Vogue Executive Partners",
      verified: true,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      description: "Spearhead global marketing campaigns and high-net-worth client engagement programs."
    },
    {
      id: "job-003",
      title: "Lead Propulsion Engineer - Aerospace",
      category: "jobs",
      price: 280000,
      location: "Boca Chica, Texas, USA",
      seller: "Orbital Systems Corp",
      verified: true,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      description: "Design and test advanced rocket engines for interplanetary commercial transport."
    },

    // --- RENTALS ---
    {
      id: "rent-001",
      title: "Mega Yacht Charter - 65M Benetti",
      category: "rentals",
      price: 450000,
      location: "Porto Cervo, Sardinia",
      seller: "Burgess Yachts",
      verified: true,
      image: "https://images.unsplash.com/photo-1569263979104-865ab9cd8d5c?auto=format&fit=crop&w=800&q=80",
      description: "Weekly charter rate includes 18 crew members, beach club, jacuzzi, and water toy garage."
    },
    {
      id: "rent-002",
      title: "Private Jet Charter - Gulfstream G700",
      category: "rentals",
      price: 15000,
      location: "Geneva / Dubai / New York",
      seller: "NetJets Global",
      verified: true,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
      description: "Hourly dry-lease rate for ultra-long-range executive jet featuring master suite and shower."
    },
    {
      id: "rent-003",
      title: "Ski Chalet Weekly Rental - Courchevel 1850",
      category: "rentals",
      price: 95000,
      location: "Courchevel, France",
      seller: "Alpine Luxe Stays",
      verified: true,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      description: "Weekly rental during peak winter season with private chef, butler, and chauffeur service."
    }
  ]
};

// Generate additional sample items programmatically to ensure hundreds of entries across categories
(function expandDatabase() {
  const baseProducts = [...KCO_DATABASE.products];
  const modifiers = ["Elite", "Pro", "Custom", "Signature", "Prime", "Limited", "Ultra", "Bespoke"];
  
  KCO_DATABASE.categories.forEach(cat => {
    for (let i = 1; i <= 15; i++) {
      const template = baseProducts.find(p => p.category === cat) || baseProducts[0];
      const modifier = modifiers[i % modifiers.length];
      const singularCat = cat.endsWith('s') ? cat.slice(0, -1) : cat;
      
      KCO_DATABASE.products.push({
        id: `${cat}-gen-${i}`,
        title: `${modifier} ${singularCat.charAt(0).toUpperCase() + singularCat.slice(1)} Edition ${2020 + (i % 7)}`,
        category: cat,
        price: Math.round(template.price * (0.6 + (i * 0.05))),
        location: template.location,
        seller: template.seller,
        verified: true,
        image: template.image,
        description: `Certified high-performance global specification item with verified condition reports and warranty.`
      });
    }
  });
})();

```
