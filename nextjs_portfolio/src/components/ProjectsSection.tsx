'use client';

import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PortfolioData, Project } from '@/data/portfolio-data';
import { SectionContainer } from './SectionContainer';
import { CardSpotlight } from './ui/card-spotlight';
import { DualDeviceMockup } from './PhoneMockups';

function ProjectCard({ project }: { project: Project }) {
  const [c1, c2] = project.bannerGradient;
  const typeLabel = project.type === 'professional' ? 'Client App' : 'Personal Project';

  return (
    <CardSpotlight
      radius={380}
      className="group p-0 overflow-hidden flex flex-col h-full bg-[var(--project-card-bg)] border-[var(--project-card-border)] rounded-[20px]"
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

        {/* Dual Phone Frames: iOS (top/front) & Android (behind/back) using real mockups */}
        <DualDeviceMockup project={project} />
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
