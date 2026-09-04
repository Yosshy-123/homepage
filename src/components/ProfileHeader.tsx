import { motion } from 'framer-motion'
import { PrimaryLink } from './PrimaryLink'
import type { ExternalLinkItem } from '../types/externalLink'

type ProfileHeaderProps = {
  name: string
  role: string
  bio: readonly string[]
  githubUrl: string
  externalLinks: readonly ExternalLinkItem[]
}

export function ProfileHeader({ name, role, bio, githubUrl, externalLinks }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 0.9, 0.35, 1] }}
      className="w-full max-w-[560px] rounded-[24px] border border-white/45 bg-white/25 p-7 text-center shadow-[0_20px_40px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.9, 0.35, 1] }}
        className="mx-auto mb-5 grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white/45 shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
      >
        <img src="/logo.png" alt={`${name} logo`} className="h-4/5 w-4/5 object-contain" />
      </motion.div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-[2.2rem]">{name}</h1>
      <p className="mt-2 text-sm font-medium text-slate-900/80 sm:text-base">{role}</p>
      <p className="mt-4 text-sm leading-7 text-slate-900/90 sm:text-[0.95rem]">
        {bio.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <PrimaryLink href={githubUrl} target="_blank" aria-label={`Visit ${name}'s GitHub in a new tab`}>
          GitHub
        </PrimaryLink>
        {externalLinks.map((link) => (
          <PrimaryLink
            key={link.url}
            href={link.url}
            target="_blank"
            aria-label={`Visit ${name}'s ${link.label} in a new tab`}
          >
            {link.label}
          </PrimaryLink>
        ))}
      </div>
    </motion.div>
  )
}
