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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useThemeStore } from "@/store/useThemeStore";
import { RoleTable } from "../../../components/admin-dashboard/roles/table/roles-table";
import { Role } from "@/components/admin-dashboard/roles/table/columns";
import Link from "next/link";

const mockRoles: Role[] = [
  {
    id: "2",
    name: "MLA",
    description: "Member of Legislative Assembly with constituency access",
    permissions: ["view_grievances", "manage_events", "view_reports", "manage_milestones"],
    userCount: 12,
    active: true,
    createdAt: "2024-01-20",
    isSystem: true,
    state: "Odisha",
    district: "Khordha",
    constituency: "Bhubaneswar Central",
  },
  {
    id: "3",
    name: "MLA",
    description: "Member of Legislative Assembly with constituency access",
    permissions: ["view_grievances", "manage_events", "view_reports", "manage_milestones"],
    userCount: 8,
    active: true,
    createdAt: "2024-01-25",
    isSystem: true,
    state: "Odisha",
    district: "Puri",
    constituency: "Puri",
  },
  {
    id: "4",
    name: "MLA",
    description: "Member of Legislative Assembly with constituency access",
    permissions: ["view_grievances", "manage_events", "view_reports", "manage_milestones"],
    userCount: 15,
    active: false,
    createdAt: "2024-02-01",
    isSystem: true,
    state: "Odisha",
    district: "Cuttack",
    constituency: "Cuttack Sadar",
  },
  {
    id: "5",
    name: "MLA",
    description: "Member of Legislative Assembly with constituency access",
    permissions: ["view_grievances", "manage_events", "view_reports", "manage_milestones"],
    userCount: 10,
    active: true,
    createdAt: "2024-02-05",
    isSystem: true,
    state: "Odisha",
    district: "Jajpur",
    constituency: "Korei",
  },
];

const states = ["Odisha", "Maharashtra", "Karnataka"];
const allDistricts = [
  { name: "Khordha", state: "Odisha" },
  { name: "Puri", state: "Odisha" },
  { name: "Cuttack", state: "Odisha" },
  { name: "Ganjam", state: "Odisha" },
  { name: "Jajpur", state: "Odisha" },
];
const allConstituencies = [
  { name: "Bhubaneswar Central", district: "Khordha" },
  { name: "Puri", district: "Puri" },
  { name: "Cuttack Sadar", district: "Cuttack" },
  { name: "Berhampur", district: "Ganjam" },
  { name: "Korei", district: "Jajpur" },
];

export default function RolesPage() {
  const { theme } = useThemeStore();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedDistrict("");
    setSelectedConstituency("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedConstituency("");
  };

  // Get filtered districts based on selected state
  const availableDistricts = selectedState && selectedState !== "all" 
    ? allDistricts.filter(d => d.state === selectedState)
    : [];

  // Get filtered constituencies based on selected district
  const availableConstituencies = selectedDistrict && selectedDistrict !== "all"
    ? allConstituencies.filter(c => c.district === selectedDistrict)
    : [];
  const handleSubmitFilter = () => {
    let filtered = roles;
    
    if (selectedState && selectedState !== "all") {
      filtered = filtered.filter(role => role.state === selectedState);
    }
    if (selectedDistrict && selectedDistrict !== "all") {
      filtered = filtered.filter(role => role.district === selectedDistrict);
    }
    if (selectedConstituency && selectedConstituency !== "all") {
      filtered = filtered.filter(role => role.constituency === selectedConstituency);
    }
    
    setFilteredRoles(filtered);
    setShowTable(true);
  };

  // Statistics based on filtered data
  const stats = {
    total: showTable ? filteredRoles.length : roles.length,
    active: showTable ? filteredRoles.filter((r) => r.active).length : roles.filter((r) => r.active).length,
    inactive: showTable ? filteredRoles.filter((r) => !r.active).length : roles.filter((r) => !r.active).length,
    totalUsers: showTable ? filteredRoles.reduce((sum, r) => sum + r.userCount, 0) : roles.reduce((sum, r) => sum + r.userCount, 0),
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

      {/* FILTERS */}
      <Card
        className="shadow-lg"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>State</Label>
              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>District</Label>
              <Select 
                value={selectedDistrict} 
                onValueChange={handleDistrictChange}
                disabled={!selectedState || selectedState === "all"}
              >
                <SelectTrigger style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}>
                  <SelectItem value="all">All Districts</SelectItem>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district.name} value={district.name}>{district.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>Constituency</Label>
              <Select 
                value={selectedConstituency} 
                onValueChange={setSelectedConstituency}
                disabled={!selectedDistrict || selectedDistrict === "all"}
              >
                <SelectTrigger style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}>
                  <SelectValue placeholder="Select Constituency" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}>
                  <SelectItem value="all">All Constituencies</SelectItem>
                  {availableConstituencies.map((constituency) => (
                    <SelectItem key={constituency.name} value={constituency.name}>{constituency.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={handleSubmitFilter}
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>

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
      {showTable && (
        <RoleTable
          data={filteredRoles}
          onView={openViewDialog}
          onToggleActive={handleToggleActive}
        />
      )}

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