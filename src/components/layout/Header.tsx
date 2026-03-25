import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../data/site'
import { Button } from '../ui/Button'

function useScrolledPast(y: number) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > y)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [y])

  return past
}

export function Header() {
  const isPast80 = useScrolledPast(80)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = useMemo(() => site.headerNav, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50',
        'bg-[rgba(245,244,242,0.92)] backdrop-blur-[12px]',
        isPast80 ? 'border-b border-border' : 'border-b border-transparent',
      ].join(' ')}
    >
      <div className="container-page h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-[18px] tracking-tight"
          aria-label="Go to homepage"
        >
          HM<span className="text-accent">.</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                [
                  'relative font-body text-[var(--text-small)] uppercase tracking-[0.15em] text-text',
                  'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-300',
                  'hover:after:scale-x-100',
                  isActive ? 'after:scale-x-100' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button href={`mailto:${site.email}`} variant="filled">
            Contact
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-none border border-border bg-transparent"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-dark text-white"
          >
            <div className="container-page pt-6 flex items-center justify-between">
              <Link
                to="/"
                className="font-display text-[18px] tracking-tight"
                aria-label="Go to homepage"
              >
                HM<span className="text-accent">.</span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center w-11 h-11 rounded-none border border-white/20 bg-transparent"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <motion.nav
              aria-label="Mobile navigation"
              className="container-page pt-16"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
            >
              <ul className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -18 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                  >
                    <Link
                      to={item.href}
                      className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -18 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="pt-6"
                >
                  <Button href="/contact" variant="filled" className="w-full">
                    Contact
                  </Button>
                </motion.li>
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

