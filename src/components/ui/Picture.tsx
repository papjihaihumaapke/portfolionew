import { images } from '../../lib/media'
import { cn } from '../../lib/utils'

export type PictureProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  /** Aspect ratio kept when the file is missing. */
  ratio?: string
}

export function Picture({ src, alt, className, imgClassName, sizes = '100vw', priority = false, ratio = '16 / 10' }: PictureProps) {
  const img = images[src]

  // Missing file: keep the layout's space with a quiet surface, no visible text.
  if (!img) {
    return <div role="img" aria-label={alt} className={cn('bg-surface', className)} style={{ aspectRatio: ratio }} />
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
        // React 18 only passes the lowercase attribute through.
        {...(priority ? { fetchpriority: 'high' } : {})}
        className={imgClassName}
      />
    </picture>
  )
}
