/**
 * Mock de assinatura - substituir por billing real futuramente
 */

export interface MockPlan {
  id: string
  name: string
  price: number
  priceYearly?: number
  interval: "monthly" | "yearly"
  features: string[]
  highlight?: boolean
  limit?: string
}

export const MOCK_PLAN_STORAGE_KEY = "fechalead-plan-mock"

/** Todos os planos disponíveis */
export const allPlans: MockPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 27,
    priceYearly: 270,
    interval: "monthly",
    limit: "Até 100 leads",
    features: [
      "Até 100 leads ativos",
      "Pipeline de vendas",
      "Gestão básica de leads",
      "Histórico de conversas",
      "Integração WhatsApp",
      "Suporte por email",
    ],
  },
  {
    id: "founder",
    name: "Founder",
    price: 47,
    priceYearly: 470,
    interval: "monthly",
    highlight: true,
    limit: "Até 500 leads",
    features: [
      "Até 500 leads ativos",
      "Tudo do Starter",
      "Dashboard com métricas",
      "Automações básicas",
      "Relatórios de conversão",
      "Suporte prioritário",
      "Valor especial para primeiros clientes",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 97,
    priceYearly: 970,
    interval: "monthly",
    limit: "Até 2.000 leads",
    features: [
      "Até 2.000 leads ativos",
      "Tudo do Founder",
      "Múltiplos usuários (até 5)",
      "Automações avançadas",
      "API de integração",
      "Relatórios personalizados",
      "Suporte dedicado",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 197,
    priceYearly: 1970,
    interval: "monthly",
    limit: "Ilimitado",
    features: [
      "Leads ilimitados",
      "Usuários ilimitados",
      "Tudo do Pro",
      "Integração personalizada",
      "Gerente de conta dedicado",
      "SLA garantido 99,9%",
      "Onboarding personalizado",
    ],
  },
]

/** Plano padrão/recomendado (compatibilidade) */
export const founderPlan: MockPlan = allPlans.find((p) => p.id === "founder")!
