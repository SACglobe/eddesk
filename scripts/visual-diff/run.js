import { execSync } from 'child_process'

execSync(`
node scripts/visual-diff/extract-dom.js http://localhost:3001 source.raw.html
node scripts/visual-diff/extract-dom.js http://localhost:3000/demo/template_classic imported.raw.html
node scripts/visual-diff/normalize-dom.js source.raw.html source.norm.html
node scripts/visual-diff/normalize-dom.js imported.raw.html imported.norm.html
node scripts/visual-diff/diff-dom.js source.norm.html imported.norm.html
`, { stdio: 'inherit' })
