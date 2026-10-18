import manifest from '../../data/media-manifest.json'
import { cn } from '../../lib/utils'

type ImageEntry = { width: number; height: number; widths: number[]; original: string }
const images = manifest.images as Record<string, ImageEntry>

export function hasImage(src: string) {
  return src in images
}

/** URL of the largest WebP variant, for places that need a plain URL (OG, posters). */
export function imageUrl(src: string) {
  const img = images[src]
  return img ? `/_img${src}-${img.widths[img.widths.length - 1]}.webp` : undefined
}

export type PictureProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  /** Aspect ratio used for the placeholder frame when the file is missing. */
  ratio?: string
  note?: string
}

export function Picture({ src, alt, className, imgClassName, sizes = '100vw', priority = false, ratio = '16 / 10', note }: PictureProps) {
  const img = images[src]

  if (!img) {
    return (
      <div
        role="img"
        aria-label={`Placeholder: ${alt}`}
        className={cn('placeholder-frame', className)}
        style={{ aspectRatio: ratio }}
      >
        <span className="placeholder-frame__label">Media placeholder</span>
        <span className="placeholder-frame__text">{note ?? alt}</span>
        <code className="placeholder-frame__path">public{src}.png</code>
      </div>
    )
  }

  const srcSet = (fmt: string) => img.widths.map((w) => `/_img${src}-${w}.${fmt} ${w}w`).join(', ')
  const fallback = `/_img${src}-${img.widths[Math.min(1, img.widths.length - 1)]}.webp`

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={imgClassName}
      />
    </picture>
  )
}
