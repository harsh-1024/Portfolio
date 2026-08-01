// src/components/layout/Navbar.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NAV_LINKS } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(link => document.getElementById(link.href.slice(1))).filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[var(--z-sticky)] bg-gradient-to-r from-[var(--accent-500)] via-[var(--accent-600)] to-[var(--accent-700)]"
        style={{ transformOrigin: 'left', transform: `scaleX(${progress})` }}
      />
      
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-sticky)] glass',
          'border-b border-[var(--border-light)]',
          'transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]',
          isScrolled ? 'shadow-card bg-[var(--surface)]/95' : 'bg-transparent'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link
              href="#hero"
              className="flex items-center gap-2 font-display font-bold text-xl text-[var(--text-primary)]"
              aria-label="Go to home"
            >
              <span className="relative">
                <span className="relative z-10">PK</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-700)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeSection === link.href}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <button
                className="lg:hidden icon-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-[var(--border-light)] overflow-hidden"
            >
              <div className="container-custom py-6 space-y-4">
                {NAV_LINKS.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={activeSection === link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
                <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-center gap-4">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
        'hover:text-[var(--accent-500)] hover:bg-[var(--surface-hover)]',
        isActive
          ? 'text-[var(--accent-500)] bg-[var(--accent-500)]/10'
          : 'text-[var(--text-secondary)]'
      )}
      onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[var(--accent-500)]"
        initial={isActive ? { width: 'calc(100% - 24px)' } : { width: 0 }}
        animate={isActive ? { width: 'calc(100% - 24px)' } : { width: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </Link>
  );
}

function MobileNavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
        'hover:bg-[var(--surface-hover)]',
        isActive
          ? 'text-[var(--accent-500)] bg-[var(--accent-500)]/10'
          : 'text-[var(--text-secondary)]'
      )}
    >
      {label}
    </button>
  );
}