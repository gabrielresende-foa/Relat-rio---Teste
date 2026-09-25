import React, { useState } from 'react';
import { useReportData } from '../../context/ReportContext';
import { ThumbsUp, AlertCircle, Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const Slide5Satisfaction: React.FC = () => {
  const [activeRating, setActiveRating] = useState<number | null>(null);

  const { activeDataset } = useReportData();
  const { metadata, satisfaction } = activeDataset;

  return (
    <div
      id="slide-5"
      className="w-full h-full relative flex flex-col justify-between p-8 md:p-12 bg-white text-[#0f172a] overflow-hidden select-none"
    >
      <div>
        {/* Slide Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-[#0f172a] tracking-tight flex items-center gap-3">
              <span className="inline-block w-1.5 h-7 bg-[#1d4ed8] rounded-xs" />
              Satisfação do atendimento (CSAT)
            </h2>
            <p className="text-xs md:text-sm text-[#64748b] mt-0.5 ml-4 font-normal">
              72 avaliações no período • adesão aproximada de 0,95% sobre 7.610 conversas ({metadata.periodLabel})
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            <span>Nota média: 4,28 / 5</span>
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-12 gap-7 items-start">
          {/* Left Column (7 cols): KPIs & Distribution */}
          <div className="col-span-7 flex flex-col gap-3.5">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3.5 rounded-xl text-center shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                  CSAT / Aprovação
                </div>
                <div className="text-3xl font-extrabold text-[#059669] my-0.5 tracking-tight">
                  {satisfaction.approvalRate}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">61 favoráveis (85%)</div>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3.5 rounded-xl text-center shadow-2xs hover:border-blue-300 transition-colors">
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                  Nota Média
                </div>
                <div className="text-3xl font-extrabold text-[#2563eb] my-0.5 tracking-tight flex items-center justify-center gap-1">
                  <span>{satisfaction.averageScore}</span>
                </div>
                <div className="flex items-center justify-center gap-0.5 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400/30" />
                </div>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3.5 rounded-xl text-center shadow-2xs hover:border-slate-400 transition-colors">
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                  Amostra / Adesão
                </div>
                <div className="text-3xl font-extrabold text-[#0f172a] my-0.5 tracking-tight">
                  {satisfaction.totalEvaluations}
                </div>
                <div className="text-[10px] text-amber-700 font-semibold">~0,95% de adesão</div>
              </div>
            </div>

            {/* Detailed Rating Bars */}
            <div className="bg-white border border-[#e2e8f0] p-4 rounded-2xl shadow-xs flex flex-col gap-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Distribuição das Avaliações por Estrelas</span>
                <span className="text-slate-400 text-[11px] font-mono">Total: {satisfaction.totalEvaluations} respostas</span>
              </div>

              {satisfaction.categories.map((cat, idx) => {
                const isHovered = activeRating === idx;
                return (
                  <div
                    key={cat.label}
                    onMouseEnter={() => setActiveRating(idx)}
                    onMouseLeave={() => setActiveRating(null)}
                    className={`flex items-center gap-2.5 text-xs p-1 rounded-lg transition-all ${
                      isHovered ? 'bg-slate-50 ring-1 ring-blue-200' : ''
                    }`}
                  >
                    <span className="w-36 font-semibold text-slate-800 text-[12px]">{cat.label}</span>
                    <div className="flex-1 h-[20px] bg-[#f1f5f9] rounded-md overflow-hidden relative">
                      <div
                        className="h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2 text-white font-bold text-[10px]"
                        style={{
                          width: `${Math.max(2, cat.percentage)}%`,
                          backgroundColor: cat.color,
                        }}
                      >
                        {cat.percentage >= 6 ? `${cat.percentage}%` : ''}
                      </div>
                    </div>
                    <span className="w-12 font-bold text-right text-slate-700 text-xs">{cat.percentage}%</span>
                  </div>
                );
              })}

              <div className="text-[10px] text-slate-400 mt-1 italic">
                Percentuais das categorias são arredondados individualmente no sistema e somam 101%.
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Context Highlights */}
          <div className="col-span-5 flex flex-col gap-3.5">
            {/* Positive Result Card */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-4 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[#059669]">
                  <ThumbsUp className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-[#059669] text-sm font-bold">
                  {satisfaction.positiveHighlight.title}
                </h4>
              </div>
              <p className="text-xs text-[#166534] leading-relaxed">
                {satisfaction.positiveHighlight.desc}
              </p>
            </div>

            {/* Attention Card */}
            <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[#b45309]">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-[#b45309] text-sm font-bold">
                  {satisfaction.attentionHighlight.title}
                </h4>
              </div>
              <p className="text-xs text-[#92400e] leading-relaxed">
                {satisfaction.attentionHighlight.desc}
              </p>
            </div>

            {/* Tratativa Quote from Page 3 */}
            <div className="bg-blue-50/80 border border-blue-200/80 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
              <MessageSquareQuote className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-blue-950 mb-0.5">Tratativa Recomendada:</strong>
                <span>
                  Separar motivos de insatisfação ligados à experiência de atendimento daqueles decorrentes de processos ou regras institucionais, direcionando cada caso para a área adequada.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="flex justify-between items-center border-t border-[#e2e8f0] pt-3 text-xs md:text-sm text-[#64748b]">
        <div>{metadata.title} • {metadata.institutionDept}</div>
        <div className="font-semibold text-slate-700">Página 5</div>
      </div>
    </div>
  );
};
