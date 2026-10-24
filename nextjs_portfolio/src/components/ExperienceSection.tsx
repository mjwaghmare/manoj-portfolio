import { PortfolioData } from '@/data/portfolio-data';
import { FadeIn } from './FadeIn';
import { RevealHeading } from './RevealHeading';
import { TracingBeam } from './TracingBeam';

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-[color-mix(in_srgb,var(--rule)_40%,transparent)] py-14 md:py-20">
      <FadeIn className="wrap">
        <RevealHeading>
          Professional <span className="accent-word">experience</span>
        </RevealHeading>
        <TracingBeam className="mt-10">
          {PortfolioData.experiences.map((e) => (
            <article
              data-s
              key={e.company}
              className="relative grid gap-3 md:grid-cols-[1fr_2.2fr] md:gap-16 py-8 border-t border-[var(--rule)]"
            >
              <span
                data-dot
                aria-hidden
                className="absolute -left-6 md:-left-8 top-[42px] size-[7px] rounded-full bg-[var(--rule)] transition-colors duration-500"
              />
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)] pt-3">
                {e.period.replace(' - ', ' — ')}
              </p>
              <div>
                <h3 className="display text-[36px] leading-[1.1]">{e.company}</h3>
                <p className="mt-1 text-[13px] font-semibold text-[var(--accent)]">{e.role}</p>
                <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.75] text-[var(--muted)]">{e.description}</p>
              </div>
            </article>
          ))}
        </TracingBeam>
      </FadeIn>
    </section>
  );
}
