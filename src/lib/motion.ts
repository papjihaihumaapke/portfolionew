/** Shared easing and timing so Framer Motion, GSAP and CSS feel like one system (150 to 400ms). */
export const ease = [0.16, 1, 0.3, 1] as const
export const duration = { fast: 0.15, base: 0.25, slow: 0.4 } as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
