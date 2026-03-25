import { projects } from '../../data/projects'
import { homeContent } from '../../data/home'
import { AnimatedSection } from '../ui/AnimatedSection'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionLabel } from '../ui/SectionLabel'
import { Link } from 'react-router-dom'

const featuredSlugs = ['c2c-rental', 'vanprints', 'acminder'] as const

export function FeaturedWork() {
  const content = homeContent.featured
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<(typeof projects)[number]> => Boolean(p))

  return (
    <section className="section">
      <div className="container-page">
        <AnimatedSection className="space-y-10">
          <div className="space-y-3">
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
              {content.headline}
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <ProjectCard project={featured[0]} className="col-span-12 lg:col-span-7" />
            <div className="col-span-12 lg:col-span-5 grid gap-6">
              <ProjectCard project={featured[1]} />
              <ProjectCard project={featured[2]} />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/work"
              className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors duration-300"
            >
              {content.viewAll}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

