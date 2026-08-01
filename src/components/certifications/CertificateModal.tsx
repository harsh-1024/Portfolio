// src/components/certifications/CertificateModal.tsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExternalLink, X, CheckCircle2, Calendar, Award } from 'lucide-react';
import { Certification } from '@/types';
import { modalOverlay, modalContent } from '@/lib/animations';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  if (!cert) return null;

  const isExpired = cert.expiryDate && new Date(cert.expiryDate) < new Date();

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
        aria-labelledby="cert-modal-title"
      >
        <motion.div
          className="relative w-full max-w-md glass-strong rounded-2xl shadow-2xl"
          variants={modalContent}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 icon-button glass-strong"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </motion.button>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-600)] flex items-center justify-center">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
                {cert.featured && (
                  <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-[var(--accent-500)]/20 text-[var(--accent-500)] border border-[var(--accent-500)]/30">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {cert.thumbnail && (
              <div className="rounded-xl overflow-hidden mb-4 aspect-video">
                <img
                  src={cert.thumbnail}
                  alt={`${cert.name} certificate`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h2 id="cert-modal-title" className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {cert.name}
            </h2>

            <p className="text-[var(--text-secondary)] mb-4">{cert.issuer}</p>

            <div className="space-y-3 mb-6 p-4 rounded-xl bg-[var(--surface-hover)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Credential ID</span>
                <code className="text-sm font-mono text-[var(--text-primary)]">{cert.credentialId}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Calendar className="h-4 w-4" />
                  Issued
                </span>
                <span className="font-medium text-[var(--text-primary)]">{formatDate(cert.issueDate)}</span>
              </div>
              {cert.expiryDate && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[var(--text-muted)]">
                    <Calendar className="h-4 w-4" />
                    Expires
                  </span>
                  <span className={cn('font-medium', isExpired ? 'text-red-400' : 'text-[var(--text-primary)]')}>
                    {formatDate(cert.expiryDate)}
                    {isExpired && <span className="ml-2 text-xs text-red-400">(Expired)</span>}
                  </span>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="font-medium text-[var(--text-primary)] mb-3">Skills Validated</h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span key={skill} className="tag tag-accent">{skill}</span>
                ))}
              </div>
            </div>

            {/* Verify button */}
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Verify on Issuer's Website
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}