'use client';

import React from 'react';
import Image from 'next/image';
import {
  Workflow,
  Gauge,
  Rocket,
  Cloud,
  Puzzle,
  Shield,
  Layers,
  Cpu,
  Smartphone,
  Flame,
  GitBranch,
} from 'lucide-react';
import { PortfolioData, SkillGroup } from '@/data/portfolio-data';
import { SectionContainer } from './SectionContainer';
import { CardSpotlight } from './ui/card-spotlight';
import { InfiniteMovingRibbon } from './ui/infinite-moving-cards';
import { getAssetPath } from '@/lib/utils';

const iconMap: Record<SkillGroup['icon'], React.ReactNode> = {
  architecture: <Workflow size={20} className="text-[#38bdf8]" />,
  speed: <Gauge size={20} className="text-[#a855f7]" />,
  rocket: <Rocket size={20} className="text-[#3b82f6]" />,
  cloud: <Cloud size={20} className="text-[#06b6d4]" />,
  extension: <Puzzle size={20} className="text-[#ec4899]" />,
  security: <Shield size={20} className="text-[#10b981]" />,
};

const badgeGlowMap: Record<SkillGroup['icon'], string> = {
  architecture: 'bg-[#38bdf8]/10 border-[#38bdf8]/25 shadow-[0_0_12px_rgba(56,189,248,0.15)]',
  speed: 'bg-[#a855f7]/10 border-[#a855f7]/25 shadow-[0_0_12px_rgba(168,85,247,0.15)]',
  rocket: 'bg-[#3b82f6]/10 border-[#3b82f6]/25 shadow-[0_0_12px_rgba(59,130,246,0.15)]',
  cloud: 'bg-[#06b6d4]/10 border-[#06b6d4]/25 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
  extension: 'bg-[#ec4899]/10 border-[#ec4899]/25 shadow-[0_0_12px_rgba(236,72,153,0.15)]',
  security: 'bg-[#10b981]/10 border-[#10b981]/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
};

// Items for the Infinite Moving Ribbon
const marqueeChips = [
  { name: 'Flutter', icon: <Smartphone size={16} className="text-[#02569B]" /> },
  { name: 'Dart', icon: <Cpu size={16} className="text-[#0175C2]" /> },
  { name: 'Android SDK', icon: <Layers size={16} className="text-[#3DDC84]" /> },
  { name: 'iOS UIKit', icon: <Layers size={16} className="text-[#007AFF]" /> },
  { name: 'Clean Architecture', icon: <Workflow size={16} className="text-[#38bdf8]" /> },
  { name: 'BLoC / Cubit', icon: <Layers size={16} className="text-[#8B5CF6]" /> },
  { name: 'Firebase', icon: <Flame size={16} className="text-[#FFCA28]" /> },
  { name: 'Fastlane CI/CD', icon: <Rocket size={16} className="text-[#00F2FE]" /> },
  { name: 'Git & Pipelines', icon: <GitBranch size={16} className="text-[#F05032]" /> },
];

export function TechStackSection() {
  const { techStack, skillGroups } = PortfolioData;

  const ribbonItems = marqueeChips.map((chip, idx) => (
    <div
      key={idx}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-[var(--tile-bg)] shadow-sm backdrop-blur-md select-none"
    >
      {chip.icon}
      <span className="text-[13px] font-medium text-[var(--heading)]/85 whitespace-nowrap">
        {chip.name}
      </span>
    </div>
  ));

  return (
    <SectionContainer id="skills" title="Tech Stack & Engineering Skills">
      <div className="flex flex-col gap-6">
        {/* Infinite Moving Tech Ribbon */}
        <div className="w-full -mt-1 mb-2">
          <InfiniteMovingRibbon items={ribbonItems} speed="normal" direction="left" />
        </div>

        {/* Top 4 Core Platform Tiles with Aceternity CardSpotlight */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {techStack.map((item) => (
            <CardSpotlight
              key={item.name}
              radius={240}
              className="h-[105px] sm:h-[132px] p-0 flex flex-col items-center justify-center cursor-default"
            >
              <div className="h-[32px] sm:h-[44px] flex items-center justify-center transition-transform duration-300 group-hover/spotlight:scale-110">
                <Image
                  src={getAssetPath(item.svgAsset)}
                  alt={item.name}
                  width={44}
                  height={44}
                  className={`w-[32px] h-[32px] sm:w-[44px] sm:h-[44px] object-contain ${
                    item.monochrome ? 'dark:invert' : ''
                  }`}
                />
              </div>

              <div className="h-2.5 sm:h-4" />

              <span className="text-[13px] sm:text-[14.5px] font-semibold text-[var(--heading)] tracking-[-0.2px]">
                {item.name}
              </span>
            </CardSpotlight>
          ))}
        </div>

        {/* 6 Modernized Option A Glassmorphic Cards with Aceternity Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {skillGroups.map((group) => {
            const glowClass = badgeGlowMap[group.icon] || badgeGlowMap.architecture;

            return (
              <CardSpotlight
                key={group.title}
                radius={320}
                className="p-5 sm:p-6 flex flex-col min-h-[220px]"
              >
                {/* Header with Glowing Tinted Glass Icon Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/spotlight:scale-105 ${glowClass}`}
                  >
                    {iconMap[group.icon]}
                  </div>

                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[var(--heading)] tracking-[-0.2px]">
                    {group.title}
                  </h3>
                </div>

                {/* Sleek Option A Micro-Pills with Subtle Glow on Hover */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-[10px] text-[12.5px] sm:text-[13px] font-medium bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] text-[var(--heading)]/85 transition-all duration-200 hover:border-[#38bdf8]/60 hover:bg-[#38bdf8]/10 hover:text-[#38bdf8] hover:scale-[1.03] cursor-default select-none shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardSpotlight>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
