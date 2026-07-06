// backend/utils/circuitBreaker.js
const CircuitBreaker = require('opossum');

const options = {
    timeout: 3000,      // If service takes longer than 3s, trigger failure
    errorThresholdPercentage: 50, // Open circuit if 50% of requests fail
    resetTimeout: 30000 // Wait 30s before trying again
};

/**
 * Wraps an async function with circuit breaker logic.
 * @param {Function} action - The async function to execute.
 */
const createBreaker = (action) => {
    const breaker = new CircuitBreaker(action, options);
    
    breaker.fallback(() => ({ error: 'Service temporarily unavailable' }));
    
    return breaker;
};

module.exports = createBreaker;