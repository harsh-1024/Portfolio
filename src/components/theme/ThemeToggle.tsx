// src/components/theme/ThemeToggle.tsx

'use client';

import { useTheme, Theme } from '@/providers/ThemeProvider';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { value: Theme; label: string; icon: React.ReactNode; description: string }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" />, description: 'Always use light mode' },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" />, description: 'Always use dark mode' },
    { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" />, description: 'Match system preference' },
  ];

  const currentTheme = themes.find(t => t.value === theme)!;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="icon-button relative"
        aria-label={`Current theme: ${currentTheme.label}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <AnimatePresence mode="wait">
          {Object.entries({ Sun, Moon, Monitor }).map(([key, Icon]) => (
            <motion.span
              key={key}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Icon className={cn(
                'h-5 w-5 transition-colors',
                theme === key.toLowerCase() || (theme === 'system' && resolvedTheme === key.toLowerCase() && key !== 'Sun')
                  ? 'text-[var(--accent-500)]'
                  : 'text-[var(--text-muted)]'
              )} />
            </motion.span>
          ))}
        </AnimatePresence>
        <ChevronDown className={cn(
          'h-4 w-4 ml-1 text-[var(--text-muted)] transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl shadow-card-hover border-[var(--border-light)] py-1 z-[var(--z-dropdown)]"
            role="listbox"
            aria-label="Select theme"
          >
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => { setTheme(t.value); setIsOpen(false); }}
                role="option"
                aria-selected={theme === t.value}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  theme === t.value
                    ? 'bg-[var(--accent-500)]/10 text-[var(--accent-500)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                )}
              >
                <span className="flex-shrink-0">{t.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.description}</div>
                </div>
                {theme === t.value && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-[var(--accent-500)]"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}