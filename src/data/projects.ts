export interface Project {
  slug: string
  title: string
  company: string
  year: string
  category: string[]
  tags: string[]
  coverImage: string
  heroImage: string
  excerpt: string
  role: string
  timeline: string
  tools: string
  problem: string
  myRole: string
  discovery: string
  process: string
  solution: string
  impact: { value: string; label: string }[]
  reflection: string
  featured: boolean
  liveUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'c2c-rental',
    title: 'C2C Rental Platform',
    company: 'Mainland Motors Autogroup (internal project)',
    year: '2024–2025',
    category: ['Web Dev', 'AI Automation'],
    tags: ['Product Design', 'React', 'Supabase', 'AI'],
    coverImage:
      'https://c2crental.ca/lovable-uploads/ae30751c-fe6d-4959-839f-3ebc3decea01.png',
    heroImage:
      'https://c2crental.ca/lovable-uploads/ae30751c-fe6d-4959-839f-3ebc3decea01.png',
    excerpt:
      'Full-stack peer-to-peer car rental platform serving Metro Vancouver and Fraser Valley.',
    role: 'Senior UI & Web Designer',
    timeline: '2024 – 2025',
    tools:
      'Figma · React · Vite · Supabase · Tailwind · TD Worldline/Bambora · Lovable',
    problem:
      'C2C Rental needed a complete peer-to-peer car rental experience built from scratch — including host onboarding, renter booking flows, a payment integration (TD Worldline/Bambora), and an internal ops panel. No design system existed. The product had to launch live while I was studying full-time.',
    myRole:
      'I owned the entire product: UX architecture, user flows, Figma prototypes, AI-assisted front-end development via Lovable, Supabase edge function logic, and Worldline/Bambora payment integration. I also conducted a 300+ file codebase audit and produced a 139-issue UX bug report.',
    discovery:
      'Secondary research into existing rental platforms (Turo, Rideshare2) identified key friction points: unclear booking states, opaque pricing, and weak host trust signals. I mapped 14 distinct user states across the booking lifecycle before wireframing.',
    process:
      'Designed 14 screens in Figma covering the full rental lifecycle. Used structured Lovable prompts to generate React/Vite/Supabase code, then audited and iterated each output. Built a custom Worldline/Bambora deposit pre-authorization flow, resolving CORS issues and a 401 authentication bug confirmed live with transaction ID 10000001.',
    solution:
      'A live, production car rental platform operating in Surrey, BC (6786 King George Blvd, Newton). Features include renter/host dashboards, real-time booking management, Worldline/Bambora payment with deposit holds, an admin ops panel with RentWorks-style grouped navigation, and automated booking state management.',
    impact: [
      { value: '300+', label: 'Source Files Audited' },
      { value: '139', label: 'UX Issues Resolved' },
      { value: '100%', label: 'Payment Flow Live' },
    ],
    reflection:
      'I would invest earlier in a formal design system documentation pass. Many component-level inconsistencies emerged mid-build that required retrospective refactoring — a structured design token library from sprint one would have prevented this.',
    featured: true,
    liveUrl: 'https://c2crental.ca',
  },
  {
    slug: 'tuniff',
    title: 'Tuniff — AI Hairstyle Recommendation',
    company: 'Personal Project',
    year: '2024',
    category: ['UI/UX Design', 'Mobile App'],
    tags: ['AI', 'Mobile Design', 'Figma', 'UX Research'],
    coverImage:
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/87bbb6190962053.65c360ceee298.png',
    heroImage:
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/87bbb6190962053.65c360ceee298.png',
    excerpt:
      'AI-powered mobile application designed to simplify the hairstyle selection process with virtual try-ons.',
    role: 'UI/UX Designer & Researcher',
    timeline: 'Late 2023 – Early 2024',
    tools: 'Figma · Google Forms · AI',
    problem:
      "Traditional hairstyle selection lacks personalization, leading to dissatisfaction. Users often struggle to visualize how a style fits their specific face shape before committing at the barber.",
    myRole:
      'I led the end-to-end design process, from quantitative user research and persona development to high-fidelity prototyping and information architecture mapping.',
    discovery:
      'Surveyed ~10 users: 80% desired AI personalization, but 70% were concerned about facial data privacy. Defined the persona "Sneha Sharma," a tech-savvy designer seeking style changes that fit her creative image.',
    process:
      'Discover (research/comp-analysis) → Define (personas/MoSCoW method) → Ideate (IA/user flows) → Design (Style guide/DM Serif Display type). mapped 14+ distinct screens covering the end-to-end journey.',
    solution:
      'A high-fidelity mobile prototype with automated onboarding, gender-based filtering, and a 2D virtual try-on system powered by facial feature scanning.',
    impact: [
      { value: '80%', label: 'User Interest' },
      { value: '14+', label: 'Screens Designed' },
      { value: 'AI', label: 'Try-on Logic' },
    ],
    reflection:
      'Handling biometric data requires radical transparency in privacy settings. Minimalist UI is essential when presenting complex AI data to prevent user cognitive overwhelm.',
    featured: true,
  },
]