/**
 * K.C.O. Global Marketplace - Infinite Architectural Streamer
 * Location: assets/js/mock-generator.js
 * * DESIGN UPDATE: Decoupled architecture using native custom DOM events.
 * Eliminates strict dependencies on global window script load order.
 */

const MockGenerator = (() => {
    let streamingActive = true;
    let backgroundBatchCounter = 0;

    /**
     * Initializes the background scaling routine.
     */
    const init = () => {
        console.log("%c 🛰️ Decoupled Background Content Loop Activated. Pipeline operational.", "color: #10b981; font-weight: bold;");
        startBackgroundStaging();
    };

    /**
     * Periodically generates layout capacity vectors and broadcasts them 
     * globally across the DOM for any listening showroom engines.
     */
    const startBackgroundStaging = () => {
        setInterval(() => {
            if (!streamingActive) return;

            backgroundBatchCounter++;
            const dynamicallyAllocatedVolume = Math.floor(Math.random() * 450) + 50;

            // Decoupled Event Dispatching
            const allocationEvent = new CustomEvent('kco:showroom:expand', {
                detail: { slots: dynamicallyAllocatedVolume },
                bubbles: true,
                cancelable: true
            });
            
            document.dispatchEvent(allocationEvent);

            if (backgroundBatchCounter % 10 === 0) {
                console.log(`%c [Telemetry Streamer] Broadcasted ${dynamicallyAllocatedVolume} node allocations over DOM event pipeline.`, "color: #94a3b8; font-size: 10px;");
            }
        }, 4000); // Triggered continuously at 4-second intervals
    };

    /**
     * Toggles the diagnostic simulation stream manually via browser console
     */
    const toggleSimulation = () => {
        streamingActive = !streamingActive;
        console.log(`📡 Background data pipeline simulation: ${streamingActive ? 'ACTIVE' : 'PAUSED'}`);
    };

    return {
        init: init,
        toggle: toggleSimulation
    };
})();

// Auto-instantiate the streaming loops upon DOM layout loading
document.addEventListener('DOMContentLoaded', MockGenerator.init);