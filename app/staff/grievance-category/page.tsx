"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/useThemeStore";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GrievancesTable } from "@/components/staff-dashboard/tables/grievance/grievances-table";
import { Grievance } from "@/components/staff-dashboard/tables/grievance/columns";

const mockGrievances = [
  {
    id: "GRV-001",
    title: "Road Repair Request",
    category: "Infrastructure",
    status: "Pending",
    priority: "High",
    area: "Zone A",
    submittedBy: "Ramesh Kumar",
    submittedDate: "2024-12-20",
    description: "Main road near market needs urgent repair",
  },
  {
    id: "GRV-002",
    title: "Water Supply Issue",
    category: "Water Supply",
    status: "In Progress",
    priority: "Critical",
    area: "Zone B",
    submittedBy: "Sunita Devi",
    submittedDate: "2024-12-18",
    description: "No water supply for 3 days",
  },
  {
    id: "GRV-003",
    title: "Street Light Not Working",
    category: "Electricity",
    status: "Resolved",
    priority: "Medium",
    area: "Zone C",
    submittedBy: "Prakash Singh",
    submittedDate: "2024-12-15",
    description: "Street lights not working for a week",
  },
  {
    id: "GRV-004",
    title: "Garbage Collection Delay",
    category: "Sanitation",
    status: "Pending",
    priority: "Medium",
    area: "Zone A",
    submittedBy: "Anita Sharma",
    submittedDate: "2024-12-22",
    description: "Garbage not collected for 5 days",
  },
  {
    id: "GRV-005",
    title: "School Building Maintenance",
    category: "Education",
    status: "In Progress",
    priority: "High",
    area: "Zone D",
    submittedBy: "Rajesh Patel",
    submittedDate: "2024-12-19",
    description: "School building needs urgent maintenance",
  },
];

export default function GrievanceCategoryPage() {
  const { theme } = useThemeStore();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  const stats = {
    total: 5,
    pending: 2,
    inProgress: 2,
    resolved: 1,
  };

  const openViewDialog = (grievance: Grievance) => {
    setSelectedGrievance(grievance);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.textPrimary }}>
          Grievance Management
        </h1>
        <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
          Manage and track all citizen grievances
        </p>
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
              Total Grievances
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.total}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              All registered grievances
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
              Pending
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.pending}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Awaiting action
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
            borderLeftColor: '#3b82f6',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              In Progress
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.inProgress}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Being addressed
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
              Resolved
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {stats.resolved}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Successfully closed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grievances Table */}
      <GrievancesTable onView={openViewDialog} />

      {/* VIEW GRIEVANCE DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border" style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>Grievance Details</DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>Complete information about this grievance</DialogDescription>
          </DialogHeader>
          {selectedGrievance && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Grievance ID</Label>
                  <p className="mt-1"><Badge variant="outline" className="font-mono" style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}>{selectedGrievance.id}</Badge></p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Status</Label>
                  <p className="mt-1"><Badge style={{ backgroundColor: selectedGrievance.status === "Resolved" ? "#22c55e" : selectedGrievance.status === "In Progress" ? "#a855f7" : selectedGrievance.status === "Forwarded" ? "#3b82f6" : selectedGrievance.status === "On Hold" ? "#6b7280" : "#f59e0b", color: "#ffffff" }}>{selectedGrievance.status}</Badge></p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Subject</Label>
                <p className="mt-1 font-semibold text-lg" style={{ color: theme.textPrimary }}>{selectedGrievance.subject}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Category</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Location</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.location}</p>
                </div>
              </div>
              <div className="p-4 rounded-md border" style={{ borderColor: theme.border, backgroundColor: theme.backgroundSecondary }}>
                <h4 className="font-semibold mb-3" style={{ color: theme.textPrimary }}>Citizen Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs" style={{ color: theme.textSecondary }}>Name</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.citizenName}</p>
                  </div>
                  <div>
                    <Label className="text-xs" style={{ color: theme.textSecondary }}>Citizen ID</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.citizenId}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs" style={{ color: theme.textSecondary }}>Phone</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.phone}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Assigned Department</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.assignedDept}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Assigned To</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{selectedGrievance.assignedTo}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Registration Date</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{new Date(selectedGrievance.registrationDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>Last Updated</Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{new Date(selectedGrievance.lastUpdated).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsViewDialogOpen(false); setSelectedGrievance(null); }} style={{ borderColor: theme.buttonOutline.border, color: theme.buttonOutline.text, backgroundColor: "transparent" }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}