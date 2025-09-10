// @ts-check
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs({ devtools: true })],
  server: {
    port: 7655,
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:7654",
          changeOrigin: true,
        },
      },
    },
    plugins: [tailwindcss()],
  },
});
