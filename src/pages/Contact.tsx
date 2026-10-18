import { ArrowUpRight, Download } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { SectionLabel } from '../components/ui/SectionLabel'
import { contactContent } from '../data/contact'
import { site } from '../data/site'
import { track } from '../lib/analytics'

export function Contact() {
  useEffect(() => {
    document.title = 'Contact | Hilal Malik'
  }, [])

  const c = contactContent

  return (
    <section className="section pt-10 md:pt-16">
      <div className="container-page space-y-12">
        <div className="space-y-8">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="h1 max-w-[12ch]">{c.headline}</h1>
          <p className="lead text-text">{c.body}</p>
        </div>

        <a
          href={`mailto:${site.email}`}
          onClick={() => track('contact_click', { channel: 'email' })}
          className="group inline-flex flex-wrap items-center gap-3 break-all font-display text-[clamp(24px,4vw,48px)] leading-tight underline decoration-1 underline-offset-[0.18em] hover:text-accent-ink transition-colors duration-base"
        >
          {site.email}
          <ArrowUpRight aria-hidden="true" className="h-[0.8em] w-[0.8em] shrink-0" />
        </a>
        <p className="text-muted">Email is the best way to reach me. {c.responseTime}.</p>

        <ul className="grid gap-px border-y border-border bg-border sm:grid-cols-3">
          {site.socialLinks.map((l) => (
            <li key={l.href} className="bg-bg">
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('contact_click', { channel: l.label })}
                className="flex min-h-[72px] items-center justify-between px-1 py-5 text-[20px] font-medium hover:text-accent-ink transition-colors duration-base sm:px-6"
              >
                {l.label}
                <ArrowUpRight size={20} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <Button href={site.resumePdf} download event="resume_download" variant="outlined">
          <Download size={18} aria-hidden="true" />
          Download resume
        </Button>
      </div>
    </section>
  )
}
