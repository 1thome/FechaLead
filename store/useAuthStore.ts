"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AuthState, MockUser } from "@/mocks/auth"

interface AuthStore {
  state: AuthState
  user: MockUser | null
  setState: (state: AuthState) => void
  setUser: (user: MockUser | null) => void
  updateProfile: (data: Partial<Pick<MockUser, "name" | "email" | "company" | "avatar">>) => void
  login: (email: string, password: string) => void
  logout: () => void
  activatePlan: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      state: "guest",
      user: null,

      setState: (state) => set({ state }),
      setUser: (user) => set({ user }),

      updateProfile: (data) =>
        set((s) => ({
          user: s.user ? { ...s.user, ...data } : null,
        })),

      login: (email, _password) => {
        set({
          state: "authenticated_no_plan",
          user: {
            id: "1",
            name: email.split("@")[0],
            email,
          },
        })
      },

      logout: () => set({ state: "guest", user: null }),

      activatePlan: () => set((s) => ({ state: "authenticated_with_plan" })),
    }),
    { name: "fechalead-auth" }
  )
)
