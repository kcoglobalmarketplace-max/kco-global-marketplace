// ============================================================================
// K.C.O. Global Marketplace - Premium Product Page Engine (product.js)
// Admin-Managed Catalog System // Version 5.0.0 (Definitive Gold Master)
// ============================================================================

// Global Configuration Overrides & API Routing Defaults
const CONFIG = {
  CATALOG_API_ENDPOINT: "data/catalog.json", // Decoupled asynchronous repository architecture
  FALLBACK_IMAGE_PATH: "assets/products/fallback-placeholder.webp",
  DEFAULT_COUNTRY: "United States",
  TOAST_DURATION: 4000
};

// Global Memory State Variables
window.exchangeRates = window.exchangeRates || { "USD": 1.0, "GBP": 0.78, "EUR": 0.92, "AED": 3.67 };

let activeProduct = null;
let activeImageIndex = 0;
let isThreeSixtyMode = false;
let currentThreeSixtyIndex = 0;

let localCart = JSON.parse(localStorage.getItem('kco_cart')) || [];
let localWishlist = JSON.parse(localStorage.getItem('kco_wishlist')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('kco_recent')) || [];

let activeCurrency = "USD";
let activeSymbol = "$";
let touchStartX = 0;
let touchEndX = 0;

window.addEventListener('DOMContentLoaded', async () => {
  configureLocalizationContext();
  await initializeProductPipeline();
  setupGlobalKeyboardListeners();
  setupTouchGestures();
  synchronizeWishlistLayoutState();
  if(typeof lucide !== 'undefined') lucide.createIcons();
});

function configureLocalizationContext() {
  const savedCountry = localStorage.getItem('kco_country') || CONFIG.DEFAULT_COUNTRY;
  const marketMap = { 
    "United States": { cur: "USD", sym: "$" }, 
    "United Kingdom": { cur: "GBP", sym: "£" },
    "Germany": { cur: "EUR", sym: "€" },
    "UAE": { cur: "AED", sym: "د.إ" } 
  };
  const config = marketMap[savedCountry] || { cur: "USD", sym: "$" };
  activeCurrency = config.cur;
  activeSymbol = config.sym;
}

async function initializeProductPipeline() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = parseInt(urlParams.get('id')) || 1;
  
  try {
    // Performance Optimization: Fetch item data asynchronously to remove large static memory footprints
    const response = await fetch(`${CONFIG.CATALOG_API_ENDPOINT}?id=${targetId}`);
    if (!response.ok) throw new Error("Network repository returned an invalid state response.");
    const catalogData = await response.json();
    activeProduct = catalogData[targetId];
  } catch (error) {
    console.warn("API Engine Initialization Failed. Falling back to local local mock simulation context memory matrix.", error);
    activeProduct = getLocalFallbackCatalog()[targetId] || getLocalFallbackCatalog()[1];
  }

  if (activeProduct) {
    updateRecentlyViewedTracker();
    renderProductSheetWorkspace();
    injectSEOStructuredData();
  }
}

function updateRecentlyViewedTracker() {
  recentlyViewed = recentlyViewed.filter(id => id !== activeProduct.id);
  recentlyViewed.unshift(activeProduct.id);
  if (recentlyViewed.length > 6) recentlyViewed.pop();
  localStorage.setItem('kco_recent', JSON.stringify(recentlyViewed));
}

function renderProductSheetWorkspace() {
  // Breadcrumb Component Logic Path Assignment
  const breadcrumbNode = document.getElementById('product-breadcrumbs');
  if(breadcrumbNode) {
    breadcrumbNode.innerHTML = `
      <a href="index.html" class="hover:text-orange-500 transition">Home</a> &gt; 
      <a href="catalog.html?cat=${encodeURIComponent(activeProduct.category)}" class="hover:text-orange-500 transition">${activeProduct.category}</a> &gt; 
      <a href="catalog.html?sub=${encodeURIComponent(activeProduct.subCategory)}" class="hover:text-orange-500 transition">${activeProduct.subCategory}</a> &gt; 
      <span class="text-gray-200 truncate max-w-[200px] inline-block align-bottom" aria-current="page">${activeProduct.name}</span>`;
  }

  // Stock Lifecycle Allocation Engine Nodes Mapping
  const stockBadge = document.getElementById('field-stock-status');
  if(stockBadge) {
    if (activeProduct.stockCount <= 0) {
      stockBadge.className = "px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-950/60 border border-red-800 text-red-400";
      stockBadge.innerText = "SOLD OUT";
    } else if (activeProduct.stockCount <= 3) {
      stockBadge.className = "px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-950/60 border border-amber-800 text-amber-400";
      stockBadge.innerText = `LOW STOCK // ONLY ${activeProduct.stockCount} UNITS REMAINING`;
    } else {
      stockBadge.className = "px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-950/60 border border-emerald-800 text-emerald-400";
      stockBadge.innerText = "IN STOCK // ASSET AVAILABLE";
    }
  }

  // Visual Product Badging Elements Assignment
  const luxuryBadge = document.getElementById('field-asset-badge');
  if(luxuryBadge) {
    if(activeProduct.badge) {
      luxuryBadge.innerText = activeProduct.badge.toUpperCase();
      luxuryBadge.classList.remove('hidden');
    } else {
      luxuryBadge.classList.add('hidden');
    }
  }

  // General Text Node Population Elements
  document.getElementById('field-title').innerText = activeProduct.name;
  document.getElementById('field-sku').innerText = activeProduct.sku;
  document.getElementById('field-id').innerText = `KCO-ID-${activeProduct.id.toString().padStart(4, '0')}`;
  document.getElementById('field-desc').innerText = activeProduct.desc;
  document.getElementById('field-warranty').innerText = activeProduct.warranty;
  document.getElementById('field-shipping').innerText = activeProduct.shipping;

  // Intl Currency Standardized Presentation Formatting
  const rate = window.exchangeRates[activeCurrency] || 1.0;
  const convertedVal = Math.round(activeProduct.priceUSD * rate);
  
  document.getElementById('field-price').innerText = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: activeCurrency,
    maximumFractionDigits: 0
  }).format(convertedVal);

  // Video Streaming Interface Controls
  const videoElement = document.getElementById('product-video-player');
  if(videoElement) {
    if(activeProduct.videoUrl) {
      videoElement.src = activeProduct.videoUrl;
      videoElement.onerror = () => videoElement.parentElement.classList.add('hidden');
    } else {
      videoElement.parentElement.classList.add('hidden');
    }
  }

  assignGalleryViewportIndex(0);
  buildLazyThumbnailMatrixStrip();
  buildTechnicalSpecsMatrix();
  renderDynamicRecommendationGrids();
}

function buildLazyThumbnailMatrixStrip() {
  const strip = document.getElementById('thumbnail-strip-line');
  if(!strip) return;
  strip.innerHTML = '';

  activeProduct.gallery.forEach((imgUrl, i) => {
    const btn = document.createElement('button');
    btn.className = `w-16 h-16 bg-gray-950 border rounded-lg overflow-hidden shrink-0 transition-all duration-300 relative group ${i === 0 ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-900 opacity-60 hover:opacity-100'}`;
    btn.setAttribute('aria-label', `View Product Image Angle ${i + 1}`);
    
    btn.innerHTML = `
      <div class="absolute inset-0 bg-gray-900 animate-pulse skeleton-shimmer z-0"></div>
      <img data-src="${imgUrl}" class="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-300" 
           onerror="this.src='${CONFIG.FALLBACK_IMAGE_PATH}'; this.previousElementSibling?.remove();" 
           onload="this.classList.remove('opacity-0'); this.previousElementSibling?.remove();">`;
    
    btn.onclick = () => { isThreeSixtyMode = false; assignGalleryViewportIndex(i); };
    strip.appendChild(btn);
  });

  if(activeProduct.threeSixtyFrames && activeProduct.threeSixtyFrames.length > 0) {
    const t360Btn = document.createElement('button');
    t360Btn.className = "w-16 h-16 bg-gray-900 border border-dashed border-orange-500/50 rounded-lg shrink-0 flex flex-col items-center justify-center text-[10px] text-orange-400 font-mono font-bold uppercase hover:bg-gray-800 transition";
    t360Btn.setAttribute('aria-label', "Activate 360 Vector Frame Rotational View Controls");
    t360Btn.onclick = () => toggleThreeSixtyViewer();
    t360Btn.innerHTML = `<span>360°</span><span class="text-[8px] text-gray-500">Matrix</span>`;
    strip.appendChild(t360Btn);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const img = entry.target.querySelector('img');
        if(img && img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(entry.target);
      }
    });
  }, { root: strip, rootMargin: '0px 100px 0px 100px' });

  Array.from(strip.children).forEach(child => observer.observe(child));
}

function assignGalleryViewportIndex(idx) {
  if (isThreeSixtyMode) return;
  activeImageIndex = idx;
  const viewport = document.getElementById('primary-gallery-viewport');
  if(!viewport) return;

  animateProgressBarSimulation(true);
  viewport.style.opacity = '0.3';
  
  const targetImgUrl = activeProduct.gallery[idx];
  const processImage = new Image();
  processImage.src = targetImgUrl;
  
  processImage.onload = () => {
    viewport.src = targetImgUrl;
    viewport.style.opacity = '1';
    animateProgressBarSimulation(false);
    updateThumbnailSelectionState(idx);
    preloadNextSegmentAsset(idx);
  };
  
  processImage.onerror = () => {
    viewport.src = CONFIG.FALLBACK_IMAGE_PATH;
    viewport.style.opacity = '1';
    animateProgressBarSimulation(false);
  };
}

function animateProgressBarSimulation(start) {
  const bar = document.getElementById('image-loading-progress');
  if(!bar) return;
  
  if(start) {
    bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.2s ease';
    bar.classList.remove('opacity-0');
    bar.style.width = '85%';
  } else {
    bar.style.transition = 'width 0.3s ease, opacity 0.3s 0.2s ease';
    bar.style.width = '100%';
    setTimeout(() => {
      bar.classList.add('opacity-0');
      setTimeout(() => { bar.style.width = '0%'; }, 300);
    }, 200);
  }
}

function toggleThreeSixtyViewer() {
  if(!activeProduct.threeSixtyFrames || activeProduct.threeSixtyFrames.length === 0) {
    showSystemToast("No 360 rotational frame profile assets loaded for this entry item.");
    return;
  }
  isThreeSixtyMode = true;
  currentThreeSixtyIndex = 0;
  
  const viewport = document.getElementById('primary-gallery-viewport');
  if(viewport) {
    viewport.src = activeProduct.threeSixtyFrames[0];
    viewport.style.opacity = '1';
  }
  showSystemToast("360° Spatial Mode Active. Use gallery arrows or keyboard lines to navigate.");
}

function preloadNextSegmentAsset(currentIndex) {
  const nextIdx = (currentIndex + 1) % activeProduct.gallery.length;
  const img = new Image();
  img.src = activeProduct.gallery[nextIdx];
}

function stepGalleryView(direction) {
  if(isThreeSixtyMode) {
    currentThreeSixtyIndex = (currentThreeSixtyIndex + direction + activeProduct.threeSixtyFrames.length) % activeProduct.threeSixtyFrames.length;
    document.getElementById('primary-gallery-viewport').src = activeProduct.threeSixtyFrames[currentThreeSixtyIndex];
    return;
  }
  let nextIdx = (activeImageIndex + direction + activeProduct.gallery.length) % activeProduct.gallery.length;
  assignGalleryViewportIndex(nextIdx);
}

function updateThumbnailSelectionState(idx) {
  const strip = document.getElementById('thumbnail-strip-line');
  if(!strip) return;
  Array.from(strip.children).forEach((btn, i) => {
    if (i === idx && !isThreeSixtyMode) {
      btn.className = "w-16 h-16 bg-gray-950 border border-orange-500 ring-1 ring-orange-500 rounded-lg overflow-hidden shrink-0 transition-all duration-300 relative";
    } else if (i < activeProduct.gallery.length) {
      btn.className = "w-16 h-16 bg-gray-950 border border-gray-900 opacity-60 hover:opacity-100 rounded-lg overflow-hidden shrink-0 transition-all duration-300 relative";
    }
  });
}

function executeImageZoom(e) {
  if (isThreeSixtyMode) return;
  const img = document.getElementById('primary-gallery-viewport');
  if(!img) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = "scale(2.2)";
}

function clearImageZoom() {
  const img = document.getElementById('primary-gallery-viewport');
  if(img) img.style.transform = "scale(1)";
}

function setupGlobalKeyboardListeners() {
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('fullscreen-gallery-overlay');
    const isModalVisible = modal && !modal.classList.contains('hidden');

    if (e.key === 'Escape' && isModalVisible) {
      dismissFullscreenViewer();
    } else if (e.key === 'ArrowRight') {
      stepGalleryView(1);
      if(isModalVisible) synchronizeFullscreenViewport();
    } else if (e.key === 'ArrowLeft') {
      stepGalleryView(-1);
      if(isModalVisible) synchronizeFullscreenViewport();
    }
  });
}

function setupTouchGestures() {
  const zone = document.getElementById('gallery-interaction-zone');
  if(!zone) return;

  zone.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
  zone.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 60;
    if (touchStartX - touchEndX > threshold) stepGalleryView(1);
    if (touchEndX - touchStartX > threshold) stepGalleryView(-1);
    if (document.getElementById('fullscreen-gallery-overlay') && !document.getElementById('fullscreen-gallery-overlay').classList.contains('hidden')) {
      synchronizeFullscreenViewport();
    }
  }, {passive: true});
}

function triggerFullscreenViewer() {
  const overlay = document.getElementById('fullscreen-gallery-overlay');
  if(!overlay) return;
  synchronizeFullscreenViewport();
  overlay.classList.remove('hidden');
}

function synchronizeFullscreenViewport() {
  const overlayImg = document.getElementById('fullscreen-canvas-image');
  if(overlayImg) {
    overlayImg.src = isThreeSixtyMode ? activeProduct.threeSixtyFrames[currentThreeSixtyIndex] : activeProduct.gallery[activeImageIndex];
  }
}

function dismissFullscreenViewer() {
  document.getElementById('fullscreen-gallery-overlay').classList.add('hidden');
}

// Transaction Pipeline / Idempotency Architecture
function commitCartAddition() {
  const exists = localCart.find(item => item.id === activeProduct.id);
  if (!exists) {
    localCart.push({ id: activeProduct.id, name: activeProduct.name, priceUSD: activeProduct.priceUSD, sku: activeProduct.sku });
    localStorage.setItem('kco_cart', JSON.stringify(localCart));
    showSystemToast("Asset configuration allocated to storage registration cart instance.");
  } else {
    showSystemToast("Item registration entry is already tracking inside checkout layout memory.");
  }
}

function executeDirectBuyNowPipeline() {
  const exists = localCart.find(item => item.id === activeProduct.id);
  if (!exists) {
    localCart.push({ id: activeProduct.id, name: activeProduct.name, priceUSD: activeProduct.priceUSD, sku: activeProduct.sku });
    localStorage.setItem('kco_cart', JSON.stringify(localCart));
  }
  window.location.href = window.location.pathname.includes('/public/') ? "checkout.html" : "/checkout.html";
}

function commitWishlistToggle() {
  const index = localWishlist.indexOf(activeProduct.id);
  if(index === -1) {
    localWishlist.push(activeProduct.id);
    showSystemToast("Asset saved to account profile blueprint parameters repository.");
  } else {
    localWishlist.splice(index, 1);
    showSystemToast("Asset profile unlinked from account logs system.");
  }
  localStorage.setItem('kco_wishlist', JSON.stringify(localWishlist));
  synchronizeWishlistLayoutState();
}

function synchronizeWishlistLayoutState() {
  const btn = document.getElementById('wishlist-action-btn');
  if(!btn) return;
  const isIncluded = localWishlist.includes(activeProduct.id);
  const textSpan = btn.querySelector('span');
  if(textSpan) textSpan.innerText = isIncluded ? "In Wishlist Tracking" : "Save To Wishlist";
}

function executeShareProductPipeline() {
  if (navigator.share) {
    navigator.share({ title: activeProduct.name, text: activeProduct.desc, url: window.location.href })
      .catch(() => showSystemToast("System outbound transmission vector aborted."));
  } else {
    navigator.clipboard.writeText(window.location.href);
    showSystemToast("Direct catalog URL route recorded to clip transfer registry.");
  }
}

function buildTechnicalSpecsMatrix() {
  const specMatrix = document.getElementById('technical-spec-matrix');
  if(!specMatrix) return;
  specMatrix.innerHTML = '';
  Object.entries(activeProduct.specs).forEach(([key, val]) => {
    specMatrix.innerHTML += `
      <div class="bg-gray-950 p-4 border border-gray-900 rounded-xl flex justify-between items-center">
        <span class="text-xs font-mono text-gray-500 uppercase tracking-wider">${key}</span>
        <span class="text-xs font-bold text-gray-100">${val}</span>
      </div>`;
  });
}

function renderDynamicRecommendationGrids() {
  const recentGrid = document.getElementById('grid-recently-viewed');
  if(!recentGrid) return;
  recentGrid.innerHTML = '';
  
  const displayPool = recentlyViewed.filter(id => id !== activeProduct.id).slice(0, 4);
  if(displayPool.length === 0) {
    recentGrid.parentElement.classList.add('hidden');
    return;
  }
  
  recentGrid.parentElement.classList.remove('hidden');
  displayPool.forEach(id => {
    const fallbackCatalog = getLocalFallbackCatalog();
    const item = fallbackCatalog[id];
    if(!item) return;
    recentGrid.innerHTML += `
      <div class="bg-gray-950 border border-gray-900 rounded-xl p-3 flex flex-col justify-between hover:border-orange-500/40 transition cursor-pointer" onclick="window.location.search='?id=${item.id}'">
        <div class="aspect-video w-full rounded-lg bg-gray-900 overflow-hidden mb-2">
          <img src="${item.gallery[0]}" class="w-full h-full object-cover" onerror="this.src='${CONFIG.FALLBACK_IMAGE_PATH}'">
        </div>
        <p class="text-xs font-bold text-gray-200 truncate">${item.name}</p>
      </div>`;
  });
}

function showSystemToast(message) {
  const toast = document.getElementById('toast');
  const textLabel = document.getElementById('toast-message');
  if(!toast || !textLabel) return;

  // Clear running background clock loops to prevent overlapping execution states
  clearTimeout(Number(toast.dataset.timeoutId));
  
  textLabel.innerText = message;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');
  
  toast.dataset.timeoutId = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, CONFIG.TOAST_DURATION);
}

function injectSEOStructuredData() {
  const scriptId = "kco-json-ld-schema";
  let scriptNode = document.getElementById(scriptId) || document.createElement('script');
  scriptNode.type = 'application/ld+json';
  scriptNode.id = scriptId;
  scriptNode.text = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": activeProduct.name,
    "image": activeProduct.gallery,
    "description": activeProduct.desc,
    "sku": activeProduct.sku,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": activeProduct.priceUSD,
      "availability": activeProduct.stockCount > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  });
  if(!document.getElementById(scriptId)) document.head.appendChild(scriptNode);
}

function getLocalFallbackCatalog() {
  return {
    1: {
      id: 1,
      name: "Luxury Hypercar Concept X",
      category: "Cars",
      subCategory: "Hypercars",
      priceUSD: 2450000,
      sku: "KCO-HYPER-X",
      stockCount: 2,
      badge: "Limited Allocation",
      warranty: "5-Year Factory Powertrain Coverage & Track Support Plan",
      shipping: "White-Glove Enclosed Air Freight Carrier Logistics",
      desc: "V12 hybrid powertrain configuration with specialized active downforce wing matrices.",
      specs: { "Engine": "6.5L V12 Hybrid", "Output": "1200 BHP" },
      gallery: [
        "assets/products/car-001/cover.webp",
        "assets/products/car-001/front.webp",
        "assets/products/car-001/rear.webp",
        "assets/products/car-001/side.webp",
        "assets/products/car-001/interior.webp"
      ],
      threeSixtyFrames: ["assets/products/car-001/360/01.webp", "assets/products/car-001/360/02.webp"]
    }
  };
}