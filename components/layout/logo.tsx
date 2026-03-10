"use client"

import Link from "next/link"
import { MessageCircle, Cloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  collapsed?: boolean
  className?: string
}

export function Logo({ collapsed, className }: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex items-center gap-2 font-semibold text-primary transition-opacity hover:opacity-80",
        collapsed && "justify-center",
        className
      )}
    >
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 transition-all">
        <Cloud className="h-4 w-4 text-primary" />
        <MessageCircle className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 text-primary" />
      </div>
      {!collapsed && (
        <span className="whitespace-nowrap">
          <span className="text-primary">Lead</span>
          <span className="text-foreground">Flow</span>
        </span>
      )}
    </Link>
  )
}
