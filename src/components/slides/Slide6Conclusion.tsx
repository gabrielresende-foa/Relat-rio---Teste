import React from 'react';
import { useReportData } from '../../context/ReportContext';
import { CheckCircle, AlertTriangle, ArrowRightCircle, Lightbulb, Compass, FileCheck } from 'lucide-react';

export const Slide6Conclusion: React.FC = () => {
  const { activeDataset } = useReportData();
  const { metadata, supervision } = activeDataset;

  return (
    <div
      id="slide-6"
      className="w-full h-full relative flex flex-col justify-between p-8 md:p-12 bg-white text-[#0f172a] overflow-hidden select-none"
    >
      <div>
        {/* Slide Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-[#0f172a] tracking-tight flex items-center gap-3">
              <span className="inline-block w-1.5 h-7 bg-[#1d4ed8] rounded-xs" />
              Leitura executiva e tratativas
            </h2>
            <p className="text-xs md:text-sm text-[#64748b] mt-0.5 ml-4 font-normal">
              Indicadores que merecem destaque, acompanhamento e plano de ação ({metadata.periodLabel})
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Fonte: Relatório de Atendimento – Período 01/07 a 25/09</span>
          </div>
        </div>

        {/* 3 Pillars Grid: Pontos Positivos, Acompanhar, Tratativa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Col 1: Pontos Positivos */}
          <div className="bg-white border border-[#e2e8f0] border-t-4 border-t-[#059669] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-[#059669] text-base font-bold mb-3">
                <CheckCircle className="w-4 h-4" />
                <span>Pontos Positivos</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-[#0f172a]">
                {supervision.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#059669] font-bold text-sm leading-none select-none mt-0.5">•</span>
                    <span className="leading-snug">
                      <strong className="text-slate-900 font-bold">{item.title}:</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-emerald-700 font-semibold bg-emerald-50/70 px-2.5 py-1 rounded-lg">
              Expansão expressiva com 85% de respostas rápidas (&lt; 10 min)
            </div>
          </div>

          {/* Col 2: Acompanhar (Atenção) */}
          <div className="bg-white border border-[#e2e8f0] border-t-4 border-t-[#d97706] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-[#b45309] text-base font-bold mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Acompanhar</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-[#0f172a]">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-sm leading-none select-none mt-0.5">•</span>
                  <span className="leading-snug">
                    <strong className="text-slate-900 font-bold">Casos de espera prolongada na fila:</strong> 55% aguardam &lt; 5 min, porém a média de 5h30 reflete acúmulos fora do expediente comercial.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-sm leading-none select-none mt-0.5">•</span>
                  <span className="leading-snug">
                    <strong className="text-slate-900 font-bold">Baixa participação no CSAT:</strong> Apenas 72 avaliações (~0,95% sobre 7.610 conversas), o que limita a representatividade da nota.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-sm leading-none select-none mt-0.5">•</span>
                  <span className="leading-snug">
                    <strong className="text-slate-900 font-bold">Demanda de horário estendido:</strong> Mensagens noturnas e de fins de semana geram picos de espera na primeira hora da manhã.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-amber-800 font-semibold bg-amber-50/70 px-2.5 py-1 rounded-lg">
              Pontos prioritários de controle operacional
            </div>
          </div>

          {/* Col 3: Tratativa (Ação) */}
          <div className="bg-white border border-[#e2e8f0] border-t-4 border-t-[#2563eb] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-[#1d4ed8] text-base font-bold mb-3">
                <ArrowRightCircle className="w-4 h-4" />
                <span>Tratativa</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-[#0f172a]">
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold text-sm leading-none select-none mt-0.5">•</span>
                  <span className="leading-snug">
                    <strong className="text-slate-900 font-bold">Segregação de insatisfações:</strong> Separar motivos de insatisfação ligados à experiência de atendimento daqueles decorrentes de processos ou regras institucionais.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold text-sm leading-none select-none mt-0.5">•</span>
                  <span className="leading-snug">
                    <strong className="text-slate-900 font-bold">Roteamento para áreas específicas:</strong> Direcionar cada caso regulatório para a área adequada, desonerando a Central de desgaste institucional.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold text-sm leading-none select-none mt-0.5">•</span>
                  <span className="leading-snug">
                    <strong className="text-slate-900 font-bold">Incentivo ativo ao feedback:</strong> Implementar mensagem de encerramento pelo bot/atendente com avaliação direta para elevar a adesão.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-blue-800 font-semibold bg-blue-50/70 px-2.5 py-1 rounded-lg">
              Direcionamento tático para as próximas semanas
            </div>
          </div>
        </div>

        {/* Executive Conclusion Banner */}
        <div className="bg-[#0f172a] text-white px-5 py-3 rounded-2xl text-center shadow-lg relative overflow-hidden border border-slate-800">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-blue-400" />
            <strong className="text-[#60a5fa] text-[11px] uppercase tracking-widest font-bold">
              Síntese Executiva
            </strong>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-normal text-slate-200 max-w-4xl mx-auto">
            {supervision.conclusion}
          </p>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="flex justify-between items-center border-t border-[#e2e8f0] pt-2.5 text-xs text-[#64748b]">
        <div>{metadata.title} • {metadata.institutionDept}</div>
        <div className="font-semibold text-slate-700">Página 6</div>
      </div>
    </div>
  );
};
