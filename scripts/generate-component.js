const fs = require('fs')
const path = require('path')

const name = process.argv[2]

if (!name) {
  console.log('Informe o nome do componente')
  console.log('npm run generate mimo-input')
  process.exit()
}

const folder = `src/components/${name}`
const mainFile = 'src/main.ts'

if (fs.existsSync(folder)) {
  console.log('Componente já existe')
  process.exit()
}

fs.mkdirSync(folder, { recursive: true })

const className = name
  .split('-')
  .map(x => x.charAt(0).toUpperCase() + x.slice(1))
  .join('')

/* =====================
   TS
===================== */

fs.writeFileSync(
  `${folder}/${name}.ts`,
`import template from './${name}.html?raw'
import style from './${name}.css?raw'

export class ${className} extends HTMLElement {

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = \`
      <style>\${style}</style>
      \${template}
    \`
  }

  connectedCallback() {

  }

}

customElements.define('${name}', ${className})
`
)

/* =====================
   HTML
===================== */

fs.writeFileSync(
  `${folder}/${name}.html`,
`<div>
  ${name} works!
</div>`
)

/* =====================
   CSS
===================== */

fs.writeFileSync(
  `${folder}/${name}.css`,
`div {
  padding: 10px;
}`
)

/* =====================
   Atualizar main.ts
===================== */

if (!fs.existsSync(mainFile)) {
  console.log('main.ts não encontrado')
  process.exit()
}

let mainContent = fs.readFileSync(mainFile, 'utf-8')

const importLine = `import './components/${name}/${name}'`

if (!mainContent.includes(importLine)) {
  mainContent += `\n${importLine}\n`
  fs.writeFileSync(mainFile, mainContent)
  console.log('main.ts atualizado')
}

/* ===================== */

console.log(`Componente ${name} criado com sucesso`)
