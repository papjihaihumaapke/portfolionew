import type React from 'react'

export type TagProps = {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center border border-border px-2 py-0.5 font-body text-[var(--text-micro)] uppercase tracking-wider text-text/80',
        'rounded-none transition-colors duration-300 hover:bg-accent hover:text-white hover:border-transparent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

