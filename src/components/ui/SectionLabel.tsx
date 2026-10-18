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
      {withDash ? <span aria-hidden="true" className="inline-block w-6 h-px bg-current align-middle mr-3" /> : null}
      {children}
    </div>
  )
}

