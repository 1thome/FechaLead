"use client"

import { memo } from "react"
import Link from "next/link"
import { Lead } from "@/types/lead"
import { LeadStatus } from "@/types/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Phone, Mail, MessageSquare, MoreVertical, ArrowRightCircle } from "lucide-react"

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

const STATUS_OPTIONS: { id: LeadStatus; label: string }[] = [
  { id: "novo", label: "Novo" },
  { id: "contato", label: "Contato" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
]

interface LeadCardStaticProps {
  lead: Lead
  onStatusChange?: (leadId: string, status: LeadStatus) => void
  excludeStatus?: LeadStatus
}

export const LeadCardStatic = memo(function LeadCardStatic({
  lead,
  onStatusChange,
  excludeStatus,
}: LeadCardStaticProps) {
  const moveOptions = STATUS_OPTIONS.filter((s) => s.id !== excludeStatus)

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium">{lead.name}</p>
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
                {onStatusChange && moveOptions.length > 0 && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <ArrowRightCircle className="mr-2 h-4 w-4" />
                      Mover para
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {moveOptions.map((opt) => (
                        <DropdownMenuItem
                          key={opt.id}
                          onClick={() => onStatusChange(lead.id, opt.id)}
                        >
                          {opt.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/app/atendimentos">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ver conversa
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Abrir WhatsApp
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-2 space-y-1">
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
