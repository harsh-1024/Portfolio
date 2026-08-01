// src/components/testimonials/TestimonialsSection.tsx

'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { testimonials } from '@/data/testimonials';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section" aria-label="Testimonials">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle mx-auto">
            Feedback from colleagues, clients, and collaborators I've worked with.
          </p>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Quote icon background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-5">
            <Quote className="w-full h-full text-[var(--accent-500)]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TestimonialCard testimonial={current} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="icon-button glass-strong"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-[var(--accent-500)] w-8'
                      : 'bg-[var(--text-muted)]/50 hover:bg-[var(--text-muted)]'
                  )}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="icon-button glass-strong"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      className="card p-8 text-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Rating */}
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < testimonial.rating ? 'fill-[var(--accent-500)] text-[var(--accent-500)]' : 'text-[var(--border-light)]'
            )}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-600)] flex items-center justify-center overflow-hidden">
          {testimonial.avatar && (
            <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="text-left">
          <p className="font-semibold text-[var(--text-primary)]">{testimonial.author}</p>
          <p className="text-sm text-[var(--text-muted)]">{testimonial.role} at {testimonial.company}</p>
          {testimonial.project && (
            <p className="text-xs text-[var(--accent-500)] mt-1">Project: {testimonial.project}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}