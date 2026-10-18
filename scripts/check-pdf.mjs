// Verifies the resume PDF: page count (max 2), selectable text, banned names and en/em dashes.
// Usage: node scripts/check-pdf.mjs [path]
import { readFileSync } from 'node:fs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

const path = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? 'public/assets/MHM-Resume.pdf'
const doc = await getDocument({ data: new Uint8Array(readFileSync(path)) }).promise
let text = ''
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i)
  text += (await page.getTextContent()).items.map((t) => t.str).join(' ') + '\n'
}
const banned = ['Mainland', 'MapSense', 'Map Sense', 'C2C', 'c2crental', 'EV Studio', 'Shift to Drive', 'Keystone', 'Brownie Girl', 'ALPS', 'alps-muse', 'Little Anna']
const hits = banned.filter((n) => new RegExp(n === 'ALPS' || n === 'C2C' ? `\\b${n}\\b` : n, 'i').test(text))
const dashes = (text.match(/[–—]/g) ?? []).length
console.log(`pages: ${doc.numPages}`)
console.log(`text characters extracted: ${text.length}`)
console.log(`banned names found: ${hits.length ? hits.join(', ') : 'none'}`)
console.log(`en/em dashes found: ${dashes}`)
if (process.argv.includes('--text')) console.log(text)
process.exit(doc.numPages <= 2 && text.length > 1000 && !hits.length && !dashes ? 0 : 1)
