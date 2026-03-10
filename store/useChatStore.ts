import { create } from "zustand"
import { Conversation } from "@/types/conversation"
import { Message } from "@/types/message"

interface ChatState {
  conversations: Conversation[]
  selectedConversationId: string | null
  messages: Record<string, Message[]>
  setConversations: (conversations: Conversation[]) => void
  setSelectedConversation: (id: string | null) => void
  setMessages: (conversationId: string, messages: Message[]) => void
  addMessage: (conversationId: string, message: Message) => void
  addConversation: (conversation: Conversation) => void
  markConversationAsRead: (conversationId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  selectedConversationId: null,
  messages: {},
  setConversations: (conversations) => set({ conversations }),
  setSelectedConversation: (id) => set({ selectedConversationId: id }),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),
  addMessage: (conversationId, message) =>
    set((state) => {
      const existing = state.messages[conversationId] || []
      return {
        messages: {
          ...state.messages,
          [conversationId]: [...existing, message],
        },
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: message.content,
                lastMessageAt: message.timestamp,
              }
            : c
        ),
      }
    }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),
  markConversationAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    })),
}))
