// components/mla-dashboard/manage-category/poll-category/table/poll-category-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type PollCategory } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: PollCategory[] = [
  {
    sl: 1,
    id: "POLL-CAT-001",
    categoryName: "Local Development",
    description: "Polls related to local infrastructure and development priorities",
    totalPolls: 24,
    activePolls: 8,
    completedPolls: 16,
    totalVotes: 12450,
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    sl: 2,
    id: "POLL-CAT-002",
    categoryName: "Government Schemes",
    description: "Citizen feedback on government welfare schemes",
    totalPolls: 18,
    activePolls: 5,
    completedPolls: 13,
    totalVotes: 9830,
    status: "Active",
    createdDate: "2024-02-10",
  },
  {
    sl: 3,
    id: "POLL-CAT-003",
    categoryName: "Public Services",
    description: "Quality and accessibility of public services",
    totalPolls: 22,
    activePolls: 7,
    completedPolls: 15,
    totalVotes: 11250,
    status: "Active",
    createdDate: "2024-02-20",
  },
  {
    sl: 4,
    id: "POLL-CAT-004",
    categoryName: "Legislative Issues",
    description: "Views on proposed legislation and policy changes",
    totalPolls: 15,
    activePolls: 4,
    completedPolls: 11,
    totalVotes: 7650,
    status: "Active",
    createdDate: "2024-03-05",
  },
  {
    sl: 5,
    id: "POLL-CAT-005",
    categoryName: "Healthcare",
    description: "Public health initiatives and medical facilities",
    totalPolls: 12,
    activePolls: 3,
    completedPolls: 9,
    totalVotes: 6420,
    status: "Active",
    createdDate: "2024-03-18",
  },
  {
    sl: 6,
    id: "POLL-CAT-006",
    categoryName: "Education",
    description: "School infrastructure and quality of education",
    totalPolls: 16,
    activePolls: 5,
    completedPolls: 11,
    totalVotes: 8340,
    status: "Active",
    createdDate: "2024-04-02",
  },
  {
    sl: 7,
    id: "POLL-CAT-007",
    categoryName: "Agriculture & Farming",
    description: "Support for farmers and agricultural development",
    totalPolls: 14,
    activePolls: 4,
    completedPolls: 10,
    totalVotes: 7120,
    status: "Active",
    createdDate: "2024-04-15",
  },
  {
    sl: 8,
    id: "POLL-CAT-008",
    categoryName: "Women & Child Welfare",
    description: "Programs for women empowerment and child development",
    totalPolls: 10,
    activePolls: 2,
    completedPolls: 8,
    totalVotes: 5240,
    status: "Inactive",
    createdDate: "2024-05-01",
  },
  {
    sl: 9,
    id: "POLL-CAT-009",
    categoryName: "Environment & Sanitation",
    description: "Waste management and environmental conservation",
    totalPolls: 13,
    activePolls: 4,
    completedPolls: 9,
    totalVotes: 6890,
    status: "Active",
    createdDate: "2024-05-20",
  },
  {
    sl: 10,
    id: "POLL-CAT-010",
    categoryName: "Employment & Livelihood",
    description: "Job creation and skill development programs",
    totalPolls: 11,
    activePolls: 3,
    completedPolls: 8,
    totalVotes: 5670,
    status: "Active",
    createdDate: "2024-06-05",
  },
]

export function PollCategoryTable() {
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