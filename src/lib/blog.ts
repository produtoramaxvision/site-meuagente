export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  coverImage: string;
  readTime: string;
  featured: boolean;
  content: string;
}

// Metadados dos posts (sem o conteúdo em si)
const postsData = [
  {
    slug: "agentes-ia-economizar-tempo",
    title: "Como Agentes de IA no WhatsApp Podem Economizar 40 Horas por Mês",
    description:
      "Descubra como empresas estão automatizando tarefas operacionais e economizando dezenas de horas por mês com Agentes de IA no WhatsApp.",
    category: "Automação",
    tags: ["IA", "WhatsApp", "Produtividade", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-01-16",
    coverImage: "/placeholder.svg",
    readTime: "14h23",
    featured: true,
  },
  {
    slug: "agente-financeiro-controle-total-financas",
    title: "Agente Financeiro: Controle Total de Finanças Direto do WhatsApp",
    description:
      "Descubra como o Agente Financeiro automatiza o controle de receitas, despesas e exportações com categorias inteligentes e alertas automáticos via WhatsApp.",
    category: "Finanças",
    tags: ["Agente Financeiro", "Controle Financeiro", "WhatsApp", "Automação", "Gestão"],
    author: "Equipe Meu Agente",
    date: "2025-11-28",
    coverImage: "/placeholder.svg",
    readTime: "09h15",
    featured: true,
  },
  {
    slug: "agente-web-search-pesquisas-inteligentes",
    title: "Agente Web Search: Pesquisas Inteligentes e Análise de Mercado via WhatsApp",
    description:
      "Aprenda como o Agente Web Search realiza pesquisas na internet, monitora concorrentes e identifica tendências automaticamente pelo WhatsApp.",
    category: "Pesquisa",
    tags: ["Web Search", "Pesquisa", "Inteligência", "Mercado", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-11-29",
    coverImage: "/placeholder.svg",
    readTime: "16h42",
    featured: false,
  },
  {
    slug: "agente-scrape-extracao-dados",
    title: "Agente Scrape: Extração Automatizada de Dados Estruturados",
    description:
      "Aprenda como o Agente Scrape extrai dados estruturados de fontes permitidas, gera relatórios CSV/JSON e automatiza coleta de informações via WhatsApp.",
    category: "Automação",
    tags: ["Scraping", "Extração de Dados", "Automação", "Relatórios", "Dados"],
    author: "Equipe Meu Agente",
    date: "2025-11-30",
    coverImage: "/placeholder.svg",
    readTime: "11h08",
    featured: false,
  },
  {
    slug: "agente-agendamento-calendario-automatico",
    title: "Agente de Agendamento: Gestão Automática de Calendário e Tarefas",
    description:
      "Descubra como o Agente de Agendamento gerencia Google Calendar, cria tarefas, envia lembretes e integra Drive/Meet automaticamente via WhatsApp.",
    category: "Produtividade",
    tags: ["Agendamento", "Calendar", "Produtividade", "Automação", "Google Workspace"],
    author: "Equipe Meu Agente",
    date: "2025-12-01",
    coverImage: "/placeholder.svg",
    readTime: "08h37",
    featured: true,
  },
  {
    slug: "agente-sdr-qualificacao-automatica-leads",
    title: "Agente SDR: Qualificação Automática de Leads pelo WhatsApp",
    description:
      "Descubra como o Agente SDR qualifica leads automaticamente, conduz conversas humanizadas, coleta informações e agenda reuniões pelo WhatsApp.",
    category: "Vendas",
    tags: ["SDR", "Qualificação de Leads", "Vendas", "Automação", "WhatsApp"],
    author: "Equipe Meu Agente",
    date: "2025-12-01",
    coverImage: "/placeholder.svg",
    readTime: "15h51",
    featured: true,
  },
  {
    slug: "agente-marketing-otimizacao-google-ads",
    title: "Agente de Marketing: Otimização Automática de Google Ads",
    description:
      "Aprenda como o Agente de Marketing analisa campanhas Google Ads, sugere otimizações, identifica desperdícios e maximiza ROI automaticamente.",
    category: "Marketing",
    tags: ["Marketing", "Google Ads", "Otimização", "ROI", "Análise"],
    author: "Equipe Meu Agente",
    date: "2025-12-02",
    coverImage: "/placeholder.svg",
    readTime: "10h29",
    featured: false,
  },
  {
    slug: "agente-dev-suporte-tecnico-ia",
    title: "Agente de Dev: Suporte Técnico e Code Review via WhatsApp",
    description:
      "Descubra como o Agente de Dev oferece debugging, otimização de código, sugestões técnicas e suporte multi-linguagem instantâneo pelo WhatsApp.",
    category: "Desenvolvimento",
    tags: ["Desenvolvimento", "Código", "Debugging", "Suporte Técnico", "IA"],
    author: "Equipe Meu Agente",
    date: "2025-12-02",
    coverImage: "/placeholder.svg",
    readTime: "17h14",
    featured: false,
  },
  {
    slug: "agente-video-criacao-automatica",
    title: "Agente de Vídeo: Criação Automática com Google Veo 3",
    description:
      "Descubra como o Agente de Vídeo gera vídeos profissionais automaticamente via WhatsApp usando Google Veo 3 com roteiros personalizados.",
    category: "Conteúdo",
    tags: ["Vídeo", "Criação de Conteúdo", "Google Veo", "Automação", "Marketing"],
    author: "Equipe Meu Agente",
    date: "2025-12-03",
    coverImage: "/placeholder.svg",
    readTime: "13h56",
    featured: false,
  },
  {
    slug: "agentes-premium-automacao-avancada",
    title: "Agentes Premium: Confirmação, Resumo, Remarketing e Follow-up",
    description:
      "Conheça os 4 agentes exclusivos do Plano Premium: Confirmação de Reuniões, Resumo de Grupos, Remarketing Inteligente e Follow-up Automático.",
    category: "Automação",
    tags: ["Premium", "Automação Avançada", "Confirmação", "Remarketing", "Follow-up"],
    author: "Equipe Meu Agente",
    date: "2025-12-03",
    coverImage: "/placeholder.svg",
    readTime: "19h03",
    featured: true,
  },
  {
    slug: "automatize-atendimento-ia-5-passos",
    title: "Guia Completo: Automatize Seu Atendimento com IA em 5 Passos",
    description:
      "Passo a passo completo para implementar automação de atendimento com Agentes de IA no WhatsApp em menos de 1 semana.",
    category: "IA",
    tags: ["IA", "Atendimento", "Automação", "WhatsApp"],
    author: "Equipe Meu Agente",
    date: "2025-01-15",
    coverImage: "/placeholder.svg",
    readTime: "12h47",
    featured: true,
  },
  {
    slug: "sdr-virtual-qualificar-leads",
    title: "SDR Virtual: Como Qualificar Leads Automaticamente pelo WhatsApp",
    description:
      "Aprenda como um SDR virtual qualifica leads, agenda reuniões e aumenta conversões automaticamente via WhatsApp.",
    category: "Vendas",
    tags: ["SDR", "Vendas", "Leads", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-01-14",
    coverImage: "/placeholder.svg",
    readTime: "09h52",
    featured: true,
  },
  {
    slug: "gestao-financeira-whatsapp",
    title: "Gestão Financeira pelo WhatsApp: Vale a Pena?",
    description:
      "Análise completa sobre gerenciar finanças empresariais pelo WhatsApp com Agentes de IA, com prós, contras e casos reais.",
    category: "Finanças",
    tags: ["Finanças", "WhatsApp", "Gestão", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-01-13",
    coverImage: "/placeholder.svg",
    readTime: "16h18",
    featured: false,
  },
  {
    slug: "dobrar-conversoes-agentes-ia",
    title:
      "7 Exemplos Reais de Empresas que Dobraram Conversões com Agentes de IA",
    description:
      "Cases reais de empresas que aumentaram conversões, reduziram custos e escalaram operações usando Agentes de IA no WhatsApp.",
    category: "Casos de Uso",
    tags: ["Cases", "Conversão", "IA", "ROI"],
    author: "Equipe Meu Agente",
    date: "2025-01-12",
    coverImage: "/placeholder.svg",
    readTime: "11h33",
    featured: true,
  },
  {
    slug: "whatsapp-business-guia-completo",
    title: "WhatsApp Business e IA: O Guia Definitivo para 2025",
    description:
      "Tudo que você precisa saber sobre WhatsApp Business API, automação com IA e como escalar atendimento mantendo conformidade.",
    category: "WhatsApp",
    tags: ["WhatsApp", "Business", "API", "Compliance"],
    author: "Equipe Meu Agente",
    date: "2025-01-11",
    coverImage: "/placeholder.svg",
    readTime: "14h05",
    featured: false,
  },
  {
    slug: "google-ads-automacao-ia",
    title:
      "Como Otimizar Google Ads com IA: Análise Automática de Campanhas",
    description:
      "Aprenda como Agentes de IA analisam campanhas do Google Ads, identificam oportunidades e enviam relatórios automáticos via WhatsApp.",
    category: "Marketing",
    tags: ["Google Ads", "Marketing", "IA", "Performance"],
    author: "Equipe Meu Agente",
    date: "2025-01-10",
    coverImage: "/placeholder.svg",
    readTime: "18h27",
    featured: false,
  },
  {
    slug: "o-que-e-n8n",
    title: "O que é n8n: Automação de Workflows com IA (Guia Completo 2025)",
    description:
      "Descubra o que é n8n, como funciona, principais recursos e como usar para criar automações poderosas. Guia completo com exemplos práticos e comparações.",
    category: "IA",
    tags: ["n8n", "Automação", "Workflow", "Open Source"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "12 min",
    featured: false,
  },
  {
    slug: "o-que-e-inteligencia-artificial",
    title: "O que é Inteligência Artificial: Guia Completo 2025",
    description:
      "Entenda o que é IA, como funciona, tipos, aplicações práticas e impacto no mundo. Guia completo em português com exemplos reais e cases brasileiros.",
    category: "IA",
    tags: ["IA", "Inteligência Artificial", "Tecnologia", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "15 min",
    featured: true,
  },
  {
    slug: "o-que-e-llm",
    title: "O que é LLM: Guia Completo sobre Large Language Models",
    description:
      "Descubra o que são LLMs, como funcionam, principais modelos (GPT-4, Claude, Gemini) e aplicações práticas. Guia completo em português para entender IA generativa.",
    category: "IA",
    tags: ["LLM", "IA", "GPT", "Machine Learning"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "14 min",
    featured: false,
  },
  {
    slug: "o-que-e-ia-generativa",
    title: "O que é IA Generativa: Guia Completo com Exemplos Práticos",
    description:
      "Entenda o que é IA Generativa, como funciona, principais ferramentas (ChatGPT, Midjourney, Runway) e aplicações reais. Guia completo 2025 em português.",
    category: "IA",
    tags: ["IA Generativa", "ChatGPT", "Midjourney", "Criação de Conteúdo"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "13 min",
    featured: false,
  },
  {
    slug: "maiores-empresas-ia-generativa",
    title: "As Maiores Empresas de IA Generativa em 2025 (Ranking Completo)",
    description:
      "Ranking atualizado das maiores empresas de IA Generativa: OpenAI, Anthropic, Google, Microsoft. Análise de mercado, investimentos e futuro da indústria.",
    category: "IA",
    tags: ["IA Generativa", "OpenAI", "Empresas", "Mercado"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "16 min",
    featured: false,
  },
  {
    slug: "top-5-ias-criadores-conteudo",
    title: "Top 5 Inteligências Artificiais para Criadores de Conteúdo 2025",
    description:
      "As 5 melhores IAs para criadores: ChatGPT, Midjourney, Runway, ElevenLabs e Descript. Comparação completa, preços, prós/contras e casos de uso práticos.",
    category: "Conteúdo",
    tags: ["IA", "Criação de Conteúdo", "ChatGPT", "Midjourney", "Produtividade"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "14 min",
    featured: false,
  },
  {
    slug: "como-usar-ia-ao-seu-favor",
    title: "Como Usar Inteligência Artificial ao Seu Favor: Guia Prático 2025",
    description:
      "Aprenda como usar IA para aumentar produtividade em 50%+. Guia prático com ferramentas, estratégias e casos reais para aplicar IA no trabalho e negócios.",
    category: "Produtividade",
    tags: ["IA", "Produtividade", "ChatGPT", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "15 min",
    featured: true,
  },
  {
    slug: "ia-otimizando-relatorios-massivos",
    title: "Como IA Está Otimizando a Criação de Relatórios Massivos",
    description:
      "Descubra como Inteligência Artificial reduz tempo de criação de relatórios em 80%. Análise de dados, geração automática e insights com IA.",
    category: "Casos de Uso",
    tags: ["IA", "Relatórios", "Análise de Dados", "Automação"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "12 min",
    featured: false,
  },
  {
    slug: "devemos-temer-ia",
    title: "Devemos Temer a Inteligência Artificial? Análise Equilibrada",
    description:
      "Análise baseada em evidências sobre riscos e benefícios da IA. Descubra se devemos temer IA ou como adotá-la com responsabilidade e segurança.",
    category: "IA",
    tags: ["IA", "Ética", "Futuro", "Tecnologia"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "14 min",
    featured: false,
  },
  {
    slug: "agente-sdr-substitui-humano",
    title: "Agente SDR com IA Substitui Recepcionista Humano? Análise Real",
    description:
      "Análise honesta: agente SDR com IA substitui ou complementa humanos? Dados reais, comparação de performance e o futuro da recepção de leads.",
    category: "Vendas",
    tags: ["SDR", "IA", "Vendas", "Atendimento"],
    author: "Equipe Meu Agente",
    date: "2025-12-08",
    coverImage: "/placeholder.svg",
    readTime: "16 min",
    featured: false,
  },
];

// Conteúdo bruto dos arquivos Markdown (inclui frontmatter)
const postContentFiles = import.meta.glob("../../content/blog/*.md", {
  eager: true,
  as: "raw",
}) as Record<string, string>;

function getRawContentBySlug(slug: string): string | null {
  const entry = Object.entries(postContentFiles).find(([path]) =>
    path.endsWith(`/content/blog/${slug}.md`)
  );

  if (!entry) return null;
  return entry[1];
}

// Remove o bloco de frontmatter `--- ... ---` do início do markdown
function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;

  const lines = raw.split(/\r?\n/);

  // Procura a segunda linha com apenas '---'
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) return raw;

  const contentLines = lines.slice(endIndex + 1);
  return contentLines.join("\n").trimStart();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Lista usa apenas metadados; conteúdo completo é carregado em `getPostBySlug`
  return postsData.map(
    (post) =>
      ({
        ...post,
        content: "",
      } as BlogPost)
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const meta = postsData.find((p) => p.slug === slug);
  if (!meta) return null;

  const raw = getRawContentBySlug(slug);
  const content = raw ? stripFrontmatter(raw) : "";

  return {
    ...(meta as Omit<BlogPost, "content">),
    content,
  } as BlogPost;
}

export async function getPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, 3);
}

export function getCategories(): string[] {
  return [
    "Todos",
    "Automação",
    "IA",
    "Vendas",
    "Finanças",
    "WhatsApp",
    "Marketing",
    "Casos de Uso",
    "Produtividade",
    "Pesquisa",
    "Desenvolvimento",
    "Conteúdo",
  ];
}

