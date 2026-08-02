// src/hooks/useCommandPalette.ts

'use client';

import { useEffect, useState, useCallback } from 'react';

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    setIsClient(true);
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggle();
      }
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggle, close]);

  // Return closed state during SSR to avoid hydration mismatch
  if (!isClient) {
    return { isOpen: false, open, close, toggle };
  }

  return { isOpen, open, close, toggle };
}