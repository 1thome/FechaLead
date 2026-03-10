export type MessageDirection = "in" | "out"

export interface Message {
  id: string
  conversationId: string
  content: string
  direction: MessageDirection
  timestamp: string
  status?: "sent" | "delivered" | "read"
}
