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
  figmaUrl?: string
  liveUrl?: string
  discoveryImage?: string
  processImage?: string
  solutionImage?: string
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
    discoveryImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/640e2c190962053.65c360ceeee86.png',
    processImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/64f70e190962053.65c360cee8298.png',
    solutionImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/d5862b190962053.65c360ceeab7d.png',
  },
  {
    slug: 'zara-redesign',
    title: 'Zara Website Redesign',
    company: 'Personal Project',
    year: '2025',
    category: ['UI/UX Design', 'Web Design'],
    tags: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'AI Tools'],
    coverImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/f22208221666183.67d89ffc666a8.jpg',
    heroImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/f22208221666183.67d89ffc666a8.jpg',
    excerpt: 'A comprehensive redesign of the Zara web experience, focusing on accessibility, intuitive navigation, and a refined visual hierarchy.',
    role: 'UI/UX Designer',
    timeline: '2025',
    tools: 'Figma · Adobe Illustrator · Adobe Photoshop · AI Tools',
    problem: "Users struggled with Zara's complex navigation and inconsistent device experience. Additionally, the site faced significant accessibility hurdles, such as poor keyboard support and low contrast.",
    myRole: "I led the end-to-end redesign, applying UX laws like Hick's and Fitts's to simplify the interface while maintaining the brand's premium feel.",
    discovery: 'Analysis of the existing site revealed critical friction points: overwhelming choices and a lack of clear visual organization. I focused on accessibility audits to identify contrast and navigation gaps.',
    process: "From Miller's Law for information chunking to Gestalt Principles for visual hierarchy, each design decision aimed to reduce cognitive load and improve the shopping journey.",
    solution: 'A minimalist, highly functional redesign that prioritizes accessibility and responsiveness. The new UI facilitates easier product discovery and a smoother checkout flow.',
    impact: [
      { value: '100%', label: 'Accessible Navigation' },
      { value: '2025', label: 'Launch Year' },
      { value: 'High', label: 'Visual Clarity' },
    ],
    reflection: 'The Zara redesign was a challenge in balancing a high-fashion, minimalist brand identity with the functional requirements of a high-volume e-commerce platform. Focus on visual hierarchy and micro-interactions proved key to creating a more premium user experience.',
    featured: true,
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fv92INsi3vQ46o8rxwS5drA%2FZara-website-redesign%3Fcontent-scaling%3Dfixed%26kind%3Dproto%26node-id%3D20-4%26scaling%3Dscale-down%26starting-point-node-id%3D20%253A4',
    discoveryImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/8df953221666183.67d89ffc60c21.jpg',
    processImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/fa0955221666183.67d89ffc63fbd.jpg',
    solutionImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/ec2204221666183.67d89ffc65a9e.jpg',
  },
  {
    slug: 'mini-minds',
    title: 'Mini Minds',
    company: 'Personal Project',
    year: '2024',
    category: ['UI/UX Design', 'Interaction Design', 'Mobile App'],
    tags: ['Figma', 'Adobe Illustrator', 'Gamification', 'EdTech'],
    coverImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ff7cb4211428529.67228fb2ae3d9.png',
    heroImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ff7cb4211428529.67228fb2ae3d9.png',
    excerpt: 'An interactive educational platform for children aged 5-10, focusing on gamified learning and creative skill development.',
    role: 'UI/UX Designer',
    timeline: '2024',
    tools: 'Figma · Adobe Illustrator · Canva',
    problem: 'Traditional learning platforms are often rigid and uncreative, failing to engage young learners. Children need a solution that aligns with their energy levels and diverse learning styles.',
    myRole: 'I designed the end-to-end mobile experience, focusing on gamification elements and child-friendly UI patterns to make learning intuitive and fun.',
    discovery: 'User research highlighted that children respond best to play-based discovery. I analyzed existing EdTech apps to find gaps in creative engagement and auditory-visual balance.',
    process: 'From empathy mapping to heuristic evaluation, I iterated on the navigation and reward systems to ensure the app felt like a game rather than a chore.',
    solution: 'A dynamic mobile app that uses gamification to nurture creativity and critical thinking. The visual identity is vibrant and engaging, tailored specifically for the 5-10 age group.',
    impact: [
      { value: '5-10', label: 'Age Group' },
      { value: '9+', label: 'Final Screens' },
      { value: 'Top', label: 'Engagement' },
    ],
    reflection: 'Designing for children requires a different set of constraints—larger touch targets, vibrant feedback, and extremely simple navigation. This project was a deep dive into child-centric UX.',
    featured: false,
    discoveryImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/77c82a211428529.67228eb659f97.png',
    processImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/f5738a211428529.67228eb656b52.png',
    solutionImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/caf108211428529.67228eb657ec8.jpg',
  },
]