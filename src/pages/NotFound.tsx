import { Button } from '../components/ui/Button'
import { Seo } from '../components/Seo'
import { SectionLabel } from '../components/ui/SectionLabel'

export function NotFound() {
  return (
    <section className="section">
      <Seo title="Page not found" description="This page does not exist. See the work or go back home." path="/404" noindex />
      <div className="container-page space-y-8">
        <SectionLabel>Error 404</SectionLabel>
        <h1 className="h1 max-w-[14ch]">
          This page took a wrong turn<span className="text-accent">.</span>
        </h1>
        <p className="lead text-muted">The link may be old, or the project may have moved. Everything worth seeing is one click away.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/work" variant="filled">
            See my work
          </Button>
          <Button href="/" variant="outlined">
            Go home
          </Button>
        </div>
      </div>
    </section>
  )
}
