import { ProjectCard } from './ProjectCard'
import type { Project } from '../types/project'

type ProjectsSectionProps = {
  projects: readonly Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="mx-auto max-w-[640px] px-5 pb-12 text-center sm:pb-20">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:mb-12 sm:text-[1.8rem]">Portfolio</h2>

      <div className="grid gap-8">
        {projects.map((project, index) => (
          // `href` (a GitHub repo URL) is guaranteed unique, unlike `title`,
          // which could collide across repos owned by different accounts.
          <ProjectCard key={project.href} index={index} {...project} />
        ))}
      </div>
    </section>
  )
}
