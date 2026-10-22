'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { SectionTitle } from './SectionContainer';

function LinkedInGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function GitHubGlyph({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function YouTubeGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function ContactSection() {
  const profile = PortfolioData.profile;
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full pt-[6px] pb-[32px] scroll-mt-20">
      <div className="max-w-[1244px] mx-auto px-5 sm:px-10 lg:px-[72px]">
        {/* Top Dividing Line */}
        <div
          className="w-full h-[1px] mb-7 sm:mb-[34px]"
          style={{ backgroundColor: 'var(--tile-border)' }}
        />

        {/* Section Intro */}
        <div className="flex flex-col items-start mb-6 sm:mb-7">
          <SectionTitle text="Let's Work Together" accentWord="Together" />
          <div className="h-4" />
          <p className="text-[16px] leading-[1.65] text-[var(--text-muted)] max-w-[620px]">
            {profile.contactMessage}
          </p>
        </div>

        {/* Contact Items: In Flutter, OverflowBar spread across the whole section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 flex-wrap">
          {/* Email Item */}
          <div className="group relative flex items-center p-1.5 sm:px-2 sm:py-1.5 rounded-[12px] hover:bg-[var(--tile-bg)] transition-colors">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div
                style={{
                  backgroundColor: 'var(--contact-icon-bg)',
                  color: 'var(--contact-icon)',
                }}
                className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0"
              >
                <Mail size={20} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[14px] font-bold text-[var(--heading)] leading-snug">
                  Email
                </span>
                <span className="text-[12.5px] text-[var(--text-muted)] leading-snug">
                  {profile.email}
                </span>
              </div>
            </a>

            {/* Copy button (revealed on hover or mobile) */}
            <button
              type="button"
              onClick={copyEmail}
              title="Copy email"
              aria-label="Copy email"
              className="ml-2 p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--link)] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
          </div>

          {/* LinkedIn Item */}
          <a
            href={profile.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-1.5 sm:px-2 sm:py-1.5 rounded-[12px] hover:bg-[var(--tile-bg)] transition-colors cursor-pointer group"
          >
            <div className="w-[42px] h-[42px] rounded-[8px] bg-[#0A66C2] flex items-center justify-center text-white shrink-0">
              <LinkedInGlyph size={22} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-bold text-[var(--heading)] leading-snug">
                {profile.linkedin.label}
              </span>
              <span className="text-[12.5px] text-[var(--text-muted)] group-hover:text-[var(--link)] transition-colors leading-snug">
                {profile.linkedin.handle}
              </span>
            </div>
          </a>

          {/* GitHub Item */}
          <a
            href={profile.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-1.5 sm:px-2 sm:py-1.5 rounded-[12px] hover:bg-[var(--tile-bg)] transition-colors cursor-pointer group"
          >
            <div className="w-[42px] h-[42px] flex items-center justify-center text-[var(--heading)] shrink-0">
              <GitHubGlyph size={32} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-bold text-[var(--heading)] leading-snug">
                {profile.github.label}
              </span>
              <span className="text-[12.5px] text-[var(--text-muted)] group-hover:text-[var(--link)] transition-colors leading-snug">
                {profile.github.handle}
              </span>
            </div>
          </a>

          {/* YouTube Item */}
          <a
            href={profile.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-1.5 sm:px-2 sm:py-1.5 rounded-[12px] hover:bg-[var(--tile-bg)] transition-colors cursor-pointer group"
          >
            <div className="w-[42px] h-[42px] rounded-[8px] bg-[#FF0000] flex items-center justify-center text-white shrink-0">
              <YouTubeGlyph size={22} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-bold text-[var(--heading)] leading-snug">
                {profile.youtube.label}
              </span>
              <span className="text-[12.5px] text-[var(--text-muted)] group-hover:text-[var(--link)] transition-colors leading-snug">
                {profile.youtube.handle}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
