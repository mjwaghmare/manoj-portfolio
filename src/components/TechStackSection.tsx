import { Fragment } from 'react';
import { PortfolioData } from '@/data/portfolio-data';
import { FadeIn } from './FadeIn';
import { RevealHeading } from './RevealHeading';

export function TechStackSection() {
  const { techStack, skillGroups } = PortfolioData;

  return (
    <section id="skills" className="border-t border-[color-mix(in_srgb,var(--rule)_40%,transparent)] py-14 md:py-20">
      <FadeIn className="wrap">
        <RevealHeading className="max-w-[16ch]">
          Tech stack <span className="accent-word">&amp;</span>{' '}
          <span className="whitespace-nowrap">engineering skills</span>
        </RevealHeading>

        <ul data-s className="mt-10 py-6 border-y border-[var(--rule)] flex flex-wrap gap-x-10 gap-y-2">
          {techStack.map((t) => (
            <li key={t.name} className="display text-[28px] leading-tight">
              {t.name}
            </li>
          ))}
        </ul>

        <ol>
          {skillGroups.map((g, i) => (
            <li
              data-s
              key={g.title}
              className="grid grid-cols-[28px_1fr] md:grid-cols-[40px_220px_1fr] gap-x-4 gap-y-2 py-5 md:py-6 border-b border-[var(--rule)]"
            >
              <span className="text-[11px] text-[var(--faint)] pt-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[15px] md:text-[14px] font-semibold">{g.title}</h3>
              <p className="col-start-2 md:col-start-3 text-[15px] md:text-[14px] leading-[1.85] text-[var(--ink)]">
                {g.skills.map((s, j) => (
                  // The separator trails each item and stays with it, so a wrapped line never starts with "/".
                  <Fragment key={s}>
                    <span className="whitespace-nowrap">
                      {s}
                      {j < g.skills.length - 1 && (
                        <span className="text-[var(--faint)]" aria-hidden>
                          {' / '}
                        </span>
                      )}
                    </span>{' '}
                  </Fragment>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
