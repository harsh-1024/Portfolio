// src/providers/CursorProvider.tsx

'use client';

import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function CursorProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { position, isVisible, isHovering } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;
    
    const cursor = document.getElementById('custom-cursor');
    const cursorRing = document.getElementById('custom-cursor-ring');
    
    if (!cursor || !cursorRing) return;

    let rafId: number;
    const updatePosition = () => {
      cursor.style.transform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
      rafId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
    return () => cancelAnimationFrame(rafId);
  }, [position, isHovering, reducedMotion, mounted]);

  if (!mounted || reducedMotion) return <>{children}</>;

  return (
    <>
      {children}
      <div
        id="custom-cursor"
        className={cn(
          'fixed pointer-events-none z-[var(--z-cursor)] w-3 h-3 rounded-full bg-[var(--accent-500)] mix-blend-difference',
          'transition-opacity duration-200',
          !isVisible && 'opacity-0'
        )}
        style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }}
        aria-hidden="true"
      />
      <div
        id="custom-cursor-ring"
        className={cn(
          'fixed pointer-events-none z-[var(--z-cursor)] w-10 h-10 rounded-full border-2 border-[var(--accent-500)]/50',
          'transition-all duration-300 ease-out',
          !isVisible && 'opacity-0'
        )}
        style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})` }}
        aria-hidden="true"
      />
    </>
  );
}