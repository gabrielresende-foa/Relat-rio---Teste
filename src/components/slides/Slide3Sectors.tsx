import React, { useState } from 'react';
import { useReportData } from '../../context/ReportContext';
import { Bot, Headphones, Hash, Percent, Layers, CheckCircle2 } from 'lucide-react';

export const Slide3Sectors: React.FC = () => {
  const [metricDisplay, setMetricDisplay] = useState<'volume' | 'percentage'>('volume');
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const { activeDataset } = useReportData();
  const { metadata, sectors } = activeDataset;

  const maxVolume = Math.max(...sectors.map((s) => s.volume), 1);
  const totalVolume = sectors.reduce((acc, s) => acc + s.volume, 0);

  const centralSector = sectors.find((s) => s.highlightType === 'central' || s.id === 'central') || sectors[0];
  const botSector = sectors.find((s) => s.highlightType === 'bot' || s.id === 'geral' || s.id === 'bot');

  const combinedVolume = (centralSector?.volume || 0) + (botSector?.volume || 0);
  const combinedPct = totalVolume > 0 ? ((combinedVolume / totalVolume) * 100).toFixed(1) : '58.5';

  return (
    <div
      id="slide-3"
      className="w-full h-full relative flex flex-col justify-between p-8 md:p-12 bg-white text-[#0f172a] overflow-hidden select-none"
    >
      <div>
        {/* Slide Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-[#0f172a] tracking-tight flex items-center gap-3">
              <span className="inline-block w-1.5 h-7 bg-[#1d4ed8] rounded-xs" />
              Atendimentos por setor
            </h2>
            <p className="text-xs md:text-sm text-[#64748b] mt-0.5 ml-4 font-normal">
              {totalVolume.toLocaleString('pt-BR')} atendimentos na instituição • Central de Atendimento concentra o maior volume ({metadata.periodLabel})
            </p>
          </div>

          {/* Interactive Metric Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setMetricDisplay('volume')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                metricDisplay === 'volume'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Volume (Qtd)</span>
            </button>
            <button
              onClick={() => setMetricDisplay('percentage')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                metricDisplay === 'percentage'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Porcentagem (%)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left: Bar Chart of all sectors (7 cols) */}
          <div className="col-span-7 flex flex-col gap-1.5 max-h-[440px] overflow-y-auto pr-1">
            {sectors.map((sector) => {
              const widthPct = Math.max(1.5, (sector.volume / maxVolume) * 100);
              const isHovered = activeSector === sector.id;

              let fillClass = 'bg-[#94a3b8]';
              if (sector.highlightType === 'central') fillClass = 'bg-[#2563eb]';
              if (sector.highlightType === 'bot' || sector.id === 'geral') fillClass = 'bg-[#0d9488]';

              return (
                <div
                  key={sector.id}
                  onMouseEnter={() => setActiveSector(sector.id)}
                  onMouseLeave={() => setActiveSector(null)}
                  className={`flex items-center gap-2.5 text-xs transition-all duration-150 py-1 px-2 rounded-lg ${
                    isHovered ? 'bg-slate-100 ring-1 ring-blue-300' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-[170px] text-right font-semibold text-slate-800 truncate flex items-center justify-end gap-1.5 text-[11px] sm:text-xs">
                    {sector.highlightType === 'central' && (
                      <Headphones className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                    {(sector.highlightType === 'bot' || sector.id === 'geral') && (
                      <Bot className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    )}
                    <span title={sector.name}>{sector.name}</span>
                  </div>

                  <div className="flex-1 bg-[#f1f5f9] rounded-md h-[20px] overflow-hidden relative">
                    <div
                      className={`h-full rounded-md ${fillClass} flex items-center justify-end pr-2 text-white font-bold text-[10px] transition-all duration-500`}
                      style={{ width: `${widthPct}%` }}
                    >
                      {sector.volume > 0 && widthPct > 12 && (
                        <span>
                          {metricDisplay === 'volume'
                            ? sector.volume.toLocaleString('pt-BR')
                            : `${sector.percentage.toFixed(0)}%`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-16 flex items-center justify-end gap-1 font-mono text-[11px] text-right text-slate-500">
                    <span className="font-bold text-slate-700">
                      {metricDisplay === 'volume'
                        ? sector.volume.toLocaleString('pt-BR')
                        : `${sector.percentage.toFixed(0)}%`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {metricDisplay === 'volume' ? `(${sector.percentage.toFixed(0)}%)` : `(${sector.volume})`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Insight Callout Box (5 cols) */}
          <div className="col-span-5 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe]/90 rounded-2xl p-6 border border-[#bfdbfe] shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  Concentração Estratégica
                </div>
                <h3 className="text-[#1d4ed8] text-lg font-bold mb-1">
                  Central + Fila Geral
                </h3>
                <div className="text-5xl md:text-6xl font-extrabold text-[#2563eb] leading-none mb-3 tracking-tight">
                  {combinedPct.replace('.', ',')}%
                </div>
                <p className="text-[#0f172a] text-xs sm:text-sm leading-relaxed">
                  A <strong className="text-blue-700 font-bold">Central de Atendimento ({centralSector.volume.toLocaleString('pt-BR')} | {centralSector.percentage}%)</strong>
                  {botSector && (
                    <> e a fila <strong className="text-teal-700 font-bold">Geral ({botSector.volume.toLocaleString('pt-BR')} | {botSector.percentage}%)</strong></>
                  )}{' '}
                  somam juntas <strong className="text-slate-900 font-bold">{combinedVolume.toLocaleString('pt-BR')} atendimentos</strong>, equivalentes a mais da metade de todo o volume da instituição.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-200/80">
                <p className="text-[#475569] text-xs leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    A Central sustenta o relacionamento nuclear com o aluno, enquanto a fila Geral realiza a triagem de entrada institucional.
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Sector Breakdown Callout */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-800 flex justify-between">
                <span>Top 3 Setores do Período:</span>
                <span className="text-blue-600 font-bold">~79,2% da demanda</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-700">1. Central de atendimento</span>
                <span className="font-mono font-bold text-blue-700">7.610 (47%)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-700">2. Bolsa Social – CEBAS</span>
                <span className="font-mono font-bold text-slate-700">3.326 (21%)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-700">3. Fila Geral</span>
                <span className="font-mono font-bold text-teal-700">1.857 (11%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="flex justify-between items-center border-t border-[#e2e8f0] pt-3 text-xs md:text-sm text-[#64748b]">
        <div>{metadata.title} • {metadata.institutionDept}</div>
        <div className="font-semibold text-slate-700">Página 3</div>
      </div>
    </div>
  );
};
