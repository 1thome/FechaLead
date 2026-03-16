"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LandingLogo } from "@/components/landing/landing-logo"
import { motion } from "framer-motion"
import { scrollToSection } from "@/lib/utils"

export function LandingHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl dark:border-white/5 dark:bg-background/80"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <LandingLogo href="/" />

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#problemas"
            onClick={(e) => { e.preventDefault(); scrollToSection("problemas") }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Problemas
          </a>
          <a
            href="#solucao"
            onClick={(e) => { e.preventDefault(); scrollToSection("solucao") }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Solução
          </a>
          <a
            href="#produto"
            onClick={(e) => { e.preventDefault(); scrollToSection("produto") }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Produto
          </a>
          <a
            href="#planos"
            onClick={(e) => { e.preventDefault(); scrollToSection("planos") }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Planos
          </a>
          <a
            href="#faq"
            onClick={(e) => { e.preventDefault(); scrollToSection("faq") }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" className="transition-colors" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25"
            asChild
          >
            <Link href="/cadastro">Começar agora</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
