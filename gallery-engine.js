/**
 * K.C.O. Global Marketplace - Enterprise Search Indexing Architecture
 * Location: database/search-index.js
 * Implements high-speed tokenization and index bounds targeting over IndexedDB.
 */

const KCOSearchIndex = (() => {
    const DB_NAME = 'KCO_Global_Marketplace_DB';
    const STORE_NAME = 'products';

    /**
     * Executes highly optimized, non-blocking fuzzy prefix matching over indexed fields
     */
    const executePaginatedQuery = async (searchString, categoryFilter = null, offset = 0, limit = 20) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DB_NAME);
            
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(STORE_NAME, 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                
                const normalizedQuery = searchString.trim().toLowerCase();
                const tokens = normalizedQuery.split(/\s+/).filter(t => t.length > 0);
                const results = [];
                let skipped = 0;

                // Optimization: If a category filter is active, leverage the dedicated B-Tree index structure
                const targetIndex = categoryFilter ? store.index('category') : store;
                const range = categoryFilter ? IDBKeyRange.only(categoryFilter) : null;

                targetIndex.openCursor(range).onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (!cursor) {
                        resolve({ products: results, hasMore: false });
                        return;
                    }

                    const product = cursor.value;
                    
                    // Unified text matrix indexing compile target
                    const searchableBlob = `
                        ${product.name} ${product.brand} ${product.subcategory} 
                        ${product.sku} ${product.model} ${product.modelYear} ${product.tags?.join(' ')}
                    `.toLowerCase();

                    // Evaluate matching tokens
                    const matchesTokenCriteria = tokens.every(token => searchableBlob.includes(token));

                    if (matchesTokenCriteria) {
                        if (skipped < offset) {
                            skipped++;
                        } else if (results.length < limit) {
                            results.push(product);
                        } else {
                            resolve({ products: results, hasMore: true });
                            return;
                        }
                    }
                    cursor.continue();
                };

                transaction.onerror = () => reject(transaction.error);
            };

            request.onerror = (err) => reject(err);
        });
    };

    return { executePaginatedQuery };
})();