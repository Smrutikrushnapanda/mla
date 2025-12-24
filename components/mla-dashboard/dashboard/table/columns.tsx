// components/mla-dashboard/dashboard/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Grievance = {
  id: string
  citizenName: string
  category: string
  subject: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "In Progress" | "Under Review" | "Resolved"
  submittedDate: string
  assignedTo: string
}

export const columns: ColumnDef<Grievance>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Sl#
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "citizenName",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Citizen Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Category
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },
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
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Priority
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      const colors = {
        Critical: "bg-red-100 text-red-800 border border-red-300",
        High: "bg-orange-100 text-orange-800 border border-orange-300",
        Medium: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        Low: "bg-blue-100 text-blue-800 border border-blue-300"
      }
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colors[priority as keyof typeof colors]}`}>
          {priority}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const colors = {
        Resolved: "bg-green-500",
        "In Progress": "bg-blue-500",
        "Under Review": "bg-yellow-500",
        Pending: "bg-orange-500"
      }
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md text-white ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Assigned To
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "submittedDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("submittedDate"))
      return date.toLocaleDateString("en-IN", { 
        day: "2-digit",
        month: "short", 
        year: "numeric" 
      })
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Action</div>,
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="sm" className="h-8">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]