"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  GitBranch,
  MessageSquare,
  Zap,
  Settings,
  CreditCard,
  Menu,
} from "lucide-react"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"

const menuItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/leads", label: "Leads", icon: Users },
  { href: "/app/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/app/atendimentos", label: "Atendimentos", icon: MessageSquare },
  { href: "/app/tarefas", label: "Automação", icon: Zap },
  { href: "/planos", label: "Planos", icon: CreditCard },
  { href: "/app/configuracoes", label: "Configurações", icon: Settings },
]

const STORAGE_KEY = "sidebar-collapsed"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const state = useAuthStore((s) => s.state)
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  const hasPlan = state === "authenticated_with_plan"
  const canNavigateToApp = hasPlan

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
          const isActive =
            item.href === "/app"
              ? pathname === "/app"
              : pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          const isAppLink = item.href.startsWith("/app")
          const isDisabled = !canNavigateToApp && isAppLink

          if (isDisabled) {
            return (
              <div
                key={item.href}
                title="Selecione um plano para acessar"
                className={cn(
                  "flex w-full cursor-not-allowed items-center gap-3 rounded-lg py-2.5 text-left text-sm font-medium opacity-50",
                  collapsed ? "justify-center px-2" : "px-3",
                  "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>
            )
          }

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => !isActive && router.push(item.href)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg py-2.5 text-left text-sm font-medium transition-colors",
                collapsed ? "justify-center px-2" : "px-3",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
