"use client"

import { useState } from "react"
import { Message } from "@/types/message"
import { Conversation } from "@/types/conversation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChatStore } from "@/store/useChatStore"

interface ChatWindowProps {
  conversation: Conversation
  messages: Message[]
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function ChatWindow({ conversation, messages }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("")
  const addMessage = useChatStore((state) => state.addMessage)

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      conversationId: conversation.id,
      content: inputValue.trim(),
      direction: "out",
      timestamp: new Date().toISOString(),
      status: "sent",
    }
    addMessage(conversation.id, newMessage)
    setInputValue("")
  }

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header com avatar */}
      <div className="flex shrink-0 items-center gap-4 border-b bg-card/50 px-4 py-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
            {getInitials(conversation.leadName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold">{conversation.leadName}</h2>
          <p className="truncate text-xs text-muted-foreground">
            {conversation.leadPhone}
          </p>
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto bg-muted/20 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma mensagem ainda
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Envie a primeira mensagem para iniciar a conversa
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.direction === "out" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm",
                  msg.direction === "out"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-card"
                )}
              >
                <p className="whitespace-pre-wrap break-words text-sm">
                  {msg.content}
                </p>
                <span
                  className={cn(
                    "mt-1 block text-[10px]",
                    msg.direction === "out"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input de mensagem */}
      <div className="shrink-0 border-t bg-background p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="min-w-0 flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
