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
      className="group block rounded-[28px] border border-black/5 bg-white/70 p-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-black/10 hover:bg-white/90 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(0,0,0,0.28)] dark:hover:border-white/15 dark:hover:bg-white/8 dark:hover:shadow-[0_18px_40px_rgba(0,0,0,0.36)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[#111827] dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#4b5563] dark:text-[#cbd5e1]">
            {description}
          </p>
        </div>

        <div className="mt-1 rounded-full border border-black/5 bg-black/5 px-3 py-1 text-xs font-medium text-[#374151] dark:border-white/10 dark:bg-white/10 dark:text-white/70">
          Project
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0a84ff] transition-transform duration-300 group-hover:translate-x-0.5 dark:text-[#7ab7ff]">
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#f5f5f7] text-[#111827] transition-colors duration-300 dark:bg-[#0b0b0f] dark:text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.25)_45%,_rgba(255,255,255,0)_72%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_rgba(255,255,255,0.03)_45%,_rgba(255,255,255,0)_72%)]" />
          <div className="absolute bottom-0 right-[-80px] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(10,132,255,0.18)_0%,_rgba(10,132,255,0.08)_36%,_rgba(10,132,255,0)_72%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(10,132,255,0.14)_0%,_rgba(10,132,255,0.06)_36%,_rgba(10,132,255,0)_72%)]" />
        </div>

        <section className="relative flex min-h-screen items-center justify-center px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[640px] rounded-[36px] border border-black/5 bg-white/75 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-12 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
          >
            <div
              className={`mx-auto mb-6 grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-black/5 bg-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_8px_24px_rgba(0,0,0,0.28)] ${
                logoReady ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <img
                src="/images/logo.png"
                alt="Yosshy logo"
                className="h-4/5 w-4/5 object-contain"
              />
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#6b7280] dark:text-[#94a3b8]">
              JavaScript Developer
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#111827] sm:text-6xl dark:text-white">
              Yosshy
            </h1>

            <p className="mx-auto mt-4 max-w-[34rem] text-base leading-7 text-[#4b5563] sm:text-[1.05rem] dark:text-[#cbd5e1]">
              A passionate JavaScript developer building side projects and
              exploring UI design, product quality, and modern frameworks.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                className="inline-flex items-center justify-center rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-[#111827] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/10 hover:bg-[#fafafa] hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.26)] dark:hover:border-white/15 dark:hover:bg-white/15"
                href="mailto:Yosshy_123@proton.me"
                aria-label="Send email to Yosshy"
              >
                Contact
              </a>

              <a
                className="inline-flex items-center justify-center rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-[#111827] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/10 hover:bg-[#fafafa] hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.26)] dark:hover:border-white/15 dark:hover:bg-white/15"
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
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#6b7280] dark:text-[#94a3b8]">
              Selected work
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#111827] sm:text-4xl dark:text-white">
              Portfolio
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} index={index} {...project} />
            ))}
          </div>
        </section>

        <footer className="relative px-5 pb-10 pt-2 text-center text-sm text-[#6b7280] dark:text-[#94a3b8]">
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
