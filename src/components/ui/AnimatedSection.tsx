import { MotionConfig, motion } from 'framer-motion'
import type React from 'react'
import { duration, ease } from '../../lib/motion'

export type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fade-up' | 'fade-in' | 'none'
  as?: 'div' | 'section' | 'li'
}

const variants = {
  'fade-up': { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } },
  'fade-in': { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
  none: { initial: {}, whileInView: {} },
}

/** Short fade-in on scroll. MotionConfig reducedMotion="user" turns it into an instant swap. */
export function AnimatedSection({ children, className, delay = 0, variant = 'fade-up', as = 'div' }: AnimatedSectionProps) {
  const Comp = motion[as]
  return (
    <MotionConfig reducedMotion="user">
      <Comp
        className={className}
        initial={variants[variant].initial}
        whileInView={variants[variant].whileInView}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: duration.slow, ease, delay }}
      >
        {children}
      </Comp>
    </MotionConfig>
  )
}
