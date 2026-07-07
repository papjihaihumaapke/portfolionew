import { motion } from 'framer-motion'
import { homeContent } from '../../data/home'
import { site } from '../../data/site'
import { Button } from '../ui/Button'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero() {
  const hero = homeContent.hero

  return (
    <section className="min-h-[100svh] flex flex-col justify-center gap-10 pt-24 pb-12">
      <div className="container-page w-full">
        {/* Banner */}
        <motion.div
          className="relative overflow-hidden border border-border bg-surface"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <motion.img
            src="/assets/hero-banner.jpg"
            alt="Mohammad Hilal Malik — UI/UX Designer & Visual Designer"
            className="w-full h-auto"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: easeOut }}
          />
        </motion.div>
      </div>

      {/* CTAs + trusted-by */}
      <div className="container-page w-full">
        <motion.div
          className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.5 }}
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
              <span key={t} className="whitespace-nowrap">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
