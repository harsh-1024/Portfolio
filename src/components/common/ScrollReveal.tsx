// src/components/common/ScrollReveal.tsx

'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleUp, blurReveal, staggerContainer, staggerFast } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'variants'> {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'blurReveal';
  stagger?: boolean;
  staggerFast?: boolean;
  delay?: number;
  className?: string;
  asChild?: boolean;
}

const variantMap = {
  fadeUp,
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  scaleUp,
  blurReveal,
};

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, variant = 'fadeUp', stagger: useStagger = false, staggerFast: useStaggerFast = false, delay = 0, className, asChild = false, ...props }, ref) => {
    const Component = asChild ? motion.div : 'div';
    
    const variants = useStagger 
      ? (useStaggerFast ? staggerFast : staggerContainer) 
      : variantMap[variant];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={variants}
        className={cn(className)}
        {...props}
      >
        {typeof children === 'function' ? (children as Function)({ variant: variantMap[variant] }) : children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

export function RevealItem({ children, delay = 0, className, ...props }: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}