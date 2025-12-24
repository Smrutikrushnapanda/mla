// components/mla-dashboard/user-manage/archived/archived-users-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type ArchivedUser } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: ArchivedUser[] = [
  { 
    sl: 1,
    id: "USR-2024-201", 
    name: "Kailash Pradhan", 
    email: "kailash.pradhan@gmail.com", 
    phone: "+91 9438991122",
    role: "Citizen",
    village: "Raisuan",
    gpName: "Raisuan GP",
    archivedDate: "2024-11-15",
    archivedBy: "Santosh Behera",
    reason: "User requested account deletion"
  },
  { 
    sl: 2,
    id: "USR-2024-202", 
    name: "Subash Mallick", 
    email: "subash.mallick@korei.gov.in", 
    phone: "+91 9437991234",
    role: "Staff", 
    designation: "Data Entry Operator",
    archivedDate: "2024-10-20",
    archivedBy: "Prakash Jena",
    reason: "Transferred to another constituency"
  },
  { 
    sl: 3,
    id: "USR-2024-203", 
    name: "Gitanjali Behera", 
    email: "gitanjali.behera@gmail.com", 
    phone: "+91 9438112244",
    role: "Citizen",
    village: "Pandapara",
    gpName: "Pandapara GP",
    archivedDate: "2024-09-12",
    archivedBy: "Anita Mishra",
    reason: "Duplicate account"
  },
  { 
    sl: 4,
    id: "USR-2024-204", 
    name: "Debendra Nath Sahoo", 
    email: "debendra.sahoo@korei.gov.in", 
    phone: "+91 9437223355",
    role: "Staff", 
    designation: "Field Assistant",
    archivedDate: "2024-08-30",
    archivedBy: "Santosh Behera",
    reason: "Resigned from position"
  },
  { 
    sl: 5,
    id: "USR-2024-205", 
    name: "Mina Patra", 
    email: "mina.patra@gmail.com", 
    phone: "+91 9438334466",
    role: "Citizen",
    village: "Suakati",
    gpName: "Suakati GP",
    archivedDate: "2024-11-28",
    archivedBy: "Ramesh Das",
    reason: "Relocated outside constituency"
  },
  { 
    sl: 6,
    id: "USR-2024-206", 
    name: "Rabindra Kumar Jena", 
    email: "rabindra.jena@gmail.com", 
    phone: "+91 9438445577",
    role: "Citizen",
    village: "Balijodi",
    gpName: "Balijodi GP",
    archivedDate: "2024-10-05",
    archivedBy: "Sujata Panda",
    reason: "Inactive for over 6 months"
  },
  { 
    sl: 7,
    id: "USR-2024-207", 
    name: "Laxmipriya Mohapatra", 
    email: "laxmi.mohapatra@korei.gov.in", 
    phone: "+91 9437556688",
    role: "Staff", 
    designation: "Office Assistant",
    archivedDate: "2024-09-18",
    archivedBy: "Prakash Jena",
    reason: "Contract period ended"
  },
  { 
    sl: 8,
    id: "USR-2024-208", 
    name: "Bharat Chandra Das", 
    email: "bharat.das@gmail.com", 
    phone: "+91 9438667799",
    role: "Citizen",
    village: "Joda",
    gpName: "Joda GP",
    archivedDate: "2024-11-10",
    archivedBy: "Bijay Dash",
    reason: "User account suspended for policy violation"
  },
]

export function ArchivedUsersTable() {
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
        <div>
          <h2 
            className="text-2xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Archived Users
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Users who have been archived from the system
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}