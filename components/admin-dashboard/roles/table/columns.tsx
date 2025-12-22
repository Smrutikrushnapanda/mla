// roles/tables/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Power, PowerOff, Lock } from "lucide-react"
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

export type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  active: boolean
  createdAt: string
  isSystem: boolean
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  role, 
  onEdit, 
  onView,
  onToggleActive 
}: { 
  role: Role
  onEdit: (role: Role) => void
  onView: (role: Role) => void
  onToggleActive: (roleId: string) => void
}) => {
  const { theme } = useThemeStore()
  const isActive = role.active

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
            onClick={() => onView(role)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Permissions</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onEdit(role)}
            disabled={role.isSystem}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className={`cursor-pointer ${isActive ? "text-orange-600 focus:bg-orange-50" : "text-green-600 focus:bg-green-50"}`}
            onClick={() => onToggleActive(role.id)}
            disabled={role.isSystem}
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
  onEdit: (role: Role) => void,
  onView: (role: Role) => void,
  onToggleActive: (roleId: string) => void
): ColumnDef<Role>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Role Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const role = row.original
      
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium" style={{ color: theme.textPrimary }}>
            {row.getValue("name")}
          </span>
          {role.isSystem && (
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: theme.highlight,
                color: theme.highlight,
                backgroundColor: `${theme.highlight}10`,
              }}
            >
              System
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const description = row.getValue("description") as string
      
      return (
        <div className="max-w-md">
          <span 
            className="text-sm line-clamp-2" 
            style={{ color: theme.textSecondary }}
            title={description}
          >
            {description}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "userCount",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Users
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const userCount = row.getValue("userCount") as number
      
      return (
        <div className="flex items-center gap-1">
          <span 
            className="font-medium" 
            style={{ color: theme.textPrimary }}
          >
            {userCount}
          </span>
          <span 
            className="text-xs" 
            style={{ color: theme.textSecondary }}
          >
            user{userCount !== 1 ? 's' : ''}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Permissions
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const permissions = row.getValue("permissions") as string[]
      const isAllPermissions = permissions.length === 1 && permissions[0] === "all"
      
      return (
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" style={{ color: theme.textTertiary }} />
          <span style={{ color: theme.textSecondary }}>
            {isAllPermissions ? "All Permissions" : `${permissions.length} permissions`}
          </span>
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const permA = rowA.getValue("permissions") as string[]
      const permB = rowB.getValue("permissions") as string[]
      return permA.length - permB.length
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Created Date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const date = row.getValue("createdAt") as string
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      
      return (
        <span style={{ color: theme.textSecondary }}>
          {formattedDate}
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
        role={row.original} 
        onEdit={onEdit}
        onView={onView}
        onToggleActive={onToggleActive}
      />
    ),
  },
]