// src/components/certifications/CertificateCard.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExternalLink, CheckCircle2, Calendar } from 'lucide-react';
import { Certification } from '@/types';

interface CertificateCardProps {
  cert: Certification;
  index: number;
  onClick: () => void;
}

export function CertificateCard({ cert, index, onClick }: CertificateCardProps) {
  const isExpired = cert.expiryDate && new Date(cert.expiryDate) < new Date();

  return (
    <motion.article
      className={cn(
        'card-hover group cursor-pointer relative overflow-hidden',
        'bg-gradient-to-br from-[var(--surface)] to-[var(--surface-hover)]'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }}}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-500)]/10 to-[var(--accent-600)]/10" />
        {cert.thumbnail && (
          <img
            src={cert.thumbnail}
            alt={`${cert.name} certificate`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        
        {/* Verified badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </span>
        </div>

        {isExpired && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
              Expired
            </span>
          </div>
        )}

        {cert.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--accent-500)]/20 text-[var(--accent-500)] border border-[var(--accent-500)]/30">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2 group-hover:text-[var(--accent-500)] transition-colors">
          {cert.name}
        </h3>

        <p className="text-[var(--text-secondary)] text-sm mb-3">{cert.issuer}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Issued: {formatDate(cert.issueDate)}
          </span>
          {cert.expiryDate && (
            <span className="flex items-center gap-1" style={{ color: isExpired ? 'var(--text-muted)' : 'var(--text-muted)' }}>
              <Calendar className="h-3 w-3" />
              Expires: {formatDate(cert.expiryDate)}
            </span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cert.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="tag text-xs">{skill}</span>
          ))}
          {cert.skills.length > 4 && (
            <span className="tag text-xs text-[var(--text-muted)]">
              +{cert.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Verify link */}
        <div className="pt-3 border-t border-[var(--border-light)]">
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-sm text-[var(--accent-500)] hover:text-[var(--accent-600)] font-medium group"
          >
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            Verify Credential
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}