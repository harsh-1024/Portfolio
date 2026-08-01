// src/components/skills/SkillCard.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className={cn(
        'card-hover p-5 relative overflow-hidden group',
        'bg-gradient-to-br from-[var(--surface)] to-[var(--surface-hover)]'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[var(--accent-500)]/20 to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <motion.div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0',
            'bg-gradient-to-br from-[var(--accent-500)]/20 to-[var(--accent-600)]/20'
          )}
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ duration: 0.2 }}
        >
          <span>{skill.icon}</span>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-semibold text-[var(--text-primary)] truncate">{skill.name}</h4>
            <span className="text-sm font-mono font-medium text-[var(--accent-500)]">
              {skill.level}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-600)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, delay: 0.3 + index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {skill.description && (
            <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2">{skill.description}</p>
          )}
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute bottom-4 right-4">
        <span className="tag tag-accent text-xs">{skill.category}</span>
      </div>
    </motion.div>
  );
}