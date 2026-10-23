'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

/** Cycles through `words` in the accent style, sliding each one out and the next one in. */
export function WordRotate({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    if (!first.current) {
      animate(el, { opacity: [0, 1], y: [12, 0] }, { duration: 0.35, ease: 'easeOut' });
    }
    first.current = false;

    const timer = setTimeout(async () => {
      await animate(el, { opacity: 0, y: -12 }, { duration: 0.25, ease: 'easeIn' });
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [index, words.length, interval]);

  return (
    <span className="inline-grid align-baseline" aria-hidden>
      {/* hidden copies reserve the width of the longest word so the text after it never moves */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <span ref={ref} className="accent-word col-start-1 row-start-1 whitespace-nowrap">
        {words[index]}
      </span>
    </span>
  );
}
