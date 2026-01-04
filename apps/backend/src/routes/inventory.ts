import { FastifyInstance } from "fastify";
import { authenticate } from "../lib/auth";

export async function inventoryRoutes(server: FastifyInstance) {
  // All inventory routes require authentication
  server.addHook("onRequest", authenticate);

  // Get all products
  server.get("/products", async (request, reply) => {
    // TODO: Implement list products
    return reply.send({
      success: true,
      message: "List products endpoint - coming soon",
    });
  });

  // Create product
  server.post("/products", async (request, reply) => {
    // TODO: Implement create product
    return reply.send({
      success: true,
      message: "Create product endpoint - coming soon",
    });
  });

  // Update product
  server.patch("/products/:id", async (request, reply) => {
    // TODO: Implement update product
    return reply.send({
      success: true,
      message: "Update product endpoint - coming soon",
    });
  });

  // Get stock levels
  server.get("/stock", async (request, reply) => {
    // TODO: Implement stock levels
    return reply.send({
      success: true,
      message: "Stock levels endpoint - coming soon",
    });
  });

  // Adjust stock
  server.post("/stock/adjust", async (request, reply) => {
    // TODO: Implement stock adjustment
    return reply.send({
      success: true,
      message: "Stock adjustment endpoint - coming soon",
    });
  });
}
