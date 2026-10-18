import { useState } from 'react'
import { hasImage } from '../../lib/media'
import { Picture } from '../ui/Picture'

type Pair = { before: string; after: string; label: string }

const pairs: Pair[] = [
  { before: '/media/lotstudio/before-1', after: '/media/lotstudio/after-1', label: 'Exterior photo' },
  { before: '/media/lotstudio/before-2', after: '/media/lotstudio/after-2', label: 'Interior photo' },
]

/** Drag (or use arrow keys on) the range input to compare the original lot photo with the LotStudio output. */
export function BeforeAfter() {
  const available = pairs.filter((p) => hasImage(p.before) && hasImage(p.after))

  if (available.length === 0) return null

  return (
    <div className="space-y-10">
      {available.map((p) => (
        <Compare key={p.before} pair={p} />
      ))}
    </div>
  )
}

function Compare({ pair }: { pair: Pair }) {
  const [pos, setPos] = useState(50)
  return (
    <figure className="space-y-3">
      <div className="relative select-none overflow-hidden bg-surface">
        <Picture src={pair.after} alt={`${pair.label} after LotStudio AI: same vehicle on a clean studio background`} imgClassName="w-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Picture src={pair.before} alt={`${pair.label} before: original lot photo`} imgClassName="h-full w-full object-cover" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }} />
        <span className="absolute left-3 top-3 bg-dark/80 px-2 py-1 text-[var(--text-micro)] text-white">Before</span>
        <span className="absolute right-3 top-3 bg-dark/80 px-2 py-1 text-[var(--text-micro)] text-white">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${pair.label}: compare before and after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="text-[var(--text-small)] text-muted">{pair.label}: drag to compare the original and the cleaned-up listing image.</figcaption>
    </figure>
  )
}
