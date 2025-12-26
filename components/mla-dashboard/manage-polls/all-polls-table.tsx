// components/mla-dashboard/manage-polls/all-polls-table.tsx
"use client"

import { DataTable } from "./all-polls/table/data-table"
import { columns, type Poll } from "./all-polls/table/columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: Poll[] = [
  {
    sl: 1,
    id: "POLL-2024-001",
    pollTitle: "Should we prioritize road development in Badakotha area?",
    category: "Local Development",
    totalVotes: 4250,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    status: "Active",
  },
  {
    sl: 2,
    id: "POLL-2024-002",
    pollTitle: "Which government scheme needs better implementation?",
    category: "Government Schemes",
    totalVotes: 3890,
    startDate: "2024-12-10",
    endDate: "2024-12-25",
    status: "Active",
  },
  {
    sl: 3,
    id: "POLL-2024-003",
    pollTitle: "Priority for healthcare facility improvements?",
    category: "Healthcare",
    totalVotes: 5120,
    startDate: "2024-11-15",
    endDate: "2024-12-15",
    status: "Completed",
  },
  {
    sl: 4,
    id: "POLL-2024-004",
    pollTitle: "Should we increase school infrastructure budget?",
    category: "Education",
    totalVotes: 0,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "Scheduled",
  },
  {
    sl: 5,
    id: "POLL-2024-005",
    pollTitle: "Water supply improvement areas - vote for your locality",
    category: "Public Services",
    totalVotes: 0,
    startDate: "2024-12-20",
    endDate: "2024-12-30",
    status: "Draft",
  },
]

export function AllPollsTable() {
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