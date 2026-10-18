import type React from 'react'

export type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  /** "fade-up" reveals the block; "stagger" reveals its direct children in sequence. */
  variant?: 'fade-up' | 'stagger'
  as?: 'div' | 'section' | 'li' | 'ul' | 'ol'
  id?: string
}

/** Marks a block for the scroll-motion engine (src/lib/scroll-motion.ts). Renders plain markup. */
export function AnimatedSection({ children, className, variant = 'fade-up', as: Comp = 'div', id }: AnimatedSectionProps) {
  const attrs = variant === 'stagger' ? { 'data-reveal-stagger': '' } : { 'data-reveal': '' }
  return (
    <Comp id={id} className={className} {...attrs}>
      {children}
    </Comp>
  )
}
