import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { MovableElement } from './MovableElement';

export const About: React.FC = () => {

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="glass-panel rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 md:p-16 xl:p-20 text-[#1A1A1A] relative">
          
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#FF0000]/[0.06] rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center relative z-10">
            
            <div className="lg:col-span-5 flex justify-center">
              <MovableElement sectionId="about" elementId="about-image">
                <div className="relative w-64 sm:w-72 md:w-80 xl:w-96 h-80 sm:h-[22rem] md:h-[26rem] xl:h-[30rem] 2xl:h-[34rem]">
                  <div className="w-full h-full rounded-3xl overflow-hidden glass-panel border-4 border-white/40 shadow-xl">
                    <img 
                      src="./hero-image.png" 
                      alt="Uzair CREATES Logo" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "./logo.png"; }}
                    />
                  </div>
                </div>
              </MovableElement>
            </div>

            <div className="lg:col-span-7 flex flex-col items-start">
              
              <MovableElement sectionId="about" elementId="about-heading">
                <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-[#1A1A1A]/70 mb-3">
                  <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
                  <span>About Me</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#1A1A1A] tracking-tight mb-6">
                  Who is <span className="font-serif-accent text-[#FF0000]">{PERSONAL_INFO.name}</span>?
                </h2>
              </MovableElement>

              <MovableElement sectionId="about" elementId="about-bio">
                <p className="text-base sm:text-lg xl:text-xl text-[#1A1A1A]/55 leading-relaxed mb-8 max-w-2xl xl:max-w-3xl font-normal">
                  {PERSONAL_INFO.bio} With a degree in Computer Systems Engineering from UET Peshawar, I blend technical intuition with creative flair to build design systems and interfaces that elevate digital products.
                </p>
              </MovableElement>

              <MovableElement sectionId="about" elementId="about-stats">
                <div className="glass-card rounded-2xl p-6 sm:p-7 grid grid-cols-3 gap-6 sm:gap-10 mb-10 w-full max-w-xl">
                  <MovableElement sectionId="about" elementId="about-stat-projects">
                    <div>
                      <div className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold text-white tracking-tight">100+</div>
                      <div className="text-xs sm:text-sm text-[#1A1A1A]/45 font-medium mt-1">Projects Completed</div>
                    </div>
                  </MovableElement>
                  <MovableElement sectionId="about" elementId="about-stat-industries">
                    <div>
                      <div className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold text-white tracking-tight">50+</div>
                      <div className="text-xs sm:text-sm text-[#1A1A1A]/45 font-medium mt-1">Industries Covered</div>
                    </div>
                  </MovableElement>
                  <MovableElement sectionId="about" elementId="about-stat-years">
                    <div>
                      <div className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold text-white tracking-tight">4+</div>
                      <div className="text-xs sm:text-sm text-[#1A1A1A]/45 font-medium mt-1">Years Experience</div>
                    </div>
                  </MovableElement>
                </div>
              </MovableElement>

              <MovableElement sectionId="about" elementId="about-buttons">
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-8 w-full">
                  <MovableElement sectionId="about" elementId="about-download-btn">
                    <a
                      href="/Uzair_Ahmad_CV.pdf"
                      download="Uzair_Ahmad_CV.pdf"
                      id="about-download-cv-btn"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-pill-red text-white font-bold text-sm hover:shadow-[0_12px_36px_rgba(255,0,0,0.35)] transition-all duration-300 group cursor-pointer shrink-0"
                    >
                      <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Download CV</span>
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </a>
                  </MovableElement>

                  <MovableElement sectionId="about" elementId="about-signature">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="font-signature text-3xl sm:text-4xl text-[#FF0000] select-none whitespace-nowrap">
                        Uzair Ahmad
                      </div>
                    </div>
                  </MovableElement>
                </div>
              </MovableElement>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
