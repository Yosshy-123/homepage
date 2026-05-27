import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-8 h-px w-16 bg-black/10 transition-colors duration-300 dark:bg-white/10" />

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
            className="mt-4 text-lg text-black/60 transition-colors duration-300 dark:text-zinc-400"
          >
            The page you’re looking for can’t be found.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2 text-sm text-black/80 transition-colors duration-300 hover:bg-black/5 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
