'use client';

import React from 'react';
import Image from 'next/image';
import {
  Workflow,
  Gauge,
  Rocket,
  Cloud,
  Puzzle,
  Lock,
} from 'lucide-react';
import { PortfolioData, SkillGroup } from '@/data/portfolio-data';
import { SectionContainer } from './SectionContainer';
import { HoverCard } from './HoverCard';
import { getAssetPath } from '@/lib/utils';

const iconMap: Record<SkillGroup['icon'], React.ReactNode> = {
  architecture: <Workflow size={22} className="text-[#2F74F2]" />,
  speed: <Gauge size={22} className="text-[#2F74F2]" />,
  rocket: <Rocket size={22} className="text-[#2F74F2]" />,
  cloud: <Cloud size={22} className="text-[#2F74F2]" />,
  extension: <Puzzle size={22} className="text-[#2F74F2]" />,
  security: <Lock size={22} className="text-[#2F74F2]" />,
};

export function TechStackSection() {
  const { techStack, skillGroups } = PortfolioData;

  return (
    <SectionContainer id="skills" title="Tech Stack">
      <div className="flex flex-col gap-2.5 sm:gap-4">
        {/* Top 4 Core Platform Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {techStack.map((item) => (
            <HoverCard
              key={item.name}
              className="h-[96px] sm:h-[136px] flex flex-col items-center justify-center"
            >
              <div className="h-[28px] sm:h-[44px] flex items-center justify-center">
                <Image
                  src={getAssetPath(item.svgAsset)}
                  alt={item.name}
                  width={44}
                  height={44}
                  className={`w-[28px] h-[28px] sm:w-[44px] sm:h-[44px] object-contain ${
                    item.monochrome ? 'dark:invert' : ''
                  }`}
                />
              </div>

              <div className="h-2.5 sm:h-6" />

              <span className="text-[12px] sm:text-[14px] font-medium text-[var(--role-text)] truncate max-w-[90%]">
                {item.name}
              </span>
            </HoverCard>
          ))}
        </div>

        {/* 6 Categorized Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {skillGroups.map((group) => (
            <HoverCard key={group.title} className="p-[22px] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                {iconMap[group.icon]}
                <h3 className="text-[17px] font-bold text-[var(--heading)]">
                  {group.title}
                </h3>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: 'var(--badge-bg)',
                      color: 'var(--badge-text)',
                    }}
                    className="px-3 py-1.5 rounded-[8px] text-[13.5px] font-medium transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
