import React from 'react';
import { Play, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { MovableElement } from './MovableElement';

export const Hero: React.FC = () => {
  const heroDescription = (PERSONAL_INFO as any).heroBio || 
    "Crafting high-converting digital product interfaces, bold brand identities, and visually stunning creative assets. Blending engineering precision with artistic vision to transform ambitious ideas into unforgettable digital experiences.";

  return (
    <section id="home" className="min-h-screen overflow-hidden relative flex flex-col justify-center py-20 lg:py-16">
      <div className="max-w-[1440px] 2xl:max-w-[1650px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16 pt-16 lg:pt-12 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 2xl:gap-20 items-center">

          {/* Left Column: Text & CTAs (Scaled up & adjusted) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            <MovableElement sectionId="hero" elementId="hero-badge">
              <div className="relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 mb-6 sm:mb-8 glass-pill rounded-full text-sm sm:text-base font-semibold tracking-wide text-[#1A1A1A]/90 dark:text-white/90 shadow-sm hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0000]" />
                <span>Hello There! Available For Hire</span>
              </div>
            </MovableElement>

            <MovableElement sectionId="hero" elementId="hero-heading">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.85rem] 2xl:text-[5.5rem] font-extrabold leading-[1.08] text-[#1A1A1A] dark:text-white tracking-tight mb-6 sm:mb-8">
                I'm <span className="font-serif-accent text-[#FF0000] font-bold">{PERSONAL_INFO.name},</span>
                <br />
                <span className="text-[#1A1A1A] dark:text-white">Graphic Designer</span>
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.65rem] xl:text-[4.25rem] font-extrabold text-[#1A1A1A]/85 dark:text-white/85">
                  Based in Pakistan.
                </span>
              </h1>
            </MovableElement>

            <MovableElement sectionId="hero" elementId="hero-bio">
              <p className="text-base sm:text-lg lg:text-xl xl:text-[1.28rem] text-[#1A1A1A]/65 dark:text-white/70 max-w-2xl xl:max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal">
                {heroDescription}
              </p>
            </MovableElement>

            <MovableElement sectionId="hero" elementId="hero-buttons">
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <a
                  href="#projects"
                  id="hero-view-portfolio-btn"
                  className="inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full glass-pill-red text-white font-bold text-base sm:text-lg hover:shadow-[0_14px_38px_rgba(255,0,0,0.45)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  <span>View My Portfolio</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </span>
                </a>

                <a
                  href="#contact"
                  id="hero-hire-me-btn"
                  className="inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 sm:py-4.5 rounded-full glass-pill text-[#1A1A1A] dark:text-white font-bold text-base sm:text-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-5 h-5 text-[#FF0000]" />
                </a>
              </div>
            </MovableElement>
          </div>

          {/* Right Column: Hero Logo / Profile Showcase (Scaled up & adjusted) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <MovableElement sectionId="hero" elementId="hero-logo">
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[460px] xl:max-w-[520px] 2xl:max-w-[580px] aspect-square flex items-center justify-center">

                {/* Subtle Soft Ambient Glow */}
                <div className="absolute -inset-8 rounded-full bg-[#FF0000]/[0.05] dark:bg-[#FF0000]/[0.07] blur-2xl pointer-events-none" />

                {/* Outer Dashed Orbiting Ring */}
                <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-dashed border-[#FF0000]/20 animate-spin-slow pointer-events-none" />

                {/* Main Avatar Glass Orb */}
                <div className="relative w-full h-full rounded-full p-3 sm:p-4 xl:p-5 glass-panel shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/40">
                    <img
                      src="./hero-image.png"
                      alt="Uzair CREATES Logo"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = "./logo.png"; }}
                    />
                  </div>
                </div>

                {/* Revolving Floating Badge */}
                <div className="absolute top-4 sm:top-8 -right-2 sm:-right-4 w-26 h-26 sm:w-30 sm:h-30 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full glass-panel text-[#1A1A1A] dark:text-white flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.12)] z-20">
                  <svg className="w-full h-full p-2.5 animate-spin-slow" viewBox="0 0 100 100">
                    <path id="heroRevertCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[9.5px] font-extrabold tracking-[0.2em] uppercase fill-[#1A1A1A] dark:fill-white">
                      <textPath href="#heroRevertCirclePath" startOffset="0%">AVAILABLE • FOR HIRE • NOW •</textPath>
                    </text>
                  </svg>
                  <div className="absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full bg-[#FF0000] flex items-center justify-center shadow-[0_4px_16px_rgba(255,0,0,0.45)]">
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>

              </div>
            </MovableElement>
          </div>

        </div>
      </div>
    </section>
  );
};
