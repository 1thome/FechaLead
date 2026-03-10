import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { DashboardInit } from "@/components/dashboard-init"
import { CloudBackground } from "@/components/ui/cloud-background"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardInit />
      <Sidebar />
      <CloudBackground className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-background/80 p-6 backdrop-blur-sm">{children}</main>
      </CloudBackground>
    </div>
  )
}
