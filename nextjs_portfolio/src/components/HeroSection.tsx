'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import { Spotlight } from './ui/spotlight';
import { FlipWords } from './ui/flip-words';

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
      {/* Studio Backlight Aura in Dark Mode */}
      <div className="absolute left-[6%] top-[12%] w-[72%] h-[76%] rounded-full bg-gradient-to-tr from-blue-600/40 via-indigo-600/35 to-cyan-400/30 blur-[45px] pointer-events-none dark:opacity-100 opacity-20" />

      {/* Background Organic Blob (width 390/500 = 78%, height 384/440 = 87.2%, top 56/440 = 12.7%) */}
      <motion.svg
        animate={{
          scale: [1, 1.025, 1],
          rotate: [0, 1.2, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-0 top-[12.7%] w-[78%] h-[87.2%] pointer-events-none"
        viewBox="0 0 390 384"
        fill="none"
      >
        <defs>
          {/* Luminous Dark Mode Gradient */}
          <linearGradient id="darkBlobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.85" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="blobGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" />
          </filter>
        </defs>

        {/* Dark Mode Luminous Glow Aura */}
        <path
          d={blobPath}
          fill="url(#darkBlobGradient)"
          filter="url(#blobGlow)"
          className="hidden dark:block opacity-60"
        />

        {/* Light Mode Blob */}
        <path
          d={blobPath}
          fill="var(--blob)"
          className="dark:hidden transition-colors duration-300"
        />

        {/* Dark Mode Gradient Blob */}
        <path
          d={blobPath}
          fill="url(#darkBlobGradient)"
          className="hidden dark:block opacity-90 transition-opacity"
        />
      </motion.svg>

      {/* Cut-out Portrait (left 4/500 = 0.8%, right 26/500 = 5.2%, top 0, bottom 0) */}
      <div className="absolute left-[0.8%] right-[5.2%] top-0 bottom-0 overflow-hidden rounded-b-[18px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAssetPath(profile.photoAsset)}
          alt={`Portrait of ${profile.name}`}
          className="w-full h-full object-contain object-bottom select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Animated Handwritten Hero Note in Caveat */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [-11.5, -9, -11.5],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-0 top-[5.4%] text-center font-handwriting text-[21px] sm:text-[25px] lg:text-[28px] leading-[1.12] text-[var(--handwriting)] select-none z-10"
      >
        {profile.handwrittenNote.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.15, duration: 0.4 }}
            whileHover={{ scale: 1.1, color: '#38bdf8' }}
            className="cursor-default transition-colors duration-200"
          >
            {line}
          </motion.div>
        ))}
      </motion.div>

      {/* Hand-drawn Animated Curved Arrow */}
      <motion.svg
        animate={{
          y: [0, 4, 0],
          x: [0, -2, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[2.8%] top-[38.1%] w-[9.6%] h-[19%] pointer-events-none z-10"
        viewBox="0 0 48 84"
        fill="none"
      >
        {/* Animated Quadratic curve */}
        <motion.path
          d="M 37.44 0 Q 50.4 63, 5.76 75.6"
          stroke="var(--handwriting)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        />
        {/* Animated Arrowhead */}
        <motion.path
          d="M 5.76 75.6 L 17.45 78.27 M 5.76 75.6 L 14.33 67.0"
          stroke="var(--handwriting)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        />
      </motion.svg>
    </div>
  );
}

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

      {/* Action Buttons with Rich Hover States */}
      <div className="flex flex-wrap items-center gap-[18px]">
        <ResumeDownloadButton width={180} height={48} />

        <button
          type="button"
          onClick={scrollToContact}
          className="group w-[180px] h-[48px] px-4 rounded-[14px] border-[1.5px] border-[var(--outline-btn-border)] bg-[var(--outline-btn-bg)] text-[var(--heading)] text-[15px] font-semibold flex items-center justify-center gap-2 hover:-translate-y-1 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 hover:shadow-[0_12px_28px_rgba(56,189,248,0.22)] active:translate-y-0 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-sm"
        >
          <Mail size={16} className="transition-transform duration-300 group-hover:scale-110" />
          <span>Contact Me</span>
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
