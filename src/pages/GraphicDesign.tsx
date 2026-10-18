import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Lightbox } from '../components/ui/Lightbox'
import { Picture } from '../components/ui/Picture'
import { SectionLabel } from '../components/ui/SectionLabel'
import { brands, type Brand } from '../data/graphic-design'
import { useScrollMotion } from '../lib/use-scroll-motion'
import { cn } from '../lib/utils'

export function GraphicDesign() {
  const [open, setOpen] = useState<{ brand: Brand; index: number } | null>(null)
  const total = brands.reduce((n, b) => n + b.images.length, 0)

  useScrollMotion()

  return (
    <>
      <Seo
        title="Graphic design"
        description="Brand identities, packaging and social creative by Hilal Malik, grouped by brand: Little Anna, Desert Fox, Dunes & Scents, Wall Canvas, Go Green Mowing and more."
        path="/graphic-design"
      />

      <section className="pb-14 pt-10 md:pt-16">
        <div className="container-page space-y-8">
          <SectionLabel>Graphic design</SectionLabel>
          <h1 className="h1">Graphic design.</h1>
          <p className="lead text-muted">
            Brand identities, packaging and social creative: {total} pieces across {brands.length} brands. Select any piece to see it full size.
          </p>
          <nav aria-label="Brands">
            <ul className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <li key={b.slug}>
                  <a href={`#${b.slug}`} className="inline-flex min-h-[44px] items-center gap-1.5 border border-border bg-white px-4 text-[15px] font-medium transition-colors duration-base hover:border-dark">
                    {b.name}
                    <span className="text-[13px] text-muted">{b.images.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {brands.map((b, bi) => (
        <section key={b.slug} id={b.slug} aria-labelledby={`${b.slug}-title`} className="scroll-mt-20 border-t border-border py-[clamp(56px,7vw,112px)]">
          <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
                <p className="font-display text-[var(--text-small)] text-accent-ink" aria-hidden="true">
                  {String(bi + 1).padStart(2, '0')}
                </p>
                <h2 id={`${b.slug}-title`} className="h2" data-reveal="mask">
                  {b.name}
                </h2>
                <p className="eyebrow text-muted">{b.descriptor}</p>
                <p className="max-w-[40ch]">{b.deliverables}</p>
                <p className="text-[var(--text-small)] text-muted">
                  {b.images.length} {b.images.length === 1 ? 'piece' : 'pieces'}
                </p>
                {b.link && (
                  <Link to={b.link.href} className="link-underline inline-flex items-center gap-2 font-medium">
                    {b.link.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>

            <ul className={cn('grid gap-4 sm:grid-cols-2 lg:col-span-8', b.images.length > 4 && 'lg:grid-cols-3')} data-reveal-stagger="">
              {b.images.map((img, i) => (
                <li key={img.key} className={cn(i === 0 && b.images.length > 1 && 'sm:col-span-2 lg:col-span-2 lg:row-span-2')}>
                  <button
                    type="button"
                    onClick={() => setOpen({ brand: b, index: i })}
                    className="group block w-full overflow-hidden bg-surface text-left"
                    aria-label={`View ${img.title} full size`}
                  >
                    <Picture
                      src={img.key}
                      alt={img.title}
                      ratio="1 / 1"
                      sizes={i === 0 ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 1024px) 22vw, 50vw'}
                      imgClassName="aspect-square w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <Lightbox
        items={(open?.brand.images ?? []).map((img) => ({ ...img, kind: 'image' as const, meta: open?.brand.name }))}
        index={open?.index ?? null}
        onChange={(i) => setOpen((o) => (i === null || !o ? null : { ...o, index: i }))}
      />
    </>
  )
}
