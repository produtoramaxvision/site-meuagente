"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Globe2, Search, PhoneCall, Megaphone, CalendarClock, Code2, Video } from "lucide-react"

const examples = [
  {
    label: "Financeiro",
    icon: DollarSign,
    iconClass: "text-emerald-500",
    bubbleBg: "bg-emerald-500/10",
    user: "Registra uma entrada de R$ 1.200,00 na categoria Assinaturas — Plano Business — com data 01/10/2025.",
    agent: "Entrada registrada com sucesso! Já aparece nos seus relatórios financeiros desse período."
  },
  {
    label: "Web Search",
    icon: Globe2,
    iconClass: "text-sky-500",
    bubbleBg: "bg-sky-500/10",
    user: "Pesquise tendências de 'roupas fitness' na região de SP e me entregue 5 insights com 3 links confiáveis.",
    agent: "Analisei as principais fontes. Te enviei 5 insights objetivos com 3 links confiáveis para você aprofundar."
  },
  {
    label: "Scrape",
    icon: Search,
    iconClass: "text-purple-500",
    bubbleBg: "bg-purple-500/10",
    user: "Busque no portal de dados abertos de Curitiba o dataset de aluguel residencial de 2024 e me mande um CSV por bairro.",
    agent: "Encontrei o dataset oficial, filtrei por bairro e gerei um CSV pronto para você analisar."
  },
  {
    label: "SDR",
    icon: PhoneCall,
    iconClass: "text-orange-500",
    bubbleBg: "bg-orange-500/10",
    user: "Qualifique este lead: Ana, interessada em demo — me diga o fit e o próximo passo.",
    agent: "Qualifiquei a Ana como High-Fit. Próximo passo recomendado: agendar uma demo de 20 minutos ainda esta semana."
  },
  {
    label: "Marketing",
    icon: Megaphone,
    iconClass: "text-rose-500",
    bubbleBg: "bg-rose-500/10",
    user: "Analisa minha campanha de Google Ads 'Tráfego – Outubro' e me sugere 3 termos negativos para adicionar.",
    agent: "Revisei sua campanha e separei 3 termos negativos que estão gastando orçamento sem resultado. Já deixei a lista pronta para você aplicar."
  },
  {
    label: "Agendamento",
    icon: CalendarClock,
    iconClass: "text-indigo-500",
    bubbleBg: "bg-indigo-500/10",
    user: "Marque uma reunião com o João amanhã às 15:00 no Google Meet e envie o link para ele e para mim.",
    agent: "Reunião criada no seu Google Calendar às 15:00, com link do Meet enviado para você e para o João."
  },
  {
    label: "Dev",
    icon: Code2,
    iconClass: "text-slate-500",
    bubbleBg: "bg-slate-500/10",
    user: "Revise meu endpoint /api/checkout; estou recebendo erro 500 quando envio customerId vazio.",
    agent: "Encontrei o ponto de falha. Recomendo validar o customerId antes de chamar o serviço externo e retornar 400 com mensagem clara."
  },
  {
    label: "Vídeo",
    icon: Video,
    iconClass: "text-violet-500",
    bubbleBg: "bg-violet-500/10",
    user: "Crie um vídeo de 30s em 1080x1920 com o roteiro: 'Bem-vindo ao Meu Agente...' e me envie duas variações.",
    agent: "Modelei duas versões de roteiro e gerei 2 vídeos em 1080x1920 prontinhos para usar em stories e anúncios."
  }
] as const

export function WhatsappExamples() {
  return (
    <section className="py-20 sm:py-24 bg-surface/40 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <Badge className="mb-3 bg-brand-500/10 text-brand-500 border-brand-500/40">
            Como conversamos no WhatsApp
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text mb-4">
            Exemplos reais de mensagens com o Meu Agente.
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Você fala com o Meu Agente como se estivesse falando com uma pessoa. Veja exemplos de como cada
            agente atua no seu dia a dia, direto pelo WhatsApp.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {examples.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.label}
                className="bg-background/95 border-border/70 shadow-lg relative overflow-hidden"
              >
                <CardContent className="pt-5 pb-6 px-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`h-8 w-8 rounded-full ${item.bubbleBg} border flex items-center justify-center`}
                    >
                      <Icon className={`h-4 w-4 ${item.iconClass}`} />
                    </div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-[0.12em]">
                      {item.label}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="inline-block max-w-full rounded-2xl rounded-br-sm bg-brand-900 text-white px-3 py-2 text-left text-xs sm:text-sm">
                      {`"${item.user}"`}
                    </div>
                    <div className="inline-block max-w-full rounded-2xl rounded-bl-sm bg-surface px-3 py-2 text-left text-xs sm:text-sm text-text-muted">
                      {`"${item.agent}"`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

