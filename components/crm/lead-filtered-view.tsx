"use client"

import { Lead } from "@/types/lead"
import { LeadStatus } from "@/types/lead"
import { LeadCardStatic } from "./lead-card-static"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Inbox } from "lucide-react"

const COLUMN_LABELS: Record<LeadStatus, string> = {
  novo: "Novo Lead",
  contato: "Contato",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
}

interface LeadFilteredViewProps {
  status: LeadStatus
  leads: Lead[]
  onStatusChange: (leadId: string, status: LeadStatus) => void
}

export function LeadFilteredView({
  status,
  leads,
  onStatusChange,
}: LeadFilteredViewProps) {
  const title = COLUMN_LABELS[status]

  return (
    <div className="flex min-h-[400px] flex-col rounded-xl border bg-card shadow-sm">
      <CardHeader className="border-b px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} nesta etapa
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium">Nenhum lead aqui</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Os leads com status &quot;{title}&quot; aparecerão nesta lista
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {leads.map((lead) => (
              <LeadCardStatic
                key={lead.id}
                lead={lead}
                onStatusChange={onStatusChange}
                excludeStatus={status}
              />
            ))}
          </div>
        )}
      </CardContent>
    </div>
  )
}
