// src/hooks/useCustomCursor.ts

'use client';

import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface CursorPosition {
  x: number;
  y: number;
}

export function useCustomCursor() {
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number>();
  const targetRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !mounted) return;

    const animate = () => {
      const current = position;
      const target = targetRef.current;

      const lerpFactor = 0.15;
      const newX = current.x + (target.x - current.x) * lerpFactor;
      const newY = current.y + (target.y - current.y) * lerpFactor;

      setPosition({ x: newX, y: newY });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reducedMotion, mounted]);

  if (!mounted) {
    return { position: { x: 0, y: 0 }, isVisible: false, isHovering: false, setIsHovering: () => {} };
  }

  return { position, isVisible, isHovering, setIsHovering };
}