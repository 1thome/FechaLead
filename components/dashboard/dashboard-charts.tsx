"use client"

import { useMemo } from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardChartsProps {
  chartData: { name: string; leads: number }[]
}

export function DashboardCharts({ chartData }: DashboardChartsProps) {
  const areaChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            cursor={{ fill: "hsl(var(--primary))", opacity: 0.1 }}
          />
          <Area
            type="monotone"
            dataKey="leads"
            stroke="hsl(var(--primary))"
            fill="url(#colorLeads)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    ),
    [chartData]
  )

  const barChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            cursor={{ fill: "hsl(var(--primary))", opacity: 0.1 }}
          />
          <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
    [chartData]
  )

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Leads por dia</CardTitle>
          <p className="text-sm text-muted-foreground">Distribuição dos últimos 7 dias</p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">{areaChart}</div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Comparativo semanal</CardTitle>
          <p className="text-sm text-muted-foreground">Barras interativas</p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">{barChart}</div>
        </CardContent>
      </Card>
    </div>
  )
}
