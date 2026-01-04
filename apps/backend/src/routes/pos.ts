import { FastifyInstance } from "fastify";
import { authenticate } from "../lib/auth";

export async function posRoutes(server: FastifyInstance) {
  // All POS routes require authentication
  server.addHook("onRequest", authenticate);

  // Create a sale/transaction
  server.post("/sales", async (request, reply) => {
    // TODO: Implement sale creation
    return reply.send({
      success: true,
      message: "POS sale endpoint - coming soon",
    });
  });

  // Get sale by ID
  server.get("/sales/:id", async (request, reply) => {
    // TODO: Implement get sale
    return reply.send({
      success: true,
      message: "Get sale endpoint - coming soon",
    });
  });

  // Get all sales (with pagination)
  server.get("/sales", async (request, reply) => {
    // TODO: Implement list sales
    return reply.send({
      success: true,
      message: "List sales endpoint - coming soon",
    });
  });

  // Process payment
  server.post("/payments", async (request, reply) => {
    // TODO: Implement payment processing
    return reply.send({
      success: true,
      message: "Payment endpoint - coming soon",
    });
  });
}
