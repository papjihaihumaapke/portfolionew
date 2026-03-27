import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'
import { SmoothScroll } from '../ui/SmoothScroll'

export function Layout() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:top-3 focus:left-3 focus:bg-bg focus:text-text focus:px-4 focus:py-2 focus:border focus:border-border"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Header />

      <main id="main" className="pt-16">
        <Outlet />
      </main>

      <Footer />
    </SmoothScroll>
  )
}

