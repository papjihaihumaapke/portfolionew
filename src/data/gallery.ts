/**
 * Gallery: every video and image sample. Keys are extensionless media paths; items whose
 * file is missing are skipped at render time. Sources for videos and graphics live in
 * media-src/ (outside the build); web versions live under public/media.
 */

export type GalleryKind = 'video' | 'image'
export type GalleryGroup = 'Motion design' | 'AI video' | 'Brand identity' | 'Social & ads' | 'AI product imagery' | 'Coursework' | 'Personal projects'

export interface GalleryItem {
  key: string
  kind: GalleryKind
  title: string
  group: GalleryGroup
  /** Shown on the tile; videos use 9 / 16 or 16 / 9, images use their own ratio. */
  ratio?: string
}

const g = (n: number) => `/media/gallery/graphics/graphic-${String(n).padStart(2, '0')}`

export const gallery: GalleryItem[] = [
  // Motion and AI video
  { key: '/media/motion/the-whole-loop', kind: 'video', title: 'The whole loop, brand film coded in Remotion', group: 'Motion design', ratio: '16 / 9' },
  { key: '/media/motion/showreel', kind: 'video', title: 'Showreel, designed and coded with AI', group: 'Motion design', ratio: '9 / 16' },
  { key: '/media/gallery/sunscreen-motion', kind: 'video', title: 'Sunscreen motion ad', group: 'Motion design', ratio: '16 / 9' },
  { key: '/media/gallery/perfume-island', kind: 'video', title: 'Dunes & Scents, perfume commercial on a hidden island', group: 'AI video', ratio: '9 / 16' },
  { key: '/media/gallery/perfume-jungle', kind: 'video', title: 'Dunes & Scents, perfume in a tropical jungle', group: 'AI video', ratio: '9 / 16' },
  { key: '/media/gallery/perfume-rocks', kind: 'video', title: 'Dunes & Scents, bottle floating between rocks', group: 'AI video', ratio: '9 / 16' },
  { key: '/media/gallery/perfume-oud', kind: 'video', title: 'Dunes & Scents, oud and saffron film', group: 'AI video', ratio: '9 / 16' },
  { key: '/media/gallery/product-shoot', kind: 'video', title: 'Cinematic product shoot', group: 'AI video', ratio: '9 / 16' },
  { key: '/media/gallery/product-shoot-textless', kind: 'video', title: 'Cinematic product shoot, textless cut', group: 'AI video', ratio: '9 / 16' },

  // Brand identity
  { key: g(2), kind: 'image', title: 'Little Anna, mascot logo', group: 'Brand identity' },
  { key: g(1), kind: 'image', title: 'Little Anna, apron and cake', group: 'Brand identity' },
  { key: g(3), kind: 'image', title: 'Little Anna, pattern packaging', group: 'Brand identity' },
  { key: g(4), kind: 'image', title: 'Little Anna, coffee cup sleeve', group: 'Brand identity' },
  { key: g(5), kind: 'image', title: 'Little Anna, staff tee', group: 'Brand identity' },
  { key: g(6), kind: 'image', title: 'Little Anna, delivery boxes', group: 'Brand identity' },
  { key: g(30), kind: 'image', title: 'Desert Fox, wordmark', group: 'Brand identity' },
  { key: g(31), kind: 'image', title: 'Desert Fox, badge mark', group: 'Brand identity' },
  { key: g(32), kind: 'image', title: 'Desert Fox, horizontal lockup', group: 'Brand identity' },
  { key: g(24), kind: 'image', title: 'Desert Fox, primary logo', group: 'Brand identity' },
  { key: g(25), kind: 'image', title: 'Desert Fox, apparel', group: 'Brand identity' },
  { key: g(26), kind: 'image', title: 'Desert Fox, stickers and cup', group: 'Brand identity' },
  { key: g(27), kind: 'image', title: 'Desert Fox, churro packaging', group: 'Brand identity' },
  { key: g(28), kind: 'image', title: 'Desert Fox, festival stall', group: 'Brand identity' },
  { key: g(29), kind: 'image', title: 'Desert Fox, Instagram profile', group: 'Brand identity' },
  { key: g(22), kind: 'image', title: 'Go Green Mowing, logo', group: 'Brand identity' },
  { key: g(14), kind: 'image', title: 'Wall Canvas, logo', group: 'Brand identity' },

  // Social and ads
  { key: g(7), kind: 'image', title: 'Wall Canvas, Good Vibes neon ad', group: 'Social & ads' },
  { key: g(8), kind: 'image', title: 'Wall Canvas, “Even the non living can’t resist”', group: 'Social & ads' },
  { key: g(23), kind: 'image', title: 'Go Green Mowing, services post', group: 'Social & ads' },
  { key: g(21), kind: 'image', title: 'Podcast studio, $60 per session ad', group: 'Social & ads' },
  { key: g(15), kind: 'image', title: 'Butter chicken $5.99 promo', group: 'Social & ads' },
  { key: g(16), kind: 'image', title: '“What is on the menu?” agency post', group: 'Social & ads' },
  { key: g(17), kind: 'image', title: 'Behind the scenes carousel cover', group: 'Social & ads' },
  { key: g(18), kind: 'image', title: 'Brownie brand, “Gone in 20 minutes”', group: 'Social & ads' },

  // AI product imagery
  { key: g(9), kind: 'image', title: 'Dunes & Scents, five signature scents', group: 'AI product imagery' },
  { key: g(10), kind: 'image', title: 'Dunes & Scents, the fragrance wardrobe', group: 'AI product imagery' },
  { key: g(11), kind: 'image', title: 'Dunes & Scents, Dune Oud', group: 'AI product imagery' },
  { key: g(12), kind: 'image', title: 'Dunes & Scents, Jazeerah', group: 'AI product imagery' },
  { key: g(13), kind: 'image', title: 'Dunes & Scents, Jazeerah in the jungle', group: 'AI product imagery' },
  { key: g(19), kind: 'image', title: 'Dunes & Scents, Rihla with vanilla', group: 'AI product imagery' },
  { key: g(20), kind: 'image', title: 'Dunes & Scents, Rihla with blood orange', group: 'AI product imagery' },

  // Coursework (KPU)
  ...[
    ['musify-hero', 'Musify, live stage identity'],
    ['musify-principles', 'Musify, motion recipe'],
    ['musify-curtain', 'Musify, curtain reveal'],
    ['musify-magnetic', 'Musify, magnetic button'],
    ['musify-scroll', 'Musify, transformative scrolling'],
    ['motionlib-overview', 'Purposeful Motion, overview'],
    ['motionlib-components', 'Purposeful Motion, components'],
    ['motionlib-storyboard', 'Purposeful Motion, storyboard'],
    ['healthycity-overview', 'Healthy City, project overview'],
    ['healthycity-roadmap', 'Healthy City, roadmap'],
    ['healthycity-wbs', 'Healthy City, work breakdown'],
    ['acminder-hero', 'Acminder, capstone cover'],
    ['acminder-persona', 'Acminder, persona'],
    ['acminder-compare', 'Acminder, comparative analysis'],
    ['acminder-signup', 'Acminder, annotated sign-up'],
    ['acminder-flow', 'Acminder, task flow'],
  ].map(([file, title]): GalleryItem => ({ key: `/assets/case-studies/${file}`, kind: 'image', title, group: 'Coursework' })),
  { key: '/assets/hero-banner', kind: 'image', title: 'Personal brand banner', group: 'Brand identity' },

  // Personal projects
  { key: '/media/zara/cover', kind: 'image', title: 'Zara redesign, laptop and tablet wireframes', group: 'Personal projects' },
  { key: '/media/zara/discovery', kind: 'image', title: 'Zara redesign, key findings', group: 'Personal projects' },
  { key: '/media/zara/process', kind: 'image', title: 'Zara redesign, mobile wireframes', group: 'Personal projects' },
  { key: '/media/zara/solution', kind: 'image', title: 'Zara redesign, mobile shopping flow', group: 'Personal projects' },
  { key: '/media/mini-minds/cover', kind: 'image', title: 'Mini Minds, app logo', group: 'Personal projects' },
  { key: '/media/mini-minds/discovery', kind: 'image', title: 'Mini Minds, parent empathy map', group: 'Personal projects' },
  { key: '/media/mini-minds/process', kind: 'image', title: 'Mini Minds, heuristic evaluation', group: 'Personal projects' },
  { key: '/media/mini-minds/solution', kind: 'image', title: 'Mini Minds, high-fidelity screens', group: 'Personal projects' },
]

export const galleryGroups: GalleryGroup[] = ['Motion design', 'AI video', 'Brand identity', 'Social & ads', 'AI product imagery', 'Coursework', 'Personal projects']
