import manifest from '../data/media-manifest.json'

export type ImageEntry = { width: number; height: number; widths: number[]; original: string }
export type VideoEntry = { sources: { src: string; type: string; bytes: number }[]; poster?: string }

export const images = manifest.images as Record<string, ImageEntry>
export const videos = manifest.videos as Record<string, VideoEntry>

export function hasImage(src: string) {
  return src in images
}

/** URL of a WebP variant no wider than `maxWidth` (or the smallest), for plain-URL uses like posters. */
export function imageUrl(src: string, maxWidth = Infinity) {
  const img = images[src]
  if (!img) return undefined
  const fit = img.widths.filter((w) => w <= maxWidth)
  return `/_img${src}-${fit.length ? fit[fit.length - 1] : img.widths[0]}.webp`
}

