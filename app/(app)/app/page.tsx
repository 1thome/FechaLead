"use client"

import { useState, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getDashboardMetrics, getLeads } from "@/lib/api"
import { AppThreePanel } from "@/components/layout/app-three-panel"
import { useLeadStore } from "@/store/useLeadStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, TrendingUp, Mail, ChevronRight, MessageCircle, UserPlus, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/dashboard-charts").then((m) => m.DashboardCharts),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-muted" /> }
)

const STATUS_LABELS: Record<string, string> = {
  novo: "Novo",
  contato: "Contato",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
}

const STATUS_OPTIONS = [
  { id: "all", label: "Todos" },
  { id: "novo", label: "Novo" },
  { id: "contato", label: "Contato" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
] as const

const RECENT_ACTIVITIES = [
  { id: "1", type: "message", text: "Nova mensagem de João Silva", time: "2 min atrás", icon: MessageCircle },
  { id: "2", type: "status", text: "Maria Santos movida para Negociação", time: "1 hora atrás", icon: ArrowRight },
  { id: "3", type: "lead", text: "Novo lead: Carlos Souza", time: "5 min atrás", icon: UserPlus },
  { id: "4", type: "message", text: "Pedro Oliveira respondeu a proposta", time: "Ontem", icon: MessageCircle },
  { id: "5", type: "status", text: "Ana Costa fechou negócio", time: "3 dias atrás", icon: ArrowRight },
]

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  const { data: leadsData } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  })

  const { leads, setLeads } = useLeadStore()

  useEffect(() => {
    if (leadsData) {
      setLeads(leadsData)
    }
  }, [leadsData, setLeads])

  const displayLeads = leads.length ? leads : leadsData || []
  const filteredLeads =
    statusFilter === "all"
      ? displayLeads
      : displayLeads.filter((l) => l.status === statusFilter)

  const chartData = useMemo(
    () =>
      metrics?.leadsPerDay.map((value, i) => ({
        name: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i],
        leads: value,
      })) ?? [],
    [metrics?.leadsPerDay]
  )

  const center = (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral do seu CRM</p>
      </div>

      {/* Filtros */}
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
                  : "border bg-background hover:bg-muted/50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de métricas */}
      {metricsLoading || !metrics ? (
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/app/leads">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads novos</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.newLeads}</div>
                <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/app/atendimentos">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversas ativas</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.activeConversations}</div>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </CardContent>
            </Card>
          </Link>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens do dia</CardTitle>
              <Mail className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.messagesToday}</div>
              <p className="text-xs text-muted-foreground">Hoje</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gráficos */}
      {!metricsLoading && metrics && (
        <div className="p-4">
          <DashboardCharts chartData={chartData} />
        </div>
      )}

      {/* Cards de leads */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Leads recentes</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLeads.map((lead) => (
            <Link
              key={lead.id}
              href={`/app/atendimentos?lead=${lead.id}`}
              className={cn(
                "rounded-lg border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {lead.lastInteraction || "—"}
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
            </Link>
          ))}
        </div>
        {filteredLeads.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum lead encontrado
          </p>
        )}
      </div>
    </div>
  )

  const right = (
    <div className="flex flex-1 flex-col overflow-hidden p-6">
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Atividades recentes</h3>
      <div className="space-y-3">
        {RECENT_ACTIVITIES.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
      <Link
        href="/app/atendimentos"
        className="mt-4 block w-full rounded-lg border py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
      >
        Ver todas as conversas
      </Link>
    </div>
  )

  return <AppThreePanel center={center} right={right} />
}
