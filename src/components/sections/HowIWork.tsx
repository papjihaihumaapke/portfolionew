import { homeContent } from '../../data/home'
import { SectionLabel } from '../ui/SectionLabel'

export function HowIWork() {
  const c = homeContent.howIWork
  return (
    <section aria-labelledby="how-title" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <SectionLabel>{c.label}</SectionLabel>
          <h2 id="how-title" className="h2">{c.headline}</h2>
        </div>
        <ol className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
          {c.steps.map((s, i) => (
            <li key={s.title} className="space-y-3 bg-bg p-6 sm:p-8">
              <p className="font-display text-[var(--text-small)] text-accent-ink" aria-hidden="true">
                0{i + 1}
              </p>
              <h3 className="h3">{s.title}</h3>
              <p className="text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
