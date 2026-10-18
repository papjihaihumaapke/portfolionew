import { Maximize2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { videos } from '../../lib/media'
import { LoopVideo } from '../ui/LoopVideo'

const titleFromKey = (key: string) =>
  key
    .split('/')
    .pop()!
    .replace(/[-_]+/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())

/**
 * Muted looping previews (loaded only when in view). "Open" plays the reel in a modal
 * <dialog> with sound and native controls; Escape or the close button dismisses it.
 */
export function ReelGrid() {
  const reels = Object.keys(videos)
    .filter((k) => k.startsWith('/media/motion/') && !/compilation|hero/.test(k))
    .sort()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<string | null>(null)

  if (reels.length === 0) return null

  const show = (key: string) => {
    setOpen(key)
    dialogRef.current?.showModal()
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reels.map((key) => (
          <li key={key} className="space-y-2">
            <LoopVideo src={key} label={titleFromKey(key)} ratio="9 / 16" />
            <button type="button" onClick={() => show(key)} className="link-underline inline-flex items-center gap-2 text-[var(--text-small)] font-medium">
              <Maximize2 size={14} aria-hidden="true" />
              Open {titleFromKey(key)} with sound
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        aria-label={open ? titleFromKey(open) : 'Reel player'}
        className="w-[min(92vw,960px)] bg-dark p-0 text-white backdrop:bg-black/80"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-medium">{open && titleFromKey(open)}</p>
          <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close player">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {open && (
          <video key={open} controls autoPlay playsInline className="max-h-[80vh] w-full bg-black">
            {videos[open].sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}
      </dialog>
    </>
  )
}
