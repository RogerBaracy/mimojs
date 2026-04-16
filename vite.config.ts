import { defineConfig } from "vite";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

export default defineConfig(({ mode }) => ({
  base: "/mimojs/",
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      compress: true,
      mangle: true,
    },

    lib: {
      entry: "src/main.ts",
      name: "mimojs",
      fileName: mode === "min" ? "mimojs.min" : "mimojs",
      formats: ["es"],
    },

    rollupOptions: {
      output: {
        inlineDynamicImports: true, // 🔥 ESSENCIAL
      },
    },
  },
  plugins: [
    {
      name: "replace-script-in-build",
      closeBundle() {
        let html = readFileSync("index.html", "utf-8");

        html = html.replace("/src/main.ts", `./mimojs.min.mjs`);

        writeFileSync("dist/index.html", html);
      },
    },
  ],

  server: {
    host: true,
    port: 5173,
  },
}));
