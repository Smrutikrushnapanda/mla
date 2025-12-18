// components/role-permission-table/rolepermission-table.tsx
"use client"

import { useState } from "react"
import { DataTable } from "./data-table"
import { createColumns } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"
import { Role, ALL_PERMISSIONS } from "../../app/admin/RolesPermission/page"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const MODULES = [
  "User Management",
  "Grievance Management",
  "Content Management",
  "Reports & Analytics",
  "System Settings",
]

interface RolesDataTableProps {
  roles: Role[]
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
}

export function RolesDataTable({ roles, setRoles }: RolesDataTableProps) {
  const { theme } = useThemeStore()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  
  // Form state
  const [roleName, setRoleName] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const openEditDialog = (role: Role) => {
    setSelectedRole(role)
    setRoleName(role.name)
    setRoleDescription(role.description)
    setSelectedPermissions(role.permissions)
    setIsEditDialogOpen(true)
  }

  const openToggleDialog = (role: Role) => {
    setSelectedRole(role)
    setIsToggleDialogOpen(true)
  }

  const handleEditRole = () => {
    if (!selectedRole) return
    
    setRoles(roles.map(role => 
      role.id === selectedRole.id
        ? {
            ...role,
            name: roleName,
            description: roleDescription,
            permissions: selectedPermissions,
          }
        : role
    ))
    resetForm()
    setIsEditDialogOpen(false)
  }

  const handleToggleStatus = () => {
    if (!selectedRole) return
    
    setRoles(roles.map(role => 
      role.id === selectedRole.id
        ? {
            ...role,
            status: role.status === "active" ? "inactive" : "active",
          }
        : role
    ))
    setIsToggleDialogOpen(false)
    setSelectedRole(null)
  }

  const resetForm = () => {
    setRoleName("")
    setRoleDescription("")
    setSelectedPermissions([])
    setSelectedRole(null)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const selectAllInModule = (module: string) => {
    const modulePermissions = ALL_PERMISSIONS
      .filter(p => p.module === module)
      .map(p => p.id)
    
    const allSelected = modulePermissions.every(id => selectedPermissions.includes(id))
    
    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(id => !modulePermissions.includes(id)))
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...modulePermissions])])
    }
  }

  const columns = createColumns(openEditDialog, openToggleDialog)

  return (
    <>
      <div 
        className="w-full rounded-lg border shadow-lg p-6"
        style={{
          background: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 
            className="text-2xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Roles Management
          </h2>
        </div>

        <DataTable columns={columns} data={roles} />
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>Edit Role</DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              Modify role details and permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-role-name" style={{ color: theme.textPrimary }}>
                Role Name
              </Label>
              <Input
                id="edit-role-name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.textPrimary,
                }}
              />
            </div>

            <div>
              <Label htmlFor="edit-role-description" style={{ color: theme.textPrimary }}>
                Description
              </Label>
              <Textarea
                id="edit-role-description"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.textPrimary,
                }}
              />
            </div>

            <div>
              <Label style={{ color: theme.textPrimary }}>Permissions</Label>
              <div className="mt-3 space-y-4">
                {MODULES.map((module) => {
                  const modulePermissions = ALL_PERMISSIONS.filter(p => p.module === module)
                  const allSelected = modulePermissions.every(p => selectedPermissions.includes(p.id))

                  return (
                    <div
                      key={module}
                      className="rounded-lg border p-4"
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold" style={{ color: theme.textPrimary }}>
                          {module}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectAllInModule(module)}
                          style={{
                            borderColor: theme.border,
                            color: theme.textSecondary,
                          }}
                        >
                          {allSelected ? "Deselect All" : "Select All"}
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {modulePermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-2"
                          >
                            <Checkbox
                              id={`edit-${permission.id}`}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={`edit-${permission.id}`}
                                className="text-sm font-medium cursor-pointer"
                                style={{ color: theme.textPrimary }}
                              >
                                {permission.name}
                              </label>
                              <p
                                className="text-xs"
                                style={{ color: theme.textTertiary }}
                              >
                                {permission.description}
                              </p>
                            </div>
                          </div>
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
              onClick={() => setIsEditDialogOpen(false)}
              style={{
                borderColor: theme.border,
                color: theme.textSecondary,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditRole}
              disabled={!roleName || selectedPermissions.length === 0}
              style={{
                backgroundColor: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toggle Status Confirmation Dialog */}
      <Dialog open={isToggleDialogOpen} onOpenChange={setIsToggleDialogOpen}>
        <DialogContent
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              {selectedRole?.status === "active" ? "Deactivate" : "Activate"} Role
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              Are you sure you want to {selectedRole?.status === "active" ? "deactivate" : "activate"} the role "{selectedRole?.name}"?
              {selectedRole?.status === "active" && " Users with this role will lose access to its permissions."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsToggleDialogOpen(false)}
              style={{
                borderColor: theme.border,
                color: theme.textSecondary,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleToggleStatus}
              className={selectedRole?.status === "active" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
            >
              {selectedRole?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}