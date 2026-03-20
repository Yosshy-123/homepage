import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function generateDarkColor(excludeColor = null) {
  let h, s, l
  do {
    h = Math.random() * 360
    s = 20 + Math.random() * 30
    l = 20 + Math.random() * 20
  } while (excludeColor && Math.abs(h - excludeColor.h) < 50)
  return { h, s, l }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function useCanvasBackground(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let angle = 0
    let rafId = 0
    let colors = Array.from({ length: 4 }, () => generateDarkColor())
    let targetColors = colors.map((c) => ({ ...c }))

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const updateColors = () => {
      for (let i = 0; i < 4; i++) {
        colors[i].h = lerp(colors[i].h, targetColors[i].h, 0.03)
        colors[i].s = lerp(colors[i].s, targetColors[i].s, 0.03)
        colors[i].l = lerp(colors[i].l, targetColors[i].l, 0.03)

        if (Math.abs(colors[i].h - targetColors[i].h) < 1) {
          targetColors[i] = generateDarkColor(colors[i])
        }
      }
    }

    const draw = () => {
      angle += 0.003
      const x0 = width / 2 + Math.cos(angle) * width
      const y0 = height / 2 + Math.sin(angle) * height
      const x1 = width / 2 - Math.cos(angle) * width
      const y1 = height / 2 - Math.sin(angle) * height
      const grad = ctx.createLinearGradient(x0, y0, x1, y1)

      for (let i = 0; i < 4; i++) {
        const c = colors[i]
        grad.addColorStop(i / 3, `hsl(${c.h},${c.s}%,${c.l}%)`)
      }

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
    }

    const animate = () => {
      updateColors()
      draw()
      rafId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [canvasRef])
}

export default function NotFound({ from = '' }) {
  const canvasRef = useRef(null)
  useCanvasBackground(canvasRef)

  return (
    <main className="relative min-h-screen overflow-hidden bg-black font-['Roboto',sans-serif] text-white">
      <canvas
        ref={canvasRef}
        id="bg"
        className="fixed inset-0 h-full w-full"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 text-center max-md:flex-col max-md:gap-3"
      >
        <h1 className="m-0 text-[clamp(3rem,8vw,6rem)] font-normal leading-none">
          404
        </h1>

        <div className="h-10 w-px bg-white/60 max-md:h-px max-md:w-12" />

        <div className="text-center">
          <p className="m-0 text-[clamp(1rem,2.2vw,1.5rem)] font-normal opacity-90">
            Page not found
          </p>
          {from ? (
            <p className="mt-2 break-all text-xs text-white/70">Requested: {from}</p>
          ) : null}
        </div>
      </motion.div>
    </main>
  )
}
