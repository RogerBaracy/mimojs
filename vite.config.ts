import { defineConfig } from "vite";
import path from "path";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";

export default defineConfig(({ mode }: { mode: string }) => ({
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
        const distDir = path.resolve(__dirname, "dist");
        const docsRoot = path.resolve(__dirname, "src/components");
        const outFileName = `${mode === "min" ? "mimojs.min" : "mimojs"}.mjs`;

        const collectDocFiles = (dir: string): string[] => {
          const entries = readdirSync(dir);

          return entries.flatMap((entryName: string) => {
            const fullPath = path.join(dir, entryName);
            const isDir = statSync(fullPath).isDirectory();

            if (isDir) {
              return collectDocFiles(fullPath);
            }

            return entryName.endsWith(".doc.html") ? [fullPath] : [];
          });
        };

        const replaceDocScriptSrc = (html: string, targetScript: string) => {
          return html.replace(
            /<script\s+type="module"\s+src="[^"]*"><\/script>/,
            `<script type="module" src="${targetScript}"></script>`,
          );
        };

        let html = readFileSync("index.html", "utf-8");
        html = html.replace("/src/main.ts", `./${outFileName}`);
        html = html.replace(
          "./public/assets/mimo-grid.css",
          "./assets/mimo-grid.css",
        );
        writeFileSync(path.join(distDir, "index.html"), html);

        const docFiles = collectDocFiles(docsRoot);

        docFiles.forEach((docFile) => {
          const relativeDocPath = path.relative(__dirname, docFile);
          const distDocPath = path.join(distDir, relativeDocPath);
          const distDocDir = path.dirname(distDocPath);
          const scriptFromDocToLib = path
            .relative(distDocDir, path.join(distDir, outFileName))
            .replaceAll("\\", "/");

          const docHtml = readFileSync(docFile, "utf-8");
          const transformedDocHtml = replaceDocScriptSrc(
            docHtml,
            `./${scriptFromDocToLib}`,
          );

          mkdirSync(distDocDir, { recursive: true });
          writeFileSync(distDocPath, transformedDocHtml);
        });
      },
    },
  ],

  server: {
    host: true,
    port: 5173,
  },
}));
