// src/components/layout/Footer.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Code, Heart, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  BookOpen,
  Code,
  User,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border-light)] bg-[var(--surface)]"
      role="contentinfo"
    >
      <div className="container-custom py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <Link
              href="#hero"
              className="flex items-center gap-2 font-display font-bold text-xl text-[var(--text-primary)]"
              aria-label="Go to top"
            >
              <span className="relative">
                <span className="relative z-10">PK</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm max-w-xs">
              Built with Next.js, Tailwind CSS, Framer Motion & GSAP
            </p>
          </div>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((social) => {
              const Icon = iconMap[social.icon] || Github;
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="icon-button group"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="icon-button"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-[var(--border-light)] flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left"
        >
          <p className="text-[var(--text-muted)] text-sm">
            © {currentYear} Your Name. All rights reserved.
          </p>
          <p className="text-[var(--text-muted)] text-sm flex items-center gap-1.5">
            Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[var(--accent-500)]"
            >
              <Heart className="h-4 w-4" />
            </motion.span>
            <Code className="h-4 w-4 ml-1" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}