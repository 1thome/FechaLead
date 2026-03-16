"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { getRedirectForPath } from "@/lib/auth-guard"

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const state = useAuthStore((s) => s.state)

  useEffect(() => {
    const redirect = getRedirectForPath(pathname, state)
    if (redirect) {
      router.replace(redirect)
    }
  }, [pathname, state, router])

  return <>{children}</>
}
