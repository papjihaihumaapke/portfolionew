import { homeContent } from '../../data/home'
import { Button } from '../ui/Button'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'
import { TextReveal } from '../ui/TextReveal'

export function AboutSnippet() {
  const content = homeContent.aboutSnippet

  return (
    <section className="section">
      <div className="container-page">
        <AnimatedSection variant="none" className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-6">
            <SectionLabel>{content.label}</SectionLabel>
            <TextReveal
              text={content.pullQuote}
              className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight whitespace-pre-line"
            />
            <AnimatedSection delay={0.2} className="space-y-6">
              <p className="font-body text-[var(--text-body)] text-muted whitespace-pre-line max-w-xl">
                {content.body}
              </p>
              <div>
                <Button href="/about" variant="outlined">
                  {content.cta}
                </Button>
              </div>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {content.stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface border border-border p-6 rounded-none"
              >
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
      </div>
    </section>
  )
}

