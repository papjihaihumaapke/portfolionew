import { Link } from 'react-router-dom'
import type React from 'react'

type ButtonVariant = 'filled' | 'outlined'

type ButtonBaseProps = {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
}

type ButtonAsLinkProps = ButtonBaseProps & {
  href: string
  onClick?: never
  type?: never
}

type ButtonAsButtonProps = ButtonBaseProps & {
  href?: never
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps

const base =
  'inline-flex items-center justify-center gap-2 border font-body uppercase tracking-wider px-6 py-3 transition-colors duration-300 focus-visible:outline-none'

const variants: Record<ButtonVariant, string> = {
  filled:
    'bg-dark text-white border-dark hover:bg-accent hover:border-accent rounded-none',
  outlined:
    'bg-transparent text-dark border-dark hover:bg-dark hover:text-white rounded-none',
}

export function Button({
  children,
  className,
  variant = 'filled',
  ...props
}: ButtonProps) {
  const classes = [base, variants[variant], className].filter(Boolean).join(' ')

  if ('href' in props && typeof props.href === 'string') {
    const href = props.href
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:')
    if (isExternal) {
      return (
        <a
          className={classes}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      )
    }

    return (
      <Link className={classes} to={href}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={props.onClick} type={props.type ?? 'button'}>
      {children}
    </button>
  )
}

