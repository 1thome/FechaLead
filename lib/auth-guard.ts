/**
 * Lógica de proteção de rotas - mock
 * Substituir por middleware/API real futuramente
 */

import type { AuthState } from "@/mocks/auth"

const AUTH_ONLY_PATHS = ["/login", "/cadastro", "/recuperar-senha"]
const APP_PATHS_PREFIX = "/app"

export function getRedirectForPath(pathname: string, state: AuthState): string | null {
  const isApp = pathname.startsWith(APP_PATHS_PREFIX)
  const isAuthPage = AUTH_ONLY_PATHS.includes(pathname)

  if (state === "guest") {
    if (isApp) return "/login"
    return null
  }

  if (state === "authenticated_no_plan") {
    if (isApp) return "/planos"
    if (isAuthPage) return "/planos"
    return null
  }

  if (state === "authenticated_with_plan") {
    if (isAuthPage) return "/app"
    return null
  }

  return null
}
