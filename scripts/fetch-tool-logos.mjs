// Downloads the logos for the hero "Tools I use" strip and renders each to a trimmed 96px-tall
// PNG in public/media/tools/<slug>.png. Simple Icons (CC0) supplies most marks, filled with the
// brand colour from its data file; brands that Simple Icons does not carry come from the brand's
// own site or its Wikimedia Commons file. Usage: node scripts/fetch-tool-logos.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'
import { tools } from '../src/data/tools.ts'

const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@16.35.0'
const commons = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}`
// Brands missing from Simple Icons.
const external = {
  illustrator: commons('Adobe_Illustrator_CC_icon.svg'),
  photoshop: commons('Adobe_Photoshop_CC_icon.svg'),
  openai: commons('OpenAI_Logo.svg'),
  twilio: commons('Twilio-logo-red.svg'),
  midjourney: commons('Midjourney_Emblem.svg'),
  lovable: 'https://lovable.dev/favicon.svg',
  clarity: 'https://claritystatic.azureedge.net/images/logo.svg',
  remotion: 'https://www.remotion.dev/img/logo-small.png',
}

const get = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (portfolio logo fetch)' }, redirect: 'follow' })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

const siData = JSON.parse((await get(`${SI}/data/simple-icons.json`)).toString())
const hexFor = (slug) => siData.find((i) => (i.slug ?? '') === slug)?.hex

mkdirSync('public/media/tools', { recursive: true })
for (const t of tools) {
  let input
  if (external[t.slug]) {
    input = await get(external[t.slug])
  } else {
    const svg = (await get(`${SI}/icons/${t.source}.svg`)).toString()
    const hex = hexFor(t.source) ?? '1a1a1a'
    input = Buffer.from(svg.replace('<svg ', `<svg fill="#${hex}" `))
  }
  let png = await sharp(input, { density: 600 }).resize({ height: 96, fit: 'inside' }).trim().resize({ height: 96, fit: 'inside' }).png().toBuffer()
  // Wordmark logos: keep the square mark on the left so the label is not repeated.
  if (t.markOnly) png = await sharp(png).extract({ left: 0, top: 0, width: 96, height: 96 }).trim().png().toBuffer()
  writeFileSync(`public/media/tools/${t.slug}.png`, png)
  console.log(`logo: ${t.slug}`)
}
