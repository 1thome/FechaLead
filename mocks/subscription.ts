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

/** Plano disponível */
export const allPlans: MockPlan[] = [
  {
    id: "founder",
    name: "Founder",
    price: 249.9,
    interval: "monthly",
    limit: "Ilimitado",
    highlight: true,
    features: [
      "Conversas ilimitadas",
      "Números WhatsApp ilimitados",
      "CRM completo",
      "Pipeline de vendas",
      "Automações e IA",
      "Relatórios avançados",
      "Integração WhatsApp",
      "Suporte prioritário",
    ],
  },
]

/** Plano padrão (compatibilidade) */
export const founderPlan: MockPlan = allPlans[0]
