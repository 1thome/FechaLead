"use client"

import { memo } from "react"
import { Lead } from "@/types/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, GripVertical } from "lucide-react"

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

interface LeadCardPreviewProps {
  lead: Lead
}

/** Componente apenas visual para o DragOverlay - NÃO usa useDraggable */
export const LeadCardPreview = memo(function LeadCardPreview({ lead }: LeadCardPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex cursor-grabbing items-center gap-2">
            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="font-medium">{lead.name}</p>
          </div>
          <Badge variant={statusVariants[lead.status]} className="shrink-0 text-xs">
            {statusLabels[lead.status]}
          </Badge>
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
