const { getIo } = require('../services/socketService');

class DashboardProvider {
    constructor() { this.name = 'dashboard'; }

    async send(notification) {
        const io = getIo();
        // Emit to all connected admin clients
        io.emit('new_notification', notification);
    }
}

module.exports = DashboardProvider;