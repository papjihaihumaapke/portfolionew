import { gsap } from 'gsap'

/**
 * Runs GSAP setup only when the user has not asked for reduced motion.
 * Returns a cleanup that reverts every tween created inside it.
 * Import this module dynamically so GSAP stays off the critical path.
 */
export function gsapWithMotion(scope: Element | null, setup: () => void) {
  const mm = gsap.matchMedia(scope ?? undefined)
  mm.add('(prefers-reduced-motion: no-preference)', setup)
  return () => mm.revert()
}

export { gsap }
