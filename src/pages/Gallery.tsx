import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { LoopVideo } from '../components/ui/LoopVideo'
import { Picture } from '../components/ui/Picture'
import { SectionLabel } from '../components/ui/SectionLabel'
import { gallery, galleryGroups, type GalleryGroup, type GalleryItem } from '../data/gallery'
import { hasImage, imageUrl, videos } from '../lib/media'
import { useScrollMotion } from '../lib/use-scroll-motion'
import { cn } from '../lib/utils'

const slug = (g: string) => g.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')

export function Gallery() {
  const [params, setParams] = useSearchParams()
  const active = galleryGroups.find((g) => slug(g) === params.get('group')) ?? null
  const items = gallery.filter((i) => (i.kind === 'video' ? videos[i.key] : hasImage(i.key))).filter((i) => !active || i.group === active)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex === null ? null : items[openIndex]
  // The first tile is the largest paint; fetch its poster or image early.
  const first = items[0]
  const firstPoster = first && (first.kind === 'video' ? videos[first.key].poster : first.key)

  useScrollMotion([active])

  const setGroup = (g: GalleryGroup | null) => {
    const next = new URLSearchParams(params)
    if (g) next.set('group', slug(g))
    else next.delete('group')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const show = (i: number) => {
    setOpenIndex(i)
    dialogRef.current?.showModal()
  }
  const step = (d: number) => setOpenIndex((i) => (i === null ? i : (i + d + items.length) % items.length))

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const count = (g: GalleryGroup) => gallery.filter((i) => i.group === g && (i.kind === 'video' ? videos[i.key] : hasImage(i.key))).length

  return (
    <>
      <Seo
        title="Gallery"
        description="Motion design, AI video, brand identities, social ads and AI product imagery by Hilal Malik, UI/UX & Product Designer in Vancouver, BC."
        path="/gallery"
      />
      {firstPoster && (
        <Helmet>
          <link rel="preload" as="image" href={imageUrl(firstPoster, 960)} fetchPriority="high" />
        </Helmet>
      )}
      <section className="pb-12 pt-10 md:pt-16">
        <div className="container-page space-y-8">
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="h1">Gallery.</h1>
          <p className="lead text-muted">Motion, AI video, brand identities and campaign creative. Select any piece to see it full size; videos play with sound.</p>
          <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
            {[null, ...galleryGroups].map((g) => (
              <button
                key={g ?? 'all'}
                type="button"
                aria-pressed={active === g}
                onClick={() => setGroup(g)}
                className={cn(
                  'min-h-[44px] border px-4 text-[15px] font-medium transition-colors duration-base',
                  active === g ? 'border-dark bg-dark text-white' : 'border-border bg-white text-text hover:border-dark',
                )}
              >
                {g ?? 'All'}
                {g && <span className={cn('ml-1.5 text-[13px]', active === g ? 'text-muted-dark' : 'text-muted')}>{count(g)}</span>}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {items.length} pieces
          </p>
        </div>
      </section>

      <section aria-label="Gallery pieces" className="pb-[var(--section-gap)]">
        <ul className="container-page columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <li key={item.key} className="mb-5 break-inside-avoid">
              <Tile item={item} onOpen={() => show(i)} />
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        aria-label={open ? open.title : 'Gallery viewer'}
        className="max-h-[94vh] w-[min(96vw,1200px)] max-w-none bg-dark p-0 text-white backdrop:bg-black/85"
      >
        {open && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{open.title}</p>
                <p className="text-[13px] text-muted-dark">
                  {open.group} · {openIndex! + 1} of {items.length}
                </p>
              </div>
              <div className="flex shrink-0 items-center">
                <button type="button" onClick={() => step(-1)} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Previous piece">
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Next piece">
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close viewer">
                  <X size={22} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex justify-center bg-black">
              {open.kind === 'video' ? (
                <video key={open.key} controls autoPlay playsInline className="max-h-[80vh] w-auto max-w-full">
                  {videos[open.key].sources.map((s) => (
                    <source key={s.src} src={s.src} type={s.type} />
                  ))}
                </video>
              ) : (
                <Picture key={open.key} src={open.key} alt={open.title} sizes="1200px" imgClassName="max-h-[80vh] w-auto max-w-full object-contain" />
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}

function Tile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <figure className="group space-y-2">
      <div className="relative overflow-hidden bg-surface">
        {item.kind === 'video' ? (
          <LoopVideo src={item.key} label={item.title} ratio={item.ratio ?? '9 / 16'} />
        ) : (
          <Picture src={item.key} alt={item.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" imgClassName="w-full transition-transform duration-slow ease-out group-hover:scale-[1.02]" />
        )}
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 z-[1] focus-visible:outline-offset-[-3px]"
          aria-label={item.kind === 'video' ? `Play ${item.title} with sound` : `View ${item.title} full size`}
        />
        {item.kind === 'video' && (
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 bg-dark/80 px-2 py-1 text-[12px] text-white">
            <Play size={12} /> Video
          </span>
        )}
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 text-[var(--text-small)]">
        <span>{item.title}</span>
        <span className="shrink-0 text-[13px] text-muted">{item.group}</span>
      </figcaption>
    </figure>
  )
}
