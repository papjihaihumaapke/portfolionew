import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { track } from '../../lib/analytics'

const links = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="on-dark bg-dark text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="space-y-4 md:col-span-6">
          <p className="font-display text-[28px] leading-tight">
            {site.shortName}
            <span className="text-accent">.</span>
          </p>
          <p className="text-muted-dark">
            {site.title}. Based in {site.location}.
          </p>
          <a
            className="link-underline inline-block text-white"
            href={`mailto:${site.email}`}
            onClick={() => track('contact_click', { channel: 'email' })}
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4 text-muted-dark">Site</p>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="link-underline no-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-muted-dark">Elsewhere</p>
          <ul className="space-y-2">
            {site.socialLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline no-underline"
                  onClick={() => track('contact_click', { channel: l.label })}
                >
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border-dark">
        <div className="container-page flex flex-col gap-2 py-5 text-[var(--text-micro)] text-muted-dark sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}</p>
          <p>Designed and built by me, in React.</p>
        </div>
      </div>
    </footer>
  )
}
