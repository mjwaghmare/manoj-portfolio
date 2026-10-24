import Image from 'next/image';
import { Mail } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';
import { FadeIn } from './FadeIn';
import { WordRotate } from './WordRotate';
import { Stagger } from './Stagger';
import { ResumeDownloadButton } from './ResumeDownloadButton';

export function HeroSection() {
  const profile = PortfolioData.profile;

  return (
    <section id="home" className="hero-fill flex flex-col justify-center py-12 md:py-16">
      <div className="wrap w-full grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16 items-end">
        <Stagger>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)] mb-6">
            {profile.name} · {profile.role}
          </p>
          <h1
            aria-label="Ideas into apps that feel reliable"
            className="display text-[clamp(52px,9vw,88px)] leading-[0.96] tracking-[-0.025em]"
          >
            Ideas into apps
            <br />
            that feel <WordRotate words={['reliable', 'fluid', 'fast', 'polished']} />
          </h1>
          <p className="mt-6 max-w-[40ch] text-[18px] md:text-[19px] leading-[1.55] text-balance text-[var(--muted)]">
            <strong className="font-semibold text-[var(--ink)]">7+ years</strong>
            {profile.heroIntroLines.join(' ').replace('7+ years', '').replace('production-ready', 'production\u2011ready')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
            <ResumeDownloadButton url={profile.resumeUrl} />
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-full border border-[var(--ink)] text-[var(--ink)] text-[14px] font-semibold hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            >
              <Mail size={16} aria-hidden />
              Contact Me
            </a>
            <p className="text-[12px] text-[var(--muted)] sm:ml-1">
              Resume updated <time dateTime={profile.resumeUpdated.iso}>{profile.resumeUpdated.label}</time>
            </p>
          </div>
        </Stagger>

        <FadeIn>
        <figure data-s className="relative w-full max-w-[340px] mx-auto md:mx-0 md:ml-auto">
          <div className="relative aspect-[526/475]">
            <div
              aria-hidden
              className="absolute inset-x-[14%] bottom-0 top-[4%] bg-[color-mix(in_srgb,var(--accent)_16%,var(--bg))] rounded-[58%_42%_52%_48%/48%_56%_44%_52%]"
            />
            <Image
              src={getAssetPath(profile.photoAsset)}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 768px) 340px, 90vw"
              className="object-contain object-bottom"
            />
          </div>
          <figcaption className="display italic mt-4 min-h-11 flex flex-wrap items-center gap-x-5 gap-y-1 text-[18px] text-[var(--muted)]">
            {profile.handwrittenNote.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </figcaption>
        </figure>
        </FadeIn>
      </div>
    </section>
  );
}
