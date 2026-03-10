"use client"

import { memo } from "react"
import Link from "next/link"
import { useDraggable } from "@dnd-kit/core"
import { Lead } from "@/types/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Phone, Mail, MessageSquare, MoreVertical, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

const statusLabels: Record<Lead["status"], string> = {
  novo: "Novo",
  contato: "Contato",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
}

const statusVariants: Record<Lead["status"], "default" | "secondary" | "success" | "destructive" | "warning"> = {
  novo: "secondary",
  contato: "default",
  negociacao: "warning",
  fechado: "success",
  perdido: "destructive",
}

interface LeadCardProps {
  lead: Lead
  isDragging?: boolean
}

export const LeadCard = memo(function LeadCard({ lead, isDragging }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging: dndDragging } = useDraggable({
    id: lead.id,
  })

  const dragging = isDragging ?? dndDragging

  // Com DragOverlay, NÃO aplicar transform no original - o overlay segue o cursor.
  // O original fica invisível para evitar duplicação visual.
  const style = dragging ? undefined : transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "group overflow-hidden transition-all duration-200",
        dragging ? "invisible" : "hover:shadow-md"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
            <div
              {...attributes}
              {...listeners}
              className="flex cursor-grab touch-none items-center gap-2 active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground opacity-60 group-hover:opacity-100" />
              <p className="font-medium">{lead.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant={statusVariants[lead.status]} className="shrink-0 text-xs">
                {statusLabels[lead.status]}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/conversas">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ver conversa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Abrir WhatsApp
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-2 space-y-1 pl-6">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{lead.phone}</span>
            </div>
            {lead.email && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{lead.email}</span>
              </div>
            )}
            {lead.lastInteraction && (
              <p className="text-xs text-muted-foreground">
                Última interação: {lead.lastInteraction}
              </p>
            )}
          </div>
      </CardContent>
    </Card>
  )
})
