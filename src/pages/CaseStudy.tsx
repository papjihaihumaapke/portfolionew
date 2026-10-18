import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects'
import { Picture } from '../components/ui/Picture'

// Interim renderer for the new data layer; replaced by the full case study template in phase 6.
export function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    document.title = project ? `${project.title} | Hilal Malik` : 'Not found | Hilal Malik'
  }, [project])

  if (!project) return <section className="section container-page"><h1>Not found</h1></section>

  return (
    <article className="section container-page space-y-10">
      <h1 className="font-display text-[var(--text-display)]">{project.title}</h1>
      <p>{project.summary}</p>
      <Picture src={project.cover.src} alt={project.cover.alt} priority />
      {project.sections.map((s) => (
        <section key={s.id} className="space-y-3">
          <h2 className="font-display text-[var(--text-heading)]">{s.title}</h2>
          {s.body?.map((b) => <p key={b}>{b}</p>)}
          {s.bullets && <ul className="list-disc pl-6">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
        </section>
      ))}
      <Link to="/work">Back to work</Link>
    </article>
  )
}
