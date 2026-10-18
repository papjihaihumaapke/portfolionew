import { useEffect, useRef } from 'react'
import { homeContent } from '../../data/home'
import { prefersReducedMotion } from '../../lib/motion'

/**
 * Four verified numbers. Each counts up once when the strip scrolls into view. GSAP is
 * fetched only at that moment, and never with reduced motion (the final values are in the HTML).
 */
export function ProofStrip() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let cleanup: (() => void) | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        import('../../lib/gsap').then(({ gsap, gsapWithMotion }) => {
          cleanup = gsapWithMotion(el, () => {
            el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
              const obj = { v: 0 }
              gsap.to(obj, { v: Number(node.dataset.count), duration: 0.4, ease: 'power2.out', onUpdate: () => (node.textContent = String(Math.round(obj.v))) })
            })
          })
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cleanup?.()
    }
  }, [])

  return (
    <section ref={ref} aria-label="At a glance" className="on-dark bg-dark text-white">
      <dl className="container-page grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16">
        {homeContent.proof.map((p) => (
          <div key={p.label} className="flex flex-col-reverse border-l border-border-dark pl-5">
            <dt className="mt-3 text-muted-dark">{p.label}</dt>
            <dd className="font-display text-[clamp(40px,5vw,64px)] leading-none">
              {p.prefix}
              <span data-count={p.value}>{p.value}</span>
              {p.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
