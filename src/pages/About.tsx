import { useEffect } from 'react'
import { aboutContent } from '../data/about'
import { Button } from '../components/ui/Button'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionLabel } from '../components/ui/SectionLabel'

export function About() {
  useEffect(() => {
    document.title = 'About — Hilal Malik'
  }, [])

  const c = aboutContent

  return (
    <>
      <section className="pt-24 pb-10">
        <div className="container-page">
          <AnimatedSection className="space-y-8">
            <div className="relative overflow-hidden border border-border bg-surface">
              <img
                src="/assets/hero-banner.jpg"
                alt="Mohammad Hilal Malik — UI/UX Designer & Visual Designer"
                className="w-full h-auto"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
            <p className="font-body text-[var(--text-subhead)] text-muted max-w-2xl">
              {c.hero.bioLine}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <AnimatedSection className="max-w-3xl space-y-4">
            <SectionLabel>{c.narrative.label}</SectionLabel>
            <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
              {c.narrative.heading}
            </h2>
            <p className="font-body text-[var(--text-body)] text-muted leading-relaxed whitespace-pre-line">
              {c.narrative.copy}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-dark text-white py-[var(--section-gap)]">
        <div className="container-page">
          <AnimatedSection className="space-y-10">
            <div className="space-y-4">
              <SectionLabel>{c.skills.label}</SectionLabel>
              <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
                {c.skills.headline}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {c.skills.groups.map((g) => (
                <div
                  key={g.title}
                  className="bg-white text-text border border-white/10 p-8 rounded-none"
                >
                  <div className="font-display text-[24px] leading-tight">{g.title}</div>
                  <div className="mt-3 font-body text-[var(--text-body)] text-muted">
                    {g.items}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <AnimatedSection className="space-y-10">
            <div className="space-y-4">
              <SectionLabel>{c.timeline.label}</SectionLabel>
              <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
                {c.timeline.headline}
              </h2>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
              <div className="space-y-10">
                {c.timeline.entries.map((e) => (
                  <div key={e.company} className="relative">
                    <div className="absolute -left-[7px] top-2 w-3 h-3 bg-accent" />
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div className="space-y-1">
                        <div className="font-body font-semibold text-text">{e.company}</div>
                        <div className="font-body italic text-muted">
                          {e.role} · {e.location}
                        </div>
                      </div>
                      <div className="font-body text-[var(--text-small)] text-muted sm:text-right">
                        {e.date}
                      </div>
                    </div>
                    <ul className="mt-3 list-disc pl-5 space-y-1 font-body text-[var(--text-body)] text-muted">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <AnimatedSection className="space-y-10">
            <div className="space-y-4">
              <SectionLabel>{c.education.label}</SectionLabel>
              <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
                Education.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {c.education.items.map((ed) => (
                <div key={ed.school} className="border border-border bg-surface p-8">
                  <div className="font-display text-[24px] leading-tight">{ed.school}</div>
                  <div className="mt-2 font-body text-[var(--text-body)] text-muted">
                    {ed.program}
                  </div>
                  <div className="mt-4 font-body text-[var(--text-small)] text-muted">
                    {ed.date} · {ed.location}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              <Button href={c.ctas.resume.href} variant="filled">
                {c.ctas.resume.label}
              </Button>
              <Button href={c.ctas.linkedin.href} variant="outlined">
                {c.ctas.linkedin.label}
              </Button>
              <Button href={c.ctas.behance.href} variant="outlined">
                {c.ctas.behance.label}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

