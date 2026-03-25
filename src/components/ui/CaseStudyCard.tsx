import type { Project } from '../../data/projects'
import { ProjectCard } from './ProjectCard'

export type CaseStudyCardProps = {
  project: Project
  className?: string
}

export function CaseStudyCard({ project, className }: CaseStudyCardProps) {
  return <ProjectCard project={project} className={className} />
}

