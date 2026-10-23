'use client';

import React from 'react';
import Image from 'next/image';
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

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur border-b border-[color-mix(in_srgb,var(--rule)_40%,transparent)]">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 py-2 min-h-[72px]">
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

        <nav aria-label="Primary" className="order-3 md:order-none w-full md:w-auto flex flex-wrap justify-center md:flex-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3 min-h-11 inline-flex items-center text-[13px] font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center justify-center min-h-11 px-5 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-semibold hover:opacity-85 transition-opacity"
          >
            Let&apos;s talk
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
