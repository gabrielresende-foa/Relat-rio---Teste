import React from 'react';

interface GeometricSidebarProps {
  className?: string;
  isCompact?: boolean;
}

export const GeometricSidebar: React.FC<GeometricSidebarProps> = ({ className = '', isCompact = false }) => {
  return (
    <div
      id="geometric-sidebar"
      className={`absolute right-0 top-0 bottom-0 bg-[#050c1a] flex flex-col items-center justify-center select-none overflow-hidden ${
        isCompact ? 'w-16 gap-2 py-3' : 'w-[120px] gap-4 py-5'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Decorative vertical background line accent */}
      <div className="absolute inset-y-0 w-px bg-white/5 left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Top semicircle: Teal */}
      <div
        className={`bg-[#0d9488] shadow-lg shadow-teal-900/30 transition-transform duration-300 hover:scale-105 ${
          isCompact
            ? 'w-8 h-4 rounded-t-[32px]'
            : 'w-[60px] h-[30px] rounded-t-[60px]'
        }`}
      />

      {/* Mid semicircle: Royal Blue */}
      <div
        className={`bg-[#1d4ed8] shadow-lg shadow-blue-900/30 transition-transform duration-300 hover:scale-105 ${
          isCompact
            ? 'w-8 h-4 rounded-t-[32px]'
            : 'w-[60px] h-[30px] rounded-t-[60px]'
        }`}
      />

      {/* Center circle: Slate Neutral */}
      <div
        className={`bg-[#94a3b8] shadow-lg shadow-slate-900/40 rounded-full transition-transform duration-300 hover:scale-105 ${
          isCompact ? 'w-8 h-8' : 'w-[60px] h-[60px]'
        }`}
      />

      {/* Lower semicircle: Royal Blue (downward) */}
      <div
        className={`bg-[#1d4ed8] shadow-lg shadow-blue-900/30 transition-transform duration-300 hover:scale-105 ${
          isCompact
            ? 'w-8 h-4 rounded-b-[32px]'
            : 'w-[60px] h-[30px] rounded-b-[60px]'
        }`}
      />

      {/* Bottom semicircle: Sky / Cyan (downward) */}
      <div
        className={`bg-[#0284c7] shadow-lg shadow-sky-900/30 transition-transform duration-300 hover:scale-105 ${
          isCompact
            ? 'w-8 h-4 rounded-b-[32px]'
            : 'w-[60px] h-[30px] rounded-b-[60px]'
        }`}
      />
    </div>
  );
};
