"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAutomations, createAutomation, updateAutomation, deleteAutomation } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Plus,
  Zap,
  ArrowRight,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  Edit,
  MessageSquare,
  UserPlus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Automation } from "@/types/automation"

const automationTemplates = [
  {
    name: "Palavra-chave → Negociação",
    trigger: "Mensagem contém",
    triggerValue: "preço, orçamento, valor",
    action: "Mover para",
    actionValue: "Negociação",
    icon: MessageSquare,
  },
  {
    name: "Novo lead → Boas-vindas",
    trigger: "Lead entra em",
    triggerValue: "Novo Lead",
    action: "Enviar mensagem",
    actionValue: "Olá! Como posso ajudar?",
    icon: UserPlus,
  },
  {
    name: "Sem resposta → Follow-up",
    trigger: "Sem resposta por",
    triggerValue: "24 horas",
    action: "Enviar mensagem",
    actionValue: "Oi! Ainda posso ajudar?",
    icon: MessageSquare,
  },
]

function AutomationFormDialog({
  open,
  onOpenChange,
  automation,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  automation?: Automation | null
  onSuccess: () => void
}) {
  const [name, setName] = useState("")
  const [trigger, setTrigger] = useState("")
  const [action, setAction] = useState("")

  useEffect(() => {
    if (open) {
      setName(automation?.name ?? "")
      setTrigger(automation?.trigger ?? "")
      setAction(automation?.action ?? "")
    }
  }, [open, automation])

  const createMutation = useMutation({
    mutationFn: createAutomation,
    onSuccess: () => {
      onSuccess()
      onOpenChange(false)
      setName("")
      setTrigger("")
      setAction("")
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Automation> }) =>
      updateAutomation(id, data),
    onSuccess: () => {
      onSuccess()
      onOpenChange(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !trigger.trim() || !action.trim()) return

    if (automation) {
      updateMutation.mutate({
        id: automation.id,
        data: { name: name.trim(), trigger: trigger.trim(), action: action.trim() },
      })
    } else {
      createMutation.mutate({
        name: name.trim(),
        trigger: trigger.trim(),
        action: action.trim(),
        isActive: true,
      })
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{automation ? "Editar automação" : "Nova automação"}</DialogTitle>
          <DialogDescription>
            Configure o gatilho e a ação que serão executados automaticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex: Preço → Negociação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trigger">Gatilho (SE)</Label>
              <Input
                id="trigger"
                placeholder="Ex: Mensagem contém 'preço'"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">Ação (ENTÃO)</Label>
              <Input
                id="action"
                placeholder="Ex: Mover para coluna Negociação"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || !name.trim() || !trigger.trim() || !action.trim()}>
              {automation ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteConfirmDialog({
  open,
  onOpenChange,
  name,
  onConfirm,
  isPending,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  onConfirm: () => void
  isPending: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir automação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir &quot;{name}&quot;? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function TarefasPage() {
  const queryClient = useQueryClient()
  const [showTemplates, setShowTemplates] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editingAuto, setEditingAuto] = useState<Automation | null>(null)
  const [deletingAuto, setDeletingAuto] = useState<Automation | null>(null)

  const { data: automations, isLoading } = useQuery({
    queryKey: ["automations"],
    queryFn: getAutomations,
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateAutomation(id, { isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["automations"] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAutomation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automations"] })
      setDeletingAuto(null)
    },
  })

  const invalidateAutomations = () => queryClient.invalidateQueries({ queryKey: ["automations"] })

  const handleUseTemplate = (tpl: (typeof automationTemplates)[0]) => {
    setShowTemplates(false)
    createAutomation({
      name: tpl.name,
      trigger: `${tpl.trigger} "${tpl.triggerValue}"`,
      action: `${tpl.action} "${tpl.actionValue}"`,
      isActive: true,
    }).then(() => invalidateAutomations())
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarefas e automações</h1>
          <p className="text-muted-foreground">
            Crie regras automáticas para seu fluxo de vendas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTemplates(!showTemplates)}>
            Ver templates
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Criar automação
          </Button>
        </div>
      </div>

      {showTemplates && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Templates prontos</CardTitle>
            <CardDescription>
              Clique para usar como base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {automationTemplates.map((tpl) => {
                const Icon = tpl.icon
                return (
                  <button
                    key={tpl.name}
                    type="button"
                    onClick={() => handleUseTemplate(tpl)}
                    className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{tpl.name}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>SE {tpl.trigger} &quot;{tpl.triggerValue}&quot;</p>
                      <p>ENTÃO {tpl.action} &quot;{tpl.actionValue}&quot;</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-4 font-semibold">Suas automações</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {automations?.map((auto) => (
            <Card
              key={auto.id}
              className="group overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                        auto.isActive ? "bg-primary/15" : "bg-muted"
                      )}
                    >
                      <Zap
                        className={cn(
                          "h-5 w-5",
                          auto.isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{auto.name}</CardTitle>
                      <Badge
                        variant={auto.isActive ? "default" : "secondary"}
                        className="mt-1 text-xs"
                      >
                        {auto.isActive ? "Ativa" : "Pausada"}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingAuto(auto)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          toggleMutation.mutate({ id: auto.id, isActive: !auto.isActive })
                        }
                      >
                        {auto.isActive ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Ativar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeletingAuto(auto)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                      SE
                    </span>
                    <span className="text-sm">{auto.trigger}</span>
                  </div>
                  <ArrowRight className="my-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                      ENTÃO
                    </span>
                    <span className="text-sm">{auto.action}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Criada em {new Date(auto.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Zap className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 font-semibold">Crie sua primeira automação</h3>
          <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
            Exemplo: SE mensagem contém &quot;preço&quot; ENTÃO mover lead para coluna &quot;Negociação&quot;
          </p>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova automação
          </Button>
        </CardContent>
      </Card>

      <AutomationFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        automation={null}
        onSuccess={invalidateAutomations}
      />

      {editingAuto && (
        <AutomationFormDialog
          open={!!editingAuto}
          onOpenChange={(open) => !open && setEditingAuto(null)}
          automation={editingAuto}
          onSuccess={invalidateAutomations}
        />
      )}

      {deletingAuto && (
        <DeleteConfirmDialog
          open={!!deletingAuto}
          onOpenChange={(open) => !open && setDeletingAuto(null)}
          name={deletingAuto.name}
          onConfirm={() => deleteMutation.mutate(deletingAuto.id)}
          isPending={deleteMutation.isPending}
        />
      )}
    </div>
  )
}
