export const homeContent = {
  hero: {
    topLeft: "Hi, I'm",
    name: 'Mohammad Hilal Malik',
    topRight: 'Based in Vancouver, BC',
    line1: 'UI/UX & Product',
    line2: 'Designer',
    photoAlt: 'Portrait of Hilal Malik',
    photoUrl: '/media/about/headshot.jpg',
    ctas: [
      { label: 'See my work →', href: '/work', variant: 'filled' as const },
      { label: 'Get in touch', href: '/contact', variant: 'outlined' as const },
    ],
  },
  featured: {
    label: 'Selected Work',
    headline: 'Projects that shipped.',
    viewAll: 'View all projects →',
  },
  skills: {
    label: 'What I Bring',
    headline: 'Craft + Systems + Motion.',
    sub: 'From type, color, and hierarchy to shipped, coded interfaces.',
  },
  aboutSnippet: {
    label: 'About Me',
    pullQuote: 'I design systems,\nnot just screens.',
    body:
      "Type, color, motion, and hierarchy, and the design system\nthat keeps them consistent from the first frame to the live product.",
    cta: 'Read my story →',
    stats: [
      { value: '3+', label: 'Years Designing' },
      { value: '13', label: 'Motion Components' },
      { value: '1', label: 'Coded Design System' },
      { value: '10+', label: 'Products Shipped' },
    ],
  },
  ctaStrip: {
    headline: "Let's build something\nworth remembering.",
    primary: 'Start a project',
    secondary: 'Download resume',
  },
} as const

