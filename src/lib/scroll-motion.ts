/**
 * Scroll-triggered motion, driven by data attributes so components stay plain markup:
 *
 *   data-reveal            fade up once when it enters
 *   data-reveal="mask"     heading rises from behind a clip mask
 *   data-reveal-stagger    direct children fade up in sequence
 *   data-parallax="0.12"   image drifts with scroll inside its (overflow-hidden) frame
 *   data-draw              SVG paths inside draw their stroke once
 *   data-scrub-x           element scales in on X as its section scrolls past (progress lines)
 *   data-marquee="-25"     element translates on X by that % across its section (scrubbed)
 *   data-count             leading number counts up once ("300+", "$26", "~18")
 *
 * Native scrolling only. GSAP and ScrollTrigger load on demand, after the page is interactive.
 * With prefers-reduced-motion everything stays static, and anything already on screen when the
 * page loads is left alone so server-rendered content never flickers.
 */
import { prefersReducedMotion } from './motion'

const inView = (el: Element) => {
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight * 0.92 && r.bottom > 0
}

export async function initScrollMotion(root: HTMLElement): Promise<() => void> {
  if (prefersReducedMotion()) return () => {}
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    const ease = 'power3.out'
    const once = (el: Element, start = 'top 88%') => ({ trigger: el, start, once: true })

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (inView(el)) return
      if (el.dataset.reveal === 'mask') {
        gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', yPercent: 30 }, { clipPath: 'inset(0 0 0% 0)', yPercent: 0, duration: 0.4, ease, scrollTrigger: once(el), clearProps: 'clipPath,transform' })
      } else {
        gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.4, ease, scrollTrigger: once(el), clearProps: 'opacity,visibility,transform' })
      }
    })

    root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((el) => {
      const items = Array.from(el.children).filter((c) => !inView(c))
      if (!items.length) return
      gsap.from(items, { autoAlpha: 0, y: 24, duration: 0.4, ease, stagger: 0.06, scrollTrigger: once(el), clearProps: 'opacity,visibility,transform' })
    })

    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax) || 0.1
      gsap.fromTo(el, { yPercent: -amount * 50, scale: 1 + amount }, { yPercent: amount * 50, scale: 1 + amount, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })

    root.querySelectorAll<SVGElement>('[data-draw]').forEach((svg) => {
      const paths = svg.querySelectorAll<SVGGeometryElement>('path, line, polyline')
      paths.forEach((p) => {
        const len = p.getTotalLength?.() ?? 0
        if (!len) return
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', delay: 0.05, scrollTrigger: once(svg, 'top 80%'), clearProps: 'strokeDasharray,strokeDashoffset' })
      })
    })

    root.querySelectorAll<HTMLElement>('[data-scrub-x]').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: 'left center', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top 75%', end: 'bottom 60%', scrub: true } })
    })

    root.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
      const shift = Number(el.dataset.marquee) || -25
      gsap.fromTo(el, { xPercent: 0 }, { xPercent: shift, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })

    root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const m = (el.textContent ?? '').match(/^(\D*)(\d[\d,]*)(.*)$/)
      if (!m || inView(el)) return
      const [, pre, num, post] = m
      const target = Number(num.replace(/,/g, ''))
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: once(el, 'top 90%'),
        onStart: () => void (el.textContent = `${pre}0${post}`),
        onUpdate: () => void (el.textContent = `${pre}${Math.round(obj.v).toLocaleString('en-CA')}${post}`),
        onComplete: () => void (el.textContent = `${pre}${num}${post}`),
      })
    })
  }, root)

  // Images that load late change layout; recalculate trigger positions once they settle.
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  const timer = window.setTimeout(refresh, 1200)

  return () => {
    window.clearTimeout(timer)
    window.removeEventListener('load', refresh)
    ctx.revert()
  }
}
