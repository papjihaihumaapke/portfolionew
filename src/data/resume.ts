/**
 * Resume content. The /resume page and MHM-Resume.pdf (npm run resume:pdf) both render
 * from this file, so they never drift apart. No client names, phone, address or
 * work-authorization details.
 */

export interface ResumeRole {
  title: string
  dates: string
}

export interface ResumeJob {
  org: string
  location: string
  /** Shown after the location when the org line has no separate roles. */
  dates?: string
  roles: ResumeRole[]
  bullets: string[]
}

export const resume = {
  name: 'Mohammad Hilal Malik',
  title: 'UI/UX & Product Designer',
  location: 'Vancouver, BC',
  contacts: [
    { label: 'mohammadhilalmalik@gmail.com', href: 'mailto:mohammadhilalmalik@gmail.com' },
    { label: 'hilalmalik.tech', href: 'https://www.hilalmalik.tech' },
    { label: 'linkedin.com/in/hilalmalik', href: 'https://linkedin.com/in/hilalmalik' },
    { label: 'behance.net/mohammadhilalmalik', href: 'https://behance.net/mohammadhilalmalik' },
    { label: 'github.com/hilalmalik', href: 'https://github.com/hilalmalik' },
  ],
  summary:
    'UI/UX and product designer with 4 years of experience designing and building web products, from UX research and design systems to shipped React apps and AI-powered tools. Built LotStudio AI, a SaaS product for car dealerships, and a 20+ module dealership platform launched in 2 days. Combines product design, front-end development, automation and performance marketing. Open to full-time roles and freelance projects.',
  experience: [
    {
      org: 'BC dealership group and Vancouver creative agency',
      location: 'Vancouver, BC',
      roles: [
        { title: 'Web Development & Performance Marketing Manager (full-time)', dates: 'July 2026 to September 2026' },
        { title: 'Creative & Automation Specialist (part-time)', dates: 'April 2025 to July 2026' },
      ],
      bullets: [
        'Designed and built a dealership digital platform with 20+ core modules, including DMS-integrated inventory, VIN decoding with one-click SEO descriptions, natural-language search, UTM attribution, GA4 and Microsoft Clarity analytics, lead management and an email module; launched in 2 days.',
        'Built LotStudio AI, an AI vehicle-photo tool, from an internal tool to a SaaS MVP (May 2026) with masked editing, Supabase auth and an API integration for inventory websites.',
        'Designed the UI and UX of a peer-to-peer car rental platform (November 2025 to September 2026): booking flows, host and renter dashboards, admin panel and 14 booking lifecycle states; audited 300+ files and logged 139 UX issues, tracked with developers through to a live release.',
        'Designed, built and maintained websites for dealership and agency clients, with inventory integration, campaign landing pages, UTM tracking, automated lead emails, schema and GA4 setup.',
        'Built AI voice and chat agents with ElevenLabs, Twilio and n8n for appointment booking, lead capture and dealership inquiries, including scripts, fallbacks and confirmations.',
        'Planned, built and launched Meta campaigns end to end, including an EV dealership launch with a 48-vehicle catalogue, dynamic product ads and click-to-call; cut instant forms from 15 to 12 fields and reached a lowest cost per lead of $26.',
        'Produced AI-assisted ad creatives and coded motion ads and reels with Midjourney, Remotion and GSAP.',
      ],
    },
    {
      org: 'Freelance UI/UX & Web Designer',
      location: 'Remote',
      dates: '2022 to Present',
      roles: [],
      bullets: [
        'SiteTask (in progress): designing a multi-site task management web app for an 11-station fuel retailer, with role-based task assignment, photo-proof completion, overdue and completion email alerts, and reporting.',
        'Fashion e-commerce website for a tech apparel brand: product catalogue, product pages with colour and size selection, cart and checkout.',
        'Cakes and pastries bakery rebrand: repositioned the business and rebuilt its 5-page website around a mascot-led identity.',
      ],
    },
    {
      org: 'Quackly Private Limited',
      location: 'Remote (India)',
      roles: [{ title: 'UI/UX Design Intern', dates: 'March 2023 to April 2024' }],
      bullets: [
        'Designed e-commerce and logistics interfaces, including order tracking and fulfilment flows; ran usability testing; worked in Jira sprints.',
        'Designed the UI for Tuniff, an AI hairstyle recommendation app: survey research with about 10 users, personas, 14+ high-fidelity screens, and privacy and permissions design.',
      ],
    },
  ] satisfies ResumeJob[],
  skills: [
    { group: 'Design', items: 'Figma, design systems, wireframing, prototyping, UX research, usability testing, personas, information architecture, WCAG 2.1, Adobe Illustrator, Photoshop' },
    { group: 'Front-end', items: 'React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Vite, Supabase, GSAP, Framer Motion, Remotion, Chart.js, D3.js' },
    { group: 'AI & automation', items: 'Claude, ChatGPT, Midjourney, ElevenLabs, Twilio, n8n, Lovable' },
    { group: 'Marketing & analytics', items: 'Meta Ads Manager, GA4, Microsoft Clarity, UTM tracking, SEO and schema markup' },
  ],
  education: [
    {
      school: 'Kwantlen Polytechnic University, Wilson School of Design',
      location: 'Richmond, BC',
      program: 'Diploma, Front-End Development for Interactive Applications',
      dates: 'September 2024 to May 2026',
    },
  ],
  certifications: ['Responsive Web Design', 'Creating AI Applications with Python and GitHub Models', 'Figma Essential Training'],
  languages: 'English (professional), Hindi (native), Urdu (professional), German (elementary)',
} as const
