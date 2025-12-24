"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, CheckCircle2, XCircle, Clock, FileText } from "lucide-react"
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

export type ProjectApproval = {
  id: string
  projectId: string
  name: string
  description: string
  category: string
  department: string
  requestedBudget: number
  fundingSource: string
  status: "Pending Review" | "Under Review" | "Approved" | "Rejected" | "Revision Requested"
  priority: "Low" | "Medium" | "High" | "Critical"
  submittedDate: Date
  submittedBy: string
  reviewedBy?: string
  reviewDate?: Date
  location: string
  constituency: string
  estimatedBeneficiaries?: number
  expectedDuration?: string // e.g., "18 months"
  proposedContractor?: string
  justification?: string
  rejectionReason?: string
  documents?: string[]
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  project, 
  onView,
  onApprove,
  onReject,
  onRequestRevision
}: { 
  project: ProjectApproval
  onView: (project: ProjectApproval) => void
  onApprove: (project: ProjectApproval) => void
  onReject: (project: ProjectApproval) => void
  onRequestRevision: (project: ProjectApproval) => void
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
          className="border shadow-lg w-56"
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

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className="cursor-pointer text-blue-600"
            onClick={() => onRequestRevision(project)}
            disabled={project.status === "Approved" || project.status === "Rejected"}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Request Revision</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-green-600"
            onClick={() => onApprove(project)}
            disabled={project.status === "Approved" || project.status === "Rejected"}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            <span>Approve Project</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={() => onReject(project)}
            disabled={project.status === "Approved" || project.status === "Rejected"}
          >
            <XCircle className="mr-2 h-4 w-4" />
            <span>Reject Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const createColumns = (
  onView: (project: ProjectApproval) => void,
  onApprove: (project: ProjectApproval) => void,
  onReject: (project: ProjectApproval) => void,
  onRequestRevision: (project: ProjectApproval) => void
): ColumnDef<ProjectApproval>[] => [
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
    accessorKey: "requestedBudget",
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
      const budget = row.getValue("requestedBudget") as number
      
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
    accessorKey: "submittedBy",
    header: "Submitted By",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const submittedDate = row.original.submittedDate
      
      const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { 
          day: '2-digit', 
          month: 'short'
        }
        return new Date(date).toLocaleDateString('en-GB', options)
      }
      
      return (
        <div>
          <p className="font-medium text-sm" style={{ color: theme.textPrimary }}>
            {row.getValue("submittedBy")}
          </p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            {formatDate(submittedDate)}
          </p>
        </div>
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
        "Pending Review": { bg: "#6b7280", text: "#ffffff" },
        "Under Review": { bg: "#f59e0b", text: "#ffffff" },
        "Approved": { bg: "#10b981", text: "#ffffff" },
        "Rejected": { bg: "#ef4444", text: "#ffffff" },
        "Revision Requested": { bg: "#3b82f6", text: "#ffffff" },
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
        onApprove={onApprove}
        onReject={onReject}
        onRequestRevision={onRequestRevision}
      />
    ),
  },
]