import fs from 'fs'
import path from 'path'

const files = JSON.parse(fs.readFileSync('.changed-files.json', 'utf-8'))

const templates = new Set(
  files
    .filter(f => f.startsWith('src/templates/'))
    .map(f => f.split('/')[2])
)

for (const t of templates) {
  const base = `src/templates/${t}`

  const required = [
    'renderer.tsx',
    'routes.ts',
    'schema.ts',
    'defaults.json'
  ]

  for (const file of required) {
    if (!fs.existsSync(path.join(base, file))) {
      console.error(`❌ Missing ${file} in ${t}`)
      process.exit(1)
    }
  }

  const stylesDir = path.join(base, 'styles')
  const hasModuleCss =
    fs.existsSync(stylesDir) &&
    fs.readdirSync(stylesDir).some(f => f.endsWith('.module.css'))

  if (!hasModuleCss) {
    console.error(`❌ ${t} has no scoped CSS module`)
    process.exit(1)
  }
}

console.log('✅ Template structure valid')
