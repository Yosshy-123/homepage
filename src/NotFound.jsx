import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="notfound-shell min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="notfound-divider mb-8 h-px w-16" />

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="notfound-title text-6xl font-semibold tracking-tight"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="notfound-text mt-4 text-lg"
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
              className="notfound-link inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm"
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
