import React from 'react';
import { Sparkle } from 'lucide-react';
import { MovableElement } from './MovableElement';

interface MarqueeStripProps {
  inverted?: boolean;
  is3D?: boolean;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ inverted = false, is3D = true }) => {
  const items = [
    'Graphic Design',
    'Ui Design',
    'Post Design',
    'Social Media Ads',
    'Video Editing',
    'Photoshop',
    'Figma',
    'Premier Pro',
    'Capcut',
    'Brand Identity'
  ];

  return (
    <div 
      className={`w-full overflow-hidden select-none py-3.5 sm:py-4.5 relative transition-all duration-300 ${
        inverted 
          ? 'glass-panel border-white/50 text-[#1A1A1A]' 
          : is3D
            ? 'bg-gradient-to-b from-[#FF4545] via-[#FF0000] to-[#800000] text-white border-t border-white/45 border-b-[6px] border-[#4A0000] shadow-[0_24px_55px_rgba(0,0,0,0.9),0_10px_25px_rgba(255,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-4px_6px_rgba(0,0,0,0.55)]'
            : 'bg-[#FF0000] text-white shadow-[0_8px_24px_rgba(255,0,0,0.25)]'
      }`}
      aria-hidden="true"
    >
      {/* 3D Moving Light Glare Sweeping Across */}
      {is3D && !inverted && (
        <div className="absolute inset-y-0 w-56 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glare-3d pointer-events-none" />
      )}

      {/* Top highlight specular reflection line */}
      {is3D && !inverted && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
      )}

      {/* Bottom ambient glow */}
      {is3D && !inverted && (
        <div className="absolute -bottom-8 inset-x-0 h-8 bg-[#FF0000]/30 blur-2xl pointer-events-none" />
      )}

      <div className="animate-marquee whitespace-nowrap flex items-center gap-5 sm:gap-7">
        {[...items, ...items].map((item, idx) => (
          <MovableElement key={idx} sectionId="marquee" elementId={`marquee-item-${idx}`}>
            {/* 3D Elevated Pill Capsule */}
            <div 
              className={`flex items-center gap-3.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
                inverted
                  ? 'bg-black/5 border border-black/10'
                  : 'bg-black/25 backdrop-blur-md border border-white/25 shadow-[0_6px_16px_rgba(0,0,0,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.35)] hover:bg-black/35 hover:scale-105'
              }`}
              style={{ transform: 'translateZ(16px)' }}
            >
              <span className="text-base sm:text-xl md:text-2xl font-black tracking-wider uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] text-white">
                {item}
              </span>
              <Sparkle className={`w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] ${inverted ? 'text-[#FF0000]' : 'text-white'}`} />
            </div>
          </MovableElement>
        ))}
      </div>
    </div>
  );
};
