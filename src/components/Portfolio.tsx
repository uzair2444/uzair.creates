import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, Smartphone, Globe, Package, Share2, Layers, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { MovableElement } from './MovableElement';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'product' | 'post' | 'brochure' | 'web'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  const openLightbox = (images: string[], index: number = 0) => {
    setLightboxImages(images);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImages(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = useCallback(() => {
    if (lightboxImages) {
      setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
    }
  }, [lightboxImages]);

  const prevImage = useCallback(() => {
    if (lightboxImages) {
      setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
    }
  }, [lightboxImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImages) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImages, nextImage, prevImage]);

  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'product': return <Package className="w-3.5 h-3.5" />;
      case 'post': return <Share2 className="w-3.5 h-3.5" />;
      case 'brochure': return <Layers className="w-3.5 h-3.5" />;
      case 'web': return <Globe className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <MovableElement sectionId="projects" elementId="projects-heading">
            <div>
              <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-[#1A1A1A]/70 dark:text-white/70 mb-3">
                <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
                <span>My Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] dark:text-white tracking-tight">
                My Latest <span className="font-serif-accent text-[#FF0000]">Projects</span>
              </h2>
            </div>
          </MovableElement>

          <MovableElement sectionId="projects" elementId="projects-filters">
            <div className="flex items-center gap-1.5 p-1.5 glass-card rounded-full self-start md:self-auto flex-wrap">
            {(['all', 'product', 'post', 'brochure', 'web'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === f
                    ? 'glass-pill-red text-white shadow-[0_4px_16px_rgba(255,0,0,0.25)]'
                    : 'text-[#1A1A1A]/55 dark:text-white/60 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
                }`}
              >
                {getFilterIcon(f)}
                {f === 'all' ? `All (${PROJECTS.length})` : f === 'product' ? 'Product' : f === 'post' ? 'Post Designs' : f === 'brochure' ? 'Brochures' : 'Ui / Web Design'}
              </button>
            ))}
            </div>
          </MovableElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
          {filteredProjects.map((project) => (
            <MovableElement key={project.id} sectionId="projects" elementId={`project-card-${project.id}`}>
              <div
                id={`project-card-${project.id}`}
                className="group cursor-pointer glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between"
                onClick={() => {
                  if (project.images && project.images.length > 0) {
                    openLightbox(project.images, 0);
                  } else {
                    setActiveModalProject(project);
                  }
                }}
              >
                {(project.type === 'post' || project.type === 'web' || project.type === 'brochure') && project.images && project.images.length >= 4 ? (
                  <div className="p-6 pb-0">
                    <div className="w-full rounded-2xl overflow-hidden glass-card relative p-2 sm:p-3">
                      <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3" style={{ height: '480px' }}>
                        {project.images.slice(0, 4).map((img, idx) => {
                          const thumbSrc = (project.thumbnails && project.thumbnails[idx]) || img;
                          return (
                            <MovableElement key={idx} sectionId="projects" elementId={`project-img-${project.id}-${idx}`}>
                              <div 
                                className="rounded-xl overflow-hidden relative group/img cursor-pointer h-full w-full bg-[#111] border border-white/5 hover:border-[#FF0000]/50 transition-all duration-300"
                                onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, idx); }}
                              >
                                <img 
                                  src={thumbSrc} 
                                  alt={`${project.title} ${idx + 1}`}
                                  className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                                  loading="eager"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 pointer-events-none" />
                              </div>
                            </MovableElement>
                          );
                        })}
                      </div>
                      <MovableElement sectionId="projects" elementId={`project-viewall-${project.id}`}>
                        <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full glass-pill-red text-white text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105 transition-transform z-10" onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, 0); }}>
                          <span>View All {project.images.length}</span>
                        </div>
                      </MovableElement>
                    </div>
                  </div>
                ) : project.type === 'brochure' && project.images && project.images.length > 0 ? (
                  <div className="p-6 pb-0">
                    <div className="w-full rounded-2xl overflow-hidden glass-card relative p-2 sm:p-3">
                      <MovableElement sectionId="projects" elementId={`project-img-${project.id}-0`}>
                        <div 
                          className="rounded-xl overflow-hidden relative group/img cursor-pointer w-full bg-[#111] flex items-center justify-center border border-white/5 hover:border-[#FF0000]/50 transition-all duration-300"
                          style={{ height: '480px' }}
                          onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, 0); }}
                        >
                          <img 
                            src={project.images[0]} 
                            alt={project.title}
                            className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 pointer-events-none" />
                          <MovableElement sectionId="projects" elementId={`project-viewall-${project.id}`}>
                            <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full glass-pill-red text-white text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105 transition-transform z-10">
                              <span>View Full Brochure</span>
                            </div>
                          </MovableElement>
                        </div>
                      </MovableElement>
                    </div>
                  </div>
                ) : project.images && project.images.length > 0 ? (
                  <div className="p-6 pb-0">
                    <div className="w-full rounded-2xl overflow-hidden glass-card relative p-2 sm:p-3">
                      <div className="grid grid-cols-[1.3fr_1fr] gap-2 sm:gap-3" style={{ height: '480px' }}>
                        <MovableElement sectionId="projects" elementId={`project-img-${project.id}-0`}>
                          <div 
                            className="rounded-xl overflow-hidden relative group/img cursor-pointer h-full"
                            onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, 0); }}
                          >
                            <img 
                              src={project.images[0]} 
                              alt={project.title}
                              className="w-full h-full object-cover object-center"
                              loading="eager"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
                          </div>
                        </MovableElement>
                        <div className="grid grid-rows-2 gap-2 sm:gap-3">
                          <MovableElement sectionId="projects" elementId={`project-img-${project.id}-1`}>
                            <div 
                              className="rounded-xl overflow-hidden relative group/img cursor-pointer h-full"
                              onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, 1); }}
                            >
                              <img 
                                src={project.images[1]} 
                                alt={project.title}
                                className="w-full h-full object-cover object-center"
                                loading="eager"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
                            </div>
                          </MovableElement>
                          <MovableElement sectionId="projects" elementId={`project-img-${project.id}-2`}>
                            <div 
                              className="rounded-xl overflow-hidden relative group/img cursor-pointer h-full"
                              onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, 2); }}
                            >
                              <img 
                                src={project.images[2]} 
                                alt={project.title}
                                className="w-full h-full object-cover object-center"
                                loading="eager"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
                            </div>
                          </MovableElement>
                        </div>
                      </div>
                      <MovableElement sectionId="projects" elementId={`project-viewall-${project.id}`}>
                        <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full glass-pill-red text-white text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); openLightbox(project.images!, 0); }}>
                          <span>View All {project.images.length}</span>
                        </div>
                      </MovableElement>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <MovableElement sectionId="projects" elementId={`project-mockup-${project.id}`}>
                      <div className="w-full rounded-2xl overflow-hidden glass-card relative p-2 sm:p-3">
                        <div 
                          className="w-full rounded-xl border border-dashed border-white/15 bg-[#111]/60 flex flex-col items-center justify-center text-center p-6 transition-all duration-300 group-hover:border-[#FF0000]/40"
                          style={{ height: '480px' }}
                        >
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/40 group-hover:text-[#FF0000] group-hover:scale-110 transition-all duration-300">
                            {getFilterIcon(project.type) || <Globe className="w-8 h-8" />}
                          </div>
                          <p className="text-white/80 font-semibold text-base mb-1.5">Awaiting New Screenshots</p>
                          <p className="text-white/40 text-xs max-w-xs leading-relaxed">
                            Images removed. Ready for your new UI / Web design visuals.
                          </p>
                        </div>
                      </div>
                    </MovableElement>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <MovableElement sectionId="projects" elementId={`project-tags-${project.id}`}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full glass-pill-red text-white text-xs font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </MovableElement>

                  <MovableElement sectionId="projects" elementId={`project-title-${project.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-snug transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full glass-card text-[#1A1A1A] flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm">
                        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  </MovableElement>

                  <MovableElement sectionId="projects" elementId={`project-desc-${project.id}`}>
                    <p className="text-[#1A1A1A]/50 text-sm mt-3 line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </MovableElement>

                  {project.liveUrls && project.liveUrls.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-black/5 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[11px] font-bold text-[#FF0000] uppercase tracking-wider">Live Sites:</span>
                      {project.liveUrls.map((site, idx) => (
                        <a
                          key={idx}
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-card hover:glass-pill-red text-white text-xs font-semibold transition-all group/link"
                        >
                          <span>{site.label}</span>
                          <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </MovableElement>
          ))}
        </div>

      </div>

      {lightboxImages && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full glass-panel text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-6 left-6 z-[110] px-4 py-2 rounded-full glass-panel text-white text-sm font-semibold">
            {currentImageIndex + 1} / {lightboxImages.length}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 sm:left-8 z-[110] w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-panel text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 sm:right-8 z-[110] w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-panel text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImages[currentImageIndex]} 
              alt={`Portfolio Project ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex gap-2 p-2 rounded-2xl glass-panel">
            {lightboxImages.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all cursor-pointer ${
                  idx === currentImageIndex 
                    ? 'ring-2 ring-[#FF0000] ring-offset-2 ring-offset-black/50 scale-105' 
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="glass-panel text-[#1A1A1A] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.12)] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full glass-card hover:bg-white/60 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-wrap gap-2 mb-3">
              {activeModalProject.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-bold px-3 py-1 rounded-full glass-pill-red text-white">{t}</span>
              ))}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">{activeModalProject.title}</h3>
            <p className="text-[#1A1A1A]/55 text-base leading-relaxed mb-6">{activeModalProject.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 glass-card p-4 rounded-2xl mb-6">
              <div>
                <span className="text-xs text-[#1A1A1A]/35 block uppercase font-semibold">Client</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{activeModalProject.client}</span>
              </div>
              <div>
                <span className="text-xs text-[#1A1A1A]/35 block uppercase font-semibold">Duration</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{activeModalProject.duration}</span>
              </div>
              <div>
                <span className="text-xs text-[#1A1A1A]/35 block uppercase font-semibold">Tools Used</span>
                <span className="text-sm font-bold text-[#FF0000]">{activeModalProject.tools.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={() => setActiveModalProject(null)}
                className="flex-1 text-center py-3.5 glass-pill-red text-white rounded-full font-bold text-sm hover:shadow-[0_10px_30px_rgba(255,0,0,0.35)] transition-all cursor-pointer"
              >
                Request Similar Design Solution
              </a>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-6 py-3.5 glass-pill text-[#1A1A1A] rounded-full font-bold text-sm hover:bg-white/60 transition-colors cursor-pointer"
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
