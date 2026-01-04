"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRoutes = reportsRoutes;
const auth_1 = require("../lib/auth");
async function reportsRoutes(server) {
    server.addHook('onRequest', auth_1.authenticate);
    server.get('/daily', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Daily report endpoint - coming soon',
        });
    });
    server.get('/monthly', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Monthly report endpoint - coming soon',
        });
    });
    server.get('/custom', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Custom report endpoint - coming soon',
        });
    });
    server.get('/inventory', async (request, reply) => {
        return reply.send({
            success: true,
            message: 'Inventory report endpoint - coming soon',
        });
    });
}
//# sourceMappingURL=reports.js.map