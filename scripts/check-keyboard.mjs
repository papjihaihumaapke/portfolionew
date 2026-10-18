// Keyboard pass: tab order with visible focus on Home, skip link, mobile menu focus trap,
// Escape to close, and focus returning to the menu button.
import { chromium } from 'playwright'

const base = process.argv[2] ?? 'http://localhost:4174'
const browser = await chromium.launch()
const describe = () => {
  const el = document.activeElement
  const cs = getComputedStyle(el)
  const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)
  return { tag: el.tagName.toLowerCase(), label, outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2 }
}

// Desktop: first 14 tab stops.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(base + '/', { waitUntil: 'networkidle' })
let noOutline = 0
for (let i = 1; i <= 14; i++) {
  await page.keyboard.press('Tab')
  const d = await page.evaluate(describe)
  if (!d.outline) noOutline++
  console.log(`tab ${String(i).padStart(2)}: <${d.tag}> ${d.label}${d.outline ? '' : '  (NO VISIBLE FOCUS)'}`)
}
// Skip link moves focus to main.
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.keyboard.press('Tab')
await page.keyboard.press('Enter')
console.log('skip link target:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName))

// Mobile menu.
const m = await browser.newPage({ viewport: { width: 375, height: 800 } })
await m.goto(base + '/', { waitUntil: 'networkidle' })
await m.focus('button[aria-controls="mobile-menu"]')
await m.keyboard.press('Enter')
await m.waitForTimeout(300)
console.log('menu open, aria-expanded:', await m.getAttribute('button[aria-controls="mobile-menu"]', 'aria-expanded'))
const inside = []
for (let i = 0; i < 9; i++) {
  await m.keyboard.press('Tab')
  inside.push(await m.evaluate(() => !!document.activeElement.closest('#mobile-menu')))
}
console.log('focus stayed inside menu for 9 tabs:', inside.every(Boolean))
await m.keyboard.press('Escape')
await m.waitForTimeout(200)
console.log('closed by Escape:', !(await m.$('#mobile-menu')), '| focus back on menu button:', await m.evaluate(() => document.activeElement.getAttribute('aria-controls') === 'mobile-menu'))
await browser.close()
process.exit(noOutline ? 1 : 0)
