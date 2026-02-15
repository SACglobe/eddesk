import { execSync } from 'child_process'

const diff = execSync(
  'git diff origin/main...HEAD src/lib/template/registry.ts',
  { encoding: 'utf-8' }
)

const removed = diff.split('\n').filter(l => l.startsWith('-') && l.includes('template'))
if (removed.length > 0) {
  console.error('❌ Registry entries removed or modified')
  process.exit(1)
}

console.log('✅ Registry append-only')
