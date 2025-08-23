import { Hono } from "hono";
import api from "./index.ts";
import { serve } from "@hono/node-server";

const app = new Hono();

app.route("/", api);

export default app;

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
