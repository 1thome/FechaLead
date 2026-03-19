"use client"

import { useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { GripVertical } from "lucide-react"

const MIN_RIGHT = 320
const MAX_RIGHT = 800
const DEFAULT_RIGHT = 400

interface AppThreePanelProps {
  center: React.ReactNode
  right?: React.ReactNode
  centerClassName?: string
  rightClassName?: string
  resizable?: boolean
}

export function AppThreePanel({
  center,
  right,
  centerClassName,
  rightClassName,
  resizable = false,
}: AppThreePanelProps) {
  const hasRight = right != null
  const [rightWidth, setRightWidth] = useState(DEFAULT_RIGHT)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.querySelector("[data-three-panel]")
      if (!container) return
      const rect = container.getBoundingClientRect()
      const xFromRight = rect.right - e.clientX
      const newWidth = Math.min(MAX_RIGHT, Math.max(MIN_RIGHT, xFromRight))
      setRightWidth(newWidth)
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging])

  return (
    <div
      data-three-panel
      className="flex h-[calc(100vh-3.5rem)] -m-6 min-h-0"
    >
      {/* Área central - scroll vertical com barra visível */}
      <div
        className={cn(
          "scrollbar-vertical flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto",
          centerClassName
        )}
      >
        {center}
      </div>

      {/* Alça de redimensionamento */}
      {hasRight && resizable && (
        <button
          type="button"
          aria-label="Redimensionar chat"
          onMouseDown={handleMouseDown}
          className={cn(
            "flex shrink-0 items-center justify-center border-l border-r bg-muted/30 transition-colors hover:bg-muted/60",
            isDragging && "bg-primary/20"
          )}
          style={{ width: 16 }}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      )}

      {/* Painel direito - detalhes */}
      {hasRight && (
        <aside
          className={cn(
            "scrollbar-vertical flex min-h-0 shrink-0 flex-col overflow-y-auto border-l bg-muted/10",
            rightClassName
          )}
          style={{ width: resizable ? rightWidth : 400 }}
        >
          {right}
        </aside>
      )}
    </div>
  )
}
