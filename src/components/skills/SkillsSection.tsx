// src/components/skills/SkillsSection.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { SkillCard } from './SkillCard';
import { SkillCategoryFilter } from './SkillCategoryFilter';
import { skills } from '@/data/skills';
import { SkillCategory } from '@/types';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { staggerContainer, staggerFast } from '@/lib/animations';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const categoryCounts = SKILL_CATEGORIES.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? skills.length : skills.filter(s => s.category === cat.id).length,
  }));

  return (
    <section id="skills" className="section" aria-label="Skills & Expertise">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            Technical Skills
          </span>
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle mx-auto">
            A diverse toolkit built over 8+ years across AI, security, and full-stack engineering.
          </p>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal variant="fadeUp" delay={100}>
          <SkillCategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </ScrollReveal>

        {/* Category Stats */}
        <ScrollReveal variant="fadeUp" delay={150} className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryCounts.filter(c => c.count > 0).map((cat) => (
              <motion.span
                key={cat.id}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  activeCategory === cat.id
                    ? 'bg-[var(--accent-500)] text-white'
                    : 'bg-[var(--surface-hover)] text-[var(--text-muted)] border border-[var(--border-light)]'
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                {cat.label} <span className="ml-1 font-mono">{cat.count}</span>
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <ScrollReveal 
          asChild
          stagger
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </ScrollReveal>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <ScrollReveal variant="fadeUp" className="text-center py-12">
            <div className="text-[var(--text-muted)]">
              <p className="text-lg mb-2">No skills in this category yet</p>
              <p className="text-sm">Check back soon or select another category</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}