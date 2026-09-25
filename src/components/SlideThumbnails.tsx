import React from 'react';
import { useReportData } from '../context/ReportContext';

interface SlideThumbnailsProps {
  currentSlide: number;
  onSelectSlide: (slideIndex: number) => void;
  isOpen: boolean;
}

export const SlideThumbnails: React.FC<SlideThumbnailsProps> = ({
  currentSlide,
  onSelectSlide,
  isOpen,
}) => {
  const { activeDataset } = useReportData();
  const { metadata } = activeDataset;

  if (!isOpen) return null;

  const slidePreviews = [
    { page: 1, title: 'Capa / Abertura', category: 'Apresentação' },
    { page: 2, title: `Números (${metadata.periodLabel})`, category: 'Volume & KPIs' },
    { page: 3, title: 'Concentração de Volume', category: 'Setores' },
    { page: 4, title: 'Tempo de Resposta', category: 'SLA & Espera' },
    { page: 5, title: 'Pesquisa de Satisfação', category: 'Qualidade' },
    { page: 6, title: 'Pontos para Supervisão', category: 'Conclusão' },
  ];

  return (
    <div className="no-print w-full bg-[#050c1a]/95 border-t border-slate-800/80 px-4 py-3 shrink-0 z-20 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
        {slidePreviews.map((slide) => {
          const isActive = currentSlide === slide.page;
          return (
            <button
              key={slide.page}
              onClick={() => onSelectSlide(slide.page)}
              className={`flex-1 min-w-[150px] max-w-[200px] text-left p-2 rounded-xl border transition-all cursor-pointer group ${
                isActive
                  ? 'bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="font-bold text-slate-400 group-hover:text-slate-200">
                  Slide {slide.page}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-sm font-semibold uppercase ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {slide.category}
                </span>
              </div>
              <div
                className={`text-xs font-semibold truncate ${
                  isActive ? 'text-blue-300' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {slide.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
