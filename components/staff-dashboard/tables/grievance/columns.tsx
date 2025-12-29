// components/mla-dashboard/grievance-management/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Forward, Edit, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useThemeStore } from "@/store/useThemeStore"

/* ============================
   Grievance Type
============================ */
export type Grievance = {
  sl: number
  id: string
  citizenName: string
  citizenId: string
  phone: string
  category: string
  subject: string
  location: string
  assignedDept: string
  status: "Pending" | "Forwarded" | "In Progress" | "Resolved" | "On Hold"
  assignedTo: string
  registrationDate: string
  lastUpdated: string
}

/* ============================
   Actions Cell
============================ */
const ActionsCell = ({ grievance, onView }: { grievance: Grievance; onView: (grievance: Grievance) => void }) => {
  const { theme } = useThemeStore()

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="border shadow-lg"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        >
          <DropdownMenuLabel style={{ color: theme.textPrimary }}>
            Actions
          </DropdownMenuLabel>

          <DropdownMenuItem 
            className="cursor-pointer hover:bg-opacity-10" 
            onClick={() => onView(grievance)}
            style={{ color: theme.textPrimary }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer hover:bg-opacity-10"
            style={{ color: theme.textPrimary }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update Status
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer hover:bg-opacity-10"
            style={{ color: theme.textPrimary }}
          >
            <Forward className="mr-2 h-4 w-4" />
            Assign to Department
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem 
            className="cursor-pointer hover:bg-opacity-10"
            style={{ color: theme.textPrimary }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* ============================
   Table Columns
============================ */
export const createColumns = (onView: (grievance: Grievance) => void): ColumnDef<Grievance>[] => [
  /* 🔢 SL COLUMN */
  {
    accessorKey: "sl",
    header: () => <div className="text-center font-medium">SL</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium text-muted-foreground">
        {row.getValue("sl")}
      </div>
    ),
    enableSorting: false,
    size: 60,
  },

  /* 🆔 GRIEVANCE ID */
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Grievance ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 👤 CITIZEN NAME */
  {
    accessorKey: "citizenName",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Citizen Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("citizenName")}
      </div>
    ),
  },

  /* 🆔 CITIZEN ID */
  {
    accessorKey: "citizenId",
    header: "Citizen ID",
  },

  /* 📱 PHONE */
  {
    accessorKey: "phone",
    header: "Phone",
  },

  /* 🏷 CATEGORY */
  {
    accessorKey: "category",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Category
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 📝 SUBJECT */
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.getValue("subject") as string
      return (
        <div className="max-w-xs truncate" title={subject}>
          {subject}
        </div>
      )
    },
  },

  /* 📍 LOCATION */
  {
    accessorKey: "location",
    header: "Location",
  },

  /* 🏛 ASSIGNED DEPARTMENT */
  {
  accessorKey: "assignedDept",
  header: ({ column }) => (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-2 font-medium"
    >
      Assigned Dept.
      <ArrowUpDown className="h-4 w-4" />
    </button>
  ),
  cell: ({ row }) => {
    const dept = row.getValue("assignedDept") as string
    
    if (!dept || dept === "Not Assigned" || dept === "-") {
      return <span className="text-gray-400">-</span>
    }

    // Department-specific colors
    const deptColors: Record<string, string> = {
      "Public Works": "bg-blue-100 text-blue-800 border border-blue-300",
      "Water Resources": "bg-cyan-100 text-cyan-800 border border-cyan-300",
      "Health & Family Welfare": "bg-red-100 text-red-800 border border-red-300",
      "Education": "bg-green-100 text-green-800 border border-green-300",
      "Electricity": "bg-yellow-100 text-yellow-800 border border-yellow-300",
      "Sanitation": "bg-orange-100 text-orange-800 border border-orange-300",
      "Social Welfare": "bg-purple-100 text-purple-800 border border-purple-300",
      "Rural Development": "bg-indigo-100 text-indigo-800 border border-indigo-300",
    }

    const colorClass = deptColors[dept] || "bg-gray-100 text-gray-800 border border-gray-300"

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colorClass}`}>
        {dept}
      </span>
    )
  },
},

  /* ⚡ STATUS */
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Status
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const colors = {
        Pending: "bg-orange-500",
        Forwarded: "bg-blue-500",
        "In Progress": "bg-purple-500",
        Resolved: "bg-green-500",
        "On Hold": "bg-gray-500"
      }
      return (
        <span className={`px-2 py-1 text-xs rounded-md text-white ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      )
    },
  },

  /* 👥 ASSIGNED TO */
  {
    accessorKey: "assignedTo",
    header: "Assigned Staff",
  },

  /* 📅 REGISTRATION DATE */
  {
    accessorKey: "registrationDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Registered On
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("registrationDate"))
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    },
  },

  /* 🕐 LAST UPDATED */
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastUpdated"))
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    },
  },

  /* ⚙ ACTIONS */
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell grievance={row.original} onView={onView} />,
    enableHiding: false,
  },
]