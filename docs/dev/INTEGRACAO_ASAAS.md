# Integração Asaas - Página de Oferta

> **Data:** 22 de dezembro de 2025  
> **Escopo:** Exclusivo para página `/oferta` (tráfego pago)

## 📋 Visão Geral

A página de Oferta agora utiliza **Asaas** como gateway de pagamento, permitindo:
- ✅ Checkout direto sem necessidade de login prévio
- ✅ Múltiplas formas de pagamento (PIX, Boleto, Cartão)
- ✅ Assinaturas recorrentes automáticas
- ✅ Criação de usuário após pagamento via webhook

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                     PÁGINA DE OFERTA                            │
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────────┐              │
│  │  useAsaasCheckout│    │  SalesPage.tsx       │              │
│  │  (hook)          │◄───│  (componente)        │              │
│  └────────┬─────────┘    └──────────────────────┘              │
│           │                                                     │
└───────────┼─────────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────────────────────┐
│  Edge Function: asaas-checkout                                   │
│  - Valida plano                                                  │
│  - Cria PaymentLink no Asaas                                     │
│  - Retorna URL de checkout                                       │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│  API Asaas                                                       │
│  POST /v3/paymentLinks                                           │
│  - Cria link de pagamento recorrente                            │
│  - Retorna URL para checkout                                     │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│  Checkout Asaas (hospedado)                                      │
│  - Coleta dados do cliente                                       │
│  - Processa pagamento                                            │
│  - Redireciona para success_url                                  │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│  Webhook: asaas-webhook                                          │
│  - Valida token + IP allowlist (segurança tripla)                │
│  - Busca dados do cliente via API Asaas                          │
│  - Cria/atualiza usuário no Supabase Auth                        │
│  - UPSERT na tabela clientes                                     │
│  - Registra billing_event para idempotência                      │
│  - Envia magic link de boas-vindas                               │
└──────────────────────────────────────────────────────────────────┘
```

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente no Supabase

Adicione as seguintes secrets no Supabase Dashboard:

```bash
# No Supabase Dashboard > Project Settings > Edge Functions > Secrets

ASAAS_API_KEY=your_asaas_api_key_here
ASAAS_ENVIRONMENT=sandbox  # ou "production" para produção
ASAAS_WEBHOOK_TOKEN=seu_token_seguro_aqui  # Token para validar webhooks
```

### 2. Deploy das Edge Functions

```bash
# Na raiz do projeto
supabase functions deploy asaas-checkout
supabase functions deploy asaas-webhook
```

**Status:** ✅ **asaas-webhook deployada com sucesso!**
- Function ID: `fc6a4c13-b1e9-4910-87fe-468fac748b6c`
- Version: 1
- Status: ACTIVE
- JWT Verification: Disabled (conforme esperado para webhooks)

### 3. Configuração do Webhook no Asaas

1. Acesse o painel Asaas > Configurações > Integrações > Webhooks
2. Adicione um novo webhook:
   - **URL:** `https://esxmoaxjlvvypxocgudd.supabase.co/functions/v1/asaas-webhook`
   - **Token de Acesso:** O mesmo valor de `ASAAS_WEBHOOK_TOKEN`
   - **Eventos:** 
     - `PAYMENT_CONFIRMED` (cartão de crédito)
     - `PAYMENT_RECEIVED` (PIX e boleto)
3. Salve e teste a conexão

## 📁 Arquivos Criados

```
src/
├── types/
│   └── asaas.ts                    # Tipos TypeScript para API Asaas
├── services/
│   └── asaas.service.ts            # Serviço de integração (helper)
├── hooks/
│   └── use-asaas-checkout.ts       # Hook para checkout na página
└── pages/
    └── SalesPage.tsx               # Atualizado com integração

supabase/
└── functions/
    ├── asaas-checkout/
    │   └── index.ts                # Edge Function proxy seguro
    └── asaas-webhook/
        └── index.ts                # Webhook para processamento de pagamentos
```

## 🔒 Segurança do Webhook

A Edge Function `asaas-webhook` implementa **segurança tripla**:

### 1. Validação de IP (Allowlist)
Apenas IPs oficiais do Asaas são aceitos:
- `52.67.12.206`
- `18.230.8.159`
- `54.94.136.112`
- `54.94.183.101`

### 2. Token de Acesso
O header `asaas-access-token` deve conter o token configurado no webhook.

### 3. Idempotência
Eventos já processados são ignorados via `billing_events.asaas_event_id`.

## 💰 Mapeamento de Planos

| Plano    | ID        | Mensal    | Anual      | Ciclo   |
|----------|-----------|-----------|------------|---------|
| Free     | `free`    | R$ 0      | R$ 0       | -       |
| Lite     | `lite`    | R$ 97,90  | R$ 1.076,90| MONTHLY/YEARLY |
| Básico   | `basic`   | R$ 497    | R$ 5.467   | MONTHLY/YEARLY |
| Business | `business`| R$ 997    | R$ 10.967  | MONTHLY/YEARLY |
| Premium  | `premium` | R$ 1.497  | R$ 16.467  | MONTHLY/YEARLY |

## 🔐 Segurança

- ✅ Chave de API do Asaas **NUNCA** exposta no frontend
- ✅ Comunicação via Edge Function com whitelist de endpoints
- ✅ Validação de planos server-side
- ✅ External reference com timestamp para rastreamento
- ✅ Webhook com validação tripla (IP + Token + Idempotência)
- ✅ Payload completo armazenado para audit trail

## 🚀 Próximos Passos

### ✅ Completado via Supabase MCP
1. **[✅] Migration aplicada**
   - Coluna `asaas_event_id` adicionada em `billing_events`
   - Índice criado para idempotência

2. **[✅] Edge Function deployada**
   - `asaas-webhook` está ACTIVE (version 1)
   - Configuração JWT desabilitada
   - Function ID: `fc6a4c13-b1e9-4910-87fe-468fac748b6c`

### ⏳ Pendente - Ações Manuais Necessárias

3. **[ ] Configurar Secrets no Supabase**
   
   Acesse: [Supabase Dashboard > Project Settings > Edge Functions > Secrets](https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/settings/functions)
   
   **Adicione os seguintes secrets:**
   - `ASAAS_WEBHOOK_TOKEN`: Crie um token seguro (ex: UUID ou string aleatória de 32+ caracteres)
   - `ASAAS_API_KEY`: Sua chave de API do Asaas (sandbox ou produção)
   
   ```bash
   # Exemplo de token seguro (use o gerado):
   # ASAAS_WEBHOOK_TOKEN=a7f9c3e1-4b2d-8f6a-9e3c-1d5b7f2a8e4c
   ```

4. **[ ] Configurar Webhook no Painel Asaas**
   
   Acesse: [Painel Asaas > Configurações > Integrações > Webhooks](https://www.asaas.com/config/webhook)
   
   **Configuração:**
   - **URL:** `https://esxmoaxjlvvypxocgudd.supabase.co/functions/v1/asaas-webhook`
   - **Token de Acesso:** Mesmo valor de `ASAAS_WEBHOOK_TOKEN` configurado no passo 3
   - **Eventos:** Marque:
     - ✅ `PAYMENT_CONFIRMED` (pagamento com cartão confirmado)
     - ✅ `PAYMENT_RECEIVED` (pagamento PIX/Boleto recebido)
   - **Ambiente:** Sandbox (para testes) ou Produção

5. **[ ] Testar o Webhook**
   
   Opções de teste:
   
   **A) Via Painel Asaas:**
   - Após configurar o webhook, use o botão "Testar" no painel
   - Verifique os logs da função em: [Supabase Dashboard > Edge Functions > asaas-webhook > Logs](https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/functions/asaas-webhook/logs)
   
   **B) Via Pagamento de Teste (Sandbox):**
   - Crie um pagamento de teste no Asaas Sandbox
   - Use cartão de teste: `5162306219378829` (expira qualquer data futura, CVV: qualquer)
   - Confirme o pagamento e monitore os logs

6. **[ ] Configurar Template de Email (Opcional)**
   
   O template HTML já foi criado. Para configurar no Supabase:
   
   Acesse: [Supabase Dashboard > Authentication > Email Templates](https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/auth/templates)
   
   - Selecione template: **Magic Link**
   - Cole o HTML fornecido anteriormente
   - Salve as alterações

7. **[ ] Monitoramento e Logs**
   
   Links úteis:
   - [Logs da Edge Function](https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/functions/asaas-webhook/logs)
   - [Logs de Auth (magic links)](https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/auth/users)
   - [Tabela billing_events](https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/editor) (para verificar eventos processados)

### 🔍 Verificação Rápida

Após configurar, verifique:

```sql
-- Ver eventos processados
SELECT * FROM billing_events 
WHERE asaas_event_id IS NOT NULL 
ORDER BY created_at DESC 
LIMIT 10;

-- Ver clientes com Asaas
SELECT phone, name, email, plan_id, subscription_active 
FROM clientes 
WHERE billing_provider = 'asaas' 
ORDER BY created_at DESC;
```

2. **[ ] Página de sucesso**
   - Criar `/sucesso` com confirmação
   - Exibir próximos passos
   - Link para definir senha

3. **[ ] Testes**
   - Testar em sandbox
   - Validar todos os planos
   - Testar webhook

## 📝 Diferença do Stripe

| Aspecto | Stripe (página /planos) | Asaas (página /oferta) |
|---------|------------------------|------------------------|
| Login   | Requer login prévio    | Checkout direto        |
| Usuário | Já existe              | Criado após pagamento  |
| Fluxo   | Site → App → Stripe    | Site → Asaas → Webhook |
| Uso     | Usuários existentes    | Tráfego pago (novos)   |

## 🆘 Troubleshooting

### Erro: "Configuração de pagamento não disponível"
- Verifique se `ASAAS_API_KEY` está configurada no Supabase

### Erro: "Plano inválido"
- Verifique se o `planId` é um dos válidos: `lite`, `basic`, `business`, `premium`

### Erro: "URL de checkout não retornada"
- Verifique logs da Edge Function no Supabase
- Confirme que a API do Asaas está respondendo

### Webhook não recebido
- Verifique URL do webhook no painel Asaas
- Confirme que a Edge Function está deployada
- Verifique se o token está correto

### Webhook retorna 403
- Verifique se o IP está na allowlist do Asaas
- Confirme que o header `asaas-access-token` está sendo enviado

### Webhook retorna 401
- O token `ASAAS_WEBHOOK_TOKEN` não corresponde ao configurado no Asaas

### Usuário não criado
- Verifique os logs da Edge Function no Supabase Dashboard
- Confirme que o cliente tem email e telefone válidos

## 📊 Fluxo do Webhook

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ASAAS WEBHOOK FLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Asaas envia POST para /functions/v1/asaas-webhook               │
│     └─► Header: asaas-access-token: {token}                         │
│     └─► Body: { event, payment: { id, customer, value, ... } }      │
│                                                                     │
│  2. Validação Tripla                                                │
│     ├─► IP na allowlist? (52.67.12.206, 18.230.8.159, ...)         │
│     ├─► Token válido? (asaas-access-token === ASAAS_WEBHOOK_TOKEN) │
│     └─► Método POST?                                                │
│                                                                     │
│  3. Idempotência                                                    │
│     └─► SELECT FROM billing_events WHERE asaas_event_id = ?         │
│         └─► Se existe: return 200 (já processado)                   │
│                                                                     │
│  4. Buscar dados do cliente                                         │
│     └─► GET /v3/customers/{payment.customer}                        │
│         └─► Retorna: name, email, phone, cpfCnpj                    │
│                                                                     │
│  5. Buscar subscription para plan_id                                │
│     └─► GET /v3/subscriptions?customer={id}                         │
│         └─► externalReference → plan_id (lite, basic, ...)          │
│                                                                     │
│  6. Verificar/Criar usuário no Auth                                 │
│     ├─► listUsers({ filter: email })                                │
│     │   └─► Se não existe: createUser()                             │
│     └─► generateLink({ type: 'magiclink' })  ← Envia welcome email  │
│         └─► Falha? Continua (login por telefone)                    │
│                                                                     │
│  7. UPSERT em clientes                                              │
│     └─► phone (PK), name, email, plan_id,                           │
│         billing_provider='asaas', subscription_active=true          │
│                                                                     │
│  8. INSERT billing_event                                            │
│     └─► asaas_event_id, event_type, plan_id, raw_payload            │
│                                                                     │
│  9. Return 200 { success: true }                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```
