import type { Block, FlowBlock, FlowNode } from '../../data/projects'
import { cn } from '../../lib/utils'

/** Renders one case study content block (diagram, process steps or cards). */
export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'flow':
      return <Flow block={block} />
    case 'steps':
      return (
        <figure className="space-y-4">
          {block.title && <h3 className="h3">{block.title}</h3>}
          <ol className={cn('grid gap-px bg-border sm:grid-cols-2', block.steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')} data-reveal-stagger="">
            {block.steps.map((s, i) => (
              <li key={s.title} className="space-y-2 bg-bg p-5">
                <p className="font-display text-[var(--text-small)] text-accent-ink" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="text-[18px] font-semibold leading-snug">{s.title}</p>
                <p className="text-[var(--text-small)] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          {block.caption && <figcaption className="text-[var(--text-small)] text-muted">{block.caption}</figcaption>}
        </figure>
      )
    case 'cards':
      return (
        <figure className="space-y-4">
          {block.title && <h3 className="h3">{block.title}</h3>}
          <ul className={cn('grid gap-4', block.items.length > 1 && 'md:grid-cols-2', block.items.length > 4 && 'lg:grid-cols-3')} data-reveal-stagger="">
            {block.items.map((c) => (
              <li key={c.title} className="space-y-2 border border-border bg-white p-5">
                {c.label && <p className="eyebrow text-accent-ink">{c.label}</p>}
                <p className="text-[18px] font-semibold leading-snug">{c.title}</p>
                {c.body && <p className="text-[var(--text-small)] text-muted">{c.body}</p>}
              </li>
            ))}
          </ul>
          {block.caption && <figcaption className="text-[var(--text-small)] text-muted">{block.caption}</figcaption>}
        </figure>
      )
    case 'decisions':
      return (
        <figure className="space-y-4">
          {block.title && <h3 className="h3">{block.title}</h3>}
          <ul className="divide-y divide-border border-y border-border" data-reveal-stagger="">
            {block.items.map((d) => (
              <li key={d.problem} className="grid gap-3 py-5 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6">
                <div>
                  <p className="eyebrow text-muted">What broke</p>
                  <p className="mt-1">{d.problem}</p>
                </div>
                <span aria-hidden="true" className="hidden pt-6 text-accent-ink md:block">
                  →
                </span>
                <div>
                  <p className="eyebrow text-accent-ink">What I changed</p>
                  <p className="mt-1">{d.decision}</p>
                </div>
              </li>
            ))}
          </ul>
          {block.caption && <figcaption className="text-[var(--text-small)] text-muted">{block.caption}</figcaption>}
        </figure>
      )
  }
}

/* -------------------------------------------------------------------------- */
/*  Flow diagram: columns of nodes, edges drawn left to right (or down within */
/*  a column). SVG from md up; a readable ordered list on small screens.       */
/* -------------------------------------------------------------------------- */

const W = 1000
const PAD = 12
const VGAP = 22
const LABEL_LH = 19
const SUB_LH = 15
const fills = { accent: '#b53505', dark: '#1a1a1a', muted: '#edecea' } as const

/** Splits text into lines of roughly `chars` characters (never truncates). */
function wrap(text: string, chars: number) {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > chars && line) {
      lines.push(line)
      line = w
    } else line = (line + ' ' + w).trim()
  }
  if (line) lines.push(line)
  return lines
}

function Flow({ block }: { block: FlowBlock }) {
  const n = block.columns.length
  const nw = Math.min(210, (W - 2 * PAD - (n - 1) * 44) / n)
  const gap = n > 1 ? (W - 2 * PAD - n * nw) / (n - 1) : 0
  const labelChars = Math.floor((nw - 22) / 8.4)
  const subChars = Math.floor((nw - 22) / 6.4)
  const lines = (node: FlowNode) => ({ label: wrap(node.label, labelChars), sub: node.sub ? wrap(node.sub, subChars) : [] })
  // Every box in a diagram shares one height: the tallest wrapped text plus padding.
  const NH = Math.max(52, ...block.columns.flat().map((node) => {
    const l = lines(node)
    return l.label.length * LABEL_LH + l.sub.length * SUB_LH + 26
  }))
  const tallest = Math.max(...block.columns.map((c) => c.length))
  const H = tallest * NH + (tallest - 1) * VGAP + 2 * PAD
  const pos = new Map<string, { x: number; y: number; col: number; node: FlowNode }>()
  block.columns.forEach((col, ci) => {
    const colH = col.length * NH + (col.length - 1) * VGAP
    col.forEach((node, ni) => pos.set(node.id, { x: PAD + ci * (nw + gap), y: (H - colH) / 2 + ni * (NH + VGAP), col: ci, node }))
  })
  const desc = block.edges.map(([a, b]) => `${pos.get(a)?.node.label} to ${pos.get(b)?.node.label}`).join('; ')
  const id = block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <figure className="space-y-3">
      <h3 className="h3">{block.title}</h3>

      <ol className="space-y-px border border-border bg-border md:hidden" aria-label={block.title} data-reveal-stagger="">
        {block.columns.map((col, ci) => (
          <li key={ci} className="bg-white px-4 py-3">
            <p className="eyebrow text-accent-ink">Stage {ci + 1}</p>
            <ul className="mt-1 space-y-1.5">
              {col.map((node) => (
                <li key={node.id}>
                  <span className="font-semibold">{node.label}</span>
                  {node.sub && <span className="text-[var(--text-small)] text-muted">. {node.sub}</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="hidden border border-border bg-white p-5 md:block">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-t ${id}-d`} className="h-auto w-full font-body" data-draw="">
          <title id={`${id}-t`}>{block.title}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          <defs>
            <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="#5f5f5f" />
            </marker>
          </defs>
          {block.edges.map(([a, b]) => {
            const s = pos.get(a)
            const t = pos.get(b)
            if (!s || !t) return null
            let d: string
            if (t.col > s.col) {
              const x1 = s.x + nw
              const y1 = s.y + NH / 2
              const x2 = t.x - 4
              const y2 = t.y + NH / 2
              const mx = (x1 + x2) / 2
              d = `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`
            } else {
              d = `M${s.x + nw / 2} ${s.y + NH} L${t.x + nw / 2} ${t.y - 4}`
            }
            return <path key={a + b} d={d} fill="none" stroke="#5f5f5f" strokeWidth="1.5" markerEnd={`url(#${id}-arrow)`} />
          })}
          {[...pos.values()].map(({ x, y, node }) => {
            const tone = node.tone
            const fg = tone === 'accent' || tone === 'dark' ? '#ffffff' : '#1a1a1a'
            const { label, sub } = lines(node)
            const top = y + (NH - (label.length * LABEL_LH + sub.length * SUB_LH)) / 2 + 14
            return (
              <g key={node.id}>
                <rect x={x} y={y} width={nw} height={NH} fill={tone ? fills[tone] : '#ffffff'} stroke={tone ? fills[tone] : '#1a1a1a'} />
                {label.map((l, i) => (
                  <text key={l} x={x + 11} y={top + i * LABEL_LH} fill={fg} fontSize="15" fontWeight="600">
                    {l}
                  </text>
                ))}
                {sub.map((l, i) => (
                  <text key={l} x={x + 11} y={top + label.length * LABEL_LH + i * SUB_LH + 2} fill={fg} fontSize="12" opacity={tone === 'accent' || tone === 'dark' ? 0.9 : 1}>
                    {l}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>
      {block.caption && <figcaption className="text-[var(--text-small)] text-muted">{block.caption}</figcaption>}
    </figure>
  )
}
