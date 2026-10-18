import { MotionConfig } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-white focus:px-4 focus:py-3 focus:font-medium focus:text-text focus:outline focus:outline-2 focus:outline-accent-ink"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Header />

      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>

      <Footer />
    </MotionConfig>
  )
}
