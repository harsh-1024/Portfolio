// src/components/common/SectionObserver.tsx

'use client';

import { useEffect, useRef } from 'react';
import { useSectionRegistry } from '@/hooks/useSectionRegistry';

interface SectionObserverProps {
  id: string;
  children: React.ReactNode;
}

export function SectionObserver({ id, children }: SectionObserverProps) {
  const { registerSection } = useSectionRegistry();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debug: log render
  console.log('[SectionObserver] Render:', id);

  useEffect(() => {
    console.log('[SectionObserver] Effect running:', id);
    // Use requestAnimationFrame to ensure DOM is fully committed
    const frame = requestAnimationFrame(() => {
      const wrapper = wrapperRef.current;
      console.log('[SectionObserver] RAF callback:', id, 'wrapper:', wrapper);
      if (!wrapper) {
        registerSection(id, null);
        return;
      }
      
      // The children might be a section element directly, or wrapped
      // Check if the first child is a section with the matching ID
      let element: HTMLElement | null = null;
      
      // First try: direct child section with matching ID
      if (wrapper.firstElementChild?.id === id) {
        element = wrapper.firstElementChild as HTMLElement;
        console.log('[SectionObserver] Found via firstElementChild:', id, element);
      }
      // Second try: querySelector
      else {
        element = wrapper.querySelector(`#${id}`) as HTMLElement | null;
        console.log('[SectionObserver] Found via querySelector:', id, element);
      }
      
      // Fallback to global search
      if (!element) {
        element = document.getElementById(id);
        console.log('[SectionObserver] Found via getElementById:', id, element);
      }
      
      console.log('[SectionObserver] Registering:', id, element);
      registerSection(id, element);
    });

    return () => {
      cancelAnimationFrame(frame);
      registerSection(id, null);
    };
  }, [id, registerSection]);

  return <div ref={wrapperRef}>{children}</div>;
}