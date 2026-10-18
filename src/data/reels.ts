/**
 * Motion samples shown on the Motion Reel case study. Keys are extensionless paths under
 * /public (web encodes in public/media/motion; sources stay in media-src/, outside the build).
 * Only entries whose video exists are rendered.
 */
export interface Reel {
  key: string
  title: string
  note: string
  ratio: '9 / 16' | '16 / 9'
}

export const reels: Reel[] = [
  {
    key: '/media/motion/the-whole-loop',
    title: 'The whole loop',
    note: 'A 66-second brand film on how I take a project from design to code to marketing. Every frame is code, built with Claude and Remotion.',
    ratio: '16 / 9',
  },
  {
    key: '/media/motion/showreel',
    title: 'Showreel',
    note: 'A 50-second vertical reel of my work: LotStudio AI, the car rental audit, Meta ads, AI voice agents and live sites. Designed and coded with AI.',
    ratio: '9 / 16',
  },
]
