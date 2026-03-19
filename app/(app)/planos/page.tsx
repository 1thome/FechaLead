"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { cn } from "@/lib/utils"

const plan = {
  id: "founder",
  name: "Founder",
  price: "249,90",
  period: "mês",
  description: "Tudo que você precisa para vender mais pelo WhatsApp",
  features: [
    "Conversas ilimitadas",
    "CRM completo",
    "Pipeline de vendas",
    "Automações e IA",
    "Relatórios avançados",
    "Integração WhatsApp",
  ],
  gradient: "from-primary/30 via-indigo-500/20 to-purple-500/10",
}

export default function PlanosPage() {
  const router = useRouter()
  const state = useAuthStore((s) => s.state)
  const activatePlan = useAuthStore((s) => s.activatePlan)

  const handleAssinar = () => {
    if (state === "guest") {
      router.push("/login")
      return
    }
    activatePlan()
    window.location.href = "/app"
  }

  return (
    <div className="mx-auto max-w-2xl space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/20">
          <Sparkles className="mr-1 h-3 w-3" />
          Plano único
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Plano Founder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Um único plano com tudo que você precisa. Cancele quando quiser.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border-2 border-primary/50 bg-card shadow-2xl shadow-primary/15 ring-2 ring-primary/10 transition-all duration-300 hover:shadow-primary/20 hover:border-primary"
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-60",
            plan.gradient
          )}
        />
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <div
                className={cn(
                  "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                  plan.gradient
                )}
              >
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">{plan.name}</h2>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight md:text-5xl">
                  R$ {plan.price}
                </span>
                <span className="text-lg text-muted-foreground">/{plan.period}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Badge variant="outline" className="w-fit">
                <Zap className="mr-1 h-3 w-3" />
                Cancele quando quiser
              </Badge>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {plan.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.03 }}
                className="flex items-center gap-3 rounded-lg bg-background/60 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.li>
            ))}
          </ul>

          <Button
            className="mt-10 w-full gap-2 py-6 text-base font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25"
            size="lg"
            onClick={handleAssinar}
          >
            {state === "guest"
              ? "Fazer login para assinar"
              : `Assinar ${plan.name}`}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Sem compromisso. Cancele quando quiser.
        </p>
        <p className="text-sm text-muted-foreground">
          Dúvidas?{" "}
          <Link href="/cadastro" className="font-medium text-primary hover:underline">
            Fale com nosso time
          </Link>
        </p>
      </motion.div>

      {state === "authenticated_with_plan" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Voltar ao Dashboard
          </Link>
        </motion.p>
      )}
    </div>
  )
}
