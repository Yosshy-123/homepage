import { motion } from 'framer-motion'
import { ExternalLink } from './ExternalLink'
import type { Project } from '../types/project'

type ProjectCardProps = Project & {
  index: number
}

export function ProjectCard({ title, description, href, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 260, damping: 22 },
      }}
      className="group rounded-[20px] border border-white/40 bg-white/25 p-5 text-left text-slate-900 shadow-[0_20px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl"
    >
      <ExternalLink
        href={href}
        target="_blank"
        aria-label={`Open ${title} project in a new tab`}
        className="block"
      >
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-800/90">{description}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-600 transition-colors group-hover:text-pink-500">
          Open project
          <span aria-hidden="true">→</span>
        </div>
      </ExternalLink>
    </motion.article>
  )
}
