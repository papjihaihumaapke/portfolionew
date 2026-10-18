// Generates illustrative cover art for projects and shipped sites that have no real media yet,
// plus the hero still. Each design is a pure function of its data (no randomness) rendered to PNG
// with Playwright. Motifs use only verified facts (14 booking states, 11 stations, $26 CPL...),
// never invented UI or numbers. Real screenshots replace these by overwriting the same files.
// Usage: node scripts/make-covers.mjs [--only key] [--force]
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { chromium } from 'playwright'

const font = (f) => `data:font/woff2;base64,${readFileSync(new URL(`../public/fonts/${f}`, import.meta.url)).toString('base64')}`
const C = { ink: '#1a1a1a', cream: '#f5f4f2', surface: '#edecea', line: '#dcdad6', orange: '#e8470a', muted: '#8a8781', dim: '#3a3a3a' }

const page = (w, h, bg, body) => `<!doctype html><html><head><style>
@font-face { font-family: Clash; src: url(${font('clash-display-600.woff2')}); font-weight: 600; }
@font-face { font-family: Outfit; src: url(${font('outfit-latin.woff2')}); font-weight: 300 700; }
* { margin: 0; box-sizing: border-box; }
html, body { width: ${w}px; height: ${h}px; overflow: hidden; background: ${bg}; }
body { position: relative; font-family: Outfit; }
.d { font-family: Clash; font-weight: 600; letter-spacing: -0.035em; line-height: 0.88; position: absolute; }
.u { font-family: Outfit; position: absolute; }
svg { position: absolute; inset: 0; }
</style></head><body>${body}</body></html>`

/* ---------------------------------------------------------------- projects (1600x1200, 4:3) */

const W = 1600
const H = 1200

const covers = {
  // Before / after split: busy lot grid on the left, clean studio floor on the right, one car line across both.
  lotstudio: () => {
    const grid = Array.from({ length: 15 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60 - 300}" y2="${H}" stroke="${C.dim}" stroke-width="2"/>`).join('')
    const car = `M140 760 C 210 755 250 700 330 660 C 420 610 520 560 690 552 C 840 546 960 560 1060 620 C 1150 640 1290 660 1370 700 C 1430 728 1450 760 1452 790 L 1452 812 L 140 812 Z`
    return page(W, H, C.ink, `
<svg viewBox="0 0 ${W} ${H}">
  <defs><clipPath id="L"><rect width="800" height="${H}"/></clipPath><clipPath id="R"><rect x="800" width="800" height="${H}"/></clipPath>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f4f2"/><stop offset="1" stop-color="#dcdad6"/></linearGradient></defs>
  <g clip-path="url(#L)">${grid}</g>
  <rect x="800" width="800" height="${H}" fill="url(#floor)"/>
  <ellipse cx="800" cy="840" rx="700" ry="34" fill="#000" opacity="0.18"/>
  <g clip-path="url(#L)"><path d="${car}" fill="none" stroke="${C.cream}" stroke-width="10" stroke-linejoin="round"/>
    <circle cx="420" cy="812" r="78" fill="${C.ink}" stroke="${C.cream}" stroke-width="10"/></g>
  <g clip-path="url(#R)"><path d="${car}" fill="${C.ink}"/>
    <circle cx="1170" cy="812" r="78" fill="${C.ink}" stroke="${C.cream}" stroke-width="10"/><circle cx="1170" cy="812" r="30" fill="${C.cream}"/></g>
  <rect x="797" y="0" width="6" height="${H}" fill="${C.orange}"/>
  <circle cx="800" cy="600" r="34" fill="${C.orange}"/>
  <path d="M786 588 l-12 12 12 12 M814 588 l12 12 -12 12" stroke="${C.cream}" stroke-width="5" fill="none"/>
</svg>
<div class="u" style="left:80px;top:72px;color:${C.muted};font-size:30px;letter-spacing:.16em">BEFORE</div>
<div class="u" style="right:80px;top:72px;color:${C.dim};font-size:30px;letter-spacing:.16em">AFTER</div>
<div class="d" style="left:72px;bottom:70px;font-size:150px;color:${C.cream}">LotStudio<span style="color:${C.orange}">.</span></div>`)
  },

  // 20+ modules as a tile grid; names are the platform's real modules.
  dealership: () => {
    const mods = ['Inventory', 'DMS sync', 'VIN decode', 'SEO copy', 'Search', 'Photos', 'Landing pages', 'UTM builder', 'Attribution', 'GA4 events', 'Heatmaps', 'Sessions', 'Leads', 'Customers', 'Funnels', 'Revenue', 'Email', 'Segments', 'Tracking', 'Admin']
    const tiles = mods.map((m, i) => {
      const x = 80 + (i % 5) * 292
      const y = 300 + Math.floor(i / 5) * 160
      const hot = [2, 8, 16].includes(i)
      return `<rect x="${x}" y="${y}" width="272" height="140" fill="${hot ? C.orange : '#fff'}" stroke="${hot ? C.orange : C.line}" stroke-width="2"/>
      <text x="${x + 24}" y="${y + 84}" font-family="Outfit" font-size="30" font-weight="500" fill="${hot ? '#fff' : C.ink}">${m}</text>`
    }).join('')
    return page(W, H, C.cream, `<svg viewBox="0 0 ${W} ${H}">${tiles}</svg>
<div class="d" style="left:76px;top:70px;font-size:170px;color:${C.ink}">20+<span style="color:${C.orange}">.</span></div>
<div class="u" style="left:520px;top:118px;font-size:38px;line-height:1.25;color:${C.ink};font-weight:500">core modules,<br/>one dealership platform</div>`)
  },

  // 14 booking lifecycle states as a ring.
  rental: () => {
    const cx = 1080
    const cy = 600
    const r = 380
    const dots = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 - Math.PI / 2
      const x = cx + r * Math.cos(a)
      const y = cy + r * Math.sin(a)
      const on = i < 9
      return `<circle cx="${x}" cy="${y}" r="${i === 8 ? 40 : 28}" fill="${i === 8 ? C.orange : on ? C.cream : C.ink}" stroke="${C.cream}" stroke-width="4"/>
      <text x="${x}" y="${y + 10}" text-anchor="middle" font-family="Outfit" font-size="26" font-weight="600" fill="${on || i === 8 ? C.ink : C.cream}">${i + 1}</text>`
    }).join('')
    const arc = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.dim}" stroke-width="4"/>`
    return page(W, H, C.ink, `<svg viewBox="0 0 ${W} ${H}">${arc}${dots}</svg>
<div class="d" style="left:72px;top:330px;font-size:300px;color:${C.cream}">14</div>
<div class="u" style="left:84px;top:640px;font-size:40px;line-height:1.25;color:${C.cream};font-weight:500">booking lifecycle<br/>states, mapped</div>
<div class="u" style="left:84px;bottom:80px;font-size:28px;letter-spacing:.16em;color:${C.muted}">HOST · RENTER · ADMIN</div>`)
  },

  // Owner -> 2 managers -> 11 stations (5 + 6).
  sitetask: () => {
    const owner = { x: 800, y: 300 }
    const mgr = [{ x: 470, y: 560 }, { x: 1130, y: 560 }]
    // 11 stations evenly spaced with a wider gap between the two managers' groups.
    const st = Array.from({ length: 11 }, (_, i) => ({ x: 150 + i * 118 + (i > 4 ? 64 : 0), y: 860, m: i > 4 ? 1 : 0 }))
    const line = (a, b) => `<path d="M${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2} ${b.x} ${(a.y + b.y) / 2} ${b.x} ${b.y}" fill="none" stroke="${C.line}" stroke-width="4"/>`
    const svg = [mgr.map((m) => line(owner, m)).join(''), st.map((s) => line(mgr[s.m], s)).join(''),
      `<rect x="${owner.x - 120}" y="${owner.y - 50}" width="240" height="100" fill="${C.ink}"/><text x="${owner.x}" y="${owner.y + 12}" text-anchor="middle" font-family="Outfit" font-size="34" font-weight="600" fill="#fff">Owner</text>`,
      mgr.map((m, i) => `<rect x="${m.x - 140}" y="${m.y - 46}" width="280" height="92" fill="#fff" stroke="${C.ink}" stroke-width="3"/><text x="${m.x}" y="${m.y + 12}" text-anchor="middle" font-family="Outfit" font-size="32" font-weight="600" fill="${C.ink}">Manager · ${i ? 6 : 5} sites</text>`).join(''),
      st.map((s, i) => `<circle cx="${s.x}" cy="${s.y}" r="44" fill="${i === 7 ? C.orange : '#fff'}" stroke="${i === 7 ? C.orange : C.ink}" stroke-width="3"/>${i === 7 ? `<path d="M${s.x - 16} ${s.y} l11 12 l22 -24" stroke="#fff" stroke-width="7" fill="none"/>` : ''}`).join('')].join('')
    return page(W, H, C.cream, `<svg viewBox="0 0 ${W} ${H}">${svg}</svg>
<div class="d" style="left:72px;top:70px;font-size:120px;color:${C.ink}">SiteTask<span style="color:${C.orange}">.</span></div>
<div class="u" style="right:76px;top:96px;font-size:34px;color:${C.ink};font-weight:500">11 stations</div>
<div class="u" style="left:76px;bottom:72px;font-size:30px;color:#5f5f5f">Assign · prove with a photo · see what is overdue</div>`)
  },

  // Voice waveform flowing into the conversation path.
  voice: () => {
    const bars = Array.from({ length: 46 }, (_, i) => {
      const h = 40 + Math.abs(Math.sin(i * 0.55) * 170 + Math.sin(i * 1.7) * 60)
      return `<rect x="${80 + i * 16}" y="${520 - h / 2}" width="8" height="${h}" rx="4" fill="${i > 38 ? C.orange : C.cream}" opacity="${i > 38 ? 1 : 0.35 + (i / 46) * 0.65}"/>`
    }).join('')
    const nodes = [['Intent', 960, 360, C.orange], ['Booking', 1300, 230, '#fff'], ['Lead', 1300, 520, '#fff'], ['Handoff', 1300, 810, C.ink]]
    const links = [[870, 520, 960, 410], [1180, 400, 1300, 280], [1180, 400, 1300, 570], [1180, 400, 1300, 860]]
      .map(([a, b, c, d]) => `<path d="M${a} ${b} C ${(a + c) / 2} ${b} ${(a + c) / 2} ${d} ${c} ${d}" stroke="${C.dim}" stroke-width="4" fill="none"/>`).join('')
    const boxes = nodes.map(([t, x, y, f]) => `<rect x="${x - 120}" y="${y}" width="${t === 'Intent' ? 340 : 240}" height="100" fill="${f}" stroke="${f === C.ink ? C.cream : f}" stroke-width="3"/>
      <text x="${x - 96}" y="${y + 62}" font-family="Outfit" font-size="36" font-weight="600" fill="${f === '#fff' ? C.ink : '#fff'}">${t}</text>`).join('')
    return page(W, H, C.ink, `<svg viewBox="0 0 ${W} ${H}">${bars}${links}${boxes}</svg>
<div class="d" style="left:72px;bottom:70px;font-size:132px;color:${C.cream}">Voice &amp; chat<br/>agents<span style="color:${C.orange}">.</span></div>`)
  },

  // Ad formats 4:5 and 9:16 with the lowest cost per lead.
  ev: () => page(W, H, C.cream, `
<div style="position:absolute;left:820px;top:170px;width:400px;height:500px;background:${C.ink}"></div>
<div style="position:absolute;left:1260px;top:110px;width:270px;height:480px;background:${C.orange}"></div>
<div class="u" style="left:850px;top:200px;font-size:26px;letter-spacing:.14em;color:${C.muted}">4:5</div>
<div class="u" style="left:1286px;top:136px;font-size:26px;letter-spacing:.14em;color:#fff">9:16</div>
<svg viewBox="0 0 ${W} ${H}"><path d="M880 600 C 960 560 1000 520 1040 520 C 1100 520 1120 560 1180 560" stroke="${C.cream}" stroke-width="10" fill="none"/>
<circle cx="930" cy="610" r="26" fill="none" stroke="${C.cream}" stroke-width="8"/><circle cx="1130" cy="610" r="26" fill="none" stroke="${C.cream}" stroke-width="8"/></svg>
<div class="d" style="left:72px;top:160px;font-size:330px;color:${C.ink}">$26</div>
<div class="u" style="left:84px;top:490px;font-size:40px;line-height:1.25;color:${C.ink};font-weight:500">lowest cost per lead</div>
<div style="position:absolute;left:80px;right:80px;top:760px;height:3px;background:${C.ink}"></div>
<div class="d" style="left:72px;top:800px;font-size:180px;color:${C.ink}">48</div>
<div class="u" style="left:330px;top:850px;font-size:36px;line-height:1.25;color:${C.ink};font-weight:500">vehicles in the<br/>launch catalogue</div>
<div class="u" style="right:80px;top:870px;font-size:30px;color:#5f5f5f;text-align:right">Forms cut<br/>15 to 12 fields</div>`),

  // Keyframes and easing curves on a timeline.
  motion: () => {
    const curve = (y, c) => `<path d="M80 ${y + 160} C 560 ${y + 160} 620 ${y} 1520 ${y}" stroke="${c}" stroke-width="6" fill="none"/>`
    const keys = [80, 420, 760, 1100, 1520].map((x, i) => `<rect x="${x - 18}" y="882" width="36" height="36" transform="rotate(45 ${x} 900)" fill="${i === 2 ? C.orange : C.cream}"/>`).join('')
    const ticks = Array.from({ length: 49 }, (_, i) => `<line x1="${80 + i * 30}" y1="${i % 4 ? 960 : 950}" x2="${80 + i * 30}" y2="980" stroke="${C.dim}" stroke-width="3"/>`).join('')
    return page(W, H, C.ink, `<svg viewBox="0 0 ${W} ${H}">${curve(330, C.dim)}${curve(470, C.dim)}${curve(610, C.orange)}
<line x1="80" y1="900" x2="1520" y2="900" stroke="${C.dim}" stroke-width="3"/>${keys}${ticks}
<line x1="760" y1="300" x2="760" y2="1000" stroke="${C.orange}" stroke-width="3"/></svg>
<div class="d" style="left:72px;top:70px;font-size:150px;color:${C.cream}">Motion<span style="color:${C.orange}">.</span></div>
<div class="u" style="right:80px;top:110px;font-size:32px;color:${C.muted}">Claude · Remotion · GSAP</div>`)
  },
}

/* ------------------------------------------------------------ shipped sites (1600x1000, 16:10) */

const siteArt = {
  'dealership-group': { bg: C.ink, fg: C.cream, label: 'Dealership group', kind: 'inventory' },
  'ev-dealership': { bg: C.cream, fg: C.ink, label: 'EV dealership', kind: 'hero' },
  'online-car-buying': { bg: C.surface, fg: C.ink, label: 'Buy online', kind: 'steps' },
  'dessert-bakery': { bg: '#f3e9e2', fg: C.ink, label: 'Dessert bakery', kind: 'gallery' },
  'drywall-contractor': { bg: C.ink, fg: C.cream, label: 'Drywall contractor', kind: 'services' },
  'auto-service': { bg: C.cream, fg: C.ink, label: 'Lube & service', kind: 'services' },
  'cakes-bakery': { bg: '#1d2a44', fg: '#f3ead8', label: 'Cakes & pastries', kind: 'gallery', accent: '#c9a54c' },
}

function siteCover({ bg, fg, label, kind, accent = C.orange }) {
  const w = 1600
  const h = 1000
  const block = (x, y, bw, bh, o = 0.12) => `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${fg}" opacity="${o}"/>`
  const layouts = {
    inventory: [0, 1, 2, 3, 4, 5].map((i) => block(120 + (i % 3) * 460, 470 + Math.floor(i / 3) * 230, 420, 200)).join(''),
    hero: block(120, 470, 1360, 320, 0.1) + `<circle cx="1220" cy="630" r="110" fill="${accent}"/>`,
    steps: [0, 1, 2, 3].map((i) => block(120 + i * 345, 520, 315, 240) + `<text x="${150 + i * 345}" y="600" font-family="Outfit" font-size="44" font-weight="600" fill="${fg}">${i + 1}</text>`).join(''),
    gallery: [0, 1, 2, 3].map((i) => `<circle cx="${290 + i * 340}" cy="660" r="140" fill="${fg}" opacity="${i === 1 ? 0 : 0.12}"/>`).join('') + `<circle cx="630" cy="660" r="140" fill="${accent}"/>`,
    services: [0, 1, 2].map((i) => block(120 + i * 460, 480, 420, 330) + `<rect x="${150 + i * 460}" y="520" width="80" height="8" fill="${accent}"/>`).join(''),
  }
  return page(w, h, bg, `<svg viewBox="0 0 ${w} ${h}">
  <rect x="0" y="0" width="${w}" height="84" fill="${fg}" opacity="0.07"/>
  ${[0, 1, 2].map((i) => `<circle cx="${50 + i * 34}" cy="42" r="10" fill="${fg}" opacity="0.3"/>`).join('')}
  ${[0, 1, 2, 3].map((i) => `<rect x="${980 + i * 140}" y="36" width="100" height="12" fill="${fg}" opacity="0.25"/>`).join('')}
  ${layouts[kind]}
  <rect x="120" y="380" width="200" height="10" fill="${accent}"/></svg>
<div class="d" style="left:112px;top:180px;font-size:132px;color:${fg}">${label}</div>`)
}

/* ------------------------------------------------------------------ hero still (1200x1500, 4:5) */

const hero = () => {
  const lines = Array.from({ length: 9 }, (_, i) => `<path d="M-40 ${1500 - i * 70} C 400 ${1500 - i * 70} 520 ${560 + i * 40} 1240 ${520 + i * 40}" stroke="${i === 4 ? C.orange : C.dim}" stroke-width="${i === 4 ? 8 : 3}" fill="none"/>`).join('')
  return page(1200, 1500, C.ink, `<svg viewBox="0 0 1200 1500">${lines}
<rect x="640" y="820" width="440" height="380" fill="none" stroke="${C.cream}" stroke-width="4"/>
<rect x="700" y="880" width="320" height="180" fill="${C.cream}" opacity=".12"/><rect x="700" y="1090" width="200" height="22" fill="${C.cream}" opacity=".3"/>
<circle cx="1020" cy="1160" r="44" fill="${C.orange}"/></svg>
<div class="d" style="left:72px;top:90px;font-size:230px;color:${C.cream}">Design.<br/>Build.<br/><span style="color:${C.orange}">Ship.</span></div>
<div class="u" style="left:80px;bottom:90px;font-size:36px;line-height:1.35;color:#b3b3b3">Product design, front-end,<br/>AI tools and motion.</div>`)
}

/* -------------------------------------------------------------------------------- render */

const jobs = [
  ['public/media/lotstudio/cover.png', W, H, covers.lotstudio],
  ['public/media/dealership/cover.png', W, H, covers.dealership],
  ['public/media/rental/cover.png', W, H, covers.rental],
  ['public/media/sitetask/cover.png', W, H, covers.sitetask],
  ['public/media/voice-agents/cover.png', W, H, covers.voice],
  ['public/media/ev-campaign/cover.png', W, H, covers.ev],
  ['public/media/motion/cover.png', W, H, covers.motion],
  ['public/media/motion/hero.png', 1200, 1500, hero],
  ...Object.entries(siteArt).map(([slug, a]) => [`public/media/sites/${slug}-desktop.png`, 1600, 1000, () => siteCover(a)]),
]

const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
const force = process.argv.includes('--force')
const browser = await chromium.launch()
const tab = await browser.newPage()
let n = 0
for (const [out, w, h, make] of jobs) {
  if (only && !out.includes(only)) continue
  // Never overwrite real media unless asked; generated art is only a stand-in.
  if (existsSync(out) && !force) continue
  mkdirSync(dirname(out), { recursive: true })
  await tab.setViewportSize({ width: w, height: h })
  await tab.setContent(make())
  await tab.evaluate(() => document.fonts.ready)
  await tab.screenshot({ path: out })
  n++
}
await browser.close()
console.log(`covers: rendered ${n}`)
