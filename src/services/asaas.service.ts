/**
 * Serviço de integração com Asaas para a página de Oferta
 * Este serviço é exclusivo para checkout direto (sem login prévio)
 * 
 * @see https://docs.asaas.com/
 */

import type {
  AsaasPaymentLinkCreateRequest,
  AsaasPaymentLinkResponse,
  AsaasErrorResponse,
  ASAAS_PLANS,
} from '@/types/asaas';

// Tipos auxiliares
type BillingCycle = 'monthly' | 'annual';

interface CreateCheckoutLinkParams {
  planId: string;
  billing: BillingCycle;
  successUrl: string;
  externalReference?: string;
}

interface CreateCheckoutLinkResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Função auxiliar para fazer requisições à API do Asaas via Edge Function
 * A chave de API NUNCA é exposta no frontend
 */
async function asaasRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: unknown
): Promise<{ data?: T; error?: string }> {
  try {
    // Importa o cliente Supabase dinamicamente para evitar problemas de SSR
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase.functions.invoke('asaas-checkout', {
      body: {
        endpoint,
        method,
        payload: body,
      },
    });

    if (error) {
      console.error('[AsaasService] Supabase function error:', error);
      return { error: error.message || 'Erro ao processar requisição' };
    }

    if (data?.error) {
      return { error: data.error };
    }

    return { data: data as T };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('[AsaasService] Request error:', errorMessage);
    return { error: errorMessage };
  }
}

/**
 * Cria um link de pagamento para assinatura recorrente
 * Usado na página de Oferta para checkout direto
 */
export async function createCheckoutLink(
  params: CreateCheckoutLinkParams
): Promise<CreateCheckoutLinkResult> {
  const { planId, billing, successUrl, externalReference } = params;

  // Importa a configuração de planos
  const { ASAAS_PLANS } = await import('@/types/asaas');
  
  const plan = ASAAS_PLANS[planId];
  
  if (!plan) {
    return {
      success: false,
      error: `Plano "${planId}" não encontrado`,
    };
  }

  // Determina valor e ciclo baseado no billing
  const value = billing === 'annual' ? plan.annualValue : plan.value;
  const cycle = billing === 'annual' ? 'YEARLY' : plan.cycle;

  const paymentLinkData: AsaasPaymentLinkCreateRequest = {
    name: plan.name,
    description: plan.description,
    value,
    billingType: 'UNDEFINED', // Permite PIX, Boleto ou Cartão
    chargeType: 'RECURRENT',
    subscriptionCycle: cycle,
    externalReference: externalReference || `${plan.externalReference}_${Date.now()}`,
    notificationEnabled: true,
    callback: {
      successUrl,
      autoRedirect: true,
    },
    isAddressRequired: false,
    dueDateLimitDays: 3,
  };

  const result = await asaasRequest<AsaasPaymentLinkResponse>(
    '/v3/paymentLinks',
    'POST',
    paymentLinkData
  );

  if (result.error) {
    return {
      success: false,
      error: result.error,
    };
  }

  if (!result.data?.url) {
    return {
      success: false,
      error: 'URL de checkout não retornada pelo Asaas',
    };
  }

  return {
    success: true,
    url: result.data.url,
  };
}

/**
 * Obtém informações de um plano específico
 */
export function getPlanInfo(planId: string) {
  // Importação síncrona para uso direto
  const plans: Record<string, { 
    id: string; 
    name: string; 
    value: number; 
    annualValue: number;
    description: string;
  }> = {
    lite: {
      id: 'lite',
      name: 'Plano Lite',
      value: 97.90,
      annualValue: 1076.90,
      description: 'Automação essencial via WhatsApp',
    },
    basic: {
      id: 'basic',
      name: 'Plano Básico',
      value: 497.00,
      annualValue: 5467.00,
      description: 'Automação completa via WhatsApp',
    },
    business: {
      id: 'business',
      name: 'Plano Business',
      value: 997.00,
      annualValue: 10967.00,
      description: 'Equipe completa de IA',
    },
    premium: {
      id: 'premium',
      name: 'Plano Premium',
      value: 1497.00,
      annualValue: 16467.00,
      description: 'Todos os recursos avançados',
    },
  };

  return plans[planId] || null;
}

export default {
  createCheckoutLink,
  getPlanInfo,
};
