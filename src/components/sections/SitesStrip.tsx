import { ArrowRight, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { homeContent } from '../../data/home'
import { sites } from '../../data/sites'
import { cn } from '../../lib/utils'
import { Picture } from '../ui/Picture'
import { SectionLabel } from '../ui/SectionLabel'

function SiteTile({ site, hidden = false }: { site: (typeof sites)[number]; hidden?: boolean }) {
  return (
    <li className="w-[min(72vw,340px)] shrink-0">
      <Link to={`/work#site-${site.slug}`} className="group block space-y-3" tabIndex={hidden ? -1 : undefined}>
        <div className="overflow-hidden border border-border bg-white">
          <Picture
            src={site.desktop}
            alt={hidden ? '' : `${site.name ?? site.label}, desktop homepage`}
            ratio="16 / 10"
            sizes="340px"
            imgClassName="aspect-[16/10] w-full object-cover object-top transition-transform duration-slow ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div>
          <p className="font-medium leading-snug transition-colors duration-base group-hover:text-accent-ink">{site.name ?? site.label}</p>
          {site.name && <p className="text-[var(--text-small)] text-muted">{site.label}</p>}
        </div>
      </Link>
    </li>
  )
}

/**
 * Websites shipped as a marquee. The track holds the list twice and slides by half its width,
 * so the loop is seamless. It pauses on hover, on keyboard focus and with the Pause button, and
 * with reduced motion it becomes a still row you can scroll. The duplicate copy is hidden from
 * assistive tech and skipped by Tab.
 */
export function SitesStrip() {
  const c = homeContent.sites
  const [paused, setPaused] = useState(false)

  return (
    <section aria-labelledby="sites-title" className="section bg-surface">
      <div className="container-page mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <SectionLabel>{c.label}</SectionLabel>
          <h2 id="sites-title" className="h2" data-reveal="mask">
            {c.headline}
          </h2>
          <p className="text-muted">{c.note}</p>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="marquee-toggle inline-flex h-11 items-center gap-2 border border-border bg-white px-3 text-[14px] font-medium transition-colors duration-base hover:border-dark motion-reduce:hidden"
          >
            {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            {paused ? 'Play' : 'Pause'}
            <span className="sr-only"> website marquee</span>
          </button>
          <Link to="/work#websites" className="link-underline inline-flex items-center gap-2 font-medium">
            {c.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className={cn('marquee', paused && 'is-paused')}>
        <div className="marquee__track" style={{ ['--marquee-duration' as string]: `${sites.length * 7}s` }}>
          <ul className="flex shrink-0 gap-6 pr-6" aria-label="Websites shipped">
            {sites.map((s) => (
              <SiteTile key={s.slug} site={s} />
            ))}
          </ul>
          <ul className="marquee__copy flex shrink-0 gap-6 pr-6 motion-reduce:hidden" aria-hidden="true">
            {sites.map((s) => (
              <SiteTile key={s.slug} site={s} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
