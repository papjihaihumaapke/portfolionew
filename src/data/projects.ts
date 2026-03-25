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
    slug: 'mainland-motors',
    title: 'Mainland Motors AI Operations',
    company: 'Mainland Motors Autogroup',
    year: '2025–Present',
    category: ['AI Automation'],
    tags: ['AI Agents', 'n8n', 'ElevenLabs', 'Twilio', 'Lead Gen'],
    coverImage:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80',
    excerpt:
      '24/7 AI calling agents and an internal ops platform delivered in 15 days, cutting lead acquisition costs by 65–75%.',
    role: 'Senior UI & Web Designer — AI Workflow Lead',
    timeline: 'Dec 2025 – Present',
    tools: 'Figma · ElevenLabs · Twilio · n8n · HTML/CSS · WordPress',
    problem:
      'Mainland Motors was spending approximately $100 CAD per lead across four dealership locations (Surrey, Langley, Abbotsford, Calgary). Manual follow-up processes were slow and inconsistent. They needed a scalable lead generation and ops system that could handle inquiries 24/7 without additional headcount.',
    myRole:
      'I designed and delivered both the AI automation system and the internal ops platform end-to-end. This included writing conversational AI scripts, mapping escalation flows, building n8n automation workflows, configuring ElevenLabs voice agents, and leading all UI/UX design for the internal platform.',
    discovery:
      'Audited existing lead handling flows across all four locations. Identified that 60%+ of inquiries came outside business hours — the highest ROI opportunity for automation. Mapped the full conversation lifecycle: initial inquiry → qualification → appointment booking → human escalation.',
    process:
      'Designed all conversational flows and fallback logic in Figma before configuration. Built AI voice agents on ElevenLabs, connected to Twilio for call routing and n8n for workflow automation. Built the internal ops UI in 15 days using structured AI code builder prompting.',
    solution:
      'A live internal tool for the sales staff: AI voice agents + an ops platform handling ~100 internal and customer calls per month. Lead acquisition cost dropped from ~$100 CAD to $25–35 CAD within the first month. The ops UI gave the team a unified view of all leads, bookings, and follow-up tasks.',
    impact: [
      { value: '65–75%', label: 'Lead Cost Reduction' },
      { value: '15 days', label: 'Full Platform Delivery' },
      { value: '100+', label: 'AI Calls/Month' },
    ],
    reflection:
      'I would build a more robust A/B testing framework into the conversation scripts from the start. The first script version had a 22% drop-off at the qualification question — identified only after 3 weeks of live data.',
    featured: true,
  },
  {
    slug: 'vanprints',
    title: 'Vanprints.ca Brand System',
    company: 'Vanprints.ca',
    year: '2025',
    category: ['Branding', 'Web Dev'],
    tags: ['Brand Identity', 'E-commerce', 'Print Design', 'SEO'],
    coverImage:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1400&q=80',
    excerpt:
      'End-to-end brand identity, custom design studio, and e-commerce platform for a Vancouver custom printing business.',
    role: 'Brand Designer & Product Builder',
    timeline: '2025',
    tools: 'Figma · React · Vite · Printify API · Tailwind · Lovable · CorelDRAW',
    problem:
      'Vanprints.ca needed a complete brand identity and e-commerce platform built from zero — including a custom print design studio that would allow customers to upload artwork and preview products before ordering.',
    myRole:
      'I designed the full brand system (logo, colour palette, typography, tagline), built the e-commerce front-end including a Printify-style custom design studio, produced all marketing materials (social calendar, brochure PDF, quotation template), and implemented SEO schema markup.',
    discovery:
      'Competitor analysis of Printify, Printful, and local Vancouver print shops identified a gap: no local print brand had a strong editorial identity. Most used generic stock-photo aesthetics. Vanprints.ca had an opportunity to own the "premium local" position.',
    process:
      'Brand system developed in Figma: charcoal #1A1A1A base, off-white #F5F4F2 surface, orange #E8470A accent. Tagline locked: "Print Bold. Wear Proud." Custom design studio built in Lovable using structured prompts, then iterated to production quality. 30-day social content calendar produced alongside the site.',
    solution:
      'A fully branded e-commerce platform with a custom in-browser design studio, SEO-optimised landing pages for Vancouver/Langley/Abbotsford markets, and a complete marketing asset library. The brand mascot (chibi bear in LINE Friends style) was developed as a recurring visual asset.',
    impact: [
      { value: '30-day', label: 'Social Calendar Built' },
      { value: '100%', label: 'Brand Identity Locked' },
      { value: '3', label: 'City SEO Pages' },
    ],
    reflection:
      'The custom design studio feature scope crept significantly mid-build. A tighter MVP definition at kickoff would have delivered the core e-commerce functionality faster, with the studio as a phase 2 feature.',
    featured: true,
  },
  {
    slug: 'acminder',
    title: 'Acminder — Schedule Conflict Detection',
    company: 'KPU Capstone Project',
    year: '2025–2026',
    category: ['Academic'],
    tags: ['React', 'Vite', 'Supabase', 'TypeScript', 'Capstone'],
    coverImage:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1400&q=80',
    excerpt:
      'KPU capstone app — a React/Vite/Supabase student schedule conflict detection tool with iCal parsing and 14-screen UX.',
    role: 'UI/UX Designer & Front-End Developer',
    timeline: '2025 – 2026',
    tools:
      'React 18 · Vite · TypeScript · Supabase · Tailwind · Framer Motion · Figma',
    problem:
      'KPU students regularly encounter schedule conflicts when registering for courses — but the existing registration system provides no proactive conflict detection. Students discover conflicts only after attempting to enrol, causing frustration and missed course spots.',
    myRole:
      'Full ownership of the Acminder capstone: UX research, Figma design system (14 screens), React/Vite/TypeScript/Supabase front-end development, iCal import parsing logic, conflict detection algorithm, and responsive layout across all breakpoints.',
    discovery:
      'Secondary research into student scheduling pain points at Canadian post-secondary institutions. Identified three core user needs: (1) see all courses in a visual calendar, (2) detect conflicts automatically before submitting, (3) share schedules with advisors.',
    process:
      'Designed a complete Figma system: coral-orange #FF6B4A primary, DM Serif Display + DM Sans type pairing, 14 screens covering onboarding → schedule import → conflict view → resolution flow. Built in React 18/Vite with Supabase auth and real-time schedule sync. iCal parsing implemented client-side.',
    solution:
      'A web app where students import their KPU timetable (via iCal), view it in a visual weekly calendar, and receive instant conflict alerts with suggested resolutions. Navigation audit and responsive layout fixes shipped in sprint 3.',
    impact: [
      { value: '14', label: 'Screens Designed' },
      { value: '100%', label: 'Responsive Coverage' },
      { value: 'iCal', label: 'Import Supported' },
    ],
    reflection:
      'The conflict detection algorithm initially failed on edge cases involving back-to-back courses with no gap. A more systematic test matrix from sprint one (rather than ad-hoc testing) would have caught this earlier.',
    featured: false,
  },
  {
    slug: 'hoodior',
    title: 'Hoodior — Premium Streetwear',
    company: 'Hoodior',
    year: '2025',
    category: ['Branding', 'Web Dev'],
    tags: ['Streetwear', 'E-commerce', 'Editorial Design', 'React'],
    coverImage:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80',
    excerpt:
      'Premium Vancouver streetwear brand — full e-commerce site with editorial black-on-black design system and Playfair Display typography.',
    role: 'Brand Designer & Product Builder',
    timeline: '2025',
    tools: 'Figma · React · Vite · Tailwind · Lovable · Playfair Display',
    problem:
      'Hoodior needed a full e-commerce presence that matched its premium streetwear positioning. The brand required a distinctive editorial aesthetic that stood apart from typical streetwear sites without feeling inaccessible.',
    myRole:
      'Brand identity, full design system, and 15-prompt Lovable site build covering all commerce pages, legal pages, and brand storytelling.',
    discovery:
      'Reviewed 20+ streetwear brand sites (Supreme, Palace, Aimé Leon Dore, Pas Normal Studios). Identified that the most distinctive brands commit fully to one aesthetic system and never compromise it for conversion-rate tactics.',
    process:
      'Design system: pure black backgrounds, Playfair Display serif headings (editorial luxury signal), orange #E8470A accent, zero border-radius across all UI elements. 15 Lovable prompts built the full site in a structured sequence: design system → global layout → product pages → cart/checkout → about/legal.',
    solution:
      'A fully branded premium e-commerce site with editorial product photography integration, a distinctive black-on-black aesthetic with orange accent details, and a complete brand identity system.',
    impact: [
      { value: '15', label: 'Lovable Prompts' },
      { value: '100%', label: 'Brand Consistency' },
      { value: 'Zero', label: 'Border Radii (intentional)' },
    ],
    reflection:
      'The zero-radius design decision polarised early user feedback — some found it too stark on mobile. I would introduce a single 2px radius exception for mobile touch targets in the next iteration.',
    featured: false,
  },
  {
    slug: 'assh-solutions',
    title: 'ASSH Solutions Agency Site',
    company: 'ASSH Solutions',
    year: '2025',
    category: ['Web Dev'],
    tags: ['Agency', 'Lead Gen', 'Supabase', 'Resend'],
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
    excerpt:
      '13-page digital agency website with Supabase lead CRM and Resend email integration, built for ASSH Solutions.',
    role: 'Designer & Full-Stack Product Builder',
    timeline: '2025',
    tools: 'Figma · React · Vite · Supabase · Resend · Tailwind · Lovable',
    problem:
      'ASSH Solutions needed a professional agency website that could both attract clients and manage incoming leads — without relying on a third-party CRM that would add monthly cost.',
    myRole:
      'Designed and built the full 13-page agency site using a structured 13-prompt Lovable build sequence. Implemented Supabase as the lead management database and Resend for automated email notifications on every new inquiry.',
    discovery:
      'Reviewed agency sites across Vancouver (Jam3, Digit, Massive Media). Identified that pricing transparency was a strong differentiator — most agencies hide pricing, which increases friction for SMB clients.',
    process:
      '13-prompt build sequence: all pages, pricing tiers (CAD $1,000/$1,500/$2,000 website packages; CAD $200/$500/$1,000/mo social), Supabase lead table schema, Resend email trigger on form submit, responsive audit.',
    solution:
      'A live, public agency site with transparent service pricing, a Supabase-backed lead management system, and Resend-powered email notifications on every new inquiry.',
    impact: [
      { value: '13', label: 'Pages Designed & Built' },
      { value: '3', label: 'Service Packages Priced' },
      { value: '100%', label: 'Lead Flow Automated' },
    ],
    reflection:
      'The pricing section required three iterations before it felt both transparent and premium. The first version looked like a SaaS pricing table — too generic for a creative agency.',
    featured: false,
  },
]

