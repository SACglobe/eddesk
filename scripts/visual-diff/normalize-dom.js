import fs from 'fs'
import { JSDOM } from 'jsdom'

const input = process.argv[2]
const output = process.argv[3]

if (!input || !output) {
    console.error('Usage: node normalize-dom.js <input> <output>')
    process.exit(1)
}

const html = fs.readFileSync(input, 'utf-8')
const dom = new JSDOM(`<body>${html}</body>`)
const document = dom.window.document

// Remove script tags
document.querySelectorAll('script').forEach(el => el.remove())

// Remove Next.js / React artifacts
document.querySelectorAll('[data-reactroot]').forEach(el =>
    el.removeAttribute('data-reactroot')
)

document.querySelectorAll('*').forEach(el => {
    // Remove dynamic attributes
    el.removeAttribute('style')
    el.removeAttribute('data-testid')
    el.removeAttribute('data-nextjs-scroll-focus-boundary')

    if (typeof el.className === 'string' && el.className.length > 0) {
        el.className = el.className
            .split(' ')
            .map(cls => {
                // Remove Next.js module hashes like scoped-module__hash__name 
                // and styled-jsx hashes like jsx-hash
                return cls
                    .replace(/__[a-zA-Z0-9]{5,10}__/, '__')
                    .replace(/jsx-[a-zA-Z0-9]{10,20}/, 'jsx-hash')
                    .replace(/scoped-module__[a-zA-Z0-9]+__/, 'scoped-module__')
            })
            .join(' ')
    }

})

fs.writeFileSync(output, document.body.innerHTML)

console.log(`DOM normalized → ${output}`)
