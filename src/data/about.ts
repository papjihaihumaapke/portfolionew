export const aboutContent = {
  hero: {
    headline: 'HILAL.',
    bioLine: 'UI/UX and product designer who designs products and then builds them, based in Vancouver, BC.',
    photoAlt: 'Black and white portrait of Hilal Malik',
    photoUrl: '/media/about/headshot.jpg',
  },
  narrative: {
    label: 'Story',
    heading: 'The system underneath.',
    copy:
      "I'm a visual and motion designer. I care about the things reviewers judge craft on , \ntypography, color, layout, hierarchy, and motion, and about the design system that\nkeeps them consistent as a product grows from the first frame to something real people use.\n\nA lot of my work lives at the intersection of visual craft and interaction: a motion\nsystem built on a “live stage” metaphor, a documented library of micro-interactions,\nan accessibility-driven data dashboard, and a coded design system of tokens and\ncomponents. I'm studying Frontend Development for Interactive Applications at KPU's\nWilson School of Design, so I move between Figma and code in the same afternoon , \nwhich means the systems I design actually hold up when they're built.\n\nThat engineering fluency is a multiplier, not the headline. It lets me ship visual work\nas living, interactive product, and, when a project needs it, wire in AI-assisted\nworkflows behind the scenes. But the thing I'm drawn to is the craft, and the system\nthat makes it repeatable.",
    photoAlt: 'Portrait photo',
    photoUrl: '/media/about/headshot.jpg',
  },
  skills: {
    label: 'Skills',
    headline: 'The full toolkit.',
    groups: [
      {
        title: 'Visual & Motion',
        items: 'Typography · Color · Layout & Hierarchy · Iconography · Motion Design · Brand Systems',
      },
      {
        title: 'Design Systems & UX',
        items: 'Design Tokens · Components · WCAG 2.1 · Prototyping · UX Research · Figma · Adobe Suite',
      },
      {
        title: 'Technical (the multiplier)',
        items: 'React · TypeScript · Tailwind · GSAP / Framer Motion · Supabase · AI-assisted workflows',
      },
    ],
  },
  education: {
    label: 'Education',
    items: [
      {
        school: 'KPU Wilson School of Design',
        program: 'Diploma, Frontend Development for Interactive Applications',
        date: 'Sep 2024 to Aug 2026',
        location: 'British Columbia, Canada',
      },
      {
        school: 'St. Aloysius College',
        program: 'Higher Secondary Education (Commerce)',
        date: 'Mar 2022 to Apr 2023',
        location: 'Pilibhit, India',
      },
    ],
  },
  ctas: {
    resume: { label: 'Download Resume (PDF)', href: '/assets/MHM-Resume.pdf' },
    linkedin: { label: 'Connect on LinkedIn', href: 'https://linkedin.com/in/hilalmalik' },
    behance: { label: 'View Behance', href: 'https://behance.net/mohammadhilalmalik' },
  },
} as const

