// roles/add/page.tsx
"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, Shield, Plus, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const predefinedRoles = [
  { value: "admin", label: "Administrator" },
  { value: "content_manager", label: "Content Manager" },
  { value: "support_staff", label: "Support Staff" },
  { value: "data_analyst", label: "Data Analyst" },
  { value: "moderator", label: "Moderator" },
  { value: "viewer", label: "Viewer" },
  { value: "custom", label: "Custom Role" },
];

const roleStatuses = [
  { value: "active", label: "Active", description: "Role can be assigned to users" },
  { value: "inactive", label: "Inactive", description: "Role cannot be assigned to users" },
];

const availablePermissions: Permission[] = [
  // Grievance Management
  { id: "view_grievances", name: "View Grievances", description: "View all grievances", category: "Grievances" },
  { id: "create_grievances", name: "Create Grievances", description: "Submit new grievances", category: "Grievances" },
  { id: "update_grievances", name: "Update Grievances", description: "Update grievance status", category: "Grievances" },
  { id: "delete_grievances", name: "Delete Grievances", description: "Delete grievances", category: "Grievances" },
  
  // Events Management
  { id: "view_events", name: "View Events", description: "View all events", category: "Events" },
  { id: "manage_events", name: "Manage Events", description: "Create and edit events", category: "Events" },
  { id: "delete_events", name: "Delete Events", description: "Delete events", category: "Events" },
  
  // Milestones
  { id: "view_milestones", name: "View Milestones", description: "View work milestones", category: "Milestones" },
  { id: "manage_milestones", name: "Manage Milestones", description: "Create and edit milestones", category: "Milestones" },
  
  // Polls
  { id: "view_polls", name: "View Polls", description: "View poll results", category: "Polls" },
  { id: "manage_polls", name: "Manage Polls", description: "Create and manage polls", category: "Polls" },
  
  // Appointments
  { id: "view_appointments", name: "View Appointments", description: "View appointment requests", category: "Appointments" },
  { id: "manage_appointments", name: "Manage Appointments", description: "Approve/reject appointments", category: "Appointments" },
  
  // Media
  { id: "view_media", name: "View Media", description: "View media content", category: "Media" },
  { id: "manage_media", name: "Manage Media", description: "Upload and manage media", category: "Media" },
  
  // Reports & Analytics
  { id: "view_reports", name: "View Reports", description: "Access analytics and reports", category: "Reports" },
  { id: "export_data", name: "Export Data", description: "Export system data", category: "Reports" },
  
  // User Management
  { id: "view_users", name: "View Users", description: "View all users", category: "Users" },
  { id: "manage_users", name: "Manage Users", description: "Create and edit users", category: "Users" },
  { id: "delete_users", name: "Delete Users", description: "Delete user accounts", category: "Users" },
  
  // System Settings
  { id: "view_settings", name: "View Settings", description: "View system settings", category: "Settings" },
  { id: "manage_settings", name: "Manage Settings", description: "Modify system settings", category: "Settings" },
];

export default function AddRolePage() {
  const { theme } = useThemeStore();
  const router = useRouter();
  
  // Initialize all controlled values properly (NEVER undefined)
  const [formData, setFormData] = useState({
    name: "", // NEVER undefined
    customName: "",
    description: "",
    permissions: [] as string[],
    active: "active" as "active" | "inactive",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    permissions: "",
  });

  // Pre-calculate grouped permissions (derived data during render is OK if no setState)
  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      permissions: "",
    };

    if (!formData.name) {
      newErrors.name = "Role name is required";
    } else if (formData.name === "custom" && !formData.customName.trim()) {
      newErrors.name = "Custom role name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.permissions.length === 0) {
      newErrors.permissions = "Select at least one permission";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const roleName = formData.name === "custom" ? formData.customName : formData.name;
    console.log("Creating role:", { ...formData, finalName: roleName });
    
    toast.success("Role created successfully!");
    
    setTimeout(() => {
      router.push("/admin/roles");
    }, 500);
  };

  // RULE 2 & 3: Each handler updates ONLY ONE piece of state
  // Separate handlers for form data and error clearing
  const handleRoleNameChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, name: value }));
  }, []);

  const handleStatusChange = useCallback((value: "active" | "inactive") => {
    setFormData(prev => ({ ...prev, active: value }));
  }, []);

  const handleCustomNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, customName: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, description: e.target.value }));
  }, []);

  // Clear errors separately (not inside form data handlers)
  const clearNameError = useCallback(() => {
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: "" }));
    }
  }, [errors.name]);

  const clearDescriptionError = useCallback(() => {
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: "" }));
    }
  }, [errors.description]);

  const clearPermissionsError = useCallback(() => {
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: "" }));
    }
  }, [errors.permissions]);

  // RULE 4: Single handler for checkbox toggle (no parent onClick + onCheckedChange)
  const togglePermission = useCallback((permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  }, []);

  const toggleCategoryPermissions = useCallback((category: string) => {
    const categoryPermissions = groupedPermissions[category].map(p => p.id);
    const allSelected = categoryPermissions.every(p =>
      formData.permissions.includes(p)
    );

    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(p => !categoryPermissions.includes(p))
        : [...new Set([...prev.permissions, ...categoryPermissions])],
    }));
  }, [formData.permissions, groupedPermissions]);

  const removePermission = useCallback((permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.filter(p => p !== permissionId)
    }));
  }, []);

  const clearAllPermissions = useCallback(() => {
    setFormData(prev => ({ ...prev, permissions: [] }));
  }, []);

  // Compute disabled state
  const isSubmitDisabled = 
    !formData.name || 
    (formData.name === "custom" && !formData.customName.trim()) ||
    !formData.description || 
    formData.permissions.length === 0;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* LEFT: ICON + TITLE */}
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${theme.highlight}20` }}
          >
            <Shield className="h-6 w-6" style={{ color: theme.highlight }} />
          </div>

          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Role
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Create a new role with specific permissions for user management
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
        <Link href="/admin/roles">
           <Button
            className="gap-2 transition-all duration-200 hover:scale-105 border-0"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFORMATION CARD */}
        <Card 
          className="border shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardHeader 
            className="border-b"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <CardTitle 
              className="flex items-center gap-2 text-lg"
              style={{ color: theme.textPrimary }}
            >
              <Shield className="h-5 w-5" style={{ color: theme.highlight }} />
              Basic Information
            </CardTitle>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.textSecondary }}
            >
              Provide essential details about the role
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Name Dropdown - RULE 1: value is NEVER undefined */}
              <div className="space-y-2">
                <Label 
                  htmlFor="name"
                  style={{ color: theme.textPrimary }}
                >
                  Role Name <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.name}
                  onValueChange={handleRoleNameChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role type" />
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Status Dropdown - RULE 1: value is NEVER undefined */}
              <div className="space-y-2">
                <Label 
                  htmlFor="active"
                  style={{ color: theme.textPrimary }}
                >
                  Role Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.active}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {roleStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p 
                  className="text-xs"
                  style={{ color: theme.textTertiary }}
                >
                  {formData.active === "active" 
                    ? "Role can be assigned to users" 
                    : "Role cannot be assigned to users"}
                </p>
              </div>
            </div>

            {/* Custom Role Name Input */}
            {formData.name === "custom" && (
              <div className="space-y-2">
                <Label 
                  htmlFor="customName"
                  style={{ color: theme.textPrimary }}
                >
                  Custom Role Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customName"
                  value={formData.customName}
                  onChange={handleCustomNameChange}
                  onFocus={clearNameError}
                  placeholder="Enter custom role name"
                  className={`border ${errors.name ? "border-red-500" : ""}`}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.name ? "#ef4444" : theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label 
                htmlFor="description"
                style={{ color: theme.textPrimary }}
              >
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                onFocus={clearDescriptionError}
                placeholder="Describe the role's responsibilities, purpose, and typical use cases..."
                rows={4}
                className={`border resize-none ${errors.description ? "border-red-500" : ""}`}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: errors.description ? "#ef4444" : theme.input.border,
                  color: theme.input.text,
                }}
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* PERMISSIONS CARD */}
        <Card 
          className="border shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardHeader 
            className="border-b"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <CardTitle 
                  className="flex items-center gap-2 text-lg"
                  style={{ color: theme.textPrimary }}
                >
                  <CheckCircle className="h-5 w-5" style={{ color: theme.highlight }} />
                  Permissions <span className="text-red-500">*</span>
                </CardTitle>
                <p 
                  className="text-sm mt-1"
                  style={{ color: theme.textSecondary }}
                >
                  Select permissions for this role
                </p>
              </div>
              <Badge
                className="px-3 py-1 border-0"
                style={{
                  backgroundColor: `${theme.highlight}20`,
                  color: theme.highlight,
                }}
              >
                {formData.permissions.length} / {availablePermissions.length} selected
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {errors.permissions && (
              <div className="p-3 rounded-md border border-red-200 bg-red-50">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <span>⚠</span> {errors.permissions}
                </p>
              </div>
            )}

            {/* Selected Permissions Summary */}
            {formData.permissions.length > 0 && (
              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 
                    className="text-sm font-semibold"
                    style={{ color: theme.textPrimary }}
                  >
                    Selected Permissions
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearAllPermissions}
                    className="h-7 text-xs text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.permissions.map((perm) => {
                    const permission = availablePermissions.find(p => p.id === perm);
                    return (
                      <Badge
                        key={perm}
                        className="px-3 py-1.5 flex items-center gap-2 border-0"
                        style={{
                          backgroundColor: `${theme.highlight}20`,
                          color: theme.highlight,
                        }}
                      >
                        <span className="text-xs font-medium">
                          {permission?.name || perm.replace(/_/g, ' ')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removePermission(perm)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Permissions Grid by Category */}
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <div 
                  key={category}
                  className="border rounded-lg overflow-hidden"
                  style={{
                    borderColor: theme.border,
                  }}
                >
                  {/* Category Header */}
                  <div 
                    className="flex items-center justify-between p-4 border-b"
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                    }}
                  >
                    <div>
                      <h4 
                        className="font-semibold"
                        style={{ color: theme.textPrimary }}
                      >
                        {category}
                      </h4>
                      <p 
                        className="text-xs mt-0.5"
                        style={{ color: theme.textSecondary }}
                      >
                        {permissions.filter(p => formData.permissions.includes(p.id)).length} of {permissions.length} selected
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCategoryPermissions(category)}
                      className="h-8 text-xs"
                      style={{ color: theme.highlight }}
                    >
                      {permissions.every((p) => formData.permissions.includes(p.id))
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  </div>

                  {/* Permissions List */}
                  <div 
                    className="p-4"
                    style={{ backgroundColor: theme.cardBackground }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {permissions.map((permission) => {
                        const isSelected = formData.permissions.includes(permission.id);
                        
                        return (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-3 p-3 rounded-md border transition-all"
                            style={{
                              backgroundColor: isSelected
                                ? `${theme.highlight}10`
                                : theme.cardBackground,
                              borderColor: isSelected 
                                ? theme.highlight 
                                : theme.border,
                            }}
                          >
                            {/* RULE 4: Single handler only - no parent onClick */}
                            <Checkbox
                              id={permission.id}
                              checked={isSelected}
                              onCheckedChange={() => {
                                togglePermission(permission.id);
                                clearPermissionsError();
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <Label
                                  htmlFor={permission.id}
                                  className="text-sm font-medium cursor-pointer"
                                  style={{ color: theme.textPrimary }}
                                  onClick={() => {
                                    togglePermission(permission.id);
                                    clearPermissionsError();
                                  }}
                                >
                                  {permission.name}
                                </Label>
                                {isSelected && (
                                  <CheckCircle 
                                    className="h-4 w-4 flex-shrink-0" 
                                    style={{ color: theme.highlight }} 
                                  />
                                )}
                              </div>
                              <p
                                className="text-xs mt-1"
                                style={{ color: theme.textSecondary }}
                              >
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ACTIONS */}
        <Card 
          className="border shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p 
                className="text-sm"
                style={{ color: theme.textTertiary }}
              >
                <span className="text-red-500">*</span> Required fields must be filled before creating the role
              </p>
              <div className="flex gap-3 w-full md:w-auto">
                <Link href="/admin/roles" className="flex-1 md:flex-initial">
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    style={{
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit"
                  className="gap-2 flex-1 md:flex-initial border-0"
                  disabled={isSubmitDisabled}
                  style={{
                    background: theme.buttonPrimary.bg,
                    color: theme.buttonPrimary.text,
                    opacity: isSubmitDisabled ? 0.5 : 1,
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Create Role
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}