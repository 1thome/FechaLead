"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export function LandingCta() {
  return (
    <section className="relative overflow-hidden border-t border-indigo-500/20">
      {/* Gradiente principal - paleta refinada azul → índigo → violeta */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-violet-600 dark:from-indigo-800 dark:via-violet-800 dark:to-indigo-950" />
      {/* Luz superior suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/5" />
      {/* Orbe cyan - canto superior esquerdo */}
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-400/15" />
      {/* Orbe violeta - canto inferior direito */}
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10" />
      {/* Overlay sutil para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 via-transparent to-transparent dark:from-black/20" />

      <div className="container relative px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-50 shadow-lg shadow-amber-900/20 backdrop-blur-sm dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-100"
          >
            <Sparkles className="h-4 w-4 text-amber-200" />
            Comece em 2 minutos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl"
          >
            Pronto para vender mais?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 text-lg text-slate-100 md:text-xl"
          >
            Crie sua conta grátis e comece em minutos. A partir de R$ 97/mês.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-2 text-sm text-slate-200/90"
          >
            14 dias de teste grátis · Cancele quando quiser
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 border-0 bg-white px-8 font-semibold text-blue-700 shadow-xl shadow-blue-900/30 transition-all hover:scale-[1.02] hover:bg-slate-50 hover:shadow-2xl hover:shadow-blue-900/25 active:scale-[0.98] dark:text-blue-800"
              asChild
            >
              <Link href="/cadastro">
                Criar conta agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-2 border-white/50 bg-white/10 px-8 font-medium text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-white/70 hover:bg-white/20 hover:text-white active:scale-[0.98] dark:border-white/40 dark:bg-white/5 dark:hover:bg-white/15"
              asChild
            >
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
