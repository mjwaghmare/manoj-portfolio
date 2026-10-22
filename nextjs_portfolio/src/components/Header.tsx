'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';

// Flutter navOrder: home, about, experience, projects, skills (Contact is handled by "Let's talk" button)
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const allSections = [...navItems, { id: 'contact', label: 'Contact' }];
      const sections = allSections.map((item) => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[64px] bg-[var(--background)] border-b border-[var(--tile-border)] transition-colors duration-300">
      <div className="max-w-[1244px] h-full mx-auto px-5 sm:px-10 lg:px-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="flex items-center cursor-pointer focus:outline-none py-2"
          aria-label="Back to top"
        >
          <Image
            src={getAssetPath(PortfolioData.profile.logoAsset)}
            alt={PortfolioData.profile.name}
            width={120}
            height={24}
            className="h-[24px] w-auto object-contain dark:brightness-110"
            priority
          />
        </button>

        {/* Centered Desktop Nav Items */}
        <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`group relative px-4 py-2.5 text-[15px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[var(--nav-active)] font-semibold'
                      : 'text-[var(--text-muted)] font-medium hover:text-[var(--heading)]'
                  }`}
                >
                  <span className="relative inline-block py-1">
                    {item.label}
                    {/* Animated growing and shrinking underline on hover and active */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#818cf8] transition-all duration-300 ease-out origin-left ${
                        isActive
                          ? 'w-full opacity-100 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Let's talk CTA (hidden on mobile, visible on sm and up) */}
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            style={{
              background: 'linear-gradient(135deg, var(--button-g1), var(--button-g2))',
            }}
            className="hidden sm:inline-flex items-center justify-center h-[40px] px-[20px] rounded-full text-white text-[14px] font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(94,61,247,0.45)] active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
          >
            Let&apos;s talk
          </button>

          {/* Theme Toggle Pill */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--tile-bg)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bg-[var(--background)] border-b border-[var(--tile-border)] p-6 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-3">
            {[...navItems, { id: 'contact', label: 'Contact' }].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`group relative text-left py-2 text-[16px] transition-colors cursor-pointer w-fit ${
                    isActive
                      ? 'text-[var(--link)] font-bold'
                      : 'text-[var(--text-muted)] font-medium hover:text-[var(--foreground)]'
                  }`}
                >
                  <span className="relative inline-block pb-1">
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#818cf8] transition-all duration-300 ease-out origin-left ${
                        isActive
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              style={{
                background: 'linear-gradient(135deg, var(--button-g1), var(--button-g2))',
              }}
              className="mt-3 w-full flex items-center justify-center h-[42px] rounded-full text-white text-[15px] font-semibold"
            >
              Let&apos;s talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
