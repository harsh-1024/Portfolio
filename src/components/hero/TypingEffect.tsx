// src/components/hero/TypingEffect.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingEffect({ 
  texts, 
  speed = 50, 
  pauseDuration = 2000, 
  className,
  cursorClassName,
}: TypingEffectProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex - 1);
          setDisplayText(currentText.slice(0, charIndex - 1));
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex + 1);
          setDisplayText(currentText.slice(0, charIndex + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pauseDuration]);

  return (
    <span className={cn('relative', className)}>
      {displayText}
      <motion.span
        className={cn('ml-1 inline-block align-text-bottom', cursorClassName)}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        |
      </motion.span>
    </span>
  );
}