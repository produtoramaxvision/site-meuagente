# Guia de Testes Asaas (Sandbox)

Este guia contém informações essenciais para testar a integração com o Asaas no ambiente de Sandbox.

## 💳 Cartões de Crédito para Teste

Utilize estes números para simular pagamentos com cartão de crédito.

| Bandeira | Número do Cartão | Vencimento | CVV | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **Genérico** | `4444 4444 4444 4444` | Qualquer data futura | 123 | ✅ Sucesso |
| **Mastercard** | `5184 0197 4037 3151` | Qualquer data futura | 123 | ❌ Erro (Falha no pagamento) |
| **Visa** | `4916 5613 5824 0741` | Qualquer data futura | 123 | ❌ Erro (Falha no pagamento) |

> **Nota:** O nome do titular pode ser qualquer um (ex: "TESTE SANDBOX") e o CPF deve ser um CPF válido (gerado em sites como 4devs).

## 📄 Como Pagar Boleto no Sandbox

No ambiente de Sandbox, você não paga o boleto no banco real. Existem duas formas de simular o pagamento:

### 1. Via Painel do Sandbox (Recomendado)
1. Acesse [sandbox.asaas.com](https://sandbox.asaas.com/).
2. Vá em **Cobranças**.
3. Localize a cobrança gerada (status "Pendente").
4. Clique no ícone de **Confirmar Pagamento** (geralmente um "check" ou opção no menu de ações).
5. O saldo será creditado na sua conta Sandbox imediatamente.

### 2. Via API
Você pode confirmar o pagamento programaticamente chamando o endpoint de sandbox:

```http
POST https://api-sandbox.asaas.com/v3/sandbox/payment/{PAYMENT_ID}/confirm
Content-Type: application/json
access_token: {SEU_API_KEY}

{}
```

## 💠 Como Adicionar/Testar PIX

O PIX já está habilitado nativamente no checkout do Asaas.

### Como funciona na integração atual?
Na nossa Edge Function `asaas-checkout`, definimos o `billingType` como `"UNDEFINED"`. Isso instrui o Asaas a mostrar **todas as opções de pagamento disponíveis** (Boleto, Cartão e PIX) para o cliente na página de checkout.

```typescript
// supabase/functions/asaas-checkout/index.ts
const paymentLinkPayload = {
  // ...
  billingType: "UNDEFINED", // Permite PIX, Boleto e Cartão
  // ...
};
```

### Como testar o pagamento via PIX?
1. No checkout, escolha a opção **PIX**.
2. Copie o código "Copia e Cola" gerado.
3. Utilize o endpoint de teste do Sandbox para simular o pagamento:

```http
POST https://api-sandbox.asaas.com/v3/pix/qrCodes/pay
Content-Type: application/json
access_token: {SEU_API_KEY}

{
  "qrCode": {
    "payload": "COLE_AQUI_O_PAYLOAD_DO_PIX"
  },
  "value": 97.90
}
```

Ou, mais simplesmente, aguarde alguns minutos ou verifique se há opção de confirmação manual no painel do Sandbox, similar ao boleto.
