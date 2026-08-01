// src/components/projects/ProjectModal.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types';
import { modalOverlay, modalContent } from '@/lib/animations';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function ProjectModal({ project, onClose, onNext, onPrev }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
        variants={modalOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl shadow-2xl"
          variants={modalContent}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 icon-button glass-strong"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </motion.button>

          {/* Image Gallery */}
          {project.images.length > 0 && (
            <ProjectGallery images={project.images} />
          )}

          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="tag tag-accent">{project.category}</span>
              {project.featured && (
                <span className="tag text-[var(--accent-500)] border-[var(--accent-500)]/30 bg-[var(--accent-500)]/10">Featured</span>
              )}
              <span className="tag text-[var(--text-muted)] border-[var(--text-muted)]/30">
                {project.status.replace('-', ' ')}
              </span>
            </div>

            <h2 id="modal-title" className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              {project.title}
            </h2>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              {project.longDescription}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  Live Demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Two column layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tech Stack */}
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent-500)]/10 flex items-center justify-center text-[var(--accent-500)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag tag-accent">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent-500)]/10 flex items-center justify-center text-[var(--accent-500)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                  Timeline
                </h3>
                <div className="space-y-2 text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Started</span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">{project.endDate ? 'Completed' : 'Ongoing'}</span>
                    <span>{project.endDate || 'Present'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Key Highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <motion.span className="text-[var(--accent-500)] mt-1 flex-shrink-0">→</motion.span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Solutions */}
            {(project.challenges && project.challenges.length > 0) && (
              <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Challenges & Solutions</h3>
                <div className="space-y-4">
                  {project.challenges!.map((challenge, i) => (
                    <div key={i} className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <p className="font-medium text-red-400 mb-1">Challenge</p>
                        <p className="text-sm text-[var(--text-secondary)]">{challenge}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                        <p className="font-medium text-green-400 mb-1">Solution</p>
                        <p className="text-sm text-[var(--text-secondary)]">{project.solutions?.[i] || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <motion.button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 icon-button glass-strong"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 icon-button glass-strong"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}