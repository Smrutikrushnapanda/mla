// components/mla-dashboard/user-management/table/users-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type User } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: User[] = [
  // Staff Members
  { 
    sl: 1,
    id: "USR-2024-001", 
    name: "Santosh Behera", 
    email: "santosh.behera@korei.gov.in", 
    phone: "+91 9437123456",
    role: "Staff", 
    designation: "Block Development Officer",
    status: "Active", 
    joinedDate: "2024-01-15"
  },
  { 
    sl: 2,
    id: "USR-2024-002", 
    name: "Prakash Jena", 
    email: "prakash.jena@korei.gov.in", 
    phone: "+91 9437234567",
    role: "Staff", 
    designation: "Grievance Officer",
    status: "Active", 
    joinedDate: "2024-02-10"
  },
  { 
    sl: 3,
    id: "USR-2024-003", 
    name: "Anita Mishra", 
    email: "anita.mishra@korei.gov.in", 
    phone: "+91 9437345678",
    role: "Staff", 
    designation: "Project Coordinator",
    status: "Active", 
    joinedDate: "2024-01-20"
  },
  { 
    sl: 4,
    id: "USR-2024-004", 
    name: "Ramesh Das", 
    email: "ramesh.das@korei.gov.in", 
    phone: "+91 9437456789",
    role: "Staff", 
    designation: "Field Officer",
    status: "Active", 
    joinedDate: "2024-03-05"
  },
  { 
    sl: 5,
    id: "USR-2024-005", 
    name: "Sujata Panda", 
    email: "sujata.panda@korei.gov.in", 
    phone: "+91 9437567890",
    role: "Staff", 
    designation: "Admin Assistant",
    status: "Active", 
    joinedDate: "2024-02-28"
  },
  { 
    sl: 6,
    id: "USR-2024-006", 
    name: "Dr. Amit Tripathy", 
    email: "amit.tripathy@korei.gov.in", 
    phone: "+91 9437678901",
    role: "Staff", 
    designation: "Health Coordinator",
    status: "Active", 
    joinedDate: "2024-01-10"
  },
  { 
    sl: 7,
    id: "USR-2024-007", 
    name: "Lipika Mohapatra", 
    email: "lipika.mohapatra@korei.gov.in", 
    phone: "+91 9437789012",
    role: "Staff", 
    designation: "Education Officer",
    status: "Inactive", 
    joinedDate: "2024-04-12"
  },
  { 
    sl: 8,
    id: "USR-2024-008", 
    name: "Bijay Dash", 
    email: "bijay.dash@korei.gov.in", 
    phone: "+91 9437890123",
    role: "Staff", 
    designation: "Welfare Officer",
    status: "Active", 
    joinedDate: "2024-03-18"
  },

  // Citizens
  { 
    sl: 9,
    id: "USR-2024-101", 
    name: "Rajesh Kumar Patra", 
    email: "rajesh.patra@gmail.com", 
    phone: "+91 9438112233",
    role: "Citizen",
    village: "Badakotha",
    gpName: "Badakotha GP",
    status: "Active", 
    joinedDate: "2024-05-10"
  },
  { 
    sl: 10,
    id: "USR-2024-102", 
    name: "Sarita Nayak", 
    email: "sarita.nayak@gmail.com", 
    phone: "+91 9438223344",
    role: "Citizen",
    village: "Korei Market",
    gpName: "Korei GP",
    status: "Active", 
    joinedDate: "2024-06-15"
  },
  { 
    sl: 11,
    id: "USR-2024-103", 
    name: "Biswajit Sahoo", 
    email: "biswajit.sahoo@gmail.com", 
    phone: "+91 9438334455",
    role: "Citizen",
    village: "Nuagaon",
    gpName: "Nuagaon GP",
    status: "Active", 
    joinedDate: "2024-07-20"
  },
  { 
    sl: 12,
    id: "USR-2024-104", 
    name: "Manjulata Swain", 
    email: "manju.swain@gmail.com", 
    phone: "+91 9438445566",
    role: "Citizen",
    village: "Hatapada",
    gpName: "Hatapada GP",
    status: "Active", 
    joinedDate: "2024-08-05"
  },
  { 
    sl: 13,
    id: "USR-2024-105", 
    name: "Pradeep Mohanty", 
    email: "pradeep.mohanty@gmail.com", 
    phone: "+91 9438556677",
    role: "Citizen",
    village: "Jharbandh",
    gpName: "Jharbandh GP",
    status: "Active", 
    joinedDate: "2024-09-12"
  },
  { 
    sl: 14,
    id: "USR-2024-106", 
    name: "Sunita Barik", 
    email: "sunita.barik@gmail.com", 
    phone: "+91 9438667788",
    role: "Citizen",
    village: "Bansapal",
    gpName: "Bansapal GP",
    status: "Inactive", 
    joinedDate: "2024-10-08"
  },
  { 
    sl: 15,
    id: "USR-2024-107", 
    name: "Ashok Parida", 
    email: "ashok.parida@gmail.com", 
    phone: "+91 9438778899",
    role: "Citizen",
    village: "Telkoi",
    gpName: "Telkoi GP",
    status: "Active", 
    joinedDate: "2024-11-03"
  },
  { 
    sl: 16,
    id: "USR-2024-108", 
    name: "Mamata Rout", 
    email: "mamata.rout@gmail.com", 
    phone: "+91 9438889900",
    role: "Citizen",
    village: "Ghasipura",
    gpName: "Ghasipura GP",
    status: "Active", 
    joinedDate: "2024-11-25"
  },
]

export function UsersTable() {
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