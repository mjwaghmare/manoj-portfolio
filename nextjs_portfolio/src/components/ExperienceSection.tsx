'use client';

import React from 'react';
import { PortfolioData } from '@/data/portfolio-data';
import { SectionContainer } from './SectionContainer';

export function ExperienceSection() {
  const experiences = PortfolioData.experiences;

  return (
    <SectionContainer id="experience" title="Professional Experience">
      <div className="flex flex-col pt-2.5">
        {experiences.map((exp, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === experiences.length - 1;

          return (
            <div key={exp.company + exp.period} className="group flex items-stretch transition-colors duration-200">
              {/* Desktop Period (width: 150px, left-padded 14px, top-padded 2px) */}
              <div className="hidden sm:block w-[150px] shrink-0 pl-[14px] pt-[2px]">
                <span className="font-display text-[20px] leading-[1.25] tracking-[1px] uppercase text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--link)]">
                  {exp.period}
                </span>
              </div>

              {/* Timeline Rail (width: 16px) */}
              <div className="w-[16px] shrink-0 flex flex-col items-center">
                {/* Top line segment (8px) */}
                <div
                  className={`w-[1.5px] h-[8px] transition-colors duration-200 ${
                    isFirst ? 'bg-transparent' : 'bg-[var(--timeline-line)] group-hover:bg-[var(--link)]/50'
                  }`}
                />

                {/* 9px Timeline Dot with Glow on Hover */}
                <div
                  className="w-[9px] h-[9px] rounded-full shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px_#38bdf8]"
                  style={{ backgroundColor: 'var(--timeline-dot)' }}
                />

                {/* Bottom line segment */}
                <div
                  className={`w-[1.5px] flex-1 transition-colors duration-200 ${
                    isLast ? 'bg-transparent' : 'bg-[var(--timeline-line)] group-hover:bg-[var(--link)]/50'
                  }`}
                />
              </div>

              {/* Spacing between Rail and Content (18px mobile, 32px desktop) */}
              <div className="w-[18px] sm:w-[32px] shrink-0" />

              {/* Content Column */}
              <div
                className={`flex-1 ${
                  isLast ? 'pb-2' : 'pb-8 sm:pb-12'
                } sm:pr-10`}
              >
                {/* Mobile Period */}
                <div className="sm:hidden mb-1.5">
                  <span className="font-display text-[17px] leading-[1.25] tracking-[1px] uppercase text-[var(--text-muted)] group-hover:text-[var(--link)] transition-colors">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-[18px] leading-[1.4] font-bold text-[var(--heading)] tracking-[-0.2px] transition-colors duration-200 group-hover:text-[var(--link)]">
                  {exp.company}
                </h3>
                <div className="h-1" />
                <p className="text-[15px] leading-[1.4] font-semibold text-[var(--role-text)]">
                  {exp.role}
                </p>
                <div className="h-2" />
                <p className="text-[16.5px] leading-[1.72] text-[var(--text-muted)] font-normal">
                  {exp.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
