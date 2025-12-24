"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Clock, CheckCircle2, XCircle, FileText, Filter } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useThemeStore } from "@/store/useThemeStore";
import { ProjectApprovalTable } from "@/components/admin-dashboard/approval/table/approval-table";
import { ProjectApproval } from "@/components/admin-dashboard/approval/table/columns";

// Mock project approval data
const mockApprovals: ProjectApproval[] = [
  {
    id: "1",
    projectId: "PRJ-PROP-2024-001",
    name: "Rural Road Connectivity Improvement",
    description: "Upgrade 15 km of rural roads connecting 8 villages to improve agricultural transport and access to markets",
    category: "Infrastructure",
    department: "Public Works Department",
    requestedBudget: 18500000,
    fundingSource: "State Budget",
    status: "Pending Review",
    priority: "High",
    submittedDate: new Date("2024-12-15"),
    submittedBy: "PWD Division Officer - Rural",
    location: "Villages: Balakati, Khurda, Jatni area",
    constituency: "Bhubaneswar Central",
    estimatedBeneficiaries: 35000,
    expectedDuration: "12 months",
    proposedContractor: "To be tendered",
    justification: "Current road conditions severely impact agricultural transport during monsoon. Improved connectivity will boost rural economy.",
  },
  {
    id: "2",
    projectId: "PRJ-PROP-2024-002",
    name: "Primary Healthcare Center Construction",
    description: "Build new 50-bed PHC with modern facilities including emergency ward, diagnostic lab, and ambulance facility",
    category: "Healthcare",
    department: "Health Department",
    requestedBudget: 32000000,
    fundingSource: "Central Government Scheme",
    status: "Under Review",
    priority: "Critical",
    submittedDate: new Date("2024-12-10"),
    submittedBy: "District Medical Officer",
    location: "Chandrasekharpur Block",
    constituency: "Bhubaneswar Central",
    estimatedBeneficiaries: 75000,
    expectedDuration: "18 months",
    proposedContractor: "To be tendered",
    justification: "Area lacks adequate healthcare facilities. Nearest hospital is 25 km away. Critical need for emergency medical services.",
  },
  {
    id: "3",
    projectId: "PRJ-PROP-2024-003",
    name: "Digital Library Setup in Schools",
    description: "Set up digital libraries with computers and internet connectivity in 25 government schools",
    category: "Education",
    department: "Education Department",
    requestedBudget: 7500000,
    fundingSource: "State Budget",
    status: "Pending Review",
    priority: "Medium",
    submittedDate: new Date("2024-12-18"),
    submittedBy: "Block Education Officer",
    location: "25 Schools across constituency",
    constituency: "Bhubaneswar Central",
    estimatedBeneficiaries: 12000,
    expectedDuration: "6 months",
    proposedContractor: "Tech Solutions India",
    justification: "Digital literacy is crucial for students. Current schools lack computer facilities and internet access.",
  },
  {
    id: "4",
    projectId: "PRJ-PROP-2024-004",
    name: "Community Water Purification Plant",
    description: "Install RO water purification plants in 10 community locations to provide safe drinking water",
    category: "Water Supply",
    department: "Water Resources Department",
    requestedBudget: 4200000,
    fundingSource: "Municipal Budget",
    status: "Revision Requested",
    priority: "High",
    submittedDate: new Date("2024-12-05"),
    submittedBy: "Municipal Engineer - Water",
    reviewedBy: "Chief Engineer",
    reviewDate: new Date("2024-12-12"),
    location: "10 community locations",
    constituency: "Bhubaneswar Central",
    estimatedBeneficiaries: 28000,
    expectedDuration: "4 months",
    proposedContractor: "Aqua Solutions Ltd",
    justification: "Ground water contamination reported in multiple areas. Safe drinking water is essential for public health.",
  },
  {
    id: "5",
    projectId: "PRJ-PROP-2024-005",
    name: "Youth Skill Training Center",
    description: "Establish comprehensive skill training center offering courses in IT, electronics, and vocational trades",
    category: "Skill Development",
    department: "Labour Department",
    requestedBudget: 22000000,
    fundingSource: "Central Government Scheme",
    status: "Approved",
    priority: "High",
    submittedDate: new Date("2024-11-20"),
    submittedBy: "Labour Commissioner",
    reviewedBy: "MLA - Project Committee",
    reviewDate: new Date("2024-12-08"),
    location: "Patia Industrial Area",
    constituency: "Bhubaneswar Central",
    estimatedBeneficiaries: 8000,
    expectedDuration: "10 months",
    proposedContractor: "NSDC Approved Vendor",
    justification: "High youth unemployment. Skills training will improve employability and support local industries.",
  },
  {
    id: "6",
    projectId: "PRJ-PROP-2023-006",
    name: "Street Vendor Market Development",
    description: "Create organized street vendor market with proper stalls, electricity, and sanitation facilities",
    category: "Urban Development",
    department: "Urban Development Department",
    requestedBudget: 9800000,
    fundingSource: "State Budget",
    status: "Rejected",
    priority: "Low",
    submittedDate: new Date("2024-11-15"),
    submittedBy: "Municipal Corporation",
    reviewedBy: "MLA - Project Committee",
    reviewDate: new Date("2024-12-01"),
    location: "Market Road Area",
    constituency: "Bhubaneswar Central",
    estimatedBeneficiaries: 500,
    expectedDuration: "8 months",
    rejectionReason: "Budget constraints and land availability issues. Alternative location to be identified. Resubmit with revised plan.",
  },
];

export default function ProjectApprovalPage() {
  const { theme } = useThemeStore();
  const [projects] = useState<ProjectApproval[]>(mockApprovals);
  const [filteredProjects, setFilteredProjects] = useState<ProjectApproval[]>(mockApprovals);
  
  // Dialogs
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState<ProjectApproval | null>(null);
  const [approvalRemarks, setApprovalRemarks] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [revisionComments, setRevisionComments] = useState("");
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  // Statistics
  const stats = {
    total: projects.length,
    pending: projects.filter((p) => p.status === "Pending Review").length,
    underReview: projects.filter((p) => p.status === "Under Review").length,
    approved: projects.filter((p) => p.status === "Approved").length,
    totalBudget: projects.filter(p => p.status === "Pending Review" || p.status === "Under Review").reduce((sum, p) => sum + p.requestedBudget, 0),
  };

  // Apply filters
  useEffect(() => {
    let filtered = projects;

    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((p) => p.priority === priorityFilter);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((p) => p.department === departmentFilter);
    }

    setFilteredProjects(filtered);
  }, [statusFilter, priorityFilter, departmentFilter, projects]);

  const resetFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setDepartmentFilter("all");
  };

  const openViewDialog = (project: ProjectApproval) => {
    setSelectedProject(project);
    setIsViewDialogOpen(true);
  };

  const openApproveDialog = (project: ProjectApproval) => {
    setSelectedProject(project);
    setApprovalRemarks("");
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (project: ProjectApproval) => {
    setSelectedProject(project);
    setRejectionReason("");
    setIsRejectDialogOpen(true);
  };

  const openRevisionDialog = (project: ProjectApproval) => {
    setSelectedProject(project);
    setRevisionComments("");
    setIsRevisionDialogOpen(true);
  };

  const handleApprove = () => {
    console.log("Approved:", selectedProject, "Remarks:", approvalRemarks);
    setIsApproveDialogOpen(false);
    setSelectedProject(null);
    setApprovalRemarks("");
  };

  const handleReject = () => {
    console.log("Rejected:", selectedProject, "Reason:", rejectionReason);
    setIsRejectDialogOpen(false);
    setSelectedProject(null);
    setRejectionReason("");
  };

  const handleRequestRevision = () => {
    console.log("Revision requested:", selectedProject, "Comments:", revisionComments);
    setIsRevisionDialogOpen(false);
    setSelectedProject(null);
    setRevisionComments("");
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }
    return new Date(date).toLocaleDateString('en-GB', options)
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const uniqueDepartments = Array.from(new Set(projects.map((p) => p.department)));

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-xl md:text-2xl font-bold transition-colors"
              style={{ color: theme.textPrimary }}
            >
              Project Approval Workflow
            </h1>
            <p
              className="text-xs md:text-sm mt-1 transition-colors"
              style={{ color: theme.textSecondary }}
            >
              Review and approve project proposals
            </p>
          </div>
        </div>

        {/* STATISTICS CARDS */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {[
            { label: "Total", value: stats.total, icon: ClipboardList, color: "#3b82f6" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "#6b7280" },
            { label: "Under Review", value: stats.underReview, icon: FileText, color: "#f59e0b" },
            { label: "Approved", value: stats.approved, icon: CheckCircle2, color: "#10b981" },
            { label: "Pending Budget", value: formatCurrency(stats.totalBudget), icon: XCircle, color: "#8b5cf6", isText: true },
          ].map((stat, index) => (
            <Card
              key={index}
              className="transition-all duration-200 hover:shadow-lg border p-0 "
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder,
              }}
            >
              <CardContent className="p-4 md:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="text-xs md:text-sm font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    {stat.label}
                  </p>
                  <div
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${stat.color}20`,
                    }}
                  >
                    <stat.icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <p
                  className="text-xl md:text-2xl xl:text-3xl font-bold"
                  style={{ color: theme.textPrimary }}
                >
                  {stat.value}
                </p>
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
              <Filter className="h-4 w-4 md:h-5 md:w-5" style={{ color: theme.textSecondary }} />
              <h3 className="text-sm md:text-base font-semibold" style={{ color: theme.textPrimary }}>
                Filters
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2">
                <Label className="text-xs md:text-sm mb-2 block" style={{ color: theme.textPrimary }}>
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
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Revision Requested">Revision Requested</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Label className="text-xs md:text-sm mb-2 block" style={{ color: theme.textPrimary }}>
                  Priority
                </Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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

              <div className="lg:col-span-2">
                <Label className="text-xs md:text-sm mb-2 block" style={{ color: theme.textPrimary }}>
                  Department
                </Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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

              <div className="flex items-end lg:col-span-1">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full text-xs md:text-sm"
                  style={{
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PROJECT APPROVAL TABLE */}
        <ProjectApprovalTable
          data={filteredProjects}
          onView={openViewDialog}
          onApprove={openApproveDialog}
          onReject={openRejectDialog}
          onRequestRevision={openRevisionDialog}
        />

        {/* VIEW PROJECT DIALOG */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent
            className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: theme.textPrimary }}>
                Project Proposal Details
              </DialogTitle>
              <DialogDescription style={{ color: theme.textSecondary }}>
                Complete information about this project proposal
              </DialogDescription>
            </DialogHeader>

            {selectedProject && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Project ID
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
                        {selectedProject.projectId}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Status
                    </Label>
                    <p className="mt-1">
                      <Badge
                        style={{
                          backgroundColor: 
                            selectedProject.status === "Approved" ? "#10b981" :
                            selectedProject.status === "Under Review" ? "#f59e0b" :
                            selectedProject.status === "Rejected" ? "#ef4444" :
                            selectedProject.status === "Revision Requested" ? "#3b82f6" :
                            "#6b7280",
                          color: "#ffffff",
                        }}
                      >
                        {selectedProject.status}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Project Name
                  </Label>
                  <p className="mt-1 font-semibold text-lg" style={{ color: theme.textPrimary }}>
                    {selectedProject.name}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Description
                  </Label>
                  <p className="mt-1" style={{ color: theme.textPrimary }}>
                    {selectedProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Category
                    </Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {selectedProject.category}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Department
                    </Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {selectedProject.department}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Requested Budget
                    </Label>
                    <p className="mt-1 font-bold text-lg" style={{ color: theme.textPrimary }}>
                      {formatCurrency(selectedProject.requestedBudget)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Funding Source
                    </Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {selectedProject.fundingSource}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Priority
                    </Label>
                    <p className="mt-1">
                      <Badge
                        style={{
                          backgroundColor: 
                            selectedProject.priority === "Critical" ? "#dc2626" :
                            selectedProject.priority === "High" ? "#ef4444" :
                            selectedProject.priority === "Medium" ? "#f59e0b" :
                            "#10b981",
                          color: "#ffffff",
                        }}
                      >
                        {selectedProject.priority}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Beneficiaries
                    </Label>
                    <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                      {selectedProject.estimatedBeneficiaries?.toLocaleString('en-IN')} people
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Location
                  </Label>
                  <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                    {selectedProject.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Expected Duration
                    </Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {selectedProject.expectedDuration}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Submitted Date
                    </Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {formatDate(selectedProject.submittedDate)}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-md border" style={{ borderColor: theme.border, backgroundColor: theme.backgroundSecondary }}>
                  <h4 className="font-semibold mb-3" style={{ color: theme.textPrimary }}>
                    Submission Details
                  </h4>
                  <div className="grid gap-3">
                    <div>
                      <Label className="text-xs" style={{ color: theme.textSecondary }}>
                        Submitted By
                      </Label>
                      <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                        {selectedProject.submittedBy}
                      </p>
                    </div>
                    {selectedProject.proposedContractor && (
                      <div>
                        <Label className="text-xs" style={{ color: theme.textSecondary }}>
                          Proposed Contractor
                        </Label>
                        <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                          {selectedProject.proposedContractor}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedProject.justification && (
                  <div>
                    <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                      Justification
                    </Label>
                    <p className="mt-1 p-3 rounded-md" style={{ 
                      backgroundColor: theme.backgroundSecondary,
                      color: theme.textPrimary 
                    }}>
                      {selectedProject.justification}
                    </p>
                  </div>
                )}

                {selectedProject.rejectionReason && (
                  <div>
                    <Label className="text-sm font-medium text-red-600">
                      Rejection Reason
                    </Label>
                    <p className="mt-1 p-3 rounded-md border-red-300" style={{ 
                      backgroundColor: "#fef2f2",
                      color: "#991b1b",
                      border: "1px solid #fecaca"
                    }}>
                      {selectedProject.rejectionReason}
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
                  setSelectedProject(null);
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

        {/* APPROVE PROJECT DIALOG */}
        <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
          <DialogContent
            className="sm:max-w-[500px] border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: theme.textPrimary }}>
                Approve Project
              </DialogTitle>
              <DialogDescription style={{ color: theme.textSecondary }}>
                Confirm project approval and add any remarks
              </DialogDescription>
            </DialogHeader>

            {selectedProject && (
              <div className="grid gap-4 py-4">
                <div>
                  <Label className="text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>
                    Project
                  </Label>
                  <p className="font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedProject.name}
                  </p>
                  <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
                    Budget: {formatCurrency(selectedProject.requestedBudget)}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Approval Remarks (Optional)
                  </Label>
                  <Textarea
                    placeholder="Add any comments or conditions for approval..."
                    value={approvalRemarks}
                    onChange={(e) => setApprovalRemarks(e.target.value)}
                    rows={4}
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsApproveDialogOpen(false);
                  setSelectedProject(null);
                  setApprovalRemarks("");
                }}
                style={{
                  borderColor: theme.border,
                  color: theme.textPrimary,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* REJECT PROJECT DIALOG */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent
            className="sm:max-w-[500px] border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: theme.textPrimary }}>
                Reject Project
              </DialogTitle>
              <DialogDescription style={{ color: theme.textSecondary }}>
                Provide reason for rejection
              </DialogDescription>
            </DialogHeader>

            {selectedProject && (
              <div className="grid gap-4 py-4">
                <div>
                  <Label className="text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>
                    Project
                  </Label>
                  <p className="font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedProject.name}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Rejection Reason (Required)
                  </Label>
                  <Textarea
                    placeholder="Explain why this project is being rejected..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={5}
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRejectDialogOpen(false);
                  setSelectedProject(null);
                  setRejectionReason("");
                }}
                style={{
                  borderColor: theme.border,
                  color: theme.textPrimary,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* REQUEST REVISION DIALOG */}
        <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
          <DialogContent
            className="sm:max-w-[500px] border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: theme.textPrimary }}>
                Request Revision
              </DialogTitle>
              <DialogDescription style={{ color: theme.textSecondary }}>
                Specify changes or additional information required
              </DialogDescription>
            </DialogHeader>

            {selectedProject && (
              <div className="grid gap-4 py-4">
                <div>
                  <Label className="text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>
                    Project
                  </Label>
                  <p className="font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedProject.name}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Revision Comments (Required)
                  </Label>
                  <Textarea
                    placeholder="Describe what needs to be revised or additional information needed..."
                    value={revisionComments}
                    onChange={(e) => setRevisionComments(e.target.value)}
                    rows={5}
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRevisionDialogOpen(false);
                  setSelectedProject(null);
                  setRevisionComments("");
                }}
                style={{
                  borderColor: theme.border,
                  color: theme.textPrimary,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRequestRevision}
                disabled={!revisionComments.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                <FileText className="mr-2 h-4 w-4" />
                Request Revision
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}