/**
 * Websites shipped. Screenshots are anonymized: no client names, logos or domains,
 * and cards never link to live client sites.
 * Expected files: /public/media/sites/<slug>-desktop.(png|jpg) and <slug>-mobile.(png|jpg).
 */

export interface Site {
  slug: string
  label: string
  did: string
  /** Extensionless media keys. */
  desktop: string
  mobile: string
}

const shots = (slug: string) => ({ desktop: `/media/sites/${slug}-desktop`, mobile: `/media/sites/${slug}-mobile` })

export const sites: Site[] = [
  {
    slug: 'dealership-group',
    label: 'Multi-location car dealership website',
    did: 'Inventory integration, campaign landing pages, UTM tracking and automated lead emails.',
    ...shots('dealership-group'),
  },
  {
    slug: 'ev-dealership',
    label: 'EV dealership website',
    did: 'Designed and built the website for an EV dealership launch.',
    ...shots('ev-dealership'),
  },
  {
    slug: 'online-car-buying',
    label: 'Online car buying website',
    did: 'Buy a car online, end to end.',
    ...shots('online-car-buying'),
  },
  {
    slug: 'dessert-bakery',
    label: 'Dessert bakery brand website',
    did: 'Designed and built the brand website.',
    ...shots('dessert-bakery'),
  },
  {
    slug: 'drywall-contractor',
    label: 'Drywall contractor website',
    did: 'Designed and built the company website.',
    ...shots('drywall-contractor'),
  },
  {
    slug: 'auto-service',
    label: 'Auto lube and service shop website',
    did: 'Designed and built the shop website.',
    ...shots('auto-service'),
  },
  {
    slug: 'fashion-ecommerce',
    label: 'Fashion e-commerce website',
    did: 'Tech apparel store: product catalogue with categories, product pages with colour and size selection, cart and checkout.',
    ...shots('fashion-ecommerce'),
  },
  {
    slug: 'cakes-bakery',
    label: 'Cakes and pastries bakery rebrand',
    did: 'Repositioned a bread bakery as a cakes and pastries shop: a 5-page site with a mascot-led navy, cream and gold identity.',
    ...shots('cakes-bakery'),
  },
]
