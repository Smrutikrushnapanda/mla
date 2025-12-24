"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export type ProjectReport = {
  id: string
  projectName: string
  category: "Infrastructure" | "Healthcare" | "Education" | "Water Supply" | "Agriculture" | "Other"
  constituency: string
  status: "Completed" | "In Progress" | "Delayed" | "Planned"
  startDate: string
  completionDate: string
  budget: string
  spent: string
  progress: number
  beneficiaries: number
}

export const columns: ColumnDef<ProjectReport>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="max-w-[250px]">
          <p className="font-medium truncate">{row.getValue("projectName")}</p>
          <p className="text-xs text-gray-500">{row.original.constituency}</p>
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
        Agriculture: "bg-green-50 text-green-700 border-green-200",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusConfig: Record<string, { class: string; dot: string }> = {
        Completed: { 
          class: "bg-green-50 text-green-700 border-green-200", 
          dot: "bg-green-500" 
        },
        "In Progress": { 
          class: "bg-orange-50 text-orange-700 border-orange-200", 
          dot: "bg-orange-500" 
        },
        Delayed: { 
          class: "bg-red-50 text-red-700 border-red-200", 
          dot: "bg-red-500" 
        },
        Planned: { 
          class: "bg-blue-50 text-blue-700 border-blue-200", 
          dot: "bg-blue-500" 
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("startDate")}</span>
    },
  },
  {
    accessorKey: "completionDate",
    header: "Target Date",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("completionDate")}</span>
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-sm">{row.getValue("budget")}</span>
      )
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number
      return (
        <div className="w-24">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )
    },
  },
  {
    accessorKey: "beneficiaries",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Beneficiaries
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const count = row.getValue("beneficiaries") as number
      return (
        <span className="font-medium text-sm">
          {count.toLocaleString()}
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
          className="h-8 px-3 cursor-pointer"
          onClick={() => {
            // Handle view details action
            alert(`Viewing details for ${row.getValue("projectName")}`)
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
        </Button>
      )
    },
  },
]