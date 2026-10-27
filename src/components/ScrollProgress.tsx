'use client';

import React, { useEffect, useRef } from 'react';
import { scroll } from 'motion';

/** Thin accent line along the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '1';
    return scroll((progress) => {
      el.style.transform = `scaleX(${progress})`;
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ opacity: 0, transform: 'scaleX(0)' }}
      className="print:hidden fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-(--accent)"
    />
  );
}
