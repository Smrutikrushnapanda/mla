"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, PlayCircle, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useThemeStore } from "@/store/useThemeStore"

export type Project = {
  id: string
  projectId: string
  name: string
  description: string
  category: string
  department: string
  budget: number
  fundingSource: string
  status: "Proposed" | "Approved" | "In Progress" | "Completed" | "On Hold" | "Cancelled"
  priority: "Low" | "Medium" | "High" | "Critical"
  startDate: Date
  expectedEndDate: Date
  actualEndDate?: Date
  progress: number // 0-100
  location: string
  constituency: string
  beneficiaries?: number
  contractor?: string
  inchargeOfficer?: string
  remarks?: string
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  project, 
  onView,
  onEdit,
  onUpdateStatus
}: { 
  project: Project
  onView: (project: Project) => void
  onEdit: (project: Project) => void
  onUpdateStatus: (projectId: string, status: Project['status']) => void
}) => {
  const { theme } = useThemeStore()

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="border shadow-lg w-52"
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
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onView(project)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onEdit(project)}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Project</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className="cursor-pointer text-blue-600"
            onClick={() => onUpdateStatus(project.id, "In Progress")}
            disabled={project.status === "In Progress"}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            <span>Mark In Progress</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-green-600"
            onClick={() => onUpdateStatus(project.id, "Completed")}
            disabled={project.status === "Completed"}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            <span>Mark Completed</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-orange-600"
            onClick={() => onUpdateStatus(project.id, "On Hold")}
            disabled={project.status === "On Hold"}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>Put On Hold</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const createColumns = (
  onView: (project: Project) => void,
  onEdit: (project: Project) => void,
  onUpdateStatus: (projectId: string, status: Project['status']) => void
): ColumnDef<Project>[] => [
  {
    accessorKey: "projectId",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Project ID
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <Badge
          variant="outline"
          className="font-mono text-xs"
          style={{
            borderColor: theme.cardBorder,
            color: theme.textPrimary,
          }}
        >
          {row.getValue("projectId")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Project Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const category = row.original.category
      
      return (
        <div className="max-w-xs">
          <p className="font-medium" style={{ color: theme.textPrimary }}>
            {row.getValue("name")}
          </p>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
            {category}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Department
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {row.getValue("department")}
        </span>
      )
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Budget
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const budget = row.getValue("budget") as number
      
      const formatCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
        return `₹${amount.toLocaleString('en-IN')}`
      }
      
      return (
        <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
          {formatCurrency(budget)}
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
        Proposed: { bg: "#6b7280", text: "#ffffff" },
        Approved: { bg: "#3b82f6", text: "#ffffff" },
        "In Progress": { bg: "#f59e0b", text: "#ffffff" },
        Completed: { bg: "#10b981", text: "#ffffff" },
        "On Hold": { bg: "#ef4444", text: "#ffffff" },
        Cancelled: { bg: "#dc2626", text: "#ffffff" },
      }
      const color = colors[status as keyof typeof colors]
      
      return (
        <Badge
          className="font-medium px-3 py-1"
          style={{
            backgroundColor: color.bg,
            color: color.text,
          }}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const progress = row.getValue("progress") as number
      
      return (
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: 
                  progress === 100 ? "#10b981" :
                  progress >= 75 ? "#3b82f6" :
                  progress >= 50 ? "#f59e0b" :
                  "#ef4444"
              }}
            />
          </div>
          <span className="text-xs font-medium" style={{ color: theme.textPrimary }}>
            {progress}%
          </span>
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
        Low: { bg: "#10b981", text: "#ffffff" },
        Medium: { bg: "#f59e0b", text: "#ffffff" },
        High: { bg: "#ef4444", text: "#ffffff" },
        Critical: { bg: "#dc2626", text: "#ffffff" },
      }
      const color = colors[priority as keyof typeof colors]
      
      return (
        <Badge
          className="font-medium px-2 py-1 text-xs"
          style={{
            backgroundColor: color.bg,
            color: color.text,
          }}
        >
          {priority}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <ActionsCell 
        project={row.original}
        onView={onView}
        onEdit={onEdit}
        onUpdateStatus={onUpdateStatus}
      />
    ),
  },
]