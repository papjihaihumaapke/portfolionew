import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { BeforeAfter } from '../components/case-study/BeforeAfter'
import { ReelGrid } from '../components/case-study/ReelGrid'
import { VoiceFlow } from '../components/case-study/VoiceFlow'
import { Picture } from '../components/ui/Picture'
import { SectionLabel } from '../components/ui/SectionLabel'
import { getNextProject, getProject, typeLabel, type Project, type Section, type Widget } from '../data/projects'
import { track } from '../lib/analytics'
import { hasImage } from '../lib/media'
import { projectJsonLd } from '../lib/seo'
import { cn } from '../lib/utils'
import { NotFound } from './NotFound'

// The coded demos are heavy and only used by three studies, so they load on demand.
const Demos = lazy(() => import('../components/case-study/Demos'))

export function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const next = getNextProject(project.slug)
  const tocSections = project.sections.filter((s) => s.title)

  return (
    <MotionConfig reducedMotion="user">
      <Seo title={project.title} description={project.summary} path={`/work/${project.slug}`} image={project.ogImage} type="article" jsonLd={projectJsonLd(project)} />
      <ReadingProgress />
      <article>
        <CaseHero project={project} />

        <div className="container-page grid gap-12 pb-[var(--section-gap)] lg:grid-cols-12">
          <Toc sections={tocSections} />

          <div className="min-w-0 space-y-20 lg:col-span-9 lg:col-start-4">
            {project.confidential && (
              <p className="border-l-2 border-accent bg-surface px-5 py-4 text-[var(--text-small)]">
                Client details are confidential. Names, logos and data are removed, and some screens are recreated or redacted.
              </p>
            )}
            {project.sections.map((s) => (
              <CaseSection key={s.id} section={s} />
            ))}

            <nav aria-label="More work" className="grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
              <Link to="/work" className="group inline-flex items-center gap-2 font-medium">
                <ArrowLeft size={18} aria-hidden="true" className="transition-transform duration-base group-hover:-translate-x-1" />
                Back to all work
              </Link>
              <Link to={`/work/${next.slug}`} className="group space-y-1 sm:text-right">
                <span className="eyebrow block text-muted">Next project</span>
                <span className="h3 inline-flex items-center gap-2 group-hover:text-accent-ink transition-colors duration-base">
                  {next.title}
                  <ArrowRight size={22} aria-hidden="true" />
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </article>
    </MotionConfig>
  )
}

/* -------------------------------------------------------------------------- */

function CaseHero({ project }: { project: Project }) {
  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Team', value: project.team },
    { label: 'Tools', value: project.tools.join(', ') },
    { label: 'Type', value: project.studyLabel ?? typeLabel[project.type] },
  ].filter((m) => m.value)

  return (
    <header className="pb-16 pt-10 md:pt-16">
      <div className="container-page space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <SectionLabel>{project.client}</SectionLabel>
          {project.status === 'in-progress' && <span className="bg-dark px-2.5 py-1 text-[var(--text-micro)] font-medium text-white">In progress</span>}
        </div>
        <h1 className="h1 max-w-[16ch]">{project.title}</h1>
        <p className="lead">{project.summary}</p>

        <dl className={cn('grid gap-x-8 gap-y-5 border-y border-border py-6 sm:grid-cols-2', meta.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}>
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="eyebrow text-muted">{m.label}</dt>
              <dd className="mt-1.5 text-[var(--text-small)]">{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('lotstudio_live_click', { href: project.liveUrl! })}
            className="inline-flex min-h-[48px] items-center gap-2 bg-accent-ink px-6 py-3 font-medium text-white transition-colors duration-base hover:bg-dark"
          >
            Open the live product
            <ExternalLink size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>

      <div className="container-page mt-12">
        <Picture src={project.cover.src} alt={project.cover.alt} priority sizes="(min-width: 1320px) 1192px, 100vw" ratio="16 / 9" imgClassName="w-full" />
      </div>
    </header>
  )
}

function Toc({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
      <div className="sticky top-[calc(var(--header-h)+32px)] space-y-4">
        <p className="eyebrow text-muted">On this page</p>
        <ol className="space-y-2 border-l border-border">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'location' : undefined}
                className={cn(
                  '-ml-px block border-l-2 py-1 pl-4 text-[var(--text-small)] transition-colors duration-base',
                  active === s.id ? 'border-accent font-medium text-text' : 'border-transparent text-muted hover:text-text',
                )}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[var(--header-h)] z-40 h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}

function CaseSection({ section }: { section: Section }) {
  // Only show media that exists; screens not yet added are skipped, not stubbed.
  const media = section.media?.filter((m) => hasImage(m.src)) ?? []
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28 space-y-6">
      <h2 id={`${section.id}-title`} className="h2">
        {section.title}
      </h2>

      {section.body && (
        <div className="prose-body">
          {section.body.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
      )}

      {section.bullets && (
        <ul className="prose-body space-y-3">
          {section.bullets.map((b) => (
            <li key={b} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-accent">
              {b}
            </li>
          ))}
        </ul>
      )}

      {section.quote && (
        <blockquote className="border-l-2 border-accent py-1 pl-6 font-display text-[clamp(22px,2.2vw,30px)] leading-snug">
          <p>{section.quote}</p>
        </blockquote>
      )}

      {section.stats && (
        <dl className={cn('grid gap-px bg-border sm:grid-cols-2', section.stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
          {section.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-bg p-6">
              <dt className="mt-2 text-[var(--text-small)] text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(32px,3.6vw,48px)] leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {section.widget && <WidgetView widget={section.widget} />}

      {media.length > 0 && (
        <div className={cn('grid gap-8', media.length > 1 && 'md:grid-cols-2')}>
          {media.map((m) => (
            <figure key={m.src + m.alt} className="space-y-3">
              <div className={m.contain ? 'flex justify-center bg-white p-6' : ''}>
                <Picture
                  src={m.src}
                  alt={m.alt}
                  ratio={m.contain ? '4 / 5' : '16 / 10'}
                  sizes={media.length > 1 ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 75vw, 100vw'}
                  imgClassName={m.contain ? 'max-h-[520px] w-auto' : 'w-full'}
                />
              </div>
              {m.caption && <figcaption className="text-[var(--text-small)] text-muted">{m.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}

function WidgetView({ widget }: { widget: Widget }) {
  switch (widget) {
    case 'before-after':
      return <BeforeAfter />
    case 'voice-flow':
      return <VoiceFlow />
    case 'reel-grid':
      return <ReelGrid />
    case 'embed-musify':
      return <MusifyEmbed />
    default:
      return (
        <Suspense fallback={<p className="text-muted">Loading the live demos.</p>}>
          <Demos which={widget.replace('demos-', '') as 'musify' | 'library' | 'dashboard'} />
        </Suspense>
      )
  }
}

function MusifyEmbed() {
  return (
    <figure className="space-y-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-dark">
        <iframe src="/embeds/musify/index.html" title="Musify, the coded site" loading="lazy" className="absolute inset-0 h-full w-full border-0" />
      </div>
      <figcaption className="flex flex-wrap gap-x-6 gap-y-2 text-[var(--text-small)] text-muted">
        The real GSAP and Lenis build. Scroll inside the frame and hover the cards.
        <a href="/embeds/musify/index.html" target="_blank" rel="noreferrer" className="link-underline text-text">
          Open full screen<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href="/embeds/musify/styleguide.html" target="_blank" rel="noreferrer" className="link-underline text-text">
          Open the coded style guide<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  )
}
