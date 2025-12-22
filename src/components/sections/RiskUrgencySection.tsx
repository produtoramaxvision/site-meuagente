import React from "react";
import { Lock, Clock, TrendingUp, AlertTriangle, CheckCircle, Shield } from "lucide-react";

const RiskUrgencySection = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Risk Reversal Card */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-10 overflow-hidden hover:border-emerald-500/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Risco Zero</h3>
                  <p className="text-emerald-400/80 text-sm font-medium uppercase tracking-wider">Garantia Total</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Você não precisa acreditar na nossa palavra. Removemos todas as barreiras para você começar agora.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/50 group-hover:border-emerald-500/20 transition-colors">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Comece com o Plano Free</h4>
                      <p className="text-zinc-400 text-sm">R$ 0,00. Teste o Agente Financeiro e Web Search sem gastar um centavo.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/50 group-hover:border-emerald-500/20 transition-colors">
                    <div className="mt-1">
                      <Lock className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Segurança Bancária</h4>
                      <p className="text-zinc-400 text-sm">Criptografia de ponta a ponta e conformidade total com a LGPD.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <p className="text-white font-medium text-center sm:text-left">
                    Nós assumimos o risco técnico. <span className="text-emerald-400">Você colhe o lucro.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency/Opportunity Card */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-10 overflow-hidden hover:border-amber-500/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform duration-500">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Janela de Oportunidade</h3>
                  <p className="text-amber-400/80 text-sm font-medium uppercase tracking-wider">O Tempo é Agora</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-zinc-400 text-lg leading-relaxed">
                  O mercado está mudando rápido. Seus concorrentes já estão automatizando o atendimento neste exato momento.
                </p>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <TrendingUp className="w-24 h-24 text-amber-500" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-amber-400">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-bold text-sm uppercase tracking-wide">Atenção</span>
                    </div>
                    <p className="text-zinc-300 mb-4">
                      Continuar atendendo manualmente é como tentar correr uma Fórmula 1 de bicicleta. <span className="text-white font-semibold">Você vai ficar para trás.</span>
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      Vagas Limitadas: 20/semana
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800">
                   <p className="text-zinc-500 text-sm italic">
                    * Nossa capacidade de Implantação Assistida (Plano Business) é limitada para garantir qualidade máxima.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RiskUrgencySection;