'use client';

import React from 'react';
import Image from 'next/image';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{ backgroundColor: 'var(--footer-bg)' }}
      className="w-full transition-colors duration-300"
    >
      <div className="max-w-[1244px] mx-auto px-5 sm:px-10 lg:px-[72px]">
        {/* Desktop: Height 56px, Row with space-between */}
        <div className="hidden sm:flex h-[56px] items-center justify-between gap-6">
          <button
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer focus:outline-none"
            aria-label="Back to top"
          >
            <Image
              src={getAssetPath(PortfolioData.profile.logoAsset)}
              alt={PortfolioData.profile.name}
              width={110}
              height={22}
              className="h-[22px] w-auto object-contain dark:brightness-110"
            />
          </button>

          <p className="text-[14.5px] text-[var(--text-muted)] text-right">
            © {currentYear} {PortfolioData.profile.name}. All rights reserved.
          </p>
        </div>

        {/* Mobile: Vertical padding 18px, Column */}
        <div className="flex sm:hidden flex-col items-center py-[18px] text-center gap-3">
          <button
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer focus:outline-none"
            aria-label="Back to top"
          >
            <Image
              src={getAssetPath(PortfolioData.profile.logoAsset)}
              alt={PortfolioData.profile.name}
              width={110}
              height={22}
              className="h-[22px] w-auto object-contain dark:brightness-110"
            />
          </button>

          <p className="text-[14.5px] text-[var(--text-muted)]">
            © {currentYear} {PortfolioData.profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
