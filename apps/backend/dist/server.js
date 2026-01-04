"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = require("fastify");
const cors_1 = require("@fastify/cors");
const jwt_1 = require("@fastify/jwt");
const auth_1 = require("./routes/auth");
const pos_1 = require("./routes/pos");
const inventory_1 = require("./routes/inventory");
const reports_1 = require("./routes/reports");
const sync_1 = require("./routes/sync");
const server = (0, fastify_1.default)({
    logger: {
        level: process.env.LOG_LEVEL || 'info',
    },
});
server.register(cors_1.default, {
    origin: ['http://localhost:1420', 'http://localhost:5173'],
    credentials: true,
});
server.register(jwt_1.default, {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
});
server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});
server.register(auth_1.authRoutes, { prefix: '/api/auth' });
server.register(pos_1.posRoutes, { prefix: '/api/pos' });
server.register(inventory_1.inventoryRoutes, { prefix: '/api/inventory' });
server.register(reports_1.reportsRoutes, { prefix: '/api/reports' });
server.register(sync_1.syncRoutes, { prefix: '/api/sync' });
const start = async () => {
    try {
        const port = parseInt(process.env.PORT || '3000');
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`🚀 Server running on http://localhost:${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map