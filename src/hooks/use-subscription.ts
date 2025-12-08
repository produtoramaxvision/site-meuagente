import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type BillingCycle = 'monthly' | 'annual';

// IDs recorrentes atuais no Stripe (ajustar se trocados no Dashboard ou migrar para lookup_key server-side)
const PRICE_IDS: Record<string, { monthly?: string; annual?: string }> = {
  lite: {
    monthly: 'price_1SbygeDUMJkQwpuNfKOSWoRL',
    annual: 'price_1SbykvDUMJkQwpuNnawqHQi2',
  },
  basic: {
    monthly: 'price_1SWpI2DUMJkQwpuNYUAcU5ay',
    annual: 'price_1SbykyDUMJkQwpuNHSyxzqSH',
  },
  business: {
    monthly: 'price_1SWpI3DUMJkQwpuNbd9GWlWK',
    annual: 'price_1Sbyl3DUMJkQwpuN80srGDzm',
  },
  premium: {
    monthly: 'price_1SWpI4DUMJkQwpuN9NfkqZzL',
    annual: 'price_1Sbyl6DUMJkQwpuNUq1TF9Wq',
  },
};

// URL base do app principal para redirecionamento
const APP_URL = 'https://app.meuagente.api.br';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId: string, billing: BillingCycle = 'monthly') => {
    setLoading(true);
    try {
      const priceId = PRICE_IDS[planId]?.[billing];

      // 1. Verificar se o usuário está logado no site
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Usuário não logado no site: redireciona para o APP na raiz,
        // passando intenção de checkout e o plano escolhido.
        // Inclui ciclo e price_id para o app criar a sessão de checkout.
        const params = new URLSearchParams({
          redirect: 'checkout',
          plan: planId,
          billing,
          ...(priceId ? { price_id: priceId } : {}),
        });
        window.location.href = `${APP_URL}/?${params.toString()}`;
        return;
      }

      // 2. Se estiver logado (cenário onde o site compartilha auth ou usuário logou aqui),
      // invocar a Edge Function para criar a sessão de checkout diretamente.
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          plan_id: planId,
          billing_cycle: billing,
          price_id: priceId,
          success_url: `${window.location.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/planos`,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // 3. Redirecionar para o Stripe
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não retornada');
      }
    } catch (error: any) {
      console.error('Erro ao iniciar checkout:', error);
      toast.error('Erro ao iniciar assinatura', {
        description: error.message || 'Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubscribe,
    loading,
  };
};
