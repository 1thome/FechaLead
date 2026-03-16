"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "Preciso instalar algo?",
    a: "Não. O FechaLead funciona 100% no navegador. Você só precisa de uma conta e internet.",
  },
  {
    q: "Funciona para vendas no WhatsApp?",
    a: "Sim! O FechaLead foi pensado especificamente para quem vende pelo WhatsApp e quer organizar leads e conversas.",
  },
  {
    q: "Qual plano devo escolher?",
    a: "Se está começando, o Starter (R$ 97/mês) é ideal. Para mais recursos e métricas, o Pro (R$ 197/mês) é o mais popular. Equipes maiores podem usar o Scale (R$ 397/mês).",
  },
  {
    q: "Quando terei acesso?",
    a: "Imediatamente após criar sua conta e ativar o plano. O acesso é liberado na hora.",
  },
  {
    q: "Posso cancelar depois?",
    a: "Sim. Você pode cancelar a qualquer momento. Sem multas ou burocracia.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Oferecemos 7 dias de teste. Se não gostar, devolvemos seu dinheiro integralmente. Sem perguntas.",
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Sim. Você pode fazer upgrade ou downgrade a qualquer momento. A diferença é cobrada proporcionalmente.",
  },
]

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-14 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tire suas dúvidas sobre o FechaLead
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-xl border border-white/20 bg-card/80 shadow-sm backdrop-blur-sm dark:border-white/5 dark:bg-card/90"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium transition-colors hover:bg-muted/50"
              >
                {faq.q}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.25 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t px-4 py-3 text-muted-foreground">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
