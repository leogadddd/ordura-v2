"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncRoutes = syncRoutes;
const auth_1 = require("../lib/auth");
async function syncRoutes(server) {
    server.addHook('onRequest', auth_1.authenticate);
    server.post('/push', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Sync push endpoint - coming soon',
        });
    });
    server.get('/pull', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Sync pull endpoint - coming soon',
        });
    });
    server.get('/status', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Sync status endpoint - coming soon',
        });
    });
}
//# sourceMappingURL=sync.js.map