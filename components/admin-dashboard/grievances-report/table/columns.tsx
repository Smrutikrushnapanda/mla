"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"

export type GrievanceReport = {
  id: string
  grievanceId: string
  citizenName: string
  category: "Infrastructure" | "Healthcare" | "Education" | "Water Supply" | "Electricity" | "Other"
  subject: string
  priority: "High" | "Medium" | "Low"
  status: "Resolved" | "In Progress" | "Pending" | "Rejected"
  submittedDate: string
  resolvedDate: string | null
  assignedTo: string
  constituency: string
}

export const columns: ColumnDef<GrievanceReport>[] = [
  {
    accessorKey: "grievanceId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Grievance ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-semibold text-sm">{row.getValue("grievanceId")}</p>
          <p className="text-xs text-gray-500">{row.original.submittedDate}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "citizenName",
    header: "Citizen Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium text-sm">{row.getValue("citizenName")}</p>
          <p className="text-xs text-gray-500">{row.original.constituency}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px]">
          <p className="text-sm truncate">{row.getValue("subject")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const categoryColors: Record<string, string> = {
        Infrastructure: "bg-blue-50 text-blue-700 border-blue-200",
        Healthcare: "bg-red-50 text-red-700 border-red-200",
        Education: "bg-purple-50 text-purple-700 border-purple-200",
        "Water Supply": "bg-cyan-50 text-cyan-700 border-cyan-200",
        Electricity: "bg-yellow-50 text-yellow-700 border-yellow-200",
        Other: "bg-gray-50 text-gray-700 border-gray-200",
      }
      return (
        <Badge variant="outline" className={categoryColors[category]}>
          {category}
        </Badge>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      const priorityConfig: Record<string, string> = {
        High: "bg-red-50 text-red-700 border-red-200",
        Medium: "bg-orange-50 text-orange-700 border-orange-200",
        Low: "bg-green-50 text-green-700 border-green-200",
      }
      
      return (
        <Badge variant="outline" className={priorityConfig[priority]}>
          {priority}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusConfig: Record<string, { class: string; dot: string }> = {
        Resolved: { 
          class: "bg-green-50 text-green-700 border-green-200", 
          dot: "bg-green-500" 
        },
        "In Progress": { 
          class: "bg-orange-50 text-orange-700 border-orange-200", 
          dot: "bg-orange-500" 
        },
        Pending: { 
          class: "bg-red-50 text-red-700 border-red-200", 
          dot: "bg-red-500" 
        },
        Rejected: { 
          class: "bg-gray-50 text-gray-700 border-gray-200", 
          dot: "bg-gray-500" 
        },
      }
      const config = statusConfig[status]
      
      return (
        <Badge variant="outline" className={config.class}>
          <div className={`w-2 h-2 rounded-full ${config.dot} mr-1.5`}></div>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("assignedTo")}</span>
    },
  },
  {
    accessorKey: "resolvedDate",
    header: "Resolved Date",
    cell: ({ row }) => {
      const date = row.getValue("resolvedDate")
      return (
        <span className="text-sm text-white-600">
          {date || "—"}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3"
          onClick={() => {
            alert(`View grievance: ${row.original.id}`)
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
        </Button>
      )
    },
  },
]