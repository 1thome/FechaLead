"use client"

import { useDroppable } from "@dnd-kit/core"
import { Lead } from "@/types/lead"
import { LeadCard } from "./lead-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LeadStatus } from "@/types/lead"

interface KanbanColumnProps {
  id: LeadStatus
  title: string
  leads: Lead[]
}

export function KanbanColumn({ id, title, leads }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <Card
      ref={setNodeRef}
      className={`flex min-w-0 flex-col transition-all duration-200 ${
        isOver
          ? "border-2 border-primary border-dashed bg-primary/10 shadow-inner"
          : "border"
      }`}
    >
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            {leads.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
      </CardContent>
    </Card>
  )
}
