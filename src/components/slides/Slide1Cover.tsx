import React from 'react';
import { GeometricSidebar } from '../GeometricSidebar';
import { useReportData } from '../../context/ReportContext';
import { ChevronRight, BarChart3, Clock, ThumbsUp, Building2 } from 'lucide-react';

interface Slide1CoverProps {
  onNext?: () => void;
  onNavigate?: (page: number) => void;
}

export const Slide1Cover: React.FC<Slide1CoverProps> = ({ onNext, onNavigate }) => {
  const { activeDataset } = useReportData();
  const { metadata } = activeDataset;

  return (
    <div
      id="slide-1"
      className="w-full h-full relative flex flex-col justify-between p-12 md:p-16 bg-gradient-to-br from-[#050c1a] via-[#091530] to-[#1e3a8a] text-white overflow-hidden select-none"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-32 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Signature Geometric Sidebar Motif on the right */}
      <GeometricSidebar />

      {/* Main Cover Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-[860px] pr-8">
        {/* Executive Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/25 border border-blue-400/40 text-blue-200 text-xs md:text-sm font-semibold uppercase tracking-wider mb-6 w-fit shadow-sm backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          {metadata.badge}
        </div>

        {/* Big Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-4 text-white drop-shadow-sm">
          {metadata.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
          {metadata.subtitle}
        </p>

        {/* Quick Nav / Agenda Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-2xl">
          <button
            onClick={() => onNavigate?.(2)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Pág 2</span>
              <span className="text-xs font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">Números</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate?.(3)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Pág 3</span>
              <span className="text-xs font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">Setores</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate?.(4)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600/30 flex items-center justify-center text-teal-300 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Pág 4</span>
              <span className="text-xs font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">Tempo SLA</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate?.(5)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400">Pág 5</span>
              <span className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">Satisfação</span>
            </div>
          </button>
        </div>

        {/* Start button for interactive presentations */}
        {onNext && (
          <div className="mt-8">
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Iniciar Apresentação</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Slide Footer */}
      <div className="relative z-10 flex justify-between items-center border-t border-white/15 pt-4 text-xs md:text-sm text-slate-400">
        <div>{metadata.institutionDept}</div>
        <div className="font-semibold">{metadata.monthYear}</div>
      </div>
    </div>
  );
};
