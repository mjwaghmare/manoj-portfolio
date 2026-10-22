'use client';

import React from 'react';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';
import { ResumeDownloadButton } from './ResumeDownloadButton';

function getBlobPath(width: number, height: number): string {
  const normalizedPoints = [
    [0.22, 0.3],
    [0.55, 0.12],
    [0.8, 0.02],
    [0.97, 0.3],
    [0.96, 0.72],
    [0.7, 0.97],
    [0.3, 0.95],
    [0.03, 0.7],
  ];

  const pts = normalizedPoints.map(([x, y]) => ({ x: x * width, y: y * height }));
  const n = pts.length;
  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return `${d} Z`;
}

function HeroVisual() {
  const profile = PortfolioData.profile;
  const blobPath = getBlobPath(390, 384);

  return (
    <div className="relative w-full max-w-[500px] aspect-[500/440] select-none mx-auto lg:mr-0">
      {/* Background Organic Blob (width 390/500 = 78%, height 384/440 = 87.2%, top 56/440 = 12.7%) */}
      <svg
        className="absolute left-0 top-[12.7%] w-[78%] h-[87.2%] pointer-events-none"
        viewBox="0 0 390 384"
        fill="none"
      >
        <defs>
          <filter id="blobGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" />
          </filter>
        </defs>
        {/* Glow halo in dark mode */}
        <path
          d={blobPath}
          fill="var(--blob-glow)"
          filter="url(#blobGlow)"
          className="transition-colors duration-300"
        />
        {/* Solid organic blob shape */}
        <path d={blobPath} fill="var(--blob)" className="transition-colors duration-300" />
      </svg>

      {/* Cut-out Portrait (left 4/500 = 0.8%, right 26/500 = 5.2%, top 0, bottom 0) */}
      <div className="absolute left-[0.8%] right-[5.2%] top-0 bottom-0 overflow-hidden rounded-b-[18px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAssetPath(profile.photoAsset)}
          alt={`Portrait of ${profile.name}`}
          className="w-full h-full object-contain object-bottom select-none pointer-events-none"
        />
      </div>

      {/* Handwritten Hero Note in Caveat (top 24/440 = 5.4%, right 0) */}
      <div
        className="absolute right-0 top-[5.4%] text-center font-handwriting text-[20px] sm:text-[24px] lg:text-[27px] leading-[1.08] text-[var(--handwriting)] transition-colors duration-300 pointer-events-none select-none z-10"
        style={{ transform: 'rotate(-11.5deg)' }}
      >
        {profile.handwrittenNote.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      {/* Hand-drawn Curved Arrow (top 168/440 = 38.1%, right 14/500 = 2.8%, width 48/500 = 9.6%, height 84/440 = 19%) */}
      <svg
        className="absolute right-[2.8%] top-[38.1%] w-[9.6%] h-[19%] pointer-events-none z-10"
        viewBox="0 0 48 84"
        fill="none"
      >
        {/* Quadratic curve */}
        <path
          d="M 37.44 0 Q 50.4 63, 5.76 75.6"
          stroke="var(--handwriting)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
        {/* Arrowhead */}
        <path
          d="M 5.76 75.6 L 17.45 78.27 M 5.76 75.6 L 14.33 67.0"
          stroke="var(--handwriting)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
}

import { Spotlight } from './ui/spotlight';
import { FlipWords } from './ui/flip-words';

export function HeroSection() {
  const profile = PortfolioData.profile;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const intro = (
    <div className="flex flex-col items-start w-full relative z-10">
      {/* Name and role tagline */}
      <span className="text-[11px] sm:text-[13.5px] font-bold tracking-[1px] sm:tracking-[1.6px] uppercase text-[var(--link)] mb-[14px]">
        {profile.name} · {profile.role}
      </span>

      {/* Main Headline with Aceternity FlipWords */}
      <h1 className="text-[31px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.18] tracking-[-0.6px] sm:tracking-[-0.9px] lg:tracking-[-1px] text-[var(--heading)] mb-[18px]">
        Building{' '}
        <FlipWords
          words={['high-performance', 'scalable', 'fluid', 'production-grade']}
          className="font-extrabold text-[var(--link)]"
        />
        <br />
        <span>mobile experiences</span>
      </h1>

      {/* Hero Intro text */}
      <p className="text-[17px] lg:text-[19px] leading-[1.78] text-[var(--hero-body)] mb-[32px] max-w-[560px]">
        {profile.heroIntroLines.join(' ')}
      </p>


      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-[18px]">
        <ResumeDownloadButton width={180} height={48} />

        <button
          type="button"
          onClick={scrollToContact}
          style={{
            borderColor: 'var(--outline-btn-border)',
            backgroundColor: 'var(--outline-btn-bg)',
            color: 'var(--heading)',
          }}
          className="w-[180px] h-[48px] px-4 rounded-[12px] border-[1.2px] text-[15px] font-semibold flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-none"
        >
          Contact Me
        </button>
      </div>
    </div>
  );

  return (
    <section id="home" className="relative w-full pt-[22px] sm:pt-[24px] pb-[24px] sm:pb-[44px] overflow-hidden">
      {/* Ambient Hero Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#38bdf8"
      />

      <div className="max-w-[1244px] mx-auto px-5 sm:px-10 lg:px-[72px] relative z-10">
        {/* Desktop: 57% / 43% side by side */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          <div className="w-[57%] pr-6">{intro}</div>
          <div className="w-[43%] flex justify-end">
            <HeroVisual />
          </div>
        </div>

        {/* Mobile / Tablet: Visual on top, intro below */}
        <div className="flex lg:hidden flex-col items-center">
          <div className="mb-7 w-full max-w-[360px]">
            <HeroVisual />
          </div>
          {intro}
        </div>
      </div>
    </section>
  );
}
