import { Download, Mail } from 'lucide-react'
import { homeContent } from '../../data/home'
import { site } from '../../data/site'
import { Button } from '../ui/Button'

/** Orange band. Orange is a fill here; the headline is large type and buttons carry their own contrast. */
export function CtaStrip() {
  const content = homeContent.ctaStrip

  return (
    <section aria-labelledby="cta-title" className="bg-accent py-20 md:py-28">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="cta-title" className="h2 whitespace-pre-line text-white">
          {content.headline}
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`mailto:${site.email}`} event="contact_click" variant="filled">
            <Mail size={18} aria-hidden="true" />
            Email me
          </Button>
          <Button href={site.resumePdf} download event="resume_download" variant="light">
            <Download size={18} aria-hidden="true" />
            Download resume
          </Button>
        </div>
      </div>
    </section>
  )
}
