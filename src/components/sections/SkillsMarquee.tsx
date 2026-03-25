import { homeContent } from '../../data/home'
import { skillsRow1, skillsRow2 } from '../../data/skills'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Marquee } from '../ui/Marquee'
import { SectionLabel } from '../ui/SectionLabel'

export function SkillsMarquee() {
  const content = homeContent.skills

  return (
    <section className="bg-dark text-white py-20">
      <div className="container-page">
        <AnimatedSection className="space-y-10">
          <div className="space-y-4">
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">
              {content.headline}
            </h2>
            <p className="font-body text-[var(--text-body)] text-white/70 max-w-2xl">
              {content.sub}
            </p>
          </div>

          <div className="space-y-4">
            <Marquee items={skillsRow1} direction="left" />
            <Marquee items={skillsRow2} direction="right" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

