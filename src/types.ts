export type ViewMode = 'slides' | 'scroll';

export interface PresentationMetadata {
  title: string;
  badge: string;
  subtitle: string;
  institutionDept: string;
  monthYear: string;
  periodLabel: string;
  totalPages: number;
}

export interface KPIItem {
  id: string;
  label: string;
  value: string;
  desc: string;
  colorScheme: 'primary' | 'success' | 'dark' | 'teal';
  tooltipDetail?: string;
  badge?: string;
}

export interface SectorVolume {
  id: string;
  name: string;
  volume: number;
  percentage: number;
  highlightType?: 'central' | 'bot' | 'regular';
  description?: string;
}

export interface RatingCategory {
  label: string;
  count: number;
  percentage: number;
  color: string;
  stars: number;
}

export interface TimeRangeItem {
  range: string;
  percentage: number;
  count: number;
  color: string;
}

export interface ResponseTimeData {
  queueTime: {
    title: string;
    percentage: number;
    count: number;
    total: number;
    under5MinPct: number;
    over5MinPct: number;
    under5MinDesc: string;
    over5MinDesc: string;
    averageTime?: string;
    ranges: TimeRangeItem[];
  };
  agentResponseTime: {
    title: string;
    percentage: number;
    count: number;
    total: number;
    under5MinPct: number;
    over5MinPct: number;
    under5MinDesc: string;
    over5MinDesc: string;
    averageTime?: string;
    under10MinPct?: number;
    under10MinDesc?: string;
    ranges: TimeRangeItem[];
  };
  insight: {
    tag: string;
    text: string;
  };
}

export interface SatisfactionData {
  approvalRate: string;
  averageScore: string;
  totalEvaluations: number;
  evaluationsPctOfTotal: string;
  categories: RatingCategory[];
  positiveHighlight: {
    title: string;
    desc: string;
  };
  attentionHighlight: {
    title: string;
    desc: string;
  };
}

export interface SupervisoryPoints {
  strengths: Array<{ title: string; desc: string }>;
  actionPoints: Array<{ title: string; desc: string }>;
  conclusion: string;
}

export interface ReportDataset {
  id: string;
  name: string;
  periodType: 'mensal' | 'trimestral' | 'customizado';
  periodLabel: string;
  metadata: PresentationMetadata;
  kpis: KPIItem[];
  sectors: SectorVolume[];
  responseTime: ResponseTimeData;
  satisfaction: SatisfactionData;
  supervision: SupervisoryPoints;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  pageNumber: number;
}

