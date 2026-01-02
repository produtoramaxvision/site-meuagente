/**
 * Hook para checkout direto com Asaas
 * Exclusivo para a página de Oferta (tráfego pago)
 * 
 * Diferença do useSubscription:
 * - Não requer login prévio
 * - Redireciona diretamente para o checkout do Asaas
 * - Após pagamento, webhook cria usuário automaticamente
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type BillingCycle = 'monthly' | 'annual';

interface UseAsaasCheckoutReturn {
  /** Inicia o checkout para um plano específico */
  handleCheckout: (planId: string, billing?: BillingCycle) => Promise<void>;
  /** Estado de loading durante o processo */
  loading: boolean;
  /** ID do plano sendo processado (para loading individual) */
  loadingPlanId: string | null;
}

interface CheckoutResponse {
  success?: boolean;
  url?: string;
  paymentLinkId?: string;
  externalReference?: string;
  error?: string;
}

// Configuração de planos para display
export const ASAAS_PLAN_PRICES = {
  free: { monthly: 0, annual: 0 },
  lite: { monthly: 97.90, annual: 1076.90 },
  basic: { monthly: 497.00, annual: 5467.00 },
  business: { monthly: 997.00, annual: 10967.00 },
  premium: { monthly: 1497.00, annual: 16467.00 },
} as const;

export function useAsaasCheckout(): UseAsaasCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handleCheckout = useCallback(async (
    planId: string,
    billing: BillingCycle = 'monthly'
  ) => {
    // Plano Free não passa por checkout
    if (planId === 'free') {
      window.open('https://app.meuagente.api.br/?plan=free', '_blank');
      return;
    }

    // Validação de plano
    const validPlans = ['lite', 'basic', 'business', 'premium'];
    if (!validPlans.includes(planId)) {
      toast.error('Plano inválido', {
        description: 'Por favor, selecione um plano válido.',
      });
      return;
    }

    setLoading(true);
    setLoadingPlanId(planId);

    try {
      // URLs de retorno
      const successUrl = `${window.location.origin}/sucesso?provider=asaas&plan=${planId}`;
      const cancelUrl = `${window.location.origin}/oferta`;

      // Chama a Edge Function do Asaas
      const { data, error } = await supabase.functions.invoke<CheckoutResponse>('asaas-checkout', {
        body: {
          action: 'createCheckoutLink',
          planId,
          billing,
          successUrl,
          cancelUrl,
        },
      });

      if (error) {
        throw new Error(error.message || 'Erro ao conectar com servidor de pagamento');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data?.url) {
        throw new Error('Link de pagamento não foi gerado');
      }

      // Tracking de conversão (opcional - integrar com analytics)
      try {
        // @ts-ignore - gtag pode não estar definido
        if (typeof gtag !== 'undefined') {
          // @ts-ignore
          gtag('event', 'begin_checkout', {
            currency: 'BRL',
            value: ASAAS_PLAN_PRICES[planId as keyof typeof ASAAS_PLAN_PRICES]?.[billing] || 0,
            items: [{
              item_id: planId,
              item_name: `Plano ${planId.charAt(0).toUpperCase() + planId.slice(1)}`,
              price: ASAAS_PLAN_PRICES[planId as keyof typeof ASAAS_PLAN_PRICES]?.[billing] || 0,
            }],
          });
        }
      } catch {
        // Ignora erros de tracking
      }

      // Redireciona para o checkout do Asaas
      window.location.href = data.url;

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[useAsaasCheckout] Error:', errorMessage);
      
      toast.error('Erro ao iniciar pagamento', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
      setLoadingPlanId(null);
    }
  }, []);

  return {
    handleCheckout,
    loading,
    loadingPlanId,
  };
}

export default useAsaasCheckout;
