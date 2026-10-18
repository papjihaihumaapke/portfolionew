import { homeContent } from '../../data/home'
import { SectionLabel } from '../ui/SectionLabel'

export function WhatIDo() {
  const c = homeContent.whatIDo
  return (
    <section aria-labelledby="what-title" className="on-dark section bg-dark text-white">
      <div className="container-page space-y-14">
        <div className="space-y-4">
          <SectionLabel dark>{c.label}</SectionLabel>
          <h2 id="what-title" className="h2 max-w-[18ch]" data-reveal="mask">{c.headline}</h2>
        </div>
        <ul className="grid gap-12 md:grid-cols-3 md:gap-10" data-reveal-stagger="">
          {c.columns.map((col, i) => (
            <li key={col.title} className="space-y-4 border-t border-border-dark pt-6">
              <p className="font-display text-[var(--text-small)] text-accent-dark" aria-hidden="true">0{i + 1}</p>
              <h3 className="h3">{col.title}</h3>
              <p className="text-muted-dark">{col.body}</p>
              <p className="text-[var(--text-small)] text-white">{col.tools}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
