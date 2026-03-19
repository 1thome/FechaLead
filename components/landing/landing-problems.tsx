"use client"

import { motion } from "framer-motion"
import {
  MessageSquareOff,
  Inbox,
  Clock,
  BarChart3,
  BookOpen,
  Smartphone,
} from "lucide-react"

const problems = [
  {
    icon: MessageSquareOff,
    title: "Leads perdidos",
    description: "Conversas que somem no meio do caminho e oportunidades que escapam.",
  },
  {
    icon: Inbox,
    title: "Conversas desorganizadas",
    description: "Várias conversas misturadas, difícil saber quem é quem e o status de cada uma.",
  },
  {
    icon: Clock,
    title: "Follow-up esquecido",
    description: "Prometeu retornar e esqueceu. O lead esfria e a venda se perde.",
  },
  {
    icon: BarChart3,
    title: "Falta de controle comercial",
    description: "Sem visão clara do funil, métricas ou onde estão os gargalos.",
  },
  {
    icon: BookOpen,
    title: "Dependência de memória",
    description: "Caderno, planilha ou cabeça. Nada que escale ou profissionalize.",
  },
  {
    icon: Smartphone,
    title: "Tudo misturado no celular",
    description: "WhatsApp pessoal e trabalho no mesmo lugar. Impossível separar e escalar.",
  },
]

export function LandingProblems() {
  return (
    <section id="problemas" className="py-14 md:py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Você se identifica com isso?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dores reais de quem vende pelo WhatsApp sem um CRM
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/20 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/20 dark:border-white/5 dark:bg-card/90"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{problem.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
