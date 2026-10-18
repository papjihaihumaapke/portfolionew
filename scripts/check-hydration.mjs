// Loads each pre-rendered route in Chromium and reports console errors (hydration mismatches etc.).
// Usage: node scripts/check-hydration.mjs [baseUrl]
import { chromium } from 'playwright'

const base = process.argv[2] ?? 'http://localhost:4174'
const paths = ['/', '/work', '/about', '/resume', '/contact', '/work/lotstudio-ai', '/work/ai-voice-agents', '/work/musify-motion-system', '/work/motion-reel', '/nope']
const browser = await chromium.launch()
let problems = 0
for (const path of paths) {
  const page = await browser.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)))
  page.on('pageerror', (e) => errors.push(e.message.slice(0, 200)))
  await page.goto(base + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  console.log(`${errors.length ? 'FAIL' : 'ok  '} ${path}${errors.length ? '\n  ' + errors.join('\n  ') : ''}`)
  problems += errors.length
  await page.close()
}
await browser.close()
process.exit(problems ? 1 : 0)
