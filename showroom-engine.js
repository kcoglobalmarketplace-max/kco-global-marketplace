/**
 * K.C.O. Infinite Showroom Engine
 * Location: showroom-engine.js
 * Handles structural virtualization, dynamic layout scaling, and seamless wing navigation.
 */

const ShowroomEngine = (() => {
    // Architectural Configuration
    const config = {
        virtualWings: ['North Atrium', 'East Pavilion', 'South Continuum', 'West Matrix', 'Deep Horizon Vaults'],
        baseSlotsPerWing: 5000,
        renderBufferThreshold: 300, // Pixels before view toggle
    };

    // State tracking for the endless matrix
    let state = {
        activeWing: 'North Atrium',
        allocatedSlots: 100000,
        initialized: false
    };

    /**
     * Initializes the showroom tracking systems and hooks into UI events
     */
    const init = () => {
        if (state.initialized) return;
        
        console.log(`%c 🏛️ Infinite Showroom Matrix Initialized. Current Capacity: ${state.allocatedSlots} slots allocated.`, 'color: #f97316; font-weight: bold;');
        
        setupNavigationHooks();
        setupPerformanceVirtualizer();
        setupDecoupledEventListeners();
        
        state.initialized = true;
    };

    /**
     * Intercepts "Enter Hall" clicks to smoothly pivot view coordinates.
     * Uses event delegation on document.body to stay active even when grids scale dynamically.
     */
    const setupNavigationHooks = () => {
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('.group');
            if (target && e.target.textContent.trim() === 'Enter Hall') {
                // Safely grab the title text from the matching gallery grid header
                const hallTitleElement = target.querySelector('span');
                const hallTitle = hallTitleElement ? hallTitleElement.textContent.trim() : 'Unknown Gallery';
                
                // Safely locate capacity vector text in the bottom row
                const capacityVectorElement = target.querySelector('.border-t span');
                const allocationText = capacityVectorElement ? capacityVectorElement.textContent.trim() : 'Capacity Undefined';
                
                console.log(`%c [Navigation Hook] Entering Hall -> ${hallTitle} | ${allocationText}`, 'color: #3b82f6; font-weight: bold;');
                
                // Smooth scroll view context adjustments
                const closestSection = target.closest('.space-y-6');
                if (closestSection) {
                    window.scrollTo({
                        top: closestSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    };

    /**
     * Monitors layout density for visibility optimizations
     */
    const setupPerformanceVirtualizer = () => {
        if (!('IntersectionObserver' in window)) return;

        const galleryCards = document.querySelectorAll('.min-h-\\[220px\\]');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    entry.target.style.opacity = '0.15';
                    entry.target.style.transform = 'translateY(8px)';
                }
            });
        }, {
            root: null,
            rootMargin: `${config.renderBufferThreshold}px`,
            threshold: 0.01
        });

        galleryCards.forEach(card => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            cardObserver.observe(card);
        });
    };

    /**
     * Listens for the asynchronous custom event emitted by the generator loop
     */
    const setupDecoupledEventListeners = () => {
        document.addEventListener('kco:showroom:expand', (e) => {
            if (e.detail && typeof e.detail.slots === 'number') {
                scaleShowroomGrid(e.detail.slots);
            }
        });
    };

    /**
     * Core scaling calculation logic - explicitly targets id="capacity-index"
     */
    const scaleShowroomGrid = (additionalSlots) => {
        state.allocatedSlots += additionalSlots;
        
        // Target using the precise unique ID selector
        const indexDisplay = document.getElementById('capacity-index');
        if (indexDisplay) {
            indexDisplay.textContent = `Showroom Capacity Index: ${state.allocatedSlots.toLocaleString()}+ Allocation Slots Available`;
        }
    };

    return {
        init: init,
        scaleGrid: scaleShowroomGrid
    };
})();

// Explicitly expose ShowroomEngine to the global window scope
window.ShowroomEngine = ShowroomEngine;

// Auto-boot engine on DOM Content Loaded
document.addEventListener('DOMContentLoaded', ShowroomEngine.init);