// src/components/about/AboutSection.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { profile } from '@/data/profile';
import { fadeUp, staggerContainer } from '@/lib/animations';

const aboutStats = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '', label: 'Certifications' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '', label: 'Patents Filed' },
  { value: 12, suffix: '', label: 'Countries Visited' },
];

const timelineData = [
  {
    year: '2024',
    title: 'Staff AI Engineer',
    company: 'TechCorp AI',
    description: 'Leading GenAI platform team building LLM infrastructure at scale',
    icon: '🚀',
  },
  {
    year: '2021',
    title: 'Senior Security Researcher',
    company: 'SecureStart',
    description: 'Automated red-teaming, vulnerability research, 15+ CVEs disclosed',
    icon: '🔒',
  },
  {
    year: '2019',
    title: 'Full Stack Engineer',
    company: 'DataFlow Inc',
    description: 'Real-time streaming platform processing 500K events/sec',
    icon: '⚡',
  },
  {
    year: '2017',
    title: 'Backend Engineer',
    company: 'CloudScale Systems',
    description: 'Multi-cloud management platform, GraphQL federation',
    icon: '☁️',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section" aria-label="About Me">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="section-title">Get to Know Me Better</h2>
          <p className="section-subtitle mx-auto">
            A blend of AI engineering, security research, and full-stack development. 
            I build systems that learn, protect, and scale.
          </p>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image/Visual */}
          <ScrollReveal variant="fadeRight" delay={100}>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--accent-500)]/20 to-[var(--accent-600)]/20 relative">
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl lg:text-9xl animate-float">🧠</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent" />
              </div>
              
              {/* Floating cards around image */}
              <motion.div
                className="absolute -top-4 -right-4 w-48 p-4 glass-strong rounded-xl shadow-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-500)]/20 flex items-center justify-center text-2xl">🤖</div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">AI/ML Focus</p>
                    <p className="text-sm text-[var(--text-muted)]">LLMs, MLOps, Production ML</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 -left-4 w-48 p-4 glass-strong rounded-xl shadow-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-600)]/20 flex items-center justify-center text-2xl">🛡️</div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Security Research</p>
                    <p className="text-sm text-[var(--text-muted)]">Red Teaming, Vuln Research</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <div className="space-y-10">
            {/* Bio */}
            <ScrollReveal variant="fadeLeft" delay={200}>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Who Am I</h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
                <p>{profile.bio.split('\n\n')[0]}</p>
                <p className="mt-4">{profile.bio.split('\n\n')[1]}</p>
              </div>
            </ScrollReveal>

            {/* Current Focus */}
            <ScrollReveal variant="fadeLeft" delay={300}>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Current Focus</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Scaling LLM inference infrastructure',
                  'AI safety & alignment research',
                  'eBPF-based runtime security',
                  'Automated vulnerability discovery',
                  'MLOps & model observability',
                  'Open source contributions',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border-light)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-[var(--accent-500)] rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal variant="fadeLeft" delay={400}>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Journey</h3>
              <div className="relative pl-6 border-l border-[var(--border-light)]">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative mb-8 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="absolute left-[-34px] top-1 w-8 h-8 rounded-full bg-[var(--accent-500)] flex items-center justify-center text-white text-sm font-bold z-10">
                      {item.icon}
                    </div>
                    <div className="absolute left-[-38px] top-9 h-full w-0.5 bg-[var(--border-light)]" />
                    <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5">
                      <div className="flex items-center gap-2 text-sm text-[var(--accent-500)] font-medium mb-2">
                        <span>{item.year}</span>
                        <span className="text-[var(--text-muted)]">·</span>
                        <span>{item.company}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{item.title}</h4>
                      <p className="text-[var(--text-secondary)]">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Fun Facts / Stats */}
            <ScrollReveal variant="fadeUp" delay={500} className="mt-10">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {aboutStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-light)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.08 }}
                  >
                    <AnimatedCounter
                      end={stat.value}
                      duration={1800}
                      className="font-display font-bold text-3xl lg:text-4xl text-[var(--text-primary)]"
                      suffix={stat.suffix}
                    />
                    <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}