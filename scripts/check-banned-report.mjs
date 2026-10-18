// Per-term proof for the final report: counts each banned name and en/em dashes in every text
// file under dist/ (and file names), plus the text extracted from the resume PDF.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

const terms = ['Mainland Motors', 'Mainland Motors Autogroup', 'Mainland Motors Abbotsford', 'Mainland', 'MapSense', 'MapSense Media', 'Map Sense', 'C2C Rental', 'C2C', 'c2crental', 'EV Studio', 'Shift to Drive', 'Mainland Lube', 'Keystone Drywall', 'That Brownie Girl', 'ALPS', 'alps-muse-forge', 'Little Anna']
const textExt = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.webmanifest'])
const files = []
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : files.push(join(d, f))))
walk('dist')
const distText = files.filter((f) => textExt.has(extname(f))).map((f) => readFileSync(f, 'utf8')).join('\n')
const names = files.join('\n')
const doc = await getDocument({ data: new Uint8Array(readFileSync('public/assets/MHM-Resume.pdf')) }).promise
let pdf = ''
for (let i = 1; i <= doc.numPages; i++) pdf += (await (await doc.getPage(i)).getTextContent()).items.map((t) => t.str).join(' ')

const count = (s, t) => (s.match(t instanceof RegExp ? t : new RegExp(t === 'ALPS' || t === 'C2C' ? `\\b${t}\\b` : t.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&'), t === 'ALPS' || t === 'C2C' ? 'g' : 'gi')) ?? []).length
console.log(`${files.length} files in dist (${files.filter((f) => textExt.has(extname(f))).length} text), PDF ${doc.numPages} pages\n`)
console.log('term'.padEnd(30), 'dist text', 'dist names', 'PDF')
let total = 0
for (const t of [...terms, ['em dash U+2014', /—/g], ['en dash U+2013', /–/g]]) {
  const [label, re] = Array.isArray(t) ? t : [t, t]
  const row = [count(distText, re), count(names, re), count(pdf, re)]
  total += row.reduce((a, b) => a + b, 0)
  console.log(label.padEnd(30), String(row[0]).padStart(9), String(row[1]).padStart(10), String(row[2]).padStart(3))
}
console.log(`\ntotal matches: ${total}`)
process.exit(total ? 1 : 0)
