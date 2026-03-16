"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Rocket, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

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

export function LandingPlans() {
  const [yearly, setYearly] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <section id="planos" className="border-y border-white/10 bg-white/40 py-14 md:py-20 dark:border-white/5 dark:bg-white/5">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Escolha seu plano
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escale seu negócio com o plano ideal. Cancele quando quiser.
          </p>
        </motion.div>

        {/* Toggle mensal/anual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = yearly ? plan.priceYearly : plan.priceMonthly
            const isHovered = hoveredPlan === plan.name

            return (
              <motion.div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border-2 border-white/20 bg-card/90 shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-white/5 dark:bg-card/95",
                  plan.highlighted && "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20",
                  isHovered && "shadow-2xl -translate-y-1"
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
                <div className="relative border-b p-6">
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
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold">R$ {price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {yearly && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cobrado anualmente
                    </p>
                  )}
                </div>
                <div className="relative flex flex-1 flex-col p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full gap-2"
                    size="lg"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    <Link href="/cadastro">
                      {plan.id === "scale" ? "Falar com vendas" : "Assinar"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 space-y-2 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Todos os planos incluem 14 dias de teste grátis. Sem compromisso.
          </p>
          <p className="text-sm text-muted-foreground">
            Dúvidas?{" "}
            <Link href="/cadastro" className="text-primary hover:underline">
              Fale com nosso time
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
