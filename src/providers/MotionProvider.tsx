// src/providers/MotionProvider.tsx

'use client';

import { MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}