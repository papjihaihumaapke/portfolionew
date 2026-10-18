import { Maximize2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { reels as allReels, type Reel } from '../../data/reels'
import { videos } from '../../lib/media'
import { cn } from '../../lib/utils'
import { LoopVideo } from '../ui/LoopVideo'

/**
 * Muted looping previews (loaded only when in view). "Play with sound" opens the reel in a
 * modal <dialog> with native controls; Escape or the close button dismisses it.
 */
export function ReelGrid() {
  const reels = allReels.filter((r) => videos[r.key])
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Reel | null>(null)

  if (reels.length === 0) return null

  const show = (reel: Reel) => {
    setOpen(reel)
    dialogRef.current?.showModal()
  }

  return (
    <>
      <ul className="grid gap-10 md:grid-cols-3">
        {reels.map((reel) => (
          <li key={reel.key} className={cn('space-y-3', reel.ratio === '16 / 9' ? 'md:col-span-3' : 'md:col-span-1')}>
            <LoopVideo src={reel.key} label={reel.title} ratio={reel.ratio} />
            <h3 className="text-[20px] font-semibold">{reel.title}</h3>
            <p className="text-[var(--text-small)] text-muted">{reel.note}</p>
            <button type="button" onClick={() => show(reel)} className="link-underline inline-flex items-center gap-2 text-[var(--text-small)] font-medium">
              <Maximize2 size={14} aria-hidden="true" />
              Play {reel.title.toLowerCase()} with sound
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        aria-label={open ? open.title : 'Reel player'}
        className={cn('bg-dark p-0 text-white backdrop:bg-black/80', open?.ratio === '9 / 16' ? 'w-[min(92vw,460px)]' : 'w-[min(92vw,1100px)]')}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-medium">{open?.title}</p>
          <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close player">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {open && (
          <video key={open.key} controls autoPlay playsInline className="max-h-[82vh] w-full bg-black">
            {videos[open.key].sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}
      </dialog>
    </>
  )
}
