import React, { useState } from 'react';
import { Monitor, Palette, Layout, Smartphone, ArrowRight, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { MovableElement } from './MovableElement';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'monitor': return <Monitor className="w-5 h-5 text-[#FF0000]" />;
      case 'palette': return <Palette className="w-5 h-5 text-[#FF0000]" />;
      case 'layout': return <Layout className="w-5 h-5 text-[#FF0000]" />;
      case 'smartphone': return <Smartphone className="w-5 h-5 text-[#FF0000]" />;
      default: return <Palette className="w-5 h-5 text-[#FF0000]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <MovableElement sectionId="services" elementId="services-heading">
            <div>
              <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-white/70 mb-3">
                <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
                <span>Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                <span className="font-serif-accent text-[#FF0000]">Services</span> I Provide
              </h2>
            </div>
          </MovableElement>

          <MovableElement sectionId="services" elementId="services-cta">
            <a
              href="#contact"
              id="services-cta-btn"
              className="self-start md:self-auto inline-flex items-center gap-3 px-7 py-4 rounded-full glass-pill hover:bg-[#FF0000] text-white hover:text-white font-semibold text-sm transition-all duration-200 shadow-sm group"
            >
              <span>Hire for Services</span>
              <span className="w-7 h-7 rounded-full glass-card flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#FF0000] transition-colors">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </a>
          </MovableElement>
        </div>

        {/* 3 Service Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10">
          {SERVICES.map((service) => (
            <MovableElement key={service.id} sectionId="services" elementId={`service-card-${service.id}`}>
              <div
                id={`service-card-${service.id}`}
                className="group glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 xl:p-8 flex flex-col justify-between transition-all duration-300 border border-white/10 hover:border-[#FF0000]/40 shadow-xl overflow-hidden h-full"
              >
                <div>
                  {/* Service Showcase Image */}
                  {service.image && (
                    <MovableElement sectionId="services" elementId={`service-img-${service.id}`}>
                      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-[#FF0000]/30 transition-all duration-300 shadow-lg bg-black/40">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                        {/* Gradient Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </MovableElement>
                  )}

                  {/* Service Title */}
                  <MovableElement sectionId="services" elementId={`service-title-${service.id}`}>
                    <h3 className="text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-[#FF0000] transition-colors">
                      {service.title}
                    </h3>
                  </MovableElement>

                  {/* Short Description */}
                  <MovableElement sectionId="services" elementId={`service-desc-${service.id}`}>
                    <p className="text-white/60 text-sm leading-relaxed mb-5 font-normal">
                      {service.shortDesc}
                    </p>
                  </MovableElement>

                  {/* Hashtags / Tags */}
                  <MovableElement sectionId="services" elementId={`service-tags-${service.id}`}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(service.tags || service.deliverables).map((item, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs font-semibold px-3 py-1 rounded-full glass-pill text-white/80 group-hover:border-[#FF0000]/40 group-hover:text-[#FF0000] transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </MovableElement>
                </div>

                {/* Scope & Tools Button */}
                <MovableElement sectionId="services" elementId={`service-btn-${service.id}`}>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF0000] hover:text-white transition-colors pt-2 group-hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <span>View Scope & Tools</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MovableElement>
              </div>
            </MovableElement>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-[#12141A]/95 text-white border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full glass-card hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            {selectedService.image && (
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-white/10 shadow-md">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#FF0000] border border-white/15">
                  {getIcon(selectedService.icon)}
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-white mb-2">{selectedService.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{selectedService.fullDesc}</p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Key Deliverables</h4>
              <ul className="space-y-2.5">
                {selectedService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/80 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#FF0000] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Tools & Technology</h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.tools.map((tool, i) => (
                  <span key={i} className="text-xs font-bold px-3 py-1 glass-pill text-white/90 rounded-full border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="flex-1 text-center py-3 glass-pill-red text-white rounded-full font-semibold text-sm hover:shadow-[0_8px_24px_rgba(255,0,0,0.35)] transition-all cursor-pointer"
              >
                Inquire About This Service
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-3 glass-pill text-white/80 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
