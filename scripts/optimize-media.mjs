// Builds responsive AVIF/WebP variants for every source image under public/media and
// public/assets/case-studies, and writes src/data/media-manifest.json.
// Keys are extensionless public paths (e.g. /media/lotstudio/cover). Originals stay
// in public/ for authoring but are removed from dist by scripts/postbuild.mjs.
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, extname, dirname } from 'node:path'
import sharp from 'sharp'

const root = new URL('..', import.meta.url).pathname
const pub = join(root, 'public')
const outDir = join(pub, '_img')
const sources = ['media', 'assets']
const imageExt = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const videoExt = new Set(['.mp4', '.webm'])
const WIDTHS = [480, 960, 1600, 2400]

function* walk(dir) {
  if (!existsSync(dir)) return
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) yield* walk(p)
    else yield p
  }
}

const manifest = { images: {}, videos: {} }

for (const src of sources) {
  for (const file of walk(join(pub, src))) {
    const ext = extname(file).toLowerCase()
    const key = '/' + relative(pub, file).slice(0, -ext.length)
    if (videoExt.has(ext)) {
      const v = (manifest.videos[key] ??= { sources: [] })
      v.sources.push({ src: '/' + relative(pub, file), type: ext === '.mp4' ? 'video/mp4' : 'video/webm', bytes: statSync(file).size })
      const poster = ['.jpg', '.png', '.webp'].map((e) => file.slice(0, -ext.length) + '-poster' + e).find(existsSync)
      if (poster) v.poster = key + '-poster'
      continue
    }
    if (!imageExt.has(ext)) continue

    const meta = await sharp(file).metadata()
    const widths = WIDTHS.filter((w) => w < meta.width).concat(meta.width > 2400 ? [] : [meta.width])
    const variants = []
    for (const w of widths) {
      for (const fmt of ['avif', 'webp']) {
        const out = join(outDir, `${key}-${w}.${fmt}`)
        if (!existsSync(out) || statSync(out).mtimeMs < statSync(file).mtimeMs) {
          mkdirSync(dirname(out), { recursive: true })
          await sharp(file).resize({ width: w }).toFormat(fmt, fmt === 'avif' ? { quality: 55 } : { quality: 78 }).toFile(out)
        }
      }
      variants.push(w)
    }
    manifest.images[key] = { width: meta.width, height: meta.height, widths: variants, original: '/' + relative(pub, file) }
  }
}

// Drop variants whose original was removed.
const keep = new Set(Object.entries(manifest.images).flatMap(([k, v]) => v.widths.flatMap((w) => ['avif', 'webp'].map((f) => join(outDir, `${k}-${w}.${f}`)))))
for (const f of walk(outDir)) if (!keep.has(f)) rmSync(f)

writeFileSync(join(root, 'src/data/media-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`media: ${Object.keys(manifest.images).length} images, ${Object.keys(manifest.videos).length} videos`)
