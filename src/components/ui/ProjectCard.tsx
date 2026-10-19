import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { typeLabel, type Project } from '../../data/projects'
import { cn } from '../../lib/utils'
import { Picture } from './Picture'
import { TagList } from './Tag'

export type ProjectCardProps = {
  project: Project
  className?: string
  priority?: boolean
  size?: 'large' | 'regular' | 'compact'
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({ project, className, priority = false, size = 'regular', headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel
  // Full covers keep their own ratio, except in compact cards.
  const full = !!project.cover.full && size !== 'compact'
  const year = project.timeline?.match(/\d{4}(?!.*\d{4})/)?.[0] ?? project.timeline

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative overflow-hidden bg-surface">
        <Picture
          src={project.cover.src}
          alt={project.cover.alt}
          priority={priority}
          sizes={
            full ? '(min-width: 1320px) 1192px, 100vw' : size === 'large' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          }
          ratio={full ? '16 / 9' : size === 'compact' ? '16 / 10' : '4 / 3'}
          parallax={size === 'large' && !full ? 0.08 : undefined}
          imgClassName={cn(
            'w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.02]',
            full ? '' : size === 'compact' ? 'aspect-[16/10]' : 'aspect-[4/3]',
          )}
        />
      </div>

      <div className={cn('flex flex-1 flex-col', size === 'compact' ? 'pt-4 gap-2' : 'pt-6 gap-3')}>
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          <span>
            {project.studyLabel ?? typeLabel[project.type]}
            {year ? ` · ${year}` : ''}
          </span>
          {/* Kept outside the cover so it never sits on top of the artwork. */}
          {project.status === 'in-progress' && <span className="bg-dark px-2 py-0.5 normal-case tracking-normal text-white">In progress</span>}
        </p>
        <Heading className={cn('font-display leading-tight', size === 'large' ? 'h3 text-[clamp(26px,2.6vw,36px)]' : size === 'compact' ? 'text-[20px]' : 'h3')}>
          <Link to={`/work/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-ink transition-colors duration-base">
            {project.title}
          </Link>
          <ArrowUpRight size={20} aria-hidden="true" className="ml-1 inline-block align-baseline opacity-0 transition-opacity duration-base group-hover:opacity-100" />
        </Heading>
        {size !== 'compact' && <p className="max-w-[52ch] text-muted">{project.outcome}</p>}
        {size !== 'compact' && <p className="text-[var(--text-small)] text-text">{project.role}</p>}
        <TagList tags={project.tags} className="mt-auto pt-1" />
      </div>
    </article>
  )
}
