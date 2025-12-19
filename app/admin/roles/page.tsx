// roles/page.tsx
"use client";

import { useState } from "react";
import {
  Shield,
  Users,
  Lock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useThemeStore } from "@/store/useThemeStore";
import { RoleTable } from "../../../components/roles/roles-table";
import { Role } from "@/components/roles/columns";
import Link from "next/link";

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: ["all"],
    userCount: 3,
    active: true,
    createdAt: "2024-01-15",
    isSystem: true,
  },
  {
    id: "2",
    name: "MLA",
    description: "Member of Legislative Assembly with constituency access",
    permissions: ["view_grievances", "manage_events", "view_reports", "manage_milestones"],
    userCount: 12,
    active: true,
    createdAt: "2024-01-20",
    isSystem: true,
  },
  {
    id: "3",
    name: "MLA Staff",
    description: "Staff members assisting MLAs",
    permissions: ["view_grievances", "update_grievances", "manage_events"],
    userCount: 45,
    active: true,
    createdAt: "2024-02-01",
    isSystem: false,
  },
  {
    id: "4",
    name: "Content Manager",
    description: "Manages media and content updates",
    permissions: ["manage_media", "manage_events", "manage_milestones"],
    userCount: 8,
    active: true,
    createdAt: "2024-02-10",
    isSystem: false,
  },
  {
    id: "5",
    name: "Support Staff",
    description: "Basic support and grievance handling",
    permissions: ["view_grievances", "update_grievances"],
    userCount: 25,
    active: false,
    createdAt: "2024-03-05",
    isSystem: false,
  },
];

export default function RolesPage() {
  const { theme } = useThemeStore();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Statistics
  const stats = {
    total: roles.length,
    active: roles.filter((r) => r.active).length,
    inactive: roles.filter((r) => !r.active).length,
    totalUsers: roles.reduce((sum, r) => sum + r.userCount, 0),
  };

  const handleToggleActive = (roleId: string) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === roleId ? { ...r, active: !r.active } : r))
    );
  };

  const openViewDialog = (role: Role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold transition-colors"
            style={{ color: theme.textPrimary }}
          >
            Role Management
          </h1>
          <p
            className="text-sm mt-1 transition-colors"
            style={{ color: theme.textSecondary }}
          >
            Manage user roles and permissions across the system
          </p>
        </div>

        <Link href="/admin/AddRole">
          <Button
            className="gap-2 transition-all duration-200 hover:scale-105 border-0"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowRight className="h-4 w-4" />
            Add New Role
          </Button>
        </Link>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Roles", value: stats.total, icon: Shield, color: "#3b82f6" },
          { label: "Active Roles", value: stats.active, icon: CheckCircle2, color: "#10b981" },
          { label: "Inactive Roles", value: stats.inactive, icon: Lock, color: "#f59e0b" },
          { label: "Total Users", value: stats.totalUsers, icon: Users, color: "#8b5cf6" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-lg border p-0"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium transition-colors"
                    style={{ color: theme.textSecondary }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-3xl font-bold mt-2 transition-colors"
                    style={{ color: theme.textPrimary }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                  }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROLES TABLE */}
      <RoleTable
        data={roles}
        onView={openViewDialog}
        onToggleActive={handleToggleActive}
      />

      {/* VIEW PERMISSIONS DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              {selectedRole?.name} - Permissions
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              View all permissions assigned to this role
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedRole?.permissions[0] === "all" ? (
              <div
                className="text-center py-8"
                style={{ color: theme.textSecondary }}
              >
                <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">All Permissions Granted</p>
                <p className="text-sm mt-1">This role has full system access</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: theme.textPrimary }}
                  >
                    Permissions ({selectedRole?.permissions.length})
                  </h4>
                  <div className="space-y-2 ml-2">
                    {selectedRole?.permissions.map((permissionId) => (
                      <div
                        key={permissionId}
                        className="flex items-start gap-2 p-2 rounded-md"
                        style={{
                          backgroundColor: theme.backgroundSecondary,
                        }}
                      >
                        <CheckCircle2
                          className="h-5 w-5 mt-0.5 flex-shrink-0"
                          style={{ color: theme.highlight }}
                        />
                        <div>
                          <p
                            className="text-sm font-medium capitalize"
                            style={{ color: theme.textPrimary }}
                          >
                            {permissionId.replace(/_/g, ' ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                setSelectedRole(null);
              }}
              className="border-0"
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}