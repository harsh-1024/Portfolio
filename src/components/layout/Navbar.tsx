// src/components/layout/Navbar.tsx

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NAV_LINKS } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useSectionRegistry } from '@/hooks/useSectionRegistry';

// Sections that should be highlighted in the navbar
const HIGHLIGHTED_SECTIONS = new Set([
  'about',
  'skills',
  'certifications',
  'projects',
  'github',
  'experience',
]);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [headerHeight, setHeaderHeight] = useState(0);
  const progress = useScrollProgress();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialMount = useRef(true);
  const headerRef = useRef<HTMLElement | null>(null);
  const { sectionRefs, registerSection } = useSectionRegistry();

  // DEBUG: Confirm this component renders
  console.log('[Navbar] Component rendered, activeSection:', activeSection, 'sectionRefs:', Array.from(sectionRefs.keys()));

  // Measure header height for offset calculation - single source of truth
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  // Intersection Observer for active section detection
  // Create observer once when headerHeight changes
  useEffect(() => {
    if (headerHeight === 0) return;

    // Adjusted rootMargin: 
    // - top: headerHeight + 20px (account for fixed header)
    // - bottom: -20% (trigger when section enters lower portion of viewport)
    // Using -20% instead of -50% because -50% only detects sections in top half of viewport
    const topOffset = headerHeight + 20;
    const rootMargin = `-${topOffset}px 0px -20% 0px`;

    observerRef.current = new IntersectionObserver(
      (entries: readonly IntersectionObserverEntry[]) => {
        // DEBUG: Log all entries
        console.log('[Navbar] IntersectionObserver callback, entries:', entries.map(e => ({
          id: e.target.id,
          isIntersecting: e.isIntersecting,
          intersectionRatio: e.intersectionRatio,
        })));
        
        // Filter to only highlighted sections
        const relevantEntries = entries.filter(entry => 
          HIGHLIGHTED_SECTIONS.has(entry.target.id)
        );
        
        console.log('[Navbar] Relevant entries:', relevantEntries.map(e => ({
          id: e.target.id,
          isIntersecting: e.isIntersecting,
          intersectionRatio: e.intersectionRatio,
        })));
        
        let bestEntry: IntersectionObserverEntry | null = null;
        let maxRatio = 0;

        for (const entry of relevantEntries) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        }

        // If no highlighted section is intersecting, clear active (don't default to hero)
        if (!bestEntry) {
          console.log('[Navbar] No best entry, clearing active if on highlighted section');
          setActiveSection((prev) => {
            if (HIGHLIGHTED_SECTIONS.has(prev.slice(1))) {
              console.log('[Navbar] Clearing active section from:', prev, 'to #hero');
              return '#hero';
            }
            return prev;
          });
          return;
        }

        const target = bestEntry.target as HTMLElement;
        const newActiveSection = '#' + target.id;
        console.log('[Navbar] Best entry:', target.id, 'ratio:', maxRatio, '-> setting active to:', newActiveSection);
        
        setActiveSection((prev) => {
          if (prev !== newActiveSection) {
            console.log('[Navbar] Updating activeSection from', prev, 'to', newActiveSection);
            return newActiveSection;
          }
          return prev;
        });
      },
      { 
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] 
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headerHeight]);

  // Observe/unobserve highlighted sections when they register/unregister OR when observer is ready
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer || headerHeight === 0) return;

    const sections = Array.from(sectionRefs.entries())
      .filter(([id]) => HIGHLIGHTED_SECTIONS.has(id));
    
    console.log('[Navbar] Observing sections:', sections.map(([id, el]) => ({ id, tagName: el.tagName })));
    sections.forEach(([, section]) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(([, section]) => {
        observer.unobserve(section);
      });
    };
  }, [sectionRefs, headerHeight]);

  // Handle initial load - detect which HIGHLIGHTED section is in view (only on mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      const timer = setTimeout(() => {
        const sections = Array.from(sectionRefs.entries())
          .filter(([id]) => HIGHLIGHTED_SECTIONS.has(id))
          .map(([, el]) => el);
        
        console.log('[Navbar] Initial mount - sections:', sections.map(s => ({ id: s.id, rect: s.getBoundingClientRect() })));
        
        if (sections.length === 0) return;

        let bestSection: HTMLElement | null = null;
        let maxVisibleArea = 0;

        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, window.innerHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibleArea = visibleHeight * rect.width;

          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            bestSection = section;
          }
        }

        if (bestSection) {
          console.log('[Navbar] Initial mount - setting active to:', '#' + bestSection.id);
          setActiveSection('#' + bestSection.id);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [sectionRefs]);

  // Smooth scroll to section with proper offset
  const scrollToSection = useCallback((href: string) => {
    console.log('[Navbar] scrollToSection called:', href);
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

      // Close mobile menu if open
      setIsMobileMenuOpen(false);
    } else {
      console.warn('[Navbar] Target not found for:', id);
    }
  }, [headerHeight]);

  // Handle hash changes (e.g., from browser back/forward) - only for highlighted sections
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const hashKey = hash.startsWith('#') ? hash.slice(1) : hash;
        if (sectionRefs.has(hashKey) && HIGHLIGHTED_SECTIONS.has(hashKey)) {
          setActiveSection(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sectionRefs]);

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
                console.log('[Navbar] Home logo clicked');
                e.preventDefault();
                scrollToSection('#hero');
              }}
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
  onClick 
}: { 
  href: string; 
  label: string; 
  isActive: boolean; 
  onClick: (href: string) => void;
}) {
  return (
    <a
      href={href}
      className={cn(
        'relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
        'hover:text-[var(--accent-500)] hover:bg-[var(--surface-hover)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]',
        isActive
          ? 'text-[var(--accent-500)] bg-[var(--accent-500)]/10'
          : 'text-[var(--text-secondary)]'
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick(href);
      }}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[var(--accent-500)]"
        initial={isActive ? { width: 'calc(100% - 24px)' } : { width: 0 }}
        animate={isActive ? { width: 'calc(100% - 24px)' } : { width: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </a>
  );
}

function MobileNavLink({ 
  href, 
  label, 
  isActive, 
  onClick 
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
        'w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
        'hover:bg-[var(--surface-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]',
        isActive
          ? 'text-[var(--accent-500)] bg-[var(--accent-500)]/10'
          : 'text-[var(--text-secondary)]'
      )}
    >
      {label}
      {isActive && (
        <motion.span
          className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-500)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}
    </button>
  );
}