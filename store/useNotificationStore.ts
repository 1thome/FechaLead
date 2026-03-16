import { create } from "zustand"

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "lead" | "message" | "system"
  /** Link para onde navegar ao clicar */
  href?: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Novo lead",
    message: "João Silva entrou em contato pelo WhatsApp",
    time: "2 min atrás",
    read: false,
    type: "lead",
    href: "/app/atendimentos?lead=1",
  },
  {
    id: "2",
    title: "Mensagem recebida",
    message: "Maria Santos: Gostaria de saber mais sobre o produto",
    time: "15 min atrás",
    read: false,
    type: "message",
    href: "/app/atendimentos?lead=2",
  },
  {
    id: "3",
    title: "Lead convertido",
    message: "Pedro Oliveira fechou negócio!",
    time: "1 hora atrás",
    read: true,
    type: "system",
    href: "/app/leads",
  },
  {
    id: "4",
    title: "Automação ativada",
    message: "Automação 'Preço → Negociação' executada com sucesso",
    time: "2 horas atrás",
    read: true,
    type: "system",
    href: "/app/configuracoes",
  },
]

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.notifications.filter((n) => !n.read && n.id !== id).length,
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}))
