// src/components/AdvancedFeatures.tsx

'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
import { useCommandPalette } from '@/hooks/useCommandPalette';

const CommandPalette = dynamic(
  () => import('@/components/command-palette/CommandPalette').then(m => m.CommandPalette),
  { ssr: false }
);

export function AdvancedFeatures({ children }: { children: ReactNode }) {
  const commandPalette = useCommandPalette();

  return (
    <>
      {children}
      <CommandPalette isOpen={commandPalette.isOpen} onClose={commandPalette.close} />
    </>
  );
}