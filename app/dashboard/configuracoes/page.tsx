"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useUserStore } from "@/store/useUserStore"
import {
  Building2,
  MessageCircle,
  Bot,
  Bell,
  Mail,
  Clock,
  Palette,
  Download,
  Check,
} from "lucide-react"

export default function ConfiguracoesPage() {
  const user = useUserStore((state) => state.user)
  const [companyName, setCompanyName] = useState(user?.company || "")
  const [whatsappNumber, setWhatsappNumber] = useState("+55 11 99999-0000")
  const [aiEnabled, setAiEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [awayMessage, setAwayMessage] = useState("Olá! Retornarei em breve.")
  const [workStart, setWorkStart] = useState("09:00")
  const [workEnd, setWorkEnd] = useState("18:00")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta, integrações e preferências
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Empresa</CardTitle>
                <CardDescription>Informações da sua empresa</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Nome da empresa</Label>
              <Input
                id="company"
                placeholder="Minha Empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email da empresa</Label>
              <Input
                id="email"
                type="email"
                placeholder="contato@empresa.com"
                defaultValue={user?.email}
              />
            </div>
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" />
              Salvar alterações
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <MessageCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>Número conectado para mensagens</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">Número do WhatsApp</Label>
              <Input
                id="whatsapp"
                placeholder="+55 11 99999-0000"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Status da conexão</p>
                <p className="text-sm text-emerald-600">Conectado</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <Button variant="outline" className="w-full">
              Conectar novo número
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Bot className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <CardTitle>Inteligência Artificial</CardTitle>
                <CardDescription>Respostas automáticas e sugestões</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="ai-toggle" className="font-medium">
                  Ativar IA
                </Label>
                <p className="text-sm text-muted-foreground">
                  Respostas automáticas e sugestões inteligentes
                </p>
              </div>
              <Switch
                id="ai-toggle"
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Alertas e avisos do sistema</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label className="font-medium">Notificações push</Label>
                <p className="text-sm text-muted-foreground">
                  Novas mensagens e leads
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Horário de trabalho</CardTitle>
                <CardDescription>Mensagem de ausência fora do expediente</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Início</Label>
                <Input
                  type="time"
                  value={workStart}
                  onChange={(e) => setWorkStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fim</Label>
                <Input
                  type="time"
                  value={workEnd}
                  onChange={(e) => setWorkEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mensagem de ausência</Label>
              <Input
                placeholder="Olá! Retornarei em breve."
                value={awayMessage}
                onChange={(e) => setAwayMessage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10">
                <Palette className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>Tema e preferências visuais</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Altere o tema pelo ícone na barra superior.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Exportar dados</CardTitle>
                <CardDescription>Baixe seus leads e conversas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Exportar leads (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Exportar conversas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
