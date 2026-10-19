import { ArrowUpRight, Monitor, Play, Smartphone, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { sites, type Site } from '../../data/sites'
import { hasImage } from '../../lib/media'
import { cn } from '../../lib/utils'
import { Picture } from '../ui/Picture'

type Device = 'desktop' | 'mobile'

/**
 * Shipped websites. Named sites link out and open a live preview: the real site in an iframe
 * (desktop or phone width), or, for sites that refuse framing, a scrollable full-page capture.
 */
export function SiteGrid({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Site | null>(null)
  const [device, setDevice] = useState<Device>('desktop')
  const Heading = headingLevel

  const show = (site: Site) => {
    setOpen(site)
    setDevice('desktop')
    dialogRef.current?.showModal()
  }

  return (
    <>
      {/* Phones: one swipeable row (native scroll with snap points). Tablet and up: a grid. */}
      <ul
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        aria-label="Websites"
        data-reveal-stagger=""
      >
        {sites.map((s) => (
          <li key={s.slug} className="w-[80vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <article
              id={`site-${s.slug}`}
              className="flex h-full scroll-mt-24 flex-col overflow-hidden border border-border bg-white transition duration-base hover:border-dark hover:shadow-[0_10px_30px_-12px_rgba(26,26,26,0.25)] focus-within:border-dark"
            >
              <div className="relative border-b border-border bg-surface px-4 pb-4 pt-4">
                <div className="mr-5 overflow-hidden border border-border bg-white">
                  <Picture
                    src={s.desktop}
                    alt={`${s.name ?? s.label}, desktop homepage`}
                    ratio="16 / 10"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    imgClassName="aspect-[16/10] w-full object-cover object-top"
                  />
                </div>
                {hasImage(s.mobile) && (
                  <div className="absolute bottom-2 right-3 w-[24%] overflow-hidden rounded-[8px] border-[3px] border-dark bg-dark shadow-lg">
                    <Picture src={s.mobile} alt={`${s.name ?? s.label}, phone view`} ratio="390 / 844" sizes="100px" imgClassName="aspect-[390/844] w-full object-cover object-top" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#4a4a4a]">{s.label}</p>
                <Heading className="font-display text-[21px] leading-tight text-text">{s.name ?? s.label}</Heading>
                {s.url ? (
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-[var(--text-small)] font-medium text-text">
                    <button type="button" onClick={() => show(s)} className="link-underline inline-flex min-h-[32px] items-center gap-1.5">
                      <Play size={14} aria-hidden="true" />
                      Live preview<span className="sr-only"> of {s.name}</span>
                    </button>
                    <a href={s.url} target="_blank" rel="noreferrer" className="link-underline inline-flex min-h-[32px] items-center gap-1">
                      Visit site
                      <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only"> {s.name} (opens in a new tab)</span>
                    </a>
                  </div>
                ) : (
                  <p className="mt-auto pt-3 text-[var(--text-small)] text-[#4a4a4a]">Client site, link not public</p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        aria-label={open ? `${open.name} live preview` : 'Live preview'}
        className="h-[min(90vh,920px)] w-[min(96vw,1360px)] max-w-none bg-dark p-0 text-white backdrop:bg-black/80"
      >
        {open && (
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-dark px-4 py-3">
              <p className="font-medium">{open.name}</p>
              <div className="flex items-center gap-2">
                <div role="group" aria-label="Preview size" className="flex">
                  {(['desktop', 'mobile'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={device === d}
                      onClick={() => setDevice(d)}
                      className={cn('inline-flex h-10 items-center gap-1.5 border px-3 text-[14px]', device === d ? 'border-white bg-white text-text' : 'border-border-dark text-white')}
                    >
                      {d === 'desktop' ? <Monitor size={15} aria-hidden="true" /> : <Smartphone size={15} aria-hidden="true" />}
                      {d === 'desktop' ? 'Desktop' : 'Mobile'}
                    </button>
                  ))}
                </div>
                <a href={open.url} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1.5 bg-accent-ink px-3 text-[14px] font-medium">
                  Open site <ArrowUpRight size={15} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-10 w-10 items-center justify-center" aria-label="Close preview">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 justify-center overflow-hidden bg-[#2a2a2a]">
              <div className={cn('h-full bg-white', device === 'mobile' ? 'my-4 h-[calc(100%-2rem)] w-[390px] max-w-full overflow-hidden rounded-[18px] border-[6px] border-black' : 'w-full')}>
                {open.embeddable ? (
                  <iframe key={open.url + device} src={open.url} title={`${open.name}, live site`} className="h-full w-full border-0" loading="lazy" />
                ) : (
                  <div className="h-full overflow-y-auto" tabIndex={0} aria-label={`${open.name}, scrollable full-page capture`}>
                    <Picture src={device === 'mobile' ? open.mobile : open.full} alt={`${open.name}, full page`} imgClassName="w-full" sizes="1360px" />
                  </div>
                )}
              </div>
            </div>
            {!open.embeddable && (
              <p className="px-4 py-2 text-[13px] text-muted-dark">This site blocks embedding, so this is a scrollable capture. Use Open site for the live version.</p>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
