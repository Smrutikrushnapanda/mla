// district/tables/columns.tsx
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

export type District = {
  id: string
  name: string
  state: string
  active: boolean
  constituencies: number
  population?: string
  area?: string
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  district, 
  onEdit, 
  onView,
  onToggleActive 
}: { 
  district: District
  onEdit: (district: District) => void
  onView: (district: District) => void
  onToggleActive: (districtId: string) => void
}) => {
  const { theme } = useThemeStore()
  const isActive = district.active

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
            onClick={() => onView(district)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onEdit(district)}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className={`cursor-pointer ${isActive ? "text-orange-600 focus:bg-orange-50" : "text-green-600 focus:bg-green-50"}`}
            onClick={() => onToggleActive(district.id)}
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
  onEdit: (district: District) => void,
  onView: (district: District) => void,
  onToggleActive: (districtId: string) => void
): ColumnDef<District>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          District Name
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
    accessorKey: "constituencies",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Constituencies
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <span style={{ color: theme.textSecondary }}>
          {row.getValue("constituencies")}
        </span>
      )
    },
  },
  {
    accessorKey: "population",
    header: "Population",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const population = row.getValue("population") as string | undefined
      return (
        <span style={{ color: theme.textSecondary }}>
          {population || "—"}
        </span>
      )
    },
  },
  {
    accessorKey: "area",
    header: "Area",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const area = row.getValue("area") as string | undefined
      return (
        <span style={{ color: theme.textSecondary }}>
          {area || "—"}
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
        district={row.original} 
        onEdit={onEdit}
        onView={onView}
        onToggleActive={onToggleActive}
      />
    ),
  },
]