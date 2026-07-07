export interface GalleryItem {
  src: string
  caption?: string
  /** Render on a light padded stage instead of edge-to-edge (good for phone/portrait shots). */
  contain?: boolean
}

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
  /** Optional brand accent used across the case-study hero + gallery framing. */
  accent?: string
  /** Static high-res visual artifacts shown in a gallery band. */
  gallery?: GalleryItem[]
  /** Key into the live-demo registry (musify | library | dashboard). */
  liveDemos?: string
  /** External links (Behance, live site, style guide, etc.). */
  links?: { label: string; href: string }[]
  /** Self-hosted coded build to embed in an interactive iframe (e.g. /embeds/musify/index.html). */
  embed?: { url: string; label: string; note?: string; ratio?: string }
}

export const projects: Project[] = [
  {
    slug: 'musify-motion-system',
    title: 'Musify — Motion System',
    company: 'Interactive Applications (FDIT 2130)',
    year: '2025',
    category: ['Motion Design', 'Brand Identity', 'Design System'],
    tags: ['Motion Design', 'GSAP', 'Brand Identity', 'Interaction'],
    coverImage: '/assets/case-studies/musify-hero.png',
    heroImage: '/assets/case-studies/musify-hero.png',
    excerpt:
      'An interactive brand identity and motion system for a live-music platform, built on a “live stage” metaphor — with five signature interactions and live demos.',
    role: 'Motion & Brand Designer',
    timeline: 'Nov 2025',
    tools: 'Figma · GSAP · ScrollTrigger · Lenis · HTML/CSS/JS',
    accent: '#1DB954',
    problem:
      'Musify is a music-event platform, not just a streaming service — but flat screens don’t capture the energy of a live venue. The brief: define a brand identity and a consistent motion language that makes a dark UI feel alive, immersive, and unmistakably Musify.',
    myRole:
      'I owned the brand identity and the motion system end to end — colour, typography, a governing “motion recipe” of three principles, and five signature interactions coded in GSAP. Every timing, easing, and UX rationale is documented as a reusable style guide.',
    discovery:
      'The visual language is built for focus: dark mode by default so album art leads, a #1DB954 neon accent that reads like laser light, and Inter for clean legibility in low light. Mood board keywords: dark, energetic, immersive — the lighting and atmosphere of a live venue.',
    process:
      'I distilled the brand personality into a three-rule Motion Recipe. (1) Staggered Entry — elements never appear at once; GSAP staggers of 0.1–0.2s guide the eye like a band tuning up. (2) Heavy Physics — motion has mass; “back.out(1.7)” and elastic easings replace linear fades. (3) Ambient Life — the UI is never dead; orbs and visualizers loop with repeat: -1, yoyo: true.',
    solution:
      'Five signature interactions ship as a documented library: a curtain-reveal preloader (masks load, then slides up on power4.inOut), a magnetic button (tracks the cursor to increase affordance — Fitts’s Law), a content card with hover choreography (scale + overlay + spring-up icon), ambient aura orbs (blurred gradient keyframes), and transformative scrolling (vertical scroll energy converted to horizontal for the discovery feed). Engine: GSAP + ScrollTrigger, with Lenis for luxury-smooth scroll.',
    impact: [
      { value: '5', label: 'Signature Interactions' },
      { value: '3', label: 'Motion Principles' },
      { value: 'GSAP', label: '+ Lenis Engine' },
    ],
    reflection:
      'A motion system is only as good as its constraints. Writing down the timing and easing rules up front — the “recipe” — is what let a handful of interactions feel like one coherent brand instead of five separate tricks.',
    featured: true,
    liveDemos: 'musify',
    embed: {
      url: '/embeds/musify/index.html',
      label: 'Musify LIVE — the coded site',
      note: 'The real GSAP + Lenis build. Scroll, hover the cards, and watch the ambient motion.',
    },
    links: [{ label: 'Open coded style guide', href: '/embeds/musify/styleguide.html' }],
    gallery: [
      { src: '/assets/case-studies/musify-principles.png', caption: 'The Motion Recipe — three governing principles.' },
      { src: '/assets/case-studies/musify-curtain.png', caption: 'Curtain-reveal preloader masks asset load.' },
      { src: '/assets/case-studies/musify-magnetic.png', caption: 'Magnetic button — affordance before the click.' },
      { src: '/assets/case-studies/musify-scroll.png', caption: 'Transformative scrolling for the discovery feed.' },
    ],
  },
  {
    slug: 'c2c-rental',
    title: 'C2C Rental Platform',
    company: 'Mainland Motors Autogroup (internal project)',
    year: '2024–2025',
    category: ['Product Design', 'Design System', 'Web App'],
    tags: ['Product Design', 'Design System', 'UX', 'React'],
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
    embed: {
      url: 'https://c2crental.ca',
      label: 'C2C Rental — live production site',
      note: 'The shipped platform, running in production in Surrey, BC. Browse the booking flow.',
      ratio: '16 / 10',
    },
  },
  {
    slug: 'motion-component-library',
    title: 'Purposeful Motion — Component Library',
    company: 'Interactive Applications (FDIT 2140)',
    year: '2025',
    category: ['Motion Design', 'Interaction Design', 'Design System'],
    tags: ['Micro-interactions', 'Motion Design', 'HTML/CSS/JS', 'UX'],
    coverImage: '/assets/case-studies/motionlib-hero.jpg',
    heroImage: '/assets/case-studies/motionlib-hero.jpg',
    excerpt:
      'A documented library of eight functional micro-interactions — motion as a tool for clarity, feedback, and delight, not decoration. Every component is live below.',
    role: 'Interaction / Motion Designer',
    timeline: 'Oct 2025',
    tools: 'HTML · CSS · JavaScript · Figma',
    accent: '#e8470a',
    problem:
      'Motion is usually treated as decoration — the last polish pass. This library argues the opposite: that motion is a functional tool that adds clarity, feedback, and delight to everyday interactions and actively reduces uncertainty. The goal was to prove it with a reusable, documented set.',
    myRole:
      'I designed, built, and documented eight reusable motion components — each with a specific timing, easing, and user scenario. Every component maps to a design principle and answers a real UX concern.',
    discovery:
      'The library runs on a four-part philosophy: Clarity (animation supports understanding), Feedback (loaders, checks, and shakes confirm system status), Delight (small celebratory moments keep users engaged), and Predictability (consistent timing and easing build trust).',
    process:
      'Each component is specced like a design token. Loader (1s linear loop), Success (0.3s circle + 0.3s check + 1s confetti), Error/Warning (0.5s ease-in-out shake), Toggle (0.3s ease slide), Floating Input (0.3s ease), Expandable Card (0.4s ease), Modal (0.5s fade/scale), and Drag & Drop (smooth transforms). I storyboarded each against a real scenario — e.g. an empty-password login triggers the error shake while the floating label keeps the field readable.',
    solution:
      'Eight production-ready components implemented in vanilla HTML/CSS/JS so they drop into any interface, with the timing, easing, and UX rationale documented beside each one. They’re recreated here as live React interactions — try every one below.',
    impact: [
      { value: '8', label: 'Reusable Components' },
      { value: '4', label: 'Design Principles' },
      { value: '100%', label: 'Documented Specs' },
    ],
    reflection:
      'Documenting the “why” beside the “how” — the UX concern each animation answers — is what turns a pile of effects into a system a team can actually reuse.',
    featured: true,
    liveDemos: 'library',
    gallery: [
      { src: '/assets/case-studies/motionlib-components.png', caption: 'Eight components, each with timing, easing, and scenario.' },
      { src: '/assets/case-studies/motionlib-storyboard.jpg', caption: 'Storyboard: form-validation error + floating input.' },
      { src: '/assets/case-studies/motionlib-overview.png', caption: 'Design philosophy — clarity, feedback, delight, predictability.' },
    ],
  },
  {
    slug: 'healthy-city-dashboard',
    title: 'Healthy City Dashboard — Mode Share',
    company: 'Collaborative · City of Vancouver open data',
    year: '2025',
    category: ['Data Viz', 'Accessibility', 'UX Design'],
    tags: ['Accessibility', 'WCAG', 'Data Visualization', 'Chart.js'],
    coverImage: '/assets/case-studies/healthycity-hero.png',
    heroImage: '/assets/case-studies/healthycity-hero.png',
    excerpt:
      'A 12-week accessibility-driven redesign of Vancouver’s open-data Mode Share indicator — from static tables to an interactive, WCAG-aligned dashboard.',
    role: 'UX & Visual Designer (Design Lead)',
    timeline: '12 weeks · 2025',
    tools: 'Figma · Chart.js · HTML/CSS/JS · JSON',
    accent: '#2f6d84',
    problem:
      'Vancouver’s Mode Share indicator page — how residents bike, walk, and take transit — shipped as static tables with low visual hierarchy, limited filtering, and inconsistent accessibility. Planners, residents, and advocacy groups couldn’t actually read the story in the data.',
    myRole:
      'As design lead I ran the redesign from content audit through lo-fi → hi-fi → coded dashboard, owning the visual system (colour, typography, spacing) and the accessibility pass while keeping everything aligned to the City’s existing Healthy City ecosystem.',
    discovery:
      'A content audit surfaced the core barriers — static tables, weak hierarchy, thin filtering, and contrast/navigation gaps. We set explicit goals: make the page clearer, more intuitive, more accessible, and more engaging, without breaking from the City’s established look.',
    process:
      'A 12-week plan governed by a roadmap, WBS, RACI, and risk log: content audit → lo-fi wireframes → hi-fi Figma prototype with a consistent type/colour system → functional build wiring JSON data to Chart.js with tooltips, labels, and filters. Accessibility and usability checks ran before integration, not after it.',
    solution:
      'A polished, stable desktop dashboard: interactive charts (Chart.js) with tooltips and filters, a clear visual hierarchy, and a contrast/navigation pass for WCAG alignment. Multiple QA rounds confirmed every main flow — explore by mode or year, compare areas — worked end to end with no critical bugs.',
    impact: [
      { value: 'WCAG', label: 'Contrast & Nav Pass' },
      { value: '12 wk', label: 'Lo-fi → Shipped' },
      { value: 'Chart.js', label: 'Live Data Viz' },
    ],
    reflection:
      'Treating accessibility as a build-time gate — checking contrast and navigation before integration — kept it from becoming an afterthought. It made the visual system stronger too, because contrast and hierarchy are the same problem.',
    featured: false,
    liveDemos: 'dashboard',
    embed: {
      url: '/embeds/mode-share/index.html',
      label: 'Mode Share Indicator — the coded dashboard',
      note: 'The functional build: Chart.js graphs and a Leaflet map wired to JSON. Switch years and hover the data.',
      ratio: '16 / 10',
    },
    gallery: [
      { src: '/assets/case-studies/healthycity-overview.png', caption: 'Content audit → lo-fi → hi-fi progression.' },
      { src: '/assets/case-studies/healthycity-roadmap.png', caption: '12-week roadmap and Gantt schedule.' },
      { src: '/assets/case-studies/healthycity-wbs.png', caption: 'Work breakdown structure across the five phases.' },
    ],
  },
  {
    slug: 'acminder',
    title: 'Acminder — Schedule Management',
    company: 'Capstone · UX Research',
    year: '2025',
    category: ['UX Research', 'UI Design', 'Mobile App'],
    tags: ['UX Research', 'Personas', 'Wireframing', 'Usability'],
    coverImage: '/assets/case-studies/acminder-hero.png',
    heroImage: '/assets/case-studies/banner-acminder.png',
    excerpt:
      'Proactive schedule management for international students — a research-led capstone from SMART goals and personas to a hi-fi mobile system.',
    role: 'UX Researcher & UI Designer',
    timeline: '2025',
    tools: 'Figma · Miro · Google Forms · React',
    accent: '#3b6ff0',
    problem:
      'International students juggle 20+ hours of work a week against a full course load, LMS deadlines, and strict visa work-hour compliance — with zero margin for error. Existing tools (Google/Apple Calendar, Moodle) each track only one world and never warn you before a conflict.',
    myRole:
      'I led the UX process end to end — SMART research goals, competitive analysis, persona and context definition, user flows, wireframes, usability metrics, and a hi-fi mobile prototype — documented in a full Technical Requirements Document.',
    discovery:
      'The persona: a full-time international student managing high financial stakes and a new academic system. Comparative analysis against Google/Apple Calendar and Moodle exposed the gap — manual entry, visual-only conflict detection, no work-hour context. Acminder’s edge: automated sync, proactive alerts, high-priority voice nudges, and visa work-hour tracking.',
    process:
      'I mapped the core flows — onboarding, task add/edit/delete, calendar, and settings — and digitised annotated wireframes for every screen (sign-up, home, item detail, add/edit), each with documented key elements and rationale. Success was defined with usability metrics, not vibes.',
    solution:
      'A hi-fi mobile system centred on a unified dashboard that merges academic, work, and personal schedules, detects conflicts proactively, and nudges before problems happen — with a roadmap toward two-way LMS sync and an AI weekly planner.',
    impact: [
      { value: '20+ hrs', label: 'Work/Week Modeled' },
      { value: '4', label: 'Core Flows Mapped' },
      { value: 'TRD', label: 'Full UX Spec' },
    ],
    reflection:
      'The rigor paid off at the wireframe stage: because I’d defined the persona’s constraints (visa hours, LMS deadlines) as hard requirements, every screen decision had a reason. Research isn’t a phase you finish — it’s the argument every pixel has to answer to.',
    featured: false,
    gallery: [
      { src: '/assets/case-studies/acminder-persona.png', caption: 'Target user: the international-student persona.' },
      { src: '/assets/case-studies/acminder-compare.png', caption: 'Comparative analysis vs Calendar and LMS tools.' },
      { src: '/assets/case-studies/acminder-signup.png', caption: 'Hi-fi sign-up screen with annotated key elements.', contain: true },
      { src: '/assets/case-studies/acminder-flow.png', caption: 'Task management flow — add, edit, delete.', contain: true },
    ],
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
    featured: false,
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
    featured: false,
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