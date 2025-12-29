// components/mla-dashboard/public-voice/all-questions/table/all-questions-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type Question } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: Question[] = [
  {
    sl: 1,
    id: "QUE-2024-001",
    citizenName: "Rajesh Kumar Patra",
    question: "When will the new bridge construction in Korei Market be completed?",
    category: "Local Development",
    format: "Text",
    votes: 1245,
    submittedDate: "2024-12-20",
    status: "Pending",
  },
  {
    sl: 2,
    id: "QUE-2024-002",
    citizenName: "Sarita Nayak",
    question: "What steps are being taken to improve drinking water quality in our area?",
    category: "Public Services",
    format: "Audio",
    votes: 987,
    submittedDate: "2024-12-22",
    status: "Pending",
  },
  {
    sl: 3,
    id: "QUE-2024-003",
    citizenName: "Biswajit Sahoo",
    question: "How can I apply for the new farmer subsidy scheme announced last month?",
    category: "Government Schemes",
    format: "Text",
    votes: 856,
    submittedDate: "2024-12-18",
    status: "Answered",
  },
  {
    sl: 4,
    id: "QUE-2024-004",
    citizenName: "Manjulata Swain",
    question: "Why is the PHC in Hatapada still not operational after renovation?",
    category: "Healthcare",
    format: "Video",
    votes: 1520,
    submittedDate: "2024-12-21",
    status: "Pending",
  },
  {
    sl: 5,
    id: "QUE-2024-005",
    citizenName: "Pradeep Mohanty",
    question: "What is being done about frequent power cuts in rural areas?",
    category: "Public Services",
    format: "Text",
    votes: 742,
    submittedDate: "2024-12-19",
    status: "Answered",
  },
  {
    sl: 6,
    id: "QUE-2024-006",
    citizenName: "Sunita Barik",
    question: "Can we get more teachers for the high school in our village?",
    category: "Education",
    format: "Text",
    votes: 628,
    submittedDate: "2024-12-23",
    status: "Pending",
  },
  {
    sl: 7,
    id: "QUE-2024-007",
    citizenName: "Ashok Parida",
    question: "What is your stance on the new agricultural policy being discussed in the assembly?",
    category: "Legislative Issues",
    format: "Audio",
    votes: 1890,
    submittedDate: "2024-12-17",
    status: "Answered",
  },
  {
    sl: 8,
    id: "QUE-2024-008",
    citizenName: "Mamata Rout",
    question: "When will street lights be installed in colony roads?",
    category: "Local Development",
    format: "Text",
    votes: 543,
    submittedDate: "2024-12-24",
    status: "Pending",
  },
]

export function AllQuestionsTable() {
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