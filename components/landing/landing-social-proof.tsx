"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const stats = [
  { value: "500+", label: "Vendedores ativos" },
  { value: "50k+", label: "Leads gerenciados" },
  { value: "4.9", label: "Avaliação média" },
]

const testimonials = [
  {
    quote: "Antes eu perdia leads no meio do caminho. Agora tenho tudo organizado e fecho 3x mais.",
    author: "Maria S.",
    role: "Consultora de vendas",
  },
  {
    quote: "O melhor custo-benefício que encontrei. Interface simples e faz exatamente o que preciso.",
    author: "Carlos R.",
    role: "E-commerce",
  },
  {
    quote: "Implementei em 1 dia. Minha equipe adorou e as vendas subiram no primeiro mês.",
    author: "Ana L.",
    role: "Gerente comercial",
  },
]

export function LandingSocialProof() {
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
            Quem usa, recomenda
          </h2>
          <p className="mt-4 text-muted-foreground">
            Vendedores que pararam de perder oportunidades
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 flex max-w-2xl justify-center gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/20 bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/5 dark:bg-card/90"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mt-2 font-medium">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
