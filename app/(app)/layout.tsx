"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const state = useAuthStore((s) => s.state)

  useEffect(() => {
    if (state === "guest" && pathname !== "/planos") {
      router.replace("/login")
      return
    }
    if (state === "authenticated_no_plan" && pathname !== "/planos") {
      router.replace("/planos")
    }
  }, [state, router, pathname])

  const canShowLayout =
    state === "authenticated_with_plan" ||
    (state === "authenticated_no_plan" && pathname === "/planos") ||
    (state === "guest" && pathname === "/planos")

  if (!canShowLayout) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
