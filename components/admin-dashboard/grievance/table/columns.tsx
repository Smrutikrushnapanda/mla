"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, CheckCircle, XCircle, Clock } from "lucide-react"
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

export type Grievance = {
  id: string
  ticketId: string
  subject: string
  description: string
  category: string
  department: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "In Progress" | "Resolved" | "Rejected" | "Closed"
  citizenName: string
  citizenPhone: string
  citizenEmail?: string
  location: string
  constituency: string
  submittedDate: Date
  assignedTo?: string
  resolvedDate?: Date
  remarks?: string
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  grievance, 
  onView,
  onUpdateStatus
}: { 
  grievance: Grievance
  onView: (grievance: Grievance) => void
  onUpdateStatus: (grievanceId: string, status: Grievance['status']) => void
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
          className="border shadow-lg w-48"
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
            onClick={() => onView(grievance)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className="cursor-pointer text-blue-600"
            onClick={() => onUpdateStatus(grievance.id, "In Progress")}
            disabled={grievance.status === "In Progress"}
          >
            <Clock className="mr-2 h-4 w-4" />
            <span>Mark In Progress</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-green-600"
            onClick={() => onUpdateStatus(grievance.id, "Resolved")}
            disabled={grievance.status === "Resolved"}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Mark Resolved</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={() => onUpdateStatus(grievance.id, "Rejected")}
            disabled={grievance.status === "Rejected"}
          >
            <XCircle className="mr-2 h-4 w-4" />
            <span>Reject</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const createColumns = (
  onView: (grievance: Grievance) => void,
  onUpdateStatus: (grievanceId: string, status: Grievance['status']) => void
): ColumnDef<Grievance>[] => [
  {
    accessorKey: "ticketId",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Ticket ID
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
          {row.getValue("ticketId")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Subject
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const category = row.original.category
      
      return (
        <div className="max-w-xs">
          <p className="font-medium truncate" style={{ color: theme.textPrimary }}>
            {row.getValue("subject")}
          </p>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
            {category}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "citizenName",
    header: "Citizen",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const phone = row.original.citizenPhone
      
      return (
        <div>
          <p className="font-medium text-sm" style={{ color: theme.textPrimary }}>
            {row.getValue("citizenName")}
          </p>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            {phone}
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
        Pending: { bg: "#f59e0b", text: "#ffffff" },
        "In Progress": { bg: "#3b82f6", text: "#ffffff" },
        Resolved: { bg: "#10b981", text: "#ffffff" },
        Rejected: { bg: "#ef4444", text: "#ffffff" },
        Closed: { bg: "#6b7280", text: "#ffffff" },
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
    accessorKey: "submittedDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Submitted
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const date = row.getValue("submittedDate") as Date
      
      const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }
        return new Date(date).toLocaleDateString('en-GB', options)
      }
      
      return (
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {formatDate(date)}
        </span>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <ActionsCell 
        grievance={row.original}
        onView={onView}
        onUpdateStatus={onUpdateStatus}
      />
    ),
  },
]