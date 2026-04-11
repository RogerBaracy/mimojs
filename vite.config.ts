import { defineConfig } from "vite";
import { readFileSync, writeFileSync } from "fs";

export default defineConfig({
  base: "/mimojs/",

  build: {
    outDir: "dist",
    lib: {
      entry: "src/main.ts",
      name: "mimojs",
      fileName: "mimojs",
      formats: ["es", "umd"],
    },
  },

  plugins: [
    {
      name: "replace-script-in-build",
      closeBundle() {
        let html = readFileSync("index.html", "utf-8");

        html = html.replace("/src/main.ts", "./mimojs.mjs");

        writeFileSync("dist/index.html", html);
      },
    },
  ],

  server: {
    host: true,
    port: 5173,
  },
});
