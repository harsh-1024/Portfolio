// src/components/certifications/CertificationsSection.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';
import { certifications } from '@/data/certifications';
import { staggerContainer } from '@/lib/animations';
import { Filter, Award } from 'lucide-react';

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredCerts = filter === 'featured'
    ? certifications.filter(c => c.featured)
    : certifications;

  return (
    <section id="certifications" className="section" aria-label="Certifications">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4 flex items-center justify-center gap-2 mx-auto">
            <Award className="h-4 w-4" />
            Certifications
          </span>
          <h2 className="section-title">Certifications & Credentials</h2>
          <p className="section-subtitle mx-auto">
            Industry-recognized certifications validating expertise across AI, security, and cloud.
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal variant="fadeUp" delay={100} className="mb-8 flex justify-center">
          <div className="flex gap-2 bg-[var(--surface)] border border-[var(--border-light)] rounded-full p-1">
            {[
              { value: 'all', label: `All (${certifications.length})` },
              { value: 'featured', label: `Featured (${certifications.filter(c => c.featured).length})` },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value as 'all' | 'featured')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  filter === opt.value
                    ? 'bg-[var(--accent-500)] text-white shadow-glow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        <ScrollReveal 
          asChild
          stagger
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCerts.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                index={index}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Empty state */}
        {filteredCerts.length === 0 && (
          <ScrollReveal variant="fadeUp" className="text-center py-12">
            <p className="text-[var(--text-muted)]">No certifications in this category</p>
          </ScrollReveal>
        )}

        {/* Modal */}
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      </div>
    </section>
  );
}