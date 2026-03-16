"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Rocket, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/useAuthStore"

const plans = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 97,
    priceYearly: 77,
    period: "mês",
    description: "Para começar a vender pelo WhatsApp",
    icon: Sparkles,
    features: [
      "Até 1.000 conversas/mês",
      "1 número WhatsApp",
      "CRM básico",
      "Suporte por email",
    ],
    highlighted: false,
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 197,
    priceYearly: 157,
    period: "mês",
    description: "Para equipes em crescimento",
    icon: Zap,
    features: [
      "Até 5.000 conversas/mês",
      "3 números WhatsApp",
      "CRM completo",
      "Automações",
      "IA para respostas",
      "Suporte prioritário",
    ],
    highlighted: true,
    gradient: "from-primary/30 to-indigo-500/20",
  },
  {
    id: "scale",
    name: "Scale",
    priceMonthly: 397,
    priceYearly: 317,
    period: "mês",
    description: "Para operações em escala",
    icon: Rocket,
    features: [
      "Conversas ilimitadas",
      "Números ilimitados",
      "API completa",
      "Relatórios avançados",
      "IA avançada",
      "Gerente de conta",
    ],
    highlighted: false,
    gradient: "from-indigo-500/20 to-purple-500/10",
  },
]

export default function PlanosPage() {
  const [yearly, setYearly] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const router = useRouter()
  const state = useAuthStore((s) => s.state)
  const activatePlan = useAuthStore((s) => s.activatePlan)

  const handleAssinar = (planId: string) => {
    if (state === "guest") {
      router.push("/login")
      return
    }
    if (planId === "scale") {
      router.push("/cadastro")
      return
    }
    activatePlan()
    window.location.href = "/app"
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Escolha seu plano
        </h1>
        <p className="mt-2 text-muted-foreground">
          Escale seu negócio com o plano ideal. Cancele quando quiser.
        </p>
      </div>

      {/* Toggle mensal/anual */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <span
          className={cn(
            "text-sm font-medium",
            !yearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Mensal
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          onClick={() => setYearly(!yearly)}
          className={cn(
            "relative h-7 w-14 rounded-full transition-colors",
            yearly ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "absolute top-1 h-5 w-5 rounded-full bg-background shadow transition-transform",
              yearly ? "left-8" : "left-1"
            )}
          />
        </button>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              yearly ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Anual
          </span>
          <Badge variant="secondary" className="text-xs">
            Economize 20%
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon
          const price = yearly ? plan.priceYearly : plan.priceMonthly
          const isHovered = hoveredPlan === plan.name

          return (
            <Card
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={cn(
                "group relative flex flex-col overflow-hidden transition-all duration-300",
                plan.highlighted && "border-primary shadow-lg shadow-primary/10",
                isHovered && "shadow-xl -translate-y-1"
              )}
            >
              {plan.highlighted && (
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-50",
                    plan.gradient
                  )}
                />
              )}
              <CardHeader className="relative">
                {plan.highlighted && (
                  <Badge className="absolute right-4 top-4">Mais popular</Badge>
                )}
                <div
                  className={cn(
                    "mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                    plan.gradient
                  )}
                >
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">R$ {price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {yearly && (
                  <p className="text-xs text-muted-foreground">
                    Cobrado anualmente
                  </p>
                )}
              </CardHeader>
              <CardContent className="relative flex-1 space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => handleAssinar(plan.id)}
                >
                  {plan.id === "scale"
                    ? "Falar com vendas"
                    : state === "guest"
                      ? "Fazer login para assinar"
                      : `Assinar ${plan.name}`}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Todos os planos incluem 14 dias de teste grátis. Sem compromisso.
        </p>
        <p className="text-sm text-muted-foreground">
          Dúvidas?{" "}
          <Link href="/cadastro" className="text-primary hover:underline">
            Fale com nosso time
          </Link>
        </p>
      </div>

      {state === "authenticated_with_plan" && (
        <p className="text-center text-sm">
          <Link href="/app" className="text-primary hover:underline">
            Voltar ao Dashboard
          </Link>
        </p>
      )}
    </div>
  )
}
