import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProjects } from '../../data/projects'
import { homeContent } from '../../data/home'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionLabel } from '../ui/SectionLabel'

export function FeaturedWork() {
  const content = homeContent.featured

  return (
    <section aria-labelledby="featured-title" className="section">
      <div className="container-page space-y-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <SectionLabel>{content.label}</SectionLabel>
            <h2 id="featured-title" className="h2 max-w-[18ch]">{content.headline}</h2>
          </div>
          <Link to="/work" className="link-underline inline-flex items-center gap-2 font-medium">
            {content.viewAll}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} size="large" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
