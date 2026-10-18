import { ArrowRight, Download } from 'lucide-react'
import { homeContent } from '../../data/home'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { pickHeroReel } from '../../lib/media'
import { LoopVideo } from '../ui/LoopVideo'

export function Hero() {
  const hero = homeContent.hero

  return (
    <section aria-labelledby="hero-title" className="pb-[var(--section-gap)] pt-10 md:pt-16">
      <div className="container-page grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-8 lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 border border-border bg-white px-3.5 py-1.5 text-[13px] sm:text-[var(--text-small)]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#1f8a4c] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f8a4c]" />
            </span>
            {hero.availability}
          </p>

          <h1 id="hero-title" className="h1">
            {hero.headline}{' '}
            <span className="text-muted">{hero.headlineAccent}</span>
          </h1>

          <p className="lead text-text">{hero.subhead}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/work" event="see_my_work" variant="filled">
              See my work
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href={site.resumePdf} download event="resume_download" variant="outlined">
              <Download size={18} aria-hidden="true" />
              Download resume
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <LoopVideo src={pickHeroReel()} label="Motion reel: coded ads and reels" eager ratio="4 / 5" className="w-full" />
        </div>
      </div>
    </section>
  )
}
