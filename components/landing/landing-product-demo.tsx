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
  Search,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { cn } from "@/lib/utils"
import type { Lead } from "@/types/lead"

const CHART_DATA = [
  { name: "Seg", leads: 1 },
  { name: "Ter", leads: 0 },
  { name: "Qua", leads: 1 },
  { name: "Qui", leads: 1 },
  { name: "Sex", leads: 0 },
  { name: "Sáb", leads: 2 },
  { name: "Dom", leads: 1 },
]

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
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
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
          className="mx-auto mt-10 max-w-6xl sm:mt-16"
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
                      className="flex flex-1 flex-col overflow-auto p-4"
                    >
                      <div className="mb-4">
                        <h3 className="font-semibold">Visão geral</h3>
                        <p className="text-sm text-muted-foreground">Métricas do seu CRM</p>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
                              className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{stat.label}</span>
                                <Icon className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <p className="mt-1 text-lg font-bold">{stat.value}</p>
                            </div>
                          )
                        })}
                      </div>
                      {/* Gráficos */}
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/20">
                          <div className="border-b border-border/50 px-3 py-2">
                            <p className="text-xs font-medium text-muted-foreground">Leads por dia</p>
                          </div>
                          <div className="h-32 px-2 py-1">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={CHART_DATA}>
                                <defs>
                                  <linearGradient id="demoArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="2 2" className="stroke-muted/50" />
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} width={18} />
                                <Tooltip
                                  contentStyle={{
                                    fontSize: 12,
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "6px",
                                  }}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="leads"
                                  stroke="hsl(var(--primary))"
                                  fill="url(#demoArea)"
                                  strokeWidth={1.5}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/20">
                          <div className="border-b border-border/50 px-3 py-2">
                            <p className="text-xs font-medium text-muted-foreground">Comparativo semanal</p>
                          </div>
                          <div className="h-32 px-2 py-1">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={CHART_DATA}>
                                <CartesianGrid strokeDasharray="2 2" className="stroke-muted/50" />
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} width={18} />
                                <Tooltip
                                  contentStyle={{
                                    fontSize: 12,
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "6px",
                                  }}
                                />
                                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="mb-2 text-xs font-medium text-muted-foreground">Leads recentes</h4>
                        <div className="space-y-1">
                          {DEMO_LEADS.slice(0, 3).map((lead) => (
                            <button
                              key={lead.id}
                              type="button"
                              onClick={() => {
                                setSelectedLead(lead)
                                setActiveNav("Leads")
                              }}
                              className="flex w-full items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2 text-left transition-colors hover:bg-muted/40"
                            >
                              <span className="text-sm font-medium">{lead.name}</span>
                              <span className="rounded bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
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
                      className="flex flex-1 flex-col min-h-0"
                    >
                      <div className="space-y-3 border-b border-border/50 p-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Buscar contatos..."
                            className="w-full rounded-lg border border-border/50 bg-muted/30 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                            readOnly
                          />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {STATUS_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setStatusFilter(opt.id)}
                              className={cn(
                                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                                statusFilter === opt.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <div className="divide-y divide-border/50">
                          {filteredLeads.map((lead) => (
                            <button
                              key={lead.id}
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className={cn(
                                "flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/30",
                                selectedLead?.id === lead.id && "bg-primary/5"
                              )}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                                {lead.name.charAt(0)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium text-sm">{lead.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{lead.phone}</p>
                              </div>
                              <div className="shrink-0 text-right">
                                <span className="block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  {STATUS_LABELS[lead.status] || lead.status}
                                </span>
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {lead.lastInteraction}
                                </span>
                              </div>
                              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Painel direito - detalhes do contato */}
              <div className="hidden w-72 shrink-0 border-l border-border/50 bg-muted/10 lg:block">
                {activeNav === "Leads" && (
                  <>
                    {selectedLead ? (
                      <div className="flex flex-col p-5">
                        <div className="flex flex-col items-center border-b border-border/50 pb-5">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-xl font-semibold text-primary">
                            {selectedLead.name.charAt(0)}
                          </div>
                          <h3 className="mt-3 font-semibold">{selectedLead.name}</h3>
                          <span className="mt-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            {STATUS_LABELS[selectedLead.status] || selectedLead.status}
                          </span>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                            <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="text-sm">{selectedLead.phone}</span>
                          </div>
                          {selectedLead.email && (
                            <div className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <span className="truncate text-sm">{selectedLead.email}</span>
                            </div>
                          )}
                          <div className="rounded-lg bg-muted/30 px-3 py-2">
                            <p className="text-xs text-muted-foreground">Última interação</p>
                            <p className="text-sm font-medium">{selectedLead.lastInteraction}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                        <Users className="h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-3 text-sm text-muted-foreground">
                          Selecione um contato para ver os detalhes
                        </p>
                      </div>
                    )}
                  </>
                )}
                {activeNav === "Dashboard" && (
                  <div className="flex flex-col p-5">
                    <h3 className="font-semibold">Ação rápida</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clique em um lead recente para ver os detalhes ou ir para Leads.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveNav("Leads")}
                      className="mt-4 w-full rounded-lg border border-border/50 bg-muted/30 py-2.5 text-sm font-medium transition-colors hover:bg-muted/50"
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
