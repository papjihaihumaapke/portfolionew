import { useEffect } from 'react'
import { site } from '../data/site'
import { contactContent } from '../data/contact'
import { SectionLabel } from '../components/ui/SectionLabel'

export function Contact() {
  useEffect(() => {
    document.title = 'Contact | Hilal Malik'
  }, [])

  const c = contactContent

  return (
    <section className="section">
      <div className="container-page space-y-8">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight">{c.headline}</h1>
        <p className="font-body text-[var(--text-subhead)] text-muted">{c.body}</p>
        <a href={`mailto:${site.email}`} className="font-display text-[var(--text-heading)] underline">
          {site.email}
        </a>
        <ul className="flex gap-6">
          {site.socialLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
