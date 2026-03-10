"use client"

import { useQuery } from "@tanstack/react-query"
import { getConversations, getMessages } from "@/lib/api"
import { useChatStore } from "@/store/useChatStore"
import { useEffect } from "react"
import { ConversationList } from "@/components/chat/conversation-list"
import { ChatWindow } from "@/components/chat/chat-window"
import { AddContactDialog } from "@/components/chat/add-contact-dialog"

export default function ConversasPage() {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  })

  const {
    conversations: storeConversations,
    setConversations,
    selectedConversationId,
    setSelectedConversation,
    messages,
    setMessages,
    markConversationAsRead,
  } = useChatStore()

  useEffect(() => {
    if (conversations) {
      setConversations(conversations)
      if (!selectedConversationId && conversations.length > 0) {
        setSelectedConversation(conversations[0].id)
      }
    }
  }, [conversations, setConversations, setSelectedConversation])

  const selectedConversation = (storeConversations.length ? storeConversations : conversations || []).find(
    (c) => c.id === selectedConversationId
  )

  const { data: messagesData } = useQuery({
    queryKey: ["messages", selectedConversationId],
    queryFn: () => getMessages(selectedConversationId!),
    enabled: !!selectedConversationId,
  })

  useEffect(() => {
    if (selectedConversationId && messagesData) {
      setMessages(selectedConversationId, messagesData)
    }
  }, [selectedConversationId, messagesData, setMessages])

  const displayMessages = selectedConversationId
    ? (messages[selectedConversationId] || messagesData || [])
    : []

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 overflow-hidden rounded-lg border">
      <div className="flex w-80 shrink-0 flex-col border-r bg-card">
        <div className="space-y-3 border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Conversas</h2>
            <p className="text-sm text-muted-foreground">
              {(storeConversations.length ? storeConversations : conversations || []).length}
            </p>
          </div>
          <AddContactDialog />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={storeConversations.length ? storeConversations : conversations || []}
            selectedId={selectedConversationId}
            onSelect={setSelectedConversation}
            onMarkAsRead={markConversationAsRead}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-background">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            messages={displayMessages}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <p>Selecione uma conversa para começar</p>
          </div>
        )}
      </div>
    </div>
  )
}
