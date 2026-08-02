// src/components/common/LoadingScreen.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  minDuration?: number;
  children?: React.ReactNode;
}

export function LoadingScreen({ minDuration = 800, children }: LoadingScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const startTime = useRef<number>(Date.now());
  const unmountedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, minDuration - elapsed);
      
      setTimeout(() => {
        if (unmountedRef.current) return;
        setIsLoaded(true);
        setTimeout(() => {
          if (unmountedRef.current) return;
          setShowLoader(false);
        }, 500);
      }, remaining);
    }, 0);

    return () => {
      unmountedRef.current = true;
      clearTimeout(timer);
    };
  }, [minDuration]);

  if (!showLoader) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={false}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-primary)]',
          'flex-col gap-6'
        )}
        role="status"
        aria-label="Loading portfolio"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-16 h-16"
        >
          <motion.svg
            className="w-full h-full text-[var(--accent-500)]"
            viewBox="0 0 100 100"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="3"
              stroke="currentColor"
              strokeDasharray="283"
              strokeDashoffset="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-2 h-2 bg-[var(--accent-500)] rounded-full" />
          </motion.div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--text-muted)] text-sm font-medium"
        >
          Loading portfolio...
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: minDuration / 1000, ease: 'linear' }}
          className="w-64 h-1 bg-[var(--surface-hover)] rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-700)]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: minDuration / 1000, ease: 'linear' }}
          />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
}