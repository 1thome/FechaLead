"use client"

import { useState } from "react"
import { LeadListView } from "@/components/crm/lead-list-view"
import { Input } from "@/components/ui/input"
import { AddLeadDialog } from "@/components/crm/add-lead-dialog"
import { Search } from "lucide-react"
import { useLeadStore } from "@/store/useLeadStore"
import { cn } from "@/lib/utils"

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "novo", label: "Novo" },
  { value: "contato", label: "Contato" },
  { value: "negociacao", label: "Negociação" },
  { value: "fechado", label: "Fechado" },
  { value: "perdido", label: "Perdido" },
]

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | "all">("all")
  const leads = useLeadStore((state) => state.leads)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, telefone ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatusFilter(opt.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  statusFilter === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <AddLeadDialog />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} · Lista de contatos
        </p>
      </div>
      <LeadListView search={search} statusFilter={statusFilter} />
    </div>
  )
}
