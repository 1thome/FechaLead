"use client"

import Link from "next/link"
import { LandingLogo } from "@/components/landing/landing-logo"

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-white/30 py-12 dark:border-white/5 dark:bg-white/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <LandingLogo href="/" />
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:gap-6">
            <Link href="/login" className="hover:text-foreground">
              Login
            </Link>
            <Link href="/cadastro" className="hover:text-foreground">
              Cadastro
            </Link>
            <Link href="/planos" className="hover:text-foreground">
              Planos
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FechaLead. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
