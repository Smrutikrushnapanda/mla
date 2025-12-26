// components/mla-dashboard/project-category/table/project-category-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type ProjectCategory } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: ProjectCategory[] = [
  {
    sl: 1,
    id: "CAT-2024-001",
    categoryName: "Road Infrastructure",
    description: "Development and maintenance of roads and bridges",
    department: "Public Works",
    totalProjects: 15,
    activeProjects: 8,
    completedProjects: 7,
    totalBudget: 125000000, // ₹12.50 Cr
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    sl: 2,
    id: "CAT-2024-002",
    categoryName: "Water Supply & Sanitation",
    description: "Water supply schemes and sanitation facilities",
    department: "Water Resources",
    totalProjects: 22,
    activeProjects: 14,
    completedProjects: 8,
    totalBudget: 85000000, // ₹8.50 Cr
    status: "Active",
    createdDate: "2024-01-20",
  },
  {
    sl: 3,
    id: "CAT-2024-003",
    categoryName: "Primary Health Centers",
    description: "Construction and upgrading of PHCs",
    department: "Health & Family Welfare",
    totalProjects: 8,
    activeProjects: 5,
    completedProjects: 3,
    totalBudget: 65000000, // ₹6.50 Cr
    status: "Active",
    createdDate: "2024-02-05",
  },
  {
    sl: 4,
    id: "CAT-2024-004",
    categoryName: "School Infrastructure",
    description: "School building construction and renovation",
    department: "Education",
    totalProjects: 18,
    activeProjects: 10,
    completedProjects: 8,
    totalBudget: 95000000, // ₹9.50 Cr
    status: "Active",
    createdDate: "2024-02-12",
  },
  {
    sl: 5,
    id: "CAT-2024-005",
    categoryName: "Street Lighting",
    description: "Installation of LED street lights",
    department: "Rural Development",
    totalProjects: 12,
    activeProjects: 6,
    completedProjects: 6,
    totalBudget: 35000000, // ₹3.50 Cr
    status: "Active",
    createdDate: "2024-03-01",
  },
  {
    sl: 6,
    id: "CAT-2024-006",
    categoryName: "Irrigation Projects",
    description: "Canal development and lift irrigation",
    department: "Water Resources",
    totalProjects: 10,
    activeProjects: 7,
    completedProjects: 3,
    totalBudget: 110000000, // ₹11.00 Cr
    status: "Active",
    createdDate: "2024-03-15",
  },
  {
    sl: 7,
    id: "CAT-2024-007",
    categoryName: "Agricultural Support",
    description: "Farm mechanization and crop support",
    department: "Agriculture",
    totalProjects: 14,
    activeProjects: 9,
    completedProjects: 5,
    totalBudget: 42000000, // ₹4.20 Cr
    status: "Active",
    createdDate: "2024-04-02",
  },
  {
    sl: 8,
    id: "CAT-2024-008",
    categoryName: "Community Centers",
    description: "Construction of community halls and centers",
    department: "Rural Development",
    totalProjects: 6,
    activeProjects: 2,
    completedProjects: 4,
    totalBudget: 28000000, // ₹2.80 Cr
    status: "Inactive",
    createdDate: "2024-05-10",
  },
]

export function ProjectCategoryTable() {
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