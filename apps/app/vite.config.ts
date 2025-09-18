import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import devtools from "solid-devtools/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "solid", autoCodeSplitting: true }),
    solidPlugin(),
    tailwindcss(),
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
  ],
});
