// src/components/command-palette/CommandPalette.tsx

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search, ChevronRight, Github, Linkedin, Twitter, Mail, Download, Sun, Moon, Monitor, Home, User, Code, Briefcase, Mail as MailIcon } from 'lucide-react';
import { COMMAND_PALETTE_ITEMS } from '@/lib/constants';

interface CommandItem {
  label: string;
  action: () => void;
  shortcut?: string;
  icon?: React.ReactNode;
  section: string;
}

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  // Flatten items
  const allItems: CommandItem[] = COMMAND_PALETTE_ITEMS.flatMap(section => 
    section.items.map(item => ({ ...item, section: section.section }))
  );

  // Filter items
  const filteredItems = query
    ? allItems
        .map(item => ({
          item,
          score: fuse(item.label.toLowerCase(), query.toLowerCase()),
        }))
        .filter(({ score }) => score > 0.3)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item)
    : allItems;

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            filteredItems[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Global Cmd+K to open
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Only open if not already open
        // The parent component controls isOpen state
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Scroll selected into view
  useEffect(() => {
    if (itemsRef.current) {
      const selected = itemsRef.current.children[selectedIndex] as HTMLElement;
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'Navigation': return <Home className="h-4 w-4" />;
      case 'Actions': return <Code className="h-4 w-4" />;
      case 'Social': return <Github className="h-4 w-4" />;
      default: return <ChevronRight className="h-4 w-4" />;
    }
  };

  const getItemIcon = (label: string) => {
    if (label.includes('GitHub')) return <Github className="h-4 w-4" />;
    if (label.includes('LinkedIn')) return <Linkedin className="h-4 w-4" />;
    if (label.includes('Twitter')) return <Twitter className="h-4 w-4" />;
    if (label.includes('Email') || label.includes('Email')) return <Mail className="h-4 w-4" />;
    if (label.includes('Resume')) return <Download className="h-4 w-4" />;
    if (label.includes('Theme')) return <Monitor className="h-4 w-4" />;
    if (label.includes('Home')) return <Home className="h-4 w-4" />;
    if (label.includes('About')) return <User className="h-4 w-4" />;
    if (label.includes('Projects')) return <Briefcase className="h-4 w-4" />;
    if (label.includes('Contact')) return <MailIcon className="h-4 w-4" />;
    return <ChevronRight className="h-4 w-4" />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <motion.div
          className="w-full max-w-2xl glass-strong rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-[var(--border-light)]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full pl-12 pr-4 py-3 bg-[var(--surface)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)]"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] px-2 py-1 bg-[var(--surface-hover)] rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div
            ref={itemsRef}
            className="max-h-[50vh] overflow-y-auto p-2"
            role="listbox"
            aria-label="Command results"
          >
            {filteredItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-[var(--text-muted)]">
                No commands found
              </div>
            ) : (
              <>
                {COMMAND_PALETTE_ITEMS.map((section) => {
                  const sectionItems = section.items
                    .map(item => ({ ...item, section: section.section }))
                    .filter(item => 
                      filteredItems.some(f => f.label === item.label && f.action === item.action)
                    );
                  
                  if (sectionItems.length === 0) return null;

                  return (
                    <div key={section.section} className="px-4">
                      <div className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        {getSectionIcon(section.section)}
                        {section.section}
                      </div>
                      {sectionItems.map((item, index) => {
                        const globalIndex = filteredItems.findIndex(f => f.label === item.label && f.action === item.action);
                        const isSelected = globalIndex === selectedIndex;
                        
                        return (
                          <motion.button
                            key={`${section.section}-${item.label}`}
                            onClick={() => { item.action(); onClose(); }}
                            role="option"
                            aria-selected={isSelected}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                              isSelected
                                ? 'bg-[var(--accent-500)]/10 text-[var(--accent-500)]'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                            )}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.02 * index }}
                          >
                            {getItemIcon(item.label)}
                            <span className="flex-1 font-medium">{item.label}</span>
                            {item.shortcut && (
                              <kbd className="text-xs text-[var(--text-muted)] px-2 py-0.5 bg-[var(--surface)] rounded font-mono">
                                {item.shortcut}
                              </kbd>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-3 border-t border-[var(--border-light)] text-center text-xs text-[var(--text-muted)]">
            <kbd className="px-2 py-0.5 bg-[var(--surface)] rounded">↑</kbd>{' '}
            <kbd className="px-2 py-0.5 bg-[var(--surface)] rounded">↓</kbd>{' '}
            Navigate &nbsp;·&nbsp;
            <kbd className="px-2 py-0.5 bg-[var(--surface)] rounded">Enter</kbd>{' '}
            Select &nbsp;·&nbsp;
            <kbd className="px-2 py-0.5 bg-[var(--surface)] rounded">Esc</kbd>{' '}
            Close
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Simple fuzzy search
function fuse(text: string, query: string): number {
  if (!query) return 1;
  if (!text) return 0;
  
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i].toLowerCase() === query[queryIndex].toLowerCase()) {
      score += 1;
      queryIndex++;
    }
  }
  
  return queryIndex === query.length ? score / text.length : 0;
}