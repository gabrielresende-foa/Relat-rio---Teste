import { ReportDataset } from '../types';

export const julyDataset: ReportDataset = {
  id: 'julho',
  name: 'Julho (Mensal - Histórico)',
  periodType: 'mensal',
  periodLabel: 'Julho',
  metadata: {
    title: 'Relatório de Atendimento – Julho',
    badge: 'Apresentação para Presidência',
    subtitle: 'Indicadores de volume, tempo de resposta e satisfação dos alunos em Julho.',
    institutionDept: 'Relacionamento e Captação - Assessoria de Marketing',
    monthYear: 'Julho',
    periodLabel: 'Julho',
    totalPages: 6,
  },
  kpis: [
    {
      id: 'conversas',
      label: 'Conversas Criadas',
      value: '1.909',
      desc: 'Atendimentos abertos na Central de Atendimento durante o mês de Julho.',
      colorScheme: 'primary',
      badge: 'Central',
      tooltipDetail: 'Representa 38,4% de toda a demanda da instituição em Julho.'
    },
    {
      id: 'crescimento',
      label: 'Crescimento de Volume',
      value: '+82,3%',
      desc: 'Aumento na quantidade de conversas em relação ao mês anterior.',
      colorScheme: 'success',
      badge: 'Expansão',
      tooltipDetail: 'Forte aumento sazonal atribuído a rematrículas e novos ingressantes.'
    },
    {
      id: 'central-bot',
      label: 'Central + Assistente Bot',
      value: '51,6%',
      desc: 'Soma de tudo o que foi atendido pela Equipe de Atendimento e pelo Assistente Bot.',
      colorScheme: 'primary',
      badge: 'Maioria dos Chamados',
      tooltipDetail: 'Mais da metade de todos os chamados da instituição concentrados nestes dois canais.'
    },
    {
      id: 'total-instituicao',
      label: 'Total da Instituição',
      value: '4.975',
      desc: 'Total de chamados em todos os setores no mês.',
      colorScheme: 'dark',
      badge: 'Geral',
      tooltipDetail: 'Volume global distribuído entre 10 setores institucionais monitorados.'
    },
    {
      id: 'fatia-central',
      label: 'Central de Atendimento',
      value: '38,4%',
      desc: 'Fatia de atendimentos diretos feitos pela Central (1.909).',
      colorScheme: 'primary',
      badge: 'Principal Canal',
      tooltipDetail: 'Canal humano direto de maior relevância institucional.'
    },
    {
      id: 'fatia-bot',
      label: 'Assistente Bot',
      value: '13,3%',
      desc: 'Fatia de dúvidas resolvidas direto pelo robô (659).',
      colorScheme: 'teal',
      badge: 'Automação',
      tooltipDetail: '659 chamados resolvidos sem necessidade de intervenção de atendentes humanos.'
    },
  ],
  sectors: [
    {
      id: 'central',
      name: 'Central de Atendimento',
      volume: 1909,
      percentage: 38.4,
      highlightType: 'central',
      description: 'Atendimento direto geral e dúvidas acadêmicas/operacionais.'
    },
    {
      id: 'bolsa',
      name: 'Bolsa Social – CEBAS',
      volume: 1559,
      percentage: 31.3,
      highlightType: 'regular',
      description: 'Demandas sobre processos de bolsas sociais e documentação.'
    },
    {
      id: 'bot',
      name: 'Geral (Assistente Bot)',
      volume: 659,
      percentage: 13.2,
      highlightType: 'bot',
      description: 'Autoatendimento automatizado em nível inicial de triagem.'
    },
    {
      id: 'financeiro',
      name: 'Financeiro',
      volume: 439,
      percentage: 8.8,
      highlightType: 'regular',
      description: 'Boletos, negociações financeiras e acordos de mensalidade.'
    },
    {
      id: 'medicina',
      name: 'Medicina',
      volume: 141,
      percentage: 2.8,
      highlightType: 'regular',
      description: 'Coordenação e suporte específico ao curso de Medicina.'
    },
    {
      id: 'policlinica',
      name: 'Policlínica',
      volume: 84,
      percentage: 1.7,
      highlightType: 'regular',
      description: 'Agendamentos e dúvidas sobre a clínica de saúde universitária.'
    },
    {
      id: 'secretaria',
      name: 'Secretaria Geral',
      volume: 81,
      percentage: 1.6,
      highlightType: 'regular',
      description: 'Emissão de declarações, históricos e certidões acadêmicas.'
    },
    {
      id: 'estagio',
      name: 'Central de Estágio',
      volume: 44,
      percentage: 0.9,
      highlightType: 'regular',
      description: 'Termos de compromisso de estágio e validação de convênios.'
    },
    {
      id: 'ead',
      name: 'EAD / Assistente GPT',
      volume: 31,
      percentage: 0.6,
      highlightType: 'regular',
      description: 'Plataforma virtual de aprendizagem e auxílio com inteligência artificial.'
    },
    {
      id: 'juridico',
      name: 'Assessoria Jurídica',
      volume: 29,
      percentage: 0.6,
      highlightType: 'regular',
      description: 'Questões normativas, termos legais e pareceres contratuais.'
    },
  ],
  responseTime: {
    queueTime: {
      title: 'Fila em menos de 5 min',
      percentage: 55,
      count: 761,
      total: 1377,
      under5MinPct: 55,
      over5MinPct: 45,
      under5MinDesc: '55% atendidos em menos de 5 min (761 conversas)',
      over5MinDesc: '45% acima de 5 min (616 conversas)',
      averageTime: '52min',
      ranges: [
        { range: '< 5 min', percentage: 55, count: 761, color: '#10b981' },
        { range: '5–10 min', percentage: 10, count: 133, color: '#eab308' },
        { range: '10–30 min', percentage: 9, count: 129, color: '#f59e0b' },
        { range: '30 min–1h', percentage: 3, count: 42, color: '#b45309' },
        { range: '1–6h', percentage: 2, count: 28, color: '#f87171' },
        { range: '6–24h', percentage: 15, count: 212, color: '#ef4444' },
        { range: '> 24h', percentage: 5, count: 72, color: '#991b1b' },
      ],
    },
    agentResponseTime: {
      title: 'Resposta do agente em menos de 5 min',
      percentage: 68,
      count: 949,
      total: 1395,
      under5MinPct: 68,
      over5MinPct: 32,
      under5MinDesc: '68% respondidos em menos de 5 min (949 conversas)',
      over5MinDesc: '32% acima de 5 min (446 conversas)',
      averageTime: '18min',
      ranges: [
        { range: '< 5 min', percentage: 68, count: 949, color: '#10b981' },
        { range: '5–10 min', percentage: 15, count: 211, color: '#eab308' },
        { range: '10–30 min', percentage: 10, count: 140, color: '#f59e0b' },
        { range: '30 min–1h', percentage: 1, count: 17, color: '#b45309' },
        { range: '1–6h', percentage: 4, count: 61, color: '#f87171' },
        { range: '6–24h', percentage: 1, count: 14, color: '#ef4444' },
        { range: '> 24h', percentage: 0, count: 3, color: '#991b1b' },
      ],
    },
    insight: {
      tag: 'O que estes números mostram?',
      text: 'A maioria das conversas tem início ágil: 55% da fila e 68% das respostas de agentes ocorrem em menos de 5 minutos. Na atuação direta dos atendentes, 93% das respostas são dadas em até 30 minutos.',
    }
  },
  satisfaction: {
    approvalRate: '84,9%',
    averageScore: '4,3 / 5',
    totalEvaluations: 53,
    evaluationsPctOfTotal: '2,8%',
    categories: [
      { label: 'Muito Satisfeito (32)', count: 32, percentage: 60, color: '#059669', stars: 5 },
      { label: 'Satisfeito (13)', count: 13, percentage: 25, color: '#3b82f6', stars: 4 },
      { label: 'Neutro (3)', count: 3, percentage: 6, color: '#94a3b8', stars: 3 },
      { label: 'Insatisfeito (2)', count: 2, percentage: 4, color: '#f59e0b', stars: 2 },
      { label: 'Muito Insatisfeito (3)', count: 3, percentage: 6, color: '#ef4444', stars: 1 },
    ],
    positiveHighlight: {
      title: 'Resultado Positivo',
      desc: '45 das 53 avaliações foram positivas (cerca de 85%), mostrando que as pessoas que responderam gostaram do atendimento recebido.'
    },
    attentionHighlight: {
      title: 'Atenção à Quantidade de Respostas',
      desc: 'Apenas 2,8% das conversas foram avaliadas (53 respostas em 1.909 atendimentos).'
    }
  },
  supervision: {
    strengths: [
      { title: 'Principal Canal', desc: 'A Central atende 38,4% de toda a instituição.' },
      { title: 'Ajuda da Automação', desc: 'O Bot resolveu 13,3% das dúvidas de forma direta.' },
      { title: 'Trabalho em Conjunto', desc: 'Central e Bot cuidam de 51,6% dos chamados.' },
      { title: 'Nota Alta', desc: '84,9% de aprovação entre quem respondeu.' },
    ],
    actionPoints: [
      { title: 'Investigar Filas Longas', desc: 'Checar os casos demorados que aumentam o tempo médio.' },
      { title: 'Acompanhar Respostas', desc: 'Verificar conversas em que os atendentes demoraram para responder.' },
      { title: 'Aumentar Respostas da Pesquisa', desc: 'Buscar formas de mais alunos avaliarem o atendimento.' },
      { title: 'Separar Reclamações', desc: 'Diferenciar insatisfação com o atendimento de insatisfação com regras da instituição.' },
    ],
    conclusion: 'A Central é o canal mais importante de atendimento. Os próximos passos devem focar em diminuir os casos de longa espera e fazer com que mais alunos respondam à pesquisa de satisfação.'
  }
};

export const quarterlyDataset: ReportDataset = {
  id: 'trimestral-q3',
  name: 'Relatório Trimestral (01/07 a 25/09)',
  periodType: 'trimestral',
  periodLabel: '01/07 a 25/09',
  metadata: {
    title: 'Dashboard de Atendimento',
    badge: 'Relatório Trimestral (01/07 a 25/09)',
    subtitle: 'Visão executiva do período de 01/07 a 25/09 • Indicadores de volume, tempo e satisfação',
    institutionDept: 'Relacionamento e Captação',
    monthYear: '01/07 a 25/09',
    periodLabel: '01/07 a 25/09',
    totalPages: 6,
  },
  kpis: [
    {
      id: 'conversas',
      label: 'Conversas Criadas',
      value: '7.610',
      desc: 'Atendimentos abertos na Central de Atendimento no período.',
      colorScheme: 'primary',
      badge: '↑ 142% vs. Tri Anterior',
      tooltipDetail: 'Crescimento operacional de 142% em relação ao trimestre anterior (7.610 conversas).'
    },
    {
      id: 'participacao',
      label: 'Participação Institucional',
      value: '47,1%',
      desc: '7.610 de 16.172 atendimentos de toda a instituição.',
      colorScheme: 'primary',
      badge: 'Central de Atendimento',
      tooltipDetail: 'A Central de Atendimento concentra isoladamente quase metade de toda a demanda da instituição.'
    },
    {
      id: 'central-geral',
      label: 'Central + Fila Geral',
      value: '58,5%',
      desc: '9.467 atendimentos equivalentes a 58,5% do volume institucional.',
      colorScheme: 'teal',
      badge: 'Maioria dos Chamados',
      tooltipDetail: 'Central de Atendimento (7.610) + Fila Geral (1.857) somam 9.467 atendimentos.'
    },
    {
      id: 'total-instituicao',
      label: 'Total da Instituição',
      value: '16.172',
      desc: 'Total de atendimentos registrados em todos os setores no período.',
      colorScheme: 'dark',
      badge: 'Geral',
      tooltipDetail: 'Volume global distribuído entre 12 setores e filas monitoradas.'
    },
    {
      id: 'fila-5min',
      label: 'Fila em < 5 min',
      value: '55%',
      desc: '2.574 de 4.714 conversas que entraram em fila atendidas em < 5 min.',
      colorScheme: 'success',
      badge: 'Tempo Médio: 5h30',
      tooltipDetail: '55% das conversas em fila aguardaram menos de 5 min; média de 5h30 evidencia casos de espera prolongada.'
    },
    {
      id: 'resposta-agente',
      label: 'Resposta do Agente < 5 min',
      value: '73%',
      desc: '3.303 de 4.531 respondidas (85% respondidas em até 10 min).',
      colorScheme: 'primary',
      badge: 'Tempo Médio: 26min10s',
      tooltipDetail: '73% respondidas em menos de 5 min e 85% em até 10 min; média geral de 26min10s.'
    },
  ],
  sectors: [
    {
      id: 'central',
      name: 'Central de atendimento',
      volume: 7610,
      percentage: 47.1,
      highlightType: 'central',
      description: 'Atendimento direto geral e dúvidas acadêmicas/operacionais da instituição.'
    },
    {
      id: 'bolsa',
      name: 'Bolsa Social – CEBAS',
      volume: 3326,
      percentage: 20.6,
      highlightType: 'regular',
      description: 'Processos de bolsas sociais, comprovação socioeconômica e CEBAS.'
    },
    {
      id: 'geral',
      name: 'Geral',
      volume: 1857,
      percentage: 11.5,
      highlightType: 'bot',
      description: 'Fila geral / autoatendimento integrado inicial.'
    },
    {
      id: 'financeiro',
      name: 'Financeiro',
      volume: 1224,
      percentage: 7.6,
      highlightType: 'regular',
      description: 'Boletos, negociações financeiras, mensalidades e acordos.'
    },
    {
      id: 'policlinica',
      name: 'Policlínica',
      volume: 898,
      percentage: 5.6,
      highlightType: 'regular',
      description: 'Agendamentos e dúvidas sobre a clínica de saúde universitária.'
    },
    {
      id: 'medicina',
      name: 'Medicina',
      volume: 516,
      percentage: 3.2,
      highlightType: 'regular',
      description: 'Coordenação e suporte específico aos alunos do curso de Medicina.'
    },
    {
      id: 'secretaria',
      name: 'Secretaria Geral',
      volume: 286,
      percentage: 1.8,
      highlightType: 'regular',
      description: 'Emissão de declarações, históricos e certidões acadêmicas.'
    },
    {
      id: 'estagio',
      name: 'Central de estágio',
      volume: 160,
      percentage: 1.0,
      highlightType: 'regular',
      description: 'Termos de compromisso de estágio e validação de convênios.'
    },
    {
      id: 'ead',
      name: 'EAD',
      volume: 156,
      percentage: 1.0,
      highlightType: 'regular',
      description: 'Ambiente virtual de aprendizagem e cursos à distância.'
    },
    {
      id: 'juridico',
      name: 'Assessoria jurídica',
      volume: 135,
      percentage: 0.8,
      highlightType: 'regular',
      description: 'Questões normativas, termos legais e pareceres contratuais.'
    },
    {
      id: 'gpt',
      name: 'Assistente GPT',
      volume: 3,
      percentage: 0.0,
      highlightType: 'regular',
      description: 'Testes de inteligência artificial generativa.'
    },
    {
      id: 'cebe',
      name: 'Cebê - FOA',
      volume: 1,
      percentage: 0.0,
      highlightType: 'regular',
      description: 'Atendimento especializado Fundação Oswaldo Aranha.'
    },
  ],
  responseTime: {
    queueTime: {
      title: 'Tempo de fila',
      percentage: 55,
      count: 2574,
      total: 4714,
      under5MinPct: 55,
      over5MinPct: 45,
      under5MinDesc: '55% atendidos em menos de 5 min (2.574 conversas)',
      over5MinDesc: '45% acima de 5 min (2.140 conversas)',
      averageTime: '5h30',
      ranges: [
        { range: '< 5 min', percentage: 55, count: 2574, color: '#10b981' },
        { range: '5–10 min', percentage: 10, count: 491, color: '#eab308' },
        { range: '10–30 min', percentage: 11, count: 540, color: '#f59e0b' },
        { range: '30 min–1h', percentage: 4, count: 205, color: '#b45309' },
        { range: '1–6h', percentage: 4, count: 166, color: '#f87171' },
        { range: '6–24h', percentage: 11, count: 530, color: '#ef4444' },
        { range: '> 24h', percentage: 4, count: 208, color: '#991b1b' },
      ],
    },
    agentResponseTime: {
      title: 'Resposta do agente',
      percentage: 73,
      count: 3303,
      total: 4531,
      under5MinPct: 73,
      over5MinPct: 27,
      under5MinDesc: '73% respondidos em menos de 5 min (3.303 conversas)',
      over5MinDesc: '27% acima de 5 min (1.228 conversas)',
      averageTime: '26min10s',
      under10MinPct: 85,
      under10MinDesc: '85% respondidas em até 10 min (73% + 12%)',
      ranges: [
        { range: '< 5 min', percentage: 73, count: 3303, color: '#10b981' },
        { range: '5–10 min', percentage: 12, count: 557, color: '#eab308' },
        { range: '10–30 min', percentage: 9, count: 421, color: '#f59e0b' },
        { range: '30 min–1h', percentage: 2, count: 70, color: '#b45309' },
        { range: '1–6h', percentage: 3, count: 150, color: '#f87171' },
        { range: '6–24h', percentage: 1, count: 24, color: '#ef4444' },
        { range: '> 24h', percentage: 0, count: 6, color: '#991b1b' },
      ],
    },
    insight: {
      tag: 'Leitura Executiva dos Tempos',
      text: '73% das respostas dos agentes ocorreram em menos de 5 minutos e 85% em até 10 minutos (3.860 conversas), apesar da média geral de 26min10s. Na fila de espera, 55% das conversas aguardaram menos de 5 minutos (2.574 de 4.714), mas a média de 5h30 evidencia casos de espera prolongada, sobretudo nas faixas de 6–24h (530 chamados) e > 24h (208 chamados) decorrentes de mensagens enviadas fora do horário comercial.',
    }
  },
  satisfaction: {
    approvalRate: '84,72%',
    averageScore: '4,28 / 5',
    totalEvaluations: 72,
    evaluationsPctOfTotal: '0,95%',
    categories: [
      { label: 'Muito satisfeito (41)', count: 41, percentage: 57, color: '#059669', stars: 5 },
      { label: 'Satisfeito (20)', count: 20, percentage: 28, color: '#3b82f6', stars: 4 },
      { label: 'Neutro (5)', count: 5, percentage: 7, color: '#94a3b8', stars: 3 },
      { label: 'Insatisfeito (2)', count: 2, percentage: 3, color: '#f59e0b', stars: 2 },
      { label: 'Muito insatisfeito (4)', count: 4, percentage: 6, color: '#ef4444', stars: 1 },
    ],
    positiveHighlight: {
      title: 'CSAT em Patamar Positivo (84,72%)',
      desc: 'O resultado é positivo entre quem respondeu: 61 das 72 avaliações foram favoráveis (85% somando muito satisfeito e satisfeito), alcançando nota média de 4,28 / 5.'
    },
    attentionHighlight: {
      title: 'Ponto de Atenção: CSAT e Amostragem',
      desc: 'As 72 avaliações representam apenas cerca de 0,95% sobre 7.610 conversas do período. É necessário ampliar a participação dos alunos na pesquisa para maior representatividade.'
    }
  },
  supervision: {
    strengths: [
      { title: 'Volume em Expansão', desc: 'Foram 7.610 conversas no período, com expressivo crescimento operacional de 142% em relação ao trimestre anterior.' },
      { title: 'Liderança da Central', desc: 'Alta participação da Central (47,1% dos 16.172 atendimentos) e, somada à fila Geral, concentra 58,5% (9.467 atendimentos).' },
      { title: 'Resposta Inicial Concentrada', desc: '73% das respostas dos agentes ocorreram em menos de 5 min e 85% em até 10 min (3.860 conversas respondidas).' },
      { title: 'CSAT Positivo', desc: '84,72% de aprovação e nota média de 4,28 / 5 entre os respondentes da pesquisa de satisfação.' },
    ],
    actionPoints: [
      { title: 'Ponto de Atenção na Fila', desc: '55% das conversas aguardaram menos de 5 min, mas a média de 5h30 evidencia casos de espera prolongada (738 chamados acima de 6h).' },
      { title: 'Aumentar Adesão à Pesquisa CSAT', desc: 'Apenas 0,95% das conversas foram avaliadas (72 de 7.610), o que limita a representatividade estatística do índice.' },
      { title: 'Tratativa e Segregação de Motivos', desc: 'Separar motivos de insatisfação ligados à experiência de atendimento daqueles decorrentes de processos ou regras institucionais.' },
      { title: 'Direcionamento Especializado', desc: 'Encaminhar casos procedimentais para as áreas responsáveis, reduzindo o impacto de regras na percepção do atendimento.' },
    ],
    conclusion: 'O balanço do período (01/07 a 25/09) demonstra robustez operacional: crescimento de 142% com 85% das respostas de atendentes em até 10 minutos e aprovação de 84,72%. As prioridades executivas são: mitigar tempos de fila fora do expediente, elevar a taxa de adesão ao CSAT para além de 0,95% e segregar insatisfações de processos das de atendimento.'
  }
};

export const defaultDatasets: ReportDataset[] = [
  quarterlyDataset,
  julyDataset,
];

// Re-exports for backwards compatibility
export const presentationMetadata = quarterlyDataset.metadata;
export const kpiItems = quarterlyDataset.kpis;
export const sectorsData = quarterlyDataset.sectors;
export const responseTimeMetrics = quarterlyDataset.responseTime;
export const satisfactionMetrics = quarterlyDataset.satisfaction;
export const supervisoryPoints = quarterlyDataset.supervision;
