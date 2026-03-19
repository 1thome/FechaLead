"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LandingLogo } from "@/components/landing/landing-logo"
import { motion } from "framer-motion"
import { scrollToSection } from "@/lib/utils"
import { Menu } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const NAV_LINKS = [
  { href: "#problemas", label: "Problemas", id: "problemas" },
  { href: "#solucao", label: "Solução", id: "solucao" },
  { href: "#produto", label: "Produto", id: "produto" },
  { href: "#kanban", label: "Pipeline", id: "kanban" },
  { href: "#planos", label: "Planos", id: "planos" },
  { href: "#faq", label: "FAQ", id: "faq" },
]

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl dark:border-white/5 dark:bg-background/80"
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <LandingLogo href="/" />

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id) }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden transition-colors sm:inline-flex" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button
            size="sm"
            className="hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 sm:inline-flex"
            asChild
          >
            <Link href="/cadastro">Começar agora</Link>
          </Button>
          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md" showClose={true}>
              <DialogHeader>
                <DialogTitle>Menu</DialogTitle>
              </DialogHeader>
              <nav className="flex flex-col gap-1 pt-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="rounded-lg px-4 py-3 text-left font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-4 flex gap-2 border-t pt-4">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/cadastro" onClick={() => setMobileOpen(false)}>Começar</Link>
                  </Button>
                </div>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.header>
  )
}
