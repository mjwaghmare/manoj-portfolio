'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: '76px',
          height: '40px',
          backgroundColor: 'var(--toggle-track)',
        }}
        className="rounded-full opacity-60"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{
        width: '76px',
        height: '40px',
        backgroundColor: 'var(--toggle-track)',
      }}
      className="relative rounded-full p-[4px] flex items-center justify-between cursor-pointer focus:outline-none transition-colors duration-300 select-none"
    >
      {/* Sliding Knob (32px diameter): sitting on the theme to switch to */}
      <div
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'var(--toggle-knob)',
        }}
        className={`absolute top-[4px] bottom-[4px] rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isDark ? 'translate-x-0' : 'translate-x-[36px]'
        }`}
      />

      {/* Sun Icon slot (left) */}
      <div className="z-10 w-[32px] h-[32px] flex items-center justify-center pointer-events-none">
        <Sun
          size={18}
          className={`transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-[var(--toggle-icon)]'
          }`}
        />
      </div>

      {/* Moon Icon slot (right) */}
      <div className="z-10 w-[32px] h-[32px] flex items-center justify-center pointer-events-none">
        <Moon
          size={18}
          className={`transition-colors duration-300 ${
            !isDark ? 'text-white' : 'text-[var(--toggle-icon)]'
          }`}
        />
      </div>
    </button>
  );
}
