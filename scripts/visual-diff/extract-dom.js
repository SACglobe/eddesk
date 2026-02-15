import { chromium } from 'playwright'
import fs from 'fs'

const url = process.argv[2]
const output = process.argv[3]

if (!url || !output) {
    console.error('Usage: node extract-dom.js <url> <output-file>')
    process.exit(1)
}

; (async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle' })

    const html = await page.evaluate(() => {
        return document.body.innerHTML
    })

    fs.writeFileSync(output, html)
    await browser.close()

    console.log(`DOM extracted → ${output}`)
})()
