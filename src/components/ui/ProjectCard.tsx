import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { Tag } from './Tag'

export type ProjectCardProps = {
  project: Project
  className?: string
  priority?: boolean
}

export function ProjectCard({ project, className, priority = false }: ProjectCardProps) {
  if (!project) return null

  return (
    <Link
      to={`/work/${project.slug}`}
      className={[
        'group block border border-border bg-transparent rounded-none overflow-hidden',
        'transition-colors duration-300 hover:border-accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`View case study: ${project.title}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.coverImage}
          alt={`${project.title} cover`}
          className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
          loading={priority ? 'eager' : 'lazy'}
        />

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
            {project.company} · {project.year}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}

