import { Link } from 'react-router-dom'
import { Picture } from './Picture'
import type { Project } from '../../data/projects'
import { Tag } from './Tag'
import { AnimatedSection } from './AnimatedSection'

export type ProjectCardProps = {
  project: Project
  className?: string
  priority?: boolean
  delay?: number
}

export function ProjectCard({ 
  project, 
  className, 
  priority = false, 
  delay = 0 
}: ProjectCardProps) {
  if (!project) return null

  return (
    <AnimatedSection className={className} delay={delay} variant="none">
      <Link
        to={`/work/${project.slug}`}
        className={[
          'group block h-full border border-border bg-transparent rounded-none overflow-hidden',
          'transition-colors duration-300 hover:border-accent'
        ].join(' ')}
        aria-label={`View case study: ${project.title}`}
      >
      <div className="relative overflow-hidden">
        <Picture src={project.cover.src} alt={project.cover.alt} priority={priority} imgClassName="h-full w-full object-cover" />

        <div className="pointer-events-none absolute bottom-4 right-4 opacity-0 translate-y-1 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="bg-bg text-text border border-border px-3 py-1 font-body text-[var(--text-micro)] uppercase tracking-[0.15em]">
            View →
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="space-y-1">
          <div className="font-display text-[var(--text-heading)] leading-[1.05] transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </div>
          <div className="font-body text-[var(--text-small)] text-muted">
            {project.client} · {project.timeline}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        </div>
      </Link>
    </AnimatedSection>
  )
}

