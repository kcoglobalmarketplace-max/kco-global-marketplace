const http = require('http');
// 1. Import your existing app configuration
const app = require('./app'); 

// 2. Import your utilities and services
const { initSocket } = require('./services/socketService');
const notificationService = require('./services/notificationService');
const DashboardProvider = require('./providers/dashboardProvider');

// 3. Create the HTTP server
const server = http.createServer(app);

// 4. Initialize real-time components
initSocket(server);

// 5. Register the internal notification provider
notificationService.registerProvider(new DashboardProvider());

// 6. Define the port (using environment variables is a production best practice)
const PORT = process.env.PORT || 3000;

// 7. Start the server
server.listen(PORT, () => {
    console.log(`🚀 K.C.O Marketplace server running on port ${PORT}`);
});