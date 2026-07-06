// backend/health/check.js
const { Pool } = require('pg');
const { Client } = require('@elastic/elasticsearch');
const pgPool = new Pool({ /* connection config */ });
const esClient = new Client({ node: 'http://localhost:9200' });

exports.getSystemHealth = async () => {
    const checks = {
        database: await checkDb(),
        elasticsearch: await checkEs(),
        storage: await checkStorage(),
        // Add others (payment, shipping, etc.) here
    };

    return {
        status: Object.values(checks).every(c => c.status === 'up') ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        checks
    };
};

async function checkDb() {
    const start = Date.now();
    try {
        await pgPool.query('SELECT 1');
        return { status: 'up', latency: `${Date.now() - start}ms` };
    } catch {
        return { status: 'down' };
    }
}

// ... similar functions for Es, Storage, etc.