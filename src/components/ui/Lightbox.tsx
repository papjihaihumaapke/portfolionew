import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { videos } from '../../lib/media'
import { Picture } from './Picture'

export interface LightboxItem {
  key: string
  kind: 'image' | 'video'
  title: string
  /** Small line under the title, e.g. the group or brand. */
  meta?: string
}

/**
 * Full-size viewer in a modal <dialog>: Escape closes, arrow keys and buttons step through
 * `items`. Pass `index = null` to close.
 */
export function Lightbox({ items, index, onChange }: { items: LightboxItem[]; index: number | null; onChange: (i: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const item = index === null ? null : items[index]

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
  }, [index])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onChange])

  const step = (d: number) => index !== null && onChange((index + d + items.length) % items.length)

  return (
    <dialog
      ref={ref}
      onClose={() => onChange(null)}
      aria-label={item ? item.title : 'Viewer'}
      className="max-h-[94vh] w-[min(96vw,1200px)] max-w-none bg-dark p-0 text-white backdrop:bg-black/85"
    >
      {item && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{item.title}</p>
              <p className="text-[13px] text-muted-dark">
                {item.meta ? `${item.meta} · ` : ''}
                {index! + 1} of {items.length}
              </p>
            </div>
            <div className="flex shrink-0 items-center">
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Previous">
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Next">
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                </>
              )}
              <button type="button" onClick={() => onChange(null)} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close viewer">
                <X size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex justify-center bg-black">
            {item.kind === 'video' ? (
              <video key={item.key} controls autoPlay playsInline className="max-h-[80vh] w-auto max-w-full">
                {videos[item.key]?.sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
              </video>
            ) : (
              <Picture key={item.key} src={item.key} alt={item.title} sizes="1200px" imgClassName="max-h-[80vh] w-auto max-w-full object-contain" />
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
