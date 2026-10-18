import { gsap } from 'gsap'

/** Shared easing and timing so Framer Motion and GSAP feel like one system (150 to 400ms). */
export const ease = [0.16, 1, 0.3, 1] as const
export const duration = { fast: 0.15, base: 0.25, slow: 0.4 } as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Runs GSAP setup only when the user has not asked for reduced motion.
 * Returns a cleanup that reverts every tween created inside it.
 */
export function gsapWithMotion(scope: Element | null, setup: () => void) {
  const mm = gsap.matchMedia(scope ?? undefined)
  mm.add('(prefers-reduced-motion: no-preference)', setup)
  return () => mm.revert()
}

export { gsap }
