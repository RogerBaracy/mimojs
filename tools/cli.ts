import { execSync } from 'child_process'

const command = process.argv[2]
const type = process.argv[3]
const name = process.argv[4]

if (command === 'g' && type === 'c') {

  execSync(
    `ts-node tools/generate-component.ts ${name}`,
    { stdio: 'inherit' }
  )

} else {

  console.log(`
Comandos disponíveis:

npm run g c input
npm run g c button
npm run g c select
`)

}
