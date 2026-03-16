"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, ArrowRight } from "lucide-react"

const plan = {
  id: "founder",
  name: "Founder",
  price: "249,90",
  period: "mês",
  description: "Tudo que você precisa para vender mais pelo WhatsApp",
  features: [
    "Conversas ilimitadas",
    "Números WhatsApp ilimitados",
    "CRM completo",
    "Pipeline de vendas",
    "Automações e IA",
    "Relatórios avançados",
    "Integração WhatsApp",
    "Suporte prioritário",
  ],
  gradient: "from-primary/30 to-indigo-500/20",
}

export function LandingPlans() {
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
            Plano Founder
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Um único plano com tudo que você precisa. Cancele quando quiser.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-lg"
        >
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-primary bg-card/90 shadow-xl shadow-primary/10 ring-2 ring-primary/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-white/5 dark:bg-card/95">
            <div
              className={`absolute inset-0 bg-gradient-to-br opacity-50 ${plan.gradient}`}
            />
            <div className="relative border-b p-6">
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.gradient}`}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">R$ {plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
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
              <Button asChild className="mt-8 w-full gap-2" size="lg">
                <Link href="/cadastro">
                  Assinar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 space-y-2 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Sem compromisso. Cancele quando quiser.
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
