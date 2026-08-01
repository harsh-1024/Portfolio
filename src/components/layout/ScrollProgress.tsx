// src/components/layout/ScrollProgress.tsx

'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[var(--z-sticky)] bg-transparent pointer-events-none"
      style={{ transformOrigin: 'left' }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--accent-500)] via-[var(--accent-600)] to-[var(--accent-700)]"
      />
    </motion.div>
  );
}