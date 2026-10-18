// Pre-renders every route to static HTML after `vite build`, then writes sitemap.xml and
// robots.txt and removes original (unoptimized) images from dist.
// Steps: vite build --ssr src/entry-server.tsx --outDir dist-ssr  ->  this script.
import { mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, extname } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')
const SITE = 'https://www.hilalmalik.tech'

const { render, routes } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const fill = ({ html, head }) => template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)

for (const url of routes) {
  const page = await render(url)
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, fill(page))
  console.log(`prerender: ${url}`)
}

// Real 404 page for unknown URLs (served by Vercel with a 404 status).
writeFileSync(join(dist, '404.html'), fill(await render('/this-page-does-not-exist')))
console.log('prerender: 404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`sitemap: ${routes.length} urls`)

// Originals live in public/ for authoring only; the site uses the AVIF/WebP in /_img.
function* walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) yield* walk(p)
    else yield p
  }
}
let removed = 0
for (const sub of ['media', 'assets/case-studies']) {
  try {
    for (const f of walk(join(dist, sub))) {
      if (['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())) {
        rmSync(f)
        removed++
      }
    }
  } catch {
    /* folder may not exist */
  }
}
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`cleanup: removed ${removed} original images from dist`)
