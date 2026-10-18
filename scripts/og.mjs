// Renders 1200x630 Open Graph images to public/og/: site.png plus one per project.
// Run after editing project titles: npm run og (needs Playwright's Chromium locally).
import { mkdirSync, readFileSync } from 'node:fs'
import { chromium } from 'playwright'
import { projects, typeLabel } from '../src/data/projects.ts'

const font = (f) => `data:font/woff2;base64,${readFileSync(new URL(`../public/fonts/${f}`, import.meta.url)).toString('base64')}`
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

const card = ({ eyebrow, title, sub }) => `<!doctype html><html><head><style>
@font-face { font-family: Clash; src: url(${font('clash-display-600.woff2')}); font-weight: 600; }
@font-face { font-family: Outfit; src: url(${font('outfit-latin.woff2')}); font-weight: 300 700; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #1a1a1a; color: #fff; font-family: Outfit; padding: 72px 80px; display: flex; flex-direction: column; }
.top { display: flex; justify-content: space-between; align-items: center; }
.mono { font-family: Clash; font-size: 56px; letter-spacing: -0.04em; }
.mono span, .dot { color: #e8470a; }
.eyebrow { font-size: 22px; letter-spacing: 0.16em; text-transform: uppercase; color: #ff6340; }
h1 { font-family: Clash; font-weight: 600; font-size: ${title.length > 34 ? 72 : 88}px; line-height: 1; letter-spacing: -0.03em; margin-top: auto; max-width: 1000px; }
p { font-size: 30px; color: #b3b3b3; margin-top: 28px; max-width: 980px; line-height: 1.35; }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: #e8470a; }
</style></head><body>
<div class="top"><div class="mono">H<span>.</span></div><div class="eyebrow">${esc(eyebrow)}</div></div>
<h1>${esc(title)}<span class="dot">.</span></h1>
<p>${esc(sub)}</p>
<div class="bar"></div>
</body></html>`

mkdirSync('public/og', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
const jobs = [
  { file: 'site', eyebrow: 'Vancouver, BC', title: 'Hilal Malik', sub: 'UI/UX & Product Designer. I design products and then build them, using code and AI.' },
  ...projects.map((p) => ({ file: p.slug, eyebrow: p.studyLabel ?? typeLabel[p.type], title: p.title, sub: p.outcome })),
]
for (const j of jobs) {
  await page.setContent(card(j))
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `public/og/${j.file}.png` })
}
await browser.close()
console.log(`og: ${jobs.length} images`)
