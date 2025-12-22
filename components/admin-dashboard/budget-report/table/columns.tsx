"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export type BudgetReport = {
  id: string
  department: string
  category: "Infrastructure" | "Healthcare" | "Education" | "Water Supply" | "Agriculture" | "Administration"
  totalBudget: number
  allocated: number
  spent: number
  remaining: number
  utilization: number
  status: "On Track" | "Over Budget" | "Under Utilized" | "Critical"
  fiscalYear: string
  lastUpdated: string
}

export const columns: ColumnDef<BudgetReport>[] = [
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.getValue("department")}</p>
          <p className="text-xs text-gray-500">{row.original.category}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "totalBudget",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Total Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = row.getValue("totalBudget") as number
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount)
      return <span className="font-semibold text-sm">{formatted}</span>
    },
  },
  {
    accessorKey: "allocated",
    header: "Allocated",
    cell: ({ row }) => {
      const amount = row.getValue("allocated") as number
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount)
      return <span className="text-sm">{formatted}</span>
    },
  },
  {
    accessorKey: "spent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-semibold"
        >
          Spent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = row.getValue("spent") as number
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount)
      return <span className="font-medium text-sm">{formatted}</span>
    },
  },
  {
    accessorKey: "remaining",
    header: "Remaining",
    cell: ({ row }) => {
      const amount = row.getValue("remaining") as number
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount)
      return <span className="text-sm text-green-600 font-medium">{formatted}</span>
    },
  },
  {
    accessorKey: "utilization",
    header: "Utilization",
    cell: ({ row }) => {
      const utilization = row.getValue("utilization") as number
      const getColor = (value: number) => {
        if (value >= 90) return "text-red-600"
        if (value >= 70) return "text-orange-600"
        return "text-green-600"
      }
      
      return (
        <div className="w-24">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-medium ${getColor(utilization)}`}>
              {utilization}%
            </span>
          </div>
          <Progress value={utilization} className="h-2" />
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusConfig: Record<string, { class: string; dot: string }> = {
        "On Track": { 
          class: "bg-green-50 text-green-700 border-green-200", 
          dot: "bg-green-500" 
        },
        "Over Budget": { 
          class: "bg-red-50 text-red-700 border-red-200", 
          dot: "bg-red-500" 
        },
        "Under Utilized": { 
          class: "bg-blue-50 text-blue-700 border-blue-200", 
          dot: "bg-blue-500" 
        },
        "Critical": { 
          class: "bg-orange-50 text-orange-700 border-orange-200", 
          dot: "bg-orange-500" 
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
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      return <span className="text-sm text-gray-600">{row.getValue("lastUpdated")}</span>
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
            alert(`View budget details: ${row.original.id}`)
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
        </Button>
      )
    },
  },
]