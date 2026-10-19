/**
 * Tools shown in the hero strip, from the resume, the case studies and the owner's own list.
 * `source` is the Simple Icons slug; logos live in public/media/tools/<slug>.png
 * (regenerate with `node scripts/fetch-tool-logos.mjs`).
 */
export interface Tool {
  slug: string
  name: string
  source?: string
  /** Keep only the square mark at the left of a wordmark logo. */
  markOnly?: boolean
}

export const tools: Tool[] = [
  { slug: 'figma', name: 'Figma', source: 'figma' },
  { slug: 'illustrator', name: 'Illustrator' },
  { slug: 'photoshop', name: 'Photoshop' },
  { slug: 'coreldraw', name: 'CorelDRAW', source: 'coreldraw' },
  { slug: 'react', name: 'React', source: 'react' },
  { slug: 'typescript', name: 'TypeScript', source: 'typescript' },
  { slug: 'tailwind', name: 'Tailwind CSS', source: 'tailwindcss' },
  { slug: 'vite', name: 'Vite', source: 'vite' },
  { slug: 'supabase', name: 'Supabase', source: 'supabase' },
  { slug: 'gsap', name: 'GSAP', source: 'greensock' },
  { slug: 'framer-motion', name: 'Framer Motion', source: 'framer' },
  { slug: 'remotion', name: 'Remotion' },
  { slug: 'claude', name: 'Claude', source: 'claude' },
  { slug: 'openai', name: 'ChatGPT', markOnly: true },
  { slug: 'gemini', name: 'Gemini', source: 'googlegemini' },
  { slug: 'cursor', name: 'Cursor', source: 'cursor' },
  { slug: 'lovable', name: 'Lovable' },
  { slug: 'midjourney', name: 'Midjourney' },
  { slug: 'elevenlabs', name: 'ElevenLabs', source: 'elevenlabs' },
  { slug: 'twilio', name: 'Twilio', markOnly: true },
  { slug: 'n8n', name: 'n8n', source: 'n8n' },
  { slug: 'meta', name: 'Meta Ads', source: 'meta' },
  { slug: 'google-analytics', name: 'GA4', source: 'googleanalytics' },
  { slug: 'clarity', name: 'Microsoft Clarity' },
  { slug: 'd3', name: 'D3.js', source: 'd3' },
  { slug: 'chartjs', name: 'Chart.js', source: 'chartdotjs' },
  { slug: 'vercel', name: 'Vercel', source: 'vercel' },
  { slug: 'render', name: 'Render', source: 'render' },
  { slug: 'github', name: 'GitHub', source: 'github' },
]
