"use client"

import { motion } from "framer-motion"
import {
  FolderOpen,
  Zap,
  Gauge,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react"

const benefits = [
  { icon: FolderOpen, title: "Mais organização" },
  { icon: Zap, title: "Mais produtividade" },
  { icon: Gauge, title: "Mais controle" },
  { icon: TrendingUp, title: "Mais vendas" },
  { icon: Target, title: "Menos perda de oportunidades" },
  { icon: Clock, title: "Mais tempo" },
]

export function LandingBenefits() {
  return (
    <section className="py-14 md:py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Por que escolher o FechaLead?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Resultados reais para quem quer vender mais
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-white/20 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/20 dark:border-white/5 dark:bg-card/90"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
