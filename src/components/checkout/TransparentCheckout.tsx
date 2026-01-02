import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, QrCode, Barcode, ShieldCheck, Lock, ArrowLeft, Copy } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { ASAAS_PLAN_PRICES } from "@/hooks/use-asaas-checkout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CheckoutFormData {
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface PaymentResult {
  pix?: {
    encodedImage: string;
    payload: string;
  };
  boleto?: {
    identificationField: string;
    url: string;
  };
  subscription?: {
    id: string;
    status: string;
  };
  error?: string;
}

export default function TransparentCheckout() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || "lite";
  const billing = (searchParams.get("billing") as "monthly" | "annual") || "monthly";
  
  const planPrice = ASAAS_PLAN_PRICES[planId as keyof typeof ASAAS_PLAN_PRICES]?.[billing] || 0;
  const planName = `Plano ${planId.charAt(0).toUpperCase() + planId.slice(1)}`;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "pix" | "boleto">("pix");
  
  // Form States
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    cpfCnpj: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Basic Validation
      if (!formData.name || !formData.email || !formData.cpfCnpj || !formData.phone) {
        toast.error("Por favor, preencha todos os dados pessoais.");
        setLoading(false);
        return;
      }

      if (paymentMethod === "credit-card") {
        if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvc) {
          toast.error("Por favor, preencha os dados do cartão.");
          setLoading(false);
          return;
        }
      }

      // Prepare Payload
      const payload: Record<string, unknown> = {
        action: "subscribe",
        planId,
        billing,
        customer: {
          name: formData.name,
          email: formData.email,
          cpfCnpj: formData.cpfCnpj.replace(/\D/g, ""),
          phone: formData.phone.replace(/\D/g, ""),
        },
        payment: {
          method: paymentMethod === "credit-card" ? "CREDIT_CARD" : paymentMethod === "pix" ? "PIX" : "BOLETO"
        }
      };

      if (paymentMethod === "credit-card") {
        const [expMonth, expYear] = formData.expiry.split("/");
        const creditCardData = {
          holderName: formData.cardName,
          number: formData.cardNumber.replace(/\s/g, ""),
          expiryMonth: expMonth,
          expiryYear: `20${expYear}`,
          ccv: formData.cvc
        };
        
        const creditCardHolderInfo = {
          name: formData.name,
          email: formData.email,
          cpfCnpj: formData.cpfCnpj.replace(/\D/g, ""),
          postalCode: "00000000", // Idealmente pedir CEP
          addressNumber: "0",
          phone: formData.phone.replace(/\D/g, "")
        };

        (payload.payment as any).creditCard = creditCardData;
        (payload.payment as any).creditCardHolderInfo = creditCardHolderInfo;
      }

      const { data, error } = await supabase.functions.invoke("asaas-checkout", {
        body: payload
      });

      if (error) {
        console.error("Supabase Function Error:", error);
        let errorMessage = "Erro ao processar pagamento.";
        try {
          // Tenta extrair o corpo da resposta de erro
          if ((error as any).context && typeof (error as any).context.json === 'function') {
             const body = await (error as any).context.json();
             if (body && body.error) {
               errorMessage = body.error;
             }
          } else if (error.message) {
             errorMessage = error.message;
          }
        } catch (e) {
          console.error("Error parsing error response:", e);
          errorMessage = error.message || "Erro desconhecido na comunicação.";
        }
        throw new Error(errorMessage);
      }

      if (data.error) throw new Error(data.error);

      setPaymentResult(data as PaymentResult);
      toast.success("Pedido processado com sucesso!");

    } catch (error: any) {
      console.error("Payment error:", error);
      // Melhor tratamento de erro para exibir mensagens da API
      let msg = error.message || "Erro ao processar pagamento.";
      
      // Se a mensagem for genérica do Supabase, tenta ser mais útil
      if (msg.includes("Edge Function returned a non-2xx status code")) {
        msg = "Erro na comunicação com o servidor de pagamento. Verifique os dados e tente novamente.";
        
        // Tenta ler o corpo da resposta de erro se possível (hack para supabase-js v2)
        if (error.context && typeof error.context.json === 'function') {
            try {
                const errBody = await error.context.json();
                if (errBody.error) msg = errBody.error;
            } catch (e) {
                console.error("Failed to parse error body", e);
            }
        }
      }
      
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (paymentResult) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Pedido Confirmado!</CardTitle>
            <CardDescription>Sua assinatura foi criada com sucesso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {paymentMethod === "pix" && paymentResult.pix && (
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img src={`data:image/png;base64,${paymentResult.pix.encodedImage}`} alt="QR Code Pix" className="h-48 w-48" />
                </div>
                <div className="space-y-2">
                  <Label>Copia e Cola</Label>
                  <div className="flex gap-2">
                    <Input value={paymentResult.pix.payload} readOnly className="bg-muted" />
                    <Button size="icon" variant="outline" onClick={() => {
                      navigator.clipboard.writeText(paymentResult.pix.payload);
                      toast.success("Código copiado!");
                    }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "boleto" && paymentResult.boleto && (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <Label>Linha Digitável</Label>
                  <div className="flex gap-2">
                    <Input value={paymentResult.boleto.identificationField} readOnly className="bg-muted" />
                    <Button size="icon" variant="outline" onClick={() => {
                      navigator.clipboard.writeText(paymentResult.boleto.identificationField);
                      toast.success("Código copiado!");
                    }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={paymentResult.boleto.url} target="_blank" rel="noopener noreferrer">
                    <Barcode className="mr-2 h-4 w-4" /> Visualizar Boleto
                  </a>
                </Button>
              </div>
            )}

            {paymentMethod === "credit-card" && (
              <div className="text-center text-muted-foreground">
                <p>Seu pagamento foi processado e sua assinatura está ativa.</p>
                <p className="text-sm mt-2">Você receberá um e-mail com os detalhes de acesso.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/">Voltar para o Início</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen bg-background text-foreground flex items-center justify-center p-4 overflow-y-auto lg:overflow-hidden">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-auto content-center">
        
        {/* Coluna da Esquerda - Resumo do Pedido */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 order-2 lg:order-1">
          <div className="hidden lg:flex items-center gap-2 mb-2">
            <Link to="/oferta" className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Voltar
            </Link>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-6 w-6 bg-primary dark:bg-primary-foreground rounded-md flex items-center justify-center">
                  <img src="/balao-branco.png" alt="Logo" className="h-4 w-4 object-contain" />
                </div>
                <span className="font-bold text-lg tracking-tight">Meu Agente</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight mt-2">{planName}</h1>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-primary">R$ {planPrice.toFixed(2).replace('.', ',')}</span>
                <span className="text-muted-foreground text-sm">/{billing === 'monthly' ? 'mês' : 'ano'}</span>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-3">
              <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">O que está incluso</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {[
                  "Automação WhatsApp",
                  "Agendamento auto.",
                  "Suporte 24/7",
                  "Plataforma de gestão",
                  "Relatórios"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-primary" />
                    </div>
                    <span className="text-foreground/80 text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-surface border-primary/10 shadow-sm mt-2">
              <CardContent className="p-3 flex gap-3 items-center">
                <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Pagamento 100% Seguro</h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    Criptografia SSL de ponta a ponta. Garantia de 7 dias.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface border-primary/10 shadow-sm mt-2">
              <CardContent className="p-3 flex gap-3 items-center">
                <Lock className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Privacidade Garantida</h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    Seus dados protegidos e em total conformidade com a LGPD.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coluna da Direita - Formulário de Pagamento */}
        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2 flex flex-col justify-center">
          <div className="lg:hidden mb-4">
             <Link to="/oferta" className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Voltar
            </Link>
          </div>

          {/* Dados Pessoais */}
          <Card className="shadow-sm border-border bg-card">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base">Seus Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Nome Completo</Label>
                  <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome" className="bg-background h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" className="bg-background h-9 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="cpfCnpj" className="text-xs">CPF / CNPJ</Label>
                  <Input id="cpfCnpj" value={formData.cpfCnpj} onChange={handleInputChange} placeholder="000.000.000-00" className="bg-background h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Celular</Label>
                  <Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" className="bg-background h-9 text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados de Pagamento */}
          <Card className="shadow-md border-border bg-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Pagamento</span>
                <div className="flex gap-2 opacity-70">
                  <CreditCard className="h-4 w-4" />
                  <QrCode className="h-4 w-4" />
                  <Barcode className="h-4 w-4" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4">
              <Tabs defaultValue="pix" className="w-full" onValueChange={(v) => setPaymentMethod(v as any)}>
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/50 p-1 h-9">
                  <TabsTrigger value="credit-card" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <CreditCard className="h-3 w-3 mr-1.5" /> Cartão
                  </TabsTrigger>
                  <TabsTrigger value="pix" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <QrCode className="h-3 w-3 mr-1.5" /> Pix
                  </TabsTrigger>
                  <TabsTrigger value="boleto" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Barcode className="h-3 w-3 mr-1.5" /> Boleto
                  </TabsTrigger>
                </TabsList>

                {/* Cartão de Crédito */}
                <TabsContent value="credit-card" className="space-y-3 animate-in fade-in-50 duration-300 mt-0">
                  <div className="space-y-1.5">
                    <Label htmlFor="cardName" className="text-xs">Nome no Cartão</Label>
                    <Input id="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="Como no cartão" className="bg-background h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cardNumber" className="text-xs">Número do Cartão</Label>
                    <div className="relative">
                      <Input id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="bg-background pl-9 h-9 text-sm" />
                      <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="expiry" className="text-xs">Validade</Label>
                      <Input id="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/AA" className="bg-background h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cvc" className="text-xs">CVC</Label>
                      <div className="relative">
                        <Input id="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="123" className="bg-background pl-9 h-9 text-sm" />
                        <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Pix */}
                <TabsContent value="pix" className="space-y-2 animate-in fade-in-50 duration-300 mt-0">
                  <div className="bg-muted/30 border border-border rounded-lg p-4 text-center space-y-2">
                    <div className="mx-auto bg-white p-1.5 rounded-lg w-fit shadow-sm">
                      <QrCode className="h-24 w-24 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">Pagamento via Pix</h3>
                      <p className="text-xs text-muted-foreground">
                        Preencha seus dados pessoais acima e clique em "Gerar Pix" para visualizar o QR Code.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Boleto */}
                <TabsContent value="boleto" className="space-y-2 animate-in fade-in-50 duration-300 mt-0">
                  <div className="bg-muted/30 border border-border rounded-lg p-4 text-center space-y-2">
                    <Barcode className="h-10 w-10 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">Boleto Bancário</h3>
                      <p className="text-xs text-muted-foreground">
                        O boleto será gerado após confirmar o pedido.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <div className="text-right">
                    <span className="block font-bold text-xl text-primary">R$ {planPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 pt-4 pb-4 px-4">
              <Button 
                className="w-full h-10 text-base font-semibold shadow-lg hover:shadow-xl transition-all" 
                size="lg"
                onClick={handlePayment} 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-3 w-3" /> 
                    {paymentMethod === 'pix' ? 'Gerar Pix' : 
                     paymentMethod === 'boleto' ? 'Gerar Boleto' : 
                     'Pagar Agora'}
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="h-2.5 w-2.5" />
            <span>Ambiente 100% seguro.</span>
            <span className="text-muted-foreground/50">|</span>
            <span>CNPJ: 38.386.434/0001-44</span>
          </div>
        </div>
      </div>
    </div>
  );
}
