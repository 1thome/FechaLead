"use client"

import Link from "next/link"
import { Cloud, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LandingLogoProps {
  href?: string
  className?: string
  showText?: boolean
}

export function LandingLogo({
  href = "/",
  className,
  showText = true,
}: LandingLogoProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-2.5 font-semibold transition-opacity hover:opacity-90",
        className
      )}
    >
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/15">
        <Cloud className="h-5 w-5 text-primary" strokeWidth={2} />
        <MessageCircle
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-primary"
          strokeWidth={2}
        />
      </div>
      {showText && (
        <span className="whitespace-nowrap text-lg font-semibold tracking-tight">
          <span className="text-primary">Fecha</span>
          <span className="text-foreground">Lead</span>
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg">
        {content}
      </Link>
    )
  }

  return content
}
