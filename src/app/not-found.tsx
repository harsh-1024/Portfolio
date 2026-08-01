// src/app/not-found.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-display font-bold text-9xl lg:text-12xl text-[var(--text-muted)]/30">404</span>
        </motion.div>

        <h1 className="font-display font-bold text-3xl lg:text-4xl text-[var(--text-primary)] mb-4">
          Page Not Found
        </h1>

        <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
          Looks like you've wandered into uncharted territory. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back Home
          </Link>
          <Link
            href="#projects"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Explore Projects
          </Link>
        </div>

        <motion.div
          className="mt-12 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-light)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm text-[var(--text-muted)] mb-4">Or try one of these:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['#about', '#skills', '#projects', '#experience', '#contact'].map((href) => (
              <Link
                key={href}
                href={href}
                className="tag tag-accent text-sm"
              >
                {href.slice(1)}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Easter egg */}
        <motion.button
          className="fixed bottom-8 right-8 p-4 rounded-full glass-strong shadow-card"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.location.reload()}
          aria-label="Refresh page"
        >
          <RotateCcw className="h-6 w-6 text-[var(--accent-500)]" />
        </motion.button>
      </motion.div>
    </div>
  );
}