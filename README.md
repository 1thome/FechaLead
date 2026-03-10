# CRM SaaS - WhatsApp & IA

Front-end de um CRM SaaS profissional com interface moderna, inspirado em HubSpot, Pipedrive e Notion.

## Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Shadcn UI** (Radix UI)
- **React Query** (TanStack Query)
- **Zustand** (estado global)
- **dnd-kit** (drag and drop)
- **Recharts** (gráficos)

## Estrutura

```
/app
  /login          - Página de login
  /register       - Página de cadastro
  /dashboard      - Área principal
    /leads        - Kanban de CRM
    /conversas    - Inbox de chat
    /automacoes   - Automações visuais
    /configuracoes - Configurações
    /assinatura   - Planos SaaS

/components
  /ui             - Componentes Shadcn
  /layout         - Sidebar, Topbar
  /crm            - Kanban, Leads
  /chat           - Conversas, Chat

/lib
  api.ts          - Simulação de API (mock)
  utils.ts        - Utilitários

/store            - Zustand stores
/types            - TypeScript types
```

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Funcionalidades

- **Dashboard** - Métricas e gráfico de leads
- **Leads** - Kanban com drag and drop entre colunas
- **Conversas** - Inbox estilo WhatsApp com chat
- **Automações** - Interface visual de regras
- **Configurações** - Empresa, WhatsApp, IA
- **Planos** - Assinatura estilo Stripe

## Nota

Este é um projeto **100% front-end**. Todas as APIs são simuladas com dados mockados. O backend será desenvolvido separadamente.
