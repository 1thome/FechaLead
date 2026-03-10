"use client"

import { createPortal } from "react-dom"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { Lead } from "@/types/lead"
import { LeadStatus } from "@/types/lead"
import { LeadCard } from "./lead-card"
import { LeadCardPreview } from "./lead-card-preview"
import { KanbanColumn } from "./kanban-column"
import { useState } from "react"

interface Column {
  id: LeadStatus
  title: string
}

interface LeadKanbanBoardProps {
  columns: Column[]
  leadsByStatus: Record<LeadStatus, Lead[]>
  onStatusChange: (leadId: string, status: LeadStatus) => void
}

export function LeadKanbanBoard({
  columns,
  leadsByStatus,
  onStatusChange,
}: LeadKanbanBoardProps) {
  const [activeLead, setActiveLead] = useState<Lead | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const leadId = active.id as string
    const lead = Object.values(leadsByStatus)
      .flat()
      .find((l) => l.id === leadId)
    if (lead) setActiveLead(lead)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveLead(null)
    if (!over) return

    const leadId = active.id as string
    const newStatus = over.id as LeadStatus
    if (columns.some((c) => c.id === newStatus)) {
      onStatusChange(leadId, newStatus)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-5 gap-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            leads={leadsByStatus[column.id]}
          />
        ))}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay
            modifiers={[snapCenterToCursor]}
            dropAnimation={{
              duration: 200,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeLead ? (
              <div className="w-72 cursor-grabbing rounded-xl border-2 border-primary/50 bg-card shadow-2xl shadow-primary/20 ring-4 ring-primary/10">
                <LeadCardPreview lead={activeLead} />
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  )
}
