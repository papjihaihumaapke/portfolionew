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
      <section className="bg-dark text-white">
        <div className="container-page pt-28 pb-16">
          <AnimatedSection className="space-y-8">
            <div className="font-display font-extrabold leading-[0.8] tracking-tight text-[clamp(64px,10vw,160px)]">
              {c.hero.headline.slice(0, -1)}
              <span className="text-accent">.</span>
            </div>
            <p className="font-body text-white/70 max-w-2xl">{c.hero.bioLine}</p>

            <div className="border border-white/15 overflow-hidden">
              <img
                src={c.hero.photoUrl}
                alt={c.hero.photoAlt}
                className="w-full h-[clamp(240px,40vw,420px)] object-cover grayscale contrast-110"
                loading="eager"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <AnimatedSection className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-4">
              <SectionLabel>{c.narrative.label}</SectionLabel>
              <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
                {c.narrative.heading}
              </h2>
              <p className="font-body text-[var(--text-body)] text-muted leading-relaxed whitespace-pre-line">
                {c.narrative.copy}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-border overflow-hidden">
                <img
                  src={c.narrative.photoUrl}
                  alt={c.narrative.photoAlt}
                  className="w-full h-[clamp(340px,45vw,640px)] object-cover grayscale contrast-110"
                  loading="lazy"
                />
              </div>
            </div>
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

