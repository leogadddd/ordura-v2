"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRoutes = inventoryRoutes;
const auth_1 = require("../lib/auth");
async function inventoryRoutes(server) {
    server.addHook('onRequest', auth_1.authenticate);
    server.get('/products', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'List products endpoint - coming soon',
        });
    });
    server.post('/products', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Create product endpoint - coming soon',
        });
    });
    server.patch('/products/:id', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Update product endpoint - coming soon',
        });
    });
    server.get('/stock', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Stock levels endpoint - coming soon',
        });
    });
    server.post('/stock/adjust', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Stock adjustment endpoint - coming soon',
        });
    });
}
//# sourceMappingURL=inventory.js.map