"use client"

import { useQuery } from "@tanstack/react-query"
import { getLeads } from "@/lib/api"
import { useLeadStore } from "@/store/useLeadStore"
import { useEffect, useMemo } from "react"
import { Lead, LeadStatus } from "@/types/lead"
import { LeadKanbanBoard } from "./lead-kanban-board"
import { LeadFilteredView } from "./lead-filtered-view"

const COLUMNS: { id: LeadStatus; title: string }[] = [
  { id: "novo", title: "Novo Lead" },
  { id: "contato", title: "Contato" },
  { id: "negociacao", title: "Negociação" },
  { id: "fechado", title: "Fechado" },
  { id: "perdido", title: "Perdido" },
]

export function LeadKanban({
  search = "",
  statusFilter = "all",
}: {
  search?: string
  statusFilter?: string
}) {
  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  })
  const { leads: storeLeads, setLeads, updateLeadStatus } = useLeadStore()

  useEffect(() => {
    if (leads) {
      setLeads(leads)
    }
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

  const leadsByStatus = useMemo(
    () =>
      COLUMNS.reduce(
        (acc, col) => {
          acc[col.id] = filteredLeads.filter((l) => l.status === col.id)
          return acc
        },
        {} as Record<LeadStatus, Lead[]>
      ),
    [filteredLeads]
  )

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const validStatuses: LeadStatus[] = ["novo", "contato", "negociacao", "fechado", "perdido"]
  if (statusFilter !== "all" && validStatuses.includes(statusFilter as LeadStatus)) {
    return (
      <LeadFilteredView
        status={statusFilter as LeadStatus}
        leads={leadsByStatus[statusFilter as LeadStatus] || []}
        onStatusChange={updateLeadStatus}
      />
    )
  }

  return (
    <LeadKanbanBoard
      columns={COLUMNS}
      leadsByStatus={leadsByStatus}
      onStatusChange={updateLeadStatus}
    />
  )
}
