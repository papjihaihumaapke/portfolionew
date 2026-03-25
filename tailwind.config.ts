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
        bg: '#f5f4f2',
        dark: '#1a1a1a',
        text: '#1a1a1a',
        muted: '#6b6b6b',
        accent: '#e8470a',
        'accent-warm': '#ff6340',
        surface: '#edecea',
        border: '#e2e0dd',
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

