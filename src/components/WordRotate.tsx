'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

const CYCLES = 2;

/**
 * Cycles through `words` in the accent style. It pauses while the pointer is over
 * the heading, and stops on the first word after a couple of full cycles.
 */
export function WordRotate({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const steps = useRef(0);
  const prevIndex = useRef(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Pause while hovering the surrounding heading.
  useEffect(() => {
    const host = root.current?.closest('h1');
    if (!host) return;
    const on = () => setPaused(true);
    const off = () => setPaused(false);
    host.addEventListener('mouseenter', on);
    host.addEventListener('mouseleave', off);
    return () => {
      host.removeEventListener('mouseenter', on);
      host.removeEventListener('mouseleave', off);
    };
  }, []);

  // Animate the new word in when the index changes.
  useEffect(() => {
    if (prevIndex.current === index) return;
    prevIndex.current = index;
    const el = word.current;
    if (el) animate(el, { opacity: [0, 1], y: [12, 0] }, { duration: 0.35, ease: 'easeOut' });
  }, [index]);

  // Schedule the next swap.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (steps.current >= words.length * CYCLES) return;
    const el = word.current;
    if (!el) return;
    let active = true;
    const timer = setTimeout(async () => {
      await animate(el, { opacity: 0, y: -12 }, { duration: 0.25, ease: 'easeIn' });
      if (!active) return;
      steps.current += 1;
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [index, paused, words.length, interval]);

  return (
    <span ref={root} className="inline-grid align-baseline" aria-hidden>
      {/* hidden copies reserve the width of the longest word so the text after it never moves */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <span ref={word} className="accent-word col-start-1 row-start-1 whitespace-nowrap">
        {words[index]}
      </span>
    </span>
  );
}
