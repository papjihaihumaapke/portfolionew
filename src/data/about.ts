export const aboutContent = {
  hero: {
    headline: 'HILAL.',
    bioLine: 'Visual & motion designer building design systems and interfaces — based in Richmond, BC.',
    photoAlt: 'Black and white portrait of Hilal Malik',
    photoUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQHQLOTicF5cdA/profile-displayphoto-scale_400_400/B56Zr_cCvmGkAg-/0/1765222133205?e=1778112000&v=beta&t=6SBjiKVzTLMOMkoIZH_htUlqDBMmq9V9HTl0hwQU9P8',
  },
  narrative: {
    label: 'Story',
    heading: 'The system underneath.',
    copy:
      "I'm a visual and motion designer. I care about the things reviewers judge craft on —\ntypography, color, layout, hierarchy, and motion — and about the design system that\nkeeps them consistent as a product grows from the first frame to something real people use.\n\nA lot of my work lives at the intersection of visual craft and interaction: a motion\nsystem built on a “live stage” metaphor, a documented library of micro-interactions,\nan accessibility-driven data dashboard, and a coded design system of tokens and\ncomponents. I'm studying Frontend Development for Interactive Applications at KPU's\nWilson School of Design, so I move between Figma and code in the same afternoon —\nwhich means the systems I design actually hold up when they're built.\n\nThat engineering fluency is a multiplier, not the headline. It lets me ship visual work\nas living, interactive product — and, when a project needs it, wire in AI-assisted\nworkflows behind the scenes. But the thing I'm drawn to is the craft, and the system\nthat makes it repeatable.",
    photoAlt: 'Portrait photo',
    photoUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQHQLOTicF5cdA/profile-displayphoto-scale_400_400/B56Zr_cCvmGkAg-/0/1765222133205?e=1778112000&v=beta&t=6SBjiKVzTLMOMkoIZH_htUlqDBMmq9V9HTl0hwQU9P8',
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
  timeline: {
    label: 'Experience',
    headline: 'Where I’ve shipped.',
    entries: [
      {
        company: 'Mainland Motors Autogroup',
        role: 'Senior UI & Web Designer',
        date: 'Dec 2025–Present',
        location: 'Langley, BC',
        bullets: [
          'Own the UI system, components, and visual language for the internal ops platform.',
          'Wire AI-assisted workflows behind the product where they add leverage.',
        ],
      },
      {
        company: 'Mapsense Media',
        role: 'UI/UX Designer & Visual Designer',
        date: 'Apr–Dec 2025',
        location: 'Langley, BC',
        bullets: ['Designed landing pages, brand assets, and conversion UX improvements.'],
      },
      {
        company: 'C2C Rental (C2R.ca)',
        role: 'UI/UX Designer & Product Builder',
        date: '2024–2025',
        location: 'Canada',
        bullets: ['Built a production rental platform and payment flows.', 'Shipped a full booking lifecycle UX.'],
      },
      {
        company: 'Freelance',
        role: 'UI/UX & Product Designer',
        date: 'Apr 2022–Present',
        location: 'Remote',
        bullets: ['Designed and shipped products across multiple industries.'],
      },
      {
        company: 'Quackly Private Limited',
        role: 'UI/UX Designer Intern',
        date: 'Mar 2023–Apr 2024',
        location: 'India',
        bullets: ['Supported UX research, UI production, and design system consistency.'],
      },
    ],
  },
  education: {
    label: 'Education',
    items: [
      {
        school: 'KPU Wilson School of Design',
        program: 'Diploma, Frontend Development for Interactive Applications',
        date: 'Sep 2024–Aug 2026',
        location: 'British Columbia, Canada',
      },
      {
        school: 'St. Aloysius College',
        program: 'Higher Secondary Education (Commerce)',
        date: 'Mar 2022–Apr 2023',
        location: 'Pilibhit, India',
      },
    ],
  },
  ctas: {
    resume: { label: 'Download Resume (PDF)', href: '/assets/resume.pdf' },
    linkedin: { label: 'Connect on LinkedIn', href: 'https://linkedin.com/in/hilalmalik' },
    behance: { label: 'View Behance', href: 'https://behance.net/mohammadhilalmalik' },
  },
} as const

