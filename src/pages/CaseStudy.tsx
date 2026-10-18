import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects, type Project } from '../data/projects'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Tag } from '../components/ui/Tag'
import { motion } from 'framer-motion'
import { DemoGrid, DemoStage, demoRegistry } from '../components/demos/MotionDemos'

export function CaseStudy() {
  const { slug } = useParams()
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug])

  const nav = useMemo(() => {
    if (!project) return null
    const idx = projects.findIndex((p) => p.slug === project.slug)
    const prev = idx > 0 ? projects[idx - 1] : null
    const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null
    return { prev, next }
  }, [project])

  useEffect(() => {
    document.title = project ? `${project.title}, Case Study` : 'Case Study, Hilal Malik'
  }, [project])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <section className="section">
        <div className="container-page space-y-4">
          <SectionLabel withDash={false}>Not found</SectionLabel>
          <h1 className="font-display text-[var(--text-heading)] tracking-tight">
            This case study doesn’t exist.
          </h1>
          <Link
            to="/work"
            className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors duration-300"
          >
            Back to work →
          </Link>
        </div>
      </section>
    )
  }

  const demos = project.liveDemos ? demoRegistry[project.liveDemos] : undefined

  return (
    <>
      {/* Hero banner ------------------------------------------------------- */}
      <section className="relative">
        <div className="relative h-[58vh] max-h-[620px] min-h-[380px] w-full overflow-hidden">
          <motion.img
            src={project.heroImage}
            alt={`${project.title} banner`}
            className="h-full w-full object-cover"
            loading="eager"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container-page pb-9 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.category.map((c) => (
                  <Tag key={c} className="border-white/30 text-white/90 hover:bg-accent hover:text-white">
                    {c}
                  </Tag>
                ))}
              </div>
              <h1 className="font-display text-white text-[clamp(32px,5vw,68px)] leading-[0.95] tracking-tight">
                {project.title}
              </h1>
              <div className="font-body text-[var(--text-small)] text-white/80">
                {project.company} · {project.year}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta -------------------------------------------------------------- */}
      <section className="bg-bg border-b border-border">
        <div className="container-page py-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetaChip label="Client" value={project.company} />
            <MetaChip label="Role" value={project.role} />
            <MetaChip label="Timeline" value={project.timeline} />
            <MetaChip label="Tools" value={project.tools} />
          </div>
          {project.excerpt && (
            <p className="mt-8 font-display text-[var(--text-subhead)] leading-snug text-text max-w-3xl">
              {project.excerpt}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-20">
          {/* Interactive embed, lead with it ----------------------------- */}
          {project.embed && (
            <AnimatedSection className="space-y-5" variant="fade-in">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-2">
                  <SectionLabel>Try it live</SectionLabel>
                  <h2 className="font-display text-[var(--text-heading)] tracking-tight">
                    Not a screenshot, the real build.
                  </h2>
                </div>
                <a
                  href={project.embed.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-[var(--text-small)] uppercase tracking-[0.14em] text-text hover:text-accent transition-colors"
                >
                  Open full screen ↗
                </a>
              </div>
              {project.embed.note && (
                <p className="font-body text-[var(--text-body)] text-muted max-w-3xl">
                  {project.embed.note}
                </p>
              )}
              <EmbedFrame embed={project.embed} />
            </AnimatedSection>
          )}

          {/* Live coded interactions -------------------------------------- */}
          {demos && (
            <AnimatedSection className="space-y-5">
              <SectionLabel>Live Interactions</SectionLabel>
              <h2 className="font-display text-[var(--text-heading)] tracking-tight">
                Coded, running components, hover, click, drag.
              </h2>
              <DemoGrid>
                {demos.map((d) => (
                  <DemoStage key={d.label} label={d.label} caption={d.caption} dark={d.dark} tall={d.tall}>
                    {d.render()}
                  </DemoStage>
                ))}
              </DemoGrid>
            </AnimatedSection>
          )}

          {/* Condensed narrative, scannable 2-col ------------------------ */}
          <AnimatedSection className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            <Field label="The Problem" text={project.problem} />
            <Field label="My Role" text={project.myRole} />
            <Field label="Discovery" text={project.discovery} image={project.discoveryImage} />
            <Field label="Process" text={project.process} image={project.processImage} />
          </AnimatedSection>

          {/* Solution ----------------------------------------------------- */}
          <AnimatedSection className="space-y-5">
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">What shipped.</h2>
            <p className="font-body text-[var(--text-body)] text-muted leading-relaxed max-w-3xl">
              {project.solution}
            </p>
            {project.solutionImage && (
              <div className="border border-border overflow-hidden bg-[#f4f7fa] py-12">
                <motion.img
                  src={project.solutionImage}
                  alt="Solution overview"
                  className="w-full h-auto max-w-4xl mx-auto"
                  loading="lazy"
                  initial={{ scale: 0.96, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </AnimatedSection>

          {/* Impact, prominent ------------------------------------------- */}
          <AnimatedSection className="space-y-5">
            <SectionLabel>Impact</SectionLabel>
            <div className="grid gap-4 md:grid-cols-3">
              {project.impact.map((s) => (
                <div key={s.label} className="bg-surface border border-border p-6">
                  <div className="font-display text-[48px] leading-none text-accent">{s.value}</div>
                  <div className="mt-2 font-body text-[var(--text-small)] text-muted uppercase tracking-[0.12em]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Visual artifacts gallery ------------------------------------- */}
          {project.gallery && project.gallery.length > 0 && (
            <AnimatedSection className="space-y-5">
              <SectionLabel>Visual Artifacts</SectionLabel>
              <h2 className="font-display text-[var(--text-heading)] tracking-tight">The craft, up close.</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {project.gallery.map((g, i) => (
                  <motion.figure
                    key={g.src}
                    className="border border-border overflow-hidden bg-surface"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
                  >
                    <div className={g.contain ? 'bg-white p-6 flex items-center justify-center' : ''}>
                      <img
                        src={g.src}
                        alt={g.caption ?? `${project.title} artifact ${i + 1}`}
                        className={g.contain ? 'max-h-[420px] w-auto' : 'w-full h-full object-cover'}
                        loading="lazy"
                      />
                    </div>
                    {g.caption && (
                      <figcaption className="border-t border-border px-4 py-3 font-body text-[13px] text-muted">
                        {g.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Figma prototype ---------------------------------------------- */}
          {project.figmaUrl && (
            <AnimatedSection className="space-y-5">
              <SectionLabel>Interactive Prototype</SectionLabel>
              <h2 className="font-display text-[var(--text-heading)] tracking-tight">Figma preview.</h2>
              <div className="border border-border overflow-hidden bg-surface relative w-full h-[80vh] min-h-[600px]">
                <iframe
                  src={project.figmaUrl}
                  title={`${project.title} Figma prototype`}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              </div>
            </AnimatedSection>
          )}

          {/* Reflection --------------------------------------------------- */}
          <AnimatedSection className="space-y-4 border-l-2 border-accent pl-6 max-w-3xl">
            <SectionLabel withDash={false}>What I’d do differently</SectionLabel>
            <p className="font-body italic text-[var(--text-subhead)] text-text leading-relaxed">
              {project.reflection}
            </p>
          </AnimatedSection>

          {/* External links ---------------------------------------------- */}
          {(project.liveUrl || (project.links && project.links.length > 0)) && (
            <AnimatedSection className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-text bg-text px-6 py-3 font-body text-[13px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent hover:border-accent"
                >
                  Visit live site →
                </a>
              )}
              {project.links?.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-border px-6 py-3 font-body text-[13px] uppercase tracking-[0.12em] text-text transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label} →
                </a>
              ))}
            </AnimatedSection>
          )}

          {/* Prev / next -------------------------------------------------- */}
          <nav
            aria-label="Case study navigation"
            className="pt-8 border-t border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              {nav?.prev ? (
                <Link
                  to={`/work/${nav.prev.slug}`}
                  className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors duration-300"
                >
                  ← {nav.prev.title}
                </Link>
              ) : (
                <span className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-muted">
                  ← Previous
                </span>
              )}
            </div>
            <Link
              to="/work"
              className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted hover:text-accent"
            >
              All work
            </Link>
            <div className="sm:text-right">
              {nav?.next ? (
                <Link
                  to={`/work/${nav.next.slug}`}
                  className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors duration-300"
                >
                  {nav.next.title} →
                </Link>
              ) : (
                <span className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-muted">
                  Next →
                </span>
              )}
            </div>
          </nav>
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------------- */

function EmbedFrame({ embed }: { embed: NonNullable<Project['embed']> }) {
  return (
    <div className="border border-border overflow-hidden bg-surface">
      <div className="flex items-center gap-2 border-b border-border bg-bg px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="ml-2 truncate font-body text-[12px] text-muted">{embed.label}</span>
      </div>
      <div className="relative w-full bg-white" style={{ aspectRatio: embed.ratio ?? '16 / 9' }}>
        <iframe
          src={embed.url}
          title={embed.label}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

function Field({ label, text, image }: { label: string; text: string; image?: string }) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      <p className="font-body text-[var(--text-body)] text-muted leading-relaxed">{text}</p>
      {image && (
        <div className="mt-4 border border-border overflow-hidden bg-white">
          <img src={image} alt={`${label} visual`} className="w-full h-auto" loading="lazy" />
        </div>
      )}
    </div>
  )
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-surface px-4 py-3">
      <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted">{label}</div>
      <div className="mt-1 font-body text-[15px] text-text">{value}</div>
    </div>
  )
}
