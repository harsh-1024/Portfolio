// src/components/skills/SkillCategoryFilter.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { SkillCategory } from '@/types';

interface SkillCategoryFilterProps {
  activeCategory: SkillCategory;
  onCategoryChange: (category: SkillCategory) => void;
}

export function SkillCategoryFilter({ activeCategory, onCategoryChange }: SkillCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Skill categories">
      {SKILL_CATEGORIES.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id as SkillCategory)}
          role="tab"
          aria-selected={activeCategory === category.id}
          aria-controls={`skills-panel-${category.id}`}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2',
            activeCategory === category.id
              ? 'bg-[var(--accent-500)] text-white shadow-glow'
              : 'bg-[var(--surface)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--accent-500)] hover:text-[var(--accent-500)]'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
}