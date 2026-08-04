// src/components/layout/Navbar.tsx

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NAV_LINKS } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const progress = useScrollProgress();
  const headerRef = useRef<HTMLElement | null>(null);
  const activeSection = useActiveSection({ sectionIds: SECTION_IDS, headerHeight });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = headerHeight + 10;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setIsMobileMenuOpen(false);
    }
  }, [headerHeight]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[var(--z-sticky)] bg-gradient-to-r from-[var(--accent-500)] via-[var(--accent-600)] to-[var(--accent-700)] pointer-events-none"
        style={{ transformOrigin: 'left', transform: `scaleX(${progress})` }}
      />

      <nav
        ref={headerRef}
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
            <a
              href="#hero"
              className={cn(
                'flex items-center gap-2 font-display font-bold text-xl text-[var(--text-primary)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-lg'
              )}
              aria-label="Go to home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
            >
              <span className="relative">
                <span className="relative z-10">PK</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-700)]"
                />
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeSection === link.href}
                  onClick={scrollToSection}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <button
                className={cn(
                  'lg:hidden icon-button',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]'
                )}
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
                    onClick={scrollToSection}
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

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (href: string) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
        'hover:text-[var(--accent-500)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-xl',
        isActive ? 'text-[var(--accent-500)]' : 'text-[var(--text-secondary)]'
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick(href);
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[var(--accent-500)]"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isActive ? 'calc(100% - 24px)' : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[var(--accent-500)] opacity-0"
        initial={{ width: 0 }}
        whileHover={{ width: 'calc(100% - 24px)', opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </a>
  );
}

function MobileNavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (href: string) => void;
}) {
  const handleClick = () => {
    onClick(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full text-left px-4 py-3 text-base font-medium transition-colors duration-200',
        'hover:bg-[var(--surface-hover)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-xl',
        isActive ? 'text-[var(--accent-500)]' : 'text-[var(--text-secondary)]'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      {isActive && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-500)]" />
      )}
    </button>
  );
}