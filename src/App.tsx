import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { AdminPasswordModal } from './components/AdminPasswordModal';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const SECTION_COMPONENTS: Record<string, React.FC> = {
  hero: Hero,
  services: Services,
  about: About,
  projects: Portfolio,
  journey: Journey,
  contact: Contact,
  faq: FAQ,
};

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const { 
    sectionOrder, 
    isAdminMode, 
    toggleAdminMode, 
    logout,
    moveSection, 
    saveStatus, 
    publishWebsite, 
    openSettingsModal 
  } = useAdmin();
  const { theme } = useTheme();

  useEffect(() => {
    const navSectionIds = ['home', 'services', 'projects', 'journey', 'about', 'contact'];

    const handleScroll = () => {
      // 1. If near top of page, always highlight 'home'
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // 2. If scrolled near the bottom of page, highlight 'contact'
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 90) {
        setActiveSection('contact');
        return;
      }

      // 3. Find the section currently in view based on getBoundingClientRect
      const targetPoint = 240;
      let foundSection = '';

      for (const id of navSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetPoint && rect.bottom > targetPoint) {
            foundSection = id;
            break;
          }
        }
      }

      if (foundSection) {
        setActiveSection(foundSection);
      } else {
        // Fallback: pick the closest section that started above the target point
        let closestId = 'home';
        let minDiff = Infinity;
        for (const id of navSectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= targetPoint) {
              const diff = targetPoint - rect.top;
              if (diff < minDiff) {
                minDiff = diff;
                closestId = id;
              }
            }
          }
        }
        setActiveSection(closestId);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const orderedSections = sectionOrder.filter(s => SECTION_COMPONENTS[s]);

  return (
    <div 
      className="min-h-screen bg-[#0B0C10] text-[#F3F4F6] selection:bg-[#FF0000] selection:text-white flex flex-col font-sans relative overflow-x-hidden"
    >
      {/* 
        STILL / FIXED BACKGROUND
        Simple, clean, stationary studio dark background
      */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./bg-still-dark.svg')" }}
        aria-hidden="true"
      />

      <Navbar activeSection={activeSection} />

      {isAdminMode && (
        <div className="fixed top-22 sm:top-24 left-1/2 -translate-x-1/2 z-50 glass-panel px-4 sm:px-6 py-2.5 rounded-full shadow-[0_8px_32px_rgba(255,0,0,0.25)] flex items-center gap-2 sm:gap-4 max-w-[95vw] overflow-x-auto border border-[#FF0000]/30 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000] animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">Admin Mode</span>
          </div>

          <div className="h-4 w-px bg-white/20 shrink-0" />

          {/* Status Badge */}
          <div className="text-xs flex items-center gap-1.5 whitespace-nowrap">
            {saveStatus === 'saving' && (
              <span className="text-amber-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Saving to src/...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                ✓ Saved to src/
              </span>
            )}
            {saveStatus === 'publishing' && (
              <span className="text-blue-300 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                Publishing to dist/...
              </span>
            )}
            {saveStatus === 'published' && (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                ✓ Live & Published to dist/
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-red-400 flex items-center gap-1 font-medium">
                ⚠️ Save/Build Error
              </span>
            )}
            {saveStatus === 'idle' && (
              <span className="text-white/60">
                Use ⬆️⬇️ to reorder
              </span>
            )}
          </div>

          <div className="h-4 w-px bg-white/20 shrink-0" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={openSettingsModal}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1"
              title="Edit Profile, Text & Layout"
            >
              <span>⚙️ Site Settings</span>
            </button>

            <button
              onClick={() => publishWebsite()}
              disabled={saveStatus === 'publishing'}
              className="px-3 py-1 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-xs font-bold text-white transition-all shadow-[0_2px_8px_rgba(255,0,0,0.4)] cursor-pointer disabled:opacity-50 flex items-center gap-1"
              title="Publish all changes to dist for all viewers"
            >
              <span>💾 Publish Website</span>
            </button>

            <button
              onClick={logout}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium text-white/80 transition-all cursor-pointer flex items-center gap-1"
              title="Lock Admin Mode (Requires password to enter again)"
            >
              <span>🔒 Lock</span>
            </button>

            <button
              onClick={toggleAdminMode}
              className="w-6 h-6 rounded-full hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
              title="Hide Admin Bar"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <AdminSettingsModal />
      <AdminPasswordModal />

      <main className="flex-1 relative z-10">
        {orderedSections.map((sectionId) => {
          const Component = SECTION_COMPONENTS[sectionId];
          const idx = orderedSections.indexOf(sectionId);
          return (
            <div key={sectionId} className="relative">
              {isAdminMode && (
                <div className="absolute top-4 left-4 z-50 flex flex-col gap-1">
                  <button
                    onClick={() => moveSection(sectionId, 'up')}
                    disabled={idx === 0}
                    className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/80 transition-all cursor-pointer shadow-md"
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => moveSection(sectionId, 'down')}
                    disabled={idx === orderedSections.length - 1}
                    className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/80 transition-all cursor-pointer shadow-md"
                  >
                    ⬇️
                  </button>
                </div>
              )}
              <Component />
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </ThemeProvider>
  );
}
