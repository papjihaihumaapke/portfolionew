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
        muted: '#5f5f5f',
        'muted-dark': '#b3b3b3',
        accent: '#e8470a',
        'accent-ink': '#b53505',
        'accent-dark': '#ff6340',
        surface: '#edecea',
        border: '#dcdad6',
        'border-dark': '#3a3a3a',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      maxWidth: {
        page: 'var(--max-width)',
        measure: 'var(--measure)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
} satisfies Config
