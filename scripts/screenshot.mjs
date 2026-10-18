// QA helper: node scripts/screenshot.mjs <url> <out.png> [width] [height] [full 0|1] [menu|scroll]
import { chromium } from 'playwright'
const [,, url, out, w = '1440', h = '900', full = '0', action = ''] = process.argv
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: +w, height: +h } })
await p.goto(url, { waitUntil: 'load' })
await p.waitForTimeout(1500)
if (action === 'menu') { await p.click('button[aria-controls="mobile-menu"]'); await p.waitForTimeout(400) }
if (action === 'scroll') { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 250)) } window.scrollTo(0, 0) }); await p.waitForTimeout(500) }
await p.screenshot({ path: out, fullPage: full === '1' })
await b.close()
