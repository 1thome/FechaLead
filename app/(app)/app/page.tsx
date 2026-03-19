"use client"

import { useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getDashboardMetrics, getLeads } from "@/lib/api"
import { AppThreePanel } from "@/components/layout/app-three-panel"
import { useLeadStore } from "@/store/useLeadStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Target } from "lucide-react"

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/dashboard-charts").then((m) => m.DashboardCharts),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-muted" /> }
)

export default function DashboardPage() {

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
          <Link href="/app/leads">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads ativos</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{displayLeads.length}</div>
                <p className="text-xs text-muted-foreground">Total de leads</p>
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
          <Link href="/app/leads">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads fechados</CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.closedLeads ?? 0}</div>
                <p className="text-xs text-muted-foreground">Total de vendas</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      {/* Gráficos */}
      {!metricsLoading && metrics && (
        <div className="p-4">
          <DashboardCharts chartData={chartData} />
        </div>
      )}
    </div>
  )

  return <AppThreePanel center={center} />
}
