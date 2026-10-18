// Prints the /resume route to public/assets/MHM-Resume.pdf (Letter, 0.5in margins) using the
// print stylesheet, so the PDF is generated from the same data as the page.
// Requires a fresh build in dist/ (npm run build).
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { chromium } from 'playwright'
import { preview } from 'vite'

const out = 'public/assets/MHM-Resume.pdf'
const server = await preview({ preview: { port: 4179, strictPort: true }, logLevel: 'silent' })
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.goto('http://localhost:4179/resume', { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.evaluate(() => document.fonts.ready)
  mkdirSync('public/assets', { recursive: true })
  await page.pdf({
    path: out,
    format: 'Letter',
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
    printBackground: false,
    tagged: true,
    outline: true,
  })
  if (existsSync('dist/assets')) copyFileSync(out, 'dist/assets/MHM-Resume.pdf')
  console.log(`resume: wrote ${out}`)
} finally {
  await browser.close()
  server.httpServer.close()
}
