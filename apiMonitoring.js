const client = require('prom-client');

// 1. Initialize Registry Metrics
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

// 2. Middleware Implementation
const apiMonitoring = (req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const durationInSeconds = duration[0] + duration[1] / 1e9;

        const labels = {
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        };

        // Record metrics
        httpRequestDuration.observe(labels, durationInSeconds);
        httpRequestsTotal.inc(labels);

        // Structured Logging
        if (res.statusCode >= 400) {
            console.error(`[API ERROR] ${req.method} ${req.path} - ${res.statusCode} (${durationInSeconds.toFixed(3)}s)`);
        }
    });

    next();
};

module.exports = { apiMonitoring, register: client.register };