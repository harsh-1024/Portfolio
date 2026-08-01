// src/components/common/SectionWrapper.tsx

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function SectionWrapper({ id, children, className, 'aria-label': ariaLabel }: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('container-custom section', className)}
    >
      {children}
    </section>
  );
}