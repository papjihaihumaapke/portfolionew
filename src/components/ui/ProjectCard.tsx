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
  /**
   * large / regular: editorial cards for the homepage (image, outcome, role, tags).
   * grid / compact: boxed cards for the Work page (image, type and year, title, role).
   */
  size?: 'large' | 'regular' | 'grid' | 'compact'
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({ project, className, priority = false, size = 'regular', headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel
  const boxed = size === 'compact' || size === 'grid'
  // Full covers keep their own ratio in the editorial sizes only.
  const full = !!project.cover.full && !boxed
  const year = project.timeline?.match(/\d{4}(?!.*\d{4})/)?.[0] ?? project.timeline
  const meta = `${project.studyLabel ?? typeLabel[project.type]}${year ? ` · ${year}` : ''}`
  // Inside the Coursework section the label is implied, so compact cards show only what differs.
  const compactMeta = [project.studyLabel === 'KPU capstone' ? 'Capstone' : null, year].filter(Boolean).join(' · ')

  if (boxed) {
    return (
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden border border-border bg-white transition duration-base',
          'hover:-translate-y-0.5 hover:border-dark hover:shadow-[0_10px_30px_-12px_rgba(26,26,26,0.25)] focus-within:border-dark',
          className,
        )}
      >
        <div className="relative overflow-hidden border-b border-border bg-surface">
          <Picture
            src={project.cover.src}
            alt={project.cover.alt}
            priority={priority}
            sizes={size === 'grid' ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
            ratio="16 / 10"
            imgClassName="aspect-[16/10] w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
          />
          {project.status === 'in-progress' && (
            <span className="absolute bottom-0 left-0 bg-dark px-2.5 py-1 text-[12px] font-medium text-white">In progress</span>
          )}
        </div>
        <div className={cn('flex flex-1 flex-col', size === 'grid' ? 'gap-1.5 p-5' : 'gap-1 p-3 sm:p-4')}>
          <p className={cn('font-medium uppercase text-[#4a4a4a]', size === 'grid' ? 'text-[12px] tracking-[0.14em]' : 'text-[11px] tracking-[0.1em]')}>{size === 'grid' ? meta : compactMeta}</p>
          <Heading className={cn('font-display leading-tight text-text', size === 'grid' ? 'text-[21px]' : 'text-[17px] sm:text-[19px]')}>
            <Link to={`/work/${project.slug}`} className="after:absolute after:inset-0 transition-colors duration-base group-hover:text-accent-ink">
              {project.title}
            </Link>
          </Heading>
          {size === 'grid' && (
            <p className="mt-auto flex items-center justify-between gap-3 pt-2 text-[var(--text-small)] font-medium text-text">
              {project.role}
              <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-accent-ink transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative overflow-hidden bg-surface">
        <Picture
          src={project.cover.src}
          alt={project.cover.alt}
          priority={priority}
          sizes={full ? '(min-width: 1320px) 1192px, 100vw' : size === 'large' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          ratio={full ? '16 / 9' : '4 / 3'}
          parallax={size === 'large' && !full ? 0.08 : undefined}
          imgClassName={cn('w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.02]', !full && 'aspect-[4/3]')}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-6">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          <span>{meta}</span>
          {/* Kept outside the cover so it never sits on top of the artwork. */}
          {project.status === 'in-progress' && <span className="bg-dark px-2 py-0.5 normal-case tracking-normal text-white">In progress</span>}
        </p>
        <Heading className={cn('font-display leading-tight', size === 'large' ? 'h3 text-[clamp(26px,2.6vw,36px)]' : 'h3')}>
          <Link to={`/work/${project.slug}`} className="after:absolute after:inset-0 transition-colors duration-base group-hover:text-accent-ink">
            {project.title}
          </Link>
          <ArrowUpRight size={20} aria-hidden="true" className="ml-1 inline-block align-baseline opacity-0 transition-opacity duration-base group-hover:opacity-100" />
        </Heading>
        <p className="max-w-[52ch] text-muted">{project.outcome}</p>
        <p className="text-[var(--text-small)] text-text">{project.role}</p>
        <TagList tags={project.tags} className="mt-auto pt-1" />
      </div>
    </article>
  )
}
