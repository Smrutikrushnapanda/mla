"use client"

import { DataTable } from "../../district/tables/data-table"
import { createColumns, Scheme } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface SchemeTableProps {
  data: Scheme[]
  onEdit: (scheme: Scheme) => void
  onView: (scheme: Scheme) => void
  onToggleActive: (schemeId: string) => void
}

export function SchemeTable({ 
  data, 
  onEdit, 
  onView, 
  onToggleActive 
}: SchemeTableProps) {
  const { theme } = useThemeStore()
  const columns = createColumns(onEdit, onView, onToggleActive)

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
            Schemes Management
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            View and manage all government welfare schemes
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}