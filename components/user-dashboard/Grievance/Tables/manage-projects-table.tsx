"use client"

import { useMemo, useState } from "react"
import { DataTable } from "./data-table"
import { columns, Grievance } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const mockData: Grievance[] = [
  {
    grievanceNumber: "GRV-2025-0001",
    userName: "Ramesh Kumar",
    mobileNumber: "9876543210",
    categoryName: "Road & Transport",
    blockName: "North Block",
    priority: "High",
    status: "Pending",
    assignedTo: "MLA Office",
    createdAt: "2025-01-10T10:30:00",
    actionDate: undefined,
  },
  {
    grievanceNumber: "GRV-2025-0002",
    userName: "Sita Devi",
    mobileNumber: "9123456780",
    categoryName: "Water Supply",
    blockName: "East Block",
    priority: "Medium",
    status: "On Hold",
    assignedTo: "Field Staff",
    createdAt: "2025-01-12T14:15:00",
    actionDate: "2025-01-15T11:00:00",
  },
  {
    grievanceNumber: "GRV-2025-0003",
    userName: "Amit Sharma",
    mobileNumber: "9988776655",
    categoryName: "Electricity",
    blockName: "South Block",
    priority: "High",
    status: "Resolved",
    assignedTo: "MLA Office",
    createdAt: "2025-01-08T09:00:00",
    actionDate: "2025-01-11T16:45:00",
  },
  {
    grievanceNumber: "GRV-2025-0004",
    userName: "Akash Singh",
    mobileNumber: "9988776455",
    categoryName: "Electricity",
    blockName: "North Block",
    priority: "Medium",
    status: "Forwarded",
    assignedTo: "MLA Office",
    createdAt: "2025-01-08T09:00:00",
    actionDate: "2025-01-09T13:20:00",
  },
]

export function ManageProjectsTable({ tableName }: { tableName: string }) {
  const { theme } = useThemeStore()

  const [statusFilter] = useState("all")
  const [categoryFilter] = useState("all")
  const [areaSort] = useState<"asc" | "desc" | "none">("none")

  const filteredData = useMemo(() => {
    let data = [...mockData]

    if (statusFilter !== "all") {
      data = data.filter(
        grievance => grievance.status === statusFilter
      )
    }

    if (categoryFilter !== "all") {
      data = data.filter(
        grievance => grievance.categoryName === categoryFilter
      )
    }

    if (areaSort === "asc") {
      data.sort((a, b) =>
        a.blockName.localeCompare(b.blockName)
      )
    } else if (areaSort === "desc") {
      data.sort((a, b) =>
        b.blockName.localeCompare(a.blockName)
      )
    }

    return data
  }, [statusFilter, categoryFilter, areaSort])

  return (
    <div
      className="w-full rounded-lg border shadow-sm"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <div className="p-6 border-b" style={{ borderColor: theme.border }}>
        <h2
          className="text-xl font-bold"
          style={{ color: theme.textPrimary }}
        >
          All {tableName}
        </h2>
      </div>

      <div className="p-6">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}
