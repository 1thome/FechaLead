import { User } from "@/types/user"
import { Lead } from "@/types/lead"
import { Conversation } from "@/types/conversation"
import { Message } from "@/types/message"
import { Automation } from "@/types/automation"

// Simulação de delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Dados mockados
const mockUser: User = {
  id: "1",
  name: "Gabriel",
  email: "gabriel@empresa.com",
  avatar: undefined,
  company: "Minha Empresa",
}

const mockLeads: Lead[] = [
  { id: "1", name: "João Silva", phone: "+55 11 99999-1111", status: "novo", lastInteraction: "2 min atrás", createdAt: "2024-01-15T10:00:00Z" },
  { id: "2", name: "Maria Santos", phone: "+55 11 99999-2222", status: "contato", lastInteraction: "1 hora atrás", createdAt: "2024-01-14T09:00:00Z" },
  { id: "3", name: "Pedro Oliveira", phone: "+55 11 99999-3333", status: "negociacao", lastInteraction: "Ontem", createdAt: "2024-01-13T14:00:00Z" },
  { id: "4", name: "Ana Costa", phone: "+55 11 99999-4444", status: "fechado", lastInteraction: "3 dias atrás", createdAt: "2024-01-10T11:00:00Z" },
  { id: "5", name: "Carlos Lima", phone: "+55 11 99999-5555", status: "perdido", lastInteraction: "1 semana atrás", createdAt: "2024-01-05T16:00:00Z" },
  { id: "6", name: "Fernanda Souza", phone: "+55 11 99999-6666", status: "novo", lastInteraction: "5 min atrás", createdAt: "2024-01-15T11:30:00Z" },
]

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", conversationId: "1", content: "Olá! Gostaria de saber mais sobre o produto.", direction: "in", timestamp: "2024-01-15T10:00:00Z" },
    { id: "m2", conversationId: "1", content: "Claro! Posso te ajudar. Qual sua dúvida?", direction: "out", timestamp: "2024-01-15T10:02:00Z" },
    { id: "m3", conversationId: "1", content: "Qual o preço?", direction: "in", timestamp: "2024-01-15T10:05:00Z" },
  ],
  "2": [
    { id: "m4", conversationId: "2", content: "Bom dia! Já recebeu minha proposta?", direction: "out", timestamp: "2024-01-14T09:00:00Z" },
    { id: "m5", conversationId: "2", content: "Sim, estou analisando. Volto em breve.", direction: "in", timestamp: "2024-01-14T11:30:00Z" },
  ],
}

const mockConversations: Conversation[] = [
  { id: "1", leadId: "1", leadName: "João Silva", leadPhone: "+55 11 99999-1111", lastMessage: "Qual o preço?", lastMessageAt: "2024-01-15T10:05:00Z", unreadCount: 1 },
  { id: "2", leadId: "2", leadName: "Maria Santos", leadPhone: "+55 11 99999-2222", lastMessage: "Sim, estou analisando. Volto em breve.", lastMessageAt: "2024-01-14T11:30:00Z", unreadCount: 0 },
  { id: "3", leadId: "3", leadName: "Pedro Oliveira", leadPhone: "+55 11 99999-3333", lastMessage: "Perfeito, fechamos!", lastMessageAt: "2024-01-13T16:00:00Z", unreadCount: 0 },
]

let mockAutomations: Automation[] = [
  { id: "1", name: "Preço → Negociação", trigger: "Mensagem contém 'preço'", action: "Mover para coluna Negociação", isActive: true, createdAt: "2024-01-10T10:00:00Z" },
  { id: "2", name: "Novo Lead → Boas-vindas", trigger: "Lead entra na coluna Novo", action: "Enviar mensagem automática", isActive: true, createdAt: "2024-01-08T14:00:00Z" },
]

// Funções de API simuladas
export async function getUser(): Promise<User> {
  await delay(300)
  return mockUser
}

export async function getLeads(): Promise<Lead[]> {
  await delay(400)
  return [...mockLeads]
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  await delay(300)
  return mockMessages[conversationId] || []
}

export async function getConversations(): Promise<Conversation[]> {
  await delay(400)
  return [...mockConversations]
}

export async function getAutomations(): Promise<Automation[]> {
  await delay(300)
  return [...mockAutomations]
}

export async function createAutomation(data: Omit<Automation, "id" | "createdAt">): Promise<Automation> {
  await delay(200)
  const newAuto: Automation = {
    ...data,
    id: `auto-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  mockAutomations.push(newAuto)
  return newAuto
}

export async function updateAutomation(id: string, data: Partial<Automation>): Promise<Automation> {
  await delay(200)
  const idx = mockAutomations.findIndex((a) => a.id === id)
  if (idx === -1) throw new Error("Automação não encontrada")
  mockAutomations[idx] = { ...mockAutomations[idx], ...data }
  return mockAutomations[idx]
}

export async function deleteAutomation(id: string): Promise<void> {
  await delay(200)
  mockAutomations = mockAutomations.filter((a) => a.id !== id)
}

// Métricas para dashboard
export async function getDashboardMetrics() {
  await delay(400)
  return {
    newLeads: 12,
    activeConversations: 8,
    conversionRate: 23.5,
    messagesToday: 156,
    leadsPerDay: [5, 8, 12, 7, 15, 10, 14],
  }
}
