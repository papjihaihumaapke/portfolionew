import { useMemo, useEffect } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SectionLabel } from '../components/ui/SectionLabel'
import { site } from '../data/site'

export function Work() {
  useEffect(() => {
    document.title = 'Work — Hilal Malik'
  }, [])

  const featuredSlugs = useMemo(() => ['c2c-rental', 'vanprints', 'acminder'] as const, [])
  const shown = useMemo(
    () =>
      featuredSlugs
        .map((slug) => projects.find((p) => p.slug === slug))
        .filter((p): p is NonNullable<(typeof projects)[number]> => Boolean(p)),
    [featuredSlugs],
  )

  return (
    <section className="section">
      <div className="container-page space-y-10">
        <div className="space-y-4">
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
            Selected Work.
          </h1>
          <p className="font-body text-[var(--text-body)] text-muted">
            UI/UX · Product · AI · Branding — 2022–Present
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-body text-[var(--text-body)] text-muted">
            More work (brand systems, visuals, and experiments) lives on Behance.
          </div>
          <a
            href={site.socialLinks.find((l) => l.label === 'Behance')?.href ?? 'https://behance.net'}
            target="_blank"
            rel="noreferrer"
            className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors duration-300"
          >
            View Behance profile →
          </a>
        </div>
      </div>
    </section>
  )
}

