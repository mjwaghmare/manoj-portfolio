'use client';

import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PortfolioData, Project } from '@/data/portfolio-data';
import { SectionContainer } from './SectionContainer';
import { CardSpotlight } from './ui/card-spotlight';

function PhoneSketchMockup({
  gradient,
  angle,
  style,
}: {
  gradient: [string, string];
  angle: number;
  style: React.CSSProperties;
}) {
  const [c1, c2] = gradient;

  return (
    <div
      className="absolute aspect-[1/2.05] rounded-[16%] bg-[#0B0C10] p-[3.5%] border-[1.5px] border-[#3A3D46] shadow-[0_14px_28px_rgba(0,0,0,0.38)] overflow-hidden select-none pointer-events-none"
      style={{
        ...style,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Inner Screen */}
      <div className="relative w-full h-full bg-white rounded-[13%] overflow-hidden flex flex-col p-[6%] pt-[18%]">
        {/* Dynamic Island */}
        <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[34%] h-[10%] bg-black rounded-full z-10" />

        {/* Top Mini Banner */}
        <div
          className="w-full h-[36%] rounded-[6px] p-[6%] flex flex-col justify-end gap-1 mb-[8%]"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <div className="w-[60%] h-[3px] bg-white/90 rounded-full" />
          <div className="w-[38%] h-[3px] bg-white/55 rounded-full" />
        </div>

        {/* 3 Mini Chips */}
        <div className="flex gap-1 mb-[8%]">
          <div className="flex-1 h-[6px] rounded-full" style={{ backgroundColor: c1 }} />
          <div className="flex-1 h-[6px] rounded-full opacity-35" style={{ backgroundColor: c1 }} />
          <div className="flex-1 h-[6px] rounded-full opacity-35" style={{ backgroundColor: c1 }} />
        </div>

        {/* 2 Mini List Rows */}
        <div className="flex flex-col gap-1.5">
          <div className="p-1 rounded-[6px] bg-[#F5F7FB] flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-[4px] opacity-40 shrink-0" style={{ backgroundColor: c1 }} />
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-[80%] h-[2.5px] rounded-full opacity-60" style={{ backgroundColor: c1 }} />
              <div className="w-[50%] h-[2.5px] rounded-full opacity-40" style={{ backgroundColor: c1 }} />
            </div>
          </div>
          <div className="p-1 rounded-[6px] bg-[#F5F7FB] flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-[4px] opacity-40 shrink-0" style={{ backgroundColor: c1 }} />
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-[80%] h-[2.5px] rounded-full opacity-60" style={{ backgroundColor: c1 }} />
              <div className="w-[50%] h-[2.5px] rounded-full opacity-40" style={{ backgroundColor: c1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [c1, c2] = project.bannerGradient;
  const typeLabel = project.type === 'professional' ? 'Client App' : 'Personal Project';

  return (
    <CardSpotlight
      radius={380}
      className="p-0 overflow-hidden flex flex-col h-full bg-[var(--project-card-bg)] border-[var(--project-card-border)] rounded-[20px]"
    >
      {/* Top Banner (Aspect ratio: 1.94) */}
      <div
        className="relative w-full aspect-[1.94/1] overflow-hidden select-none"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        {/* Soft white radial center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.2),transparent_70%)]" />

        {/* Banner Left Headline Text */}
        <div className="absolute left-[6.4%] top-0 bottom-0 w-[45%] flex flex-col justify-center z-10">
          <span className="text-[10.5px] font-bold tracking-[1.2px] uppercase text-white/80 mb-2">
            {project.category}
          </span>
          <h4 className="text-[21px] font-bold leading-[1.2] tracking-[-0.3px] text-white">
            {project.headline}{' '}
            <span className="font-editorial italic font-semibold">{project.headlineAccent}</span>
          </h4>
        </div>

        {/* Dual Phone Frames */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Back Phone: left 74%, top 25%, size 25%, angle: 9deg */}
          <PhoneSketchMockup
            gradient={project.bannerGradient}
            angle={9}
            style={{ left: '74%', top: '25%', width: '25%' }}
          />
          {/* Front Phone: left 55%, top 12%, size 29%, angle: -3deg */}
          <PhoneSketchMockup
            gradient={project.bannerGradient}
            angle={-3}
            style={{ left: '55%', top: '12%', width: '29%' }}
          />
        </div>
      </div>

      {/* Card Body: padding 20px 22px 20px 20px */}
      <div className="p-5 sm:p-[22px] flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[19px] leading-[1.3] font-bold tracking-[-0.2px] text-[var(--project-title)] hover:text-[var(--link)] flex items-center gap-2 transition-colors truncate"
              >
                <span>{project.title}</span>
                <ExternalLink size={17} className="text-[var(--project-body)] shrink-0" />
              </a>
            ) : (
              <span className="text-[19px] leading-[1.3] font-bold tracking-[-0.2px] text-[var(--project-title)] truncate">
                {project.title}
              </span>
            )}
          </div>

          {/* Type Label */}
          <div
            style={{ borderColor: 'var(--project-card-border)' }}
            className="px-[9px] py-[4px] rounded-[6px] border shrink-0"
          >
            <span className="text-[11.5px] font-semibold text-[var(--project-body)] tracking-[0.2px] whitespace-nowrap">
              {typeLabel}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] leading-[1.65] text-[var(--project-body)] mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags Row: SkillChips (pill full-rounded) */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: 'var(--tag-bg)',
                color: 'var(--tag-text)',
              }}
              className="px-3 py-1.5 rounded-full text-[12.5px] leading-[1.3] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardSpotlight>
  );
}

export function ProjectsSection() {
  const { projects, moreProjectsUrl } = PortfolioData;

  const viewAllButton = (
    <a
      href={moreProjectsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[var(--link)] hover:opacity-85 transition-opacity"
    >
      <span>View All Projects</span>
      <ArrowRight size={17} />
    </a>
  );

  return (
    <SectionContainer id="projects" title="Featured Projects" trailing={viewAllButton}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="sm:hidden mt-6 text-center">
        <a
          href={moreProjectsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[var(--link)]"
        >
          <span>View All Projects</span>
          <ArrowRight size={17} />
        </a>
      </div>
    </SectionContainer>
  );
}
