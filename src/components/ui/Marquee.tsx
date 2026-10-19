import { Pause, Play } from 'lucide-react'
import type React from 'react'
import { cn } from '../../lib/utils'

/**
 * Seamless marquee: the list renders twice and the track slides by half its width (CSS in
 * index.css). It pauses on hover, on keyboard focus and when `paused` is set. The duplicate is
 * hidden from assistive tech and skipped by Tab (`hidden` is passed to `renderItem`). With
 * reduced motion it stops and becomes a row that scrolls by hand.
 */
export function Marquee<T>({
  items,
  renderItem,
  label,
  secondsPerItem = 6,
  paused = false,
  gapClassName = 'gap-6 pr-6',
}: {
  items: T[]
  renderItem: (item: T, hidden: boolean) => React.ReactNode
  label: string
  secondsPerItem?: number
  paused?: boolean
  gapClassName?: string
}) {
  return (
    <div className={cn('marquee', paused && 'is-paused')}>
      <div className="marquee__track" style={{ ['--marquee-duration' as string]: `${items.length * secondsPerItem}s` }}>
        <ul className={cn('flex shrink-0', gapClassName)} aria-label={label}>
          {items.map((item) => renderItem(item, false))}
        </ul>
        <ul className={cn('marquee__copy flex shrink-0 motion-reduce:hidden', gapClassName)} aria-hidden="true">
          {items.map((item) => renderItem(item, true))}
        </ul>
      </div>
    </div>
  )
}

/** Pause / Play control for a marquee (hidden with reduced motion, where nothing moves). */
export function MarqueeToggle({ paused, onToggle, what, className }: { paused: boolean; onToggle: () => void; what: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className={cn(
        'inline-flex h-11 items-center gap-2 border border-border bg-white px-3 text-[14px] font-medium transition-colors duration-base hover:border-dark motion-reduce:hidden',
        className,
      )}
    >
      {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      {paused ? 'Play' : 'Pause'}
      <span className="sr-only"> {what}</span>
    </button>
  )
}
