// src/components/AdvancedFeatures.tsx

'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useState } from 'react';

const CommandPalette = dynamic(
  () => import('@/components/command-palette/CommandPalette').then(m => m.CommandPalette),
  { ssr: false }
);

export function AdvancedFeatures({ children }: { children: ReactNode }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      {children}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </>
  );
}