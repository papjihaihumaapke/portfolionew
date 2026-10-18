import type React from 'react'
import { cn } from '../../lib/utils'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('font-body text-[var(--text-micro)] tracking-wide text-muted', className)}>{children}</span>
}

/** Max 3 tags, separated by a thin slash: lighter than pills. */
export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-2 gap-y-1 font-body text-[var(--text-micro)] uppercase tracking-[0.14em] text-muted', className)}>
      {tags.slice(0, 3).map((t, i) => (
        <li key={t} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {t}
        </li>
      ))}
    </ul>
  )
}
