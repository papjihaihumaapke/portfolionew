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

  return (
    <>
      <Seo title="Work" description="Product, platform, website and campaign work by Hilal Malik, UI/UX & Product Designer in Vancouver, BC. Client names kept confidential." path="/work" />
      <section className="pb-12 pt-10 md:pt-16">
        <div className="container-page space-y-8">
          <SectionLabel>Work</SectionLabel>
          <h1 className="h1">Work.</h1>
          <p className="lead text-muted">
            Products, platforms, websites and campaigns I designed and built, from my own SaaS to employer and freelance work.
          </p>

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
          <p className="sr-only" aria-live="polite">
            Showing {shownWork.length + shownStudies.length + (showSites ? sites.length : 0)} items
          </p>
        </div>
      </section>

      <section aria-labelledby="selected-title" className="pb-[var(--section-gap)]">
        <div className="container-page space-y-10">
          <h2 id="selected-title" className="sr-only">
            Selected work
          </h2>
          {shownWork.length > 0 ? (
            <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2" data-reveal-stagger="">
              {shownWork.map((p, i) => (
                <li key={p.slug}>
                  <ProjectCard project={p} priority={i < 2} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No main projects match this filter.</p>
          )}
        </div>
      </section>

      {showSites && (
        <section id="websites" aria-labelledby="websites-title" className="section scroll-mt-24 bg-surface">
          <div className="container-page space-y-12">
            <div className="space-y-4">
              <SectionLabel>Websites shipped</SectionLabel>
              <h2 id="websites-title" className="h2" data-reveal="mask">
                {sites.length} websites, designed and built.
              </h2>
              <p className="max-w-measure text-muted">Open a live preview on desktop or phone width, or visit the site.</p>
            </div>
            <SiteGrid />
          </div>
        </section>
      )}

      {shownStudies.length > 0 && (
        <section aria-labelledby="studies-title" className="section">
          <div className="container-page space-y-12">
            <div className="space-y-4">
              <SectionLabel>Studies</SectionLabel>
              <h2 id="studies-title" className="h2" data-reveal="mask">
                Coursework at KPU.
              </h2>
              <p className="max-w-measure text-muted">Projects from the Front-End Development for Interactive Applications diploma at KPU’s Wilson School of Design.</p>
            </div>
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger="">
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
