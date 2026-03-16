"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  ChevronRight,
  Phone,
  Mail,
  TrendingUp,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lead } from "@/types/lead"

const STATUS_LABELS: Record<string, string> = {
  novo: "Novo",
  contato: "Contato",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
}

const DEMO_LEADS: Lead[] = [
  { id: "1", name: "João Silva", phone: "+55 11 99999-1111", email: "joao@email.com", status: "novo", lastInteraction: "2 min atrás", createdAt: "2024-01-15T10:00:00Z" },
  { id: "2", name: "Maria Santos", phone: "+55 11 99999-2222", email: "maria@email.com", status: "contato", lastInteraction: "1 hora atrás", createdAt: "2024-01-14T09:00:00Z" },
  { id: "3", name: "Pedro Oliveira", phone: "+55 11 99999-3333", status: "negociacao", lastInteraction: "Ontem", createdAt: "2024-01-13T14:00:00Z" },
  { id: "4", name: "Ana Costa", phone: "+55 11 99999-4444", email: "ana@empresa.com", status: "fechado", lastInteraction: "3 dias atrás", createdAt: "2024-01-10T11:00:00Z" },
  { id: "5", name: "Carlos Souza", phone: "+55 11 99999-5555", status: "novo", lastInteraction: "5 min atrás", createdAt: "2024-01-15T11:30:00Z" },
  { id: "6", name: "Fernanda Dias", phone: "+55 11 99999-6666", status: "contato", lastInteraction: "2h atrás", createdAt: "2024-01-14T15:00:00Z" },
]

const STATUS_OPTIONS = [
  { id: "all", label: "Todos" },
  { id: "novo", label: "Novo" },
  { id: "contato", label: "Contato" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
] as const

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Leads" },
] as const

type NavItem = (typeof SIDEBAR_ITEMS)[number]["label"]

export function LandingProductDemo() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(DEMO_LEADS[0])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [activeNav, setActiveNav] = useState<NavItem>("Leads")

  const filteredLeads =
    statusFilter === "all"
      ? DEMO_LEADS
      : DEMO_LEADS.filter((l) => l.status === statusFilter)

  return (
    <section id="produto" className="py-14 md:py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Veja o FechaLead por dentro
          </h2>
          <p className="mt-4 text-muted-foreground">
            Interface limpa e objetiva para você trabalhar com foco.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-6xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-card/90 shadow-2xl backdrop-blur-sm dark:border-white/5 dark:bg-card/95">
            {/* Barra do navegador */}
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 flex-1 rounded-lg bg-background px-3 py-1.5 text-center text-xs text-muted-foreground">
                app.fechalead.com
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Sidebar esquerda */}
              <div className="flex w-full flex-row border-b bg-muted/30 lg:w-56 lg:flex-col lg:border-b-0 lg:border-r">
                {SIDEBAR_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = activeNav === item.label
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveNav(item.label)}
                      className={cn(
                        "flex flex-1 items-center gap-2 rounded-lg p-4 transition-colors lg:px-4 lg:py-3",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Área central - conteúdo dinâmico */}
              <div className="flex min-w-0 flex-1 flex-col bg-background">
                <AnimatePresence mode="wait">
                  {activeNav === "Dashboard" && (
                    <motion.div
                      key="dashboard"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-1 flex-col p-4"
                    >
                      <div className="mb-4">
                        <h3 className="font-semibold">Visão geral</h3>
                        <p className="text-sm text-muted-foreground">Métricas do seu CRM</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          { label: "Leads novos", value: "4", icon: Users },
                          { label: "Leads ativos", value: "6", icon: Users },
                          { label: "Taxa conversão", value: "16,7%", icon: TrendingUp },
                          { label: "Leads fechados", value: "1", icon: Target },
                        ].map((stat) => {
                          const Icon = stat.icon
                          return (
                            <div
                              key={stat.label}
                              className="rounded-xl border bg-card p-4 shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">{stat.label}</span>
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-6">
                        <h4 className="mb-2 text-sm font-medium">Leads recentes</h4>
                        <div className="space-y-2">
                          {DEMO_LEADS.slice(0, 3).map((lead) => (
                            <button
                              key={lead.id}
                              type="button"
                              onClick={() => {
                                setSelectedLead(lead)
                                setActiveNav("Leads")
                              }}
                              className="flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted/50"
                            >
                              <span className="font-medium">{lead.name}</span>
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                {STATUS_LABELS[lead.status]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeNav === "Leads" && (
                    <motion.div
                      key="leads"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-1 flex-col"
                    >
                      <div className="border-b p-4">
                        <div className="flex flex-wrap gap-2">
                          {STATUS_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setStatusFilter(opt.id)}
                              className={cn(
                                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                statusFilter === opt.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 overflow-auto p-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {filteredLeads.map((lead) => (
                            <button
                              key={lead.id}
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className={cn(
                                "rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md",
                                selectedLead?.id === lead.id &&
                                  "ring-2 ring-primary border-primary/30"
                              )}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{lead.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {lead.lastInteraction}
                                  </p>
                                </div>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  {STATUS_LABELS[lead.status] || lead.status}
                                </span>
                              </div>
                              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                <span>{lead.phone}</span>
                                <ChevronRight className="h-3 w-3" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Painel direito - detalhes (Leads e Dashboard) */}
              <div className="hidden w-80 shrink-0 border-l bg-muted/20 p-6 lg:block">
                {activeNav === "Leads" && (
                  <>
                    {selectedLead ? (
                      <div className="space-y-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-semibold text-primary">
                          {selectedLead.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedLead.name}</h3>
                          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {STATUS_LABELS[selectedLead.status] || selectedLead.status}
                          </span>
                        </div>
                        <div className="space-y-3 border-t pt-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{selectedLead.phone}</span>
                          </div>
                          {selectedLead.email && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4 shrink-0" />
                              <span>{selectedLead.email}</span>
                            </div>
                          )}
                          <div className="text-muted-foreground">
                            Última interação: {selectedLead.lastInteraction}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-sm text-muted-foreground">
                          Selecione um lead para ver os detalhes
                        </p>
                      </div>
                    )}
                  </>
                )}
                {activeNav === "Dashboard" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Ação rápida</h3>
                    <p className="text-sm text-muted-foreground">
                      Clique em um lead recente para ver os detalhes ou ir para Leads.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveNav("Leads")}
                      className="w-full rounded-lg border bg-card py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Ver todos os leads
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
