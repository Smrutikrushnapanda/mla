// components/mla-dashboard/project-management/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Edit, MoreHorizontal, Download } from "lucide-react"
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
   Project Type
============================ */
export type Project = {
  sl: number
  id: string
  projectName: string
  category: string
  department: string
  location: string
  estimatedBudget: number
  sanctionedBudget: number
  expenditure: number
  startDate: string
  expectedEndDate: string
  progress: number
  status: "Planned" | "In Progress" | "Completed" | "On Hold"
  priority: "Low" | "Medium" | "High" | "Critical"
}

/* ============================
   Actions Cell
============================ */
const ActionsCell = ({ project, onView }: { project: Project; onView: (project: Project) => void }) => {
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

          <DropdownMenuItem className="cursor-pointer" onClick={() => onView(project)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem className="cursor-pointer text-blue-600 focus:bg-blue-50">
            Update Progress
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* ============================
   Table Columns
============================ */
export const createColumns = (onView: (project: Project) => void): ColumnDef<Project>[] => [
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

  /* 🆔 PROJECT ID */
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Project ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 📁 PROJECT NAME */
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Project Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium max-w-xs truncate" title={row.getValue("projectName")}>
        {row.getValue("projectName")}
      </div>
    ),
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

  /* 🏛 DEPARTMENT */
  {
    accessorKey: "department",
    header: "Department",
  },

  /* 📍 LOCATION */
  {
    accessorKey: "location",
    header: "Location",
  },

  /* 💰 ESTIMATED BUDGET */
  {
    accessorKey: "estimatedBudget",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Est. Budget
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("estimatedBudget") as number
      const lakhs = (amount / 100000).toFixed(2)
      return (
        <div className="font-medium">
          ₹{lakhs} L
        </div>
      )
    },
  },

  /* 💵 SANCTIONED BUDGET */
  {
    accessorKey: "sanctionedBudget",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Sanctioned
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("sanctionedBudget") as number
      const lakhs = (amount / 100000).toFixed(2)
      return (
        <div className="font-medium">
          ₹{lakhs} L
        </div>
      )
    },
  },

  /* 💸 EXPENDITURE */
  {
    accessorKey: "expenditure",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Expenditure
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("expenditure") as number
      const lakhs = (amount / 100000).toFixed(2)
      return (
        <div className="font-medium">
          ₹{lakhs} L
        </div>
      )
    },
  },

  /* 📊 PROGRESS */
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Progress
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number
      return (
        <div className="w-24">
          <div className="flex items-center gap-2">
            <div 
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: progress === 100 ? "#22c55e" : progress >= 50 ? "#3b82f6" : "#f59e0b"
                }}
              />
            </div>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
        </div>
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
        Planned: "bg-gray-500",
        "In Progress": "bg-blue-500",
        Completed: "bg-green-500",
        "On Hold": "bg-orange-500"
      }
      return (
        <span className={`px-2 py-1 text-xs rounded-md text-white ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      )
    },
  },

  /* 🚨 PRIORITY */
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Priority
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
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

  /* 📅 START DATE */
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Start Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"))
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    },
  },

  /* 📅 END DATE */
  {
    accessorKey: "expectedEndDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expectedEndDate"))
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
    cell: ({ row }) => <ActionsCell project={row.original} onView={onView} />,
    enableHiding: false,
  },
]