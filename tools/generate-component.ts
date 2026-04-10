import fs from 'fs'
import path from 'path'

const name = process.argv[2]

if (!name) {
  console.log('Informe o nome do componente')
  process.exit(1)
}

const selector = `fpe-${name}`

const className =
  'Fpe' +
  name.charAt(0).toUpperCase() +
  name.slice(1)

const basePath = process.cwd()

const folder = path.join(
  basePath,
  `src/components/${selector}`
)

fs.mkdirSync(folder, { recursive: true })

function createFile(template: string, output: string) {

  let content = fs.readFileSync(template, 'utf-8')

  content = content
    .replace(/{{selector}}/g, selector)
    .replace(/{{className}}/g, className)
    .replace(/{{fileName}}/g, selector)

  fs.writeFileSync(output, content)
}

createFile(
  'tools/templates/component.ts.template',
  `${folder}/${selector}.ts`
)

createFile(
  'tools/templates/component.html.template',
  `${folder}/${selector}.html`
)

createFile(
  'tools/templates/component.css.template',
  `${folder}/${selector}.css`
)

createFile(
  'tools/templates/index.ts.template',
  `${folder}/index.ts`
)

updateMainTs(selector)

console.log(`Componente ${selector} criado com sucesso!`)

function updateMainTs(selector: string) {

  const mainPath = path.join(basePath, 'src/main.ts')

  let content = fs.readFileSync(mainPath, 'utf-8')

  const importLine =
    `import './components/${selector}/${selector}'`

  if (!content.includes(importLine)) {

    content += `\n${importLine}\n`

    fs.writeFileSync(mainPath, content)
  }
}
