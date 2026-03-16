import { Message } from "./message"
import type { LeadStatus } from "./lead"

export interface Conversation {
  id: string
  leadId: string
  leadName: string
  leadPhone: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  leadStatus?: LeadStatus
  messages?: Message[]
}
