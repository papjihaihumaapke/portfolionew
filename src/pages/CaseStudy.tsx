import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Tag } from '../components/ui/Tag'

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
    document.title = project ? `${project.title} — Case Study` : 'Case Study — Hilal Malik'
  }, [project])

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

  return (
    <>
      <section className="relative">
        <div className="relative h-[65vh] max-h-[700px] min-h-[400px] w-full overflow-hidden">
          <img
            src={project.heroImage}
            alt={`${project.title} hero`}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="container-page pb-10 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.category.map((c) => (
                  <Tag
                    key={c}
                    className="border-white/30 text-white/90 hover:bg-accent hover:text-white"
                  >
                    {c}
                  </Tag>
                ))}
              </div>
              <h1 className="font-display text-white text-[clamp(32px,5vw,72px)] leading-[0.95] tracking-tight">
                {project.title}
              </h1>
              <div className="font-body text-[var(--text-small)] text-white/80">
                {project.company} · {project.year}
              </div>
            </div>
          </div>


        </div>
      </section>

      <section className="bg-bg border-b border-border">
        <div className="container-page py-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetaChip label="Client" value={project.company} />
            <MetaChip label="Role" value={project.role} />
            <MetaChip label="Timeline" value={project.timeline} />
            <MetaChip label="Tools" value={project.tools} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-16">
          <AnimatedSection className="space-y-4">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              What needed to change.
            </h2>
            <p className="font-body text-[var(--text-body)] text-muted leading-relaxed max-w-3xl">
              {project.problem}
            </p>
          </AnimatedSection>

          <AnimatedSection className="space-y-4">
            <SectionLabel>My Role</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              Ownership.
            </h2>
            <p className="font-body text-[var(--text-body)] text-text leading-relaxed max-w-3xl font-semibold">
              {project.myRole}
            </p>
          </AnimatedSection>

          <AnimatedSection className="space-y-4">
            <SectionLabel>Discovery & Research</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              Finding the friction.
            </h2>
            <p className="font-body text-[var(--text-body)] text-muted leading-relaxed max-w-3xl">
              {project.discovery}
            </p>
            {project.discoveryImage && (
              <div className="border border-border overflow-hidden max-w-2xl bg-white">
                <img
                  src={project.discoveryImage}
                  alt="Discovery & Research Visualization"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection className="space-y-6">
            <SectionLabel>Design Process</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              From structure to UI.
            </h2>
            <p className="font-body text-[var(--text-body)] text-muted leading-relaxed max-w-3xl">
              {project.process}
            </p>
            {project.processImage && (
              <div className="border border-border overflow-hidden max-w-md bg-white">
                <img
                  src={project.processImage}
                  alt="Design Process Visualization"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection className="space-y-6">
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              What shipped.
            </h2>
            <p className="font-body text-[var(--text-body)] text-muted leading-relaxed max-w-3xl">
              {project.solution}
            </p>
            {project.solutionImage && (
              <div className="border border-border overflow-hidden bg-[#f4f7fa] py-12">
                <img
                  src={project.solutionImage}
                  alt="Solution Overview"
                  className="w-full h-auto max-w-4xl mx-auto"
                  loading="lazy"
                />
              </div>
            )}
          </AnimatedSection>

          {project.slug === 'c2c-rental' && (
            <AnimatedSection className="space-y-6">
              <SectionLabel>Live Website</SectionLabel>
              <h2 className="font-display text-[var(--text-heading)] tracking-tight">
                Interactive Preview.
              </h2>
              <div className="border border-border overflow-hidden bg-surface relative w-full h-[70vh] min-h-[500px] rounded-lg">
                <iframe
                  src="https://c2crental.ca"
                  title="C2C Rental Live Website"
                  className="w-full h-full border-none"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection className="space-y-6">
            <SectionLabel>Results / Impact</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              Outcomes.
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {project.impact.map((s) => (
                <div key={s.label} className="bg-surface border border-border p-6">
                  <div className="font-display text-[48px] leading-none text-accent">
                    {s.value}
                  </div>
                  <div className="mt-2 font-body text-[var(--text-small)] text-muted uppercase tracking-[0.12em]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="space-y-4">
            <SectionLabel>What I’d Do Differently</SectionLabel>
            <h2 className="font-display text-[var(--text-heading)] tracking-tight">
              Reflection.
            </h2>
            <p className="font-body italic text-[var(--text-body)] text-muted leading-relaxed max-w-3xl">
              {project.reflection}
            </p>
          </AnimatedSection>

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
                  ← Previous Project
                </Link>
              ) : (
                <span className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-muted">
                  ← Previous Project
                </span>
              )}
            </div>
            <div>
              {nav?.next ? (
                <Link
                  to={`/work/${nav.next.slug}`}
                  className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors duration-300"
                >
                  Next Project →
                </Link>
              ) : (
                <span className="font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-muted">
                  Next Project →
                </span>
              )}
            </div>
          </nav>
        </div>
      </section>
    </>
  )
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-none border border-border bg-surface px-4 py-3">
      <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted">
        {label}
      </div>
      <div className="mt-1 font-body text-[15px] text-text">{value}</div>
    </div>
  )
}



