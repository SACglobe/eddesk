import fs from 'fs'
import { diffLines } from 'diff'

const a = fs.readFileSync(process.argv[2], 'utf-8')
const b = fs.readFileSync(process.argv[3], 'utf-8')

const diff = diffLines(a, b)

let hasDiff = false

diff.forEach(part => {
    if (part.added || part.removed) {
        hasDiff = true
        console.log(
            part.added ? '\x1b[32m' :
                part.removed ? '\x1b[31m' :
                    '\x1b[0m',
            part.value
        )
    }
})

if (hasDiff) {
    console.error('\n❌ DOM STRUCTURE DIFF DETECTED')
    process.exit(1)
}

console.log('\n✅ DOM STRUCTURE MATCHES')
