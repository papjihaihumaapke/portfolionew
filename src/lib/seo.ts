import type { Project } from '../data/projects'
import { site } from '../data/site'

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.title,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}/og/site.png`,
  address: { '@type': 'PostalAddress', addressLocality: 'Vancouver', addressRegion: 'BC', addressCountry: 'CA' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Kwantlen Polytechnic University' },
  sameAs: site.socialLinks.map((l) => l.href),
}

/** CreativeWork for a case study. Uses only the generic client description, never a brand. */
export function projectJsonLd(p: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    headline: p.title,
    description: p.summary,
    url: `${site.url}/work/${p.slug}`,
    image: `${site.url}${p.ogImage}`,
    creator: { '@type': 'Person', name: site.name, url: site.url },
    genre: p.type === 'coursework' ? 'Coursework' : p.type === 'personal' ? 'Personal project' : 'Professional work',
    keywords: p.tags.join(', '),
    creativeWorkStatus: p.status === 'in-progress' ? 'In progress' : 'Published',
  }
}
