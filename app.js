/**
 * K.C.O. Global Marketplace - Virtual Gallery Engine
 * Location: js/showroom-engine.js
 * Pulls dynamic gallery allocations out of the transactional database layer via infinite streaming.
 */

const ShowroomEngine = (() => {
    let currentOffset = 0;
    const batchSize = 10;
    let isFetching = false;
    let observer = null;

    const init = () => {
        const gridComplex = document.getElementById('main-grid-complex');
        if (!gridComplex) return;

        setupIntersectionObserver();
        loadNextGalleryBatch();
    };

    const setupIntersectionObserver = () => {
        const sentinel = document.getElementById('infinite-scroll-sentinel');
        if (!sentinel) return;

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching) {
                loadNextGalleryBatch();
            }
        }, { rootMargin: '400px' });

        observer.observe(sentinel);
    };

    const loadNextGalleryBatch = () => {
        isFetching = true;
        
        // Broadcast telemetry event tracking capacity
        document.dispatchEvent(new CustomEvent('kco:showroom:loading', { detail: { offset: currentOffset } }));

        // Simulate database async query safely
        setTimeout(() => {
            const dbRequest = window.indexedDB.open('KCO_Global_Marketplace_DB');
            dbRequest.onsuccess = (e) => {
                const db = e.target.result;
                const tx = db.transaction('galleries', 'readonly');
                const store = tx.objectStore('galleries');
                const galleries = [];

                store.openCursor().onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        galleries.push(cursor.value);
                        cursor.continue();
                    } else {
                        renderGalleries(galleries.slice(currentOffset, currentOffset + batchSize));
                        currentOffset += batchSize;
                        isFetching = false;
                        
                        // Increment Global Scale Display
                        if (window.ShowroomEngine && typeof window.ShowroomEngine.scaleGrid === 'function') {
                            window.ShowroomEngine.scaleGrid(galleries.length);
                        }
                    }
                };
            };
        }, 300);
    };

    const renderGalleries = (batch) => {
        const targetContainer = document.getElementById('main-grid-complex');
        if (!targetContainer || batch.length === 0) return;

        batch.forEach(gallery => {
            const wingSectionId = `wing-${gallery.wing.replace(/\s+/g, '-').toLowerCase()}`;
            let wingWrapper = document.getElementById(wingSectionId);

            if (!wingWrapper) {
                wingWrapper = document.createElement('div');
                wingWrapper.id = wingSectionId;
                wingWrapper.className = 'space-y-6 mt-12';
                wingWrapper.innerHTML = `
                    <h3 class="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-orange-500 pl-3">${gallery.wing}</h3>
                    <div class="gallery-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
                `;
                targetContainer.appendChild(wingWrapper);
            }

            const cardGrid = wingWrapper.querySelector('.gallery-cards-grid');
            const card = document.createElement('div');
            card.className = 'min-h-[220px] bg-gradient-to-br from-[#0f172a] to-[#090d16] border border-gray-800 hover:border-orange-500/40 p-5 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-xl group';
            card.innerHTML = `
                <div class="space-y-2">
                    <div class="flex items-center justify-between border-b border-gray-800/60 pb-2">
                        <span class="text-xs font-bold text-gray-200 uppercase tracking-tight flex items-center gap-2">🏛️ ${gallery.name}</span>
                        <span class="text-[9px] font-mono text-blue-400 px-1.5 py-0.5 bg-blue-950/50 rounded border border-blue-900/50">ID: ${gallery.id}</span>
                    </div>
                    <p class="text-[11px] text-gray-400 leading-relaxed">${gallery.purpose}</p>
                </div>
                <div class="border-t border-gray-800/60 pt-3 mt-4 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                    <span class="flex items-center gap-1">Capacity: ${gallery.capacity} Variants</span>
                    <a href="gallery.html?id=${gallery.id}" class="text-orange-500 group-hover:underline cursor-pointer">Enter Hall</a>
                </div>
            `;
            cardGrid.appendChild(card);
        });
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', ShowroomEngine.init);