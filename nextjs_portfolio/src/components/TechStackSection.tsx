import { PortfolioData } from '@/data/portfolio-data';
import { FadeIn } from './FadeIn';

export function TechStackSection() {
  const { techStack, skillGroups } = PortfolioData;

  return (
    <section id="skills" className="border-t border-[color-mix(in_srgb,var(--rule)_40%,transparent)] py-14 md:py-20">
      <FadeIn className="wrap">
        <h2 data-s className="h2 max-w-[16ch]">
          Tech stack <span className="accent-word">&amp;</span>{' '}
          <span className="whitespace-nowrap">engineering skills</span>
        </h2>

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
              className="grid grid-cols-[28px_1fr] md:grid-cols-[40px_220px_1fr] gap-x-4 gap-y-2 py-6 border-b border-[var(--rule)]"
            >
              <span className="text-[11px] text-[var(--faint)] pt-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[14px] font-semibold">{g.title}</h3>
              <p className="col-start-2 md:col-start-3 text-[14px] leading-[1.9] text-[var(--ink)]">
                {g.skills.map((s, j) => (
                  <span key={s}>
                    {j > 0 && (
                      <span className="text-[var(--faint)]" aria-hidden>
                        {' / '}
                      </span>
                    )}
                    {s}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
