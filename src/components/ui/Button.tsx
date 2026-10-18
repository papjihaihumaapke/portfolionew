import { Link } from 'react-router-dom'
import type React from 'react'
import { track, type TrackEvent } from '../../lib/analytics'
import { cn } from '../../lib/utils'

type ButtonVariant = 'filled' | 'outlined' | 'accent' | 'light' | 'outlined-light'

export type ButtonProps = {
  children: React.ReactNode
  href: string
  className?: string
  variant?: ButtonVariant
  /** Download the file instead of navigating (resume PDF). */
  download?: boolean
  /** Analytics event fired on click when GA4 is enabled. */
  event?: TrackEvent
  external?: boolean
}

const base =
  'inline-flex min-h-[48px] items-center justify-center gap-2 border px-6 py-3 font-body text-[15px] font-medium tracking-wide transition-colors duration-base'

const variants: Record<ButtonVariant, string> = {
  filled: 'bg-dark text-white border-dark hover:bg-accent-ink hover:border-accent-ink',
  outlined: 'bg-transparent text-text border-text hover:bg-dark hover:text-white',
  accent: 'bg-accent-ink text-white border-accent-ink hover:bg-dark hover:border-dark',
  light: 'bg-white text-text border-white hover:bg-dark hover:text-white hover:border-dark',
  'outlined-light': 'bg-transparent text-white border-white/70 hover:bg-white hover:text-text',
}

export function Button({ children, href, className, variant = 'filled', download, event, external }: ButtonProps) {
  const classes = cn(base, variants[variant], className)
  const onClick = event ? () => track(event, { href }) : undefined
  const isFile = /\.(pdf)$/.test(href)

  if (external || isFile || /^(https?:|mailto:)/.test(href)) {
    const newTab = external || /^https?:/.test(href)
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        download={download || undefined}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} to={href} onClick={onClick}>
      {children}
    </Link>
  )
}
