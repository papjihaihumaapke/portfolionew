import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        bg: 'var(--color-bg)',
        dark: 'var(--color-bg-dark)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-warm': 'var(--color-accent-warm)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        white: 'var(--color-white)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      maxWidth: {
        page: 'var(--max-width)',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'marquee-left-40': 'scroll-left 40s linear infinite',
        'marquee-right-28': 'scroll-right 28s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

