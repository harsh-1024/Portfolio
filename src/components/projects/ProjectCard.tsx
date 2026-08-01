// src/components/projects/ProjectCard.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const techStack = project.techStack.slice(0, 5);

  return (
    <motion.article
      className={cn(
        'card-hover group relative overflow-hidden cursor-pointer',
        'bg-[var(--surface)]'
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }}}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[var(--accent-500)]/10 to-[var(--accent-600)]/10"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {project.thumbnail && (
            <motion.img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2.5 py-1 rounded-full text-xs font-medium',
            project.status === 'completed' && 'bg-green-500/20 text-green-400 border border-green-500/30',
            project.status === 'in-progress' && 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
            project.status === 'archived' && 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
          )}>
            {project.status.replace('-', ' ')}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--accent-500)]/20 text-[var(--accent-500)] border border-[var(--accent-500)]/30">
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay with actions */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-2">
              {project.githubUrl && (
                <motion.button
                  className="icon-button glass-strong group-hover:bg-[var(--accent-500)] group-hover:text-white"
                  onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl!, '_blank'); }}
                  aria-label="View on GitHub"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-5 w-5" />
                </motion.button>
              )}
              {project.liveUrl && (
                <motion.button
                  className="icon-button glass-strong group-hover:bg-[var(--accent-500)] group-hover:text-white"
                  onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl!, '_blank'); }}
                  aria-label="View live demo"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.button>
              )}
              <motion.button
                className="icon-button glass-strong group-hover:bg-[var(--accent-500)] group-hover:text-white"
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                aria-label="View details"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="tag tag-accent text-xs">{project.category}</span>
          {project.featured && (
            <motion.span className="tag text-[var(--accent-500)] border-[var(--accent-500)]/30 bg-[var(--accent-500)]/10 text-xs">
              ★ Featured
            </motion.span>
          )}
        </div>

        <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2 group-hover:text-[var(--accent-500)] transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((tech) => (
            <span key={tech} className="tag text-xs">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tag text-xs text-[var(--text-muted)]">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Highlights preview */}
        <div className="pt-4 border-t border-[var(--border-light)]">
          <p className="text-xs text-[var(--text-muted)] mb-2">Key highlights:</p>
          <ul className="space-y-1">
            {project.highlights.slice(0, 2).map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="text-[var(--accent-500)] mt-0.5">→</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}