import fs from 'fs'

const files = JSON.parse(fs.readFileSync('.changed-files.json', 'utf-8'))

const templatePaths = files.filter(f => f.startsWith('src/templates/'))
const templateNames = new Set(
  templatePaths.map(p => p.split('/')[2])
)

if (templateNames.size > 1) {
  console.error('❌ Multiple templates modified:', [...templateNames])
  process.exit(1)
}

const allowedExtra = [
  'src/lib/template/registry.ts'
]

for (const file of files) {
  if (
    file.startsWith('src/templates/') ||
    allowedExtra.includes(file)
  ) continue

  console.error('❌ Forbidden file modified:', file)
  process.exit(1)
}

console.log('✅ Template boundaries OK')
