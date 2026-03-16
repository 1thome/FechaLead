"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare, UserPlus, Zap, CheckCheck, ChevronRight } from "lucide-react"
import { useNotificationStore } from "@/store/useNotificationStore"
import { cn } from "@/lib/utils"
import Link from "next/link"

const typeIcons = {
  lead: UserPlus,
  message: MessageSquare,
  system: Zap,
}

interface NotificationDropdownProps {
  align?: "start" | "center" | "end"
}

export function NotificationDropdown({ align = "end" }: NotificationDropdownProps) {
  const router = useRouter()
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore()

  const handleNotificationClick = (notif: { id: string; href?: string }) => {
    markAsRead(notif.id)
    if (notif.href) {
      router.push(notif.href)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 shrink-0 rounded-full"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-medium text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={align === "start" ? "right" : "bottom"} className="w-80">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => markAllAsRead()}
            >
              <CheckCheck className="mr-1 h-3.5 w-3.5" />
              Marcar todas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Nenhuma notificação
            </div>
          ) : (
            notifications.map((notif) => {
              const Icon = typeIcons[notif.type]
              return (
                <button
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={cn(
                    "flex w-full gap-3 border-b p-3 text-left transition-colors hover:bg-accent last:border-0",
                    !notif.read && "bg-primary/5",
                    notif.href && "cursor-pointer"
                  )}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("font-medium", !notif.read && "text-foreground")}>
                      {notif.title}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {notif.message}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                  {notif.href && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
              )
            })
          )}
        </div>
        <div className="border-t p-2">
          <Link href="/app/atendimentos">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Ver todas as notificações
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
