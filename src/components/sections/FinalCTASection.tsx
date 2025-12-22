import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const FinalCTASection = () => {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            O Próximo Passo <span className="text-gradient">É Seu</span>
          </h2>
          <p className="text-xl text-text-muted leading-relaxed">
            Você tem dois caminhos à sua frente. A escolha que você fizer hoje definirá o futuro da sua operação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-16">
          {/* Caminho 1 - O Velho Jeito */}
          <Card className="relative overflow-hidden border-border/60 bg-surface/50 backdrop-blur-sm p-8 sm:p-10 transition-all duration-300 hover:border-red-500/30 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent opacity-50" />
            
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-4">
                Caminho 1
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">O Jeito Antigo</h3>
              <p className="text-text-muted leading-relaxed">
                Continuar sobrecarregado, perdendo leads por demora no atendimento e respondendo mensagens repetitivas no jantar de família.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Perda de vendas por demora",
                "Estresse e burnout operacional",
                "Sem dados para tomada de decisão",
                "Concorrentes passando na frente"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-muted/80 group-hover:text-text-muted transition-colors">
                  <XCircle className="w-5 h-5 text-red-500/60 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Caminho 2 - O Novo Jeito (Highlight) */}
          <Card className="relative overflow-hidden border-brand-500/50 bg-gradient-to-br from-surface via-surface to-brand-500/5 p-8 sm:p-10 shadow-2xl-adaptive transform md:scale-105 z-10 ring-1 ring-brand-500/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-emerald-400" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-colors duration-500" />
            
            <div className="relative z-10 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                Caminho 2
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">A Revolução com IA</h3>
              <p className="text-text-muted leading-relaxed">
                Ativar sua equipe de IA agora, ver sua empresa rodar no piloto automático e focar apenas no que realmente importa: estratégia e crescimento.
              </p>
            </div>

            <ul className="relative z-10 space-y-4 mb-8">
              {[
                "Atendimento imediato 24/7",
                "Qualificação automática de leads",
                "Agendamentos e financeiro organizados",
                "Escalabilidade infinita sem contratar"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative z-10 pt-4 border-t border-border/50">
               <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mb-2">
                 Resultado esperado:
               </p>
               <p className="text-2xl font-bold text-text">
                 Liberdade & Lucro
               </p>
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <Button 
              size="lg" 
              className="relative btn-primary-gradient text-lg px-12 h-16 rounded-xl shadow-2xl-adaptive transition-all hover:scale-105 font-bold tracking-wide"
              onClick={scrollToPricing}
            >
              QUERO AUTOMATIZAR MEU NEGÓCIO AGORA
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <p className="mt-8 text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
            <strong className="text-text font-semibold">P.S.:</strong> O Plano Free é grátis para sempre para as ferramentas manuais. 
            Você não tem nada a perder em testar a inteligência do sistema hoje mesmo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
