// src/components/common/AnimatedCounter.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  onComplete?: () => void;
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  onComplete,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const { ref, isVisible } = useScrollReveal(0.5, '0px');
  const animationRef = useRef<number>();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out expo
        const easedProgress = 1 - Math.pow(2, -10 * progress);
        const current = start + (end - start) * easedProgress;
        
        setCount(Number(current.toFixed(decimals)));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
          onComplete?.();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, end, start, duration, decimals, onComplete]);

  return (
    <div ref={ref} className={cn('font-display font-bold tabular-nums', className)}>
      {prefix}
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </div>
  );
}