import { motion } from 'framer-motion'
import { homeContent } from '../../data/home'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { TextReveal } from '../ui/TextReveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero() {
  const hero = homeContent.hero

  return (
    <section className="min-h-[100svh] flex flex-col justify-between pt-16 pb-10">
      <div className="container-page w-full">
        <motion.div
          className="flex items-center justify-between gap-6 font-body text-[var(--text-small)] text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0 }}
        >
          <div className="flex items-center gap-2">
            <span aria-hidden="true">👋</span>
            <span>{hero.topLeft}</span>
            <span className="text-text">
              <span className="font-semibold">{hero.name}</span>
              <span className="text-accent">.</span>
            </span>
          </div>
          <div className="text-right">{hero.topRight}</div>
        </motion.div>
      </div>

      {/* Headline row */}
      <div className="container-page w-full py-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <TextReveal
              text={hero.line1}
              as="h1"
              className="font-display font-extrabold leading-[0.88] tracking-tight text-text"
              style={{ fontSize: 'var(--text-hero)' }}
              delay={0.15}
              trigger="animate"
            />
            <div 
              className="font-display font-extrabold leading-[0.88] tracking-tight mt-2"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              <TextReveal
                text={hero.line2}
                as="span"
                className="block"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px var(--color-text)',
                }}
                delay={0.3}
                trigger="animate"
              />
            </div>
          </div>

          <motion.div 
            className="lg:col-span-4 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            <div className="relative aspect-[4/5] w-full max-w-[320px] bg-surface-dark border border-border overflow-hidden">
              <motion.img 
                src={hero.photoUrl} 
                alt={hero.photoAlt}
                className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-page w-full">
        <motion.div
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {hero.ctas.map((cta) => (
              <Button key={cta.label} href={cta.href} variant={cta.variant}>
                {cta.label}
              </Button>
            ))}
          </div>

          <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.12em] text-muted flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end">
            <span className="text-muted">{hero.trustedByLabel}</span>
            <span aria-hidden="true" className="text-border">—</span>
            {site.trustedBy.map((t) => (
              <span key={t} className="whitespace-nowrap">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}