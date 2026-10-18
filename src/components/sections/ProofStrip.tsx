import { homeContent } from '../../data/home'

/** Four verified numbers. Each counts up once when the strip scrolls into view (data-count). */
export function ProofStrip() {
  return (
    <section aria-label="At a glance" className="on-dark bg-dark text-white">
      <dl className="container-page grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16" data-reveal-stagger="">
        {homeContent.proof.map((p) => (
          <div key={p.label} className="flex flex-col-reverse border-l border-border-dark pl-5">
            <dt className="mt-3 text-muted-dark">{p.label}</dt>
            <dd className="font-display text-[clamp(40px,5vw,64px)] leading-none tabular-nums" data-count="">
              {p.prefix}
              {p.value}
              {p.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
