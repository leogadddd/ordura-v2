"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posRoutes = posRoutes;
const auth_1 = require("../lib/auth");
async function posRoutes(server) {
    server.addHook('onRequest', auth_1.authenticate);
    server.post('/sales', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'POS sale endpoint - coming soon',
        });
    });
    server.get('/sales/:id', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Get sale endpoint - coming soon',
        });
    });
    server.get('/sales', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'List sales endpoint - coming soon',
        });
    });
    server.post('/payments', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Payment endpoint - coming soon',
        });
    });
}
//# sourceMappingURL=pos.js.map