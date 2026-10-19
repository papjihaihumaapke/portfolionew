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
  /** grid: dense three-up card for the Work page (16:10 image, outcome and role, no tags). */
  size?: 'large' | 'regular' | 'grid' | 'compact'
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({ project, className, priority = false, size = 'regular', headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel
  // Full covers keep their own ratio, except in the dense card sizes.
  const dense = size === 'compact' || size === 'grid'
  const full = !!project.cover.full && !dense
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
          ratio={full ? '16 / 9' : dense ? '16 / 10' : '4 / 3'}
          parallax={size === 'large' && !full ? 0.08 : undefined}
          imgClassName={cn(
            'w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.02]',
            full ? '' : dense ? 'aspect-[16/10]' : 'aspect-[4/3]',
          )}
        />
      </div>

      <div className={cn('flex flex-1 flex-col', dense ? 'gap-2 pt-4' : 'gap-3 pt-6')}>
        <p className={cn('eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-muted', size === 'compact' && 'text-[11px] tracking-[0.1em] sm:text-[var(--text-micro)] sm:tracking-[0.18em]')}>
          <span>
            {project.studyLabel ?? typeLabel[project.type]}
            {year ? ` · ${year}` : ''}
          </span>
          {/* Kept outside the cover so it never sits on top of the artwork. */}
          {project.status === 'in-progress' && <span className="bg-dark px-2 py-0.5 normal-case tracking-normal text-white">In progress</span>}
        </p>
        <Heading className={cn('font-display leading-tight', size === 'large' ? 'h3 text-[clamp(26px,2.6vw,36px)]' : dense ? 'text-[20px]' : 'h3')}>
          <Link to={`/work/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-ink transition-colors duration-base">
            {project.title}
          </Link>
          <ArrowUpRight size={20} aria-hidden="true" className="ml-1 inline-block align-baseline opacity-0 transition-opacity duration-base group-hover:opacity-100" />
        </Heading>
        {size === 'grid' ? (
          <>
            <p className="line-clamp-2 text-[var(--text-small)] text-muted">{project.outcome}</p>
            <p className="mt-auto pt-1 text-[var(--text-small)] font-medium">{project.role}</p>
          </>
        ) : (
          <>
            {size !== 'compact' && <p className="max-w-[52ch] text-muted">{project.outcome}</p>}
            {size !== 'compact' && <p className="text-[var(--text-small)] text-text">{project.role}</p>}
            <TagList tags={project.tags} className={cn('mt-auto pt-1', size === 'compact' && 'hidden sm:flex')} />
          </>
        )}
      </div>
    </article>
  )
}
