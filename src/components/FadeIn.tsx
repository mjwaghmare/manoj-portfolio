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
      items.forEach((i) => {
        i.style.opacity = '1';
        i.style.transform = 'none';
      });
      return;
    }
    const stops = items.map((item) => {
      const index = Array.from(item.parentElement?.children ?? []).indexOf(item);
      return inView(
        item,
        () => {
          item.style.willChange = 'transform, opacity';
          const animation = animate(
            item,
            { opacity: [0, 1], y: [12, 0] },
            {
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
              delay: Math.min(index, 4) * 0.035,
            },
          );
          animation.finished.then(() => {
            item.style.willChange = 'auto';
          });
        },
        // Pre-trigger 50px before entering viewport so items arrive already animating smoothly without hesitation
        { margin: '0px 0px 50px 0px' },
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
