export type LeadStatus = "novo" | "contato" | "negociacao" | "fechado" | "perdido"

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  status: LeadStatus
  lastInteraction?: string
  createdAt: string
  company?: string
}
