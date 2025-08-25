import { Hono } from "hono";
import { publicProcedure, router } from "./lib/trpc.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const app = new Hono();

// Health check endpoint
app.get("/health", (c) => {
  console.log("health check");
  return c.json({ status: "healthy", timestamp: new Date().toISOString() });
});

const appRouter = router({
  hello: publicProcedure.query(() => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
      return 123;
    }
    return "Hello, world!";
  }),
});

export type AppRouter = typeof appRouter;

// tRPC API routes
app.use("/api/trpc/*", (c) => {
  return fetchRequestHandler({
    req: c.req.raw,
    router: appRouter,
    endpoint: "/api/trpc",
    async createContext({ req, resHeaders, info }) {
      return {
        req,
        res: c.res,
        resHeaders,
        info,
        env: c.env,
      };
    },
    batching: {
      enabled: true,
    },
    onError({ error, path }) {
      console.error("tRPC error on path", path, ":", error);
    },
  });
});

export default app;
