// constituencies/tables/constituency-table.tsx
"use client"

import { DataTable } from "./data-table"
import { createColumns, Constituency } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface ConstituencyTableProps {
  data: Constituency[]
  onEdit: (constituency: Constituency) => void
  onView: (constituency: Constituency) => void
  onToggleActive: (constituencyId: string) => void
}

export function ConstituencyTable({ 
  data, 
  onEdit, 
  onView, 
  onToggleActive 
}: ConstituencyTableProps) {
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
            Constituencies Management
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            View and manage all constituencies across districts
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}