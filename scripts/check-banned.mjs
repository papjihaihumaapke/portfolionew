// Scans text files for banned client names and en/em dashes. Usage: node scripts/check-banned.mjs <path>...
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const names = [
  'Mainland Motors', 'Mainland Lube', 'Mainland', 'MapSense', 'Map Sense', 'C2C', 'c2crental', 'EV Studio',
  'Shift to Drive', 'Keystone Drywall', 'Keystone', 'That Brownie Girl', 'Brownie Girl', 'ALPS', 'alps-muse', 'Little Anna',
]
const textExt = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.ts', '.tsx', '.md', '.webmanifest'])
const dashes = /[–—]/

function* walk(p) {
  if (statSync(p).isDirectory()) for (const f of readdirSync(p)) yield* walk(join(p, f))
  else yield p
}

let hits = 0
for (const root of process.argv.slice(2)) {
  for (const file of walk(root)) {
    // Media file names count too: no brand may appear in a path.
    for (const n of names) if (file.toLowerCase().includes(n.toLowerCase())) { hits++; console.log(`${file}: file name contains "${n}"`) }
    if (!textExt.has(extname(file))) continue
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      for (const n of names) {
        const re = n === 'ALPS' || n === 'C2C' ? new RegExp(`\\b${n}\\b`) : new RegExp(n, 'i')
        if (re.test(line)) { hits++; console.log(`${file}:${i + 1}: "${n}"`) }
      }
      if (dashes.test(line)) { hits++; console.log(`${file}:${i + 1}: en/em dash`) }
    })
  }
}
console.log(`${hits} hit(s)`)
process.exit(hits ? 1 : 0)
