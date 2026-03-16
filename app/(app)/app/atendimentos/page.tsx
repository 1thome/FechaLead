"use client"

import { Suspense, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { getConversations, getMessages } from "@/lib/api"
import { useChatStore } from "@/store/useChatStore"
import { AppThreePanel } from "@/components/layout/app-three-panel"
import { ChatWindow } from "@/components/chat/chat-window"
import { AddContactDialog } from "@/components/chat/add-contact-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_LABELS: Record<string, string> = {
  novo: "Novo",
  contato: "Contato",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
}

const STATUS_OPTIONS = [
  { id: "all", label: "Todos" },
  { id: "novo", label: "Novo" },
  { id: "contato", label: "Contato" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
] as const

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  if (diff < 86400000)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  if (diff < 172800000) return "Ontem"
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
}

function AtendimentosContent() {
  const searchParams = useSearchParams()
  const leadFromUrl = searchParams.get("lead")

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
      if (leadFromUrl) {
        const conv = conversations.find((c) => c.leadId === leadFromUrl)
        if (conv) setSelectedConversation(conv.id)
      } else if (!selectedConversationId && conversations.length > 0) {
        setSelectedConversation(conversations[0].id)
      }
    }
  }, [conversations, setConversations, setSelectedConversation, leadFromUrl])

  const [statusFilter, setStatusFilter] = useState<string>("all")

  const allConversations =
    storeConversations.length ? storeConversations : conversations || []
  const filteredConversations =
    statusFilter === "all"
      ? allConversations
      : allConversations.filter((c) => c.leadStatus === statusFilter)

  const selectedConversation = allConversations.find(
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

  const center = (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b bg-background px-4 py-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight">Atendimentos</h1>
          <p className="text-sm text-muted-foreground">
            {allConversations.length} conversa{allConversations.length !== 1 ? "s" : ""}
          </p>
        </div>
        <AddContactDialog />
      </div>

      <div className="shrink-0 border-b bg-muted/30 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setStatusFilter(opt.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                statusFilter === opt.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => {
                  setSelectedConversation(conv.id)
                  markConversationAsRead(conv.id)
                }}
                className={cn(
                  "flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:bg-muted/50",
                  selectedConversationId === conv.id
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                    : "border-transparent bg-card hover:border-border"
                )}
              >
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                    {getInitials(conv.leadName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold">{conv.leadName}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {conv.leadPhone}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {conv.lastMessage}
                  </p>
                  {conv.leadStatus && (
                    <span
                      className={cn(
                        "mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusFilter === conv.leadStatus
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {STATUS_LABELS[conv.leadStatus] || conv.leadStatus}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {conv.unreadCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                      {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        )}
        {!isLoading && filteredConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">
              Nenhuma conversa encontrada
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Adicione um novo contato para começar
            </p>
          </div>
        )}
      </div>
    </div>
  )

  const right = (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {selectedConversation ? (
        <ChatWindow
          conversation={selectedConversation}
          messages={displayMessages}
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <div>
            <p className="font-medium text-muted-foreground">
              Selecione uma conversa
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha um contato na lista para ver as mensagens
            </p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <AppThreePanel
      center={center}
      right={right}
      rightClassName="p-0"
      resizable
    />
  )
}

export default function AtendimentosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <AtendimentosContent />
    </Suspense>
  )
}
