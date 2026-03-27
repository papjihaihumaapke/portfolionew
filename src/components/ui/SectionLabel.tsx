import type React from 'react'

export type SectionLabelProps = {
  children: React.ReactNode
  className?: string
  withDash?: boolean
}

export function SectionLabel({ children, className, withDash = true }: SectionLabelProps) {
  return (
    <div
      className={[
        'font-body text-[var(--text-micro)] uppercase tracking-[0.2em] text-accent font-medium',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {withDash ? '— ' : null}
      {children}
    </div>
  )
}

