import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { PortfolioData, Project } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';
import { DualDeviceMockup } from './PhoneMockups';
import { ViewportGifMedia } from './ViewportGifMedia';
import { FadeIn } from './FadeIn';
import { RevealHeading } from './RevealHeading';

const panelColors: Record<string, string> = {
  'Marine Marketplace': '#0F6B5C',
  'Live Auction App': '#1F5FD0',
  PopVerse: '#6B4FB8',
  'Smartwatch Companion': '#047857',
  'Travel Discovery': '#0369A1',
  'Tesla Controller': '#9F1239',
};

function ProjectCardTop({ project }: { project: Project }) {
  // Case 1: Full-width Animated GIF (e.g. Tesla Controller) with viewport-play observer
  if (project.gifAsset) {
    return (
      <div className="relative h-52.5 w-full overflow-hidden bg-[#0A0D14]">
        <ViewportGifMedia
          gifSrc={project.gifAsset}
          posterSrc={project.posterAsset}
          alt={`${project.title} animated preview`}
        />
        {/* Top Floating Glass Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] bg-black/65 text-white backdrop-blur-md border border-white/15 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {project.category}
          </span>
        </div>
        {/* Bottom subtle gradient scrim with headline */}
        <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-linear-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none">
          <p className="display text-[22px] leading-[1.1] text-white">
            {project.headline} <span className="italic">{project.headlineAccent}</span>
          </p>
        </div>
      </div>
    );
  }

  // Case 2: Full-width Banner Image (e.g. Travel Discovery)
  if (project.bannerImage) {
    return (
      <div className="relative h-52.5 w-full overflow-hidden bg-[#0A0D14]">
        <Image
          src={getAssetPath(project.bannerImage)}
          alt={`${project.title} banner preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Top Floating Glass Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] bg-black/65 text-white backdrop-blur-md border border-white/15 shadow-sm">
            {project.category}
          </span>
        </div>
        {/* Bottom subtle gradient scrim with headline */}
        <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-linear-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none">
          <p className="display text-[22px] leading-[1.1] text-white">
            {project.headline} <span className="italic">{project.headlineAccent}</span>
          </p>
        </div>
      </div>
    );
  }

  // Case 3 & 4: App Screenshots (app ss) OR Dummy fallback
  return (
    <div
      className="relative h-52.5 overflow-hidden p-5 text-white"
      style={{ background: panelColors[project.title] ?? project.bannerGradient[0] }}
    >
      <div className="relative z-10 max-w-[52%]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
          {project.category}
        </p>
        <p className="display mt-2 text-[26px] leading-[1.05]">
          {project.headline} <span className="italic">{project.headlineAccent}</span>
        </p>
      </div>
      {/* iOS + Android pair, laid out on the original 1.94:1 banner and pinned to the panel's bottom edge */}
      <div className="absolute inset-x-0 bottom-0 aspect-[1.94/1]">
        <DualDeviceMockup project={project} />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const typeLabel = project.type === 'professional' ? 'Client App' : 'Personal Project';

  return (
    <article
      data-s
      className="group flex flex-col bg-(--surface) border border-(--rule) rounded-[20px] overflow-hidden transition-[translate,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1.5 hover:border-(--accent)/45 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
    >
      <ProjectCardTop project={project} />

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-(--ink)">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 hover:text-(--accent)"
              >
                {project.title}
                <ExternalLink size={13} aria-hidden />
              </a>
            ) : (
              project.title
            )}
          </h3>
          <span className="shrink-0 rounded-full border border-(--rule) px-2.5 py-0.5 text-[10px] text-(--muted)">
            {typeLabel}
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-[1.65] text-(--muted) flex-1">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-(--ink)">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { projects, moreProjectsUrl } = PortfolioData;

  return (
    <section id="projects" className="border-t border-(--rule)/40 py-14 md:py-20">
      <FadeIn className="wrap">
        <div data-s className="flex items-end justify-between gap-4 mb-10">
          <RevealHeading>
            Featured <span className="accent-word">projects</span>
          </RevealHeading>
          <a
            href={moreProjectsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="More on GitHub (opens in a new tab)"
            className="inline-flex items-center gap-1.5 min-h-11 text-[13px] font-semibold text-(--accent) hover:underline"
          >
            More on GitHub <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
