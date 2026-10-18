/**
 * GA4, loaded only when VITE_GA_ID is set at build time. Without it, track() is a no-op
 * and no analytics script ships.
 */
type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path })
}

export type TrackEvent = 'resume_download' | 'see_my_work' | 'contact_click' | 'lotstudio_live_click'

export function track(event: TrackEvent, params: Record<string, string> = {}) {
  window.gtag?.('event', event, params)
}
