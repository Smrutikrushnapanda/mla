// components/mla-dashboard/manage-category/my-voice-category/table/my-voice-category-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type MyVoiceCategory } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: MyVoiceCategory[] = [
  {
    sl: 1,
    id: "VOICE-CAT-001",
    categoryName: "Local Development",
    description: "Questions related to local infrastructure and development projects",
    totalQuestions: 142,
    pendingQuestions: 28,
    answeredQuestions: 114,
    topVotedQuestions: 15,
    priority: "High",
    status: "Active",
    createdDate: "2024-01-10",
  },
  {
    sl: 2,
    id: "VOICE-CAT-002",
    categoryName: "Government Schemes",
    description: "Queries about welfare schemes and their implementation",
    totalQuestions: 189,
    pendingQuestions: 42,
    answeredQuestions: 147,
    topVotedQuestions: 22,
    priority: "Critical",
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    sl: 3,
    id: "VOICE-CAT-003",
    categoryName: "Public Services",
    description: "Questions about quality and accessibility of public services",
    totalQuestions: 167,
    pendingQuestions: 35,
    answeredQuestions: 132,
    topVotedQuestions: 18,
    priority: "High",
    status: "Active",
    createdDate: "2024-02-01",
  },
  {
    sl: 4,
    id: "VOICE-CAT-004",
    categoryName: "Legislative Issues",
    description: "Questions on proposed legislation and policy matters",
    totalQuestions: 94,
    pendingQuestions: 18,
    answeredQuestions: 76,
    topVotedQuestions: 12,
    priority: "Medium",
    status: "Active",
    createdDate: "2024-02-10",
  },
  {
    sl: 5,
    id: "VOICE-CAT-005",
    categoryName: "Healthcare",
    description: "Public health initiatives and medical facilities queries",
    totalQuestions: 128,
    pendingQuestions: 24,
    answeredQuestions: 104,
    topVotedQuestions: 16,
    priority: "Critical",
    status: "Active",
    createdDate: "2024-02-20",
  },
  {
    sl: 6,
    id: "VOICE-CAT-006",
    categoryName: "Education",
    description: "School infrastructure and quality of education concerns",
    totalQuestions: 115,
    pendingQuestions: 21,
    answeredQuestions: 94,
    topVotedQuestions: 14,
    priority: "High",
    status: "Active",
    createdDate: "2024-03-05",
  },
  {
    sl: 7,
    id: "VOICE-CAT-007",
    categoryName: "Agriculture & Farming",
    description: "Support for farmers and agricultural development questions",
    totalQuestions: 87,
    pendingQuestions: 15,
    answeredQuestions: 72,
    topVotedQuestions: 10,
    priority: "Medium",
    status: "Active",
    createdDate: "2024-03-15",
  },
  {
    sl: 8,
    id: "VOICE-CAT-008",
    categoryName: "Employment & Livelihood",
    description: "Job creation and skill development related questions",
    totalQuestions: 76,
    pendingQuestions: 12,
    answeredQuestions: 64,
    topVotedQuestions: 8,
    priority: "Medium",
    status: "Active",
    createdDate: "2024-04-01",
  },
  {
    sl: 9,
    id: "VOICE-CAT-009",
    categoryName: "Women & Child Welfare",
    description: "Programs for women empowerment and child development",
    totalQuestions: 65,
    pendingQuestions: 10,
    answeredQuestions: 55,
    topVotedQuestions: 7,
    priority: "High",
    status: "Active",
    createdDate: "2024-04-15",
  },
  {
    sl: 10,
    id: "VOICE-CAT-010",
    categoryName: "Others",
    description: "Miscellaneous questions not fitting other categories",
    totalQuestions: 43,
    pendingQuestions: 8,
    answeredQuestions: 35,
    topVotedQuestions: 4,
    priority: "Low",
    status: "Inactive",
    createdDate: "2024-05-01",
  },
]

export function MyVoiceCategoryTable() {
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