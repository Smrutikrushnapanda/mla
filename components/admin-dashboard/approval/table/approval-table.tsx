"use client"

import { DataTable } from "../../district/tables/data-table"
import { createColumns, ProjectApproval } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface ProjectApprovalTableProps {
  data: ProjectApproval[]
  onView: (project: ProjectApproval) => void
  onApprove: (project: ProjectApproval) => void
  onReject: (project: ProjectApproval) => void
  onRequestRevision: (project: ProjectApproval) => void
}

export function ProjectApprovalTable({ 
  data, 
  onView,
  onApprove,
  onReject,
  onRequestRevision
}: ProjectApprovalTableProps) {
  const { theme } = useThemeStore()
  const columns = createColumns(onView, onApprove, onReject, onRequestRevision)

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
          Project Approvals
        </h2>
        <p 
          className="text-xs md:text-sm mt-1"
          style={{ color: theme.textSecondary }}
        >
          Review and approve project proposals
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