import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SiteGrid } from '../components/sites/SiteGrid'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SectionLabel } from '../components/ui/SectionLabel'
import { disciplineLabel, studies, workProjects, type Discipline } from '../data/projects'
import { sites } from '../data/sites'
import { useScrollMotion } from '../lib/use-scroll-motion'
import { cn } from '../lib/utils'

const filters = ['all', 'product', 'web', 'motion', 'marketing'] as const
type Filter = (typeof filters)[number]

/** Compact section header so the page reads as one scannable index, not a series of posters. */
function SectionHead({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <div className="mb-8 space-y-2">
      <SectionLabel>{label}</SectionLabel>
      <h2 id={id} className="font-display text-[clamp(28px,3vw,40px)] leading-tight" data-reveal="mask">
        {title}
      </h2>
    </div>
  )
}

export function Work() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('filter')
  const filter: Filter = filters.includes(raw as Filter) ? (raw as Filter) : 'all'

  useScrollMotion([filter])

  // Hash links (/work#websites, /work#site-x) arrive before the section mounts.
  useEffect(() => {
    if (!window.location.hash) return
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
  }, [])

  const matches = (d: Discipline[]) => filter === 'all' || d.includes(filter)
  const shownWork = workProjects.filter((p) => matches(p.disciplines))
  const shownStudies = studies.filter((p) => matches(p.disciplines))
  const showSites = filter === 'all' || filter === 'web'

  const setFilter = (f: Filter) => {
    const next = new URLSearchParams(params)
    if (f === 'all') next.delete('filter')
    else next.set('filter', f)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const jumps = [
    { href: '#selected', label: 'Selected work', count: shownWork.length },
    ...(showSites ? [{ href: '#websites', label: 'Websites', count: sites.length }] : []),
    { href: '#coursework', label: 'Coursework', count: shownStudies.length },
  ].filter((j) => j.count > 0)

  return (
    <>
      <Seo
        title="Work"
        description="Product, platform, website and campaign work by Hilal Malik, UI/UX & Product Designer in Vancouver, BC, plus KPU coursework."
        path="/work"
      />
      <section className="pb-8 pt-8 md:pt-12">
        <div className="container-page space-y-6">
          <SectionLabel>Work</SectionLabel>
          <h1 className="font-display text-[clamp(44px,6vw,80px)] leading-[0.95] tracking-[-0.03em]">Work.</h1>
          <p className="max-w-measure text-[var(--text-lead)] text-text">Products, websites and campaigns I designed and built.</p>

          <div className="flex flex-col gap-4 border-t border-border pt-5 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter work by discipline" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'min-h-[44px] border px-4 text-[15px] font-medium transition-colors duration-base',
                    filter === f ? 'border-dark bg-dark text-white' : 'border-border bg-white text-text hover:border-dark',
                  )}
                >
                  {f === 'all' ? 'All' : disciplineLabel[f]}
                </button>
              ))}
            </div>
            <nav aria-label="Jump to section">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                {jumps.map((j) => (
                  <li key={j.href}>
                    <a href={j.href} className="link-underline inline-flex min-h-[44px] items-center gap-1.5 font-medium">
                      {j.label}
                      <span className="text-[13px] text-muted">{j.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {shownWork.length + shownStudies.length + (showSites ? sites.length : 0)} items
          </p>
        </div>
      </section>

      <section id="selected" aria-labelledby="selected-title" className="scroll-mt-24 pb-14 pt-4 md:pb-20">
        <div className="container-page">
          <SectionHead id="selected-title" label="Selected work" title="Products, platforms and campaigns." />
          {shownWork.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger="">
              {shownWork.map((p, i) => (
                <li key={p.slug}>
                  <ProjectCard project={p} size="grid" priority={i < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No main projects match this filter.</p>
          )}
        </div>
      </section>

      {showSites && (
        <section id="websites" aria-labelledby="websites-title" className="scroll-mt-24 bg-surface py-14 md:py-20">
          <div className="container-page">
            <SectionHead id="websites-title" label="Websites shipped" title={`${sites.length} websites, shipped.`} />
            <SiteGrid />
          </div>
        </section>
      )}

      {shownStudies.length > 0 && (
        <section id="coursework" aria-labelledby="coursework-title" className="scroll-mt-24 py-14 md:py-20">
          <div className="container-page">
            <SectionHead id="coursework-title" label="Coursework" title="Studies at KPU." />
            <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4" data-reveal-stagger="">
              {shownStudies.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} size="compact" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
