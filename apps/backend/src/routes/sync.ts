import { FastifyInstance } from "fastify";
import { authenticate } from "../lib/auth";

export async function syncRoutes(server: FastifyInstance) {
  // All sync routes require authentication
  server.addHook("onRequest", authenticate);

  // Push local changes to server (from offline POS)
  server.post("/push", async (request, reply) => {
    // TODO: Implement sync push logic
    // Accept batch of offline transactions and apply them
    return reply.send({
      success: true,
      message: "Sync push endpoint - coming soon",
    });
  });

  // Pull server changes to local (for offline POS)
  server.get("/pull", async (request, reply) => {
    // TODO: Implement sync pull logic
    // Return incremental updates since last sync
    return reply.send({
      success: true,
      message: "Sync pull endpoint - coming soon",
    });
  });

  // Get sync status
  server.get("/status", async (request, reply) => {
    // TODO: Implement sync status
    return reply.send({
      success: true,
      message: "Sync status endpoint - coming soon",
    });
  });
}
