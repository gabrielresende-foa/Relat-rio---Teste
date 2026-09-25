import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useReportData } from '../context/ReportContext';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Printer,
  LayoutGrid,
  Presentation,
  Keyboard,
  Info,
  Layers,
  Sliders,
  Calendar,
} from 'lucide-react';

interface PresentationHeaderProps {
  currentSlide: number;
  totalSlides: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  showThumbnails: boolean;
  onToggleThumbnails: () => void;
  onOpenDataEditor: () => void;
}

export const PresentationHeader: React.FC<PresentationHeaderProps> = ({
  currentSlide,
  totalSlides,
  viewMode,
  onViewModeChange,
  onPrevSlide,
  onNextSlide,
  isFullscreen,
  onToggleFullscreen,
  showThumbnails,
  onToggleThumbnails,
  onOpenDataEditor,
}) => {
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const { activeDataset, activeDatasetId, datasets, selectDataset } = useReportData();

  const handlePrint = () => {
    window.print();
  };

  const progressPct = (currentSlide / totalSlides) * 100;

  return (
    <header className="no-print w-full bg-[#050c1a]/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Brand & Document Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 text-xs">
          RA
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs md:text-sm font-bold text-white tracking-tight leading-none truncate max-w-[220px] sm:max-w-xs md:max-w-md">
              {activeDataset.metadata.title}
            </h1>
            <span className="hidden lg:inline-block text-[10px] px-2 py-0.5 rounded-md bg-blue-900/60 text-blue-300 font-semibold border border-blue-700/40">
              {activeDataset.metadata.periodLabel}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight hidden sm:block truncate max-w-sm">
            {activeDataset.metadata.subtitle}
          </p>
        </div>
      </div>

      {/* Dataset Quick Switcher & Slide Controls */}
      <div className="flex items-center gap-2">
        {/* Dataset Switcher Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <select
            value={activeDatasetId}
            onChange={(e) => selectDataset(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-1"
            title="Alternar entre relatórios (Trimestral / Mensal)"
          >
            {datasets.map((d) => (
              <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Slide Navigation Controls (Only in Slide View) */}
        {viewMode === 'slides' && (
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-2 py-1">
            <button
              onClick={onPrevSlide}
              disabled={currentSlide <= 1}
              title="Slide Anterior (Seta Esquerda)"
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slide Indicator & Progress Bar */}
            <div className="flex flex-col items-center px-2 min-w-[70px]">
              <span className="text-xs font-semibold text-slate-200">
                {currentSlide} <span className="text-slate-500 font-normal">/ {totalSlides}</span>
              </span>
              <div className="w-14 h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <button
              onClick={onNextSlide}
              disabled={currentSlide >= totalSlides}
              title="Próximo Slide (Seta Direita ou Espaço)"
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Data Editor / Importer Button */}
        <button
          onClick={onOpenDataEditor}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
          title="Editar Números ou Importar Dados (JSON/CSV)"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Editar / Importar Dados</span>
        </button>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => onViewModeChange('slides')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'slides'
                ? 'bg-blue-600 text-white font-medium shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo Apresentação Slide a Slide"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Slides</span>
          </button>
          <button
            onClick={() => onViewModeChange('scroll')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'scroll'
                ? 'bg-blue-600 text-white font-medium shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo Contínuo / Documento"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Doc</span>
          </button>
        </div>

        {/* Thumbnail Drawer Toggle (Only in slide mode) */}
        {viewMode === 'slides' && (
          <button
            onClick={onToggleThumbnails}
            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              showThumbnails
                ? 'bg-blue-600/30 border-blue-500/50 text-blue-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Mostrar / Ocultar Miniaturas de Slides"
          >
            <Layers className="w-4 h-4" />
          </button>
        )}

        {/* Print / Export PDF */}
        <button
          onClick={handlePrint}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Imprimir / Exportar como PDF"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* Keyboard Help */}
        <div className="relative">
          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Atalhos do Teclado"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {showKeyboardHelp && (
            <div className="absolute right-0 top-10 w-64 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl z-50 text-xs text-slate-200 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  Atalhos de Apresentação
                </span>
                <button
                  onClick={() => setShowKeyboardHelp(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Avançar:</span>
                  <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-800 border border-slate-700 font-mono text-[10px]">
                    → / Espaço
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Voltar:</span>
                  <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-800 border border-slate-700 font-mono text-[10px]">
                    ←
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tela Cheia:</span>
                  <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-800 border border-slate-700 font-mono text-[10px]">
                    F
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ir para Slide 1-6:</span>
                  <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-800 border border-slate-700 font-mono text-[10px]">
                    1 a 6
                  </kbd>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-xs"
          title={isFullscreen ? 'Sair da Tela Cheia (Esc)' : 'Apresentar em Tela Cheia (F)'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
