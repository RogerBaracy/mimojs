import { defineConfig } from "vite";

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

  server: {
    host: true,
    port: 5173,
  },
});
