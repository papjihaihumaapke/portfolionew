import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { imageUrl, videos } from '../../lib/media'
import { prefersReducedMotion } from '../../lib/motion'
import { cn } from '../../lib/utils'
import { Picture } from './Picture'

export type LoopVideoProps = {
  src: string
  label: string
  className?: string
  ratio?: string
  /** Load immediately (hero) instead of when scrolled into view. */
  eager?: boolean
}

/**
 * Muted, looping preview with a visible pause button. Sources attach only once the
 * frame is near the viewport. With reduced motion it shows the poster and waits for play.
 */
export function LoopVideo({ src, label, className, ratio = '4 / 5', eager = false }: LoopVideoProps) {
  const entry = videos[src]
  const ref = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(eager)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (inView || !ref.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { rootMargin: '200px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [inView, entry])

  useEffect(() => {
    const v = ref.current
    if (!v || !inView) return
    v.load()
    if (!prefersReducedMotion()) v.play().then(() => setPlaying(true), () => setPlaying(false))
  }, [inView])

  if (!entry) {
    // No video yet: show a still with the same key if one exists.
    return <Picture src={src} alt={label} ratio={ratio} className={className} priority={eager} />
  }

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().then(() => setPlaying(true))
    else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div className={cn('relative overflow-hidden bg-dark', className)} style={{ aspectRatio: ratio }}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={entry.poster ? imageUrl(entry.poster, 960) : undefined}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {inView && entry.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 z-[2] inline-flex h-11 w-11 items-center justify-center bg-white/90 text-text transition-colors duration-base hover:bg-white"
        aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
      >
        {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      </button>
    </div>
  )
}

