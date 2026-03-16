/**
 * Mock de autenticação - substituir por API real futuramente
 */

export type AuthState = "guest" | "authenticated_no_plan" | "authenticated_with_plan"

export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  company?: string
}

export const MOCK_AUTH_STORAGE_KEY = "fechalead-auth-mock"

export const defaultAuthState: AuthState = "guest"

export const mockUser: MockUser = {
  id: "1",
  name: "Usuário Demo",
  email: "demo@fechalead.com",
}
