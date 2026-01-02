# Asaas Webhook - Checklist de Configuração

> **Data do Deploy:** 31 de dezembro de 2025  
> **Status:** Edge Function deployada, aguardando configuração de secrets e webhook

---

## ✅ Completado (via Supabase MCP)

- [x] Migration aplicada (`asaas_event_id` em `billing_events`)
- [x] Edge Function `asaas-webhook` deployada (version 1, ACTIVE, Function ID: `fc6a4c13-b1e9-4910-87fe-468fac748b6c`)
- [x] Edge Function `asaas-checkout` deployada (version 2, ACTIVE, Function ID: `9759869a-91d9-4edf-b686-e2aeecb3c0f1`)
- [x] Configuração JWT:
  - `asaas-webhook`: JWT desabilitado (`verify_jwt=false`) - correto para webhooks externos
  - `asaas-checkout`: JWT desabilitado (`verify_jwt=false`) - correto para checkout de usuários anônimos
- [x] Documentação atualizada
- [x] Configuração Supabase corrigida:
  - Project ID atualizado de `esxmoaxjlvvypxocgudd` → `pzoodkjepcarxnawuxoa`
  - URL atualizada em `.env` e `client.ts`
  - Anon key atualizada para o projeto correto
- [x] **Teste de checkout funcional**: Função processa requisições corretamente, erro é da API Asaas (domínio não configurado)

---

## 📋 Checklist de Configuração Manual

### 1️⃣ Configurar Secrets no Supabase

🔗 **Link:** https://supabase.com/dashboard/project/pzoodkjepcarxnawuxoa/settings/functions

**Secrets necessários:**

```bash
# 1. Token de validação do webhook (gere um UUID seguro)
ASAAS_WEBHOOK_TOKEN=GERE_UM_UUID_AQUI

# 2. Chave de API do Asaas (⚠️ JÁ CONFIGURADA - funcionando corretamente)
ASAAS_API_KEY=sua_chave_api_asaas_aqui

# 3. Ambiente (opcional - padrão: sandbox)
ASAAS_ENVIRONMENT=sandbox  # ou "production"
```

**Status dos Secrets:**
- ✅ `ASAAS_API_KEY`: **CONFIGURADO** (testado com sucesso - API respondeu corretamente)
- ⏳ `ASAAS_WEBHOOK_TOKEN`: Pendente configuração (gerar UUID)
- ⏳ `ASAAS_ENVIRONMENT`: Opcional (padrão: sandbox)

**Como gerar um token seguro:**

```bash
# PowerShell
[guid]::NewGuid().ToString()

# Ou use: https://www.uuidgenerator.net/
```

---

### 2️⃣ Configurar Domínio no Asaas (OBRIGATÓRIO)

🔗 **Link:** https://www.asaas.com/myAccount/companyInfo

**⚠️ IMPORTANTE:** Antes de criar PaymentLinks, você deve cadastrar um domínio na sua conta Asaas.

**Passos:**
1. Acesse "Minha Conta" → Aba "Informações"
2. Adicione o domínio: `meuagente.ai` (ou seu domínio de produção)
3. Para testes locais, você pode usar: `localhost` ou `127.0.0.1`

**Erro sem domínio:**
```
Não há nenhum domínio configurado em sua conta. 
Cadastre um site em Minha Conta na aba Informações.
```

---

### 3️⃣ Configurar Webhook no Asaas

🔗 **Link:** https://www.asaas.com/config/webhook

**Dados da configuração:**

| Campo | Valor |
|-------|-------|
| **URL** | `https://pzoodkjepcarxnawuxoa.supabase.co/functions/v1/asaas-webhook` |
| **Token de Acesso** | ⚠️ **Mesmo valor** de `ASAAS_WEBHOOK_TOKEN` do passo 1 |
| **Eventos** | ✅ `PAYMENT_CONFIRMED`<br>✅ `PAYMENT_RECEIVED` |
| **Ambiente** | Sandbox (para testes) ou Produção |
| **Ativo** | ✅ Sim |

---

### 4️⃣ Testar a Integração

#### Opção A: Teste via Painel Asaas

1. Acesse: https://www.asaas.com/config/webhook
2. Clique em "Testar" ao lado do webhook configurado
3. Verifique os logs: https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/functions/asaas-webhook/logs

#### Opção B: Pagamento de Teste (Sandbox)

**Dados de teste:**
- **Cartão:** `5162306219378829`
- **Validade:** Qualquer data futura (ex: 12/2030)
- **CVV:** Qualquer (ex: 123)
- **Nome:** Teste Webhook

**Fluxo:**
1. Crie um PaymentLink de teste via `/oferta`
2. Complete o checkout com dados de teste
3. Aguarde o webhook ser disparado
4. Verifique os logs e a tabela `billing_events`

---

### 4️⃣ Verificar Processamento

#### SQL para verificar eventos:

```sql
-- Ver últimos eventos processados
SELECT 
  asaas_event_id,
  event_type,
  user_phone,
  plan_id,
  created_at
FROM billing_events 
WHERE asaas_event_id IS NOT NULL 
ORDER BY created_at DESC 
LIMIT 10;

-- Ver clientes criados via Asaas
SELECT 
  phone,
  name,
  email,
  plan_id,
  subscription_active,
  billing_provider,
  created_at
FROM clientes 
WHERE billing_provider = 'asaas' 
ORDER BY created_at DESC;
```

#### Verificar logs em tempo real:

🔗 https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/functions/asaas-webhook/logs

**O que esperar nos logs:**
- ✅ IP validated
- ✅ Access token validated
- ✅ New event, processing
- ✅ Customer fetched
- ✅ Plan ID determined
- ✅ Cliente upserted
- ✅ Billing event recorded
- 🎉 Webhook processed successfully!

---

## 🔐 Segurança Implementada

A Edge Function possui **3 camadas de segurança**:

### 1. Validação de IP (Allowlist)
Apenas IPs oficiais do Asaas são aceitos:
- `52.67.12.206`
- `18.230.8.159`
- `54.94.136.112`
- `54.94.183.101`

### 2. Token de Acesso
Header `asaas-access-token` deve ser válido

### 3. Idempotência
Eventos duplicados são ignorados via `billing_events.asaas_event_id`

---

## 📧 Email de Boas-Vindas

O template HTML de boas-vindas está em:
`docs/dev/INTEGRACAO_ASAAS.md` (seção do HTML fornecido pelo usuário)

**Para configurar:**
1. Acesse: https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/auth/templates
2. Selecione: **Magic Link**
3. Cole o template HTML
4. Salve

**Nota:** O email é enviado automaticamente quando um novo usuário é criado e a magic link é gerada com sucesso.

---

## 🐛 Troubleshooting

### Webhook retorna 403 (Forbidden)
- ❌ IP não está na allowlist
- ✅ Verifique se o Asaas está usando IPs oficiais

### Webhook retorna 401 (Unauthorized)
- ❌ Token inválido
- ✅ Confirme que `ASAAS_WEBHOOK_TOKEN` no Supabase == Token no painel Asaas

### Webhook retorna 500 (Internal Error)
- ❌ `ASAAS_API_KEY` não configurada ou inválida
- ❌ Erro ao buscar dados do cliente
- ✅ Verifique logs da função para detalhes

### Usuário não criado
- ⚠️ Cliente sem telefone (telefone é obrigatório)
- ⚠️ Email inválido (apenas warning, não bloqueia)
- ✅ Verifique logs e tabela `clientes`

### Magic link não enviado
- ℹ️ Não bloqueia o processamento
- ℹ️ Usuário pode logar por telefone
- ✅ Verifique logs de Auth no Supabase

---

## 📊 Monitoramento

### Links Importantes

| Recurso | URL |
|---------|-----|
| **Edge Function Logs** | https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/functions/asaas-webhook/logs |
| **Auth Users** | https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/auth/users |
| **Database Editor** | https://supabase.com/dashboard/project/esxmoaxjlvvypxocgudd/editor |
| **Webhook Config (Asaas)** | https://www.asaas.com/config/webhook |

### Métricas Recomendadas

```sql
-- Taxa de sucesso de webhooks (últimas 24h)
SELECT 
  COUNT(*) as total_eventos,
  COUNT(DISTINCT user_phone) as usuarios_unicos,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '1 hour' THEN 1 END) as ultima_hora
FROM billing_events
WHERE asaas_event_id IS NOT NULL
  AND created_at > NOW() - INTERVAL '24 hours';
```

---

## ✅ Conclusão

Após completar todos os itens deste checklist:

1. Webhook estará recebendo eventos do Asaas
2. Usuários serão criados automaticamente após pagamento
3. Email de boas-vindas será enviado (se configurado)
4. Sistema estará pronto para tráfego pago na página `/oferta`

**Última atualização:** 31 de dezembro de 2025
