// components/mla-dashboard/manage-polls/publish-actions/table/publish-actions-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type PublishAction } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: PublishAction[] = [
  {
    sl: 1,
    id: "POLL-2024-003",
    pollTitle: "Priority for healthcare facility improvements?",
    totalVotes: 5120,
    winningOption: "Upgrade PHC Infrastructure (58%)",
    actionTaken: "Budget allocated for PHC renovation in Hatapada - ₹1.15 Cr sanctioned",
    publishedDate: "2024-12-16",
    status: "In Progress",
  },
  {
    sl: 2,
    id: "POLL-2023-015",
    pollTitle: "Water supply timing preference for urban areas?",
    totalVotes: 3845,
    winningOption: "Morning 6-8 AM & Evening 6-8 PM (72%)",
    actionTaken: "Water supply schedule adjusted across all urban wards",
    publishedDate: "2024-11-20",
    status: "Implemented",
  },
  {
    sl: 3,
    id: "POLL-2023-012",
    pollTitle: "Street light coverage expansion areas?",
    totalVotes: 4120,
    winningOption: "Colony Areas & Village Roads (65%)",
    actionTaken: "LED installation completed in Nuagaon - 150 new lights installed",
    publishedDate: "2024-10-15",
    status: "Implemented",
  },
  {
    sl: 4,
    id: "POLL-2024-001",
    pollTitle: "Should we prioritize road development in Badakotha area?",
    totalVotes: 4250,
    winningOption: "Yes - Immediate Action Required (78%)",
    actionTaken: "Road construction project initiated - Expected completion June 2025",
    publishedDate: "2024-12-20",
    status: "Planned",
  },
  {
    sl: 5,
    id: "POLL-2024-006",
    pollTitle: "Sanitation service timing preference?",
    totalVotes: 2845,
    winningOption: "Early Morning Collection (6-8 AM) - 64%",
    actionTaken: "Revised sanitation schedule implemented in all GPs",
    publishedDate: "2024-12-22",
    status: "Implemented",
  },
]

export function PublishActionsTable() {
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