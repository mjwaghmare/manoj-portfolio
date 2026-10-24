'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];
const sectionIds = [...navItems.map((n) => n.id), 'contact'];

export function Header() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `relative px-3 min-h-11 inline-flex items-center text-[13px] font-medium transition-colors hover:text-[var(--accent)] ${
      active === id ? 'text-[var(--ink)]' : 'text-[var(--muted)]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur border-b border-[color-mix(in_srgb,var(--rule)_40%,transparent)]">
      <div className="wrap flex items-center justify-between gap-4 min-h-[72px]">
        <a href="#home" aria-label="MWStudio, back to top" className="inline-flex items-center min-h-11">
          <Image
            src={getAssetPath(PortfolioData.profile.logoAsset)}
            alt="MWStudio"
            width={468}
            height={96}
            priority
            className="h-[28px] w-auto"
          />
        </a>

        <nav aria-label="Primary" className="hidden md:flex flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={linkClass(item.id)}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute left-3 right-3 bottom-2 h-px bg-[var(--accent)] origin-left transition-transform duration-300 ${
                  active === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center min-h-11 px-5 mr-1 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-semibold hover:opacity-85 transition-opacity"
          >
            Let&apos;s talk
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--ink)] hover:bg-[var(--rule)]/50 transition-colors cursor-pointer"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-[color-mix(in_srgb,var(--rule)_40%,transparent)] bg-[var(--bg)]"
        >
          <div className="wrap flex flex-col py-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'location' : undefined}
                className={`min-h-12 flex items-center justify-between text-[18px] display border-b border-[color-mix(in_srgb,var(--rule)_40%,transparent)] ${
                  active === item.id ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="sm:hidden mt-4 inline-flex items-center justify-center min-h-11 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[14px] font-semibold"
            >
              Let&apos;s talk
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
