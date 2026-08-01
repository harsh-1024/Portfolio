// src/components/github/GitHubSection.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { githubStats } from '@/data/github';
import { Github, Star, GitBranch, Code, GitFork } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

const statCards = [
  { label: 'Repositories', value: githubStats.totalRepos, icon: Github, color: '#5B6EFF' },
  { label: 'Stars Earned', value: githubStats.totalStars, icon: Star, color: '#FFD700' },
  { label: 'Forks Received', value: githubStats.totalForks, icon: GitFork, color: '#6C63FF' },
  { label: 'Total Commits', value: githubStats.totalCommits, icon: GitBranch, color: '#4F8EF7' },
  { label: 'Current Streak', value: githubStats.streak, suffix: ' days', icon: Code, color: '#10B981' },
];

export function GitHubSection() {
  return (
    <section id="github" className="section" aria-label="GitHub Activity">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4 flex items-center justify-center gap-2 mx-auto">
            <Github className="h-4 w-4" />
            GitHub
          </span>
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle mx-auto">
            Open source contributions, personal projects, and community engagement.
          </p>
        </ScrollReveal>

        {/* Stats Cards */}
        <ScrollReveal variant="fadeUp" delay={100} className="mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${stat.color}20` }}>
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <AnimatedCounter
                  end={stat.value}
                  duration={1500}
                  className="font-display font-bold text-3xl text-[var(--text-primary)]"
                  suffix={stat.suffix}
                />
                <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Contribution Graph */}
        <ScrollReveal variant="fadeUp" delay={200} className="mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[var(--text-primary)]">Contribution Graph (2024)</h3>
              <a href="https://github.com/alexchen" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-500)] hover:text-[var(--accent-600)] font-medium flex items-center gap-1">
                View on GitHub
                <Github className="h-4 w-4" />
              </a>
            </div>
            <ContributionGraph contributions={githubStats.contributions} />
          </div>
        </ScrollReveal>

        {/* Top Languages & Repos */}
        <ScrollReveal 
          asChild
          stagger
        >
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Languages */}
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-6">Top Languages</h3>
              <div className="space-y-4">
                {githubStats.topLanguages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)]">{lang.name}</span>
                      <span className="text-sm font-mono text-[var(--text-muted)]">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: lang.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Repositories */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[var(--text-primary)]">Top Repositories</h3>
                <a href="https://github.com/alexchen?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-500)] hover:text-[var(--accent-600)] font-medium">
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {githubStats.topRepos.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    className="group p-4 rounded-xl bg-[var(--surface-hover)] border border-[var(--border-light)] hover:border-[var(--accent-500)]/50 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-500)] transition-colors truncate block">
                          {repo.name}
                        </a>
                        <p className="text-sm text-[var(--text-muted)] mt-1 truncate">{repo.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {repo.stars}
                          </span>
<span className="flex items-center gap-1">
  <GitFork className="h-3 w-3" />
  {repo.forks}
</span>
                          <span className="px-2 py-0.5 rounded text-xs bg-[var(--accent-500)]/10 text-[var(--accent-500)]">
                            {repo.language}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContributionGraph({ contributions }: { contributions: typeof githubStats.contributions }) {
  const weeks = 53;
  const days = 7;
  const cellSize = 12;
  const gap = 2;

  // Group contributions by week
  const weekData: number[][] = Array(weeks).fill(null).map(() => Array(days).fill(0));
  
  contributions.forEach(day => {
    const date = new Date(day.date);
    const week = Math.floor((date.getTime() - new Date('2024-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));
    const dayOfWeek = date.getDay(); // 0 = Sunday
    if (week >= 0 && week < weeks) {
      weekData[week][dayOfWeek] = day.level;
    }
  });

  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'var(--border-light)';
      case 1: return 'rgba(91, 110, 255, 0.3)';
      case 2: return 'rgba(91, 110, 255, 0.5)';
      case 3: return 'rgba(91, 110, 255, 0.7)';
      case 4: return 'var(--accent-500)';
      default: return 'var(--border-light)';
    }
  };

  return (
    <div className="overflow-x-auto">
      <svg
        width={weeks * (cellSize + gap) + 40}
        height={(days + 1) * (cellSize + gap) + 20}
        className="block"
      >
        {/* Day labels */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <text
            key={day}
            x={20}
            y={30 + i * (cellSize + gap) + cellSize / 2 + 4}
            textAnchor="end"
            className="text-[var(--text-muted)] text-xs"
            dominantBaseline="middle"
          >
            {day}
          </text>
        ))}

        {/* Month labels */}
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
          <text
            key={month}
            x={20 + i * (weeks / 12) * (cellSize + gap) + (weeks / 12) * (cellSize + gap) / 2}
            y={15}
            textAnchor="middle"
            className="text-[var(--text-muted)] text-xs"
          >
            {month}
          </text>
        ))}

        {/* Cells */}
        {weekData.map((week, weekIndex) =>
          week.map((level, dayIndex) => (
            <motion.rect
              key={`${weekIndex}-${dayIndex}`}
              x={20 + weekIndex * (cellSize + gap)}
              y={20 + dayIndex * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill={getColor(level)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: weekIndex * 0.005 + dayIndex * 0.001, duration: 0.3 }}
              className="cursor-pointer"
            />
          ))
        )}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 text-sm text-[var(--text-muted)]">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className="w-3 h-3 rounded" style={{ background: getColor(level) }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}