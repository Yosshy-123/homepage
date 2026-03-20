import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
            className="flex items-center gap-2 rounded-full px-5 py-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </motion.div>

        {/* bottom spacing element */}
      </div>
    </main>
  )
}
