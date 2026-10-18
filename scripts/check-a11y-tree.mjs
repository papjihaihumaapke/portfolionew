// Screen-reader spot check: prints landmarks and the heading outline from the accessibility tree.
import { chromium } from 'playwright'

const base = process.argv[2] ?? 'http://localhost:4174'
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/', '/work/lotstudio-ai']
const browser = await chromium.launch()
for (const path of paths) {
  const page = await browser.newPage()
  await page.goto(base + path, { waitUntil: 'networkidle' })
  const snap = await page.locator('body').ariaSnapshot()
  const lines = snap.split('\n').filter((l) => /^\s*- '?(banner|navigation|main|contentinfo|region|heading|img|dialog)\b/.test(l))
  console.log(`\n== ${path}`)
  console.log(lines.map((l) => l.replace(/^(\s*)- /, '$1').slice(0, 110)).slice(0, 40).join('\n'))
  await page.close()
}
await browser.close()
