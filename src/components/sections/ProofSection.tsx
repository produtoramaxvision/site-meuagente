import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, CheckCircle2, Quote, Star } from "lucide-react";

const ProofSection = () => {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="resultados" className="relative py-20 sm:py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(16,185,129,0.05),_transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Compact */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <Badge 
              variant="outline" 
              className="rounded-full border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm"
            >
              <TrendingUp className="h-3 w-3 mr-1.5" />
              Impacto Comprovado
            </Badge>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
            Resultados que <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient-x">
              Transformam Negócios
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Substitua suposições por dados reais. Tecnologia que potencializa cada interação.
          </p>
        </div>

        {/* Bento Grid Layout - Adjusted Proportions */}
        <div className="grid lg:grid-cols-12 gap-4 mb-12">
          
          {/* Main Testimonial - Spans 7 columns */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <Card className="relative h-full bg-[#121212] border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between overflow-hidden hover:border-white/10 transition-colors duration-300">
                
                {/* Decorative Quote - Smaller */}
                <Quote className="absolute top-6 right-6 w-16 h-16 text-white/[0.03] -rotate-12 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl sm:text-2xl font-medium text-white leading-snug mb-6 tracking-tight">
                    "Eu perdia metade do dia respondendo 'quanto custa?'. Agora o SDR qualifica, agenda a demo e eu só entro para fechar. 
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold">
                      O Meu Agente pagou o ano todo no primeiro mês.
                    </span>"
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-white/5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-[#121212]">
                    RS
                  </div>
                  <div>
                    <div className="font-bold text-white text-base">Ricardo S.</div>
                    <div className="text-white/50 text-xs font-medium">Fundador de SaaS B2B</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Stats Column - Spans 5 columns */}
          <div className="lg:col-span-5 grid gap-4">
            
            {/* Stat 1: Time Saved */}
            <Card className="group relative bg-[#121212] border-white/5 p-6 rounded-2xl overflow-hidden hover:bg-[#161616] transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Clock className="w-16 h-16 text-blue-400 -rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="mb-3 p-2 bg-blue-500/10 w-fit rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-1 tracking-tighter">40h</div>
                <p className="text-white/60 text-sm font-medium">Economizadas/mês em tarefas manuais</p>
              </div>
            </Card>

            {/* Stat 2: Conversion */}
            <Card className="group relative bg-[#121212] border-white/5 p-6 rounded-2xl overflow-hidden hover:bg-[#161616] transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <TrendingUp className="w-16 h-16 text-emerald-400 -rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="mb-3 p-2 bg-emerald-500/10 w-fit rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-1 tracking-tighter">+35%</div>
                <p className="text-white/60 text-sm font-medium">Aumento na conversão de leads</p>
              </div>
            </Card>

          </div>

          {/* Full Width Stat - Spans 12 columns - More Compact */}
          <div className="lg:col-span-12">
            <Card className="group relative bg-gradient-to-r from-[#121212] to-[#161616] border-white/5 p-6 rounded-2xl overflow-hidden hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-0.5 tracking-tighter">Zero No-Show</div>
                    <p className="text-white/60 text-sm font-medium">Nas reuniões com o Agente de Confirmação ativo</p>
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-white/5" />
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-white/40 mb-1">Eficiência Garantida</div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-1.5 w-6 rounded-full ${i === 4 ? 'bg-emerald-500/30' : 'bg-emerald-500'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Button - Compact */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="group relative bg-white text-black hover:bg-emerald-50 text-base font-bold px-8 h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto overflow-hidden"
            onClick={scrollToPricing}
          >
            <span className="relative z-10 flex items-center">
              QUERO RESULTADOS ASSIM
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;