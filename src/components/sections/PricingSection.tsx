import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Loader2 } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

const PricingSection = () => {
  const { handleSubscribe, loading } = useSubscription();

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const switchRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = (checked: boolean) => {
    setBillingCycle(checked ? "annual" : "monthly");
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ["hsl(var(--accent))", "hsl(var(--primary))", "hsl(var(--muted))"],
        ticks: 160,
        gravity: 1.05,
        decay: 0.92,
        startVelocity: 28,
        shapes: ["circle"],
      });
    }
  };

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

  const plans = [
    {
      id: "free",
      name: "Free",
      priceMonthly: 0,
      priceAnnual: 0,
      period: "gratuito",
      description: "Explore no app e Chat IA, sem automação externa",
      badge: null,
      features: [
        { text: "App + Chat IA (sem automação fora do app)", included: true },
        { text: "Agente Financeiro manual", included: true },
        { text: "Web Search básico (manual/Chat IA)", included: true },
        { text: "Scrape básico (manual/Chat IA)", included: true },
        { text: "Uso via WhatsApp (áudio/foto)", included: false },
        { text: "Automação fora do app", included: false },
        { text: "Exportação CSV/PDF", included: false },
        { text: "Número de WhatsApp próprio", included: false },
      ],
      cta: "Começar Agora",
      popular: false,
    },
    {
      id: "lite",
      name: "Lite",
      priceMonthly: 97.9,
      priceAnnual: 1076.9,
      period: "/mês",
      description: "Tudo do Free + WhatsApp para finanças e agenda",
      badge: "MAIS POPULAR",
      features: [
        { text: "Tudo do Free", included: true },
        { text: "Financeiro no WhatsApp (áudio/foto)", included: true },
        { text: "Agendamento no WhatsApp (áudio/foto)", included: true },
        { text: "Respostas via canal WhatsApp compartilhado", included: true },
        { text: "Exportação CSV/PDF", included: false },
        { text: "Automação fora do app", included: false },
        { text: "Número de WhatsApp próprio", included: false },
        { text: "Suporte prioritário", included: false },
      ],
      cta: "Contratar Lite",
      popular: true,
    },
    {
      id: "basic",
      name: "Básico",
      priceMonthly: 497,
      priceAnnual: 5467,
      period: "/mês",
      description: "Automação completa via WhatsApp, com exportações",
      badge: null,
      features: [
        { text: "Tudo do Lite + automações via WhatsApp", included: true },
        { text: "Exportação CSV/PDF", included: true },
        { text: "Agente Web Search intermediário", included: true },
        { text: "Agente Scrape intermediário", included: true },
        { text: "Agente Agendamento (Calendar/Drive/Tasks)", included: true },
        { text: "Número de WhatsApp próprio", included: false },
        { text: "Implantação inclusa", included: false },
        { text: "Suporte prioritário", included: false },
      ],
      cta: "Contratar Básico",
      popular: false,
    },
    {
      id: "business",
      name: "Business",
      priceMonthly: 997,
      priceAnnual: 10967,
      period: "/mês",
      description: "Para empresas em crescimento",
      badge: "MELHOR VALOR",
      features: [
        { text: "Tudo do Básico +", included: true },
        { text: "Número de WhatsApp próprio", included: true },
        { text: "Implantação inclusa", included: true },
        { text: "Suporte prioritário 24/7", included: true },
        { text: "Agente SDR", included: true },
        { text: "Agente Marketing (Google Ads)", included: true },
        { text: "Agente Dev + Vídeo", included: true },
        { text: "Treinamento da IA e Manutenção R$ 149,00/hr, somente quando solicitado", included: true },
      ],
      cta: "Contratar Business",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      priceMonthly: 1497,
      priceAnnual: 16467,
      period: "/mês",
      description: "Tudo do Business + recursos exclusivos",
      badge: null,
      features: [
        { text: "Tudo do Business +", included: true },
        { text: "Agente de Confirmação", included: true },
        { text: "Agente de Resumo de Grupos", included: true },
        { text: "Agente de Remarketing", included: true },
        { text: "Agente de Follow-up", included: true },
        { text: "Pesquisa/extração avançada", included: true },
        { text: "Backups diários off-site", included: true },
        { text: "Cota maior Vídeo (Veo 3)", included: true },
        { text: "Treinamento da IA e Manutenção R$ 149,00/hr, somente quando solicitado", included: true },
      ],
      cta: "Contratar Premium",
      popular: false,
    },
  ];

  const onPlanClick = (planId: string) => {
    if (planId === "free") {
      window.open("https://app.meuagente.api.br/?plan=free", "_blank");
    } else {
      handleSubscribe(planId, billingCycle);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gradient mb-4 pb-2 leading-normal">
            Planos e Preços
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Escolha o plano ideal para o tamanho do seu negócio
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <span className={billingCycle === "monthly" ? "font-semibold text-text" : "text-text-muted"}>Mensal</span>
            <Switch
              ref={switchRef as any}
              checked={billingCycle === "annual"}
              onCheckedChange={handleToggle}
              aria-label="Alternar faturamento anual"
              className="data-[state=checked]:bg-primary"
            />
            <span className={billingCycle === "annual" ? "font-semibold text-text flex items-center gap-1" : "text-text-muted flex items-center gap-1"}>
              Anual <span className="text-primary font-bold text-[11px]">(1 mês grátis)</span>
            </span>
          </div>
        </div>

        {/* Pricing cards – alinhados com a grade da página de Planos (Tabs “Visão por plano”) */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col h-full p-8 bg-background border-border/60 shadow-adaptive backdrop-blur-sm transition-all duration-300 ${
                plan.popular
                  ? "ring-2 ring-text/20 dark:ring-text/30 shadow-xl-adaptive scale-105 hover:shadow-none hover:-translate-y-1 hover:scale-[1.08]"
                  : "hover:shadow-none hover:-translate-y-1 hover:scale-[1.02]"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="btn-primary-gradient px-4 py-1 font-bold">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.id === "free" ? (
                    <span className="text-4xl font-extrabold text-text">{formatBRL(plan.priceMonthly)}</span>
                  ) : (
                    <>
                      <span className="text-xl text-text">R$</span>
                      <NumberFlow
                        value={billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual}
                        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                        className="text-4xl font-extrabold text-text"
                      />
                    </>
                  )}
                  <span className="text-text-muted">{billingCycle === "monthly" ? "/mês" : "/ano"}</span>
                </div>
                {plan.id !== "free" && billingCycle === "monthly" && plan.priceAnnual > 0 && (
                  <p className="text-xs text-text-muted">Anual: {formatBRL(plan.priceAnnual)} (1 mês grátis)</p>
                )}
                <p className="text-sm text-text-muted">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-text" : "text-text-muted"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`mt-auto w-full group relative overflow-hidden ${
                  plan.popular
                    ? "btn-primary-gradient shadow-xl-adaptive hover:shadow-2xl-adaptive"
                    : "btn-secondary"
                }`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => onPlanClick(plan.id)}
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {plan.cta}
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-text-muted mb-4">
            Não sabe qual plano escolher?
          </p>
          <Button
            size="lg"
            className="gap-2 group relative overflow-hidden btn-primary-gradient shadow-xl-adaptive hover:shadow-2xl-adaptive"
            onClick={() => window.open("https://app.meuagente.api.br", "_blank")}
          >
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
