'use client';

import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';

/**
 * Reveals every descendant marked `data-s` as it scrolls into view.
 * Items sharing a parent (cards, stats) get a small stagger.
 */
export function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-s]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((i) => (i.style.opacity = '1'));
      return;
    }
    const stops = items.map((item) => {
      const index = Array.from(item.parentElement?.children ?? []).indexOf(item);
      return inView(
        item,
        () => {
          animate(
            item,
            { opacity: [0, 1], y: [18, 0] },
            { duration: 0.6, ease: 'easeOut', delay: Math.min(index, 3) * 0.08 },
          );
        },
        { margin: '0px 0px -40px 0px' },
      );
    });
    return () => stops.forEach((stop) => stop());
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
