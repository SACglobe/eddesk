import { execSync } from 'child_process'
import fs from 'fs'

const diff = execSync(
  'git diff --name-only origin/main...HEAD',
  { encoding: 'utf-8' }
)
  .split('\n')
  .filter(Boolean)

fs.writeFileSync('.changed-files.json', JSON.stringify(diff, null, 2))

console.log('Changed files:', diff)

