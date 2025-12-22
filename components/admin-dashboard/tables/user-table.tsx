// users-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, User } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: User[] = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Citizen", status: "Active", joinedDate: "2024-01-15" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Staff", status: "Active", joinedDate: "2024-02-20" },
  { id: 3, name: "Mike Davis", email: "mike@example.com", role: "Admin", status: "Inactive", joinedDate: "2024-03-10" },
  { id: 4, name: "Emily Wilson", email: "emily@example.com", role: "Citizen", status: "Active", joinedDate: "2024-04-05" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "Staff", status: "Active", joinedDate: "2024-05-12" },
  { id: 6, name: "Lisa Anderson", email: "lisa@example.com", role: "Citizen", status: "Active", joinedDate: "2024-06-18" },
  { id: 7, name: "James Taylor", email: "james@example.com", role: "Staff", status: "Inactive", joinedDate: "2024-07-22" },
  { id: 8, name: "Maria Garcia", email: "maria@example.com", role: "Citizen", status: "Active", joinedDate: "2024-08-30" },
  { id: 9, name: "Robert Martinez", email: "robert@example.com", role: "Admin", status: "Active", joinedDate: "2024-09-14" },
  { id: 10, name: "Jennifer Lee", email: "jennifer@example.com", role: "Citizen", status: "Active", joinedDate: "2024-10-08" },
  { id: 11, name: "William Clark", email: "william@example.com", role: "Staff", status: "Active", joinedDate: "2024-11-02" },
  { id: 12, name: "Patricia Rodriguez", email: "patricia@example.com", role: "Citizen", status: "Inactive", joinedDate: "2024-11-20" },
]

export function UsersTable() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="w-full rounded-lg border shadow-lg p-6"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 
          className="text-2xl font-bold"
          style={{ color: theme.textPrimary }}
        >
          Users Management
        </h2>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}