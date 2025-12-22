// constituencies/tables/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Power, PowerOff } from "lucide-react"
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

export type Constituency = {
  id: string
  name: string
  district: string
  state: string
  active: boolean
  type: "Urban" | "Rural" | "Semi-Urban"
  voters?: number
  mlaName?: string
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  constituency, 
  onEdit, 
  onView,
  onToggleActive 
}: { 
  constituency: Constituency
  onEdit: (constituency: Constituency) => void
  onView: (constituency: Constituency) => void
  onToggleActive: (constituencyId: string) => void
}) => {
  const { theme } = useThemeStore()
  const isActive = constituency.active

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
            onClick={() => onView(constituency)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onEdit(constituency)}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className={`cursor-pointer ${isActive ? "text-orange-600 focus:bg-orange-50" : "text-green-600 focus:bg-green-50"}`}
            onClick={() => onToggleActive(constituency.id)}
          >
            {isActive ? (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                <span>Activate</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const createColumns = (
  onEdit: (constituency: Constituency) => void,
  onView: (constituency: Constituency) => void,
  onToggleActive: (constituencyId: string) => void
): ColumnDef<Constituency>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Constituency Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      
      return (
        <span className="font-medium" style={{ color: theme.textPrimary }}>
          {row.getValue("name")}
        </span>
      )
    },
  },
  {
    accessorKey: "district",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          District
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <span style={{ color: theme.textSecondary }}>
          {row.getValue("district")}
        </span>
      )
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          State
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <span style={{ color: theme.textSecondary }}>
          {row.getValue("state")}
        </span>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const colors = {
        Urban: "bg-blue-100 text-blue-800 border border-blue-300",
        Rural: "bg-green-100 text-green-800 border border-green-300",
        "Semi-Urban": "bg-purple-100 text-purple-800 border border-purple-300"
      }
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colors[type as keyof typeof colors]}`}>
          {type}
        </span>
      )
    },
  },
  {
    accessorKey: "voters",
    header: "Voters",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const voters = row.getValue("voters") as number | undefined
      return (
        <span style={{ color: theme.textSecondary }}>
          {voters ? voters.toLocaleString() : "—"}
        </span>
      )
    },
  },
  {
    accessorKey: "mlaName",
    header: "Current MLA",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const mlaName = row.getValue("mlaName") as string | undefined
      return (
        <span style={{ color: theme.textSecondary }}>
          {mlaName || "—"}
        </span>
      )
    },
  },
  {
    accessorKey: "active",
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
      const active = row.getValue("active") as boolean
      return (
        <Badge
          className="font-medium px-3 py-1 rounded-md border-0"
          style={{
            backgroundColor: active ? "#10b981" : "#6b7280",
            color: "#ffffff",
          }}
        >
          {active ? "Active" : "Inactive"}
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
        constituency={row.original} 
        onEdit={onEdit}
        onView={onView}
        onToggleActive={onToggleActive}
      />
    ),
  },
]