import fs from 'fs'
import { SchoolContentV1 } from './schoolContentSchema.js'

const files = JSON.parse(fs.readFileSync('.changed-files.json', 'utf-8'))

const defaultsFiles = files.filter(f => f.endsWith('defaults.json'))

for (const file of defaultsFiles) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const result = SchoolContentV1.safeParse(data)

  if (!result.success) {
    console.error(`❌ Schema validation failed for ${file}`)
    console.error(result.error.format())
    process.exit(1)
  }
}

console.log('✅ defaults.json schema valid')
