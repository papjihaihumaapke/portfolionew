// Captures desktop (1440x900 viewport) and mobile (390x844 @2x) screenshots of every shipped site
// that has a public URL, plus a tall full-page capture used as the scrolling preview when a site
// refuses to be embedded. Writes to public/media/sites/<slug>-{desktop,mobile,full}.png.
// Usage: node scripts/capture-sites.mjs [slug]
import { chromium } from 'playwright'
import { sites } from '../src/data/sites.ts'

const only = process.argv[2]
const browser = await chromium.launch()
for (const s of sites) {
  if (!s.url || (only && s.slug !== only)) continue
  for (const [kind, viewport, scale] of [['desktop', { width: 1440, height: 900 }, 1], ['mobile', { width: 390, height: 844 }, 2]]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: scale })
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {})
    // Dismiss cookie or privacy banners so they do not cover the hero.
    const consent = page.getByRole('button', { name: /^(decline|reject|reject all|accept|accept all|got it|ok)$/i }).first()
    if (await consent.isVisible().catch(() => false)) await consent.click().catch(() => {})
    // Let lazy images and entrance animations settle, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < Math.min(document.body.scrollHeight, 6000); y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 150))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `public/media/sites/${s.slug}-${kind}.png` })
    if (kind === 'desktop') {
      const h = Math.min(await page.evaluate(() => document.body.scrollHeight), 5400)
      await page.setViewportSize({ width: 1440, height: h })
      await page.waitForTimeout(600)
      await page.screenshot({ path: `public/media/sites/${s.slug}-full.png`, clip: { x: 0, y: 0, width: 1440, height: h } })
    }
    await page.close()
  }
  console.log(`captured ${s.slug}`)
}
await browser.close()
