import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../data/site'
import { track } from '../../lib/analytics'
import { duration, ease } from '../../lib/motion'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

const nav = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

function Monogram({ dark = false }: { dark?: boolean }) {
  return (
    <span className="font-display text-[28px] font-semibold leading-none tracking-tighter" aria-hidden="true">
      <span className={dark ? 'text-white' : 'text-text'}>H</span>
      <span className="text-accent">.</span>
    </span>
  )
}

/** Keeps Tab focus inside `container` while active. */
function useFocusTrap(container: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !container.current) return
    const el = container.current
    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((n) => n.offsetParent !== null)
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [container, active])
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useFocusTrap(menuRef, isOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on navigation.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const toggle = toggleRef.current
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      toggle?.focus()
    }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 h-[var(--header-h)] border-b bg-[rgba(245,244,242,0.92)] backdrop-blur-md transition-colors duration-base',
          scrolled ? 'border-border' : 'border-transparent',
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link to="/" aria-label={`${site.shortName}, home`} className="-m-2 p-2">
            <Monogram />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'relative py-2 font-body text-[15px] font-medium text-text transition-colors duration-base hover:text-accent-ink',
                        'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-accent after:transition-transform after:duration-base',
                        isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button href={site.resumePdf} download event="resume_download" variant="filled" className="min-h-[44px] px-5 py-2">
              <Download size={16} aria-hidden="true" />
              Download resume
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-border bg-white md:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease }}
            className="on-dark fixed inset-0 z-[60] overflow-y-auto bg-dark text-white md:hidden"
          >
            <div className="container-page flex h-[var(--header-h)] items-center justify-between">
              <Link to="/" aria-label={`${site.shortName}, home`} className="-m-2 p-2">
                <Monogram dark />
              </Link>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/30"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page pt-10">
              <ul className="flex flex-col gap-5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="h2 block py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href={site.resumePdf}
                download
                onClick={() => track('resume_download', { href: site.resumePdf })}
                className="mt-10 inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-accent-ink px-6 py-3 font-medium text-white"
              >
                <Download size={16} aria-hidden="true" />
                Download resume
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
