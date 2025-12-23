// app/(roles)/admin-user/manage-projects/tables/manage-projects-table.tsx
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
    status: "Open",
    assignedTo: "MLA Office",
    createdAt: "2025-01-10T10:30:00",
  },
  {
    grievanceNumber: "GRV-2025-0002",
    userName: "Sita Devi",
    mobileNumber: "9123456780",
    categoryName: "Water Supply",
    blockName: "East Block",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Field Staff",
    createdAt: "2025-01-12T14:15:00",
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
  },
]


export function ManageProjectsTable() {
  const { theme } = useThemeStore()

  // ✅ INTERNAL FILTER STATE
  const [statusFilter] = useState("all")
  const [categoryFilter] = useState("all")
  const [areaSort] = useState<"asc" | "desc" | "none">("none")

  const filteredData = useMemo(() => {
    let data = [...mockData]

    if (statusFilter !== "all") {
      data = data.filter(project => project.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      data = data.filter(project => project.category === categoryFilter)
    }

    if (areaSort === "asc") {
      data.sort((a, b) => a.area.localeCompare(b.area))
    } else if (areaSort === "desc") {
      data.sort((a, b) => b.area.localeCompare(a.area))
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
          All Projects
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: theme.textTertiary }}
        >
          {filteredData.length}{" "}
          {filteredData.length === 1 ? "project" : "projects"} found
        </p>
      </div>

      <div className="p-6">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}
