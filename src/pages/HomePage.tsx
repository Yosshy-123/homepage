import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { PrimaryLink } from '../components/PrimaryLink'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { profile } from '../data/profile'

export function HomePage() {
  const [logoReady, setLogoReady] = useState(false)

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setLogoReady(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <Helmet>
        <title>{profile.title}</title>
        <meta
          name="description"
          content="Yosshy's portfolio homepage featuring project links and contact details."
        />
      </Helmet>

      <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#ffb6f9,#a0e9ff,#caa8ff)] bg-[length:300%_300%] text-slate-900 animate-gradientMove">
        <section className="flex min-h-screen items-center justify-center px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 0.9, 0.35, 1] }}
            className="w-full max-w-[560px] rounded-[24px] border border-white/45 bg-white/25 p-7 text-center shadow-[0_20px_40px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={logoReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.35, 1] }}
              className="mx-auto mb-5 grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white/45 shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
            >
              <img
                src="/logo.png"
                alt="Yosshy logo"
                className="h-4/5 w-4/5 object-contain"
              />
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-[2.2rem]">
              {profile.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-900/80 sm:text-base">
              {profile.role}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-900/90 sm:text-[0.95rem]">
              {profile.bio.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <PrimaryLink
                href={profile.githubUrl}
                target="_blank"
                aria-label={`Visit ${profile.name}'s GitHub in a new tab`}
              >
                GitHub
              </PrimaryLink>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-[640px] px-5 pb-12 text-center sm:pb-20">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:mb-12 sm:text-[1.8rem]">
            Portfolio
          </h2>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} index={index} {...project} />
            ))}
          </div>
        </section>

        <footer className="px-5 pb-10 pt-2 text-center text-sm text-slate-900/70">
          <small>© Yosshy. All rights reserved.</small>
        </footer>
      </main>
    </>
  )
}
