import { useEffect } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SectionLabel } from '../components/ui/SectionLabel'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { TextReveal } from '../components/ui/TextReveal'
import { site } from '../data/site'

export function Work() {
  useEffect(() => {
    document.title = 'Work — Hilal Malik'
  }, [])

  const shown = projects

  return (
    <section className="section">
      <div className="container-page space-y-10">
        <div className="space-y-4">
          <SectionLabel>Portfolio</SectionLabel>
          <TextReveal
            text="Selected Work."
            as="h1"
            className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight"
          />
          <AnimatedSection delay={0.2}>
            <p className="font-body text-[var(--text-body)] text-muted">
              UI/UX · Product · AI · Branding — 2022–Present
            </p>
          </AnimatedSection>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {shown.map((p, i) => (
            <div key={p.slug} className="break-inside-avoid mb-6">
              <ProjectCard project={p} delay={i * 0.1} />
            </div>
          ))}
        </div>

        <AnimatedSection className="border-t border-border pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        </AnimatedSection>
      </div>
    </section>
  )
}

