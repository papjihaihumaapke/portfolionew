import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeContent } from '../../data/home'
import { sites } from '../../data/sites'
import { Picture } from '../ui/Picture'
import { SectionLabel } from '../ui/SectionLabel'

/** Compact horizontal row of the 8 shipped sites. Native scrolling, no scroll-jacking. */
export function SitesStrip() {
  const c = homeContent.sites
  return (
    <section aria-labelledby="sites-title" className="section bg-surface">
      <div className="container-page mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <SectionLabel>{c.label}</SectionLabel>
          <h2 id="sites-title" className="h2">{c.headline}</h2>
          <p className="text-muted">{c.note}</p>
        </div>
        <Link to="/work#websites" className="link-underline inline-flex items-center gap-2 font-medium">
          {c.cta}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <ul className="container-page flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4" aria-label="Website thumbnails">
        {sites.map((s) => (
          <li key={s.slug} className="w-[min(78vw,320px)] shrink-0 snap-start">
            <Link to={`/work#site-${s.slug}`} className="group block space-y-3">
              <Picture
                src={s.desktop}
                alt={`${s.label}, website preview`}
                ratio="16 / 10"
                sizes="320px"
                imgClassName="aspect-[16/10] w-full object-cover object-top"
              />
              <p className="font-medium leading-snug group-hover:text-accent-ink transition-colors duration-base">{s.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
