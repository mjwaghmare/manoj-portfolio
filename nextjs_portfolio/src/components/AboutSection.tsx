'use client';

import React from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { SectionTitle } from './SectionContainer';

import { CardSpotlight } from './ui/card-spotlight';

export function AboutSection() {
  const profile = PortfolioData.profile;
  const highlights = PortfolioData.aboutHighlights;

  const intro = (
    <div className="flex flex-col items-start">
      <SectionTitle text="About Me" />
      <div className="h-3" />
      <p className="text-[16px] leading-[1.65] text-[var(--body)] font-normal">
        {profile.about}
      </p>
    </div>
  );

  const highlightCards = (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
      {highlights.map((item, idx) => (
        <CardSpotlight
          key={idx}
          radius={220}
          className="min-h-[140px] sm:min-h-[164px] p-2 sm:p-4 rounded-[18px] flex flex-col items-center justify-center text-center cursor-default"
        >
          {/* Top slot (height 30px mobile, 36px desktop) */}
          <div className="h-[30px] sm:h-[36px] flex items-center justify-center transition-transform duration-300 group-hover/spotlight:scale-110">
            {item.value ? (
              <span className="font-display text-[36px] sm:text-[44px] leading-none tracking-[0.5px] text-brand-gradient">
                {item.value}
              </span>
            ) : item.icon === 'work' ? (
              <Briefcase size={32} className="text-[#8B51FA]" />
            ) : (
              <MapPin size={32} className="text-[#5B85F7]" />
            )}
          </div>

          <div className="h-2.5 sm:h-3.5" />

          {/* Label slot */}
          <span className="text-[12px] sm:text-[14px] leading-[1.45] font-semibold text-[var(--heading)]/85 whitespace-pre-line text-center">
            {item.label}
          </span>
        </CardSpotlight>
      ))}
    </div>
  );

  return (
    <section id="about" className="w-full py-5 sm:py-[22px] scroll-mt-20">
      <div className="max-w-[1244px] mx-auto px-5 sm:px-10 lg:px-[72px]">
        {/* Wide screens >= 1200px: side by side; Below 1200px: stacked */}
        <div className="hidden min-[1200px]:flex items-stretch gap-10">
          <div className="flex-1">{intro}</div>
          <div className="w-[512px] shrink-0 flex items-center">{highlightCards}</div>
        </div>

        <div className="flex min-[1200px]:hidden flex-col gap-6">
          {intro}
          {highlightCards}
        </div>
      </div>
    </section>
  );
}
