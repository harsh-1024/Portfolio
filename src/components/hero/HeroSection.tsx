// src/components/hero/HeroSection.tsx

'use client';

import { motion } from 'framer-motion';
import { ArrowDown, MousePointerClick } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypingEffect } from './TypingEffect';
import { ProfileCard } from './ProfileCard';
import { SocialIcons } from './SocialIcons';
import { ParticleBackground } from './ParticleBackground';
import { profile } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer } from '@/lib/animations';

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Home"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient blobs */}
        {!reducedMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--accent-500)]/10 via-transparent to-[var(--accent-600)]/10 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[var(--accent-600)]/10 via-transparent to-[var(--accent-700)]/10 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[var(--accent-500)]/5 via-transparent to-[var(--accent-700)]/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </>
        )}

        {/* Particle background */}
        <ParticleBackground particleCount={reducedMotion ? 0 : 180} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          delay: 1.5, 
          duration: 0.5,
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
        aria-hidden="true"
      >
        <MousePointerClick className="h-6 w-6" />
        <span className="text-xs font-medium">Scroll to explore</span>
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:pr-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)]/80 backdrop-blur-glass border border-[var(--border-light)] text-sm font-medium text-[var(--text-secondary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.span
                className="w-2 h-2 bg-[var(--accent-500)] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>Open to opportunities</span>
            </motion.div>

            <h1 className="mt-6 font-display font-bold text-[var(--text-primary)] leading-tight tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              Hi, I'm <span className="gradient-text">{profile.name}</span>
            </h1>

            <motion.p
              className="mt-6 text-lg lg:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="#contact"
                className="btn-primary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Work Together
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </motion.a>
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-ghost"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </motion.a>
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <TypingEffect
                texts={profile.title}
                speed={50}
                pauseDuration={2000}
                className="text-[var(--text-muted)] font-medium"
                cursorClassName="text-[var(--accent-500)]"
              />
            </motion.div>

            <SocialIcons />
          </motion.div>

          {/* Right side - Profile Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProfileCard 
              src={profile.avatar} 
              alt={`${profile.name} - AI Engineer & Security Researcher`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}