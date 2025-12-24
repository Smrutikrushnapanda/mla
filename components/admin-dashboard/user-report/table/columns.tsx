"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"

export type UserReport = {
  id: string
  name: string
  email: string
  role: "Citizen" | "MLA Staff" | "MLA" | "Admin"
  status: "Active" | "Inactive" | "Suspended"
  registrationDate: string
  lastActive: string
  totalLogins: number
  grievances: number
  schemes: number
  activityTrend: "up" | "down" | "stable"
}

export const columns: ColumnDef<UserReport>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.getValue("name")}</p>
          <p className="text-xs text-gray-500">{row.original.email}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      const roleColors: Record<string, string> = {
        Citizen: "bg-blue-50 text-blue-700 border-blue-200",
        "MLA Staff": "bg-purple-50 text-purple-700 border-purple-200",
        MLA: "bg-indigo-50 text-indigo-700 border-indigo-200",
        Admin: "bg-gray-50 text-gray-700 border-gray-200",
      }
      return (
        <Badge variant="outline" className={roleColors[role]}>
          {role}
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
        Active: { 
          class: "bg-green-50 text-green-700 border-green-200", 
          dot: "bg-green-500" 
        },
        Inactive: { 
          class: "bg-gray-50 text-gray-700 border-gray-200", 
          dot: "bg-gray-400" 
        },
        Suspended: { 
          class: "bg-red-50 text-red-700 border-red-200", 
          dot: "bg-red-500" 
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
    accessorKey: "registrationDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("registrationDate")}</span>
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => {
      return <span className="text-sm text-gray-600">{row.getValue("lastActive")}</span>
    },
  },
  {
    accessorKey: "totalLogins",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Total Logins
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original
      const TrendIcon = user.activityTrend === "up" ? TrendingUp : 
                       user.activityTrend === "down" ? TrendingDown : null
      
      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{user.totalLogins}</span>
          {TrendIcon && (
            <TrendIcon 
              className={`h-3.5 w-3.5 ${
                user.activityTrend === "up" ? "text-green-600" : "text-red-600"
              }`} 
            />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "grievances",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Grievances
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium text-sm">
          {row.getValue("grievances")}
        </span>
      )
    },
  },
  {
    accessorKey: "schemes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Schemes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium text-sm">
          {row.getValue("schemes")}
        </span>
      )
    },
  },
]