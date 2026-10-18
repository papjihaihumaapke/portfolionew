import { useEffect } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SectionLabel } from '../components/ui/SectionLabel'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { TextReveal } from '../components/ui/TextReveal'

export function Work() {
  useEffect(() => {
    document.title = 'Work | Hilal Malik'
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
              Product, UX, web and motion work, 2022 to present
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

      </div>
    </section>
  )
}

