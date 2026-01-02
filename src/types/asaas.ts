/**
 * Tipos para integração com a API do Asaas
 * @see https://docs.asaas.com/
 */

// ============================================
// Enums
// ============================================

export type AsaasBillingType = 'UNDEFINED' | 'BOLETO' | 'CREDIT_CARD' | 'PIX';

export type AsaasChargeType = 'DETACHED' | 'RECURRENT' | 'INSTALLMENT';

export type AsaasCycle = 
  | 'WEEKLY' 
  | 'BIWEEKLY' 
  | 'MONTHLY' 
  | 'BIMONTHLY' 
  | 'QUARTERLY' 
  | 'SEMIANNUALLY' 
  | 'YEARLY';

export type AsaasSubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'INACTIVE';

export type AsaasPersonType = 'JURIDICA' | 'FISICA';

// ============================================
// Customer (Cliente)
// ============================================

export interface AsaasCustomerCreateRequest {
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
  externalReference?: string;
  notificationDisabled?: boolean;
  additionalEmails?: string;
  observations?: string;
  groupName?: string;
  foreignCustomer?: boolean;
}

export interface AsaasCustomerResponse {
  object: 'customer';
  id: string;
  dateCreated: string;
  name: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  city?: number;
  cityName?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  cpfCnpj: string;
  personType: AsaasPersonType;
  deleted: boolean;
  additionalEmails?: string;
  externalReference?: string;
  notificationDisabled: boolean;
  observations?: string;
  foreignCustomer: boolean;
}

// ============================================
// Subscription (Assinatura)
// ============================================

export interface AsaasSubscriptionCallback {
  successUrl: string;
  autoRedirect?: boolean;
}

export interface AsaasSubscriptionDiscount {
  value: number;
  dueDateLimitDays?: number;
  type?: 'FIXED' | 'PERCENTAGE';
}

export interface AsaasSubscriptionCreateRequest {
  customer: string;
  billingType: AsaasBillingType;
  value: number;
  nextDueDate: string;
  cycle: AsaasCycle;
  description?: string;
  endDate?: string;
  maxPayments?: number;
  externalReference?: string;
  discount?: AsaasSubscriptionDiscount;
  callback?: AsaasSubscriptionCallback;
}

export interface AsaasSubscriptionResponse {
  object: 'subscription';
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink?: string;
  billingType: AsaasBillingType;
  cycle: AsaasCycle;
  value: number;
  nextDueDate: string;
  endDate?: string;
  description?: string;
  status: AsaasSubscriptionStatus;
  deleted: boolean;
  maxPayments?: number;
  externalReference?: string;
  checkoutSession?: string;
}

// ============================================
// Payment Link (Link de Pagamento)
// ============================================

export interface AsaasPaymentLinkCallback {
  successUrl: string;
  autoRedirect?: boolean;
}

export interface AsaasPaymentLinkCreateRequest {
  name: string;
  description?: string;
  endDate?: string;
  value?: number;
  billingType: AsaasBillingType;
  chargeType: AsaasChargeType;
  dueDateLimitDays?: number;
  subscriptionCycle?: AsaasCycle;
  maxInstallmentCount?: number;
  externalReference?: string;
  notificationEnabled?: boolean;
  callback?: AsaasPaymentLinkCallback;
  isAddressRequired?: boolean;
}

export interface AsaasPaymentLinkResponse {
  id: string;
  name: string;
  value?: number;
  active: boolean;
  chargeType: AsaasChargeType;
  url: string;
  billingType: AsaasBillingType;
  subscriptionCycle?: AsaasCycle;
  description?: string;
  endDate?: string;
  deleted: boolean;
  viewCount: number;
  maxInstallmentCount?: number;
  dueDateLimitDays?: number;
  notificationEnabled: boolean;
  isAddressRequired: boolean;
  externalReference?: string;
}

// ============================================
// API Error Response
// ============================================

export interface AsaasErrorItem {
  code: string;
  description: string;
}

export interface AsaasErrorResponse {
  errors: AsaasErrorItem[];
}

// ============================================
// Configuração de Planos (Mapeamento interno)
// ============================================

export interface AsaasPlanConfig {
  id: string;
  name: string;
  value: number;
  annualValue: number;
  description: string;
  cycle: AsaasCycle;
  externalReference: string;
}

export const ASAAS_PLANS: Record<string, AsaasPlanConfig> = {
  lite: {
    id: 'lite',
    name: 'Plano Lite - Meu Agente',
    value: 97.90,
    annualValue: 1076.90,
    description: 'Automação essencial via WhatsApp para finanças e agenda',
    cycle: 'MONTHLY',
    externalReference: 'meuagente_lite',
  },
  basic: {
    id: 'basic',
    name: 'Plano Básico - Meu Agente',
    value: 497.00,
    annualValue: 5467.00,
    description: 'Automação completa via WhatsApp com exportações',
    cycle: 'MONTHLY',
    externalReference: 'meuagente_basic',
  },
  business: {
    id: 'business',
    name: 'Plano Business - Meu Agente',
    value: 997.00,
    annualValue: 10967.00,
    description: 'Equipe completa de IA com número dedicado e implantação',
    cycle: 'MONTHLY',
    externalReference: 'meuagente_business',
  },
  premium: {
    id: 'premium',
    name: 'Plano Premium - Meu Agente',
    value: 1497.00,
    annualValue: 16467.00,
    description: 'Todos os recursos + agentes avançados e backups',
    cycle: 'MONTHLY',
    externalReference: 'meuagente_premium',
  },
};
