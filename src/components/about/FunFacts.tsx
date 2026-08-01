// src/components/about/FunFacts.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { profile } from '@/data/profile';

export function FunFacts() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {profile.funFacts.map((fact, index) => (
        <motion.div
          key={fact.label}
          className={cn(
            'p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-light)] text-center',
            'hover:border-[var(--accent-500)] hover:shadow-card-hover transition-all duration-300'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ y: -4 }}
        >
          <span className="text-3xl mb-2 block">{fact.icon}</span>
          <p className="font-medium text-[var(--text-primary)]">{fact.label}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">{fact.value}</p>
        </motion.div>
      ))}
    </div>
  );
}