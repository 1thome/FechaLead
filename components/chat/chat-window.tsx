"use client"

import { useState } from "react"
import { Message } from "@/types/message"
import { Conversation } from "@/types/conversation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChatStore } from "@/store/useChatStore"

interface ChatWindowProps {
  conversation: Conversation
  messages: Message[]
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
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold">{conversation.leadName}</h2>
        <p className="text-sm text-muted-foreground">{conversation.leadPhone}</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.direction === "out" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2",
                msg.direction === "out"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p
                className={cn(
                  "mt-1 text-xs",
                  msg.direction === "out"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-t p-4">
        <Input
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
