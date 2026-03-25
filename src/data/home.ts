export const homeContent = {
  hero: {
    topLeft: "Hi, I'm",
    name: 'Mohammad Hilal Malik',
    topRight: 'Based in Richmond · Vancouver, BC',
    line1: 'UX Designer',
    line2: '& Product Builder',
    photoAlt: 'Portrait of Hilal Malik',
    photoUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQHQLOTicF5cdA/profile-displayphoto-crop_800_800/B56Zr_cCvmGkAI-/0/1765222133123?e=1775692800&v=beta&t=LpbIwZXMKw97C7eZDBGeZzTs1h-vscD1Z0hO5x9NYTw',
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
    headline: 'Design + Code + Automation.',
    sub: 'The full stack, from first wireframe to live product.',
  },
  aboutSnippet: {
    label: 'About Me',
    pullQuote: 'I design systems,\nnot just screens.',
    body:
      "My operational mindset means I design around how\nyour business actually runs — not just how it looks.",
    cta: 'Read my story →',
    stats: [
      { value: '3+', label: 'Years Experience' },
      { value: '10+', label: 'Live Products Shipped' },
      { value: '4', label: 'Active Ventures' },
      { value: '100+', label: 'AI-Assisted Calls/Mo' },
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

