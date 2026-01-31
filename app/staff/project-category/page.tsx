"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/useThemeStore";
import {
  Building2,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { ProjectsTable } from "@/components/staff-dashboard/tables/project-table";
import { Project } from "@/components/staff-dashboard/tables/columns";

const mockProjects = [
  {
    id: "PRJ-001",
    name: "Rural Road Development",
    category: "Infrastructure",
    status: "In Progress",
    area: "Zone A",
    budget: 15000000,
    spent: 8500000,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    beneficiaries: 5000,
    progress: 60,
  },
  {
    id: "PRJ-002",
    name: "Primary Health Center",
    category: "Healthcare",
    status: "Planning",
    area: "Zone B",
    budget: 25000000,
    spent: 2000000,
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    beneficiaries: 12000,
    progress: 15,
  },
  {
    id: "PRJ-003",
    name: "School Building Renovation",
    category: "Education",
    status: "Completed",
    area: "Zone C",
    budget: 8000000,
    spent: 7800000,
    startDate: "2023-06-01",
    endDate: "2024-01-31",
    beneficiaries: 800,
    progress: 100,
  },
  {
    id: "PRJ-004",
    name: "Water Supply Pipeline",
    category: "Water Supply",
    status: "In Progress",
    area: "Zone A",
    budget: 18000000,
    spent: 12000000,
    startDate: "2024-02-01",
    endDate: "2024-10-31",
    beneficiaries: 8000,
    progress: 70,
  },
  {
    id: "PRJ-005",
    name: "Community Center",
    category: "Infrastructure",
    status: "Planning",
    area: "Zone D",
    budget: 12000000,
    spent: 1500000,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    beneficiaries: 3000,
    progress: 10,
  },
];

export default function ProjectManagementPage() {
  const { theme } = useThemeStore();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const stats = {
    total: 5,
    planning: 2,
    inProgress: 2,
    completed: 1,
  };

  const openViewDialog = (project: Project) => {
    setSelectedProject(project);
    setIsViewDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.textPrimary }}>
            Project Management
          </h1>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Manage and track all constituency projects
          </p>
        </div>
        
        <Link href="/staff/Add-project-category">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#3b82f6',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Total Projects
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.total}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              All constituency projects
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#6b7280',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Planning
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.planning}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              In planning phase
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#f59e0b',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              In Progress
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.inProgress}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Currently executing
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#22c55e',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Completed
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.completed}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Successfully finished
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <ProjectsTable onView={openViewDialog} />

      {/* VIEW PROJECT DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border" style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>Project Details</DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>Complete information about this project</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Project ID</Label>
                  <p className="mt-1"><Badge variant="outline" className="font-mono" style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}>{selectedProject.id}</Badge></p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Status</Label>
                  <p className="mt-1"><Badge style={{ backgroundColor: selectedProject.status === "Completed" ? "#22c55e" : selectedProject.status === "In Progress" ? "#3b82f6" : selectedProject.status === "On Hold" ? "#f59e0b" : "#6b7280", color: "#ffffff" }}>{selectedProject.status}</Badge></p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Project Name</Label>
                <p className="mt-1 font-semibold text-lg" style={{ color: theme.textPrimary }}>{selectedProject.projectName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Category</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedProject.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Department</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedProject.department}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Location</Label>
                <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedProject.location}</p>
              </div>
              <div className="p-4 rounded-md border" style={{ borderColor: theme.border, backgroundColor: theme.backgroundSecondary }}>
                <h4 className="font-semibold mb-3" style={{ color: theme.textPrimary }}>Budget Information</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs" style={{ color: theme.textSecondary }}>Estimated Budget</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{formatCurrency(selectedProject.estimatedBudget)}</p>
                  </div>
                  <div>
                    <Label className="text-xs" style={{ color: theme.textSecondary }}>Sanctioned Budget</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{formatCurrency(selectedProject.sanctionedBudget)}</p>
                  </div>
                  <div>
                    <Label className="text-xs" style={{ color: theme.textSecondary }}>Expenditure</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{formatCurrency(selectedProject.expenditure)}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Start Date</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{new Date(selectedProject.startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Expected End Date</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{new Date(selectedProject.expectedEndDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Progress</Label>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${selectedProject.progress}%`, backgroundColor: selectedProject.progress === 100 ? "#22c55e" : selectedProject.progress >= 50 ? "#3b82f6" : "#f59e0b" }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{selectedProject.progress}%</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Priority</Label>
                <p className="mt-1"><Badge style={{ backgroundColor: selectedProject.priority === "Critical" ? "#dc2626" : selectedProject.priority === "High" ? "#ef4444" : selectedProject.priority === "Medium" ? "#f59e0b" : "#10b981", color: "#ffffff" }}>{selectedProject.priority}</Badge></p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsViewDialogOpen(false); setSelectedProject(null); }} style={{ borderColor: theme.buttonOutline.border, color: theme.buttonOutline.text, backgroundColor: "transparent" }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}