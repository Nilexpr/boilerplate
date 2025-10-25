import { defineConfig, FSWatcher } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
// import devtools from "solid-devtools/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "solid",
      autoCodeSplitting: true,
    }),
    solidPlugin(),
    tailwindcss(),
    // devtools({
    //   /* features options - all disabled by default */
    //   autoname: true, // e.g. enable autoname
    // }),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  build: {
    minify: false,
    cssMinify: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapIgnoreList: (relativeSourcePath, sourcemapPath) => {
          console.log("sourcemapIgnoreList", {
            relativeSourcePath,
            sourcemapPath,
          });
          const inNM = relativeSourcePath.includes("/node_modules/");
          const keepTanstack = /\/node_modules\/@tanstack\//.test(
            relativeSourcePath,
          );
          return inNM && !keepTanstack; // 忽略除 @tanstack 外的依赖
        },
      },
    },
  },
});
