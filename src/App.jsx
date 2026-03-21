import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

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
      className="project-card group"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="project-card-title">{title}</h3>
          <p className="project-card-description">{description}</p>
        </div>

        <div className="project-badge">Project</div>
      </div>

      <div className="project-link">
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

      <main className="app-shell">
        <div className="app-background" aria-hidden="true">
          <div className="app-background-glow app-background-glow-top" />
          <div className="app-background-glow app-background-glow-bottom" />
        </div>

        <section className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hero-card"
          >
            <div className={`hero-logo-wrap ${logoReady ? 'is-ready' : ''}`}>
              <img
                src="/images/logo.png"
                alt="Yosshy logo"
                className="hero-logo"
              />
            </div>

            <p className="section-eyebrow">JavaScript Developer</p>

            <h1 className="hero-title">Yosshy</h1>

            <p className="hero-copy">
              A passionate JavaScript developer building side projects and
              exploring UI design, product quality, and modern frameworks.
            </p>

            <div className="hero-actions">
              <a
                className="glass-button"
                href="mailto:Yosshy_123@proton.me"
                aria-label="Send email to Yosshy"
              >
                Contact
              </a>

              <a
                className="glass-button"
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

        <section className="portfolio-section">
          <div className="section-header">
            <p className="section-eyebrow">Selected work</p>
            <h2 className="section-title">Portfolio</h2>
          </div>

          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} index={index} {...project} />
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <small>© 2025–2026 Yosshy. All rights reserved.</small>
        </footer>
      </main>
    </>
  )
}

export default HomePage
