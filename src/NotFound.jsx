import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-black font-['-apple-system','BlinkMacSystemFont','SF Pro Text','Segoe UI','Roboto','Helvetica Neue',sans-serif]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        {/* subtle divider */}
        <div className="mb-8 h-px w-16 bg-black/10" />

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-6xl font-semibold tracking-tight"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-4 text-lg text-black/60"
        >
          The page you’re looking for can’t be found.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10"
        >
          <button
            onClick={() => (window.location.href = '/')}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2 text-sm text-black/80 hover:bg-black/5"
          >
             ← Back to Home
          </button>
        </motion.div>

        {/* bottom spacing element */}
      </div>
    </main>
  )
}
