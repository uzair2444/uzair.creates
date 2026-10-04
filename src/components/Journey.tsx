import React from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EDUCATION_ITEMS, WORK_ITEMS } from '../data';
import { MovableElement } from './MovableElement';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-20 md:py-28 relative">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16">
        
        <MovableElement sectionId="journey" elementId="journey-heading">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#1A1A1A]/70 mb-3">
              <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
              <span>Education &amp; Work</span>
              <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] tracking-tight">
              My <span className="font-serif-accent text-[#FF0000]">Academic &amp; Professional</span> Journey
            </h2>
            <p className="text-[#1A1A1A]/55 text-base sm:text-lg mt-4 font-normal max-w-2xl mx-auto">
              Bridging technical engineering precision with creative aesthetic direction across leading institutions and creative studios.
            </p>
          </div>
        </MovableElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          
          <MovableElement sectionId="journey" elementId="journey-education">
            <div className="glass-panel glass-panel-hover rounded-3xl p-8 sm:p-10 xl:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-13 h-13 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(255,0,0,0.25)]">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Education</h3>
                    <span className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">Academic Foundation</span>
                  </div>
                </div>

                <div className="space-y-6 divide-y divide-black/8">
                  {EDUCATION_ITEMS.map((item, idx) => (
                    <MovableElement key={idx} sectionId="journey" elementId={`edu-item-${idx}`}>
                      <div className={idx > 0 ? 'pt-6' : ''}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-bold text-[#1A1A1A] mb-2.5">
                          <Calendar className="w-3.5 h-3.5 text-[#FF0000]" />
                          <span>{item.period}</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#1A1A1A] tracking-tight mb-1">{item.institution}</h4>
                        <div className="text-sm font-semibold text-[#FF0000] mb-2">{item.role}</div>
                        <p className="text-sm text-[#1A1A1A]/55 leading-relaxed font-normal">{item.description}</p>
                      </div>
                    </MovableElement>
                  ))}
                </div>
              </div>

              <MovableElement sectionId="journey" elementId="journey-edu-note">
                <div className="mt-8 pt-6 border-t border-black/8 flex items-center gap-2 text-xs font-medium text-[#1A1A1A]/45">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Certified Degrees &amp; Official Transcript Verification</span>
                </div>
              </MovableElement>
            </div>
          </MovableElement>

          <MovableElement sectionId="journey" elementId="journey-work">
            <div className="glass-panel glass-panel-hover rounded-3xl p-8 sm:p-10 xl:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-13 h-13 rounded-2xl glass-card text-[#FF0000] flex items-center justify-center shadow-sm">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Work Experience</h3>
                    <span className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">Design &amp; Industry Roles</span>
                  </div>
                </div>

                <div className="space-y-6 divide-y divide-black/8">
                  {WORK_ITEMS.map((item, idx) => (
                    <MovableElement key={idx} sectionId="journey" elementId={`work-item-${idx}`}>
                      <div className={idx > 0 ? 'pt-6' : ''}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-bold text-[#1A1A1A] mb-2.5">
                          <Calendar className="w-3.5 h-3.5 text-[#FF0000]" />
                          <span>{item.period}</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#1A1A1A] tracking-tight mb-1">{item.institution}</h4>
                        <div className="text-sm font-semibold text-[#FF0000] mb-2">{item.role}</div>
                        <p className="text-sm text-[#1A1A1A]/55 leading-relaxed font-normal">{item.description}</p>
                      </div>
                    </MovableElement>
                  ))}
                </div>
              </div>

              <MovableElement sectionId="journey" elementId="journey-work-note">
                <div className="mt-8 pt-6 border-t border-black/8 flex items-center gap-2 text-xs font-medium text-[#1A1A1A]/45">
                  <MapPin className="w-4 h-4 text-[#FF0000]" />
                  <span>Available for Remote &amp; On-Site Freelance Contracts</span>
                </div>
              </MovableElement>
            </div>
          </MovableElement>

        </div>

      </div>
    </section>
  );
};
