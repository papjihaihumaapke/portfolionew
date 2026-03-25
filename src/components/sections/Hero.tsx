import { motion } from 'framer-motion'
import { homeContent } from '../../data/home'
import { site } from '../../data/site'
import { Button } from '../ui/Button'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero() {
  const hero = homeContent.hero

  return (
    <section className="min-h-[100svh] flex flex-col justify-between pt-24 pb-10">
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
      <div className="container-page w-full py-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
          >
            <div
              className="font-display font-extrabold leading-[0.88] tracking-tight"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              <span className="block text-text">{hero.line1}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }}
          >
            <div
              className="font-display font-extrabold leading-[0.88] tracking-tight"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              <span
                className="block"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px var(--color-text)',
                }}
              >
                {hero.line2}
              </span>
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