"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"

export type LogReport = {
  id: string
  timestamp: string
  userName: string
  userRole: "Admin" | "MLA" | "MLA Staff" | "Citizen"
  action: string
  module: "Users" | "Grievances" | "Projects" | "Budget" | "Schemes" | "Auth" | "System"
  ipAddress: string
  status: "Success" | "Failed" | "Warning"
  description: string
}

export const columns: ColumnDef<LogReport>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium text-sm">{row.getValue("timestamp")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium text-sm">{row.getValue("userName")}</p>
          <p className="text-xs text-gray-500">{row.original.userRole}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <span className="font-medium text-sm">{row.getValue("action")}</span>
      )
    },
  },
  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => {
      const module = row.getValue("module") as string
      const moduleColors: Record<string, string> = {
        Users: "bg-blue-50 text-blue-700 border-blue-200",
        Grievances: "bg-orange-50 text-orange-700 border-orange-200",
        Projects: "bg-purple-50 text-purple-700 border-purple-200",
        Budget: "bg-green-50 text-green-700 border-green-200",
        Schemes: "bg-cyan-50 text-cyan-700 border-cyan-200",
        Auth: "bg-indigo-50 text-indigo-700 border-indigo-200",
        System: "bg-gray-50 text-gray-700 border-gray-200",
      }
      return (
        <Badge variant="outline" className={moduleColors[module]}>
          {module}
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
        Success: { 
          class: "bg-green-50 text-green-700 border-green-200", 
          dot: "bg-green-500" 
        },
        Failed: { 
          class: "bg-red-50 text-red-700 border-red-200", 
          dot: "bg-red-500" 
        },
        Warning: { 
          class: "bg-yellow-50 text-yellow-700 border-yellow-200", 
          dot: "bg-yellow-500" 
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="max-w-[300px]">
          <p className="text-sm truncate">{row.getValue("description")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-mono text-gray-600">
          {row.getValue("ipAddress")}
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
            alert(`View log details:`)
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
        </Button>
      )
    },
  },
]