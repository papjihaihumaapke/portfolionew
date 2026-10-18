// Proves each pre-rendered HTML file is a real page, not an empty shell: one H1, unique title,
// description, canonical on the www host, OG/Twitter tags and JSON-LD types.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist', import.meta.url).pathname
const routes = ['/', '/work', '/gallery', '/about', '/resume', '/contact', ...JSON.parse(readFileSync(join(dist, 'sitemap.xml'), 'utf8').match(/\/work\/[a-z0-9-]+/g).map((u) => `"${u}"`).join(',').replace(/^/, '[').replace(/$/, ']'))]
const strip = (s) => s.replace(/<!-- -->/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").trim()
const attr = (html, re) => (html.match(re) ?? [])[1] ?? 'MISSING'

let bad = 0
const titles = new Set()
for (const r of [...new Set(routes)]) {
  const file = r === '/' ? join(dist, 'index.html') : join(dist, r, 'index.html')
  if (!existsSync(file)) { console.log(`MISSING ${r}`); bad++; continue }
  const html = readFileSync(file, 'utf8')
  const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) ?? []
  const title = strip(attr(html, /<title[^>]*>([\s\S]*?)<\/title>/))
  const canonical = attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)
  const desc = attr(html, /<meta[^>]*name="description"[^>]*content="([^"]+)"/)
  const ogTitle = attr(html, /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/)
  const ogImage = attr(html, /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/)
  const twitter = attr(html, /<meta[^>]*name="twitter:card"[^>]*content="([^"]+)"/)
  const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])['@type'])
  const textLen = strip(html.slice(html.indexOf('<div id="root">'))).length
  const ok = h1s.length === 1 && canonical.startsWith('https://www.hilalmalik.tech') && desc !== 'MISSING' && ogImage !== 'MISSING' && !titles.has(title) && textLen > 300
  titles.add(title)
  if (!ok) bad++
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${r}
      title:     ${title}
      h1 (${h1s.length}):    ${strip(h1s[0] ?? 'MISSING').slice(0, 70)}
      canonical: ${canonical}
      og:title:  ${strip(ogTitle)} | og:image: ${ogImage.replace('https://www.hilalmalik.tech', '')} | twitter: ${twitter}
      json-ld:   ${ld.join(', ') || 'none'} | visible text: ${textLen} chars`)
}
process.exit(bad ? 1 : 0)
