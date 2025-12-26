// components/mla-dashboard/public-voice/archived-sessions/table/archived-sessions-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type ArchivedSession } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: ArchivedSession[] = [
  {
    sl: 1,
    id: "SES-2024-012",
    sessionTitle: "Healthcare & Education Q&A Session - December 2024",
    category: "Multiple Topics",
    questionsAnswered: 42,
    sessionDate: "2024-12-15",
    totalVotes: 8450,
    avgRating: 4.7,
  },
  {
    sl: 2,
    id: "SES-2024-011",
    sessionTitle: "Local Development Projects Discussion",
    category: "Local Development",
    questionsAnswered: 38,
    sessionDate: "2024-11-28",
    totalVotes: 7820,
    avgRating: 4.5,
  },
  {
    sl: 3,
    id: "SES-2024-010",
    sessionTitle: "Government Schemes & Benefits - November Session",
    category: "Government Schemes",
    questionsAnswered: 35,
    sessionDate: "2024-11-10",
    totalVotes: 6950,
    avgRating: 4.6,
  },
  {
    sl: 4,
    id: "SES-2024-009",
    sessionTitle: "Water Supply and Sanitation Issues",
    category: "Public Services",
    questionsAnswered: 28,
    sessionDate: "2024-10-22",
    totalVotes: 5630,
    avgRating: 4.3,
  },
  {
    sl: 5,
    id: "SES-2024-008",
    sessionTitle: "Agriculture Support Programs Discussion",
    category: "Government Schemes",
    questionsAnswered: 31,
    sessionDate: "2024-10-05",
    totalVotes: 6240,
    avgRating: 4.8,
  },
  {
    sl: 6,
    id: "SES-2024-007",
    sessionTitle: "Education Infrastructure & Teacher Recruitment",
    category: "Education",
    questionsAnswered: 26,
    sessionDate: "2024-09-18",
    totalVotes: 4890,
    avgRating: 4.4,
  },
  {
    sl: 7,
    id: "SES-2024-006",
    sessionTitle: "Healthcare Facilities Improvement Q&A",
    category: "Healthcare",
    questionsAnswered: 33,
    sessionDate: "2024-09-02",
    totalVotes: 7150,
    avgRating: 4.9,
  },
  {
    sl: 8,
    id: "SES-2024-005",
    sessionTitle: "Road Development & Connectivity",
    category: "Local Development",
    questionsAnswered: 29,
    sessionDate: "2024-08-15",
    totalVotes: 5980,
    avgRating: 4.2,
  },
  {
    sl: 9,
    id: "SES-2024-004",
    sessionTitle: "Monthly Public Voice Session - August",
    category: "Multiple Topics",
    questionsAnswered: 45,
    sessionDate: "2024-08-01",
    totalVotes: 9320,
    avgRating: 4.7,
  },
  {
    sl: 10,
    id: "SES-2024-003",
    sessionTitle: "Electricity Supply & Renewable Energy",
    category: "Public Services",
    questionsAnswered: 24,
    sessionDate: "2024-07-20",
    totalVotes: 4520,
    avgRating: 4.1,
  },
]

export function ArchivedSessionsTable() {
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