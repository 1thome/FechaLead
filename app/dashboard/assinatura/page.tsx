"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Rocket, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
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

export default function AssinaturaPage() {
  const [yearly, setYearly] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Escolha seu plano</h1>
        <p className="mt-2 text-muted-foreground">
          Escale seu negócio com o plano ideal. Cancele quando quiser.
        </p>

        {/* Toggle mensal/anual */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={cn("text-sm font-medium", !yearly && "text-foreground")}>
            Mensal
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={cn(
              "relative h-7 w-14 rounded-full transition-colors",
              yearly ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300",
                yearly ? "left-8" : "left-1"
              )}
            />
          </button>
          <span className={cn("text-sm font-medium", yearly && "text-foreground")}>
            Anual
          </span>
          <Badge variant="secondary" className="ml-2">
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
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={cn(
                "group relative flex flex-col overflow-hidden transition-all duration-300",
                plan.highlighted && "border-primary shadow-lg shadow-primary/10",
                isHovered && "shadow-xl -translate-y-1"
              )}
            >
              {plan.highlighted && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-indigo-500" />
              )}
              <CardHeader>
                <div
                  className={cn(
                    "mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    plan.gradient,
                    "bg-gradient-to-br"
                  )}
                >
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                {plan.highlighted && (
                  <Badge className="mb-2 w-fit bg-primary/20 text-primary hover:bg-primary/30">
                    Mais popular
                  </Badge>
                )}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">R$ {price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {yearly && (
                  <p className="text-xs text-muted-foreground">
                    Cobrado anualmente
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 transition-colors"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn(
                    "w-full transition-all duration-300 group-hover:gap-3",
                    plan.highlighted ? "" : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Assinar {plan.name}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="rounded-lg border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Todos os planos incluem 14 dias de teste grátis. Sem compromisso.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Dúvidas?{" "}
          <a href="#" className="text-primary hover:underline">
            Fale com nosso time
          </a>
        </p>
      </div>
    </div>
  )
}
