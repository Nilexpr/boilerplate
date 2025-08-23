import { Hono } from "hono";
import { router } from "./lib/trpc.ts";

const app = new Hono();

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "healthy", timestamp: new Date().toISOString() });
});

const appRouter = router({
  // ...
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export default app;

// "scripts": {
//   "dev": "node --watch src/start.ts --env-file ../../config/api.env"
// },