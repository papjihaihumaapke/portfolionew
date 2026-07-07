export const homeContent = {
  hero: {
    topLeft: "Hi, I'm",
    name: 'Mohammad Hilal Malik',
    topRight: 'Based in Richmond · Vancouver, BC',
    line1: 'Visual & Motion',
    line2: 'Designer',
    photoAlt: 'Portrait of Hilal Malik',
    photoUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQHQLOTicF5cdA/profile-displayphoto-scale_400_400/B56Zr_cCvmGkAg-/0/1765222133205?e=1778112000&v=beta&t=6SBjiKVzTLMOMkoIZH_htUlqDBMmq9V9HTl0hwQU9P8',
    ctas: [
      { label: 'See my work →', href: '/work', variant: 'filled' as const },
      { label: 'Get in touch', href: '/contact', variant: 'outlined' as const },
    ],
    trustedByLabel: 'Trusted by',
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
      "Type, color, motion, and hierarchy — and the design system\nthat keeps them consistent from the first frame to the live product.",
    cta: 'Read my story →',
    stats: [
      { value: '3+', label: 'Years Designing' },
      { value: '13', label: 'Motion Components' },
      { value: '1', label: 'Coded Design System' },
      { value: '10+', label: 'Products Shipped' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    headline: 'What teams say.',
    items: [
      {
        quote:
          'Hilal redesigned our entire lead flow in under two weeks. The AI calling agents he built are handling 100+ inquiries a month with zero manual effort.',
        name: 'Manpreet Singh',
        title: 'Marketing Director, Mainland Motors Autogroup',
      },
      {
        quote:
          'The C2C platform went from concept to live product while Hilal was still studying full-time. The UX is clean, the logic is solid, and users figured it out with zero training.',
        name: 'Devish Arora',
        title: 'Operations Manager, C2C Rental',
      },
    ],
  },
  ctaStrip: {
    headline: "Let's build something\nworth remembering.",
    primary: 'Start a project',
    secondary: 'Download resume',
  },
} as const

