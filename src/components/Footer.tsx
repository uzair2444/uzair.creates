import React from 'react';
import { Instagram, Linkedin, Dribbble, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { MovableElement } from './MovableElement';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-black/8 glass-panel text-[#1A1A1A]">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <MovableElement sectionId="footer" elementId="footer-logo">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <a href="#home" className="flex items-center gap-2.5 font-bold text-lg text-[#1A1A1A]">
                <div className="w-8 h-8 rounded-full glass-card overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img 
                    src="./logo.png" 
                    alt="Uzair CREATES Logo" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "./hero-image.png"; }}
                  />
                </div>
                <span>Uzair<span className="text-[#FF0000]">.</span></span>
              </a>
              <span className="hidden sm:inline text-[#1A1A1A]/25">•</span>
              <span className="text-xs sm:text-sm text-[#1A1A1A]/45">
                © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
              </span>
            </div>
          </MovableElement>

          <MovableElement sectionId="footer" elementId="footer-social">
            <div className="flex items-center gap-3">
              <a href={PERSONAL_INFO.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full glass-card hover:bg-[#FF0000] text-[#1A1A1A] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={(PERSONAL_INFO as any).linkedinUrl || "https://www.linkedin.com/in/uzair-creates-695862427/"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" id="footer-linkedin-btn" className="w-10 h-10 rounded-full glass-card hover:bg-[#FF0000] text-[#1A1A1A] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer" aria-label="Dribbble" className="w-10 h-10 rounded-full glass-card hover:bg-[#FF0000] text-[#1A1A1A] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                <Dribbble className="w-4 h-4" />
              </a>
              <button onClick={scrollToTop} aria-label="Scroll to top" className="w-10 h-10 rounded-full glass-card hover:bg-[#FF0000] text-[#1A1A1A] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm ml-2 cursor-pointer">
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </MovableElement>

        </div>
      </div>
    </footer>
  );
};
