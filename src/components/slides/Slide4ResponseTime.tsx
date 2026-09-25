import React, { useState } from 'react';
import { useReportData } from '../../context/ReportContext';
import { Clock, Zap, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Slide4ResponseTime: React.FC = () => {
  const [activeQueueRange, setActiveQueueRange] = useState<string | null>(null);
  const [activeAgentRange, setActiveAgentRange] = useState<string | null>(null);

  const { activeDataset } = useReportData();
  const { metadata, responseTime } = activeDataset;
  const { queueTime, agentResponseTime, insight } = responseTime;

  return (
    <div
      id="slide-4"
      className="w-full h-full relative flex flex-col justify-between p-8 md:p-10 bg-white text-[#0f172a] overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Slide Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-[#0f172a] tracking-tight flex items-center gap-3">
              <span className="inline-block w-1.5 h-7 bg-[#1d4ed8] rounded-xs" />
              Tempo de resposta e espera nas conversas
            </h2>
            <p className="text-xs md:text-sm text-[#64748b] mt-0.5 ml-4 font-normal">
              Indicadores de agilidade inicial (&lt; 5 min) e distribuição detalhada por faixa de tempo ({metadata.periodLabel})
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Base consolidada de {metadata.periodLabel}</span>
          </div>
        </div>

        {/* Top 2 Executive KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Fila em menos de 5min */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] hover:border-emerald-300 rounded-xl px-5 py-3 shadow-2xs transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-[#0f172a] text-sm md:text-base">
                  {queueTime.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {queueTime.averageTime && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300/60">
                    Tempo médio: {queueTime.averageTime}
                  </span>
                )}
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Fila &lt; 5 min
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mt-1.5 mb-2">
              <span className="text-3xl md:text-4xl font-extrabold text-[#0f172a] leading-none tracking-tight">
                {queueTime.percentage}%
              </span>
              <span className="text-xs text-[#64748b] font-medium">
                {queueTime.count.toLocaleString('pt-BR')} de {queueTime.total.toLocaleString('pt-BR')} conversas em fila
              </span>
            </div>

            {/* Split Progress Visual */}
            <div className="h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-[#059669] h-full transition-all duration-500 rounded-l-full"
                style={{ width: `${queueTime.under5MinPct}%` }}
                title={`${queueTime.under5MinPct}% em menos de 5 min`}
              />
              <div
                className="bg-[#94a3b8] h-full transition-all duration-500"
                style={{ width: `${queueTime.over5MinPct}%` }}
                title={`${queueTime.over5MinPct}% acima de 5 min`}
              />
            </div>
            <div className="flex justify-between text-[11px] mt-1 text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">{queueTime.under5MinPct}% atendidos em &lt; 5 min</span>
              <span>{queueTime.over5MinPct}% acima de 5 min</span>
            </div>
          </div>

          {/* Resposta do agente */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] hover:border-blue-300 rounded-xl px-5 py-3 shadow-2xs transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-[#0f172a] text-sm md:text-base">
                  {agentResponseTime.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {agentResponseTime.averageTime && (
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-md border border-blue-300/60">
                    Tempo médio: {agentResponseTime.averageTime}
                  </span>
                )}
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Atendentes
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1.5 mb-1.5">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="text-2xl font-extrabold text-[#2563eb] leading-none">
                  {agentResponseTime.percentage}%
                </div>
                <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                  respondidas em &lt; 5 min ({agentResponseTime.count.toLocaleString('pt-BR')})
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="text-2xl font-extrabold text-emerald-700 leading-none">
                  {agentResponseTime.under10MinPct || 85}%
                </div>
                <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                  respondidas em até 10 min* (3.860)
                </div>
              </div>
            </div>

            {/* Split Progress Visual */}
            <div className="h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-[#2563eb] h-full transition-all duration-500 rounded-l-full"
                style={{ width: `${agentResponseTime.under5MinPct}%` }}
                title={`${agentResponseTime.under5MinPct}% em menos de 5 min`}
              />
              <div
                className="bg-[#94a3b8] h-full transition-all duration-500"
                style={{ width: `${agentResponseTime.over5MinPct}%` }}
                title={`${agentResponseTime.over5MinPct}% acima de 5 min`}
              />
            </div>
            <div className="flex justify-between text-[10px] mt-1 text-slate-500 font-medium">
              <span>*Soma das faixas exibidas pelo sistema: 73% + 12%</span>
              <span className="text-blue-700 font-semibold">{agentResponseTime.total.toLocaleString('pt-BR')} conversas respondidas</span>
            </div>
          </div>
        </div>

        {/* Middle Section: 2 Detailed Range Distributions */}
        <div className="grid grid-cols-2 gap-4">
          {/* Card Left: Tempo de fila por faixa */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  Distribuição das {queueTime.total.toLocaleString('pt-BR')} conversas em fila
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Total: {queueTime.total.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {queueTime.ranges.map((item) => {
                const isHovered = activeQueueRange === item.range;
                return (
                  <div
                    key={item.range}
                    onMouseEnter={() => setActiveQueueRange(item.range)}
                    onMouseLeave={() => setActiveQueueRange(null)}
                    className={`flex items-center gap-2.5 text-xs py-0.5 px-2 rounded-md transition-colors ${
                      isHovered ? 'bg-slate-50 ring-1 ring-blue-200' : ''
                    }`}
                  >
                    <span className="w-16 text-slate-600 font-semibold text-[11px]">
                      {item.range}
                    </span>

                    {/* Progress track */}
                    <div className="flex-1 bg-[#f1f5f9] rounded-md h-[18px] overflow-hidden relative">
                      <div
                        className="h-full rounded-md transition-all duration-500 shadow-2xs"
                        style={{
                          width: `${Math.max(2, item.percentage)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>

                    {/* Numbers: Percentage & Count */}
                    <div className="w-24 flex items-center justify-end gap-2 text-right">
                      <span className="font-bold text-slate-800 text-xs w-8">
                        {item.percentage}%
                      </span>
                      <span className="font-mono text-slate-500 text-[11px] w-12">
                        {item.count.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] text-slate-400 mt-2 italic">
              Percentuais por faixa reproduzem os valores exibidos no sistema e podem apresentar diferença por arredondamento.
            </div>
          </div>

          {/* Card Right: Tempo de resposta do agente por faixa */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  Distribuição das {agentResponseTime.total.toLocaleString('pt-BR')} conversas respondidas
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Total: {agentResponseTime.total.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {agentResponseTime.ranges.map((item) => {
                const isHovered = activeAgentRange === item.range;
                return (
                  <div
                    key={item.range}
                    onMouseEnter={() => setActiveAgentRange(item.range)}
                    onMouseLeave={() => setActiveAgentRange(null)}
                    className={`flex items-center gap-2.5 text-xs py-0.5 px-2 rounded-md transition-colors ${
                      isHovered ? 'bg-slate-50 ring-1 ring-blue-200' : ''
                    }`}
                  >
                    <span className="w-16 text-slate-600 font-semibold text-[11px]">
                      {item.range}
                    </span>

                    {/* Progress track */}
                    <div className="flex-1 bg-[#f1f5f9] rounded-md h-[18px] overflow-hidden relative">
                      <div
                        className="h-full rounded-md transition-all duration-500 shadow-2xs"
                        style={{
                          width: `${Math.max(2, item.percentage)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>

                    {/* Numbers: Percentage & Count */}
                    <div className="w-24 flex items-center justify-end gap-2 text-right">
                      <span className="font-bold text-slate-800 text-xs w-8">
                        {item.percentage}%
                      </span>
                      <span className="font-mono text-slate-500 text-[11px] w-12">
                        {item.count.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] text-slate-400 mt-2 italic">
              85% das conversas são respondidas em até 10 minutos por atendentes humanos.
            </div>
          </div>
        </div>

        {/* Executive Insight Box */}
        <div className="bg-[#0f172a] border-l-[5px] border-[#2563eb] rounded-xl px-5 py-2.5 shadow-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#60a5fa] flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {insight.tag}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              85% respondidas em até 10 min • 55% da fila &lt; 5 min
            </span>
          </div>
          <p className="text-[#e2e8f0] text-xs md:text-[0.82rem] leading-relaxed font-normal">
            {insight.text}
          </p>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="flex justify-between items-center border-t border-[#e2e8f0] pt-2.5 text-xs text-[#64748b]">
        <div>{metadata.title} • {metadata.institutionDept}</div>
        <div className="font-semibold text-slate-700">Página 4</div>
      </div>
    </div>
  );
};
