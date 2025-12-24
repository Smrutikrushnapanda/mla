// components/mla-dashboard/grievance-category/table/grievance-category-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type GrievanceCategory } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: GrievanceCategory[] = [
  {
    sl: 1,
    id: "GRV-CAT-001",
    categoryName: "Water Supply",
    description: "Issues related to water supply and distribution",
    department: "Water Resources",
    totalGrievances: 145,
    pendingGrievances: 32,
    resolvedGrievances: 113,
    avgResolutionTime: "4.2 days",
    priority: "High",
    status: "Active",
  },
  {
    sl: 2,
    id: "GRV-CAT-002",
    categoryName: "Road Repair",
    description: "Damaged roads, potholes, and maintenance issues",
    department: "Public Works",
    totalGrievances: 189,
    pendingGrievances: 45,
    resolvedGrievances: 144,
    avgResolutionTime: "6.8 days",
    priority: "Critical",
    status: "Active",
  },
  {
    sl: 3,
    id: "GRV-CAT-003",
    categoryName: "Electricity",
    description: "Power cuts, faulty connections, and billing issues",
    department: "Electricity",
    totalGrievances: 167,
    pendingGrievances: 28,
    resolvedGrievances: 139,
    avgResolutionTime: "3.5 days",
    priority: "High",
    status: "Active",
  },
  {
    sl: 4,
    id: "GRV-CAT-004",
    categoryName: "Sanitation",
    description: "Garbage collection and public cleanliness",
    department: "Sanitation",
    totalGrievances: 128,
    pendingGrievances: 18,
    resolvedGrievances: 110,
    avgResolutionTime: "2.8 days",
    priority: "Medium",
    status: "Active",
  },
  {
    sl: 5,
    id: "GRV-CAT-005",
    categoryName: "Street Light",
    description: "Non-functional or damaged street lights",
    department: "Public Works",
    totalGrievances: 95,
    pendingGrievances: 12,
    resolvedGrievances: 83,
    avgResolutionTime: "2.1 days",
    priority: "Medium",
    status: "Active",
  },
  {
    sl: 6,
    id: "GRV-CAT-006",
    categoryName: "Health",
    description: "PHC services, medical staff, and health facilities",
    department: "Health & Family Welfare",
    totalGrievances: 112,
    pendingGrievances: 24,
    resolvedGrievances: 88,
    avgResolutionTime: "5.3 days",
    priority: "Critical",
    status: "Active",
  },
  {
    sl: 7,
    id: "GRV-CAT-007",
    categoryName: "Education",
    description: "School infrastructure and teaching staff issues",
    department: "Education",
    totalGrievances: 87,
    pendingGrievances: 15,
    resolvedGrievances: 72,
    avgResolutionTime: "4.7 days",
    priority: "High",
    status: "Active",
  },
  {
    sl: 8,
    id: "GRV-CAT-008",
    categoryName: "Pension",
    description: "Pension payment delays and related issues",
    department: "Social Welfare",
    totalGrievances: 76,
    pendingGrievances: 8,
    resolvedGrievances: 68,
    avgResolutionTime: "3.2 days",
    priority: "Medium",
    status: "Active",
  },
  {
    sl: 9,
    id: "GRV-CAT-009",
    categoryName: "Drainage",
    description: "Blocked drains and waterlogging issues",
    department: "Public Works",
    totalGrievances: 64,
    pendingGrievances: 10,
    resolvedGrievances: 54,
    avgResolutionTime: "5.1 days",
    priority: "Medium",
    status: "Active",
  },
  {
    sl: 10,
    id: "GRV-CAT-010",
    categoryName: "Land Records",
    description: "Land mutation and record correction issues",
    department: "Revenue",
    totalGrievances: 43,
    pendingGrievances: 6,
    resolvedGrievances: 37,
    avgResolutionTime: "7.2 days",
    priority: "Low",
    status: "Inactive",
  },
]

export function GrievanceCategoryTable() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="w-full rounded-lg border shadow-lg p-6"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <DataTable columns={columns} data={data} />
    </div>
  )
}