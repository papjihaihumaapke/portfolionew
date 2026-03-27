import { motion } from 'framer-motion'
import type React from 'react'

export type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fade-up' | 'fade-in' | 'scale-up' | 'none'
  amount?: number
}

const variants = {
  'fade-up': {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  'fade-in': {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  'scale-up': {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
  },
  'none': {
    initial: {},
    whileInView: {},
  }
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0, 
  variant = 'fade-up',
  amount = 0.15
}: AnimatedSectionProps) {
  const animation = variants[variant]

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      whileInView={animation.whileInView}
      viewport={{ once: true, amount }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], 
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}

