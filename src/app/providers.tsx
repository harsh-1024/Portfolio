// src/app/providers.tsx

'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { MotionProvider } from '@/providers/MotionProvider';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        {children}
      </MotionProvider>
    </ThemeProvider>
  );
}