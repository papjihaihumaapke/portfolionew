import { Download } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { resume } from '../data/resume'
import { site } from '../data/site'
import '../styles/resume-print.css'

/**
 * Single-column resume rendered from src/data/resume.ts. `npm run resume:pdf` prints this
 * route with the print stylesheet, so the page and MHM-Resume.pdf share one source.
 */
export function Resume() {
  return (
    <div className="resume-page section pt-10 md:pt-16">
      <Seo title="Resume" description="Resume of Mohammad Hilal Malik, UI/UX & Product Designer in Vancouver, BC: experience, skills, education and a downloadable PDF." path="/resume" type="profile" person />
      <div className="container-page">
        <div className="no-print mb-12 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">The same content as the PDF, which is ATS-friendly and two pages.</p>
          <Button href={site.resumePdf} download event="resume_download" variant="filled">
            <Download size={18} aria-hidden="true" />
            Download PDF
          </Button>
        </div>

        <article className="resume mx-auto max-w-[820px]">
          <header className="resume-head">
            <h1 className="resume-name">{resume.name}</h1>
            <p className="resume-title">{resume.title}</p>
            <p className="resume-contact">
              {resume.location}
              {resume.contacts.map((c) => (
                <span key={c.href}>
                  {' · '}
                  <a href={c.href}>{c.label}</a>
                </span>
              ))}
            </p>
          </header>

          <section aria-labelledby="r-summary">
            <h2 id="r-summary">Summary</h2>
            <p>{resume.summary}</p>
          </section>

          <section aria-labelledby="r-experience">
            <h2 id="r-experience">Experience</h2>
            {resume.experience.map((job) => (
              <div key={job.org} className="resume-job">
                <h3>
                  {job.org} · {job.location}
                  {'dates' in job && job.dates ? `, ${job.dates}` : ''}
                </h3>
                {job.roles.map((r) => (
                  <p key={r.title} className="resume-role">
                    {r.title}, {r.dates}
                  </p>
                ))}
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="r-skills">
            <h2 id="r-skills">Skills</h2>
            <ul className="resume-plain">
              {resume.skills.map((s) => (
                <li key={s.group}>
                  <strong>{s.group}:</strong> {s.items}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="r-education">
            <h2 id="r-education">Education</h2>
            {resume.education.map((e) => (
              <div key={e.school} className="resume-job">
                <h3>
                  {e.school} · {e.location}
                </h3>
                <p className="resume-role">
                  {e.program}, {e.dates}
                </p>
              </div>
            ))}
          </section>

          <section aria-labelledby="r-certs">
            <h2 id="r-certs">Certifications</h2>
            <p>{resume.certifications.join(' · ')}</p>
          </section>

          <section aria-labelledby="r-languages">
            <h2 id="r-languages">Languages</h2>
            <p>{resume.languages}</p>
          </section>
        </article>
      </div>
    </div>
  )
}
