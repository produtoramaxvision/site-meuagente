import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Clock,
  TrendingUp,
  MessageSquare,
  Calendar,
  DollarSign,
  BarChart,
  Shield,
  Zap,
  Users,
  Lock,
  ArrowRight,
  XCircle,
  Bot,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ProofSection from "@/components/sections/ProofSection";

const SalesPage = () => {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SEO
        title="Meu Agente - Equipe de Vendas e Atendimento 24/7"
        description="Automatize qualificação de leads, agendamentos e financeiro com Agentes de IA que falam, pensam e vendem como seus melhores funcionários."
        canonicalUrl="/oferta"
      />

      {/* Hero Section */}
      <section id="top" className="relative pt-2 sm:pt-4 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-surface via-background to-surface/80">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
            <div className="bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.10),_transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Badge 
            variant="outline" 
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-medium text-text-muted mb-6"
          >
            <Sparkles className="h-3 w-3 icon-accent" />
            <span>Tenha sua própria agência de Inteligência Artificial</span>
          </Badge>
          
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Sua Equipe de Vendas e Atendimento 
            <span className="block text-gradient mt-2">Operando 24/7 no WhatsApp</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-text-muted mb-10 max-w-3xl mx-auto leading-relaxed text-balance">
            Automatize qualificação de leads, agendamentos e financeiro com Agentes de IA que falam, pensam e vendem como seus melhores funcionários.
            <span className="block mt-4 font-medium text-text">(Sem Salários, Sem Pausas)</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 text-sm font-medium text-text-muted">
            <div className="flex items-center gap-2 bg-background/60 px-4 py-2 rounded-full border border-border/60 shadow-sm backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> 
              <span>+35% em Conversão</span>
            </div>
            <div className="flex items-center gap-2 bg-background/60 px-4 py-2 rounded-full border border-border/60 shadow-sm backdrop-blur-sm">
              <Clock className="w-4 h-4 text-blue-500" /> 
              <span>Economize 40h/mês</span>
            </div>
            <div className="flex items-center gap-2 bg-background/60 px-4 py-2 rounded-full border border-border/60 shadow-sm backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-500" /> 
              <span>Atendimento Imediato</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="btn-primary-gradient text-lg px-10 h-14 rounded-xl shadow-xl-adaptive transition-all hover:scale-105 hover:shadow-2xl-adaptive group"
              onClick={scrollToPricing}
            >
              QUERO MINHA EQUIPE DE IA AGORA
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <span className="text-xs text-text-muted font-medium uppercase tracking-wide opacity-80">
              Não requer cartão de crédito para o plano Free
            </span>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-16 sm:py-24 bg-surface/30 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="p-3 bg-red-500/10 rounded-full">
                <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-text">
              Pare de ser escravo do seu WhatsApp
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-lg font-medium text-text">Você conhece essa rotina:</p>
              <ul className="space-y-4">
                {[
                  "O celular vibra a cada 2 minutos com perguntas repetitivas.",
                  "Você responde leads às 22h da noite (e eles param de responder).",
                  "Perde vendas porque demorou 15 minutos para atender.",
                  "Seu financeiro é uma bagunça de notas soltas e planilhas esquecidas."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted">
                    <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-border/60 bg-background shadow-adaptive relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />
              <CardContent className="p-8">
                <p className="text-lg font-semibold text-text mb-4">A verdade brutal:</p>
                <p className="text-text-muted mb-6 leading-relaxed">
                    Enquanto você tenta fazer tudo sozinho, seu concorrente está atendendo instantaneamente usando automação.
                </p>
                <div className="pl-4 border-l-2 border-brand-500/30 italic text-text-muted text-sm sm:text-base">
                    "Cada minuto que um lead espera é dinheiro queimando no seu bolso. Você não precisa de 'mais tempo'. Você precisa de uma <strong className="text-brand-600 dark:text-brand-400">equipe</strong>."
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section id="como-funciona" className="py-16 sm:py-24 bg-background scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge 
                variant="outline" 
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1 text-xs font-medium text-text-muted mb-4"
            >
                <Bot className="h-3 w-3 icon-accent" />
                <span>Tecnologia Proprietária</span>
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-text">
              O Segredo: Arquitetura Multi-Agentes
            </h3>
            <p className="text-text-muted max-w-2xl mx-auto text-lg text-balance">
              Esqueça aqueles "robôs burros" com menus de números (<em>"Digite 1 para..."</em>). 
              O <strong>Meu Agente</strong> utiliza uma tecnologia conectada à API Oficial do WhatsApp.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MessageSquare className="w-5 h-5 text-brand-500" />,
                title: "SDR Virtual",
                desc: "Qualifica leads e agenda reuniões automaticamente."
              },
              {
                icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
                title: "Agente Financeiro",
                desc: "Registra gastos e receitas em tempo real no chat."
              },
              {
                icon: <Calendar className="w-5 h-5 text-purple-500" />,
                title: "Agente de Agenda",
                desc: "Gerencia sua Google Agenda e evita conflitos."
              },
              {
                icon: <BarChart className="w-5 h-5 text-amber-500" />,
                title: "Agente de Marketing",
                desc: "Otimiza suas campanhas de Ads baseado em dados."
              }
            ].map((agent, i) => (
              <Card key={i} className="border-border/60 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl-adaptive hover:-translate-y-1 bg-surface/50">
                <CardHeader>
                  <div className="mb-2 p-3 bg-surface rounded-xl w-fit border border-border/50 shadow-sm">
                    {agent.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-text">{agent.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-muted leading-relaxed">{agent.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-brand-500/5 border border-brand-500/10 p-8 rounded-2xl text-center max-w-3xl mx-auto">
            <p className="text-text font-medium text-lg leading-relaxed">
              <strong className="text-brand-600 dark:text-brand-400">Por que funciona agora?</strong> Usamos a mesma inteligência dos LLMs mais avançados do mundo para entender contexto, ironia e intenção. Seu cliente sentirá que está falando com um humano super eficiente.
            </p>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <ProofSection id="provas" />

      {/* Offer Section */}
      <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-surface/30 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-5xl font-bold text-text">
              Escolha o plano ideal para sua escala
            </h3>
            <p className="text-text-muted text-lg max-w-2xl mx-auto text-balance">
              De ferramentas pessoais a uma equipe completa de IA. Comece pequeno e cresça rápido.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-start mb-20">
            {[
              {
                name: "Free",
                price: "R$ 0",
                period: "/mês",
                description: "Para organizar sua rotina pessoal e testar a IA.",
                features: [
                  "Acesso ao App Web",
                  "Agente Financeiro (Manual)",
                  "Agente de Busca Web",
                  "Sem automação WhatsApp",
                ],
                cta: "Começar Grátis",
                highlight: false,
              },
              {
                name: "Lite",
                price: "R$ 297",
                period: "/mês",
                description: "Automação essencial para profissionais liberais.",
                features: [
                  "Tudo do plano Free",
                  "WhatsApp (Canal Compartilhado)",
                  "Agente Financeiro via Chat",
                  "Agendamentos via Chat",
                ],
                cta: "Assinar Lite",
                highlight: false,
              },
              {
                name: "Básico",
                price: "R$ 597",
                period: "/mês",
                description: "Gestão inteligente para pequenas empresas.",
                features: [
                  "Tudo do plano Lite",
                  "Exportação de Relatórios",
                  "Detecção de Duplicatas",
                  "Filtros Avançados",
                  "Suporte por Email",
                ],
                cta: "Assinar Básico",
                highlight: true, // Padrão solicitado
                badge: "RECOMENDADO",
              },
              {
                name: "Business",
                price: "R$ 997",
                period: "/mês",
                description: "Uma equipe completa de IA para o seu negócio.",
                features: [
                  "Tudo do plano Básico",
                  "Número WhatsApp Dedicado",
                  "Agente SDR (Vendas)",
                  "Agente de Marketing & Vídeo",
                  "Implantação Assistida",
                ],
                cta: "Contratar Business",
                highlight: false,
              },
            ].map((plan, i) => (
              <Card 
                key={i} 
                className={`relative flex flex-col h-full transition-all duration-300 ${
                  plan.highlight 
                    ? "border-brand-500 shadow-2xl scale-105 z-10 bg-surface/80 backdrop-blur-xl" 
                    : "border-border/60 hover:border-brand-500/50 hover:shadow-xl bg-surface/40 backdrop-blur-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg tracking-wider uppercase">
                    {plan.badge}
                  </div>
                )}
                
                <CardHeader className={`${plan.highlight ? "pb-8" : "pb-6"}`}>
                  <h4 className="text-lg font-semibold text-text mb-2">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-text">{plan.price}</span>
                    <span className="text-sm text-text-muted">{plan.period}</span>
                  </div>
                  <p className="text-sm text-text-muted mt-3 leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-text/80">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-brand-500" : "text-text-muted"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full ${
                      plan.highlight 
                        ? "btn-primary-gradient shadow-lg" 
                        : "border-border/60 hover:bg-surface-2"
                    }`}
                    onClick={scrollToPricing}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Block */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="text-center mb-10">
              <h4 className="text-2xl font-bold text-text mb-4">Por que o Meu Agente vale a pena?</h4>
              <p className="text-text-muted">Compare o custo operacional real de uma equipe humana versus sua equipe de IA.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Equipe Humana */}
              <div className="p-8 rounded-3xl border border-red-200/20 bg-red-500/5 backdrop-blur-sm relative overflow-hidden group hover:bg-red-500/10 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-red-400">Equipe Tradicional</span>
                  </div>
                  <div className="text-4xl font-bold text-text mb-1">~R$ 8.000<span className="text-lg font-normal text-text-muted">/mês</span></div>
                  <p className="text-sm text-text-muted mb-6">+ Encargos, Treinamento, Férias</p>
                  <ul className="space-y-2 text-sm text-text/70">
                    <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Atendimento em horário comercial</li>
                    <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Variação de humor e performance</li>
                    <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Custo alto de contratação</li>
                  </ul>
                </div>
              </div>

              {/* VS Badge */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-surface border border-border items-center justify-center rounded-full z-20 shadow-xl font-bold text-text-muted text-xs">
                VS
              </div>

              {/* Meu Agente */}
              <div className="p-8 rounded-3xl border border-brand-500/30 bg-brand-500/5 backdrop-blur-sm relative overflow-hidden group hover:bg-brand-500/10 transition-colors shadow-2xl-adaptive">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Bot className="w-24 h-24 text-brand-500" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-500/20 rounded-lg text-brand-500">
                      <Bot className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-brand-400">Meu Agente (Business)</span>
                  </div>
                  <div className="text-4xl font-bold text-text mb-1">R$ 997<span className="text-lg font-normal text-text-muted">/mês</span></div>
                  <p className="text-sm text-text-muted mb-6">Preço fixo, sem surpresas</p>
                  <ul className="space-y-2 text-sm text-text/70">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500" /> Disponível 24/7, sem pausas</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500" /> Padrão de qualidade constante</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500" /> Escalável instantaneamente</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Unified */}
      <section id="faq" className="py-16 sm:py-24 bg-background border-y border-border/60 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Shield className="w-8 h-8 text-brand-500" />
            <h3 className="text-2xl md:text-3xl font-bold text-center text-text">
              Quebrando Suas Dúvidas
            </h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Vai parecer um robô falando?",
                a: "Não. Nossos agentes usam Processamento de Linguagem Natural avançado. Eles usam emojis, gírias (se você quiser) e entendem áudios. É indistinguível de um atendimento humano de alta qualidade."
              },
              {
                q: "Tenho medo de ser bloqueado no WhatsApp.",
                a: "Nós usamos a API Oficial do WhatsApp Business. Seguimos rigorosamente as políticas da Meta. Sua segurança é nossa prioridade número 1."
              },
              {
                q: "É difícil de configurar?",
                a: "Nos planos Business e Premium, nós fazemos a implantação para você. Nos planos iniciais, é plug-and-play: criou a conta, começou a usar."
              },
              {
                q: "Serve para o meu negócio?",
                a: "Se você vende serviços, agendamentos (clínicas, consultorias) ou software, sim. Se você precisa qualificar leads antes de vender, o Meu Agente é perfeito."
              },
              {
                q: "E se eu não gostar?",
                a: "Você pode cancelar a qualquer momento. Sem contratos de fidelidade forçados nos planos mensais."
              },
              { 
                q: "Preciso de um número novo?", 
                a: "No plano Business e Premium, nós fornecemos um número oficial dedicado. No Free/Básico, você usa nossa infraestrutura compartilhada ou seu app." 
              },
              { 
                q: "Funciona para clínicas e consultórios?", 
                a: "Perfeitamente. O Agente de Agendamento e Confirmação reduz o no-show drasticamente." 
              },
              { 
                q: "Vocês fazem spam?", 
                a: "Jamais. Só enviamos mensagens para quem entrou em contato ou deu opt-in (consentimento), seguindo a LGPD." 
              }
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-surface border border-border/60 rounded-xl px-4 shadow-adaptive transition-all hover:border-brand-500/30">
                <AccordionTrigger className="text-left font-medium text-lg py-4 hover:no-underline hover:text-brand-600 transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-text-muted text-base pb-4 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Action Plan Section */}
      <section className="py-16 sm:py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">🚀 Plano de Ação Rápida</h3>
          
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-lg bg-surface">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-2 border-b border-border/60">
                  <th className="p-5 text-left font-bold text-text">Se seu objetivo é...</th>
                  <th className="p-5 text-left font-bold text-text hidden sm:table-cell">A Evidência que você verá</th>
                  <th className="p-5 text-left font-bold text-text">Sua Próxima Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-5 font-medium text-text">Parar de perder leads</td>
                  <td className="p-5 text-text-muted hidden sm:table-cell">Agenda cheia de reuniões qualificadas</td>
                  <td className="p-5 font-bold text-brand-600 dark:text-brand-400">Ativar o Agente SDR</td>
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-5 font-medium text-text">Organizar o caixa</td>
                  <td className="p-5 text-text-muted hidden sm:table-cell">Relatórios financeiros automáticos</td>
                  <td className="p-5 font-bold text-brand-600 dark:text-brand-400">Usar o Agente Financeiro</td>
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="p-5 font-medium text-text">Vender dormindo</td>
                  <td className="p-5 text-text-muted hidden sm:table-cell">Notificações de "Venda Realizada"</td>
                  <td className="p-5 font-bold text-brand-600 dark:text-brand-400">Contratar o Plano Business</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-14 text-lg rounded-xl shadow-lg transition-all hover:scale-105" onClick={scrollToPricing}>
              ESCOLHER MEU PLANO AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* Risk & Urgency Section */}
      <section className="py-16 sm:py-24 bg-section-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-emerald-400" />
              RISCO ZERO
            </h3>
            <p className="text-white/80 mb-6 text-lg">Você não precisa acreditar na nossa palavra.</p>
            <ol className="space-y-6 text-white/70 list-decimal pl-5">
              <li className="pl-2">
                <strong className="text-white block mb-1">Comece com o Plano Free:</strong> 
                R$ 0,00. Teste o Agente Financeiro e Web Search sem gastar um centavo.
              </li>
              <li className="pl-2">
                <strong className="text-white block mb-1">Segurança Bancária:</strong> 
                Seus dados são protegidos com criptografia de ponta a ponta e conformidade total com a LGPD.
              </li>
            </ol>
            <p className="mt-8 font-medium text-white p-4 bg-white/5 rounded-lg border border-white/10">
              Nós assumimos o risco técnico. Você colhe o lucro operacional.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400" />
              JANELA DE OPORTUNIDADE
            </h3>
            <p className="text-white/80 mb-6 text-lg">
              O mercado está mudando rápido. Seus concorrentes já estão automatizando o atendimento.
            </p>
            <p className="text-white/80 mb-8">
              Continuar atendendo manualmente é como tentar correr uma Fórmula 1 de bicicleta. Você vai ficar para trás.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl backdrop-blur-sm">
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong className="text-amber-400 block mb-2 uppercase tracking-wide text-xs">Atenção</strong> 
                Nossa capacidade de Implantação Assistida (Plano Business) é limitada a 20 novas empresas por semana para garantir qualidade máxima.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
};

export default SalesPage;