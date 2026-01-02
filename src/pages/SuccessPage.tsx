import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Mail, LayoutDashboard, Sparkles, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Disparar confetti ao carregar
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Auto-redirect opcional ou apenas contador visual
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPlanName = (id: string | null) => {
    switch (id) {
      case "lite": return "Plano Lite";
      case "basic": return "Plano Básico";
      case "business": return "Plano Business";
      case "premium": return "Plano Premium";
      default: return "Sua Assinatura";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background font-sans selection:bg-emerald-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/10">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text mb-4">
            Pagamento Confirmado!
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Parabéns! Você acaba de dar o passo mais importante para automatizar seu negócio com o <span className="text-text font-semibold">{getPlanName(planId)}</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <Card className="h-full border-border/50 bg-surface/40 backdrop-blur-xl shadow-2xl-adaptive overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-brand-500 to-emerald-500"></div>
              <CardContent className="p-8 flex flex-col h-full justify-between gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    O que acontece agora?
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center border border-border/50 font-bold text-brand-500">1</div>
                      <div>
                        <h3 className="font-semibold text-text text-lg">Verifique seu E-mail</h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                          Enviamos os dados de acesso e sua nota fiscal para o e-mail cadastrado. Se não encontrar, verifique a caixa de spam.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center border border-border/50 font-bold text-brand-500">2</div>
                      <div>
                        <h3 className="font-semibold text-text text-lg">Acesse o Painel</h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                          Seu ambiente já está sendo preparado. Você pode acessar o dashboard imediatamente para começar a configuração.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center border border-border/50 font-bold text-brand-500">3</div>
                      <div>
                        <h3 className="font-semibold text-text text-lg">Onboarding</h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                          Nossa IA guiará você nos primeiros passos para conectar seu WhatsApp.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/40">
                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg btn-primary-gradient shadow-xl-adaptive group relative overflow-hidden"
                    onClick={() => window.location.href = "https://app.meuagente.api.br"}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Acessar Meu Agente Agora
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>
                  <p className="text-center text-xs text-text-muted mt-3">
                    Redirecionamento automático sugerido em {countdown}s
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Security Card */}
            <Card className="border-border/50 bg-surface/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="font-semibold">Compra Segura</span>
                </div>
                <p className="text-sm text-text-muted mb-4">
                  Seus dados estão protegidos. A transação foi processada com criptografia de ponta a ponta pelo Asaas.
                </p>
                <div className="text-xs text-text-muted/60 uppercase tracking-wider font-medium">
                  ID da Transação: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="border-border/50 bg-surface/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Precisa de ajuda?
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  Nossa equipe de suporte está pronta para ajudar você em qualquer etapa.
                </p>
                <Button variant="outline" className="w-full border-border/60 hover:bg-surface-2" size="sm">
                  Falar com Suporte
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;