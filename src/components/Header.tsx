'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
];
const sectionIds = [...navItems.map((n) => n.id), 'contact'];

export function Header() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  // While a nav click is scrolling the page, ignore the sections it passes over.
  const locked = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const syncActive = useCallback(() => {
    const y = window.innerHeight * 0.47;
    for (const id of sectionIds) {
      const r = document.getElementById(id)?.getBoundingClientRect();
      if (r && r.top <= y && r.bottom > y) {
        setActive(id);
        return;
      }
    }
  }, []);

  const unlock = useCallback(() => {
    clearTimeout(unlockTimer.current);
    if (!locked.current) return;
    locked.current = false;
    syncActive();
  }, [syncActive]);

  const goTo = (id: string) => {
    setActive(id);
    locked.current = true;
    clearTimeout(unlockTimer.current);
    unlockTimer.current = setTimeout(unlock, 1200); // fallback if scrollend never fires
  };

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (locked.current) return;
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
    // The user taking over the scroll ends the lock early.
    window.addEventListener('scrollend', unlock);
    window.addEventListener('wheel', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scrollend', unlock);
      window.removeEventListener('wheel', unlock);
      window.removeEventListener('touchstart', unlock);
      clearTimeout(unlockTimer.current);
    };
  }, [unlock]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkClass = (id: string) =>
    `relative px-3 min-h-11 inline-flex items-center text-[13px] font-medium transition-colors hover:text-(--accent) ${
      active === id ? 'text-(--ink)' : 'text-(--muted)'
    }`;

  return (
    <header className="print:hidden sticky top-0 z-50 bg-(--bg)/90 backdrop-blur border-b border-(--rule)/40">
      <div className="wrap flex items-center justify-between gap-4 min-h-18">
        <a
          href="#home"
          onClick={() => goTo('home')}
          aria-label="MWStudio, back to top"
          className="inline-flex items-center min-h-11"
        >
          <Image
            src={getAssetPath(PortfolioData.profile.logoAsset)}
            alt="MWStudio"
            width={468}
            height={96}
            priority
            className="h-7 w-auto"
          />
        </a>

        <nav aria-label="Primary" className="hidden md:flex flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => goTo(item.id)}
              aria-current={active === item.id ? 'location' : undefined}
              className={linkClass(item.id)}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute left-3 right-3 bottom-2 h-px bg-(--accent) origin-left transition-transform duration-300 ${
                  active === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="#contact"
            onClick={() => goTo('contact')}
            className="hidden sm:inline-flex items-center justify-center min-h-11 px-5 mr-1 rounded-full bg-(--ink) text-(--bg) text-[13px] font-semibold hover:opacity-85 transition-opacity"
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
            className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-full text-(--ink) hover:bg-(--rule)/50 transition-colors cursor-pointer"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-(--rule)/40 bg-(--bg)"
        >
          <div className="wrap flex flex-col py-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setOpen(false);
                  goTo(item.id);
                }}
                aria-current={active === item.id ? 'location' : undefined}
                className={`min-h-12 flex items-center justify-between text-[18px] display border-b border-(--rule)/40 ${
                  active === item.id ? 'text-(--accent)' : 'text-(--ink)'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => {
                setOpen(false);
                goTo('contact');
              }}
              className="sm:hidden mt-4 inline-flex items-center justify-center min-h-11 rounded-full bg-(--ink) text-(--bg) text-[14px] font-semibold"
            >
              Let&apos;s talk
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
