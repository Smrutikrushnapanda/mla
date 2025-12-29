// components/mla-dashboard/project-management/table/projects-table.tsx
"use client"

import { DataTable } from "./data-table"
import { createColumns, type Project } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: Project[] = [
  {
    sl: 1,
    id: "PRJ-2024-001",
    projectName: "Road Construction from Badakotha to Korei Market",
    category: "Road Infrastructure",
    department: "Public Works",
    location: "Badakotha",
    estimatedBudget: 8500000, // ₹85 Lakhs
    sanctionedBudget: 8000000, // ₹80 Lakhs
    expenditure: 6400000, // ₹64 Lakhs
    startDate: "2024-01-15",
    expectedEndDate: "2024-06-30",
    progress: 80,
    status: "In Progress",
    priority: "High",
  },
  {
    sl: 2,
    id: "PRJ-2024-002",
    projectName: "Installation of LED Street Lights in Nuagaon",
    category: "Street Lighting",
    department: "Rural Development",
    location: "Nuagaon",
    estimatedBudget: 2500000, // ₹25 Lakhs
    sanctionedBudget: 2500000, // ₹25 Lakhs
    expenditure: 2500000, // ₹25 Lakhs
    startDate: "2024-02-01",
    expectedEndDate: "2024-04-30",
    progress: 100,
    status: "Completed",
    priority: "Medium",
  },
  {
    sl: 3,
    id: "PRJ-2024-003",
    projectName: "Primary Health Center Renovation - Hatapada",
    category: "Primary Health Centers",
    department: "Health & Family Welfare",
    location: "Hatapada",
    estimatedBudget: 12000000, // ₹1.2 Cr
    sanctionedBudget: 11500000, // ₹1.15 Cr
    expenditure: 5750000, // ₹57.5 Lakhs
    startDate: "2024-03-10",
    expectedEndDate: "2024-12-31",
    progress: 50,
    status: "In Progress",
    priority: "Critical",
  },
  {
    sl: 4,
    id: "PRJ-2024-004",
    projectName: "Irrigation Canal Development - Jharbandh",
    category: "Irrigation Projects",
    department: "Water Resources",
    location: "Jharbandh",
    estimatedBudget: 15000000, // ₹1.5 Cr
    sanctionedBudget: 14000000, // ₹1.4 Cr
    expenditure: 4200000, // ₹42 Lakhs
    startDate: "2024-04-01",
    expectedEndDate: "2025-03-31",
    progress: 30,
    status: "In Progress",
    priority: "High",
  },
  {
    sl: 5,
    id: "PRJ-2024-005",
    projectName: "School Building Construction - Bansapal",
    category: "School Infrastructure",
    department: "Education",
    location: "Bansapal",
    estimatedBudget: 18000000, // ₹1.8 Cr
    sanctionedBudget: 17500000, // ₹1.75 Cr
    expenditure: 0,
    startDate: "2024-07-01",
    expectedEndDate: "2025-06-30",
    progress: 0,
    status: "Planned",
    priority: "High",
  },
  {
    sl: 6,
    id: "PRJ-2024-006",
    projectName: "Water Supply Pipeline - Telkoi",
    category: "Water Supply & Sanitation",
    department: "Water Resources",
    location: "Telkoi",
    estimatedBudget: 9500000, // ₹95 Lakhs
    sanctionedBudget: 9000000, // ₹90 Lakhs
    expenditure: 4500000, // ₹45 Lakhs
    startDate: "2024-02-15",
    expectedEndDate: "2024-08-31",
    progress: 50,
    status: "On Hold",
    priority: "Critical",
  },
  {
    sl: 7,
    id: "PRJ-2024-007",
    projectName: "Agricultural Equipment Distribution",
    category: "Agricultural Support",
    department: "Agriculture",
    location: "Ghasipura",
    estimatedBudget: 4500000, // ₹45 Lakhs
    sanctionedBudget: 4500000, // ₹45 Lakhs
    expenditure: 4500000, // ₹45 Lakhs
    startDate: "2024-01-10",
    expectedEndDate: "2024-03-31",
    progress: 100,
    status: "Completed",
    priority: "Medium",
  },
  {
    sl: 8,
    id: "PRJ-2024-008",
    projectName: "Bridge Construction over River - Korei Market",
    category: "Road Infrastructure",
    department: "Public Works",
    location: "Korei Market",
    estimatedBudget: 25000000, // ₹2.5 Cr
    sanctionedBudget: 24000000, // ₹2.4 Cr
    expenditure: 7200000, // ₹72 Lakhs
    startDate: "2024-05-01",
    expectedEndDate: "2025-12-31",
    progress: 30,
    status: "In Progress",
    priority: "Critical",
  },
  {
    sl: 9,
    id: "PRJ-2024-009",
    projectName: "Community Hall Construction - Badakotha",
    category: "School Infrastructure",
    department: "Rural Development",
    location: "Badakotha",
    estimatedBudget: 6000000,
    sanctionedBudget: 5800000,
    expenditure: 2900000,
    startDate: "2024-03-15",
    expectedEndDate: "2024-11-30",
    progress: 50,
    status: "In Progress",
    priority: "Medium",
  },
  {
    sl: 10,
    id: "PRJ-2024-010",
    projectName: "Drainage System Improvement - Nuagaon",
    category: "Water Supply & Sanitation",
    department: "Public Works",
    location: "Nuagaon",
    estimatedBudget: 7500000,
    sanctionedBudget: 7200000,
    expenditure: 3600000,
    startDate: "2024-04-20",
    expectedEndDate: "2024-10-31",
    progress: 50,
    status: "In Progress",
    priority: "High",
  },
  {
    sl: 11,
    id: "PRJ-2024-011",
    projectName: "Solar Panel Installation - Schools",
    category: "School Infrastructure",
    department: "Education",
    location: "Telkoi",
    estimatedBudget: 3500000,
    sanctionedBudget: 3500000,
    expenditure: 3500000,
    startDate: "2024-01-05",
    expectedEndDate: "2024-03-15",
    progress: 100,
    status: "Completed",
    priority: "Low",
  },
  {
    sl: 12,
    id: "PRJ-2024-012",
    projectName: "Veterinary Hospital Upgrade - Jharbandh",
    category: "Primary Health Centers",
    department: "Health & Family Welfare",
    location: "Jharbandh",
    estimatedBudget: 5500000,
    sanctionedBudget: 5200000,
    expenditure: 1040000,
    startDate: "2024-06-01",
    expectedEndDate: "2025-01-31",
    progress: 20,
    status: "Planned",
    priority: "Medium",
  },
  {
    sl: 13,
    id: "PRJ-2024-013",
    projectName: "Sports Complex Development - Bansapal",
    category: "School Infrastructure",
    department: "Rural Development",
    location: "Bansapal",
    estimatedBudget: 12000000,
    sanctionedBudget: 11500000,
    expenditure: 0,
    startDate: "2024-08-01",
    expectedEndDate: "2025-07-31",
    progress: 0,
    status: "Planned",
    priority: "Low",
  },
  {
    sl: 14,
    id: "PRJ-2024-014",
    projectName: "Market Yard Modernization - Ghasipura",
    category: "Agricultural Support",
    department: "Agriculture",
    location: "Ghasipura",
    estimatedBudget: 8000000,
    sanctionedBudget: 7800000,
    expenditure: 5460000,
    startDate: "2024-02-10",
    expectedEndDate: "2024-09-30",
    progress: 70,
    status: "In Progress",
    priority: "High",
  },
  {
    sl: 15,
    id: "PRJ-2024-015",
    projectName: "Public Library Construction - Hatapada",
    category: "School Infrastructure",
    department: "Education",
    location: "Hatapada",
    estimatedBudget: 4000000,
    sanctionedBudget: 3800000,
    expenditure: 1900000,
    startDate: "2024-03-25",
    expectedEndDate: "2024-12-15",
    progress: 50,
    status: "In Progress",
    priority: "Medium",
  },
]

export function ProjectsTable({ onView }: { onView: (project: Project) => void }) {
  const { theme } = useThemeStore()
  const columns = createColumns(onView)

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