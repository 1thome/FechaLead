"use client"

import { useMemo, useState } from "react"
import { Conversation } from "@/types/conversation"
import { cn } from "@/lib/utils"
import { MessageSquare, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
  onMarkAsRead?: (id: string) => void
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onMarkAsRead,
}: ConversationListProps) {
  const [search, setSearch] = useState("")

  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations
    const q = search.toLowerCase().trim()
    return conversations.filter(
      (c) =>
        c.leadName.toLowerCase().includes(q) ||
        c.leadPhone.replace(/\D/g, "").includes(q.replace(/\D/g, ""))
    )
  }, [conversations, search])

  const handleSelect = (id: string) => {
    onSelect(id)
    onMarkAsRead?.(id)
  }
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    if (diff < 86400000) return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    if (diff < 172800000) return "Ontem"
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
  }

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 border-b bg-card p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8"
          />
        </div>
      </div>
      {filteredConversations.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          {search.trim() ? "Nenhuma conversa encontrada" : "Nenhuma conversa"}
        </div>
      ) : (
        filteredConversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => handleSelect(conv.id)}
          className={cn(
            "flex flex-col gap-1 border-b p-4 text-left transition-colors hover:bg-muted/50",
            selectedId === conv.id && "bg-muted"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
                {conv.unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{conv.leadName}</p>
                <p className="truncate text-xs text-muted-foreground">{conv.leadPhone}</p>
              </div>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {formatTime(conv.lastMessageAt)}
            </span>
          </div>
          <p className="truncate pl-[52px] text-sm text-muted-foreground">
            {conv.lastMessage}
          </p>
        </button>
        ))
      )}
    </div>
  )
}
