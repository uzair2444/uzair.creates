import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data';
import { MovableElement } from './MovableElement';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        <div className="glass-panel rounded-[32px] sm:rounded-[44px] py-14 sm:py-16 md:py-20 overflow-hidden text-[#1A1A1A] relative">
          
          <MovableElement sectionId="faq" elementId="faq-heading">
            <div className="text-center max-w-2xl mx-auto px-6 mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#1A1A1A]/70 dark:text-white/70 mb-3">
                <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
                <span>FAQs</span>
                <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] dark:text-white tracking-tight">
                Questions? <span className="font-serif-accent text-[#FF0000]">Look here.</span>
              </h2>
            </div>
          </MovableElement>

          <div className="max-w-4xl xl:max-w-5xl mx-auto px-6 sm:px-10 space-y-4" id="faqList">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <MovableElement key={idx} sectionId="faq" elementId={`faq-item-${idx}`}>
                  <div
                    className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'glass-pill-red shadow-[0_12px_36px_rgba(255,0,0,0.3)] text-white'
                        : 'glass-panel glass-panel-hover text-[#1A1A1A]/85 dark:text-white/85'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-white/20 text-white' : 'glass-card text-[#1A1A1A] dark:text-white'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </MovableElement>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
