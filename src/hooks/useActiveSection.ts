// src/hooks/useActiveSection.ts

'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

interface UseActiveSectionOptions {
  sectionIds: string[];
  headerHeight?: number;
  rootMargin?: string;
  thresholds?: number[];
}

export function useActiveSection({
  sectionIds,
  headerHeight = 80,
  rootMargin,
  thresholds = [0.15, 0.3, 0.5, 0.7, 1.0],
}: UseActiveSectionOptions) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialized = useRef(false);
  const sectionElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const headerHeightRef = useRef(headerHeight);

  headerHeightRef.current = headerHeight;

  const sectionIdsKey = useMemo(() => sectionIds.join(','), [sectionIds]);
  const thresholdsKey = useMemo(() => thresholds.join(','), [thresholds]);

  const getRootMargin = useCallback(() => {
    if (rootMargin) return rootMargin;
    const top = -(headerHeightRef.current + 16);
    const bottom = -Math.round(window.innerHeight * 0.45);
    return `${top}px 0px ${bottom}px 0px`;
  }, [rootMargin]);

  const createObserver = useCallback(() => {
    return new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!sectionIds.includes(entry.target.id)) continue;
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        }

        if (bestEntry) {
          const newActive = '#' + bestEntry.target.id;
          setActiveId((prev) => (prev === newActive ? prev : newActive));
        }
      },
      {
        rootMargin: getRootMargin(),
        threshold: thresholds,
      }
    );
  }, [sectionIds, thresholds, getRootMargin]);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const observer = createObserver();
    observerRef.current = observer;

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionElementsRef.current.set(id, el);
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      isInitialized.current = false;
    };
  }, [sectionIds, sectionIdsKey, createObserver]);

  useEffect(() => {
    const handleResize = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        const observer = createObserver();
        observerRef.current = observer;
        sectionElementsRef.current.forEach((el) => observer.observe(el));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sectionIdsKey, thresholdsKey, createObserver]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeId) return;

      let bestSection: HTMLElement | null = null;
      let maxVisibleArea = 0;

      for (const el of sectionElementsRef.current.values()) {
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibleArea = visibleHeight * rect.width;

        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          bestSection = el;
        }
      }

      if (bestSection) {
        setActiveId('#' + bestSection.id);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeId]);

  return activeId;
}