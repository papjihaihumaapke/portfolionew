// Serves dist/ the way Vercel will: directory index.html, 404.html with a 404 status, and the
// redirects from vercel.json, with Brotli for text like Vercel's edge. `vite preview` falls back to the root index.html for every path,
// which breaks hydration checks on pre-rendered routes.
// Usage: node scripts/serve-dist.mjs [port]
import { createServer } from 'node:http'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { createBrotliCompress } from 'node:zlib'

const port = Number(process.argv[2] ?? 4174)
const dist = new URL('../dist', import.meta.url).pathname
const { redirects = [] } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4', '.webm': 'video/webm',
}

createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  let path = decodeURIComponent(url.pathname)
  const r = redirects.find((x) => x.source === path)
  if (r) return res.writeHead(r.statusCode ?? (r.permanent ? 308 : 307), { Location: r.destination }).end()
  if (path.length > 1 && path.endsWith('/')) return res.writeHead(308, { Location: path.slice(0, -1) + url.search }).end()

  let file = join(dist, path)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  let status = 200
  if (!existsSync(file)) {
    file = join(dist, '404.html')
    status = 404
  }
  const type = types[extname(file)] ?? 'application/octet-stream'
  const compress = /text|javascript|json|xml|svg/.test(type) && /\bbr\b/.test(req.headers['accept-encoding'] ?? '')
  res.writeHead(status, { 'Content-Type': type, ...(compress ? { 'Content-Encoding': 'br' } : {}) })
  const body = createReadStream(file)
  if (compress) body.pipe(createBrotliCompress()).pipe(res)
  else body.pipe(res)
}).listen(port, () => console.log(`serving dist on http://localhost:${port}`))
