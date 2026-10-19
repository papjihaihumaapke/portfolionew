/**
 * Single source of truth for every project. Cards, filters, case study pages,
 * the resume, the sitemap and JSON-LD all read from here.
 *
 * Media `src` values are extensionless keys under /public (e.g. /media/lotstudio/cover).
 * `npm run media` builds responsive AVIF/WebP for whatever exists; missing files are
 * skipped on case study pages. Covers without real media use generated art (scripts/make-covers.mjs).
 */

export type ProjectType = 'product' | 'employer' | 'freelance' | 'coursework' | 'personal'
export type ProjectStatus = 'shipped' | 'in-progress'
export type Discipline = 'product' | 'web' | 'motion' | 'marketing'

export interface Media {
  src: string
  alt: string
  caption?: string
  /** Show on a padded light stage instead of edge to edge (portrait or phone shots). */
  contain?: boolean
  /** Show the whole cover uncropped; the card spans the full grid width. */
  full?: boolean
}

export interface Stat {
  value: string
  label: string
}

export type Widget =
  | 'before-after'
  | 'voice-flow'
  | 'reel-grid'
  | 'demos-musify'
  | 'demos-library'
  | 'demos-dashboard'
  | 'embed-musify'

export interface FlowNode {
  id: string
  label: string
  sub?: string
  tone?: 'accent' | 'dark' | 'muted'
}

/** Diagram, process and card blocks. Every label states a fact from the project, never a guess. */
export type FlowBlock = { kind: 'flow'; title: string; caption?: string; columns: FlowNode[][]; edges: [string, string][] }
export type Block =
  | FlowBlock
  | { kind: 'steps'; title?: string; caption?: string; steps: { title: string; body: string }[] }
  | { kind: 'cards'; title?: string; caption?: string; items: { label?: string; title: string; body?: string }[] }
  | { kind: 'decisions'; title?: string; caption?: string; items: { problem: string; decision: string }[] }

export interface Section {
  id: string
  title: string
  body?: string[]
  bullets?: string[]
  media?: Media[]
  stats?: Stat[]
  quote?: string
  widget?: Widget
  blocks?: Block[]
}

export interface Project {
  slug: string
  title: string
  summary: string
  /** One line for cards: verified outcome only. */
  outcome: string
  type: ProjectType
  status: ProjectStatus
  role: string
  timeline?: string
  /** Generic client description. Never a brand name. */
  client: string
  team?: string
  tools: string[]
  /** Max 3. */
  tags: string[]
  disciplines: Discipline[]
  featured: boolean
  order: number
  cover: Media
  ogImage: string
  sections: Section[]
  confidential: boolean
  liveUrl?: string
  /** Figma or other prototype link, shown as a secondary button on the case study. */
  prototypeUrl?: string
  /** Studies label shown on coursework cards. */
  studyLabel?: 'KPU coursework' | 'KPU capstone'
}

export const typeLabel: Record<ProjectType, string> = {
  product: 'Own product',
  employer: 'Employer',
  freelance: 'Freelance',
  coursework: 'Coursework',
  personal: 'Personal project',
}

export const disciplineLabel: Record<Discipline, string> = {
  product: 'Product',
  web: 'Web',
  motion: 'Motion',
  marketing: 'Marketing',
}

const og = (slug: string) => `/og/${slug}.png`

export const projects: Project[] = [
  /* 1 ------------------------------------------------------------------- */
  {
    slug: 'lotstudio-ai',
    title: 'LotStudio AI',
    summary:
      'B2B SaaS for car dealerships that cleans up vehicle photos, removing or replacing backgrounds for studio-quality listings while preserving the real details of the car.',
    outcome: 'MVP shipped May 2026 and deployed to production, with masked editing, auth and an inventory API.',
    type: 'product',
    status: 'shipped',
    role: 'Product design and build',
    timeline: '2026',
    client: 'Own product',
    tools: ['Supabase', 'Render'],
    tags: ['SaaS', 'AI', 'Product design'],
    disciplines: ['product'],
    featured: true,
    order: 1,
    cover: {
      src: '/media/lotstudio/cover',
      alt: 'LotStudio: a white sedan photographed on a dealership lot, split into the original photo and a clean studio result, with the steps take a photo, AI removes background, studio ready',
      full: true,
    },
    ogImage: og('lotstudio-ai'),
    confidential: false,
    liveUrl: 'https://lotstudio-ai.onrender.com/',
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'Vehicle photos taken on a dealership lot come with busy backgrounds, glare and small distractions. Cleaning them up for a listing is slow by hand, and generic AI tools often change the car itself, which a listing cannot allow.',
        ],
        widget: 'before-after',
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'LotStudio AI began as an internal tool built around a dealership’s real inventory, photos and staff workflow. It is now being turned into a SaaS product with support from management and ownership.',
          'I designed and built it. The hard constraint: the output has to look studio quality while every real detail of the vehicle stays true.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'flow',
            title: 'How a photo moves through LotStudio',
            caption: 'Photos arrive from staff or straight from an inventory website, and only masked areas are ever edited by hand.',
            columns: [
              [
                { id: 'upload', label: 'Staff upload', sub: 'Signed in with magic link or email' },
                { id: 'api', label: 'Inventory website', sub: 'Sends images with an API key' },
              ],
              [{ id: 'type', label: 'Photo type', sub: 'Exterior, interior, detail, white interior' }],
              [{ id: 'bg', label: 'Background', sub: 'Remove or replace' }],
              [{ id: 'ai', label: 'AI processing', sub: 'Quality tuned for vehicle detail', tone: 'accent' }],
              [{ id: 'erase', label: 'Magic Eraser', sub: 'Brush a mask; only that area changes' }],
              [{ id: 'summary', label: 'Job summary', sub: 'Thumbnails and clear labels', tone: 'dark' }],
            ],
            edges: [['upload', 'type'], ['api', 'type'], ['type', 'bg'], ['bg', 'ai'], ['ai', 'erase'], ['erase', 'summary']],
          },
          {
            kind: 'decisions',
            title: 'What broke, and the product decision it led to',
            items: [
              { problem: 'The model redrew details like a dashboard or gear shifter instead of removing one distraction.', decision: 'Magic Eraser masked editing: brush over the sticker, dealer card, fingerprint or glare, and only that area changes.' },
              { problem: 'Higher-quality output settings blurred vehicle details.', decision: 'Tuned output quality for fidelity to the real car instead of the highest setting.' },
              { problem: 'Build issues, path aliases and dependencies stood between the MVP and production.', decision: 'Fixed the build and deployment setup so it runs in production on Render.' },
            ],
          },
        ],
        body: [
          'The MVP shipped on May 19, 2026: upload a lot photo, choose a background, get a cleaner listing image. About 18 commits of iteration followed, each driven by what broke in real use.',
          'One finding shaped the pipeline: higher-quality output settings blurred vehicle details, so quality was tuned for fidelity to the car rather than for the highest setting.',
        ],
        quote:
          'Building with AI is about testing, noticing what breaks and why, and making product decisions from there. When the model redraws a dashboard or gear shifter instead of removing one distraction, that is a product architecture problem. That is where masked editing, quality control and workflow design matter.',
        media: [
          { src: '/media/lotstudio/upload', alt: 'LotStudio AI upload screen where staff add a vehicle photo', caption: 'Upload: one photo in, one job started.' },
          { src: '/media/lotstudio/background-picker', alt: 'Background picker with studio background options for the vehicle photo', caption: 'Background picker.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        bullets: [
          'Multiple photo types: exterior, interior, detail, and an interior white-background mode.',
          'Magic Eraser masked editing: brush over a sticker, dealer card, fingerprint, glare or object so only that area changes.',
          'Supabase auth with magic link and email and password sign-in.',
          'API-key integration so an inventory website can send vehicle images straight in.',
          'Thumbnails, processing animations, clearer job summaries and labels.',
          'Deployed on Render: I fixed build issues, path aliases, dependencies and the deployment setup to make it production ready.',
        ],
        media: [
          { src: '/media/lotstudio/magic-eraser', alt: 'Magic Eraser: a brush mask painted over a sticker on a vehicle window so only that area is edited', caption: 'Magic Eraser: only the masked area changes.' },
          { src: '/media/lotstudio/job-summary', alt: 'Job summary screen listing processed vehicle photos with thumbnails and status labels', caption: 'Job summary with thumbnails and clear labels.' },
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        stats: [
          { value: 'May 19, 2026', label: 'MVP shipped' },
          { value: '~18', label: 'Commits of iteration since MVP' },
          { value: '4', label: 'Photo types supported' },
        ],
        body: ['LotStudio AI is live and in production on Render.'],
      },
      {
        id: 'learned',
        title: 'What I learned',
        body: [
          'Prompting is not the product. The product is the set of guardrails around the model: what it is allowed to touch, how quality is checked, and how staff fix the edge cases.',
        ],
      },
    ],
  },

  /* 2 ------------------------------------------------------------------- */
  {
    slug: 'dealership-platform',
    title: 'Dealership Digital Platform',
    summary:
      'A complete platform for a modern dealership: inventory, search, photo processing, campaign landing pages, attribution, analytics, lead management and email, in one admin.',
    outcome: '20+ core modules and 10+ landing page templates, launched in 2 days.',
    type: 'employer',
    status: 'shipped',
    role: 'Product design and front-end build',
    timeline: '2026',
    client: 'Multi-location BC dealership group (confidential)',
    tools: ['GA4', 'Microsoft Clarity', 'UTM tracking'],
    tags: ['Platform', 'Analytics', 'Web'],
    disciplines: ['product', 'web', 'marketing'],
    featured: true,
    order: 2,
    cover: { src: '/media/dealership/cover', alt: 'Grid of the dealership platform’s core modules, from inventory and VIN decoding to attribution and email' },
    ogImage: og('dealership-platform'),
    confidential: true,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'A multi-location dealership group needed one platform for inventory, marketing, leads and reporting, with a clear line from first click to sale across thousands of listings.',
        ],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'I designed and built the platform. It had to integrate with the existing dealer management system (DMS), handle thousands of listings, and work fully on mobile. All screens shown here are recreated or redacted for confidentiality.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'flow',
            title: 'Inventory pipeline',
            columns: [
              [{ id: 'dms', label: 'Dealer management system', sub: 'Integrated with inventory', tone: 'dark' }],
              [{ id: 'inv', label: 'Inventory admin', sub: 'Thousands of listings' }],
              [
                { id: 'vin', label: 'VIN decoding', sub: 'One-click SEO description' },
                { id: 'photo', label: 'Photo processing', sub: 'Built into the platform' },
                { id: 'search', label: 'Natural-language search', sub: 'Search inventory in plain words' },
              ],
            ],
            edges: [['dms', 'inv'], ['inv', 'vin'], ['inv', 'photo'], ['inv', 'search']],
          },
          {
            kind: 'flow',
            title: 'Attribution loop, from first click to revenue',
            columns: [
              [{ id: 'utm', label: 'UTM link builder', sub: 'Every campaign link tagged' }],
              [{ id: 'lp', label: 'Landing pages', sub: '10+ campaign templates' }],
              [
                { id: 'ga4', label: 'GA4 events', sub: 'Conversion funnel tracking' },
                { id: 'clarity', label: 'Microsoft Clarity', sub: 'Heatmaps and recordings' },
              ],
              [{ id: 'leads', label: 'Lead management', sub: 'Customer tracking' }],
              [{ id: 'email', label: 'Email module', sub: 'Segmented by location and campaign' }],
              [{ id: 'rev', label: 'Revenue analytics', sub: 'First click to conversion', tone: 'accent' }],
            ],
            edges: [['utm', 'lp'], ['lp', 'ga4'], ['lp', 'clarity'], ['ga4', 'leads'], ['leads', 'email'], ['email', 'rev']],
            caption: 'Conversions from email follow-ups are traced back to the campaign that started them.',
          },
        ],
        body: [
          'I worked module by module, starting with inventory and the DMS integration, then layering search, photo processing, landing pages, attribution and analytics on top of the same data.',
        ],
        media: [
          { src: '/media/dealership/inventory', alt: 'Recreated inventory management screen with vehicle list, filters and status', caption: 'Inventory with DMS integration. Recreated for confidentiality.' },
          { src: '/media/dealership/vin-decoder', alt: 'Recreated VIN decoding panel generating an SEO vehicle description in one click', caption: 'VIN decoding with one-click SEO descriptions. Recreated for confidentiality.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        bullets: [
          'Inventory management with DMS integration and an admin dashboard for thousands of listings.',
          'VIN decoding with one-click SEO vehicle descriptions.',
          'Natural-language inventory search and built-in vehicle photo processing.',
          'Campaign landing pages, end-to-end UTM tracking with a UTM link builder, and first-click to conversion attribution.',
          'GA4 events, Microsoft Clarity heatmaps and session recordings.',
          'Real-time marketing, lead and revenue analytics, lead management, customer tracking and conversion funnel tracking.',
          'Email module: templates, segmented bulk sends by location and campaign, open, click and reply tracking, and conversions traced back to email follow-ups.',
        ],
        media: [
          { src: '/media/dealership/analytics', alt: 'Recreated marketing and revenue analytics dashboard with funnel and attribution charts', caption: 'Attribution and funnel analytics. Recreated for confidentiality.' },
          { src: '/media/dealership/email', alt: 'Recreated email module with segmented send options by location and campaign', caption: 'Email module with segmented sends. Recreated for confidentiality.' },
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        stats: [
          { value: '20+', label: 'Core modules' },
          { value: '10+', label: 'Landing page templates' },
          { value: '2 days', label: 'To launch' },
          { value: '100%', label: 'Mobile responsive' },
        ],
      },
    ],
  },

  /* 3 ------------------------------------------------------------------- */
  {
    slug: 'car-rental-platform',
    title: 'Peer-to-Peer Car Rental Platform',
    summary:
      'End-to-end product design for a peer-to-peer car rental platform: booking flows, host and renter dashboards and an internal admin panel.',
    outcome: '139 UX issues logged and tracked with developers through to a confirmed live release.',
    type: 'employer',
    status: 'shipped',
    role: 'UI & Web Designer',
    timeline: 'November 2025 to September 2026',
    client: 'Peer-to-peer car rental platform (confidential)',
    tools: ['Figma', 'React', 'Vite', 'Supabase', 'Tailwind CSS', 'Lovable'],
    tags: ['Product design', 'UX research', 'QA'],
    disciplines: ['product', 'web'],
    featured: true,
    order: 3,
    cover: { src: '/media/rental/cover', alt: 'Ring of 14 numbered booking lifecycle states for the car rental platform' },
    ogImage: og('car-rental-platform'),
    confidential: true,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'The platform needed a complete peer-to-peer rental experience: host onboarding, renter booking, deposit handling and an internal operations panel, with no design system in place. Rankings were also suffering from technical SEO issues.',
        ],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'As UI & Web Designer I owned the end-to-end product design: booking flows, host and renter dashboards and the internal admin panel. I also ran QA and usability testing with the developers.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'cards',
            title: 'Research',
            items: [
              { label: 'Scope', title: 'Private and peer-to-peer rental market', body: 'How the market works for hosts and renters.' },
              { label: 'Scope', title: 'Rules and regulations', body: 'What a peer-to-peer rental platform has to account for.' },
              { label: 'Scope', title: 'Competitor review', body: 'Turo and other peer-to-peer platforms.' },
              { label: 'Finding', title: 'Unclear booking states', body: 'Renters and hosts could not always tell where a booking stood.' },
              { label: 'Finding', title: 'Opaque pricing', body: 'Costs were hard to read before committing.' },
              { label: 'Finding', title: 'Weak host trust signals', body: 'Little to reassure a renter about the host and vehicle.' },
            ],
            caption: 'Findings come from the review of existing peer-to-peer platforms.',
          },
          {
            kind: 'flow',
            title: 'Platform structure',
            columns: [
              [
                { id: 'renter', label: 'Renter booking flow' },
                { id: 'host', label: 'Host dashboard' },
                { id: 'admin', label: 'Internal admin panel' },
              ],
              [{ id: 'supa', label: 'Supabase back end', sub: '14 booking lifecycle states', tone: 'dark' }],
              [{ id: 'pay', label: 'Payment gateway', sub: 'Security deposit pre-authorization', tone: 'accent' }],
            ],
            edges: [['renter', 'supa'], ['host', 'supa'], ['admin', 'supa'], ['supa', 'pay']],
          },
        ],
        body: [
          'Research covered the private and peer-to-peer rental market, rules and regulations, and a competitor review of Turo and other P2P platforms. Existing platforms showed common friction: unclear booking states, opaque pricing and weak host trust signals.',
          'I mapped 14 booking lifecycle states before wireframing, then designed 14 screens in Figma covering the full rental lifecycle.',
        ],
        media: [
          { src: '/media/rental/booking-flow', alt: 'Booking flow screens from vehicle selection to deposit confirmation', caption: 'Booking flow across the lifecycle.' },
          { src: '/media/rental/dashboards', alt: 'Host and renter dashboard screens with upcoming trips and earnings', caption: 'Host and renter dashboards.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        blocks: [
          {
            kind: 'steps',
            title: 'The QA loop',
            steps: [
              { title: 'Audit', body: 'Reviewed 300+ files across the platform.' },
              { title: 'Log', body: '139 UX issues, each with a screenshot, URL, device and browser, and expected vs actual.' },
              { title: 'Track', body: 'Worked through the log with the developers.' },
              { title: 'Confirm', body: 'Every issue followed through to a confirmed live release.' },
            ],
          },
          {
            kind: 'cards',
            title: 'SEO diagnosis',
            items: [
              { label: 'Found', title: 'www and non-www split', body: 'Two versions of the site were splitting ranking signals.' },
              { label: 'Found', title: 'Client-side rendering', body: 'Pages rendered in the browser, which was hurting rankings.' },
            ],
          },
        ],
        bullets: [
          'Booking flows, host and renter dashboards and an internal admin panel.',
          'Security deposit pre-authorization live through the payment gateway on a Supabase back end.',
          'Diagnosed a www and non-www split and a client-side rendering problem that were hurting rankings.',
        ],
        media: [
          { src: '/media/rental/admin', alt: 'Internal admin panel with grouped navigation for bookings, vehicles and users', caption: 'Internal admin panel.' },
          { src: '/media/rental/bug-report', alt: 'UX issue log with screenshot, URL, device, browser and expected versus actual result columns', caption: 'Each issue logged with screenshot, URL, device and browser, expected vs actual.' },
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        stats: [
          { value: '300+', label: 'Files audited' },
          { value: '139', label: 'UX issues logged' },
          { value: '14', label: 'Booking states mapped' },
        ],
        body: ['Every logged issue was tracked with the developers through to a confirmed live release.'],
      },
      {
        id: 'learned',
        title: 'What I learned',
        body: [
          'I would invest earlier in a documented design system. Many component inconsistencies surfaced mid-build that a token library from the first sprint would have prevented.',
        ],
      },
    ],
  },

  /* 4 ------------------------------------------------------------------- */
  {
    slug: 'sitetask',
    title: 'SiteTask: Multi-Site Operations App',
    summary:
      'A web app where a multi-site owner assigns work to managers and staff, sees it done with photo proof, and knows what is overdue across every station.',
    outcome: 'In progress: core screens designed for owner, manager and staff roles.',
    type: 'freelance',
    status: 'in-progress',
    role: 'UI/UX Designer',
    timeline: '2026, in progress',
    client: 'Fuel and convenience retailer with 11 stations (confidential)',
    tools: ['Figma'],
    tags: ['Product design', 'Web app', 'Operations'],
    disciplines: ['product'],
    featured: true,
    order: 4,
    cover: { src: '/media/sitetask/cover', alt: 'Diagram of one owner, two managers and 11 stations, with one task checked off' },
    ogImage: og('sitetask'),
    confidential: true,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'The owner runs 11 stations through two managers, one running 5 sites and the other 6, each with their own staff. There was no single place to assign work, confirm it was done, or see what was overdue.',
        ],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'I am designing the product end to end. Three roles need different views of the same work: the owner sees every site, managers see their own sites, and staff see their own tasks.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'flow',
            title: 'Who assigns work to whom',
            columns: [
              [{ id: 'owner', label: 'Owner', sub: 'Sees all 11 stations', tone: 'dark' }],
              [
                { id: 'm1', label: 'Manager', sub: 'Runs 5 sites' },
                { id: 'm2', label: 'Manager', sub: 'Runs 6 sites' },
              ],
              [
                { id: 's1', label: 'Staff', sub: 'At those 5 sites' },
                { id: 's2', label: 'Staff', sub: 'At those 6 sites' },
              ],
            ],
            edges: [['owner', 'm1'], ['owner', 'm2'], ['m1', 's1'], ['m2', 's2']],
            caption: 'Role-based access: each person sees the work that belongs to them.',
          },
          {
            kind: 'flow',
            title: 'Task lifecycle',
            columns: [
              [{ id: 'create', label: 'Task created', sub: 'By the owner or a manager' }],
              [{ id: 'assigned', label: 'Assigned', sub: 'Email alert sent' }],
              [
                { id: 'done', label: 'Done with photo proof', sub: 'Email alert sent', tone: 'accent' },
                { id: 'overdue', label: 'Overdue', sub: 'Email alert sent', tone: 'dark' },
              ],
              [{ id: 'review', label: 'Manager sees proof', sub: 'On the task detail' }],
              [{ id: 'digest', label: 'Daily digest', sub: 'Summary of station activity' }],
            ],
            edges: [['create', 'assigned'], ['assigned', 'done'], ['assigned', 'overdue'], ['done', 'review'], ['review', 'digest'], ['overdue', 'digest']],
          },
        ],
        body: [
          'I started from the chain of responsibility (owner to managers to staff) and designed role-based access around it, then the proof loop: a task is not done until the manager can see a photo of it.',
        ],
        media: [
          { src: '/media/sitetask/task-board', alt: 'Task board in kanban view with filters by site and priority', caption: 'Task board in kanban and list views, filtered by site and priority.' },
          { src: '/media/sitetask/task-detail', alt: 'Task detail with a staff photo as proof of completion and a comment thread', caption: 'Task detail with photo proof and comments.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        blocks: [
          {
            kind: 'cards',
            title: 'Screens, grouped',
            items: [
              { label: 'Entry', title: 'Sign-in' },
              { label: 'Overview', title: 'Owner dashboard and manager dashboard', body: 'Tasks completed, overdue, station health, today’s schedule, recent activity.' },
              { label: 'Work', title: 'Task board, task detail, create task', body: 'Kanban and list views, filters by site and priority, photo proof and comments.' },
              { label: 'People', title: 'Sites and team, team messages' },
              { label: 'Insight', title: 'Reports and analytics', body: 'Total tasks, in progress, completion rate, completed over time, by site, by person.' },
              { label: 'Settings', title: 'Notification settings', body: 'Completed, overdue and assigned alerts, plus the daily digest.' },
            ],
          },
        ],
        bullets: [
          'The owner assigns tasks to managers and managers assign to staff, with role-based access.',
          'Staff mark tasks done with photo proof the manager can see.',
          'Email alerts when tasks are completed, overdue or assigned, plus a daily digest summarizing station activity.',
        ],
        body: [
          'Screens designed: sign-in; owner dashboard (tasks completed, overdue, station health, today’s schedule, recent activity); task board in kanban and list views; task detail; create task; sites and team; team messages; reports and analytics (total tasks, in progress, completion rate, completed over time, by site, by person); notification settings; and the manager dashboard.',
        ],
        media: [
          { src: '/media/sitetask/owner-dashboard', alt: 'Owner dashboard showing tasks completed, overdue, station health, schedule and recent activity', caption: 'Owner dashboard.' },
          { src: '/media/sitetask/reports', alt: 'Reports screen with completion rate and tasks completed over time, by site and by person', caption: 'Reports and analytics.' },
          { src: '/media/sitetask/manager-dashboard', alt: 'Manager dashboard scoped to the manager’s own stations', caption: 'Manager dashboard.' },
          { src: '/media/sitetask/notifications', alt: 'Notification settings for completed, overdue and assigned task emails and the daily digest', caption: 'Notification settings.' },
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        body: ['In progress. No results yet: this section will be updated once SiteTask is in use at the stations.'],
      },
    ],
  },

  /* 5 ------------------------------------------------------------------- */
  {
    slug: 'ai-voice-agents',
    title: 'AI Voice & Chat Agents',
    summary:
      'AI voice and chat agents that handle appointment booking, lead capture and dealership inquiries, built with ElevenLabs, Twilio and n8n.',
    outcome: 'Inquiries answered and routed automatically, with bookings captured outside business hours.',
    type: 'employer',
    status: 'shipped',
    role: 'Conversation design and build',
    client: 'BC dealership group (confidential)',
    tools: ['ElevenLabs', 'Twilio', 'n8n'],
    tags: ['AI', 'Automation', 'Conversation design'],
    disciplines: ['product', 'marketing'],
    featured: false,
    order: 5,
    cover: { src: '/media/voice-agents/cover', alt: 'Voice waveform flowing into intent detection, then booking, lead capture or a human handoff' },
    ogImage: og('ai-voice-agents'),
    confidential: true,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'Calls and messages about appointments, vehicles and general questions arrive at all hours. When nobody can answer, the inquiry and the booking are lost.',
        ],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'I built the agents and wrote the conversation scripts, flows, fallbacks and confirmations. The agent had to know when to stop and hand off to a person.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        body: [
          'Every conversation follows the same shape: a trigger, intent detection, the booking or lead path, a fallback when the agent is unsure, and a human handoff.',
        ],
        widget: 'voice-flow',
      },
      {
        id: 'solution',
        title: 'The solution',
        blocks: [
          {
            kind: 'flow',
            title: 'The stack behind a call',
            columns: [
              [{ id: 'call', label: 'Caller', sub: 'Phone call to the dealership', tone: 'dark' }],
              [{ id: 'twilio', label: 'Twilio', sub: 'Phone line' }],
              [{ id: 'eleven', label: 'ElevenLabs agent', sub: 'Runs my scripts and flows', tone: 'accent' }],
              [{ id: 'n8n', label: 'n8n workflows', sub: 'Route the result' }],
              [
                { id: 'cal', label: 'Calendar', sub: 'Appointment booked' },
                { id: 'lead', label: 'Lead captured', sub: 'Name and details' },
                { id: 'human', label: 'Human handoff', sub: 'Staff take over' },
              ],
            ],
            edges: [['call', 'twilio'], ['twilio', 'eleven'], ['eleven', 'n8n'], ['n8n', 'cal'], ['n8n', 'lead'], ['n8n', 'human']],
          },
          {
            kind: 'steps',
            title: 'What I wrote',
            steps: [
              { title: 'Scripts', body: 'What the agent says at each turn of the conversation.' },
              { title: 'Flows', body: 'How the conversation branches for booking, leads and inquiries.' },
              { title: 'Fallbacks', body: 'What the agent does when it is unsure or off-script.' },
              { title: 'Confirmations', body: 'Reading back exactly what was booked.' },
            ],
          },
        ],
        bullets: [
          'Voice agents on ElevenLabs and Twilio for appointment booking, lead capture and dealership inquiries.',
          'Chat agents for the same intents.',
          'n8n workflows that route bookings and leads to the right place.',
          'Scripted confirmations so callers know exactly what was booked.',
        ],
        media: [{ src: '/media/voice-agents/n8n-workflow', alt: 'n8n workflow screenshot with nodes for the call trigger, intent routing, booking and handoff', caption: 'The n8n workflow behind the agents.' }],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        body: ['Inquiries are answered and routed automatically, and bookings are captured outside business hours.'],
      },
    ],
  },

  /* 6 ------------------------------------------------------------------- */
  {
    slug: 'ev-launch-campaign',
    title: 'Launch Campaign & AI Ad Creative',
    summary:
      'An EV dealership launch on Meta, from catalogue migration to campaign build, plus lead-gen work and a generative AI creative workflow across the dealership group.',
    outcome: '48-vehicle catalogue launch, and a lowest cost per lead of $26 across the group.',
    type: 'employer',
    status: 'shipped',
    role: 'Campaign strategy, creative and media buying',
    timeline: '2026',
    client: 'EV dealership launch, Metro Vancouver',
    tools: ['Meta Ads Manager', 'Midjourney'],
    tags: ['Meta Ads', 'Generative AI', 'Lead gen'],
    disciplines: ['marketing'],
    featured: false,
    order: 6,
    cover: { src: '/media/ev-campaign/cover', alt: 'Lowest cost per lead of $26 and a 48-vehicle catalogue beside 4:5 and 9:16 ad frames' },
    ogImage: og('ev-launch-campaign'),
    confidential: true,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: ['A new EV dealership in Metro Vancouver needed a full launch on Meta, and the wider dealership group needed lead generation that worked.'],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'I come up with campaign and creative ideas, build the creatives, and build and launch campaigns in Meta Ads Manager. AI helps pull reports and flag what is underperforming; I then research and decide what to keep or cut.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'flow',
            title: 'Launch structure',
            columns: [
              [{ id: 'audit', label: 'Pre-launch audit' }],
              [{ id: 'plan', label: '90-day marketing plan' }],
              [
                { id: 'carousel', label: 'Test-drive carousels' },
                { id: 'dpa', label: 'Dynamic product ads', sub: '48-vehicle catalogue', tone: 'dark' },
                { id: 'ctc', label: 'Click-to-call' },
                { id: 'adv', label: 'Broad Advantage+' },
              ],
              [{ id: 'leads', label: 'Leads', tone: 'accent' }],
              [{ id: 'email', label: 'Auto-responder', sub: 'Test-drive emails' }],
            ],
            edges: [['audit', 'plan'], ['plan', 'carousel'], ['plan', 'dpa'], ['plan', 'ctc'], ['plan', 'adv'], ['carousel', 'leads'], ['dpa', 'leads'], ['ctc', 'leads'], ['adv', 'leads'], ['leads', 'email']],
          },
          {
            kind: 'steps',
            title: 'Creative and reporting loop',
            steps: [
              { title: 'Idea', body: 'I come up with the campaign and creative ideas.' },
              { title: 'Create', body: 'Midjourney plus prompt systems for on-brand creatives at 4:5 and 9:16.' },
              { title: 'Launch', body: 'Built and launched in Meta Ads Manager.' },
              { title: 'Flag', body: 'AI pulls the reports and flags what is underperforming.' },
              { title: 'Decide', body: 'I research the flags and decide what to keep or cut.' },
            ],
          },
        ],
        bullets: [
          'Pre-launch audit and a 90-day marketing plan.',
          'Migrated 48 vehicles into a dedicated catalogue with dynamic product ads.',
          'Test-drive auto-responder emails.',
          'GenAI creative workflow: Midjourney plus prompt systems for on-brand ad creatives at 4:5 and 9:16.',
        ],
        media: [
          { src: '/media/ev-campaign/creative-4x5', alt: 'Vertical 4:5 test-drive ad creative for an electric vehicle, branding removed', caption: '4:5 creative.', contain: true },
          { src: '/media/ev-campaign/creative-9x16', alt: 'Full-screen 9:16 story ad creative for an electric vehicle, branding removed', caption: '9:16 creative.', contain: true },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        bullets: [
          'Full launch campaign: test-drive carousels, catalogue ads, click-to-call and broad Advantage+.',
          'Lead-gen across the dealership group: instant forms cut from 15 to 12 fields, plus qualifier ad sets.',
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        stats: [
          { value: '48', label: 'Vehicles in the launch catalogue' },
          { value: '15 to 12', label: 'Instant form fields' },
          { value: '$26', label: 'Lowest cost per lead' },
        ],
      },
      {
        id: 'learned',
        title: 'What I learned',
        body: ['AI is fast at flagging what is underperforming, but the keep or cut decision still needs research and judgement.'],
      },
    ],
  },

  /* 7 ------------------------------------------------------------------- */
  {
    slug: 'motion-reel',
    title: 'Motion Reel: Coded Ads & Reels',
    summary: 'Animated ads, reels and brand films built in code with Claude, Remotion and GSAP, including my own showreel.',
    outcome: 'A 66-second brand film and a vertical showreel, every frame written in code.',
    type: 'employer',
    status: 'shipped',
    role: 'Motion design and code',
    timeline: '2026',
    client: 'BC dealership group and Vancouver creative agency (confidential)',
    tools: ['Claude', 'Remotion', 'GSAP'],
    tags: ['Motion', 'Remotion', 'GSAP'],
    disciplines: ['motion', 'marketing'],
    featured: false,
    order: 7,
    cover: { src: '/media/motion/the-whole-loop-poster', alt: 'Final frame of The whole loop film: design, code and marketing joined in one circle' },
    ogImage: og('motion-reel'),
    confidential: true,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: ['Ads, reels and logo stings, built in code instead of a timeline editor, using Claude, Remotion and GSAP.'],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        blocks: [
          {
            kind: 'steps',
            title: 'How a coded reel comes together',
            steps: [
              { title: 'Write it as code', body: 'Scenes are React components in Remotion, with GSAP for motion. Claude helps write the code.' },
              { title: 'Time drives everything', body: 'Every frame is a function of time, so a timing or copy change is one edit.' },
              { title: 'Render the formats', body: 'The same source renders the 16:9 film and the 9:16 reel.' },
            ],
          },
        ],
        body: ['I designed and built each piece in code with Claude, Remotion and GSAP. Client names, logos and phone numbers are kept out of everything shown here.'],
      },
      {
        id: 'solution',
        title: 'The reels',
        body: ['Previews are muted and loop. Play any reel with sound.'],
        widget: 'reel-grid',
      },
    ],
  },

  /* 8 ------------------------------------------------------------------- */
  {
    slug: 'tuniff',
    title: 'Tuniff: AI Hairstyle Recommendation App',
    summary: 'An AI-powered mobile app that helps people choose a hairstyle that suits them, with a virtual try-on.',
    outcome: '14+ high-fidelity screens grounded in survey research with 10 users.',
    type: 'employer',
    status: 'shipped',
    role: 'UI/UX Design Intern',
    timeline: 'March 2023 to April 2024',
    client: 'Quackly Private Limited',
    tools: ['Figma', 'Google Forms'],
    tags: ['Mobile app', 'UX research', 'AI'],
    disciplines: ['product'],
    featured: false,
    order: 8,
    cover: { src: '/media/tuniff/cover', alt: 'Tuniff mobile app screens showing hairstyle recommendations' },
    ogImage: og('tuniff'),
    confidential: false,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: ['Choosing a hairstyle lacks personalization. People struggle to picture how a style will suit their face shape before committing at the barber.'],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: [
          'As UI/UX Design Intern at Quackly, I led the end-to-end UX, from survey research and personas to information architecture and high-fidelity screens. Facial data is sensitive, so privacy and permissions had to be designed in, not added later.',
        ],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'steps',
            title: 'Process',
            steps: [
              { title: 'Discover', body: 'Survey research and competitive analysis.' },
              { title: 'Define', body: 'Personas and MoSCoW prioritization.' },
              { title: 'Ideate', body: 'Information architecture and user flows.' },
              { title: 'Design', body: 'Style guide, type and 14+ high-fidelity screens.' },
            ],
          },
          {
            kind: 'cards',
            title: 'What the research said',
            items: [
              { label: 'Persona', title: 'Sneha Sharma', body: 'A tech-savvy designer looking for style changes that fit her creative image.' },
              { label: 'Finding', title: '8 of 10 wanted AI personalisation', body: 'Out of 10 surveyed users.' },
              { label: 'Finding', title: '7 of 10 had privacy concerns', body: 'About facial data, so privacy and permissions were designed in from the start.' },
            ],
          },
        ],
        body: [
          'Survey research with 10 users: 8 of 10 surveyed users wanted AI personalisation, and 7 of 10 had privacy concerns about facial data.',
          'Discover (research and competitive analysis), define (personas and MoSCoW), ideate (information architecture and user flows), then design (style guide and type).',
        ],
        media: [
          { src: '/media/tuniff/research', alt: 'Tuniff research summary with survey findings and persona', caption: 'Survey research and persona.' },
          { src: '/media/tuniff/flows', alt: 'Tuniff information architecture and user flow diagram', caption: 'Information architecture and flows.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        body: ['A high-fidelity mobile prototype with guided onboarding, filtering, a 2D virtual try-on based on facial feature scanning, and clear privacy and permission controls.'],
        media: [{ src: '/media/tuniff/screens', alt: 'Tuniff high-fidelity screens for onboarding, recommendations and try-on', caption: '14+ high-fidelity screens.' }],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        stats: [
          { value: '8 of 10', label: 'Surveyed users wanted AI personalisation' },
          { value: '7 of 10', label: 'Had privacy concerns' },
          { value: '14+', label: 'High-fidelity screens' },
        ],
      },
      {
        id: 'learned',
        title: 'What I learned',
        body: ['Biometric data needs radical transparency in privacy settings, and a minimal UI keeps complex AI output from overwhelming people.'],
      },
    ],
  },

  /* Personal projects --------------------------------------------------- */
  {
    slug: 'zara-redesign',
    title: 'Zara Website Redesign',
    summary: 'A redesign of the Zara web experience focused on accessibility, intuitive navigation and a refined visual hierarchy.',
    outcome: 'Responsive redesign with a Figma prototype for desktop, tablet and mobile.',
    type: 'personal',
    status: 'shipped',
    role: 'UI/UX Designer',
    timeline: '2025',
    client: 'Personal project (unsolicited redesign)',
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'AI tools'],
    tags: ['Web redesign', 'Accessibility', 'Figma'],
    disciplines: ['product', 'web'],
    featured: false,
    order: 201,
    cover: { src: '/media/zara/cover', alt: 'Mid-fidelity wireframes of the redesigned Zara homepage, category, search and product pages on laptop and tablet' },
    ogImage: og('zara-redesign'),
    confidential: false,
    prototypeUrl: 'https://www.figma.com/proto/v92INsi3vQ46o8rxwS5drA/Zara-website-redesign?content-scaling=fixed&kind=proto&node-id=20-4&scaling=scale-down&starting-point-node-id=20%3A4',
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'Users struggled with Zara’s complex navigation and an inconsistent experience across devices. The site also had accessibility hurdles, such as poor keyboard support and low contrast.',
        ],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: ['I led the end-to-end redesign, applying UX laws like Hick’s and Fitts’s to simplify the interface while keeping the brand’s premium feel.'],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'cards',
            title: 'Key findings',
            items: [
              { label: 'Usability', title: 'Navigation is hard on small screens' },
              { label: 'Usability', title: 'Keyboard navigation is ineffective', body: 'Selections are not properly highlighted.' },
              { label: 'Usability', title: 'Search is hard to find', body: 'It is the most effective way to navigate, but not easily visible.' },
              { label: 'Usability', title: 'Weak mobile usability', body: 'Small text and limited menu visibility.' },
              { label: 'Accessibility', title: 'Low contrast', body: 'Navigation menus are hard to see.' },
              { label: 'Accessibility', title: 'Assistive tech struggles', body: 'Screen reader support does not work well, and users cannot tab through elements effectively.' },
            ],
          },
          {
            kind: 'steps',
            title: 'UX laws behind the decisions',
            steps: [
              { title: 'Hick’s Law', body: 'Fewer choices at each step to cut decision time.' },
              { title: 'Fitts’s Law', body: 'Larger, closer targets for key actions.' },
              { title: 'Miller’s Law', body: 'Information chunked into digestible groups.' },
              { title: 'Gestalt principles', body: 'Grouping and alignment to build visual hierarchy.' },
            ],
          },
        ],
        body: [
          'Analysis of the existing site revealed the friction points: overwhelming choices and a lack of clear visual organization. Accessibility audits found contrast and navigation gaps.',
          'From Miller’s Law for chunking information to Gestalt principles for visual hierarchy, each design decision aimed to reduce cognitive load and improve the shopping journey.',
        ],
        media: [
          { src: '/media/zara/discovery', alt: 'Key findings: usability issues and accessibility challenges on the existing Zara site', caption: 'Key findings from the usability and accessibility review.' },
          { src: '/media/zara/process', alt: 'Mid-fidelity mobile wireframes for the homepage, category, search and product pages', caption: 'Mid-fidelity mobile wireframes.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        body: ['A minimalist, functional redesign that prioritizes accessibility and responsiveness, with easier product discovery and a smoother checkout flow.'],
        media: [{ src: '/media/zara/solution', alt: 'Mobile wireframes with product imagery for the redesigned shopping flow', caption: 'The redesigned mobile shopping flow.' }],
      },
      {
        id: 'learned',
        title: 'What I learned',
        body: [
          'Balancing a high-fashion, minimalist brand with the functional needs of a high-volume store comes down to visual hierarchy and small interactions; they are what make the experience feel premium.',
        ],
      },
    ],
  },
  {
    slug: 'mini-minds',
    title: 'Mini Minds',
    summary: 'An interactive learning app for children aged 5 to 10, built around gamified learning and creative skill development.',
    outcome: '9+ high-fidelity screens for a gamified learning app for ages 5 to 10.',
    type: 'personal',
    status: 'shipped',
    role: 'UI/UX Designer',
    timeline: '2024',
    client: 'Personal project',
    tools: ['Figma', 'Adobe Illustrator', 'Canva'],
    tags: ['Mobile app', 'EdTech', 'Gamification'],
    disciplines: ['product'],
    featured: false,
    order: 202,
    cover: { src: '/media/mini-minds/cover', alt: 'Mini Minds app logo on two phones' },
    ogImage: og('mini-minds'),
    confidential: false,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: [
          'Traditional learning platforms are often rigid and fail to engage young learners. Children need something that matches their energy levels and different learning styles.',
        ],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: ['I designed the end-to-end mobile experience, focusing on gamification and child-friendly UI patterns so learning feels intuitive and fun.'],
      },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'steps',
            title: 'Process',
            steps: [
              { title: 'Empathy mapping', body: 'What parents think, feel, say and do about their child’s learning.' },
              { title: 'Heuristic evaluation', body: 'Each core screen checked against usability heuristics.' },
              { title: 'High-fidelity design', body: 'Nine screens from splash to quiz.' },
            ],
          },
          {
            kind: 'cards',
            title: 'Heuristic evaluation',
            items: [
              { label: 'Splash', title: 'Aesthetic and minimalist design', body: 'Focused on the logo, nothing extra.' },
              { label: 'Onboarding', title: 'Match with the real world', body: 'Friendly language connects with users; a more prominent Log in would help returning users.' },
              { label: 'How it works', title: 'Recognition over recall', body: 'A clear breakdown of steps, but no Back or Skip for users who want to move on.' },
              { label: 'Registration', title: 'Error prevention', body: 'A country code format reduces errors; input validation could be stronger.' },
              { label: 'Verification', title: 'Recover from errors', body: 'Resend OTP supports recovery and keeps the system status visible.' },
            ],
          },
        ],
        body: [
          'Research showed that children respond best to play-based discovery. I reviewed existing EdTech apps for gaps in creative engagement and in the balance of sound and visuals.',
          'From empathy mapping to heuristic evaluation, I iterated on navigation and the reward system so the app feels like a game rather than a chore.',
        ],
        media: [
          { src: '/media/mini-minds/discovery', alt: 'Empathy map from the parent’s point of view: thinks, feels, says and does', caption: 'Empathy mapping from the parent’s point of view.' },
          { src: '/media/mini-minds/process', alt: 'Heuristic evaluation notes for the splash, onboarding, how it works, registration and verification screens', caption: 'Heuristic evaluation of the core screens.' },
        ],
      },
      {
        id: 'solution',
        title: 'The solution',
        body: ['A mobile app that uses gamification to nurture creativity and critical thinking, with a vibrant visual identity made for the 5 to 10 age group.'],
        media: [{ src: '/media/mini-minds/solution', alt: 'Nine high-fidelity Mini Minds screens from splash to quiz', caption: 'High-fidelity screens.' }],
      },
      {
        id: 'outcome',
        title: 'Outcome',
        stats: [
          { value: '5 to 10', label: 'Age group designed for' },
          { value: '9+', label: 'High-fidelity screens' },
        ],
      },
      {
        id: 'learned',
        title: 'What I learned',
        body: ['Designing for children means different constraints: larger touch targets, vibrant feedback and extremely simple navigation.'],
      },
    ],
  },

  /* Studies ------------------------------------------------------------- */
  {
    slug: 'musify-motion-system',
    title: 'Musify: Motion System',
    summary: 'A brand identity and motion system for a live-music platform, built on a “live stage” metaphor with five signature interactions.',
    outcome: 'Five signature interactions documented as a reusable style guide.',
    type: 'coursework',
    status: 'shipped',
    role: 'Motion and brand designer',
    timeline: 'November 2025',
    client: 'KPU coursework',
    tools: ['Figma', 'GSAP', 'ScrollTrigger', 'Lenis', 'HTML, CSS, JS'],
    tags: ['Motion', 'GSAP', 'Brand'],
    disciplines: ['motion', 'web'],
    featured: false,
    order: 101,
    studyLabel: 'KPU coursework',
    cover: { src: '/assets/case-studies/musify-hero', alt: 'Musify dark interface with neon green accent and concert imagery' },
    ogImage: og('musify-motion-system'),
    confidential: false,
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        body: ['Musify is a music-event platform, but flat screens don’t capture the energy of a live venue. The brief: a brand identity and a motion language that make a dark UI feel alive.'],
      },
      {
        id: 'role',
        title: 'My role and constraints',
        body: ['I owned the identity and the motion system: colour, type, a three-rule “motion recipe”, and five signature interactions coded in GSAP, all documented as a style guide.'],
      },
      {
        id: 'process',
        title: 'Process',
        bullets: [
          'Staggered entry: elements never appear at once; staggers of 0.1 to 0.2s guide the eye.',
          'Heavy physics: motion has mass; back and elastic easings replace linear fades.',
          'Ambient life: orbs and visualizers loop so the UI never feels dead.',
        ],
        media: [
          { src: '/assets/case-studies/musify-principles', alt: 'The Musify motion recipe: three governing principles', caption: 'The motion recipe.' },
          { src: '/assets/case-studies/musify-curtain', alt: 'Curtain-reveal preloader frames', caption: 'Curtain-reveal preloader masks the asset load.' },
        ],
      },
      { id: 'solution', title: 'The solution', body: ['The coded site, running live:'], widget: 'embed-musify' },
      { id: 'demos', title: 'Live interactions', widget: 'demos-musify' },
      {
        id: 'learned',
        title: 'What I learned',
        body: ['A motion system is only as good as its constraints. Writing timing and easing rules down first is what made five interactions feel like one brand.'],
      },
    ],
  },
  {
    slug: 'motion-component-library',
    title: 'Purposeful Motion: Component Library',
    summary: 'A documented library of eight functional micro-interactions: motion for clarity, feedback and delight, not decoration.',
    outcome: 'Eight reusable components, each with documented timing, easing and scenario.',
    type: 'coursework',
    status: 'shipped',
    role: 'Interaction and motion designer',
    timeline: 'October 2025',
    client: 'KPU coursework',
    tools: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    tags: ['Motion', 'Micro-interactions', 'UX'],
    disciplines: ['motion'],
    featured: false,
    order: 102,
    studyLabel: 'KPU coursework',
    cover: { src: '/assets/case-studies/motionlib-overview', alt: 'Purposeful Motion component library overview with floating UI components' },
    ogImage: og('motion-component-library'),
    confidential: false,
    sections: [
      { id: 'problem', title: 'The problem', body: ['Motion is usually treated as the last polish pass. This library argues it is a functional tool that adds clarity and feedback and reduces uncertainty.'] },
      { id: 'role', title: 'My role and constraints', body: ['I designed, built and documented eight components, each mapped to a design principle and a real UX concern.'] },
      {
        id: 'process',
        title: 'Process',
        body: ['Each component is specified like a design token: loader (1s linear loop), success (circle, check, confetti), error shake (0.5s), toggle (0.3s), floating input (0.3s), expandable card (0.4s), modal (0.5s) and drag and drop.'],
        media: [
          { src: '/assets/case-studies/motionlib-components', alt: 'Eight motion components with timing, easing and scenario', caption: 'Eight components with timing, easing and scenario.' },
          { src: '/assets/case-studies/motionlib-storyboard', alt: 'Storyboard of a form validation error and floating input', caption: 'Storyboard: validation error and floating input.' },
        ],
      },
      { id: 'demos', title: 'Live interactions', widget: 'demos-library' },
      { id: 'learned', title: 'What I learned', body: ['Documenting the “why” beside the “how” turns a pile of effects into a system a team can reuse.'] },
    ],
  },
  {
    slug: 'healthy-city-dashboard',
    title: 'Healthy City Dashboard: Mode Share',
    summary: 'An accessibility-driven redesign of a City of Vancouver open-data indicator, from static tables to an interactive dashboard.',
    outcome: 'Interactive Chart.js dashboard with a WCAG contrast and navigation pass.',
    type: 'coursework',
    status: 'shipped',
    role: 'UX and visual designer (design lead)',
    timeline: '12 weeks, 2025',
    client: 'KPU coursework',
    team: 'Two-person team, design lead',
    tools: ['Figma', 'Chart.js', 'HTML, CSS, JS', 'JSON'],
    tags: ['Accessibility', 'Data viz', 'WCAG'],
    disciplines: ['product', 'web'],
    featured: false,
    order: 103,
    studyLabel: 'KPU coursework',
    cover: { src: '/assets/case-studies/healthycity-overview', alt: 'Healthy City project overview from content audit to lo-fi and hi-fi dashboard designs' },
    ogImage: og('healthy-city-dashboard'),
    confidential: false,
    sections: [
      { id: 'problem', title: 'The problem', body: ['The Mode Share indicator, how residents bike, walk and take transit, shipped as static tables with weak hierarchy, limited filtering and inconsistent accessibility. Built on City of Vancouver open data.'] },
      { id: 'role', title: 'My role and constraints', body: ['As design lead I ran the redesign from content audit to coded dashboard, owning the visual system and the accessibility pass while staying aligned with the existing city look.'] },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'steps',
            title: '12 weeks, five phases',
            steps: [
              { title: 'Content audit', body: 'Static tables, weak hierarchy, thin filtering, contrast gaps.' },
              { title: 'Lo-fi wireframes', body: 'Structure first, before any styling.' },
              { title: 'Hi-fi prototype', body: 'Consistent type and colour system in Figma.' },
              { title: 'Build', body: 'JSON data wired to Chart.js with tooltips and filters.' },
              { title: 'QA', body: 'Accessibility checks before integration, then multiple test rounds.' },
            ],
          },
        ],
        body: ['A 12-week plan with a roadmap, work breakdown and risk log: content audit, lo-fi wireframes, hi-fi Figma prototype, then a build wiring JSON data to Chart.js. Accessibility checks ran before integration, not after it.'],
        media: [
          { src: '/assets/case-studies/healthycity-roadmap', alt: '12-week roadmap and schedule', caption: '12-week roadmap.' },
          { src: '/assets/case-studies/healthycity-wbs', alt: 'Work breakdown structure across five phases', caption: 'Work breakdown structure.' },
        ],
      },
      { id: 'demos', title: 'Live interaction', widget: 'demos-dashboard' },
      { id: 'learned', title: 'What I learned', body: ['Treating accessibility as a build-time gate kept it from becoming an afterthought, and made the visual system stronger: contrast and hierarchy are the same problem.'] },
    ],
  },
  {
    slug: 'acminder',
    title: 'Acminder: Schedule Management',
    summary: 'Proactive schedule management for international students, a research-led capstone from goals and personas to a hi-fi mobile system.',
    outcome: 'Hi-fi mobile system and a full technical requirements document.',
    type: 'coursework',
    status: 'shipped',
    role: 'UX researcher and UI designer',
    timeline: '2025',
    client: 'KPU capstone',
    tools: ['Figma', 'Miro', 'Google Forms', 'React'],
    tags: ['UX research', 'Personas', 'Mobile'],
    disciplines: ['product'],
    featured: false,
    order: 104,
    studyLabel: 'KPU capstone',
    cover: { src: '/assets/case-studies/acminder-hero', alt: 'Acminder mobile app with a unified schedule dashboard' },
    ogImage: og('acminder'),
    confidential: false,
    sections: [
      { id: 'problem', title: 'The problem', body: ['International students juggle 20+ hours of work a week against a full course load, LMS deadlines and visa work-hour limits. Existing calendar and LMS tools each track one world and never warn before a conflict.'] },
      { id: 'role', title: 'My role and constraints', body: ['I led the UX process: research goals, competitive analysis, personas, flows, wireframes, usability metrics and a hi-fi prototype, documented in a technical requirements document.'] },
      {
        id: 'process',
        title: 'Process',
        blocks: [
          {
            kind: 'cards',
            title: 'Comparative analysis',
            items: [
              { label: 'Calendar apps', title: 'Manual entry, visual-only conflicts', body: 'Google and Apple Calendar never warn before a clash.' },
              { label: 'LMS', title: 'Academic only, email alerts', body: 'Moodle tracks coursework and nothing else.' },
              { label: 'Acminder', title: 'One schedule that warns early', body: 'Automated sync, proactive alerts, high-priority voice nudges and visa work-hour tracking.' },
            ],
          },
        ],
        body: ['Comparative analysis showed the gap: manual entry, visual-only conflict detection and no work-hour context. I mapped onboarding, task add, edit and delete, calendar and settings flows, with annotated wireframes for each screen.'],
        media: [
          { src: '/assets/case-studies/acminder-persona', alt: 'International student persona', caption: 'The persona.' },
          { src: '/assets/case-studies/acminder-compare', alt: 'Comparison against calendar and LMS tools', caption: 'Comparative analysis.' },
          { src: '/assets/case-studies/acminder-signup', alt: 'Hi-fi sign-up screen with annotations', caption: 'Annotated sign-up screen.', contain: true },
          { src: '/assets/case-studies/acminder-flow', alt: 'Task management flow for add, edit and delete', caption: 'Task management flow.', contain: true },
        ],
      },
      { id: 'solution', title: 'The solution', body: ['A unified dashboard that merges academic, work and personal schedules, detects conflicts and nudges before problems happen.'] },
      { id: 'learned', title: 'What I learned', body: ['Because the persona’s constraints were hard requirements, every screen decision had a reason. Research is the argument every pixel has to answer to.'] },
    ],
  },
  {
    slug: 'youtube-trending-dashboard',
    title: 'YouTube Trending Dashboard',
    summary: 'An interactive three-page analytics dashboard over 40,000+ rows of trending video data across 10 countries.',
    outcome: 'Interactive 3-page dashboard over 40,000+ rows across 10 countries.',
    type: 'coursework',
    status: 'shipped',
    role: 'Designer and developer',
    timeline: '2026',
    client: 'KPU coursework',
    tools: ['Figma', 'D3.js', 'Chart.js'],
    tags: ['Data viz', 'D3.js', 'Dashboard'],
    disciplines: ['web'],
    featured: false,
    order: 105,
    studyLabel: 'KPU coursework',
    cover: { src: '/media/studies/youtube-dashboard', alt: 'Trending video analytics dashboard with charts comparing countries' },
    ogImage: og('youtube-trending-dashboard'),
    confidential: false,
    sections: [
      { id: 'problem', title: 'The problem', body: ['Trending video data across 10 countries runs to 40,000+ rows. The goal was to make patterns in it readable through an interactive dashboard.'] },
      { id: 'solution', title: 'The solution', body: ['A three-page interactive dashboard designed in Figma and built with D3.js and Chart.js.'], media: [{ src: '/media/studies/youtube-dashboard', alt: 'Trending video analytics dashboard with charts comparing countries' }] },
    ],
  },
]

export const workProjects = projects.filter((p) => p.type !== 'coursework' && p.type !== 'personal').sort((a, b) => a.order - b.order)
export const studies = projects.filter((p) => p.type === 'coursework').sort((a, b) => a.order - b.order)
export const personalProjects = projects.filter((p) => p.type === 'personal').sort((a, b) => a.order - b.order)
export const featuredProjects = workProjects.filter((p) => p.featured)

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

/** Next project in reading order (work, studies, then personal projects), wrapping around. */
export function getNextProject(slug: string) {
  const ordered = [...workProjects, ...studies, ...personalProjects]
  const i = ordered.findIndex((p) => p.slug === slug)
  return ordered[(i + 1) % ordered.length]
}
