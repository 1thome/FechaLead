"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getLeads } from "@/lib/api"
import { useLeadStore } from "@/store/useLeadStore"
import { useEffect, useMemo } from "react"
import { Lead, LeadStatus } from "@/types/lead"
import { Phone, Mail, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  contato: "Contato",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
}

interface LeadListViewProps {
  search?: string
  statusFilter?: string
}

export function LeadListView({ search = "", statusFilter = "all" }: LeadListViewProps) {
  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  })
  const { leads: storeLeads, setLeads, updateLeadStatus } = useLeadStore()

  useEffect(() => {
    if (leads) setLeads(leads)
  }, [leads, setLeads])

  const allLeads = storeLeads.length ? storeLeads : leads || []

  const filteredLeads = useMemo(() => {
    return allLeads.filter((lead) => {
      const matchSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        (lead.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
      const matchStatus =
        statusFilter === "all" || lead.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [allLeads, search, statusFilter])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Nome</th>
              <th className="px-4 py-3 text-left font-medium">Contato</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Última interação</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {lead.phone}
                    </span>
                    {lead.email && (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        {lead.email}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      lead.status === "novo" && "bg-muted",
                      lead.status === "contato" && "bg-primary/10 text-primary",
                      lead.status === "negociacao" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                      lead.status === "fechado" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                      lead.status === "perdido" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    )}
                  >
                    {STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {lead.lastInteraction || "—"}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/app/leads?lead=${lead.id}`}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Ver detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredLeads.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          Nenhum lead encontrado
        </div>
      )}
    </div>
  )
}
