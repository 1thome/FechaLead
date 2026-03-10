"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Zap,
  Settings,
  CreditCard,
  Menu,
} from "lucide-react"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/conversas", label: "Conversas", icon: MessageSquare },
  { href: "/dashboard/automacoes", label: "Automações", icon: Zap },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
  { href: "/dashboard/assinatura", label: "Plano", icon: CreditCard },
]

const STORAGE_KEY = "sidebar-collapsed"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) {
        setCollapsed(saved === "true")
      }
    }
  }, [mounted])

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev
      if (mounted) {
        localStorage.setItem(STORAGE_KEY, String(next))
      }
      return next
    })
  }

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-[width] duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "relative flex shrink-0 items-center border-b",
          collapsed ? "h-auto flex-col items-center gap-2 py-3" : "h-14 justify-between px-3"
        )}
      >
        <Logo collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="h-8 w-8 shrink-0 rounded-md hover:bg-accent"
          title={collapsed ? "Expandir menu" : "Recolher menu"}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          aria-expanded={!collapsed}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                collapsed ? "justify-center px-2" : "px-3",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
