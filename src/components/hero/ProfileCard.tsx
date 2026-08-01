// src/components/hero/ProfileCard.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProfileCardProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProfileCard({ src, alt, className }: ProfileCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn('relative flex justify-center', className)}>
      {/* Animated gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-500)] via-[var(--accent-600)] to-[var(--accent-700)] opacity-30 blur-2xl"
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ 
          width: '120%', 
          height: '120%', 
          top: '-10%', 
          left: '-10%',
          maskImage: 'radial-gradient(circle, black 60%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 70%)',
        }}
      />
      
      {/* Rotating conic gradient border */}
      <div className="relative z-10">
        <div className="relative rounded-full p-[3px] bg-gradient-conic from-[var(--accent-500)] via-[var(--accent-600)] to-[var(--accent-700)] animate-rotate-slow">
          <div className="rounded-full bg-[var(--bg-primary)] p-1">
            <div className="rounded-full overflow-hidden">
              <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                width={400}
                height={400}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent dots */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute -top-4 -right-4 w-3 h-3 bg-[var(--accent-500)] rounded-full opacity-60"
            animate={{ 
              y: [-10, 10, -10],
              x: [10, -10, 10],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-2 h-2 bg-[var(--accent-600)] rounded-full opacity-50"
            animate={{ 
              y: [10, -10, 10],
              x: [-10, 10, -10],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-[var(--accent-700)] rounded-full opacity-40"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}
    </div>
  );
}