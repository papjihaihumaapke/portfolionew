import { homeContent } from '../../data/home'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Button } from '../ui/Button'

export function CtaStrip() {
  const content = homeContent.ctaStrip

  return (
    <section className="bg-accent py-16">
      <div className="container-page">
        <AnimatedSection className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight text-white whitespace-pre-line">
            {content.headline}
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="/contact"
              variant="filled"
              className="bg-dark border-dark hover:bg-black/80 hover:border-black/80"
            >
              {content.primary}
            </Button>
            <Button
              href="/assets/resume.pdf"
              variant="outlined"
              className="border-white text-white hover:bg-white hover:text-dark"
            >
              {content.secondary}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

