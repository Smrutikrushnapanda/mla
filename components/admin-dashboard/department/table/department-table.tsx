"use client"

import { DataTable } from "../../district/tables/data-table"
import { createColumns, Department } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

interface DepartmentTableProps {
  data: Department[]
  onEdit: (department: Department) => void
  onView: (department: Department) => void
  onToggleActive: (departmentId: string) => void
}

export function DepartmentTable({ 
  data, 
  onEdit, 
  onView, 
  onToggleActive 
}: DepartmentTableProps) {
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
            Departments Management
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            View and manage all departments with their work categories
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}