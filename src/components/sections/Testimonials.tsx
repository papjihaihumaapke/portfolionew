import { homeContent } from '../../data/home'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionLabel } from '../ui/SectionLabel'

export function Testimonials() {
  const content = homeContent.testimonials

  return (
    <section className="bg-surface py-[var(--section-gap)]">
      <div className="container-page">
        <AnimatedSection className="space-y-10">
          <div className="space-y-3">
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
              {content.headline}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {content.items.map((t) => (
              <div
                key={t.title}
                className="relative bg-white border border-border p-8 rounded-none overflow-hidden"
              >
                <div className="absolute -top-4 -left-2 font-display text-[80px] leading-none text-accent/15 select-none">
                  “
                </div>
                <div className="relative space-y-6">
                  <p className="font-body text-[var(--text-body)] text-text leading-relaxed">
                    {t.quote}
                  </p>
                  <div className="space-y-1">
                    <div className="font-body font-semibold text-text">{t.name}</div>
                    <div className="font-body text-[var(--text-small)] text-muted">
                      {t.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

