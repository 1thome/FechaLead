"use client"

import { motion } from "framer-motion"
import { UserPlus, CreditCard, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Crie sua conta",
    description: "Cadastro rápido em menos de 2 minutos.",
  },
  {
    icon: CreditCard,
    title: "Escolha seu plano",
    description: "Do Starter ao Scale — comece com R$ 97/mês.",
  },
  {
    icon: BarChart3,
    title: "Organize e acompanhe",
    description: "Importe seus leads e comece a vender mais.",
  },
]

export function LandingHowItWorks() {
  return (
      <section className="border-y border-white/10 bg-white/40 py-14 md:py-20 dark:border-white/5 dark:bg-white/5">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Em 3 passos simples você pode começar
          </p>
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-12 md:flex-row md:justify-between">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="mt-4 text-sm font-medium text-primary">
                  Passo {i + 1}
                </span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-[200px] text-sm text-muted-foreground">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="mt-4 hidden text-muted-foreground md:block">
                    →
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
