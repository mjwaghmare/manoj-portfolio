import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { FooterSection } from '@/components/FooterSection';
import { PortfolioData } from '@/data/portfolio-data';
import { SITE_URL } from '@/lib/site';

const { profile } = PortfolioData;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  image: `${SITE_URL}og.png`,
  address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
  knowsAbout: ['Flutter', 'Dart', 'Android', 'iOS'],
  sameAs: [profile.linkedin.url, profile.github.url, profile.youtube.url],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
