const fs = require("fs");
const path = require("path");

// ===============================
// INPUT
// ===============================
const input = process.argv[2];

if (!input) {
  console.error("❌ Informe o nome do componente");
  process.exit(1);
}

// ===============================
// PATH
// ===============================
const basePath = path.join(__dirname, "../src/components");

// remove prefixo se vier completo
let normalized = input.replace(/^src\/components\//, "");

const parts = normalized.split("/");
const name = parts.pop();
const subPath = parts.join("/");

const folderPath = path.join(basePath, subPath, name);

// ===============================
// REMOVE FILES
// ===============================
if (!fs.existsSync(folderPath)) {
  console.error("❌ Componente não encontrado");
  process.exit(1);
}

fs.rmSync(folderPath, { recursive: true, force: true });

console.log("🗑️ Pasta removida:", folderPath);

// ===============================
// REMOVE DO main.ts
// ===============================
const mainPath = path.join(__dirname, "../src/main.ts");

const importPath = `./components/${subPath ? subPath + "/" : ""}${name}/${name}`;

if (fs.existsSync(mainPath)) {
  let content = fs.readFileSync(mainPath, "utf-8");

  const regex = new RegExp(`import\\s+["']${importPath}["'];?\\n?`, "g");

  content = content.replace(regex, "");

  fs.writeFileSync(mainPath, content);

  console.log("🧹 Import removido do main.ts");
}

console.log("✅ Componente removido com sucesso!");
