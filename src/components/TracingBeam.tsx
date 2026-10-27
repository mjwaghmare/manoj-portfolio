'use client';

import React, { useEffect, useRef } from 'react';
import { inView, scroll } from 'motion';

/**
 * Timeline line down the left of its children. The accent part grows with scroll,
 * and each `[data-dot]` child inside lights up once the beam reaches it.
 */
export function TracingBeam({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const bar = fill.current;
    if (!el || !bar) return;
    const dots = Array.from(el.querySelectorAll<HTMLElement>('[data-dot]'));
    const light = (d: HTMLElement) => {
      d.style.backgroundColor = 'var(--accent)';
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bar.style.transform = 'scaleY(1)';
      dots.forEach(light);
      return;
    }

    const stopScroll = scroll(
      (progress) => {
        bar.style.transform = `scaleY(${progress})`;
      },
      {
        target: el,
        offset: ['start 65%', 'end 65%'],
      },
    );
    const stopDots = dots.map((d) =>
      inView(
        d,
        () => {
          light(d);
          return () => {
            d.style.backgroundColor = 'var(--rule)';
          };
        },
        { margin: '0px 0px -35% 0px' },
      ),
    );
    return () => {
      stopScroll();
      stopDots.forEach((stop) => stop());
    };
  }, []);

  return (
    <div ref={root} className={`relative pl-6 md:pl-8 ${className}`}>
      <div aria-hidden className="absolute left-0.75 top-0 bottom-0 w-px bg-(--rule)">
        <div
          ref={fill}
          className="h-full w-full origin-top bg-(--accent) will-change-transform"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
      {children}
    </div>
  );
}
