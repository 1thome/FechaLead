"use client"

import { motion } from "framer-motion"
import type { Lead } from "@/types/lead"

const COLUMNS = [
  { id: "novo", title: "Novo", color: "bg-slate-500/20" },
  { id: "contato", title: "Contato", color: "bg-blue-500/20" },
  { id: "negociacao", title: "Negociação", color: "bg-amber-500/20" },
  { id: "fechado", title: "Fechado", color: "bg-emerald-500/20" },
  { id: "perdido", title: "Perdido", color: "bg-red-500/20" },
] as const

const DEMO_LEADS: Lead[] = [
  { id: "1", name: "João Silva", phone: "+55 11 99999-1111", email: "joao@email.com", status: "novo", lastInteraction: "2 min atrás", createdAt: "2024-01-15T10:00:00Z" },
  { id: "2", name: "Maria Santos", phone: "+55 11 99999-2222", email: "maria@email.com", status: "contato", lastInteraction: "1h atrás", createdAt: "2024-01-14T09:00:00Z" },
  { id: "3", name: "Pedro Oliveira", phone: "+55 11 99999-3333", status: "negociacao", lastInteraction: "Ontem", createdAt: "2024-01-13T14:00:00Z" },
  { id: "4", name: "Ana Costa", phone: "+55 11 99999-4444", email: "ana@empresa.com", status: "fechado", lastInteraction: "3 dias", createdAt: "2024-01-10T11:00:00Z" },
  { id: "5", name: "Carlos Souza", phone: "+55 11 99999-5555", status: "novo", lastInteraction: "5 min", createdAt: "2024-01-15T11:30:00Z" },
  { id: "6", name: "Fernanda Dias", phone: "+55 11 99999-6666", status: "contato", lastInteraction: "2h atrás", createdAt: "2024-01-14T15:00:00Z" },
]

function KanbanCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-lg border border-border/50 bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <p className="font-medium text-sm">{lead.name}</p>
      <p className="mt-0.5 truncate text-xs text-muted-foreground">{lead.phone}</p>
      <p className="mt-1 text-xs text-muted-foreground">{lead.lastInteraction}</p>
    </div>
  )
}

export function LandingKanban() {
  const leadsByStatus = COLUMNS.reduce(
    (acc, col) => {
      acc[col.id] = DEMO_LEADS.filter((l) => l.status === col.id)
      return acc
    },
    {} as Record<string, Lead[]>
  )

  return (
    <section id="kanban" className="py-14 md:py-20">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Pipeline visual
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Organize seus leads em colunas e acompanhe cada etapa da venda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 sm:mt-12"
        >
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
            <div className="flex min-w-max gap-4 sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {COLUMNS.map((col) => (
                <div
                  key={col.id}
                  className="flex w-64 shrink-0 flex-col rounded-xl border border-white/20 bg-card/80 shadow-lg backdrop-blur-sm dark:border-white/5 sm:w-auto"
                >
                  <div className={`flex items-center justify-between rounded-t-xl px-4 py-3 ${col.color}`}>
                    <h3 className="font-semibold text-sm">{col.title}</h3>
                    <span className="rounded-full bg-background/60 px-2 py-0.5 text-xs font-medium">
                      {leadsByStatus[col.id]?.length ?? 0}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3 min-h-[120px] sm:min-h-[160px]">
                    {(leadsByStatus[col.id] ?? []).map((lead) => (
                      <KanbanCard key={lead.id} lead={lead} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
