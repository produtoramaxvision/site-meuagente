/**
 * Asaas Webhook Handler - Edge Function
 * 
 * Processa eventos de pagamento do Asaas (PAYMENT_CONFIRMED, PAYMENT_RECEIVED)
 * e provisiona usuários automaticamente após confirmação do pagamento.
 * 
 * Segurança tripla:
 * 1. Validação do header asaas-access-token
 * 2. Verificação de IP allowlist (IPs oficiais do Asaas)
 * 3. Idempotência via billing_events.asaas_event_id
 * 
 * @see https://docs.asaas.com/docs/sobre-os-webhooks
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, asaas-access-token',
}

// IPs oficiais do Asaas - https://docs.asaas.com/docs/ips-oficiais-do-asaas
const ASAAS_ALLOWED_IPS = [
  '52.67.12.206',
  '18.230.8.159',
  '54.94.136.112',
  '54.94.183.101',
]

// Eventos que ativam subscription
const PAYMENT_SUCCESS_EVENTS = [
  'PAYMENT_CONFIRMED',  // Pagamento com cartão confirmado
  'PAYMENT_RECEIVED',   // Pagamento com PIX ou Boleto recebido
]

// Configuração da API Asaas
const ASAAS_API_URL = 'https://api.asaas.com/v3'

// Mapeamento de externalReference para plan_id
const PLAN_MAPPING: Record<string, string> = {
  'lite': 'lite',
  'basic': 'basic',
  'business': 'business',
  'premium': 'premium',
}

interface AsaasWebhookPayload {
  event: string
  payment: {
    id: string
    customer: string
    subscription?: string
    value: number
    netValue: number
    billingType: string
    status: string
    dueDate: string
    paymentDate?: string
    invoiceUrl?: string
    externalReference?: string
  }
}

interface AsaasCustomer {
  id: string
  name: string
  email: string
  phone?: string
  mobilePhone?: string
  cpfCnpj?: string
  postalCode?: string
  address?: string
  addressNumber?: string
  complement?: string
  province?: string
  city?: string
  state?: string
}

interface AsaasSubscription {
  id: string
  customer: string
  value: number
  cycle: string
  status: string
  externalReference?: string
}

/**
 * Extrai o IP real do request considerando proxies
 */
function getClientIP(req: Request): string {
  // Supabase Edge Functions usam x-forwarded-for
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    // Pega o primeiro IP (original do cliente)
    return forwarded.split(',')[0].trim()
  }
  
  // Fallback para outros headers
  const realIP = req.headers.get('x-real-ip')
  if (realIP) return realIP.trim()
  
  // Se não houver headers de proxy, retorna vazio
  return ''
}

/**
 * Valida se o IP está na allowlist do Asaas
 */
function isValidAsaasIP(ip: string): boolean {
  // Em desenvolvimento, permitir localhost
  if (ip === '127.0.0.1' || ip === '::1' || ip === '') {
    console.warn('⚠️ IP validation bypassed for development:', ip)
    return true
  }
  
  return ASAAS_ALLOWED_IPS.includes(ip)
}

/**
 * Busca dados do cliente no Asaas
 */
async function fetchAsaasCustomer(customerId: string, apiKey: string): Promise<AsaasCustomer | null> {
  try {
    const response = await fetch(`${ASAAS_API_URL}/customers/${customerId}`, {
      headers: {
        'access_token': apiKey,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.error('Failed to fetch customer:', response.status, await response.text())
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching customer:', error)
    return null
  }
}

/**
 * Busca subscription do cliente para obter externalReference (plan_id)
 */
async function fetchAsaasSubscription(customerId: string, apiKey: string): Promise<AsaasSubscription | null> {
  try {
    const response = await fetch(`${ASAAS_API_URL}/subscriptions?customer=${customerId}`, {
      headers: {
        'access_token': apiKey,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.error('Failed to fetch subscriptions:', response.status, await response.text())
      return null
    }
    
    const data = await response.json()
    // Retorna a subscription mais recente ativa
    const subscriptions = data.data || []
    return subscriptions.find((s: AsaasSubscription) => s.status === 'ACTIVE') || subscriptions[0] || null
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
}

/**
 * Determina o plan_id a partir do externalReference ou valor
 */
function determinePlanId(subscription: AsaasSubscription | null, paymentValue: number): string {
  // Primeiro, tenta usar externalReference
  if (subscription?.externalReference) {
    const planKey = subscription.externalReference.toLowerCase()
    if (PLAN_MAPPING[planKey]) {
      return PLAN_MAPPING[planKey]
    }
  }
  
  // Fallback: determinar pelo valor do pagamento
  if (paymentValue <= 100) return 'lite'
  if (paymentValue <= 500) return 'basic'
  if (paymentValue <= 1000) return 'business'
  return 'premium'
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  // ===========================================================================
  // VALIDAÇÃO 1: Método HTTP
  // ===========================================================================
  if (req.method !== 'POST') {
    console.error('❌ Invalid method:', req.method)
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  // ===========================================================================
  // VALIDAÇÃO 2: IP Allowlist
  // ===========================================================================
  const clientIP = getClientIP(req)
  if (!isValidAsaasIP(clientIP)) {
    console.error('❌ Unauthorized IP:', clientIP)
    return new Response(
      JSON.stringify({ error: 'Unauthorized IP' }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  console.log('✅ IP validated:', clientIP)
  
  // ===========================================================================
  // VALIDAÇÃO 3: Access Token
  // ===========================================================================
  const webhookToken = Deno.env.get('ASAAS_WEBHOOK_TOKEN')
  const receivedToken = req.headers.get('asaas-access-token')
  
  if (!webhookToken) {
    console.error('❌ ASAAS_WEBHOOK_TOKEN not configured')
    return new Response(
      JSON.stringify({ error: 'Webhook not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  if (receivedToken !== webhookToken) {
    console.error('❌ Invalid access token')
    return new Response(
      JSON.stringify({ error: 'Invalid access token' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  console.log('✅ Access token validated')
  
  // ===========================================================================
  // PARSE PAYLOAD
  // ===========================================================================
  let payload: AsaasWebhookPayload
  try {
    payload = await req.json()
  } catch (error) {
    console.error('❌ Invalid JSON payload:', error)
    return new Response(
      JSON.stringify({ error: 'Invalid JSON payload' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  console.log('📥 Received event:', payload.event, 'Payment:', payload.payment?.id)
  
  // ===========================================================================
  // FILTRAR EVENTOS
  // ===========================================================================
  if (!PAYMENT_SUCCESS_EVENTS.includes(payload.event)) {
    console.log('ℹ️ Event ignored:', payload.event)
    return new Response(
      JSON.stringify({ message: 'Event ignored', event: payload.event }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  // ===========================================================================
  // SETUP SUPABASE ADMIN CLIENT
  // ===========================================================================
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const asaasApiKey = Deno.env.get('ASAAS_API_KEY')!
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  
  // ===========================================================================
  // IDEMPOTÊNCIA: Verificar se evento já foi processado
  // ===========================================================================
  const eventId = `${payload.event}_${payload.payment.id}`
  
  const { data: existingEvent } = await supabase
    .from('billing_events')
    .select('id')
    .eq('asaas_event_id', eventId)
    .maybeSingle()
  
  if (existingEvent) {
    console.log('ℹ️ Event already processed:', eventId)
    return new Response(
      JSON.stringify({ message: 'Event already processed', eventId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  console.log('✅ New event, processing:', eventId)
  
  // ===========================================================================
  // BUSCAR DADOS DO CLIENTE NO ASAAS
  // ===========================================================================
  const customer = await fetchAsaasCustomer(payload.payment.customer, asaasApiKey)
  
  if (!customer) {
    console.error('❌ Failed to fetch customer data')
    return new Response(
      JSON.stringify({ error: 'Failed to fetch customer data' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  console.log('✅ Customer fetched:', customer.email, customer.name)
  
  // Telefone é obrigatório para o sistema (é PK na tabela clientes)
  const phone = customer.mobilePhone || customer.phone
  if (!phone) {
    console.error('❌ Customer has no phone number')
    return new Response(
      JSON.stringify({ error: 'Customer phone is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  // Normalizar telefone (remover caracteres especiais, garantir formato)
  const normalizedPhone = phone.replace(/\D/g, '')
  console.log('📱 Phone:', normalizedPhone)
  
  // ===========================================================================
  // BUSCAR SUBSCRIPTION PARA PLAN_ID
  // ===========================================================================
  const subscription = await fetchAsaasSubscription(payload.payment.customer, asaasApiKey)
  const planId = determinePlanId(subscription, payload.payment.value)
  console.log('📋 Plan ID determined:', planId, 'from subscription:', subscription?.externalReference)
  
  // ===========================================================================
  // VERIFICAR/CRIAR USUÁRIO NO AUTH
  // ===========================================================================
  let authUserId: string | null = null
  
  // Verificar se usuário já existe no auth (por email)
  if (customer.email) {
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ Error listing users:', listError)
    } else {
      const existingUser = existingUsers.users.find(u => u.email === customer.email)
      if (existingUser) {
        authUserId = existingUser.id
        console.log('✅ Existing auth user found:', authUserId)
      }
    }
  }
  
  // Se não existe, criar novo usuário
  if (!authUserId && customer.email) {
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: customer.email,
      email_confirm: true, // Confirma email automaticamente
      user_metadata: {
        name: customer.name,
        phone: normalizedPhone,
        source: 'asaas_webhook',
      },
    })
    
    if (createError) {
      console.error('⚠️ Error creating auth user:', createError)
      // Não falhar - usuário pode usar telefone para login
    } else if (newUser.user) {
      authUserId = newUser.user.id
      console.log('✅ New auth user created:', authUserId)
      
      // Tentar enviar magic link de boas-vindas
      try {
        const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: customer.email,
          options: {
            redirectTo: 'https://app.meuagente.api.br/dashboard',
          },
        })
        
        if (linkError) {
          console.warn('⚠️ Failed to generate magic link:', linkError.message)
          // Não falhar - usuário pode logar por telefone
        } else {
          console.log('✅ Magic link generated for welcome email')
          // O email será enviado automaticamente pelo Supabase Auth
          // usando o template configurado no Dashboard
        }
      } catch (linkErr) {
        console.warn('⚠️ Exception generating magic link:', linkErr)
        // Não falhar - login por telefone funciona
      }
    }
  }
  
  // ===========================================================================
  // VERIFICAR SE CLIENTE JÁ EXISTE NA TABELA clientes
  // ===========================================================================
  const { data: existingCliente } = await supabase
    .from('clientes')
    .select('phone, auth_user_id')
    .eq('phone', normalizedPhone)
    .maybeSingle()
  
  // ===========================================================================
  // UPSERT CLIENTE
  // ===========================================================================
  const clienteData = {
    phone: normalizedPhone,
    name: customer.name,
    email: customer.email || null,
    cpf: customer.cpfCnpj || null,
    plan_id: planId,
    billing_provider: 'asaas',
    external_subscription_id: subscription?.id || payload.payment.subscription || null,
    subscription_active: true,
    // Manter auth_user_id existente se já tiver, senão usar o novo
    auth_user_id: existingCliente?.auth_user_id || authUserId,
  }
  
  const { error: upsertError } = await supabase
    .from('clientes')
    .upsert(clienteData, { onConflict: 'phone' })
  
  if (upsertError) {
    console.error('❌ Error upserting cliente:', upsertError)
    return new Response(
      JSON.stringify({ error: 'Failed to update customer', details: upsertError.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  console.log('✅ Cliente upserted:', normalizedPhone)
  
  // ===========================================================================
  // REGISTRAR EVENTO PARA IDEMPOTÊNCIA E AUDIT
  // ===========================================================================
  const { error: eventError } = await supabase
    .from('billing_events')
    .insert({
      user_phone: normalizedPhone,
      asaas_event_id: eventId,
      event_type: payload.event,
      plan_id: planId,
      raw_payload: payload, // Payload completo conforme solicitado
    })
  
  if (eventError) {
    console.error('⚠️ Error inserting billing event:', eventError)
    // Não falhar - cliente já foi atualizado
  } else {
    console.log('✅ Billing event recorded:', eventId)
  }
  
  // ===========================================================================
  // SUCESSO
  // ===========================================================================
  console.log('🎉 Webhook processed successfully!')
  
  return new Response(
    JSON.stringify({
      success: true,
      message: 'Payment processed',
      customer: normalizedPhone,
      plan: planId,
      event: payload.event,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})
