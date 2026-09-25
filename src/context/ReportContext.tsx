import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReportDataset } from '../types';
import { defaultDatasets, julyDataset, quarterlyDataset } from '../data/presentationData';

interface ReportContextType {
  activeDataset: ReportDataset;
  activeDatasetId: string;
  datasets: ReportDataset[];
  selectDataset: (id: string) => void;
  updateDataset: (updated: ReportDataset) => void;
  resetDataset: (id: string) => void;
  importJson: (jsonString: string) => { success: boolean; error?: string };
  exportJson: () => string;
}

const STORAGE_KEY = 'report_datasets_trimestral_pdf_v3';
const ACTIVE_ID_KEY = 'report_active_id_pdf_v3';

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [datasets, setDatasets] = useState<ReportDataset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to default
    }
    return defaultDatasets;
  });

  const [activeDatasetId, setActiveDatasetId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(ACTIVE_ID_KEY);
      if (savedId) return savedId;
    } catch {
      // ignore
    }
    // Default to the quarterly dataset as requested by the user!
    return quarterlyDataset.id;
  });

  const activeDataset =
    datasets.find((d) => d.id === activeDatasetId) ||
    datasets[0] ||
    quarterlyDataset;

  const selectDataset = (id: string) => {
    setActiveDatasetId(id);
    try {
      localStorage.setItem(ACTIVE_ID_KEY, id);
    } catch {
      // ignore
    }
  };

  const updateDataset = (updated: ReportDataset) => {
    setDatasets((prev) => {
      const exists = prev.some((d) => d.id === updated.id);
      const next = exists
        ? prev.map((d) => (d.id === updated.id ? updated : d))
        : [...prev, updated];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetDataset = (id: string) => {
    let original: ReportDataset | undefined;
    if (id === 'julho') original = julyDataset;
    else if (id === 'trimestral-q3') original = quarterlyDataset;

    if (original) {
      updateDataset(original);
    }
  };

  const importJson = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.metadata || !parsed.kpis || !parsed.sectors) {
        return {
          success: false,
          error: 'O JSON deve conter ao menos os campos "metadata", "kpis" e "sectors".',
        };
      }
      const newDataset: ReportDataset = {
        id: parsed.id || `custom-${Date.now()}`,
        name: parsed.name || 'Dataset Importado',
        periodType: parsed.periodType || 'customizado',
        periodLabel: parsed.periodLabel || parsed.metadata?.periodLabel || 'Personalizado',
        metadata: parsed.metadata,
        kpis: parsed.kpis,
        sectors: parsed.sectors,
        responseTime: parsed.responseTime || activeDataset.responseTime,
        satisfaction: parsed.satisfaction || activeDataset.satisfaction,
        supervision: parsed.supervision || activeDataset.supervision,
      };

      updateDataset(newDataset);
      selectDataset(newDataset.id);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: `Falha ao interpretar JSON: ${(err as Error).message}`,
      };
    }
  };

  const exportJson = (): string => {
    return JSON.stringify(activeDataset, null, 2);
  };

  return (
    <ReportContext.Provider
      value={{
        activeDataset,
        activeDatasetId,
        datasets,
        selectDataset,
        updateDataset,
        resetDataset,
        importJson,
        exportJson,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportData = (): ReportContextType => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReportData must be used within a ReportProvider');
  }
  return context;
};
