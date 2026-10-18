import type React from 'react'
import { cn } from '../../lib/utils'

export type SectionLabelProps = {
  children: React.ReactNode
  className?: string
  withDash?: boolean
  dark?: boolean
}

export function SectionLabel({ children, className, withDash = true, dark = false }: SectionLabelProps) {
  return (
    <p className={cn('eyebrow flex items-center', dark ? 'text-accent-dark' : 'text-accent-ink', className)}>
      {withDash ? <span aria-hidden="true" className="mr-3 inline-block h-px w-6 bg-current" /> : null}
      {children}
    </p>
  )
}
