'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { animate } from 'motion';
import { Sun, Moon } from 'lucide-react';

const root = () => document.documentElement;

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ['class'] });
  return () => mo.disconnect();
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => root().classList.contains('dark'),
    () => false,
  );

  const btn = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (btn.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate(btn.current.querySelector('svg')!, { rotate: [-90, 0], scale: [0.6, 1] }, { duration: 0.35, ease: 'easeOut' });
    }
    const next = !dark;
    root().classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      ref={btn}
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--ink)] hover:bg-[var(--rule)]/50 transition-colors cursor-pointer"
    >
      {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
