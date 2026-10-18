/**
 * Websites shipped. Sites with a `url` are linked by name with a live preview; the rest stay
 * unnamed and unlinked. Screenshots: public/media/sites/<slug>-desktop|mobile|full.png
 * (refresh with `node scripts/capture-sites.mjs`).
 */

export interface Site {
  slug: string
  /** Public name; unnamed sites show only the generic label. */
  name?: string
  label: string
  did: string
  url?: string
  /** False when the site refuses to load in an iframe; the preview then scrolls a full-page capture. */
  embeddable?: boolean
  /** Extensionless media keys. */
  desktop: string
  mobile: string
  full: string
}

const shots = (slug: string) => ({
  desktop: `/media/sites/${slug}-desktop`,
  mobile: `/media/sites/${slug}-mobile`,
  full: `/media/sites/${slug}-full`,
})

export const sites: Site[] = [
  {
    slug: 'mainland-motors-abbotsford',
    name: 'Mainland Motors Abbotsford',
    label: 'Car dealership website',
    did: 'Inventory integration, campaign landing pages, UTM tracking and automated lead emails.',
    url: 'https://mainlandmotorsabbotsford.ca',
    embeddable: true,
    ...shots('mainland-motors-abbotsford'),
  },
  {
    slug: 'ev-studio',
    name: 'EV Studio',
    label: 'EV dealership website',
    did: 'Designed and built the website for an EV dealership launch.',
    url: 'https://evstudio.ca',
    embeddable: true,
    ...shots('ev-studio'),
  },
  {
    slug: 'shift-to-drive',
    name: 'Shift to Drive',
    label: 'Online car buying website',
    did: 'Buy a car online, end to end.',
    url: 'https://shifttodrive.ca',
    embeddable: true,
    ...shots('shift-to-drive'),
  },
  {
    slug: 'mainland-lube',
    name: 'Mainland Lube',
    label: 'Auto lube and service shop website',
    did: 'Designed and built the shop website.',
    url: 'https://mainlandlube.ca',
    embeddable: true,
    ...shots('mainland-lube'),
  },
  {
    slug: 'go-green-mowing',
    name: 'Go Green Mowing',
    label: 'Lawn care company website',
    did: 'Designed and built the company website.',
    url: 'https://gogreenmowing.ca',
    embeddable: false,
    ...shots('go-green-mowing'),
  },
  {
    slug: 'little-anna',
    name: 'Little Anna',
    label: 'Cakes and pastries bakery rebrand',
    did: 'Repositioned a bread bakery as a cakes and pastries shop: a 5-page site with a mascot-led navy, cream and gold identity.',
    url: 'https://littleanna.vercel.app',
    embeddable: true,
    ...shots('little-anna'),
  },
  {
    slug: 'dessert-bakery',
    label: 'Dessert bakery brand website',
    did: 'Designed and built the brand website.',
    ...shots('dessert-bakery'),
  },
  {
    slug: 'fashion-ecommerce',
    label: 'Fashion e-commerce website',
    did: 'Tech apparel store: product catalogue with categories, product pages with colour and size selection, cart and checkout.',
    ...shots('fashion-ecommerce'),
  },
]
