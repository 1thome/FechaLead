"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/useAuthStore"
import {
  Building2,
  MessageCircle,
  Bot,
  Bell,
  Clock,
  Check,
  User,
  Settings,
  Upload,
  X,
} from "lucide-react"

function ConfiguracoesContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const [activeTab, setActiveTab] = useState(tabParam === "perfil" ? "perfil" : "geral")

  const [companyName, setCompanyName] = useState(user?.company || "")
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileEmail, setProfileEmail] = useState(user?.email || "")
  const [profileCompany, setProfileCompany] = useState(user?.company || "")
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || "")
  const [profileSaved, setProfileSaved] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState("+55 11 99999-0000")

  useEffect(() => {
    setActiveTab(tabParam === "perfil" ? "perfil" : "geral")
  }, [tabParam])

  useEffect(() => {
    if (user) {
      setProfileName(user.name)
      setProfileEmail(user.email)
      setProfileCompany(user.company || "")
      setProfileAvatar(user.avatar || "")
    }
  }, [user])

  const handleSaveProfile = () => {
    updateProfile({
      name: profileName.trim(),
      email: profileEmail.trim(),
      company: profileCompany.trim() || undefined,
      avatar: profileAvatar.trim() || undefined,
    })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => setProfileAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleAvatarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const removeAvatar = () => setProfileAvatar("")
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="geral" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-0">
          <Card className="max-w-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Editar perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Foto do perfil</Label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="relative shrink-0">
                    <Avatar className="h-24 w-24 ring-2 ring-border">
                      <AvatarImage src={profileAvatar || undefined} alt={profileName} />
                      <AvatarFallback className="text-3xl">
                        {profileName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {profileAvatar && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -right-1 -top-1 h-6 w-6 rounded-full"
                        onClick={removeAvatar}
                        aria-label="Remover foto"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label
                      htmlFor="avatar-upload"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-8 transition-colors hover:border-primary/50 hover:bg-muted/50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-center text-sm">
                        <span className="font-medium text-primary">
                          Clique para enviar
                        </span>
                        <span className="text-muted-foreground"> ou arraste a imagem aqui</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG ou WebP até 5MB
                      </span>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        className="sr-only"
                        onChange={handleAvatarInputChange}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Ou{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt("Cole a URL da imagem:")
                          if (url) setProfileAvatar(url.trim())
                        }}
                        className="underline hover:text-primary"
                      >
                        insira uma URL
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nome</Label>
                <Input
                  id="profile-name"
                  placeholder="Seu nome"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-company">Empresa</Label>
                <Input
                  id="profile-company"
                  placeholder="Nome da empresa"
                  value={profileCompany}
                  onChange={(e) => setProfileCompany(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleSaveProfile}
                disabled={profileSaved}
              >
                {profileSaved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvo!
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geral" className="mt-0">
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
      </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function ConfiguracoesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <ConfiguracoesContent />
    </Suspense>
  )
}
