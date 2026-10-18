// Link check: every href/src in the pre-rendered HTML. Internal links are requested from the
// local Vercel-like server; external links get a HEAD (falling back to GET).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const base = process.argv[2] ?? 'http://localhost:4174'
const dist = new URL('../dist', import.meta.url).pathname
const files = []
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f === 'index.html' && files.push(join(d, f))))
walk(dist)

const links = new Map()
for (const f of files) {
  const html = readFileSync(f, 'utf8')
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#]+)/g)) {
    if (url.startsWith('mailto:') || url.startsWith('data:')) continue
    if (!links.has(url)) links.set(url, f.replace(dist, '') || '/')
  }
  for (const [, set] of html.matchAll(/srcSet="([^"]+)"/gi)) for (const part of set.split(',')) links.set(part.trim().split(' ')[0], f.replace(dist, ''))
}

let broken = 0
const results = await Promise.all(
  [...links].map(async ([url, from]) => {
    const target = new URL(url, base + from.replace(/index\.html$/, '')).href
    try {
      let res = await fetch(target, { method: 'HEAD', redirect: 'follow' })
      if (res.status >= 400 && url.startsWith('http')) res = await fetch(target, { redirect: 'follow' })
      return { url, from, status: res.status }
    } catch (e) {
      return { url, from, status: 'ERR ' + e.cause?.code }
    }
  }),
)
for (const r of results.sort((a, b) => String(a.url).localeCompare(b.url))) {
  const ok = typeof r.status === 'number' && r.status < 400
  // LinkedIn answers bots with 999; it is not a broken link.
  const soft = r.status === 999
  if (!ok && !soft) broken++
  if (!ok || r.url.startsWith('http')) console.log(`${ok ? 'ok ' : soft ? 'bot' : 'BAD'} ${r.status} ${r.url}${ok ? '' : `  (first seen on ${r.from})`}`)
}
console.log(`${links.size} unique links checked, ${broken} broken`)
process.exit(broken ? 1 : 0)
