// Lists every image a case study expects that is not in public/ yet (run `npm run media` first).
// Usage: node scripts/missing-media.mjs
import { readFileSync } from 'node:fs'
import { projects } from '../src/data/projects.ts'

const manifest = JSON.parse(readFileSync(new URL('../src/data/media-manifest.json', import.meta.url), 'utf8'))
const have = (key) => key in manifest.images
// The LotStudio before/after slider reads these pairs directly.
const extra = { 'lotstudio-ai': [['/media/lotstudio/before-1', 'Before: original lot photo (exterior)'], ['/media/lotstudio/after-1', 'After: same photo through LotStudio'], ['/media/lotstudio/before-2', 'Before: original lot photo (interior)'], ['/media/lotstudio/after-2', 'After: same interior photo through LotStudio']] }

let total = 0
for (const p of projects) {
  const wanted = [...(extra[p.slug] ?? []), ...p.sections.flatMap((s) => (s.media ?? []).map((m) => [m.src, m.alt]))]
  const missing = wanted.filter(([k]) => !have(k))
  if (!missing.length) continue
  total += missing.length
  console.log(`\n${p.title}`)
  for (const [k, alt] of missing) console.log(`  public${k}.png  ${alt}`)
}
console.log(`\n${total} missing`)
