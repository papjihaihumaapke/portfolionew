import { useEffect } from 'react'
import { initScrollMotion } from './scroll-motion'

/**
 * Starts scroll-triggered motion for the current page once the browser is idle, and tears it
 * down when the page (or anything in `deps`) changes. Call it from page components so the
 * lazily loaded route content exists before triggers are measured.
 */
export function useScrollMotion(deps: unknown[] = []) {
  useEffect(() => {
    const root = document.getElementById('main')
    if (!root) return
    let cleanup: (() => void) | undefined
    let cancelled = false
    const run = () =>
      initScrollMotion(root).then((c) => {
        if (cancelled) c()
        else cleanup = c
      })
    const idle = window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 200)
    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
