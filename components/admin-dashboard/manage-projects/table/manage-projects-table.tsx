// app/(roles)/admin-user/manage-projects/tables/manage-projects-table.tsx
"use client"

import { useMemo } from "react"
import { DataTable } from "./data-table"
import { columns, Project } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const mockData: Project[] = [
  {
    id: 1,
    name: "Highway Expansion Project",
    description: "Expansion of main highway connecting two cities",
    category: "Infrastructure",
    area: "North District",
    budget: 15000000,
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    progress: 45,
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Primary School Construction",
    description: "New primary school building with modern facilities",
    category: "Education",
    area: "East Village",
    budget: 5000000,
    status: "Planning",
    startDate: "2024-06-01",
    endDate: "2025-03-31",
    progress: 15,
    color: "#10b981"
  },
  {
    id: 3,
    name: "Community Health Center",
    description: "Upgraded health center with emergency services",
    category: "Healthcare",
    area: "South District",
    budget: 8000000,
    status: "Completed",
    startDate: "2023-03-01",
    endDate: "2024-02-28",
    progress: 100,
    color: "#ef4444"
  },
  {
    id: 4,
    name: "Irrigation System Upgrade",
    description: "Modern irrigation system for agricultural land",
    category: "Agriculture",
    area: "West Region",
    budget: 6000000,
    status: "In Progress",
    startDate: "2024-02-15",
    endDate: "2024-12-31",
    progress: 60,
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Water Treatment Plant",
    description: "New water treatment facility for clean drinking water",
    category: "Water Supply",
    area: "Central Area",
    budget: 12000000,
    status: "In Progress",
    startDate: "2024-04-01",
    endDate: "2025-09-30",
    progress: 35,
    color: "#06b6d4"
  },
  {
    id: 6,
    name: "Park Development",
    description: "Community park with green spaces and playground",
    category: "Environment",
    area: "North District",
    budget: 3000000,
    status: "Planning",
    startDate: "2024-08-01",
    endDate: "2025-01-31",
    progress: 10,
    color: "#22c55e"
  },
  {
    id: 7,
    name: "Bridge Construction",
    description: "New bridge over river for better connectivity",
    category: "Infrastructure",
    area: "East Village",
    budget: 20000000,
    status: "Planning",
    startDate: "2024-10-01",
    endDate: "2026-03-31",
    progress: 5,
    color: "#3b82f6"
  },
  {
    id: 8,
    name: "Digital Library Setup",
    description: "Modern digital library with computer facilities",
    category: "Education",
    area: "South District",
    budget: 2000000,
    status: "Completed",
    startDate: "2023-09-01",
    endDate: "2024-01-15",
    progress: 100,
    color: "#10b981"
  },
]

interface ManageProjectsTableProps {
  statusFilter: string
  categoryFilter: string
  areaSort: string
}

export function ManageProjectsTable({ 
  statusFilter, 
  categoryFilter, 
  areaSort 
}: ManageProjectsTableProps) {
  const { theme } = useThemeStore()

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...mockData]

    // Apply status filter
    if (statusFilter !== "all") {
      data = data.filter(project => project.status === statusFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      data = data.filter(project => project.category === categoryFilter)
    }

    // Apply area sorting
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
          {filteredData.length} {filteredData.length === 1 ? 'project' : 'projects'} found
        </p>
      </div>

      <div className="p-6">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}