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

// 👉 escreve somente se não existir
const writeIfNotExists = (filePath, content, label) => {
  if (fs.existsSync(filePath)) {
    console.log(`ℹ️ ${label} já existe → ignorado`);
    return;
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ ${label} criado`);
};

// ===============================
// 📁 BASE PATH
// ===============================

const baseComponentsPath = path.join(__dirname, "../src/components");
const templatesPath = path.join(__dirname, "../templates/component");
const docTemplatePath = path.join(__dirname, "../templates/component.doc.html");

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
const docFolderPath = path.join(folderPath, "doc");

const tsPath = path.join(folderPath, `${kebabName}.ts`);
const htmlPath = path.join(folderPath, `${kebabName}.html`);
const cssPath = path.join(folderPath, `${kebabName}.css`);
const docPath = path.join(docFolderPath, `${kebabName}.doc.html`);

// ===============================
// 📁 CRIA PASTAS
// ===============================

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// 👉 cria pasta doc
if (!fs.existsSync(docFolderPath)) {
  fs.mkdirSync(docFolderPath, { recursive: true });
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

// 👉 doc template
let docTemplate = readTemplate(docTemplatePath);

docTemplate = docTemplate
  .replace(/{{componentName}}/g, className)
  .replace(/{{selector}}/g, kebabName);

// ===============================
// 💾 ESCREVE SOMENTE O QUE FALTA
// ===============================

writeIfNotExists(tsPath, tsTemplate, "TS");
writeIfNotExists(htmlPath, htmlTemplate, "HTML");
writeIfNotExists(cssPath, cssTemplate, "CSS");
writeIfNotExists(docPath, docTemplate, "DOC");

// ===============================
// ✅ FINAL
// ===============================

console.log(`\n📦 Componente: ${kebabName}`);
console.log(`📁 Caminho: src/components/${subPath}/${kebabName}`);
console.log(`🏷 Classe: ${className}`);

// ===============================
// 📚 GERAR SIDEBAR
// ===============================
const relativeDocPath = `./src/components/${subPath ? subPath + "/" : ""}${kebabName}/doc/${kebabName}.doc.html`;

const componentItem = `
<div class="component" onclick="loadDoc('${className}', '${relativeDocPath}')">
  ${className}
</div>
`;
// ===============================
// 📚 ATUALIZA INDEX RAIZ
// ===============================
const rootIndexPath = path.join(__dirname, "../index.html");

if (fs.existsSync(rootIndexPath)) {
  let content = fs.readFileSync(rootIndexPath, "utf-8");

  if (!content.includes(relativeDocPath)) {
    content = content.replace(
      "<!-- COMPONENTS -->",
      `${componentItem}\n<!-- COMPONENTS -->`,
    );

    fs.writeFileSync(rootIndexPath, content);

    console.log("📚 Componente adicionado ao viewer");
  } else {
    console.log("ℹ️ Já existe no viewer");
  }
}