// src/components/experience/ExperienceSection.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { experience } from '@/data/experience';
import { fadeUp } from '@/lib/animations';
import { ExternalLink, Building2, MapPin, Briefcase, Calendar } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="section" aria-label="Experience">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            Career
          </span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle mx-auto">
            Building scalable systems, discovering vulnerabilities, and leading engineering teams.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border-light)]"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />

          <div className="relative pl-16">
            {experience.map((job, index) => (
              <ExperienceItem 
                key={job.id} 
                job={job} 
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceItemProps {
  job: typeof experience[0];
  index: number;
  isLast: boolean;
}

function ExperienceItem({ job, index, isLast }: ExperienceItemProps) {
  const typeLabels: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'internship': 'Internship',
    'freelance': 'Freelance',
  };

  return (
    <motion.div
      className="relative mb-12 last:mb-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 top-2 w-3 h-3 rounded-full bg-[var(--accent-500)] border-4 border-[var(--bg-primary)] z-10 shadow-glow" />
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-[var(--border-light)]" />
      )}

      <div className="card-hover p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-500)]/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-6 w-6 text-[var(--accent-500)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-[var(--text-primary)]">{job.role}</h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--accent-500)]/10 text-[var(--accent-500)] border border-[var(--accent-500)]/20">
                {typeLabels[job.type] || job.type}
              </span>
              {job.current && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 animate-pulse-soft">
                  Current
                </span>
              )}
            </div>
            <p className="text-[var(--accent-500)] font-medium">{job.company}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDateRange(job.startDate, job.endDate, job.current)}
          </span>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] mb-4">{job.description}</p>

        {/* Responsibilities */}
        <div className="mb-4">
          <h4 className="font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-500)]"></span>
            Key Responsibilities
          </h4>
          <ul className="space-y-1.5 pl-6">
            {job.responsibilities.slice(0, 4).map((resp, i) => (
              <li key={i} className="text-[var(--text-secondary)] text-sm relative">
                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-500)]/50" />
                <span className="ml-1">{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <h4 className="font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Key Achievements
          </h4>
          <ul className="space-y-1.5 pl-6">
            {job.achievements.slice(0, 3).map((achievement, i) => (
              <li key={i} className="text-[var(--text-secondary)] text-sm relative">
                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-green-500/50" />
                <span className="ml-1">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="pt-4 border-t border-[var(--border-light)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-600)]"></span>
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <span key={tech} className="tag tag-accent text-xs">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatDateRange(start: string, end?: string, current?: boolean): string {
  const startDate = new Date(start);
  const startStr = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const endStr = current ? 'Present' : end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
  return `${startStr} - ${endStr}`;
}