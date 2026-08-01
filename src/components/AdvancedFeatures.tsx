// src/components/AdvancedFeatures.tsx

'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';

const CursorProvider = dynamic(
  () => import('@/providers/CursorProvider').then(m => m.CursorProvider),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import('@/components/command-palette/CommandPalette').then(m => m.CommandPalette),
  { ssr: false }
);

export function AdvancedFeatures({ children }: { children: ReactNode }) {
  const [useCommandPalette, setUseCommandPalette] = useState<{ isOpen: boolean; close: () => void } | null>(null);

  useEffect(() => {
    import('@/hooks/useCommandPalette').then(m => {
      setUseCommandPalette(m.useCommandPalette());
    });
  }, []);

  if (!useCommandPalette) {
    return <CursorProvider>{children}</CursorProvider>;
  }

  const { isOpen, close } = useCommandPalette;

  return (
    <CursorProvider>
      {children}
      <CommandPalette isOpen={isOpen} onClose={close} />
    </CursorProvider>
  );
}