"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Filter,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/useThemeStore";
import { GrievanceTable } from "@/components/admin-dashboard/grievance/table/grievance-table";
import { Grievance } from "@/components/admin-dashboard/grievance/table/columns";

// Mock grievances data
const mockGrievances: Grievance[] = [
  {
    id: "1",
    ticketId: "GRV-2024-001",
    subject: "Street Light Not Working",
    description:
      "The street light near my house has been non-functional for the past week. It's causing safety issues at night.",
    category: "Infrastructure",
    department: "Public Works Department",
    priority: "High",
    status: "In Progress",
    citizenName: "Ramesh Kumar",
    citizenPhone: "+91-9876543210",
    citizenEmail: "ramesh.k@email.com",
    location: "Gandhi Nagar, Ward 5",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-15"),
    assignedTo: "PWD Engineer - Bhubaneswar",
    remarks: "Work order issued. Electrician team assigned.",
  },
  {
    id: "2",
    ticketId: "GRV-2024-002",
    subject: "Delay in Pension Payment",
    description:
      "My mother's pension for November has not been credited yet. She is a widow and depends on this for survival.",
    category: "Social Welfare",
    department: "Social Welfare Department",
    priority: "Critical",
    status: "Pending",
    citizenName: "Sita Devi",
    citizenPhone: "+91-9876543211",
    location: "Kharavel Nagar",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-18"),
  },
  {
    id: "3",
    ticketId: "GRV-2024-003",
    subject: "Garbage Not Collected",
    description:
      "Garbage has not been collected in our area for the last 4 days. The smell is unbearable and causing health issues.",
    category: "Sanitation",
    department: "Urban Development Department",
    priority: "High",
    status: "Resolved",
    citizenName: "Prakash Nayak",
    citizenPhone: "+91-9876543212",
    citizenEmail: "prakash.n@email.com",
    location: "Saheed Nagar, Sector 3",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-10"),
    resolvedDate: new Date("2024-12-14"),
    assignedTo: "UDD Supervisor - Zone 2",
    remarks:
      "Garbage collection resumed. Extra pickup scheduled to clear backlog.",
  },
  {
    id: "4",
    ticketId: "GRV-2024-004",
    subject: "Water Supply Shortage",
    description:
      "Our area gets water supply only for 1 hour in the morning. Need consistent water supply throughout the day.",
    category: "Water Supply",
    department: "Water Resources Department",
    priority: "Medium",
    status: "In Progress",
    citizenName: "Anita Behera",
    citizenPhone: "+91-9876543213",
    location: "Jaydev Vihar",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-12"),
    assignedTo: "Water Supply Engineer",
    remarks:
      "Pipeline inspection scheduled. Issue identified - repair work in progress.",
  },
  {
    id: "5",
    ticketId: "GRV-2024-005",
    subject: "Road Damage - Potholes",
    description:
      "Multiple deep potholes on the main road causing accidents. Two-wheeler riders are particularly at risk.",
    category: "Roads",
    department: "Public Works Department",
    priority: "High",
    status: "Pending",
    citizenName: "Suresh Panda",
    citizenPhone: "+91-9876543214",
    citizenEmail: "suresh.panda@email.com",
    location: "Patia, Main Road",
    constituency: "Bhubaneswar North",
    submittedDate: new Date("2024-12-20"),
  },
  {
    id: "6",
    ticketId: "GRV-2024-006",
    subject: "Electricity Bill Discrepancy",
    description:
      "My electricity bill for this month is Rs. 8,500 which is unusual. Normal bill is around Rs. 2,000. Need meter reading verification.",
    category: "Electricity",
    department: "Energy Department",
    priority: "Medium",
    status: "Rejected",
    citizenName: "Bijay Mohanty",
    citizenPhone: "+91-9876543215",
    location: "CDA Sector 9",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-08"),
    assignedTo: "Electricity Dept Inspector",
    remarks:
      "Meter reading verified. Bill is correct. High usage due to AC running 24/7.",
  },
  {
    id: "7",
    ticketId: "GRV-2024-007",
    subject: "School Building Needs Repair",
    description:
      "Our local government school building has leaking roof. During rain, classes get disrupted.",
    category: "Education",
    department: "Education Department",
    priority: "High",
    status: "In Progress",
    citizenName: "Madhav Jena",
    citizenPhone: "+91-9876543216",
    location: "Rasulgarh",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-05"),
    assignedTo: "Education Dept - Maintenance",
    remarks: "Site inspection completed. Repair work tender floated.",
  },
  {
    id: "8",
    ticketId: "GRV-2024-008",
    subject: "Stray Dog Menace",
    description:
      "Pack of stray dogs attacking people in our colony, especially children and elderly. Need immediate action.",
    category: "Public Safety",
    department: "Urban Development Department",
    priority: "Critical",
    status: "In Progress",
    citizenName: "Laxmi Pradhan",
    citizenPhone: "+91-9876543217",
    citizenEmail: "laxmi.p@email.com",
    location: "Nayapalli",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-19"),
    assignedTo: "Animal Control Team",
    remarks: "Team deployed. Sterilization drive scheduled.",
  },
];

export default function GrievancePage() {
  const { theme } = useThemeStore();
  const [grievances] = useState<Grievance[]>(mockGrievances);
  const [filteredGrievances, setFilteredGrievances] =
    useState<Grievance[]>(mockGrievances);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(
    null
  );

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  // Statistics
  const stats = {
    total: grievances.length,
    pending: grievances.filter((g) => g.status === "Pending").length,
    inProgress: grievances.filter((g) => g.status === "In Progress").length,
    resolved: grievances.filter((g) => g.status === "Resolved").length,
  };

  // Apply filters automatically when filter values change
  useEffect(() => {
    let filtered = grievances;

    if (statusFilter !== "all") {
      filtered = filtered.filter((g) => g.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((g) => g.priority === priorityFilter);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((g) => g.department === departmentFilter);
    }

    setFilteredGrievances(filtered);
  }, [statusFilter, priorityFilter, departmentFilter, grievances]);

  // Reset filters
  const resetFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setDepartmentFilter("all");
  };

  const handleUpdateStatus = (
    grievanceId: string,
    newStatus: Grievance["status"]
  ) => {
    const updatedGrievances = grievances.map((g) =>
      g.id === grievanceId
        ? {
            ...g,
            status: newStatus,
            resolvedDate:
              newStatus === "Resolved" ? new Date() : g.resolvedDate,
          }
        : g
    );

    // Re-apply filters after status update
    let filtered = updatedGrievances;

    if (statusFilter !== "all") {
      filtered = filtered.filter((g) => g.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((g) => g.priority === priorityFilter);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((g) => g.department === departmentFilter);
    }

    setFilteredGrievances(filtered);
  };

  const openViewDialog = (grievance: Grievance) => {
    setSelectedGrievance(grievance);
    setIsViewDialogOpen(true);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const uniqueDepartments = Array.from(
    new Set(grievances.map((g) => g.department))
  );

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-xl md:text-2xl font-bold transition-colors"
              style={{ color: theme.textPrimary }}
            >
              Grievance Management
            </h1>
            <p
              className="text-xs md:text-sm mt-1 transition-colors"
              style={{ color: theme.textSecondary }}
            >
              Manage and resolve citizen grievances and complaints
            </p>
          </div>
        </div>

        {/* STATISTICS CARDS - ONLY 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            {
              label: "Total",
              value: stats.total,
              icon: FileText,
              color: "#3b82f6",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "#f59e0b",
            },
            {
              label: "In Progress",
              value: stats.inProgress,
              icon: AlertCircle,
              color: "#3b82f6",
            },
            {
              label: "Resolved",
              value: stats.resolved,
              icon: CheckCircle,
              color: "#10b981",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="transition-all duration-200 hover:shadow-lg border py-0"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder,
              }}
            >
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs md:text-sm font-medium transition-colors truncate"
                      style={{ color: theme.textSecondary }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="text-xl md:text-3xl font-bold mt-1 md:mt-2 transition-colors"
                      style={{ color: theme.textPrimary }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="h-8 w-8 md:h-12 md:w-12 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
                    style={{
                      backgroundColor: `${stat.color}20`,
                    }}
                  >
                    <stat.icon
                      className="h-4 w-4 md:h-6 md:w-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FILTERS */}
        <Card
          className="border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter
                className="h-4 w-4 md:h-5 md:w-5"
                style={{ color: theme.textSecondary }}
              />
              <h3
                className="text-sm md:text-base font-semibold"
                style={{ color: theme.textPrimary }}
              >
                Filters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label
                  className="text-xs md:text-sm mb-2 block"
                  style={{ color: theme.textPrimary }}
                >
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    className="w-full"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                    }}
                  >
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  className="text-xs md:text-sm mb-2 block"
                  style={{ color: theme.textPrimary }}
                >
                  Priority
                </Label>
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger
                    className="w-full"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                    }}
                  >
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  className="text-xs md:text-sm mb-2 block"
                  style={{ color: theme.textPrimary }}
                >
                  Department
                </Label>
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger
                    className="w-full"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                    }}
                  >
                    <SelectItem value="all">All Departments</SelectItem>
                    {uniqueDepartments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full text-xs md:text-sm"
                  style={{
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GRIEVANCES TABLE */}
        <div className="relative w-full overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="min-w-[1200px]">
              <GrievanceTable
                data={filteredGrievances}
                onView={openViewDialog}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          </div>
        </div>
        {/* VIEW GRIEVANCE DIALOG */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent
            className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: theme.textPrimary }}>
                Grievance Details
              </DialogTitle>
              <DialogDescription style={{ color: theme.textSecondary }}>
                Complete information about this grievance
              </DialogDescription>
            </DialogHeader>

            {selectedGrievance && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Ticket ID
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
                        {selectedGrievance.ticketId}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Status
                    </Label>
                    <p className="mt-1">
                      <Badge
                        style={{
                          backgroundColor:
                            selectedGrievance.status === "Resolved"
                              ? "#10b981"
                              : selectedGrievance.status === "In Progress"
                              ? "#3b82f6"
                              : selectedGrievance.status === "Rejected"
                              ? "#ef4444"
                              : selectedGrievance.status === "Closed"
                              ? "#6b7280"
                              : "#f59e0b",
                          color: "#ffffff",
                        }}
                      >
                        {selectedGrievance.status}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <Label
                    className="text-sm font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    Subject
                  </Label>
                  <p
                    className="mt-1 font-semibold text-lg"
                    style={{ color: theme.textPrimary }}
                  >
                    {selectedGrievance.subject}
                  </p>
                </div>

                <div>
                  <Label
                    className="text-sm font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    Description
                  </Label>
                  <p className="mt-1" style={{ color: theme.textPrimary }}>
                    {selectedGrievance.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Category
                    </Label>
                    <p
                      className="mt-1 font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      {selectedGrievance.category}
                    </p>
                  </div>
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Department
                    </Label>
                    <p
                      className="mt-1 font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      {selectedGrievance.department}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Priority
                    </Label>
                    <p className="mt-1">
                      <Badge
                        style={{
                          backgroundColor:
                            selectedGrievance.priority === "Critical"
                              ? "#dc2626"
                              : selectedGrievance.priority === "High"
                              ? "#ef4444"
                              : selectedGrievance.priority === "Medium"
                              ? "#f59e0b"
                              : "#10b981",
                          color: "#ffffff",
                        }}
                      >
                        {selectedGrievance.priority}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Location
                    </Label>
                    <p
                      className="mt-1 font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      {selectedGrievance.location}
                    </p>
                  </div>
                </div>

                <div
                  className="p-4 rounded-md border"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.backgroundSecondary,
                  }}
                >
                  <h4
                    className="font-semibold mb-3"
                    style={{ color: theme.textPrimary }}
                  >
                    Citizen Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        className="text-xs"
                        style={{ color: theme.textSecondary }}
                      >
                        Name
                      </Label>
                      <p
                        className="mt-1 font-medium"
                        style={{ color: theme.textPrimary }}
                      >
                        {selectedGrievance.citizenName}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-xs"
                        style={{ color: theme.textSecondary }}
                      >
                        Phone
                      </Label>
                      <p
                        className="mt-1 font-medium"
                        style={{ color: theme.textPrimary }}
                      >
                        {selectedGrievance.citizenPhone}
                      </p>
                    </div>
                    {selectedGrievance.citizenEmail && (
                      <div className="col-span-2">
                        <Label
                          className="text-xs"
                          style={{ color: theme.textSecondary }}
                        >
                          Email
                        </Label>
                        <p
                          className="mt-1 font-medium"
                          style={{ color: theme.textPrimary }}
                        >
                          {selectedGrievance.citizenEmail}
                        </p>
                      </div>
                    )}
                    <div>
                      <Label
                        className="text-xs"
                        style={{ color: theme.textSecondary }}
                      >
                        Constituency
                      </Label>
                      <p
                        className="mt-1 font-medium"
                        style={{ color: theme.textPrimary }}
                      >
                        {selectedGrievance.constituency}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Submitted Date
                    </Label>
                    <p
                      className="mt-1 font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      {formatDate(selectedGrievance.submittedDate)}
                    </p>
                  </div>
                  {selectedGrievance.resolvedDate && (
                    <div>
                      <Label
                        className="text-sm font-medium"
                        style={{ color: theme.textSecondary }}
                      >
                        Resolved Date
                      </Label>
                      <p
                        className="mt-1 font-medium"
                        style={{ color: theme.textPrimary }}
                      >
                        {formatDate(selectedGrievance.resolvedDate)}
                      </p>
                    </div>
                  )}
                </div>

                {selectedGrievance.assignedTo && (
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Assigned To
                    </Label>
                    <p
                      className="mt-1 font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      {selectedGrievance.assignedTo}
                    </p>
                  </div>
                )}

                {selectedGrievance.remarks && (
                  <div>
                    <Label
                      className="text-sm font-medium"
                      style={{ color: theme.textSecondary }}
                    >
                      Remarks / Action Taken
                    </Label>
                    <p
                      className="mt-1 p-3 rounded-md"
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        color: theme.textPrimary,
                      }}
                    >
                      {selectedGrievance.remarks}
                    </p>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setSelectedGrievance(null);
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
    </div>
  );
}
