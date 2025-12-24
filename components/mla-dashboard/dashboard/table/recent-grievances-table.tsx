// components/mla-dashboard/dashboard/table/recent-grievances-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type Grievance } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: Grievance[] = [
  { 
    id: "1", 
    citizenName: "Rajesh Kumar Patra", 
    category: "Water Supply", 
    subject: "No water supply for 3 days in Badakotha village",
    priority: "High", 
    status: "In Progress", 
    submittedDate: "2024-12-20",
    assignedTo: "Santosh Behera"
  },
  { 
    id: "2", 
    citizenName: "Sarita Nayak", 
    category: "Road Repair", 
    subject: "Damaged road near Korei Market affecting vehicles",
    priority: "Critical", 
    status: "Pending", 
    submittedDate: "2024-12-21",
    assignedTo: "Prakash Jena"
  },
  { 
    id: "3", 
    citizenName: "Biswajit Sahoo", 
    category: "Electricity", 
    subject: "Frequent power cuts in evening hours",
    priority: "Medium", 
    status: "Resolved", 
    submittedDate: "2024-12-18",
    assignedTo: "Anita Mishra"
  },
  { 
    id: "4", 
    citizenName: "Manjulata Swain", 
    category: "Sanitation", 
    subject: "Garbage not collected from GP office area",
    priority: "High", 
    status: "In Progress", 
    submittedDate: "2024-12-19",
    assignedTo: "Ramesh Das"
  },
  { 
    id: "5", 
    citizenName: "Pradeep Mohanty", 
    category: "Street Light", 
    subject: "Street lights not working in Hatapada",
    priority: "Medium", 
    status: "Pending", 
    submittedDate: "2024-12-22",
    assignedTo: "Sujata Panda"
  },
  { 
    id: "6", 
    citizenName: "Sunita Barik", 
    category: "Health", 
    subject: "PHC requires additional medical staff",
    priority: "Critical", 
    status: "Under Review", 
    submittedDate: "2024-12-17",
    assignedTo: "Dr. Amit Tripathy"
  },
  { 
    id: "7", 
    citizenName: "Ashok Parida", 
    category: "Education", 
    subject: "School building needs repair before monsoon",
    priority: "High", 
    status: "Pending", 
    submittedDate: "2024-12-21",
    assignedTo: "Lipika Mohapatra"
  },
  { 
    id: "8", 
    citizenName: "Mamata Rout", 
    category: "Pension", 
    subject: "Old age pension payment delayed",
    priority: "Medium", 
    status: "Resolved", 
    submittedDate: "2024-12-15",
    assignedTo: "Bijay Dash"
  },
]

export function RecentGrievancesTable() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="w-full rounded-lg border shadow-lg p-6"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 
          className="text-2xl font-bold"
          style={{ color: theme.textPrimary }}
        >
          Recent Grievances
        </h2>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}