import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { FooterSection } from '@/components/FooterSection';

export default function Home() {
  return (
    <>
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
