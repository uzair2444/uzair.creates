import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { useAdmin } from '../context/AdminContext';
import { MovableElement } from './MovableElement';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdminMode, toggleAdminMode, openSettingsModal, saveStatus } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#journey', label: 'Journey' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div
      className={`fixed left-0 right-0 z-50 pointer-events-none flex flex-col items-center transition-all duration-300 ease-out ${
        scrolled
          ? 'top-0 px-0 sm:px-4 lg:px-6'
          : 'top-3.5 sm:top-5 px-3 sm:px-6 lg:px-8'
      }`}
    >
      <header
        className={`pointer-events-auto w-full transition-all duration-300 ease-out ${
          scrolled
            ? 'max-w-[1240px] lg:max-w-[1440px] 2xl:max-w-[1650px] rounded-none sm:rounded-b-2xl lg:rounded-b-3xl border-t-0 border-x-0 sm:border-x border-b border-white/15 bg-[#0B0C10]/85 backdrop-blur-2xl py-2.5 sm:py-3 px-4 sm:px-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
            : 'max-w-[1150px] lg:max-w-[1360px] 2xl:max-w-[1550px] rounded-full border border-white/10 glass-panel py-2.5 sm:py-3 px-4 sm:px-6 shadow-[0_4px_24px_rgba(0,0,0,0.15)]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <MovableElement sectionId="navbar" elementId="nav-logo">
              <a href="#home" id="nav-logo" aria-label="Home" className="flex items-center group">
                <div className="w-9.5 h-9.5 sm:w-10.5 sm:h-10.5 rounded-full glass-card flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-200">
                  <img
                    src="./logo.png"
                    alt="Uzair CREATES"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.currentTarget.src = "./hero-image.png"; }}
                  />
                </div>
              </a>
            </MovableElement>

            <MovableElement sectionId="navbar" elementId="nav-brand">
              <div className="hidden lg:flex items-center">
                <span className="text-white font-extrabold text-base sm:text-lg tracking-tight">
                  Uzair<span className="text-[#FF0000]">.</span>
                </span>
              </div>
            </MovableElement>
          </div>

          <MovableElement sectionId="navbar" elementId="nav-links">
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 md:-translate-x-6 lg:-translate-x-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    id={`nav-${link.label.toLowerCase()}`}
                    className={`px-4 py-2 lg:px-4.5 lg:py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'glass-pill-red text-white shadow-[0_4px_16px_rgba(255,0,0,0.3)]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </MovableElement>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Admin Settings Button */}
            <div className="relative flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (!isAdminMode) toggleAdminMode();
                  openSettingsModal();
                }}
                id="admin-toggle-btn"
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                  isAdminMode
                    ? 'bg-[#FF0000] text-white shadow-[0_4px_16px_rgba(255,0,0,0.35)]'
                    : 'glass-card text-white/70 hover:text-[#FF0000] hover:bg-white/10'
                }`}
                title={isAdminMode ? 'Click to open Site Settings Modal (or Exit)' : 'Enter Admin Mode & Settings'}
              >
                <Settings className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ${isAdminMode ? 'rotate-90' : ''}`} />
              </button>

              {isAdminMode && (
                <button
                  onClick={openSettingsModal}
                  className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white/90 font-medium transition-all cursor-pointer shadow-sm"
                  title="Open Site Content & Layout Settings"
                >
                  Edit Site
                </button>
              )}

              {isAdminMode && saveStatus === 'saving' && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              )}
              {isAdminMode && saveStatus === 'saved' && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
              )}
              {isAdminMode && saveStatus === 'publishing' && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden text-white w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full glass-card hover:bg-white/10 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </header>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="pointer-events-auto mt-2 w-full max-w-[1000px] rounded-3xl glass-panel p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <MovableElement sectionId="navbar" elementId="nav-mobile-links">
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 px-4 text-sm font-semibold rounded-2xl transition-all ${
                      isActive
                        ? 'glass-pill-red text-white shadow-[0_4px_16px_rgba(255,0,0,0.25)]'
                        : 'text-[#1A1A1A]/80 hover:bg-white/40 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </MovableElement>
          <MovableElement sectionId="navbar" elementId="nav-mobile-cta">
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 rounded-full glass-pill-red text-white font-bold text-sm transition-all shadow-[0_4px_16px_rgba(255,0,0,0.25)]"
              >
                Contact Me
              </a>
            </div>
          </MovableElement>
        </div>
      )}
    </div>
  );
};
