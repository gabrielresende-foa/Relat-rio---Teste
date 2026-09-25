import React, { useState } from 'react';
import { useReportData } from '../context/ReportContext';
import { ReportDataset } from '../types';
import { X, Save, RefreshCw, Upload, Download, Check, AlertCircle, FileText, Sliders, Database } from 'lucide-react';

interface DataEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataEditorModal: React.FC<DataEditorModalProps> = ({ isOpen, onClose }) => {
  const { activeDataset, updateDataset, resetDataset, importJson, exportJson } = useReportData();

  const [activeTab, setActiveTab] = useState<'form' | 'json' | 'presets'>('form');
  const [formData, setFormData] = useState<ReportDataset>(() => JSON.parse(JSON.stringify(activeDataset)));
  const [jsonInput, setJsonInput] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Sync form data whenever modal opens or active dataset changes
  React.useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(activeDataset)));
    setJsonInput(JSON.stringify(activeDataset, null, 2));
    setImportStatus(null);
  }, [activeDataset, isOpen]);

  if (!isOpen) return null;

  const handleMetadataChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value,
      },
    }));
  };

  const handleKpiChange = (index: number, key: 'value' | 'label' | 'desc', value: string) => {
    setFormData((prev) => {
      const newKpis = [...prev.kpis];
      newKpis[index] = { ...newKpis[index], [key]: value };
      return { ...prev, kpis: newKpis };
    });
  };

  const handleSectorChange = (index: number, key: 'volume' | 'percentage', value: number) => {
    setFormData((prev) => {
      const newSectors = [...prev.sectors];
      newSectors[index] = { ...newSectors[index], [key]: value };
      return { ...prev, sectors: newSectors };
    });
  };

  const handleSatisfactionChange = (key: 'approvalRate' | 'averageScore' | 'totalEvaluations', value: any) => {
    setFormData((prev) => ({
      ...prev,
      satisfaction: {
        ...prev.satisfaction,
        [key]: value,
      },
    }));
  };

  const handleSaveForm = () => {
    updateDataset(formData);
    setSaveFeedback(true);
    setTimeout(() => {
      setSaveFeedback(false);
      onClose();
    }, 600);
  };

  const handleImportJson = () => {
    const res = importJson(jsonInput);
    if (res.success) {
      setImportStatus({ success: true, message: 'Dados importados e aplicados com sucesso!' });
      setTimeout(() => onClose(), 800);
    } else {
      setImportStatus({ success: false, message: res.error || 'Erro ao importar JSON.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setJsonInput(text);
      try {
        const parsed = JSON.parse(text);
        setFormData(parsed);
      } catch {
        // keep text
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `relatorio_${activeDataset.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Gerenciador de Dados do Relatório
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {activeDataset.name}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Ajuste os números, títulos ou importe dados de outros períodos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/30 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-1.5 px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'form'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Edição Rápida (Campos)
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'json'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Importar / Exportar JSON
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'presets'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Modelos Prontos & Padrões
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {activeTab === 'form' && (
            <div className="space-y-6">
              {/* Section 1: Metadata */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <span>1. Identificação do Relatório</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Título Principal
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.title}
                      onChange={(e) => handleMetadataChange('title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Selo / Badge da Capa
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.badge}
                      onChange={(e) => handleMetadataChange('badge', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Subtítulo Explicativo
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.subtitle}
                      onChange={(e) => handleMetadataChange('subtitle', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Rótulo do Período (ex: Julho a Setembro)
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.monthYear}
                      onChange={(e) => handleMetadataChange('monthYear', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Departamento / Setor
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.institutionDept}
                      onChange={(e) => handleMetadataChange('institutionDept', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: KPIs */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  2. Cartões de Indicadores (Slide 2)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {formData.kpis.map((kpi, idx) => (
                    <div key={kpi.id} className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                        <span>Card {idx + 1}</span>
                        <span className="text-blue-400">{kpi.badge}</span>
                      </div>
                      <input
                        type="text"
                        value={kpi.label}
                        onChange={(e) => handleKpiChange(idx, 'label', e.target.value)}
                        placeholder="Rótulo"
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                      />
                      <input
                        type="text"
                        value={kpi.value}
                        onChange={(e) => handleKpiChange(idx, 'value', e.target.value)}
                        placeholder="Valor (ex: 5.840 ou +34%)"
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm font-extrabold text-white"
                      />
                      <input
                        type="text"
                        value={kpi.desc}
                        onChange={(e) => handleKpiChange(idx, 'desc', e.target.value)}
                        placeholder="Descrição explicativa"
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Sectors */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  3. Distribuição por Setores (Slide 3)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {formData.sectors.map((sec, idx) => (
                    <div key={sec.id} className="flex items-center justify-between gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-xs font-medium text-slate-300 truncate w-32">
                        {sec.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={sec.volume}
                          onChange={(e) => handleSectorChange(idx, 'volume', Number(e.target.value))}
                          className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white text-right"
                          title="Volume (chamados)"
                        />
                        <span className="text-[11px] text-slate-500">qtd</span>
                        <input
                          type="number"
                          step="0.1"
                          value={sec.percentage}
                          onChange={(e) => handleSectorChange(idx, 'percentage', Number(e.target.value))}
                          className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs text-blue-300 text-right font-bold"
                          title="Porcentagem (%)"
                        />
                        <span className="text-[11px] text-slate-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Satisfaction */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  4. Satisfação & Aprovação (Slide 5)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Taxa de Aprovação
                    </label>
                    <input
                      type="text"
                      value={formData.satisfaction.approvalRate}
                      onChange={(e) => handleSatisfactionChange('approvalRate', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Nota Média
                    </label>
                    <input
                      type="text"
                      value={formData.satisfaction.averageScore}
                      onChange={(e) => handleSatisfactionChange('averageScore', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Total de Avaliações
                    </label>
                    <input
                      type="number"
                      value={formData.satisfaction.totalEvaluations}
                      onChange={(e) => handleSatisfactionChange('totalEvaluations', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Você pode colar os dados brutos em JSON, exportar para backup ou subir um arquivo.
                </p>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold cursor-pointer transition-colors text-slate-200">
                    <Upload className="w-3.5 h-3.5" />
                    Subir Arquivo
                    <input type="file" accept=".json,.txt" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <button
                    onClick={handleDownloadJson}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold cursor-pointer transition-colors text-slate-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Baixar JSON
                  </button>
                </div>
              </div>

              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={14}
                className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-4 text-emerald-400 focus:outline-none focus:border-blue-500"
                placeholder="Cole o JSON da apresentação aqui..."
              />

              {importStatus && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium ${
                    importStatus.success
                      ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                      : 'bg-red-950/60 border border-red-800 text-red-300'
                  }`}
                >
                  {importStatus.success ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{importStatus.message}</span>
                </div>
              )}

              <button
                onClick={handleImportJson}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Validar e Aplicar JSON ao Relatório
              </button>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Selecione um dos modelos pré-configurados ou restaure os dados padrão:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                      Modelo Trimestral Atualizado
                    </span>
                    <h4 className="text-base font-bold text-white mb-1">Relatório Trimestral (01/07 a 25/09)</h4>
                    <p className="text-xs text-slate-400 mb-3">
                      Dashboard consolidado com as 7.610 conversas (+142%), 16.172 atendimentos totais, tempos médios (5h30 e 26min10s) e CSAT de 84,72%.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      resetDataset('trimestral-q3');
                      onClose();
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Carregar Padrão Trimestral
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Modelo Mensal
                    </span>
                    <h4 className="text-base font-bold text-white mb-1">Julho (Mensal)</h4>
                    <p className="text-xs text-slate-400 mb-3">
                      Apresentação original com os 1.909 atendimentos da Central de Julho e métricas mensais.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      resetDataset('julho');
                      onClose();
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Carregar Padrão Julho
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {activeTab === 'form' && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/70">
            <span className="text-xs text-slate-400">
              {saveFeedback ? 'Alterações salvas com sucesso!' : 'As alterações são refletidas na hora nos slides.'}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveForm}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  saveFeedback
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                }`}
              >
                {saveFeedback ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saveFeedback ? 'Salvo!' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
