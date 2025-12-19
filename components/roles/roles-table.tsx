// roles/tables/role-table.tsx
"use client"

import { DataTable } from "./data-table"
import { createColumns, Role } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface RoleTableProps {
  data: Role[]
  onEdit: (role: Role) => void
  onView: (role: Role) => void
  onToggleActive: (roleId: string) => void
}

export function RoleTable({ 
  data, 
  onEdit, 
  onView, 
  onToggleActive 
}: RoleTableProps) {
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
            Roles Management
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            View and manage user roles and permissions
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}