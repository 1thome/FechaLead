"use client"

import { motion } from "framer-motion"
import { Users, GitBranch, TrendingUp, RefreshCw, Eye, MessageCircle } from "lucide-react"

const solutions = [
  {
    icon: Users,
    title: "Centraliza os leads",
    description: "Todos os contatos em um só lugar, organizados e fáceis de encontrar.",
  },
  {
    icon: GitBranch,
    title: "Organiza o funil",
    description: "Pipeline visual para ver em qual etapa cada lead está.",
  },
  {
    icon: TrendingUp,
    title: "Acompanha etapas",
    description: "Do primeiro contato até o fechamento, sem perder o fio da meada.",
  },
  {
    icon: RefreshCw,
    title: "Melhora o follow-up",
    description: "Lembretes e histórico para nunca mais esquecer de retornar.",
  },
  {
    icon: Eye,
    title: "Visão do processo",
    description: "Métricas e visão clara do que está funcionando no seu comercial.",
  },
  {
    icon: MessageCircle,
    title: "Integração com WhatsApp",
    description: "Conecte seu número e gerencie todas as conversas em um só lugar.",
  },
]

export function LandingSolution() {
  return (
      <section id="solucao" className="border-y border-white/10 bg-white/40 py-14 md:py-20 dark:border-white/5 dark:bg-white/5">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Como o FechaLead resolve
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tudo que você precisa para vender mais pelo WhatsApp
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => {
            const Icon = sol.icon
            return (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/20 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/20 dark:border-white/5 dark:bg-card/90"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{sol.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {sol.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
