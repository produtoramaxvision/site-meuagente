// Edge Function: asaas-checkout
// Proxy seguro para integração com API do Asaas
// A chave de API é armazenada como secret no Supabase

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers para permitir requisições do site
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Configuração de ambiente
const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
const ASAAS_ENVIRONMENT = Deno.env.get("ASAAS_ENVIRONMENT") || "sandbox";
const ASAAS_BASE_URL = ASAAS_ENVIRONMENT === "production"
  ? "https://api.asaas.com"
  : "https://api-sandbox.asaas.com";

// Configuração de planos (espelhada do frontend para validação)
const VALID_PLANS = ["lite", "basic", "business", "premium"];

const PLANS_CONFIG: Record<string, {
  name: string;
  value: number;
  annualValue: number;
  description: string;
}> = {
  lite: {
    name: "Plano Lite - Meu Agente",
    value: 97.90,
    annualValue: 1076.90,
    description: "Automação essencial via WhatsApp para finanças e agenda",
  },
  basic: {
    name: "Plano Básico - Meu Agente",
    value: 497.00,
    annualValue: 5467.00,
    description: "Automação completa via WhatsApp com exportações",
  },
  business: {
    name: "Plano Business - Meu Agente",
    value: 997.00,
    annualValue: 10967.00,
    description: "Equipe completa de IA com número dedicado e implantação",
  },
  premium: {
    name: "Plano Premium - Meu Agente",
    value: 1497.00,
    annualValue: 16467.00,
    description: "Todos os recursos + agentes avançados e backups",
  },
};

interface RequestBody {
  endpoint?: string;
  method?: string;
  payload?: unknown;
  // Atalho para criar link de pagamento diretamente
  action?: "createCheckoutLink" | "subscribe";
  planId?: string;
  billing?: "monthly" | "annual";
  successUrl?: string;
  cancelUrl?: string;
  // Dados para assinatura transparente
  customer?: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
  };
  payment?: {
    method: "CREDIT_CARD" | "PIX" | "BOLETO";
    creditCard?: {
      holderName: string;
      number: string;
      expiryMonth: string;
      expiryYear: string;
      ccv: string;
    };
    creditCardHolderInfo?: {
      name: string;
      email: string;
      cpfCnpj: string;
      postalCode: string;
      addressNumber: string;
      phone: string;
    };
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validar API key configurada
    if (!ASAAS_API_KEY) {
      console.error("[asaas-checkout] ASAAS_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Configuração de pagamento não disponível" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: RequestBody = await req.json();
    
    console.log("[asaas-checkout] Received request body:", JSON.stringify(body));

    // Atalho: criar link de pagamento diretamente
    if (body.action === "createCheckoutLink") {
      return await handleCreateCheckoutLink(body);
    }

    // Atalho: criar assinatura transparente
    if (body.action === "subscribe") {
      return await handleSubscribe(body);
    }

    // Modo proxy genérico (para flexibilidade futura)
    if (body.endpoint && body.method) {
      return await handleProxyRequest(body);
    }

    return new Response(
      JSON.stringify({ error: "Requisição inválida" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[asaas-checkout] Error:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao processar pagamento" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/**
 * Cria link de pagamento para assinatura
 */
async function handleCreateCheckoutLink(body: RequestBody): Promise<Response> {
  const { planId, billing = "monthly", successUrl, cancelUrl } = body;

  // Validações
  if (!planId || !VALID_PLANS.includes(planId)) {
    return new Response(
      JSON.stringify({ error: `Plano inválido: ${planId}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!successUrl) {
    return new Response(
      JSON.stringify({ error: "URL de sucesso é obrigatória" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Converter URLs localhost para domínio público
  const PRODUCTION_DOMAIN = "https://site.meuagente.api.br";
  const normalizedSuccessUrl = successUrl.replace(/^http:\/\/localhost:\d+/, PRODUCTION_DOMAIN);
  const normalizedCancelUrl = cancelUrl?.replace(/^http:\/\/localhost:\d+/, PRODUCTION_DOMAIN);

  // Validar que as URLs sejam HTTPS (exigido pelo Asaas)
  if (!normalizedSuccessUrl.startsWith("https://")) {
    return new Response(
      JSON.stringify({ error: "URL de sucesso deve ser HTTPS" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const plan = PLANS_CONFIG[planId];
  const value = billing === "annual" ? plan.annualValue : plan.value;
  const cycle = billing === "annual" ? "YEARLY" : "MONTHLY";
  const externalReference = `meuagente_${planId}_${billing}_${Date.now()}`;

  const paymentLinkPayload = {
    name: plan.name,
    description: plan.description,
    value,
    billingType: "UNDEFINED", // PIX, Boleto ou Cartão
    chargeType: "RECURRENT",
    subscriptionCycle: cycle,
    externalReference,
    notificationEnabled: true,
    dueDateLimitDays: 3,
    callback: {
      successUrl: normalizedSuccessUrl,
      autoRedirect: true,
    },
    isAddressRequired: false,
  };

  console.log("[asaas-checkout] Creating payment link:", {
    planId,
    billing,
    value,
    cycle,
    externalReference,
    environment: ASAAS_ENVIRONMENT,
    apiUrl: ASAAS_BASE_URL,
    successUrl: normalizedSuccessUrl,
  });

  const response = await fetch(`${ASAAS_BASE_URL}/v3/paymentLinks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": ASAAS_API_KEY!,
      "User-Agent": "MeuAgente/1.0",
    },
    body: JSON.stringify(paymentLinkPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("[asaas-checkout] Asaas API error:", {
      status: response.status,
      data,
      environment: ASAAS_ENVIRONMENT,
      endpoint: `${ASAAS_BASE_URL}/v3/paymentLinks`,
    });
    const errorMessage = data.errors?.[0]?.description || "Erro ao criar link de pagamento";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  console.log("[asaas-checkout] Payment link created:", data.id, data.url);

  return new Response(
    JSON.stringify({
      success: true,
      url: data.url,
      paymentLinkId: data.id,
      externalReference,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

/**
 * Processa assinatura transparente (Checkout Transparente)
 */
async function handleSubscribe(body: RequestBody): Promise<Response> {
  const { planId, billing = "monthly", customer, payment } = body;

  if (!customer || !payment || !planId) {
    return new Response(
      JSON.stringify({ error: "Dados incompletos para assinatura" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const plan = PLANS_CONFIG[planId];
  if (!plan) {
    return new Response(
      JSON.stringify({ error: "Plano inválido" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // 1. Buscar ou Criar Cliente
    let customerId = "";
    
    // Buscar cliente pelo CPF/CNPJ
    const searchResponse = await fetch(`${ASAAS_BASE_URL}/v3/customers?cpfCnpj=${customer.cpfCnpj}`, {
      headers: { "access_token": ASAAS_API_KEY! }
    });
    const searchData = await searchResponse.json();

    if (searchData.data && searchData.data.length > 0) {
      const existingCustomer = searchData.data[0];
      customerId = existingCustomer.id;
      
      // Verificar se os dados (telefone/email) mudaram e atualizar se necessário
      // A verificação do usuário deve ser também com o "phone" para garantir dados atualizados
      if (existingCustomer.mobilePhone !== customer.phone || existingCustomer.email !== customer.email) {
        console.log(`[asaas-checkout] Updating customer ${customerId} data`);
        const updateResponse = await fetch(`${ASAAS_BASE_URL}/v3/customers/${customerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "access_token": ASAAS_API_KEY!
          },
          body: JSON.stringify({
            mobilePhone: customer.phone,
            email: customer.email,
            name: customer.name // Atualiza nome também para garantir
          })
        });

        if (!updateResponse.ok) {
           const updateError = await updateResponse.json();
           console.error("[asaas-checkout] Failed to update customer:", updateError);
           // Não vamos bloquear o fluxo se a atualização falhar, mas logamos o erro.
           // Se o erro for crítico (ex: telefone inválido), a criação da assinatura pode falhar depois ou usar o dado antigo.
           // Opcional: throw new Error(updateError.errors?.[0]?.description || "Erro ao atualizar dados do cliente");
        }
      }
    } else {
      // Criar novo cliente
      const createCustomerResponse = await fetch(`${ASAAS_BASE_URL}/v3/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": ASAAS_API_KEY!
        },
        body: JSON.stringify({
          name: customer.name,
          email: customer.email,
          cpfCnpj: customer.cpfCnpj,
          mobilePhone: customer.phone,
          notificationDisabled: false,
        })
      });
      const newCustomer = await createCustomerResponse.json();
      if (!createCustomerResponse.ok) {
        throw new Error(newCustomer.errors?.[0]?.description || "Erro ao criar cliente");
      }
      customerId = newCustomer.id;
    }

    // 2. Criar Assinatura
    const value = billing === "annual" ? plan.annualValue : plan.value;
    const cycle = billing === "annual" ? "YEARLY" : "MONTHLY";
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate()); // Vencimento hoje (cobrança imediata)
    const nextDueDateStr = nextDueDate.toISOString().split('T')[0];

    const subscriptionPayload: any = {
      customer: customerId,
      billingType: payment.method,
      value,
      nextDueDate: nextDueDateStr,
      cycle,
      description: plan.description,
      externalReference: `meuagente_${planId}_${billing}_${Date.now()}`,
    };

    if (payment.method === "CREDIT_CARD") {
      if (!payment.creditCard || !payment.creditCardHolderInfo) {
        throw new Error("Dados do cartão incompletos");
      }
      subscriptionPayload.creditCard = payment.creditCard;
      subscriptionPayload.creditCardHolderInfo = payment.creditCardHolderInfo;
      subscriptionPayload.remoteIp = "0.0.0.0"; // Idealmente pegar do request headers se possível
    }

    const subscriptionResponse = await fetch(`${ASAAS_BASE_URL}/v3/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY!
      },
      body: JSON.stringify(subscriptionPayload)
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      throw new Error(subscriptionData.errors?.[0]?.description || "Erro ao criar assinatura");
    }

    // 3. Retornar dados para pagamento (QR Code ou Boleto) se não for cartão
    let paymentInfo = {};

    if (payment.method === "PIX" || payment.method === "BOLETO") {
      // Buscar a cobrança gerada para pegar o QR Code ou Linha Digitável
      const paymentsResponse = await fetch(`${ASAAS_BASE_URL}/v3/subscriptions/${subscriptionData.id}/payments`, {
        headers: { "access_token": ASAAS_API_KEY! }
      });
      const paymentsData = await paymentsResponse.json();
      
      if (paymentsData.data && paymentsData.data.length > 0) {
        const firstPayment = paymentsData.data[0];
        
        if (payment.method === "PIX") {
          const pixResponse = await fetch(`${ASAAS_BASE_URL}/v3/payments/${firstPayment.id}/pixQrCode`, {
            headers: { "access_token": ASAAS_API_KEY! }
          });
          const pixData = await pixResponse.json();
          paymentInfo = { pix: pixData };
        } else if (payment.method === "BOLETO") {
          const boletoResponse = await fetch(`${ASAAS_BASE_URL}/v3/payments/${firstPayment.id}/identificationField`, {
            headers: { "access_token": ASAAS_API_KEY! }
          });
          const boletoData = await boletoResponse.json();
          paymentInfo = { boleto: { ...boletoData, url: firstPayment.bankSlipUrl } };
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscriptionId: subscriptionData.id,
        status: subscriptionData.status,
        ...paymentInfo
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("[asaas-checkout] Subscribe error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro ao processar assinatura" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

/**
 * Modo proxy para requisições genéricas à API do Asaas
 */
async function handleProxyRequest(body: RequestBody): Promise<Response> {
  const { endpoint, method, payload } = body;

  // Lista de endpoints permitidos (whitelist de segurança)
  const allowedEndpoints = [
    "/v3/paymentLinks",
    "/v3/customers",
    "/v3/subscriptions",
  ];

  const isAllowed = allowedEndpoints.some(e => endpoint!.startsWith(e));
  if (!isAllowed) {
    return new Response(
      JSON.stringify({ error: "Endpoint não permitido" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const response = await fetch(`${ASAAS_BASE_URL}${endpoint}`, {
    method: method as string,
    headers: {
      "Content-Type": "application/json",
      "access_token": ASAAS_API_KEY!,
      "User-Agent": "MeuAgente/1.0",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const data = await response.json();

  return new Response(
    JSON.stringify(data),
    { 
      status: response.status, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    }
  );
}
