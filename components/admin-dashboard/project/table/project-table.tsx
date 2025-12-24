"use client"

import { DataTable } from "./data-table"
import { createColumns, Project } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface ProjectTableProps {
  data: Project[]
  onView: (project: Project) => void
  onEdit: (project: Project) => void
  onUpdateStatus: (projectId: string, status: Project['status']) => void
}

export function ProjectTable({ 
  data, 
  onView,
  onEdit,
  onUpdateStatus
}: ProjectTableProps) {
  const { theme } = useThemeStore()
  const columns = createColumns(onView, onEdit, onUpdateStatus)

  return (
    <div 
      className="w-full rounded-lg border shadow-lg overflow-hidden"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      {/* Header - Fixed, not scrollable */}
      <div className="p-4 md:p-6 border-b" style={{ borderColor: theme.border }}>
        <h2 
          className="text-lg md:text-2xl font-bold"
          style={{ color: theme.textPrimary }}
        >
          Projects Management
        </h2>
        <p 
          className="text-xs md:text-sm mt-1"
          style={{ color: theme.textSecondary }}
        >
          Track and monitor constituency development projects
        </p>
      </div>

      {/* Table with horizontal scroll ONLY */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1200px]">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}