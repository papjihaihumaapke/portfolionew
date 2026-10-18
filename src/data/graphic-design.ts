/**
 * Graphic design work grouped by brand. Images are web copies of media-src/graphic-design-work
 * in public/media/gallery/graphics (graphic-NN). Descriptions only state what the work shows.
 */

export interface Brand {
  slug: string
  name: string
  descriptor: string
  deliverables: string
  /** Extensionless media keys; the first is shown large. */
  images: { key: string; title: string }[]
  link?: { label: string; href: string }
}

const g = (n: number, title: string) => ({ key: `/media/gallery/graphics/graphic-${String(n).padStart(2, '0')}`, title })

export const brands: Brand[] = [
  {
    slug: 'little-anna',
    name: 'Little Anna',
    descriptor: 'Cakes and pastries bakery',
    deliverables: 'Mascot logo, pattern packaging, cup sleeve, apparel and delivery boxes.',
    images: [
      g(2, 'Little Anna mascot logo'),
      g(1, 'Little Anna branded apron while finishing a cake'),
      g(3, 'Little Anna pattern packaging with pastries'),
      g(4, 'Little Anna coffee cup sleeve'),
      g(5, 'Little Anna staff tee'),
      g(6, 'Little Anna delivery boxes'),
    ],
    link: { label: 'See the website', href: '/work#site-little-anna' },
  },
  {
    slug: 'desert-fox',
    name: 'Desert Fox',
    descriptor: 'Sweet festival desserts',
    deliverables: 'Logo suite, apparel, stickers, packaging, festival stall and Instagram profile.',
    images: [
      g(24, 'Desert Fox primary logo with the fox mascot'),
      g(30, 'Desert Fox wordmark'),
      g(31, 'Desert Fox badge mark'),
      g(32, 'Desert Fox horizontal lockup'),
      g(25, 'Desert Fox tees and cap'),
      g(26, 'Desert Fox stickers and cup'),
      g(27, 'Desert Fox churro box and napkin'),
      g(28, 'Desert Fox festival stall'),
      g(29, 'Desert Fox Instagram profile on a phone'),
    ],
  },
  {
    slug: 'dunes-and-scents',
    name: 'Dunes & Scents',
    descriptor: 'Fragrance house',
    deliverables: 'AI product imagery for a five-scent fragrance line.',
    images: [
      g(9, 'Dunes & Scents, five signature scents'),
      g(10, 'Dunes & Scents, the fragrance wardrobe'),
      g(11, 'Dune Oud among red flowers'),
      g(12, 'Jazeerah between volcanic rocks'),
      g(13, 'Jazeerah in the jungle'),
      g(19, 'Rihla with vanilla and smoke'),
      g(20, 'Rihla with blood orange on sand'),
    ],
    link: { label: 'See the product films', href: '/gallery?group=ai-video' },
  },
  {
    slug: 'wall-canvas',
    name: 'Wall Canvas',
    descriptor: 'Neon wall art',
    deliverables: 'Logo and social ads.',
    images: [g(7, 'Wall Canvas “Good Vibes” neon ad'), g(14, 'Wall Canvas logo'), g(8, 'Wall Canvas “Even the non living can’t resist” ad')],
  },
  {
    slug: 'go-green-mowing',
    name: 'Go Green Mowing',
    descriptor: 'Eco-friendly lawn care',
    deliverables: 'Mascot logo and services post.',
    images: [g(22, 'Go Green Mowing mascot logo'), g(23, 'Go Green Mowing services post')],
    link: { label: 'See the website', href: '/work#site-go-green-mowing' },
  },
  {
    slug: 'podcast-studio',
    name: 'Podcast studio',
    descriptor: 'Abbotsford, BC',
    deliverables: 'Social ad.',
    images: [g(21, 'Podcast studio ad, $60 per session')],
  },
  {
    slug: 'restaurant-and-agency-social',
    name: 'Restaurant and agency social',
    descriptor: 'Food and agency content',
    deliverables: 'Social posts and carousel covers.',
    images: [g(15, 'Butter chicken $5.99 promo'), g(16, '“What is on the menu?” agency post'), g(17, '“Behind the scenes” carousel cover')],
  },
  {
    slug: 'brownie-bakery',
    name: 'Brownie bakery',
    descriptor: 'Dessert brand',
    deliverables: 'Social ad.',
    images: [g(18, '“Gone in 20 minutes” brownie box ad')],
  },
]
