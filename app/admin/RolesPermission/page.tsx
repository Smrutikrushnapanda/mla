"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useThemeStore } from "@/store/useThemeStore"
import {
  Shield,
  Plus,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { RolesDataTable } from "@/components/role-permission-table/rolepermission-table"

interface Permission {
  id: string
  name: string
  description: string
  module: string
}

export interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
  createdAt: string
  status: "active" | "inactive"
}

const MODULES = [
  "User Management",
  "Grievance Management",
  "Content Management",
  "Reports & Analytics",
  "System Settings",
]

export const ALL_PERMISSIONS: Permission[] = [
  // User Management
  { id: "user_view", name: "View Users", description: "Can view user list and details", module: "User Management" },
  { id: "user_create", name: "Create Users", description: "Can create new users", module: "User Management" },
  { id: "user_edit", name: "Edit Users", description: "Can edit user information", module: "User Management" },
  { id: "user_delete", name: "Delete Users", description: "Can delete users", module: "User Management" },
  
  // Grievance Management
  { id: "grievance_view", name: "View Grievances", description: "Can view grievances", module: "Grievance Management" },
  { id: "grievance_assign", name: "Assign Grievances", description: "Can assign grievances to staff", module: "Grievance Management" },
  { id: "grievance_resolve", name: "Resolve Grievances", description: "Can mark grievances as resolved", module: "Grievance Management" },
  { id: "grievance_delete", name: "Delete Grievances", description: "Can delete grievances", module: "Grievance Management" },
  
  // Content Management
  { id: "content_view", name: "View Content", description: "Can view content items", module: "Content Management" },
  { id: "content_create", name: "Create Content", description: "Can create new content", module: "Content Management" },
  { id: "content_edit", name: "Edit Content", description: "Can edit existing content", module: "Content Management" },
  { id: "content_delete", name: "Delete Content", description: "Can delete content", module: "Content Management" },
  
  // Reports & Analytics
  { id: "reports_view", name: "View Reports", description: "Can view all reports", module: "Reports & Analytics" },
  { id: "reports_export", name: "Export Reports", description: "Can export reports", module: "Reports & Analytics" },
  { id: "analytics_view", name: "View Analytics", description: "Can view analytics dashboard", module: "Reports & Analytics" },
  
  // System Settings
  { id: "settings_view", name: "View Settings", description: "Can view system settings", module: "System Settings" },
  { id: "settings_edit", name: "Edit Settings", description: "Can modify system settings", module: "System Settings" },
  { id: "roles_manage", name: "Manage Roles", description: "Can create and manage roles", module: "System Settings" },
]

export default function RolesPermissionPage() {
  const { theme, isDarkMode } = useThemeStore()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  // Form state
  const [roleName, setRoleName] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  // Sample data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      permissions: ALL_PERMISSIONS.map(p => p.id),
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Admin",
      description: "Administrative access with limited system settings",
      userCount: 5,
      permissions: ["user_view", "user_create", "user_edit", "grievance_view", "grievance_assign", "grievance_resolve", "content_view", "content_create", "content_edit", "reports_view"],
      createdAt: "2024-01-20",
      status: "active",
    },
    {
      id: "3",
      name: "Staff",
      description: "Standard staff member with grievance handling",
      userCount: 38,
      permissions: ["grievance_view", "grievance_assign", "grievance_resolve", "content_view", "reports_view"],
      createdAt: "2024-02-01",
      status: "active",
    },
    {
      id: "4",
      name: "Content Manager",
      description: "Manages content and media",
      userCount: 8,
      permissions: ["content_view", "content_create", "content_edit", "content_delete", "reports_view"],
      createdAt: "2024-02-10",
      status: "active",
    },
    {
      id: "5",
      name: "Viewer",
      description: "Read-only access to system",
      userCount: 15,
      permissions: ["user_view", "grievance_view", "content_view", "reports_view", "analytics_view"],
      createdAt: "2024-02-15",
      status: "active",
    },
  ])

  const handleCreateRole = () => {
    const newRole: Role = {
      id: String(roles.length + 1),
      name: roleName,
      description: roleDescription,
      userCount: 0,
      permissions: selectedPermissions,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active",
    }
    setRoles([...roles, newRole])
    resetForm()
    setIsCreateDialogOpen(false)
  }

  const resetForm = () => {
    setRoleName("")
    setRoleDescription("")
    setSelectedPermissions([])
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Roles & Permissions
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Manage user roles and their permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
              className="hover:opacity-90 transition"
              onClick={() => resetForm()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pr-2">
              <div>
                <Label htmlFor="role-name" style={{ color: theme.textPrimary }}>
                  Role Name
                </Label>
                <Input
                  id="role-name"
                  placeholder="e.g., Content Manager"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="role-description" style={{ color: theme.textPrimary }}>
                  Description
                </Label>
                <Textarea
                  id="role-description"
                  placeholder="Describe the role's purpose and responsibilities"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
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
                                id={permission.id}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                                className={isDarkMode ? 
                                  'border-gray-400 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-slate-900' : 
                                  ''
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor={permission.id}
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

            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                style={{
                  borderColor: theme.border,
                  color: theme.textSecondary,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRole}
                disabled={!roleName || selectedPermissions.length === 0}
                style={{
                  background: theme.buttonPrimary.bg,
                  color: theme.buttonPrimary.text,
                }}
                className="hover:opacity-90 transition"
              >
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards - Reduced Height for Inner Page */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className="shadow min-h-[100px]"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 space-y-0">
            <CardTitle
              className="text-xs font-medium"
              style={{ color: theme.textSecondary }}
            >
              Total Roles
            </CardTitle>
            <Shield className="h-3.5 w-3.5 text-blue-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0">
            <div
              className="text-xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              {roles.length}
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow min-h-[100px]"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 space-y-0">
            <CardTitle
              className="text-xs font-medium"
              style={{ color: theme.textSecondary }}
            >
              Active Roles
            </CardTitle>
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0">
            <div
              className="text-xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              {roles.filter(r => r.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow min-h-[100px]"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 space-y-0">
            <CardTitle
              className="text-xs font-medium"
              style={{ color: theme.textSecondary }}
            >
              Total Users
            </CardTitle>
            <Users className="h-3.5 w-3.5 text-purple-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0">
            <div
              className="text-xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              {roles.reduce((sum, role) => sum + role.userCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow min-h-[100px]"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 space-y-0">
            <CardTitle
              className="text-xs font-medium"
              style={{ color: theme.textSecondary }}
            >
              Permissions
            </CardTitle>
            <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0">
            <div
              className="text-xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              {ALL_PERMISSIONS.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <RolesDataTable roles={roles} setRoles={setRoles} />
    </div>
  )
}