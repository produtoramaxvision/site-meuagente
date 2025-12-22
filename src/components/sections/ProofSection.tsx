import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, CheckCircle2, Quote } from "lucide-react";

type ProofSectionProps = {
  id?: string;
};

const ProofSection = ({ id }: ProofSectionProps) => {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="relative py-24 sm:py-32 bg-[#1A1A1A] overflow-hidden scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.03),_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge 
            variant="outline" 
            className="inline-flex items-center gap-2 rounded-full border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-400 mb-6 backdrop-blur-sm"
          >
            <TrendingUp className="h-3 w-3" />
            <span>Impacto Imediato</span>
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            Resultados Reais, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Dados Comprovados</span>
          </h2>
          
          <p className="text-lg text-white/60">
            Não é mágica, é tecnologia aplicada para gerar eficiência e receita.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Testimonial Card (Left) */}
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-600/20 to-brand-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
            <Card className="relative h-full bg-gradient-to-br from-[#1F2937] to-[#111827] border-white/5 p-8 sm:p-12 rounded-[2rem] flex flex-col justify-between overflow-hidden">
              {/* Quote Icon Background */}
              <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-12" />
              
              <div className="relative z-10">
                <blockquote className="text-2xl sm:text-3xl font-medium text-white leading-relaxed mb-8">
                  "Eu perdia metade do dia respondendo 'quanto custa?'. Agora o SDR qualifica, agenda a demo e eu só entro para fechar. <span className="text-emerald-400 font-semibold">O Meu Agente pagou o ano todo no primeiro mês.</span>"
                </blockquote>
              </div>

              <div className="flex items-center gap-4 relative z-10 mt-auto">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-brand-500 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-[#1F2937]">
                  RS
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Ricardo S.</div>
                  <div className="text-white/60 text-sm">Fundador de SaaS B2B</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats Grid (Right) */}
          <div className="grid gap-6 h-full">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Stat 1 */}
              <Card className="bg-[#262626] border-white/5 p-8 rounded-[1.5rem] hover:bg-[#2A2A2A] transition-colors group">
                <div className="mb-6 p-3 bg-blue-500/10 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-5xl font-bold text-white mb-3">40h</div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Economizadas todo mês em tarefas manuais repetitivas
                </p>
              </Card>

              {/* Stat 2 */}
              <Card className="bg-[#262626] border-white/5 p-8 rounded-[1.5rem] hover:bg-[#2A2A2A] transition-colors group">
                <div className="mb-6 p-3 bg-emerald-500/10 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-5xl font-bold text-white mb-3">+35%</div>
                <p className="text-white/60 text-sm leading-relaxed">
                  De aumento na conversão de leads qualificados
                </p>
              </Card>
            </div>

            {/* Stat 3 (Full Width) */}
            <Card className="bg-[#262626] border-white/5 p-8 rounded-[1.5rem] hover:bg-[#2A2A2A] transition-colors group flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="p-4 bg-emerald-500/10 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">0%</div>
                <p className="text-white/60 text-sm">
                  De No-Show nas reuniões com o Agente de Confirmação ativo
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90 text-lg font-bold px-12 h-16 rounded-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            onClick={scrollToPricing}
          >
            QUERO RESULTADOS ASSIM
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;