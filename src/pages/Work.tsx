import { useEffect } from 'react'
import { workProjects, studies } from '../data/projects'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SectionLabel } from '../components/ui/SectionLabel'
import { AnimatedSection } from '../components/ui/AnimatedSection'

export function Work() {
  useEffect(() => {
    document.title = 'Work | Hilal Malik'
  }, [])

  const shown = [...workProjects, ...studies]

  return (
    <section className="section">
      <div className="container-page space-y-10">
        <div className="space-y-4">
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">{"Selected Work."}</h1>
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

