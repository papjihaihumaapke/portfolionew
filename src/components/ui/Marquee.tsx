export type MarqueeDirection = 'left' | 'right'

export type MarqueeProps = {
  items: readonly string[]
  direction?: MarqueeDirection
  className?: string
  itemClassName?: string
  animationClassName?: string
}

export function Marquee({
  items,
  direction = 'left',
  className,
  itemClassName,
  animationClassName,
}: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className={['w-full overflow-hidden', className].filter(Boolean).join(' ')}>
      <div
        className={[
          'flex w-[200%] gap-3',
          direction === 'left' ? 'animate-marquee-left-40' : 'animate-marquee-right-28',
          animationClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {doubled.map((label, idx) => (
          <div
            key={`${label}-${idx}`}
            className={[
              'shrink-0 border border-white/20 px-4 py-2 font-body text-[var(--text-small)] uppercase tracking-[0.12em] text-white',
              'rounded-none',
              itemClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

