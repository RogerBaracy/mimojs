const fs = require("fs");
const path = require("path");

// ===============================
// 📥 INPUT
// ===============================

const input = process.argv[2];

if (!input) {
  console.error("❌ Informe o nome do componente");
  console.log("👉 Exemplo:");
  console.log("npm run generate mimo-input");
  console.log("npm run generate inputs/mimo-input");
  process.exit(1);
}

// ===============================
// 🔧 HELPERS
// ===============================

const toKebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

const toPascalCase = (str) =>
  str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

// 👉 ler template
const readTemplate = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};

// 👉 substituir variáveis
const applyTemplate = (template, variables) => {
  let result = template;

  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`__${key}__`, "g");
    result = result.replace(regex, variables[key]);
  });

  return result;
};

// ===============================
// 📁 BASE PATH
// ===============================

const baseComponentsPath = path.join(__dirname, "../src/components");
const templatesPath = path.join(__dirname, "../templates/component");

// ===============================
// 🧩 PROCESSA INPUT
// ===============================

let normalizedInput = input.replace(/^src\/components\//, "");

const parts = normalizedInput.split("/");
const rawName = parts.pop();
const subPath = parts.join("/");

// nomes
const kebabName = toKebabCase(rawName);
const className = toPascalCase(kebabName);

// caminhos
const folderPath = path.join(baseComponentsPath, subPath, kebabName);

const tsPath = path.join(folderPath, `${kebabName}.ts`);
const htmlPath = path.join(folderPath, `${kebabName}.html`);
const cssPath = path.join(folderPath, `${kebabName}.css`);

// ===============================
// 📁 CRIA PASTA
// ===============================

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// ===============================
// 🚫 EVITA SOBRESCREVER
// ===============================

if (fs.existsSync(tsPath)) {
  console.error("❌ Componente já existe!");
  process.exit(1);
}

// ===============================
// 📄 LÊ TEMPLATES
// ===============================

const tsTplPath = path.join(templatesPath, "component.ts.tpl");
const htmlTplPath = path.join(templatesPath, "component.html.tpl");
const cssTplPath = path.join(templatesPath, "component.css.tpl");

if (!fs.existsSync(tsTplPath)) {
  console.error("❌ Template TS não encontrado");
  process.exit(1);
}

// ===============================
// 🧩 VARIÁVEIS
// ===============================

const variables = {
  KEBAB: kebabName,
  CLASS: className,
};

// ===============================
// 🧱 GERA CONTEÚDO
// ===============================

const tsTemplate = applyTemplate(readTemplate(tsTplPath), variables);
const htmlTemplate = applyTemplate(readTemplate(htmlTplPath), variables);
const cssTemplate = applyTemplate(readTemplate(cssTplPath), variables);

// ===============================
// 💾 ESCREVE ARQUIVOS
// ===============================

fs.writeFileSync(tsPath, tsTemplate);
fs.writeFileSync(htmlPath, htmlTemplate);
fs.writeFileSync(cssPath, cssTemplate);

// ===============================
// ✅ FINAL
// ===============================

console.log(`\n✅ Componente criado com sucesso!`);
console.log(`📦 Nome: ${kebabName}`);
console.log(`📁 Caminho: src/components/${subPath}/${kebabName}`);
console.log(`🏷 Classe: ${className}`);
