"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAutomations, createAutomation, updateAutomation, deleteAutomation } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Zap, MoreVertical, Play, Pause, Trash2, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Automation } from "@/types/automation"

const FOLLOWUP_STORAGE = "fechalead-followup"
const POSVENDA_STORAGE = "fechalead-posvenda"

const DEFAULT_FOLLOWUP = {
  enabled: true,
  hours: 24,
  message:
    "Olá! Só passando para saber se você conseguiu ver nossa proposta. Posso te ajudar com algo?",
}

const DEFAULT_POSVENDA = {
  enabled: true,
  days: 2,
  message:
    "Olá! Esperamos que tenha gostado do atendimento. Poderia nos contar como foi sua experiência?",
}

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
            Crie uma regra: quando algo acontecer, o sistema faz algo automaticamente pra você.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Dê um apelido pra essa regra</Label>
              <Input
                id="name"
                placeholder="Ex: Preço → Negociação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Um nome curto pra você encontrar essa regra depois. Ex: Preço → Negociação
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trigger">O que precisa acontecer?</Label>
              <Input
                id="trigger"
                placeholder="Ex: O lead envia mensagem com a palavra 'preço'"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Quando o lead fizer isso, a regra dispara. Ex: O lead envia mensagem com a palavra 'preço' ou 'quanto custa'.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">O que o sistema faz sozinho?</Label>
              <Input
                id="action"
                placeholder="Ex: Mover o lead para a coluna Negociação"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                A ação automática. Ex: Mover o lead para a coluna Negociação ou Enviar mensagem de boas-vindas.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending || !name.trim() || !trigger.trim() || !action.trim()}
            >
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
  const [createOpen, setCreateOpen] = useState(false)
  const [editingAuto, setEditingAuto] = useState<Automation | null>(null)
  const [deletingAuto, setDeletingAuto] = useState<Automation | null>(null)

  const [followup, setFollowup] = useState(DEFAULT_FOLLOWUP)
  const [posvenda, setPosvenda] = useState(DEFAULT_POSVENDA)
  const [followupSaved, setFollowupSaved] = useState(false)
  const [posvendaSaved, setPosvendaSaved] = useState(false)

  useEffect(() => {
    try {
      const f = localStorage.getItem(FOLLOWUP_STORAGE)
      if (f) setFollowup(JSON.parse(f))
      const p = localStorage.getItem(POSVENDA_STORAGE)
      if (p) setPosvenda(JSON.parse(p))
    } catch {
      /* ignore */
    }
  }, [])

  const saveFollowup = () => {
    localStorage.setItem(FOLLOWUP_STORAGE, JSON.stringify(followup))
    setFollowupSaved(true)
    setTimeout(() => setFollowupSaved(false), 2000)
  }

  const savePosvenda = () => {
    localStorage.setItem(POSVENDA_STORAGE, JSON.stringify(posvenda))
    setPosvendaSaved(true)
    setTimeout(() => setPosvendaSaved(false), 2000)
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Automações</h1>
          <p className="text-muted-foreground">
            Crie regras automáticas para seu fluxo de vendas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Ver templates</Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Criar automação
          </Button>
        </div>
      </div>

      {/* Follow-up e pós-venda */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Follow-up e pós-venda</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Follow-up automático</CardTitle>
              <CardDescription>
                Envia mensagem quando o cliente não responder por um tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="followup-toggle">Ativar</Label>
                <Switch
                  id="followup-toggle"
                  checked={followup.enabled}
                  onCheckedChange={(v) => setFollowup((p) => ({ ...p, enabled: v }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followup-hours">Horas sem resposta</Label>
                <Input
                  id="followup-hours"
                  type="number"
                  min={1}
                  value={followup.hours}
                  onChange={(e) =>
                    setFollowup((p) => ({ ...p, hours: parseInt(e.target.value) || 24 }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followup-message">Mensagem</Label>
                <textarea
                  id="followup-message"
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={followup.message}
                  onChange={(e) => setFollowup((p) => ({ ...p, message: e.target.value }))}
                />
              </div>
              <Button onClick={saveFollowup} className="w-full" disabled={followupSaved}>
                {followupSaved ? "Salvo!" : "Salvar"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pós-venda automático</CardTitle>
              <CardDescription>
                Envia pedido de avaliação X dias após a venda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="posvenda-toggle">Ativar</Label>
                <Switch
                  id="posvenda-toggle"
                  checked={posvenda.enabled}
                  onCheckedChange={(v) => setPosvenda((p) => ({ ...p, enabled: v }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="posvenda-days">Dias após venda</Label>
                <Input
                  id="posvenda-days"
                  type="number"
                  min={1}
                  value={posvenda.days}
                  onChange={(e) =>
                    setPosvenda((p) => ({ ...p, days: parseInt(e.target.value) || 2 }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="posvenda-message">Mensagem</Label>
                <textarea
                  id="posvenda-message"
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={posvenda.message}
                  onChange={(e) => setPosvenda((p) => ({ ...p, message: e.target.value }))}
                />
              </div>
              <Button onClick={savePosvenda} className="w-full" disabled={posvendaSaved}>
                {posvendaSaved ? "Salvo!" : "Salvar"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suas automações */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Suas automações</h2>
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
                      <span
                        className={cn(
                          "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                          auto.isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {auto.isActive ? "Ativa" : "Pausada"}
                      </span>
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
                  <div className="my-2 text-muted-foreground">→</div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                      ENTÃO
                    </span>
                    <span className="text-sm">{auto.action}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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
