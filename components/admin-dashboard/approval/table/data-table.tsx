"use client"

import { DataTable } from "../../district/tables/data-table"
import { createColumns, Grievance } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface GrievanceTableProps {
  data: Grievance[]
  onView: (grievance: Grievance) => void
  onUpdateStatus: (grievanceId: string, status: Grievance['status']) => void
}

export function GrievanceTable({ 
  data, 
  onView,
  onUpdateStatus
}: GrievanceTableProps) {
  const { theme } = useThemeStore()
  const columns = createColumns(onView, onUpdateStatus)

  return (
    <div 
      className="w-full rounded-lg border shadow-lg overflow-x-scroll"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <div className="p-4 md:p-6 border-b" style={{ borderColor: theme.border }}>
        <h2 
          className="text-lg md:text-2xl font-bold"
          style={{ color: theme.textPrimary }}
        >
          Grievances Management
        </h2>
        <p 
          className="text-xs md:text-sm mt-1"
          style={{ color: theme.textSecondary }}
        >
          Track and resolve citizen grievances and complaints
        </p>
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}