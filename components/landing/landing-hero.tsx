"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Play, ArrowRight, Check } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Organize seus leads e{" "}
            <span className="text-primary">
              venda mais pelo WhatsApp
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 text-lg text-muted-foreground md:text-xl"
          >
            O CRM feito para quem vende pelo WhatsApp. Organize leads, acompanhe
            o funil e feche mais vendas — a partir de R$ 97/mês.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25"
              asChild
            >
              <Link href="/cadastro">
                Começar agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/5"
              asChild
            >
              <Link href="#produto">
                <Play className="h-4 w-4" />
                Ver demonstração
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="flex cursor-default items-center gap-2 rounded-full bg-primary/5 px-4 py-2"
            >
              <Check className="h-4 w-4 text-primary" />
              14 dias grátis
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="flex cursor-default items-center gap-2 rounded-full bg-primary/5 px-4 py-2"
            >
              <Check className="h-4 w-4 text-primary" />
              Cancele quando quiser
            </motion.span>
            <Link href="#planos">
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Check className="h-4 w-4" />
                Planos a partir de R$ 97/mês
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
