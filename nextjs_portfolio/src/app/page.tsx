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
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#345DE3] selection:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
