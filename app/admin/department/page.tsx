"use client";

import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/useThemeStore";
import { DepartmentTable } from "@/components/admin-dashboard/department/table/department-table";
import { Department } from "@/components/admin-dashboard/department/table/columns";

// Mock departments
const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Public Works Department",
    code: "PWD",
    description: "Handles infrastructure and construction projects",
    headOfDepartment: "Rajesh Kumar",
    contactEmail: "pwd@odisha.gov.in",
    contactPhone: "+91-9876543210",
    categories: ["Projects", "Infrastructure", "Development"],
    active: true,
  },
  {
    id: "2",
    name: "Health & Family Welfare",
    code: "HFW",
    description: "Public health services and medical facilities",
    headOfDepartment: "Dr. Priya Patel",
    contactEmail: "health@odisha.gov.in",
    contactPhone: "+91-9876543211",
    categories: ["Health", "Grievances"],
    active: true,
  },
  {
    id: "3",
    name: "Education Department",
    code: "EDU",
    description: "School education and literacy programs",
    headOfDepartment: "Suresh Mohanty",
    contactEmail: "education@odisha.gov.in",
    contactPhone: "+91-9876543212",
    categories: ["Education", "Development", "Events"],
    active: true,
  },
  {
    id: "4",
    name: "Agriculture Department",
    code: "AGR",
    description: "Farming, irrigation, and rural development",
    headOfDepartment: "Ravi Shankar",
    contactEmail: "agriculture@odisha.gov.in",
    contactPhone: "+91-9876543213",
    categories: ["Agriculture", "Development", "Projects"],
    active: false,
  },
  {
    id: "5",
    name: "Social Welfare Department",
    code: "SWD",
    description: "Social security and welfare schemes",
    headOfDepartment: "Kavita Singh",
    contactEmail: "welfare@odisha.gov.in",
    contactPhone: "+91-9876543214",
    categories: ["Social Welfare", "Grievances", "My Voice"],
    active: true,
  },
];

export default function DepartmentPage() {
  const { theme } = useThemeStore();
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Statistics
  const stats = {
    total: departments.length,
    active: departments.filter((d) => d.active).length,
    inactive: departments.filter((d) => !d.active).length,
  };

  const handleToggleActive = (deptId: string) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === deptId ? { ...d, active: !d.active } : d))
    );
  };

  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (department: Department) => {
    setSelectedDepartment(department);
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
            Department Master
          </h1>
          <p
            className="text-sm mt-1 transition-colors"
            style={{ color: theme.textSecondary }}
          >
            Manage departments and assign work categories
          </p>
        </div>

        <Link href="/admin/AddDepartment">
          <Button
            className="gap-2 transition-all duration-200 hover:scale-105 border-0"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="h-4 w-4" />
            Add Department
          </Button>
        </Link>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Departments", value: stats.total, color: "#3b82f6" },
          { label: "Active", value: stats.active, color: "#10b981" },
          { label: "Inactive", value: stats.inactive, color: "#f59e0b" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-lg border py-0"
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
                  <Building2 className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DEPARTMENTS TABLE */}
      <DepartmentTable
        data={departments}
        onEdit={openEditDialog}
        onView={openViewDialog}
        onToggleActive={handleToggleActive}
      />

      {/* VIEW DEPARTMENT DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className="sm:max-w-[550px] border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Department Details
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              View complete information about this department
            </DialogDescription>
          </DialogHeader>

          {selectedDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Department Name
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDepartment.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Code
                  </Label>
                  <p className="mt-1">
                    <Badge
                      variant="outline"
                      className="font-mono"
                      style={{
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    >
                      {selectedDepartment.code}
                    </Badge>
                  </p>
                </div>
              </div>

              {selectedDepartment.description && (
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Description
                  </Label>
                  <p className="mt-1" style={{ color: theme.textPrimary }}>
                    {selectedDepartment.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Head of Department
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDepartment.headOfDepartment || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Status
                  </Label>
                  <p className="mt-1">
                    <Badge
                      style={{
                        backgroundColor: selectedDepartment.active ? "#10b981" : "#6b7280",
                        color: "#ffffff",
                      }}
                    >
                      {selectedDepartment.active ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Email
                  </Label>
                  <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
                    {selectedDepartment.contactEmail || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Phone
                  </Label>
                  <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
                    {selectedDepartment.contactPhone || "—"}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Work Categories
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDepartment.categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      style={{
                        backgroundColor: `${theme.buttonPrimary.bg}20`,
                        color: theme.textPrimary,
                      }}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                setSelectedDepartment(null);
              }}
              style={{
                borderColor: theme.buttonOutline.border,
                color: theme.buttonOutline.text,
                backgroundColor: "transparent",
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