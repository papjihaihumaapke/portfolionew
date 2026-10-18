import { Download, FileText } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Picture } from '../components/ui/Picture'
import { SectionLabel } from '../components/ui/SectionLabel'
import { aboutContent } from '../data/about'
import { resume } from '../data/resume'
import { site } from '../data/site'

export function About() {
  const c = aboutContent

  return (
    <>
      <Seo title="About" description="About Hilal Malik, UI/UX & Product Designer in Vancouver, BC: 4 years designing, a KPU Wilson School of Design diploma, and a full loop from UX to front-end, AI tools and launch creative." path="/about" type="profile" person />
      <section className="pb-[var(--section-gap)] pt-10 md:pt-16">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 lg:col-span-7">
            <SectionLabel>About</SectionLabel>
            <h1 className="h1">
              Hi, I’m Hilal<span className="text-accent">.</span>
            </h1>
            <p className="lead text-text">{c.intro}</p>
            <div className="prose-body">
              {c.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/resume" variant="filled">
                <FileText size={18} aria-hidden="true" />
                View resume
              </Button>
              <Button href={site.resumePdf} download event="resume_download" variant="outlined">
                <Download size={18} aria-hidden="true" />
                Download resume
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Picture
              src="/media/about/headshot"
              alt={c.photoAlt}
              priority
              ratio="4 / 5"
              sizes="(min-width: 1024px) 40vw, 100vw"
              imgClassName="aspect-[4/5] w-full object-cover"
              note="Headshot"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="on-dark section bg-dark text-white">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <SectionLabel dark>Experience</SectionLabel>
            <h2 id="timeline-title" className="h2">
              Where I’ve worked.
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {c.timeline.map((t) => (
              <li key={t.role} className="grid gap-1 border-t border-border-dark py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                <div>
                  <h3 className="text-[20px] font-semibold leading-snug">{t.role}</h3>
                  <p className="text-muted-dark">{t.org}</p>
                </div>
                <p className="text-[var(--text-small)] text-muted-dark sm:text-right">{t.dates}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="toolkit-title" className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <SectionLabel>Toolkit</SectionLabel>
            <h2 id="toolkit-title" className="h2">
              What I work with.
            </h2>
          </div>
          <dl className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
            {resume.skills.map((s) => (
              <div key={s.group} className="space-y-2 bg-bg p-6 sm:p-8">
                <dt className="h3">{s.group}</dt>
                <dd className="text-muted">{s.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="edu-title" className="section bg-surface">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <SectionLabel>Education</SectionLabel>
            <h2 id="edu-title" className="h2">
              Education.
            </h2>
          </div>
          <div className="space-y-2 lg:col-span-8">
            {resume.education.map((e) => (
              <div key={e.school}>
                <h3 className="h3">{e.school}</h3>
                <p className="text-muted">
                  {e.program}, {e.dates}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
