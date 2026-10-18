export const homeContent = {
  hero: {
    availability: 'Open to full-time and freelance · Vancouver, BC',
    headline: 'Hilal Malik.',
    headlineAccent: 'UI/UX & Product Designer who ships.',
    subhead:
      'I design products and then build them, using code and AI. From UX and design systems to shipped SaaS tools, websites and motion.',
  },
  proof: [
    { value: 4, prefix: '', suffix: '', label: 'Years designing' },
    { value: 1, prefix: '', suffix: '', label: 'SaaS product live' },
    { value: 8, prefix: '', suffix: '', label: 'Websites shipped' },
    { value: 26, prefix: '$', suffix: '', label: 'Lowest cost per lead' },
  ],
  featured: {
    label: 'Featured work',
    headline: 'Products I designed and built.',
    viewAll: 'See all work',
  },
  whatIDo: {
    label: 'What I do',
    headline: 'The full loop, in one person.',
    columns: [
      {
        title: 'Product & UX design',
        body: 'Research, flows, design systems and high-fidelity UI for web apps and SaaS, tested with real users and documented for developers.',
        tools: 'Figma · UX research · Prototyping · WCAG 2.1',
      },
      {
        title: 'Front-end & AI-built tools',
        body: 'I build what I design, and use AI to ship working tools, automations and agents instead of handing off static mock-ups.',
        tools: 'React · TypeScript · Supabase · Claude · n8n',
      },
      {
        title: 'Motion & launch creative',
        body: 'Coded motion ads and reels, AI-assisted ad creative, and the campaigns that put a product in front of people.',
        tools: 'Remotion · GSAP · Midjourney · Meta Ads Manager',
      },
    ],
  },
  howIWork: {
    label: 'How I work',
    headline: 'Four steps, every project.',
    steps: [
      { title: 'Research', body: 'Talk to the people who will use it, and study what already exists.' },
      { title: 'Design', body: 'Map the flows, then design the screens and the system behind them.' },
      { title: 'Build', body: 'Ship it in code, so the design survives contact with reality.' },
      { title: 'Measure', body: 'Track what people actually do, then fix what the data shows.' },
    ],
  },
  sites: {
    label: 'Websites shipped',
    headline: '8 websites, shipped.',
    note: 'Dealerships, local businesses and brands, most with a live preview.',
    cta: 'Previews and links',
  },
  aboutSnippet: {
    label: 'About',
    body: [
      'I’m Hilal, a UI/UX and product designer based in Vancouver, BC.',
      'I’ve been designing since 2022, and I build what I design, using code and AI.',
      'I completed the Front-End Development for Interactive Applications diploma at KPU’s Wilson School of Design in May 2026.',
    ],
    cta: 'More about me',
    photoAlt: 'Portrait of Hilal Malik',
  },
  ctaStrip: {
    headline: "Let's build something\nworth remembering.",
  },
} as const
