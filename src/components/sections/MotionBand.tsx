/**
 * Decorative type band: two rows of outlined words that slide in opposite directions as the
 * band scrolls past (scrubbed, native scroll). Hidden from assistive tech.
 */
const words = ['Design', 'Build', 'Ship', 'Measure']

function Row({ shift, outlined }: { shift: number; outlined?: boolean }) {
  return (
    <div className="flex whitespace-nowrap" data-marquee={shift} style={{ marginLeft: shift > 0 ? '-30%' : 0 }}>
      {Array.from({ length: 4 }).flatMap((_, r) =>
        words.map((w, i) => (
          <span
            key={`${r}-${w}`}
            className="font-display text-[clamp(56px,10vw,150px)] leading-[1.05] tracking-[-0.03em]"
            style={outlined ? { color: 'transparent', WebkitTextStroke: '1.5px var(--color-text)' } : undefined}
          >
            {w}
            <span className={i === 2 ? 'text-accent' : 'text-border'}> · </span>
          </span>
        )),
      )}
    </div>
  )
}

export function MotionBand() {
  return (
    <div aria-hidden="true" className="overflow-hidden py-14 md:py-20">
      <Row shift={-22} />
      <Row shift={22} outlined />
    </div>
  )
}
