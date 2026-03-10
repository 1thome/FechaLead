"use client"

import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/lib/api"
import { useUserStore } from "@/store/useUserStore"
import { useEffect } from "react"

export function DashboardInit() {
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !user,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) setUser(data)
  }, [data, setUser])

  return null
}
