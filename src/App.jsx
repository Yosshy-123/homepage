import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

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
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#ffb6f9,#a0e9ff,#caa8ff)] bg-[length:300%_300%] text-slate-900 animate-gradientMove">
      <section className="flex min-h-screen items-center justify-center px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 0.9, 0.35, 1] }}
          className="w-full max-w-[560px] rounded-[24px] border border-white/45 bg-white/25 p-7 text-center shadow-[0_20px_40px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-12"
        >
          <div
            className={`mx-auto mb-5 grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white/45 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(.22,.9,.35,1)] ${
              logoReady ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <img
              src="/images/logo.png"
              alt="Yosshy logo"
              className="h-4/5 w-4/5 object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-[2.2rem]">
            Yosshy
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-900/80 sm:text-base">
            A passionate JavaScript developer
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-900/90 sm:text-[0.95rem]">
            I enjoy coding and developing side projects.
            <br />
            Outside programming, I study UI design and explore new frameworks.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/85 px-6 py-2.5 font-semibold text-sky-600 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/95 hover:text-pink-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
              href="mailto:Yosshy_123@proton.me"
              aria-label="Send email to Yosshy"
            >
              Contact
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/85 px-6 py-2.5 font-semibold text-sky-600 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/95 hover:text-pink-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
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

      <section className="mx-auto max-w-[1100px] px-5 pb-12 text-center sm:pb-20">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:mb-12 sm:text-[1.8rem]">
          Portfolio
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </div>
      </section>

      <footer className="px-5 pb-10 pt-2 text-center text-sm text-slate-900/70">
        <small>© 2025–2026 Yosshy. All rights reserved.</small>
      </footer>
    </main>
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
