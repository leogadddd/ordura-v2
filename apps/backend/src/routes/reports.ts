import { FastifyInstance } from "fastify";
import { authenticate } from "../lib/auth";

export async function reportsRoutes(server: FastifyInstance) {
  // All report routes require authentication
  server.addHook("onRequest", authenticate);

  // Daily sales report
  server.get("/daily", async (request, reply) => {
    // TODO: Implement daily report
    return reply.send({
      success: true,
      message: "Daily report endpoint - coming soon",
    });
  });

  // Monthly sales report
  server.get("/monthly", async (request, reply) => {
    // TODO: Implement monthly report
    return reply.send({
      success: true,
      message: "Monthly report endpoint - coming soon",
    });
  });

  // Custom date range report
  server.get("/custom", async (request, reply) => {
    // TODO: Implement custom report
    return reply.send({
      success: true,
      message: "Custom report endpoint - coming soon",
    });
  });

  // Inventory report
  server.get("/inventory", async (request, reply) => {
    // TODO: Implement inventory report
    return reply.send({
      success: true,
      message: "Inventory report endpoint - coming soon",
    });
  });
}
