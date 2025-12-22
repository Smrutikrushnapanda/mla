// components/role-permission-table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useThemeStore } from "@/store/useThemeStore"
import { useState } from "react"
import { Role, ALL_PERMISSIONS } from "../../../app/admin/RolesPermission/page"
import { Shield, Users } from "lucide-react"

const MODULES = [
  "User Management",
  "Grievance Management",
  "Content Management",
  "Reports & Analytics",
  "System Settings",
]

// Actions Cell Component
const ActionsCell = ({ 
  role, 
  onEdit, 
  onToggleStatus 
}: { 
  role: Role
  onEdit: (role: Role) => void
  onToggleStatus: (role: Role) => void
}) => {
  const { theme } = useThemeStore()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const isActive = role.status === "active"

  return (
    <>
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

            <DropdownMenuItem 
              className="cursor-pointer"
              style={{ color: theme.textPrimary }}
              onClick={() => setIsViewDialogOpen(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>View Details</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="cursor-pointer"
              style={{ color: theme.textPrimary }}
              onClick={() => onEdit(role)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

            <DropdownMenuItem
              className={`cursor-pointer ${isActive ? 'text-red-600 focus:bg-red-50' : 'text-green-600 focus:bg-green-50'}`}
              onClick={() => onToggleStatus(role)}
            >
              {isActive ? (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  <span>Deactivate</span>
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span>Activate</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Role Details
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              View complete information about this role
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label style={{ color: theme.textSecondary }}>Role Name</Label>
              <p className="text-lg font-semibold" style={{ color: theme.textPrimary }}>
                {role.name}
              </p>
            </div>

            <div>
              <Label style={{ color: theme.textSecondary }}>Description</Label>
              <p style={{ color: theme.textPrimary }}>{role.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label style={{ color: theme.textSecondary }}>Users Assigned</Label>
                <p className="text-lg font-semibold" style={{ color: theme.textPrimary }}>
                  {role.userCount}
                </p>
              </div>
              <div>
                <Label style={{ color: theme.textSecondary }}>Status</Label>
                <Badge
                  variant={role.status === "active" ? "default" : "secondary"}
                  className={role.status === "active" ? "bg-green-500" : ""}
                >
                  {role.status}
                </Badge>
              </div>
              <div>
                <Label style={{ color: theme.textSecondary }}>Created</Label>
                <p style={{ color: theme.textPrimary }}>
                  {new Date(role.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <Label style={{ color: theme.textSecondary }}>
                Permissions ({role.permissions.length})
              </Label>
              <div className="mt-2 space-y-3">
                {MODULES.map((module) => {
                  const modulePermissions = ALL_PERMISSIONS.filter(
                    p => p.module === module && role.permissions.includes(p.id)
                  )
                  
                  if (modulePermissions.length === 0) return null

                  return (
                    <div
                      key={module}
                      className="rounded-lg border p-3"
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: theme.textPrimary }}>
                        {module}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modulePermissions.map((permission) => (
                          <Badge
                            key={permission.id}
                            variant="outline"
                            style={{
                              borderColor: theme.border,
                              color: theme.textSecondary,
                            }}
                          >
                            {permission.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              style={{
                borderColor: theme.border,
                color: theme.textSecondary,
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const createColumns = (
  onEdit: (role: Role) => void,
  onToggleStatus: (role: Role) => void
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
      return (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-md truncate" title={description}>
          {description}
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
      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-500" />
          <span>{row.getValue("userCount")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as string[]
      return (
        <Badge
          variant="outline"
          className="font-normal"
        >
          {permissions.length} permissions
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
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={status === "active" ? "bg-green-500" : ""}
        >
          {status}
        </Badge>
      )
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
      const date = new Date(row.getValue("createdAt"))
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      })
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
        onToggleStatus={onToggleStatus}
      />
    ),
  },
]