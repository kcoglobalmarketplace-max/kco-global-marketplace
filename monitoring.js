const client = require('prom-client');

// Initialize the registry for all metrics
const register = new client.Registry();

// Enable default metrics (CPU, Memory, Event Loop, etc.)
client.collectDefaultMetrics({ register });

// Custom Gauge for Database/Service status (1=up, 0=down)
const serviceStatus = new client.Gauge({
    name: 'kco_service_status',
    help: 'Status of critical services',
    labelNames: ['service'],
    registers: [register]
});

// Custom Counter for Error Rates
const errorRate = new client.Counter({
    name: 'kco_api_errors_total',
    help: 'Total count of API errors',
    labelNames: ['service', 'code'],
    registers: [register]
});

module.exports = {
    register,
    serviceStatus,
    errorRate
};