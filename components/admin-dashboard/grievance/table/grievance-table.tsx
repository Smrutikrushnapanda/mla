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
      className="w-full rounded-lg border shadow-lg p-6"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 
            className="text-2xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Grievances Management
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Track and resolve citizen grievances and complaints
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}