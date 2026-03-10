"use client"

import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getDashboardMetrics } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, TrendingUp, Mail, ArrowRight } from "lucide-react"
import { memo, useMemo } from "react"
import { cn } from "@/lib/utils"

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/dashboard-charts").then((m) => m.DashboardCharts),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-muted" /> }
)

const StatCard = memo(function StatCard({
  title,
  value,
  suffix,
  decimals,
  icon: Icon,
  description,
  href,
  color,
}: {
  title: string
  value: number
  suffix: string
  decimals: number
  icon: React.ComponentType<{ className?: string }>
  description: string
  href: string
  color: string
}) {
  const formatted = decimals > 0 ? value.toFixed(decimals) : String(value)
  return (
    <Link href={href}>
      <Card className="group cursor-pointer transition-shadow duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={cn("rounded-lg p-2", color)}>
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">
              {formatted}
              {suffix}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
})

export default function DashboardPage() {
  const { data: metrics, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-destructive">Erro ao carregar o dashboard.</p>
        <p className="text-sm text-muted-foreground">{String(error)}</p>
      </div>
    )
  }

  if (isLoading || !metrics) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Carregando métricas...</p>
        </div>
      </div>
    )
  }

  const chartData = useMemo(
    () =>
      metrics.leadsPerDay.map((value, i) => ({
        name: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i],
        leads: value,
      })),
    [metrics.leadsPerDay]
  )

  const statCards = useMemo(
    () => [
    {
      title: "Leads novos",
      value: metrics.newLeads,
      suffix: "",
      icon: Users,
      description: "Últimos 7 dias",
      href: "/dashboard/leads",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      title: "Conversas ativas",
      value: metrics.activeConversations,
      suffix: "",
      icon: MessageSquare,
      description: "Em andamento",
      href: "/dashboard/conversas",
      color: "from-indigo-500/20 to-indigo-600/10",
    },
    {
      title: "Taxa de conversão",
      value: metrics.conversionRate,
      suffix: "%",
      icon: TrendingUp,
      description: "Este mês",
      href: "/dashboard/leads",
      color: "from-cyan-500/20 to-cyan-600/10",
    },
    {
      title: "Mensagens do dia",
      value: metrics.messagesToday,
      suffix: "",
      icon: Mail,
      description: "Hoje",
      href: "/dashboard/conversas",
      color: "from-sky-500/20 to-sky-600/10",
    },
  ],
    [metrics]
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu CRM
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            suffix={stat.suffix}
            decimals={stat.suffix === "%" ? 1 : 0}
            icon={stat.icon}
            description={stat.description}
            href={stat.href}
            color={stat.color}
          />
        ))}
      </div>

      <DashboardCharts chartData={chartData} />
    </div>
  )
}
