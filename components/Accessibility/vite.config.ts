import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "tsconfig.build.json",
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, `src/index.tsx`),
      formats: ["es", "cjs"],
      fileName(format) {
        if (format === "es") {
          return "esm/[name].js";
        }

        return "cjs/[name].js";
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "React-dom",
        },
      },
    },
  },
});
