import { Github, Linkedin, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'

const iconMap = {
  LinkedIn: Linkedin,
  Behance: Palette,
  GitHub: Github,
} as const

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container-page py-16 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="font-display text-[28px] leading-tight">
            Designs with logic.
          </div>

          <div className="flex items-center gap-4">
            {site.socialLinks.map((item) => {
              const Icon = iconMap[item.label as keyof typeof iconMap]
              const isBehance = item.label === 'Behance'
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    'inline-flex items-center gap-2 font-body text-[var(--text-small)] transition-colors duration-300',
                    isBehance 
                      ? 'text-accent hover:text-white border border-accent/30 px-3 py-1 bg-accent/5' 
                      : 'text-white/80 hover:text-white'
                  ].join(' ')}
                >
                  {Icon ? <Icon size={18} aria-hidden="true" /> : null}
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-white/60">
              Links
            </div>
            <ul className="space-y-2">
              {[...site.headerNav, { label: 'Contact', href: '/contact' }].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="font-body text-[var(--text-small)] text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-white/60">
              Contact
            </div>
            <a
              className="font-body text-[var(--text-small)] text-white/80 hover:text-white transition-colors duration-300"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 font-body text-[var(--text-micro)] text-white/60 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 {site.name}.</div>
          <div>Built with React + Vite.</div>
        </div>
      </div>
    </footer>
  )
}

