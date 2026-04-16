export const aboutContent = {
  hero: {
    headline: 'HILAL.',
    bioLine: 'AI automation specialist and front-end developer based in Richmond, BC.',
    photoAlt: 'Black and white portrait of Hilal Malik',
    photoUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQHQLOTicF5cdA/profile-displayphoto-scale_400_400/B56Zr_cCvmGkAg-/0/1765222133205?e=1778112000&v=beta&t=6SBjiKVzTLMOMkoIZH_htUlqDBMmq9V9HTl0hwQU9P8',
  },
  narrative: {
    label: 'Story',
    heading: 'The system underneath.',
    copy:
      "I didn't start as a developer. I started as someone who couldn't stop fixing things\nthat were confusing, slow, or broken. That obsession led me to AI\nautomation, and eventually to building live products that real people use every day —\nfrom car rental platforms in Surrey to voice agents handling dealership calls at 2am.\n\nI'm currently studying Frontend Development for Interactive Applications at KPU's\nWilson School of Design, which means I move between Figma and VS Code in the same\nafternoon. I've shipped products for automotive groups, printed goods brands,\nstreetwear labels, and software startups. The common thread isn't the industry —\nit's the system underneath.\n\nI believe the best product is logical. But to make it work, someone has to understand\nthe business logic, the user psychology, and the technical constraint at the same time.\nThat's the work I'm drawn to.",
    photoAlt: 'Portrait photo',
    photoUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQHQLOTicF5cdA/profile-displayphoto-scale_400_400/B56Zr_cCvmGkAg-/0/1765222133205?e=1778112000&v=beta&t=6SBjiKVzTLMOMkoIZH_htUlqDBMmq9V9HTl0hwQU9P8',
  },
  skills: {
    label: 'Technical Skills',
    headline: 'The full toolkit.',
    groups: [
      {
        title: 'Development',
        items: 'React · Vite · TypeScript · Supabase · Tailwind CSS · HTML/CSS',
      },
      {
        title: 'AI & Automation',
        items: 'n8n · ElevenLabs · Twilio · Conversational AI · Prompt Engineering',
      },
      {
        title: 'Tools & Platforms',
        items: 'Adobe Suite · Framer · WordPress · Webflow · CorelDRAW · Lovable',
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
          'Led AI workflow + internal ops platform design.',
          'Delivered end-to-end automation and UI systems.',
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

