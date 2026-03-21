import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'

const projects = [
  {
    title: 'KAeRU Log',
    description: 'Lightweight Node.js and WebSocket chat application',
    href: 'https://kaeru-log.yosshy.f5.si/',
  },
]

function ProjectCard({ title, description, href, index }) {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${title} project`}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="group project-card block rounded-[28px] p-6 text-left transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight project-title">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 project-subtext">{description}</p>
        </div>

        <div className="mt-1 rounded-full px-3 py-1 text-xs font-medium project-badge">
          Project
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium project-link transition-transform duration-300 group-hover:translate-x-0.5">
        Open project
        <span aria-hidden="true">→</span>
      </div>
    </motion.a>
  )
}

function HomePage() {
  const [logoReady, setLogoReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLogoReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <Helmet>
        <title>Yosshy | JavaScript Developer</title>
        <meta
          name="theme-color"
          content="#f5f5f7"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0b0b0f"
          media="(prefers-color-scheme: dark)"
        />
      </Helmet>

      <main className="app-shell relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="app-glow app-glow-top absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
          <div className="app-glow app-glow-bottom absolute bottom-0 right-[-80px] h-80 w-80 rounded-full blur-3xl" />
        </div>

        <section className="relative flex min-h-screen items-center justify-center px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hero-card w-full max-w-[640px] rounded-[36px] p-8 text-center sm:p-12"
          >
            <div
              className={`hero-logo-wrap mx-auto mb-6 grid h-24 w-24 place-items-center overflow-hidden rounded-full ${
                logoReady ? 'is-ready' : ''
              }`}
            >
              <img
                src="/images/logo.png"
                alt="Yosshy logo"
                className="h-4/5 w-4/5 object-contain"
              />
            </div>

            <p className="section-eyebrow text-xs font-medium uppercase tracking-[0.28em]">
              JavaScript Developer
            </p>

            <h1 className="hero-title mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Yosshy
            </h1>

            <p className="hero-copy mx-auto mt-4 max-w-[34rem] text-base leading-7 sm:text-[1.05rem]">
              A passionate JavaScript developer building side projects and
              exploring UI design, product quality, and modern frameworks.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                className="glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
                href="mailto:Yosshy_123@proton.me"
                aria-label="Send email to Yosshy"
              >
                Contact
              </a>

              <a
                className="glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
                href="https://github.com/Yosshy-123/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Yosshy's GitHub"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-[1100px] px-5 pb-14 sm:pb-20">
          <div className="mb-8 text-center sm:mb-12">
            <p className="section-eyebrow text-xs font-medium uppercase tracking-[0.28em]">
              Selected work
            </p>
            <h2 className="section-title mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              Portfolio
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} index={index} {...project} />
            ))}
          </div>
        </section>

        <footer className="site-footer relative px-5 pb-10 pt-2 text-center text-sm">
          <small>© 2025–2026 Yosshy. All rights reserved.</small>
        </footer>
      </main>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
