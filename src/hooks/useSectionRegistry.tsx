// src/hooks/useSectionRegistry.ts

'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SectionRegistryContextType {
  sectionRefs: Map<string, HTMLElement>;
  registerSection: (id: string, element: HTMLElement | null) => void;
}

const SectionRegistryContext = createContext<SectionRegistryContextType | null>(null);

export function SectionRegistryProvider({ children }: { children: ReactNode }) {
  const [sectionRefs, setSectionRefs] = useState<Map<string, HTMLElement>>(new Map());

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    console.log('[useSectionRegistry] registerSection called:', id, element);
    setSectionRefs((prev) => {
      const next = new Map(prev);
      if (element) {
        next.set(id, element);
      } else {
        next.delete(id);
      }
      console.log('[useSectionRegistry] sectionRefs now:', Array.from(next.keys()));
      return next;
    });
  }, []);

  return (
    <SectionRegistryContext.Provider value={{ sectionRefs, registerSection }}>
      {children}
    </SectionRegistryContext.Provider>
  );
}

export function useSectionRegistry() {
  const context = useContext(SectionRegistryContext);
  if (!context) {
    throw new Error('useSectionRegistry must be used within a SectionRegistryProvider');
  }
  return context;
}