import { useState } from 'react'
import { tools } from '../../data/tools'
import { Marquee, MarqueeToggle } from '../ui/Marquee'
import { Picture } from '../ui/Picture'

/** Tools I use: brand logos with their names, as a slow marquee along the bottom of the hero. */
export function ToolsStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="border-y border-border bg-white/60">
      <div className="container-page flex items-center justify-between gap-4 pt-4">
        <p className="eyebrow text-muted">Tools I design and build with</p>
        <MarqueeToggle paused={paused} onToggle={() => setPaused((p) => !p)} what="tools marquee" className="h-9 px-2.5 text-[13px]" />
      </div>
      <div className="py-5">
        <Marquee
          items={tools}
          label="Tools I use"
          paused={paused}
          secondsPerItem={2.4}
          gapClassName="gap-10 pr-10"
          renderItem={(t, hidden) => (
            <li key={t.slug} className="flex shrink-0 items-center gap-3">
              <Picture src={`/media/tools/${t.slug}`} alt="" ratio="1 / 1" sizes="64px" className="block h-8 w-auto" imgClassName="h-8 w-auto" />
              <span className="whitespace-nowrap text-[15px] font-medium" aria-hidden={hidden || undefined}>
                {t.name}
              </span>
            </li>
          )}
        />
      </div>
    </div>
  )
}
