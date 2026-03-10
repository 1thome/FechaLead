import { Message } from "./message"

export interface Conversation {
  id: string
  leadId: string
  leadName: string
  leadPhone: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  messages?: Message[]
}
