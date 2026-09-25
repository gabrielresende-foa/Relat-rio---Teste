import React, { useState, useEffect, useCallback } from 'react';
import { PresentationHeader } from './components/PresentationHeader';
import { SlideThumbnails } from './components/SlideThumbnails';
import { SlideWrapper } from './components/SlideWrapper';
import { Slide1Cover } from './components/slides/Slide1Cover';
import { Slide2KPIs } from './components/slides/Slide2KPIs';
import { Slide3Sectors } from './components/slides/Slide3Sectors';
import { Slide4ResponseTime } from './components/slides/Slide4ResponseTime';
import { Slide5Satisfaction } from './components/slides/Slide5Satisfaction';
import { Slide6Conclusion } from './components/slides/Slide6Conclusion';
import { DataEditorModal } from './components/DataEditorModal';
import { ViewMode } from './types';
import { ReportProvider, useReportData } from './context/ReportContext';
import { ChevronLeft, ChevronRight, Presentation, Sliders } from 'lucide-react';

function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('slides');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isDataEditorOpen, setIsDataEditorOpen] = useState(false);

  const { activeDataset } = useReportData();
  const totalSlides = activeDataset.metadata.totalPages || 6;

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSelectSlide = useCallback((page: number) => {
    setCurrentSlide(page);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`slide-${page}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [viewMode]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in inputs or textareas
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        isDataEditorOpen
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (viewMode === 'slides') {
          e.preventDefault();
          handleNextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (viewMode === 'slides') {
          e.preventDefault();
          handlePrevSlide();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        e.preventDefault();
        handleSelectSlide(parseInt(e.key, 10));
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [viewMode, handleNextSlide, handlePrevSlide, handleToggleFullscreen, handleSelectSlide, isDataEditorOpen]);

  const renderCurrentSlide = (slideIndex: number) => {
    switch (slideIndex) {
      case 1:
        return <Slide1Cover onNext={handleNextSlide} onNavigate={handleSelectSlide} />;
      case 2:
        return <Slide2KPIs />;
      case 3:
        return <Slide3Sectors />;
      case 4:
        return <Slide4ResponseTime />;
      case 5:
        return <Slide5Satisfaction />;
      case 6:
        return <Slide6Conclusion />;
      default:
        return <Slide1Cover onNext={handleNextSlide} onNavigate={handleSelectSlide} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0b0f19] text-slate-100 antialiased font-sans">
      {/* Presentation Header Bar */}
      <PresentationHeader
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPrevSlide={handlePrevSlide}
        onNextSlide={handleNextSlide}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        showThumbnails={showThumbnails}
        onToggleThumbnails={() => setShowThumbnails((prev) => !prev)}
        onOpenDataEditor={() => setIsDataEditorOpen(true)}
      />

      {/* Main Presentation Stage */}
      {viewMode === 'slides' ? (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-between bg-[#0b0f19]">
          {/* Active Scaled Slide View */}
          <main className="flex-1 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            {/* Overlay Navigation Buttons on hover */}
            {currentSlide > 1 && (
              <button
                onClick={handlePrevSlide}
                className="no-print absolute left-4 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-800/90 text-slate-300 hover:text-white backdrop-blur-xs border border-slate-700/50 shadow-xl transition-all cursor-pointer hover:scale-105"
                title="Slide Anterior (←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {currentSlide < totalSlides && (
              <button
                onClick={handleNextSlide}
                className="no-print absolute right-4 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-800/90 text-slate-300 hover:text-white backdrop-blur-xs border border-slate-700/50 shadow-xl transition-all cursor-pointer hover:scale-105"
                title="Próximo Slide (→)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <SlideWrapper isActive={true} isContinuous={false}>
              {renderCurrentSlide(currentSlide)}
            </SlideWrapper>
          </main>

          {/* Bottom Thumbnails Navigation Drawer */}
          <SlideThumbnails
            currentSlide={currentSlide}
            onSelectSlide={handleSelectSlide}
            isOpen={showThumbnails}
          />
        </div>
      ) : (
        /* Continuous Document View: Stacks all slides */
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0b0f19] scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="no-print bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span>
                  Visualizando todos os <strong>{totalSlides} slides</strong> em formato de relatório contínuo.
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
                  {activeDataset.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDataEditorOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Editar Dados</span>
                </button>
                <button
                  onClick={() => setViewMode('slides')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Voltar aos Slides</span>
                </button>
              </div>
            </div>

            <SlideWrapper isContinuous={true}>
              <Slide1Cover onNavigate={handleSelectSlide} />
            </SlideWrapper>

            <SlideWrapper isContinuous={true}>
              <Slide2KPIs />
            </SlideWrapper>

            <SlideWrapper isContinuous={true}>
              <Slide3Sectors />
            </SlideWrapper>

            <SlideWrapper isContinuous={true}>
              <Slide4ResponseTime />
            </SlideWrapper>

            <SlideWrapper isContinuous={true}>
              <Slide5Satisfaction />
            </SlideWrapper>

            <SlideWrapper isContinuous={true}>
              <Slide6Conclusion />
            </SlideWrapper>
          </div>
        </div>
      )}

      {/* Quick Edit / Import Modal */}
      <DataEditorModal
        isOpen={isDataEditorOpen}
        onClose={() => setIsDataEditorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ReportProvider>
      <PresentationApp />
    </ReportProvider>
  );
}
