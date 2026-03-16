"use client"

import { cn } from "@/lib/utils"

interface CloudBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function CloudBackground({ className, children }: CloudBackgroundProps) {
  return (
    <div className={cn("relative min-h-full overflow-hidden", className)}>
      {/* Gradiente - claro ou escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-indigo-950/50 dark:to-slate-900" />
      
      {/* Estrelas no modo noturno */}
      <div className="absolute inset-0 overflow-hidden dark:block hidden pointer-events-none">
        <div className="stars" />
      </div>
      
      {/* Nuvens animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
        <div className="cloud cloud-6" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}
