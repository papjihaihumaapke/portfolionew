import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeContent } from '../../data/home'
import { Picture } from '../ui/Picture'
import { SectionLabel } from '../ui/SectionLabel'

export function AboutSnippet() {
  const c = homeContent.aboutSnippet
  return (
    <section aria-labelledby="about-title" className="section">
      <div className="container-page grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Picture src="/media/about/headshot" alt={c.photoAlt} ratio="4 / 5" sizes="(min-width: 768px) 40vw, 100vw" imgClassName="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="space-y-6 md:col-span-7">
          <SectionLabel>{c.label}</SectionLabel>
          <h2 id="about-title" className="h2" data-reveal="mask">Designer, builder.</h2>
          <div className="prose-body lead text-text">
            {c.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <Link to="/about" className="link-underline inline-flex items-center gap-2 font-medium">
            {c.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
