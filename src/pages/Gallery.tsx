import { Play } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Lightbox } from '../components/ui/Lightbox'
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
              <Tile item={item} onOpen={() => setOpenIndex(i)} />
            </li>
          ))}
        </ul>
      </section>

      <Lightbox items={items.map((i) => ({ ...i, meta: i.group }))} index={openIndex} onChange={setOpenIndex} />
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
