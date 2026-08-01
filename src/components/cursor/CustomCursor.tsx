// src/components/cursor/CustomCursor.tsx

'use client';

import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { position, isVisible, isHovering } = useCustomCursor();

  if (reducedMotion) return <>{children}</>;

  return (
    <>
      {children}
      <div
        className={cn(
          'fixed pointer-events-none z-[var(--z-cursor)] w-2 h-2 rounded-full bg-[var(--accent-500)] mix-blend-difference',
          'transition-opacity duration-200',
          !isVisible && 'opacity-0'
        )}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          willChange: 'transform'
        }}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed pointer-events-none z-[var(--z-cursor)] w-8 h-8 rounded-full border-2 border-[var(--accent-500)]/40',
          'transition-all duration-200 ease-out',
          !isVisible && 'opacity-0'
        )}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          willChange: 'transform'
        }}
        aria-hidden="true"
      />
    </>
  );
}