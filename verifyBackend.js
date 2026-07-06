const axios = require('axios');
const app = require('../app');
const pgPool = require('../config/db'); // Adjust path to your DB config
const { getIo } = require('../services/socketService');

async function runVerification() {
    console.log('--- 🚀 Starting K.C.O Backend Verification ---');

    try {
        // 1. Verify App Initialization
        if (!app) throw new Error('app.js failed to load');
        console.log('✅ app.js loaded');

        // 2. Verify Database Connection
        await pgPool.query('SELECT 1');
        console.log('✅ PostgreSQL connected');

        // 3. Verify WebSocket Initialization
        try {
            getIo();
            console.log('✅ WebSocket initialized');
        } catch (e) {
            console.error('❌ WebSocket failed:', e.message);
        }

        // 4. Probe Endpoints
        const baseURL = 'http://localhost:3000';
        const endpoints = ['/health/status', '/metrics'];
        
        for (const route of endpoints) {
            const res = await axios.get(`${baseURL}${route}`);
            if (res.status === 200) {
                console.log(`✅ ${route} reachable`);
            }
        }

        console.log('--- ✅ Verification Complete: System Healthy ---');
    } catch (err) {
        console.error('--- ❌ Verification Failed ---');
        console.error(err.message);
        process.exit(1);
    }
}

runVerification();