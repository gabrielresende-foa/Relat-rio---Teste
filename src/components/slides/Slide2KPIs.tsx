import React, { useState } from 'react';
import { useReportData } from '../../context/ReportContext';
import { TrendingUp, Users, MessageSquare, Bot, Building, HelpCircle, Info, Clock, Zap } from 'lucide-react';
import { KPIItem } from '../../types';

export const Slide2KPIs: React.FC = () => {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);
  const { activeDataset } = useReportData();
  const { metadata, kpis } = activeDataset;

  const getCardIcon = (id: string) => {
    switch (id) {
      case 'conversas':
        return <MessageSquare className="w-4 h-4 opacity-90" />;
      case 'participacao':
        return <Building className="w-4 h-4 opacity-90" />;
      case 'central-geral':
        return <Users className="w-4 h-4 opacity-90" />;
      case 'total-instituicao':
        return <TrendingUp className="w-4 h-4 opacity-90" />;
      case 'fila-5min':
        return <Clock className="w-4 h-4 opacity-90" />;
      case 'resposta-agente':
        return <Zap className="w-4 h-4 opacity-90" />;
      default:
        return <Info className="w-4 h-4 opacity-90" />;
    }
  };

  const getCardBg = (colorScheme: KPIItem['colorScheme']) => {
    switch (colorScheme) {
      case 'primary':
        return 'bg-[#1d4ed8] text-white';
      case 'success':
        return 'bg-[#065f46] text-white';
      case 'dark':
        return 'bg-[#0f172a] text-white';
      case 'teal':
        return 'bg-[#0d9488] text-white';
      default:
        return 'bg-[#1d4ed8] text-white';
    }
  };

  const renderCard = (item: KPIItem) => {
    const isHovered = selectedKpi === item.id;
    return (
      <div
        key={item.id}
        onMouseEnter={() => setSelectedKpi(item.id)}
        onMouseLeave={() => setSelectedKpi(null)}
        className={`p-5 rounded-2xl shadow-md transition-all duration-200 flex flex-col justify-between h-[198px] relative group cursor-pointer ${getCardBg(
          item.colorScheme
        )} ${isHovered ? 'scale-[1.02] shadow-xl ring-2 ring-blue-300' : ''}`}
      >
        <div className="flex justify-between items-start gap-1">
          <span className="uppercase text-[0.75rem] tracking-wider font-bold opacity-90 truncate max-w-[170px]">
            {item.label}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {item.badge && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                {item.badge}
              </span>
            )}
            <div className="p-1 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
              {getCardIcon(item.id)}
            </div>
          </div>
        </div>

        <div className="text-4xl md:text-[2.6rem] font-extrabold leading-none my-1 tracking-tight">
          {item.value}
        </div>

        <div>
          <p className="text-xs leading-snug opacity-90 font-normal line-clamp-2">
            {item.desc}
          </p>
          {isHovered && item.tooltipDetail && (
            <div className="mt-1 text-[10px] font-medium text-blue-100 bg-black/25 px-2 py-0.5 rounded-sm">
              💡 {item.tooltipDetail}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      id="slide-2"
      className="w-full h-full relative flex flex-col justify-between p-8 md:p-12 bg-white text-[#0f172a] overflow-hidden select-none"
    >
      <div>
        {/* Slide Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-[#0f172a] tracking-tight flex items-center gap-3">
              <span className="inline-block w-1.5 h-7 bg-[#1d4ed8] rounded-xs" />
              Números Principais – {metadata.periodLabel}
            </h2>
            <p className="text-xs md:text-sm text-[#64748b] mt-0.5 ml-4 font-normal">
              Visão executiva da quantidade, crescimento de volume e SLA de atendimento
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Passe o mouse nos cards para detalhes</span>
          </div>
        </div>

        {/* 2 Rows of 3 KPI Cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {kpis.slice(0, 3).map(renderCard)}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {kpis.slice(3, 6).map(renderCard)}
        </div>
      </div>

      {/* Slide Footer */}
      <div className="flex justify-between items-center border-t border-[#e2e8f0] pt-3 text-xs md:text-sm text-[#64748b]">
        <div>{metadata.title} • {metadata.institutionDept}</div>
        <div className="font-semibold text-slate-700">Página 2</div>
      </div>
    </div>
  );
};
