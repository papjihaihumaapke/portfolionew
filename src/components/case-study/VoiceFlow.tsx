/** Conversation flow for the voice and chat agents, drawn as inline SVG. */
const W = 160
const H = 56

type Node = { id: string; x: number; y: number; label: string; sub?: string; tone?: 'accent' | 'dark' | 'muted' }

const nodes: Node[] = [
  { id: 'trigger', x: 20, y: 152, label: 'Trigger', sub: 'Call or chat comes in', tone: 'dark' },
  { id: 'intent', x: 230, y: 152, label: 'Intent detection', sub: 'What does the caller want?', tone: 'accent' },
  { id: 'booking', x: 450, y: 40, label: 'Booking', sub: 'Find a slot, book it' },
  { id: 'lead', x: 450, y: 152, label: 'Lead capture', sub: 'Name, contact, vehicle' },
  { id: 'fallback', x: 450, y: 264, label: 'Fallback', sub: 'Unsure or off-script', tone: 'muted' },
  { id: 'confirm', x: 660, y: 96, label: 'Confirmation', sub: 'Read back what was booked' },
  { id: 'handoff', x: 660, y: 264, label: 'Human handoff', sub: 'Route to staff', tone: 'dark' },
]

const edges: [string, string][] = [
  ['trigger', 'intent'],
  ['intent', 'booking'],
  ['intent', 'lead'],
  ['intent', 'fallback'],
  ['booking', 'confirm'],
  ['lead', 'confirm'],
  ['fallback', 'handoff'],
]

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

const fill = { accent: '#e8470a', dark: '#1a1a1a', muted: '#edecea' } as const

export function VoiceFlow() {
  return (
    <figure className="space-y-3">
      <div className="overflow-x-auto border border-border bg-white p-4">
        <svg viewBox="0 0 840 340" role="img" aria-labelledby="vf-title vf-desc" className="h-auto min-w-[720px] w-full font-body">
          <title id="vf-title">Voice and chat agent conversation flow</title>
          <desc id="vf-desc">
            A call or chat triggers intent detection. Intent routes to booking, lead capture or a fallback. Booking and lead capture end in a
            confirmation. The fallback hands the conversation to a person.
          </desc>
          <defs>
            <marker id="vf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="#5f5f5f" />
            </marker>
          </defs>
          {edges.map(([a, b]) => {
            const s = byId[a]
            const t = byId[b]
            const x1 = s.x + W
            const y1 = s.y + H / 2
            const x2 = t.x - 4
            const y2 = t.y + H / 2
            const mx = (x1 + x2) / 2
            return (
              <path key={a + b} d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} fill="none" stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#vf-arrow)" />
            )
          })}
          {nodes.map((n) => {
            const bg = n.tone ? fill[n.tone] : '#ffffff'
            const fg = n.tone === 'accent' || n.tone === 'dark' ? '#ffffff' : '#1a1a1a'
            return (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={W} height={H} fill={bg} stroke={n.tone ? bg : '#1a1a1a'} />
                <text x={n.x + 12} y={n.y + 23} fill={fg} fontSize="15" fontWeight="600">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x + 12} y={n.y + 42} fill={fg} fontSize="11.5">
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <figcaption className="text-[var(--text-small)] text-muted">Every conversation follows the same path, with a clear way out to a person.</figcaption>
    </figure>
  )
}
