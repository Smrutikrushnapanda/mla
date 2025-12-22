// app/(roles)/admin-user/manage-projects/tables/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, MapPin } from "lucide-react"
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
import { toast } from "sonner"

export type Project = {
  id: number
  name: string
  description: string
  category: string
  area: string
  budget: number
  status: "Planning" | "In Progress" | "Completed"
  startDate: string
  endDate: string
  progress: number
  color: string
}

const ActionsCell = ({ project }: { project: Project }) => {
  const { theme } = useThemeStore()

  const handleView = () => {
    toast.info(`Viewing ${project.name}`)
  }

  const handleEdit = () => {
    toast.info(`Editing ${project.name}`)
  }

  const handleDelete = () => {
    toast.error(`${project.name} has been deleted`)
  }

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
            onClick={handleView}
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={handleEdit}
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Project</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            onClick={handleDelete}
            className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Planning":
      return { bg: "#dbeafe", text: "#1e40af" }
    case "In Progress":
      return { bg: "#fed7aa", text: "#c2410c" }
    case "Completed":
      return { bg: "#d1fae5", text: "#065f46" }
    default:
      return { bg: "#e5e7eb", text: "#374151" }
  }
}

export const columns: ColumnDef<Project>[] = [
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
      const color = row.original.color
      return (
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <div>
            <span className="font-medium block">{row.getValue("name")}</span>
            <span className="text-xs opacity-70 block mt-0.5">
              {row.original.category}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Area/Location
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 opacity-50" />
          <span>{row.getValue("area")}</span>
        </div>
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
      const budget = row.getValue("budget") as number
      return (
        <span className="font-semibold">
          ₹{budget.toLocaleString("en-IN")}
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
      const colors = getStatusColor(status)
      return (
        <Badge 
          variant="secondary"
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
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
      const progress = row.getValue("progress") as number
      return (
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Timeline
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startDate"))
      const endDate = new Date(row.original.endDate)
      return (
        <div className="text-sm">
          <div>{startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
          <div className="text-xs opacity-70">
            to {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell project={row.original} />,
  },
]