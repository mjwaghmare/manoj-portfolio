'use client';

import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'motion';

/** Fades the direct children in one after another on mount. */
export function Stagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((i) => (i.style.opacity = '1'));
      return;
    }
    const controls = animate(
      items,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.7, ease: 'easeOut', delay: stagger(0.1) },
    );
    return () => controls.stop();
  }, []);

  return (
    <div ref={ref} className={`stagger ${className}`}>
      {children}
    </div>
  );
}
