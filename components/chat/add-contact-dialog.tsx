"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { useChatStore } from "@/store/useChatStore"
import { Conversation } from "@/types/conversation"

export function AddContactDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const addConversation = useChatStore((state) => state.addConversation)
  const setSelectedConversation = useChatStore((state) => state.setSelectedConversation)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      leadId: `lead-${Date.now()}`,
      leadName: name.trim(),
      leadPhone: phone.trim(),
      lastMessage: "Nenhuma mensagem ainda",
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
    }

    addConversation(newConversation)
    setSelectedConversation(newConversation.id)
    setName("")
    setPhone("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full gap-2">
          <UserPlus className="h-4 w-4" />
          Novo contato
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo contato</DialogTitle>
          <DialogDescription>
            Adicione um novo contato para iniciar uma conversa pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome do contato"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                placeholder="+55 11 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim() || !phone.trim()}>
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
