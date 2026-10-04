import React, { ReactNode } from 'react';
import { useAdmin } from '../context/AdminContext';

interface MovableElementProps {
  sectionId: string;
  elementId: string;
  children: ReactNode;
}

export const MovableElement: React.FC<MovableElementProps> = ({ sectionId, elementId, children }) => {
  const { isAdminMode, moveElement, resetElement, getElementOffset } = useAdmin();
  const offset = getElementOffset(sectionId, elementId);
  const hasMoved = offset.x !== 0 || offset.y !== 0;

  if (!isAdminMode) {
    if (!hasMoved) return <>{children}</>;
    return (
      <div style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className="relative group/movable inline-block"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 opacity-0 group-hover/movable:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/movable:pointer-events-auto">
        <button
          onClick={(e) => { e.stopPropagation(); moveElement(sectionId, elementId, 'up'); }}
          className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
          title="Move Up 5px"
        >
          ▲
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); moveElement(sectionId, elementId, 'down'); }}
          className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
          title="Move Down 5px"
        >
          ▼
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); moveElement(sectionId, elementId, 'left'); }}
          className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
          title="Move Left 5px"
        >
          ◀
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); moveElement(sectionId, elementId, 'right'); }}
          className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
          title="Move Right 5px"
        >
          ▶
        </button>
        {hasMoved && (
          <button
            onClick={(e) => { e.stopPropagation(); resetElement(sectionId, elementId); }}
            className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
            title="Reset Position"
          >
            ↺
          </button>
        )}
      </div>
      <div className="absolute -left-12 top-0 w-12 h-full" />
      {children}
    </div>
  );
};
